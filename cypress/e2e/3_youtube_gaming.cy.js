import YouTubeGamingPage from '../support/pageObjects/YouTubeGamingPage';

describe('YouTube Gaming Trending Navigation and Validation', () => {
  beforeEach(() => {
    YouTubeGamingPage.visit();
  });

  it('Should navigate via sidebar, show more, gaming, click view all trending, and validate 3rd video title and channel', () => {
    YouTubeGamingPage.goToGaming();
    YouTubeGamingPage.clickTrendingViewAll();
    YouTubeGamingPage.selectThirdTrendingVideo();

    // 1. Validasi ID Video pada URL Halaman Detail
    cy.get('@expectedVideoId').then((expectedVideoId) => {
      cy.url({ timeout: 10000 }).should('include', expectedVideoId);
    });

    // 2. Validasi Keberadaan Judul Video di Halaman Detail
    cy.get('h1.ytd-watch-metadata yt-formatted-string, #container > h1.ytd-watch-metadata', { timeout: 10000 })
      .should('be.visible')
      .invoke('text')
      .should('not.be.empty');

    // Validasi Nama Channel
    cy.get('@expectedChannelName').then((expectedChannel) => {
      cy.get('#upload-info #text.ytd-channel-name a, #owner #text-container yt-formatted-string a', { timeout: 10000 })
        .filter(':visible')
        .first()
        .invoke('text')
        .then((detailChannel) => {
          const cleanDetailChannel = detailChannel.replace(/\s+/g, ' ').trim();
          const cleanExpectedChannel = expectedChannel.replace(/\s+/g, ' ').trim();
          
          expect(cleanDetailChannel).to.equal(cleanExpectedChannel);
        });
    });
  });
});