const { defineConfig } = require("cypress");

module.exports = defineConfig({
   video: true,
  videoUploadOnPasses: true,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
  embeddedScreenshots: true,
  reportPageTitle: "Cypress Test Report",
  },
  env:{
      url: "https://rahulshettyacademy.com"
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
    specPattern: 'cypress/integration/**/*.js'
  },
});
