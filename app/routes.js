define([
  'app',
  
  'services/auth',
  'services/connection',
  'services/helper',
  'services/draw',
  'services/game',

  // Load Controllers here
  'controllers/main',
  'controllers/game',
  'controllers/user',
  'controllers/field'
], function (app) {
  'use strict';

  var lang = 'es';
  // definition of routes
  app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      // url routes/states

      var requiredLogin = {
        requiredLogin: function($q,auth) {
          var defer = $q.defer();

          if(!auth.isLoggedIn()) {
            defer.reject("LOGIN_REQUIRED");
          } else {
            defer.resolve();
          }
          return defer.promise;
        }
      };

      $urlRouterProvider.otherwise('login');

      $stateProvider
        // app states
        .state('dashboard', {
          url: '/dashboard',
          templateUrl: 'app/templates/'+lang+'/login.html',
          controller: 'UserCtrl'
        })
        .state('registration', {
          url: '/registration',
          templateUrl: 'app/templates/'+lang+'/registration.html',
          controller: 'UserCtrl'
        })
        .state('login', {
          url: '/login',
          templateUrl: 'app/templates/'+lang+'/login.html',
          controller: 'UserCtrl'
        })

        /**************** REQUIRED LOGIN STATUS TABS *********************/

        .state('field', {
          url: '/field',
          templateUrl: 'app/templates/'+lang+'/field.html',
          controller: 'FieldCtrl',
          resolve: requiredLogin
        })

        .state('profile', {
          url: '/profile',
          templateUrl: 'app/templates/'+lang+'/profile.html',
          controller: 'UserCtrl',
          resolve: requiredLogin
        })



        


        /**************** STATES START CONFIG NEW GAME *********************/

        .state('game/step/1', {
          url: '/game/step/1',
          templateUrl: 'app/templates/'+lang+'/chooseOponent.html',
          controller: 'GameCtrl',
          resolve: requiredLogin,
          step: 1
        })

        .state('game/step/2', {
          url: '/game/step/2',
          templateUrl: 'app/templates/'+lang+'/putShips.html',
          controller: 'GameCtrl',
          resolve: requiredLogin,
          step: 2
        })

        .state('battle', {
          url: '/battle',
          templateUrl: 'app/templates/'+lang+'/field.html',
          controller: 'FieldCtrl',
          resolve: requiredLogin,
          step: 3
        })

        .state('mygames', {
          url: '/mygames',
          templateUrl: 'app/templates/'+lang+'/mygames.html',
          controller: 'GameCtrl',
          resolve: requiredLogin
        });
    }
  ]);
});
