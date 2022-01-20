import { authData } from '../../src/mocks/db/auth.db';

Cypress.Commands.add('mockLogin', data => {
  cy.request({
    url: 'http://localhost:4000/login',
    method: 'POST',
    body: data,
  }).then(response => {
    cy.window().then(window => {
      const { dispatch } = window.store;

      dispatch({
        type: 'auth/setAuth',
        payload: authData,
      });
    });
  });
});

Cypress.Commands.add('mockRefreshToken', () => {
  cy.window().then(window => {
    const { worker, rest } = window.msw;

    worker.use(
      rest.post('http://localhost:4000/refresh-token', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            data: authData,
            message: 'logged in successful',
          }),
        );
      }),
    );
  });
});

Cypress.Commands.add('visitAuthenticatedPage', (path: string) => {
  cy.visit('/login');
  cy.mockLogin().then(() => {
    cy.visit(path);
    cy.mockRefreshToken();
  });
});

Cypress.Commands.add('login', user => {
  cy.findByLabelText(/email/i).type(user.email);
  cy.findByLabelText(/password/i).type(user.password);
  cy.findByRole('button', { name: /login/i }).click();
});
