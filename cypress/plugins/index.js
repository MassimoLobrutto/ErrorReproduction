//require('cypress-plugin-tab').default

const { moveMessagePortToContext } = require('worker_threads');
const { connect } = require('http2');

//Leave most of these as they set you up for cucumber support

module.exports = (on, config) => {
  
  //clear reports folder before every run
  const fs = require('fs-extra')
  const reportsDirectory = "cypress/cucumber-json";
  const screenShotsDirectory = "cypress/reports";

  async function clearReports() {
    try {
      fs.emptyDir(reportsDirectory);
      fs.rmdirSync(reportsDirectory, { recursive: true });
      fs.rmdirSync(screenShotsDirectory, { recursive: true });
      fs.mkdirSync(reportsDirectory);
      fs.mkdirSync(screenShotsDirectory);
    } catch (err) {
      console.log(err);
    }
    return null
  }

  on('task', {
    clearReports: () => {
      return clearReports()
    },
  })

  on('task', {
    clearScreenshots: () => {
      return clearScreenshots()
    },
  })  
}

  //For Cucumber Integration
  const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;
  const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
  const nodePolyfills = require('@esbuild-plugins/node-modules-polyfill').NodeModulesPolyfillPlugin;
  const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
  module.exports = async (on, config) => {
    await addCucumberPreprocessorPlugin(on, config); // to allow json to be produced
    // To use esBuild for the bundler when preprocessing
    on(
      'file:preprocessor',
      createBundler({
        sourcemap: "inline",
        plugins: [nodePolyfills(), createEsbuildPlugin(config)],
      }),
    );
    return config;
  }
