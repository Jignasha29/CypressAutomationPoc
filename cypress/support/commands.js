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
Cypress.Commands.add('submitFormDetails',(countryName)=>{
    cy.get('#country').type(countryName)
        //cy.wait(2000)
        cy.get('.suggestions ul li a',{timeout:10000}).click()
        cy.get('.btn-success').click()
})

Cypress.Commands.add('getAmountValue',(locator)=>{
    cy.get(locator).then(($el)=>{
        const text = $el.text();
        const cleanedText = text.replace(/[^0-9]/g,'');
        const amount = Number(cleanedText);
        return amount;
    });

})