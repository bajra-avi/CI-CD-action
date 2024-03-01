const { defineConfig } = require("cypress");

module.exports = defineConfig({
 e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message)
          return message
        },
      })
    },
    'baseUrl':'https://dummyapi.io/explorer',
    video: true,
    screenshots: {
      screenshotOnRunFailure: true
    },
    chromeWebSecurity: false,
    experimentalSessionAndOrigin: true,
 },
});
