import CartPage from "../../support/pageObjects/CartPage";
class ProductPage{

    locators ={
        shopName: 'Shop Name',
        cardList: 'app-card-list app-card',
        addBtnText: 'Add',
        checkoutLinkText:'Checkout'

    };
    pageValidation(){
        cy.contains(this.locators.shopName).should('be.visible');
    }

    getCardCount(){
       return cy.get(this.locators.cardList);
    }

    selectFirstProduct(){
        cy.get(this.locators.cardList).eq(0).contains('button',this.locators.addBtnText).click();
    }

    goToCart(){
        cy.contains('a',this.locators.checkoutLinkText).click();
        return new CartPage();
    }

    selectProduct(productName){
        cy.get(this.locators.cardList).filter(`:contains("${productName}")`)
        .then($element => {
            cy.wrap($element).should('have.length',1);
            cy.wrap($element).contains('button',this.locators.addBtnText).click();
        })
    }
}
export default ProductPage;