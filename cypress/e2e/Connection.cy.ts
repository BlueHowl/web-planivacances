import { mount } from 'cypress/svelte'

describe('Connect to app', () => {


  it('submit login infos', () => {
    cy.visit("https://panoramix.cg.helmo.be/~d170051/PlaniVacances/");

    cy.get('#username').type('q210043');
    cy.get('#password').type('password');

    cy.contains('Connexion').click()

    cy.contains('Connexion').click()

    // Type email
    cy.get('input[name="email"]').type('test1234@web.com');
  
    // Type password
    cy.get('input[name="password"]').type('test1234');

    // Submit the form
    cy.get('form').submit();
    cy.contains('Connexion').click()

    cy.url().should('equal', 'https://panoramix.cg.helmo.be/~d170051/PlaniVacances/');
  });

});