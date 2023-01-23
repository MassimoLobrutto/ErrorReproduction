const { defineConfig } = require('cypress')

module.exports = defineConfig({
  retries: {
    runMode: 1
  },
  watchForFileChanges: true,
  video: false,
  modifyObstructiveCode: false,
  scrollBehavior: "center",
  chromeWebSecurity: false,
  numTestsKeptInMemory: 0,
  pageLoadTimeout: 200000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    baseUrl: "http://automationpractice.com/index.php",
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern: "**/*.feature",
  },
})
