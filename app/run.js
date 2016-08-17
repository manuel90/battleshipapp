define([
  'app'
], function (app) {
  'use strict';
  // the run blocks
  app.run([
    '$ionicPlatform',
    'db',
    'auth',
    function ($ionicPlatform,db,auth) {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
          console.log('YES cordova loaded!');
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        } else {
          console.log('NO cordova load');
        }
        if(window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
        var dbRefIdDevicesIonic = '/tokensDevicesIonic';
        var dbRefIdDevicesFirebase = '/tokensDevicesFirebase';
        var push = new Ionic.Push({
          "debug": true,
          "onRegister": function(data) {
            console.log('TOKEN??',data.token);
          }
        });

        FCMPlugin.getToken(
          function(token){
            console.log(token);
            auth.login('mlopezlara90@gmail.com','123456').then(function(user){
              
              db.save(dbRefIdDevicesFirebase,{tokenid: token, test: 987654}).then(function(){
                auth.logout().then(function(){
                }).catch(function(error){});
              }).catch(function(error){});

            }).catch(function(error){
              helper.hideLoading();
              if(error.code == 'auth/wrong-password') {
                helper.showAlert('Error',error.message);
              } else if(error.code == 'auth/user-not-found') {
                helper.showAlert('Error',error.message);
              } else if(error.code == 'auth/invalid-email') {
                helper.showAlert('Error',error.message);
              } else if(error.code == 'auth/user-disabled') {
                helper.showAlert('Error',error.message);
              }
              
            });
          },
          function(err){
            console.log('error retrieving token: ' + err);
          }
        );

        FCMPlugin.onNotification(
          function(data){
            if(data.wasTapped){
            //Notification was received on device tray and tapped by the user.
            alert( JSON.stringify(data) );
            }else{
            //Notification was received in foreground. Maybe the user needs to be notified.
            alert( JSON.stringify(data) );
            }
          },
          function(msg){
            console.log('onNotification callback successfully registered: ' + msg);
          },
          function(err){
            console.log('Error registering onNotification callback: ' + err);
          }
        );
        push.register(function(token) {
          console.log("Device token:",token.token);

          auth.login('mlopezlara90@gmail.com','123456').then(function(user){
            /*
            db.save(dbRefIdDevicesIonic,{tokenid: token.token}).then(function(){
              auth.logout().then(function(){
              }).catch(function(error){});
            }).catch(function(error){});*/

          }).catch(function(error){
            helper.hideLoading();
            if(error.code == 'auth/wrong-password') {
              helper.showAlert('Error',error.message);
            } else if(error.code == 'auth/user-not-found') {
              helper.showAlert('Error',error.message);
            } else if(error.code == 'auth/invalid-email') {
              helper.showAlert('Error',error.message);
            } else if(error.code == 'auth/user-disabled') {
              helper.showAlert('Error',error.message);
            }
            
          });
        });
      });
    }
  ]);

  /*
  app.run(function($rootScope,$state,$timeout,helper) {
    $rootScope.$on("$routeChangeError", function (e, next, prev,error) {
      // We can catch the error thrown when the $requireAuth promise is rejected
      // and redirect the user back to the home page
      console.log(error);
      if(error == 'LOGIN_REQUIRED') {
        console.log("redirect");
        $state.go('login');
        return;
      }

    });
  });*/
});
