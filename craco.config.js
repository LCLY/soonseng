const CracoLessPlugin = require('craco-less');
const sassResourcesLoader = require('craco-sass-resources-loader');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#af0606',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
    {
      plugin: sassResourcesLoader,
      options: {
        //load variable.scss, custom.scss and animation.scss before any scss/sass file
        resources: ['./src/scss/variables.scss', './src/scss/custom.scss', './src/scss/mixin.scss', './src/index.scss'],
      },
    },
  ],
};

// package.json generatedoc command
// "generate-docs": "typedoc --out docs --exclude \"**/*+(index).ts\" --exclude \"**/store/actions/*+(actionTypes|sales).ts\" --exclude \"**/store/reducers/*.ts\" src"
