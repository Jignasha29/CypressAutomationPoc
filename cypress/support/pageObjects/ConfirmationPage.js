class ConfirmationPage{
    locators ={
        successMsg: '.alert-success'
    };
    submitFormDetails(countryName){
        cy.submitFormDetails(countryName);
    }
     getAlertMessage(){
        return cy.get(this.locators.successMsg)
    }
}
export default ConfirmationPage