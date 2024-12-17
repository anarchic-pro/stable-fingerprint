module.exports = function(config) {
    config.set({
      frameworks: ['jasmine'],
      files: [
        'tests/**/*.test.js'
      ],
      preprocessors: {
        'tests/**/*.test.js': ['webpack']
      },
      webpack: {
        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader'
              }
            }
          ]
        }
      },
      browsers: ['ChromeHeadless'],
      singleRun: true
    });
  };