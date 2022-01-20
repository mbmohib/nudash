import { loginData } from '../../src/mocks/db/auth.db';

describe('login', () => {
  it('should login an existing user', () => {
    cy.visit('/');
    cy.login(loginData);
    cy.findByText(/dashboard/i);
  });

  it(`should show an error message if there's an error on login`, () => {
    cy.visit('/login');
    cy.window().then(window => {
      const { worker, rest } = window.msw;

      worker.use(
        rest.post('http://localhost:4000/login', (req, res, ctx) => {
          return res(
            ctx.status(401),
            ctx.json({
              data: null,
              message: "user name & password didn't match",
            }),
          );
        }),
      );

      cy.login(loginData);
      cy.findByText(/try again/i);
    });
  });
});
