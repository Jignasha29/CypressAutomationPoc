/// <reference types="cypress" />
describe('Test Suite', function () {
 it('1. API Test case-Validate Library API request from UI', function(){

    cy.visit("https://rahulshettyacademy.com/angularAppdemo/"); 
    cy.intercept({
        method: 'GET',
        url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
      },

      {
        statusCode: 200,
        body: [{
          "book_name": "RestAssured with Java",
          "isbn": "LSA",
          "aisle": "2303"
        }]
      }).as('bookRetrievals')
      cy.get("button[class='btn btn-primary']").click();
      cy.wait('@bookRetrievals');
      cy.get('p').should('have.text','Oops only 1 Book available');
    
  })

});