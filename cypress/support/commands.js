// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (nome, sobrenome, email, mensagem)=>{
    cy.get('#firstName').as('nome').type(nome)
    cy.get('@nome').should('have.value', nome)

    cy.get('#lastName').as('sobrenome').type(sobrenome)
    cy.get('@sobrenome').should('have.value', sobrenome)

    cy.get('#email').as('email').type(email)
    cy.get('@email').should('have.value', email)

    cy.get('#open-text-area').as('mensagem')
      .type(mensagem, { delay:0 })

      cy.contains('button', 'Enviar').click()
})