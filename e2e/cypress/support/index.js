// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
//
let polyfill;

before(() => {
    const polyfillUrl = 'https://unpkg.com/whatwg-fetch@3.0.0/dist/fetch.umd.js';
    cy.request(polyfillUrl).then(response => {
        polyfill = response.body;
    });
});

Cypress.on('window:before:load', win => {
    delete win.fetch;
    win.eval(polyfill);
});

Cypress.on("uncaught:exception", (err, runnable) => {
    console.debug(">> uncaught:exception disabled in cypress/support/index.js");
    return false;  // prevents Cypress from failing the test
});
