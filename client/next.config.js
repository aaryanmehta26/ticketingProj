// sometimes, next js dont detect file change, so this will make sure it does and this file run automatically
module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
};
