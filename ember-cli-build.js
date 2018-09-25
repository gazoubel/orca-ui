/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    'ember-power-select': {
      theme: 'bootstrap'
    }
    // ,
    // 'ember-cli-babel': {
    //   includePolyfill: true
    // }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  // app.import('bower_components/bootstrap/dist/css/bootstrap.css');
  // // app.import('bower_components/bootstrap/dist/css/bootstrap-theme.css');
  // app.import('bower_components/bootstrap/dist/css/bootstrap.css.map', { destDir: 'assets' });
  // app.import('bower_components/bootstrap/dist/js/bootstrap.js');
  //
  // app.import('bower_components/AdminLTE/dist/css/AdminLTE.css');
  // app.import('bower_components/AdminLTE/dist/css/skins/_all-skins.css');


  // app.import('ember-power-select-typeahead.scss');

  // app.import('bower_components/jquery/dist/jquery.min.js');
  app.import('bower_components/bootstrap/dist/css/bootstrap.min.css');
  app.import('bower_components/bootstrap/dist/js/bootstrap.min.js');

  app.import('bower_components/admin-lte/dist/js/adminlte.min.js');
  // app.import('bower_components/admin-lte/build/js/Tree.js');
  // app.import('bower_components/AdminLTE/bootstrap/css/bootstrap.css');
  // app.import('bower_components/admin-lte/dist/css/alt/AdminLTE-without-plugins.min.css');
  app.import('bower_components/admin-lte/dist/css/AdminLTE.min.css');
  app.import('bower_components/admin-lte/dist/css/skins/_all-skins.css');
  // app.import('bower_components/admin-lte/build/js/PushMenu.js');
  // app.import('bower_components/AdminLTE/build/js/Layout.js');
  // app.import('bower_components/AdminLTE/plugins/jQuery/jQuery-2.2.3.min.js');
  // app.import('bower_components/AdminLTE/bootstrap/js/bootstrap.min.js');
  // app.import('bower_components/AdminLTE/dist/js/app.min.js');

  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.eot',   { destDir: 'fonts' });
  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.svg',   { destDir: 'fonts' });
  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf',   { destDir: 'fonts' });
  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff',  { destDir: 'fonts' });
  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2', { destDir: 'fonts' });

  app.import('bower_components/components-font-awesome/css/font-awesome.min.css');
  app.import('bower_components/components-font-awesome/fonts/FontAwesome.otf', {
      destDir: 'fonts'
  });
  app.import('bower_components/components-font-awesome/fonts/fontawesome-webfont.eot', {
      destDir: 'fonts'
  });
  app.import('bower_components/components-font-awesome/fonts/fontawesome-webfont.svg', {
      destDir: 'fonts'
  });
  app.import('bower_components/components-font-awesome/fonts/fontawesome-webfont.ttf', {
      destDir: 'fonts'
  });
  app.import('bower_components/components-font-awesome/fonts/fontawesome-webfont.woff', {
      destDir: 'fonts'
  });
  app.import('bower_components/components-font-awesome/fonts/fontawesome-webfont.woff2', {
      destDir: 'fonts'
  });


  app.import('bower_components/ionicons/css/ionicons.min.css');
  app.import('bower_components/ionicons/fonts/ionicons.eot', {
      destDir: 'fonts'
  });
  app.import('bower_components/ionicons/fonts/ionicons.svg', {
      destDir: 'fonts'
  });
  app.import('bower_components/ionicons/fonts/ionicons.ttf', {
      destDir: 'fonts'
  });
  app.import('bower_components/ionicons/fonts/ionicons.woff', {
      destDir: 'fonts'
  });

  return app.toTree();
};
