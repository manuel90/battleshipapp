var require = {
  baseUrl: 'app',
  paths: {
    'ionic': '../lib/ionic/js/ionic.bundle.min',
    'ngMessages': '../lib/ionic/js/angular/angular-messages.min',
    'jquery': '../lib/jquery/jquery.min'
  },
  // if you are using jquery you have to add a shim for ionic and add jquery as deps
   shim: {
     //'ionic': {deps: ['jquery']},
     'ngMessages': {deps: ['ionic']}
   }
  // sometimes you need to set the loading priority especially
  // priority: [
  //   'jquery',
  //   'ionic'
  // ]
};
