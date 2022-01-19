describe('login', () => {
  it('should login user', () => {
    cy.visit('/');
    cy.findByLabelText(/email/i).type('example@gmail.com');
    cy.findByLabelText(/password/i).type('123456');
    cy.findByRole('button', { name: /login/i }).click();
    cy.findByText(/dashboard/i);
    // cy.url().should('eq', 'http://localhost:3000/dashboard/analytics');
  });
});
