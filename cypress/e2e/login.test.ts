describe('login', () => {
  it('should login an existing user', () => {
    cy.visit('/');
    cy.findByLabelText(/email/i).type('example@gmail.com');
    cy.findByLabelText(/password/i).type('123456');
    cy.findByRole('button', { name: /login/i }).click();
    cy.findByText(/dashboard/i);
  });

  it(`should show an error message if there's an error on login`, () => {
    cy.visit('/login');
    cy.window().then(window => {
      const { worker, rest } = window.msw;

      worker.use(
        rest.post('http://localhost:4000/login', (req, res, ctx) => {
          return res(ctx.status(401), ctx.json({}));
        }),
      );

      cy.findByLabelText(/email/i).type('example@gmail.com');
      cy.findByLabelText(/password/i).type('123456');
      cy.findByRole('button', { name: /login/i }).click();

      cy.findByText(/try again/i);
    });
  });
});
