define([
  'app'
], function (app) {
  'use strict';

  app.controller('UserCtrl', [
    '$scope','$timeout','$ionicModal','$ionicLoading','$ionicPopup','$ionicSideMenuDelegate','db','auth','helper','$state',
    function ($scope,$timeout,$ionicModal,$ionicLoading,$ionicPopup,$ionicSideMenuDelegate,db,auth,helper,$state) {

      $scope.getUser = function() {
        var u = auth.getLoggedUser();
        //u.duid = $cordovaDevice.getUUID();
        return u;
      };



      $scope.user = {
        email: 'test@mail.com',
        password: '123456'
      };

      $scope.signIn = function(form, userInfo) {
        if(!form.$valid) {
          return;
        }
        form.$setPristine();
        form.$setUntouched();

        helper.showLoading();
        
        $scope.uauth = null;

        auth.login(userInfo.email,userInfo.password).then(function(user){
          

          db.getOnce('/users', user.uid).then(function(dataUser){
              var usr = dataUser.val();

              auth.setLoggedUser(usr);
              $timeout(function(){

                $scope.uauth = auth.getLoggedUser();
                
                $state.go('profile');
                helper.hideLoading();
              
              });

          }).catch(helper.showError);

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
        
      };

      $scope.signOut = function() {
        helper.showLoading();
        
        auth.logout().then(function(){
          $state.go('login');
          helper.hideLoading();
        }).catch(helper.showError);
        
      };


      $scope.register = function(form,userInfo) {
        if(!form.$valid) {
          return;
        }
        form.$setPristine();
        form.$setUntouched();

        helper.showLoading();
        auth.createAccount(userInfo.email,userInfo.password).then(function(newUser){

          var cuser = {
            id: newUser.uid,
            displayName: userInfo.displayName,
            email: newUser.email
          }
          db.save('/users', cuser).then(function(){
            auth.login(userInfo.email,userInfo.password).then(function(){
              
              $timeout(function(){
                auth.setLoggedUser(cuser);
                $state.go('profile');
                helper.hideLoading();
              });
            }).catch(helper.showError);

          }).catch(helper.showError);

        }).catch(helper.showError);
      };

    }
  ]);
});
