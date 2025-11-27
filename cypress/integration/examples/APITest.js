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

  it('2. Modify request URL by adding book name',function(){
    cy.visit("https://rahulshettyacademy.com/angularAppdemo/"); 
    cy.intercept({
      method: 'GET',
      url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
    },
    (req) =>{
       {
        req.url = req.url + '&book_name=RestAssured with Java'
        req.continue(); //sends the modified request to the actual serrver
      }
    }).as('modifiedRequest');
    cy.get("button[class='btn btn-primary']").click();
    cy.wait('@modifiedRequest').then((interception)=>{
      cy.log('Final URL sent to server:',interception.request.url)
      expect(interception.request.url).to.include('book_name=RestAssured with Java');
      expect(interception.response.statusCode).to.equal(200);
      const responseBody = interception.response.body;
      expect(responseBody[0]).to.have.property('book_name');
      expect(responseBody[0]).to.have.property('isbn');
      expect(responseBody[0]).to.have.property('aisle');
    })
  })


});