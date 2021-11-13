// const { InjectManifest } = require('workbox-webpack-plugin')

module.exports = {
  runtimeCompiler: true,
  pwa: {
    name: 'JVN Tracking System',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'InjectManifest',
    workboxOptions:{
      swSrc: "public/sw.js"
    }
  },
  devServer: {
    clientLogLevel: 'info',
  },
  chainWebpack: config => {
    config
      .entry("app")
      .clear()
      .add("/resources/adminapp/js/app.js")
      .end();
    config.module.rules.delete('eslint')
    config.performance
      .hints(false)
    config.resolve.alias
      .set("@", __dirname + '/resources/adminapp/js')
      .set("@pages", __dirname + '/resources/adminapp/js/pages')
      .set("@components",__dirname + '/resources/adminapp/js/components')
      .set("@cruds",  __dirname + '/resources/adminapp/js/cruds')
  }
};
