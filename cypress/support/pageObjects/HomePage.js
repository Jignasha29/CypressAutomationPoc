import ProductPage from "../../support/pageObjects/ProductPage";
class HomePage{

    locators ={
        userName: '#username',
        password: '#password',
        signInBtn: '#signInBtn'
    };
    goTo(url){
        cy.visit(url);
    }
    login(username,password){
        cy.get(this.locators.userName).type(username);
       cy.get(this.locators.password).type(password);
       cy.get(this.locators.signInBtn).click();
       return new ProductPage();
    }
}
export default HomePage;