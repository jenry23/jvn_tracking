const path = require("path");

module.exports = {
  runtimeCompiler: true,
  pwa: {
    name: 'JVN Tracking System',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'public/service-worker.js',
      // ...other Workbox options...
    }
  },
  devServer: {
    clientLogLevel: 'info'
  },
  chainWebpack: config => {
    config
      .entry("app")
      .clear()
      .add("/resources/adminapp/js/app.js")
      .end();
    config.module.rules.delete('eslint');
    config.resolve.alias
      .set("@", __dirname + '/resources/adminapp/js')
      .set("@pages", __dirname + '/resources/adminapp/js/pages')
      .set("@components",__dirname + '/resources/adminapp/js/components')
      .set("@cruds",  __dirname + '/resources/adminapp/js/cruds')
  }
};