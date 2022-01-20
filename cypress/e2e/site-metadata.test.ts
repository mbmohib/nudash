import { siteData } from '../../src/mocks/db/site.db';

describe('site meta data', () => {
  it('update site meta data', () => {
    cy.visitAuthenticatedPage('/site/meta-data').then(() => {
      cy.findByLabelText(/name/i).clear().type(siteData.name);
      cy.findByLabelText(/site url/i)
        .clear()
        .type(siteData.url);
      cy.findByLabelText(/tagline/i)
        .clear()
        .type(siteData.tagline);
      cy.findByLabelText(/description/i).type('.');
      cy.findByRole('button', { name: /update/i }).click();
      cy.findByText(/site updated successfully/i);
    });
  });
});
