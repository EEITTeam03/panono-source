const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'? '/panono/': '/',
  chainWebpack: (config) => {
    config.resolve.alias
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
  },
};
