/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';

import { worker } from '../../src/mocks/browser';
import { User } from '../../src/types';
import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      mockLogin(data?: Pick<User, 'email' | 'password'>): Chainable<Element>;
      login(data: Pick<User, 'email' | 'password'>): Chainable<Element>;
      mockRefreshToken(): Chainable<Element>;
      visitAuthenticatedPage(path: string): Chainable<Element>;
    }
  }
}

Cypress.on('test:before:run:async', async () => {
  if (window.msw) {
    console.log('MSW is already running.');
  }

  //if MSW wasnt started by the app, Cypress needs to start it
  if (!window.msw) {
    console.log('MSW has not been started. Starting now.');
    await worker.start();
  }
});

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});
