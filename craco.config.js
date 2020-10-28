const sassResourcesLoader = require('craco-sass-resources-loader');

module.exports = {
  plugins: [
    {
      plugin: sassResourcesLoader,
      options: {
        //load variable.scss, custom.scss and animation.scss before any scss/sass file
        resources: ['./src/scss/variables.scss', './src/scss/custom.scss', './src/scss/mixin.scss'],
      },
    },
  ],
};
