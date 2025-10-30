/// <reference types="cypress" />
import HomePage from '../../support/pageObjects/HomePage'

describe('Test Suite', function () {

  beforeEach(function () {
    cy.fixture('example').as('data'); 
    const homePage = new HomePage();
    cy.wrap(homePage).as('homePage');
    homePage.goTo(Cypress.env('url') + '/loginpagePractise/#');
  });
  
  it('1. Login to the application using valid credentials', function () {
    cy.get('@homePage').then((homePage) => {
      cy.get('@data').then((data) => {
        const productPage = homePage.login(data.username, data.password);
        productPage.pageValidation();
      });
    });
  });

  it('2. Add more than 1 item to the cart and validate total', function () {
    cy.get('@homePage').then((homePage) => {
      cy.get('@data').then((data) => {
        const productPage = homePage.login(data.username, data.password);
        const productName = data.productName;
        productPage.pageValidation();
        productPage.getCardCount().should('have.length', 4);
        productPage.selectProduct(productName);
        productPage.selectFirstProduct();

        const cartPage = productPage.goToCart();
        cartPage.sumOfProducts().then((sum) => {
          cy.getAmountValue('tr td:nth-child(5) strong').then((total) => {
            cy.log('sum= ' + sum);
            cy.log('total= ' + total);
            expect(sum).to.be.equal(total);
          });
        });
      });
    });
  });

  it('3. Complete checkout process successfully', function () {
    cy.get('@homePage').then((homePage) => {
      cy.get('@data').then((data) => {
        const productPage = homePage.login(data.username, data.password);
        productPage.pageValidation();

        const productName = data.productName;
        productPage.selectProduct(productName);
        productPage.selectFirstProduct();

        const cartPage = productPage.goToCart();
        const confirmationPage = cartPage.checkoutItems();
        confirmationPage.submitFormDetails("India");
        confirmationPage.getAlertMessage().should('contain', 'Success');
      });
    });
  });


});