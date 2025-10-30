import ConfirmationPage from "../../support/pageObjects/ConfirmationPage";
class CartPage{

    locators={
        checkoutBtnText : 'Checkout',
        productPrice : 'tr td:nth-child(4) strong'
    };
     checkoutItems(){
        cy.contains('button',this.locators.checkoutBtnText).click()
        return new ConfirmationPage()
    }

    sumOfProducts(){
        let sum = 0;
         return cy.get(this.locators.productPrice).each($e1=>{
            const amount=Number($e1.text().split(" ")[1].trim())
            sum = sum + amount
        }).then(() =>{
            return sum
        });
    }

}
export default CartPage;