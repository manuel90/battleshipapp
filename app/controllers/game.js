define([
  'app'
], function (app) {
  'use strict';

  app.controller('GameCtrl', [
    '$scope','$ionicGesture','helper','auth','db','draw','$timeout','$stateParams','$state',
    function ($scope,$ionicGesture,helper,auth,db,draw,$timeout,$stateParams,$state) {

      var step = $state.current.step;

      var dbRefUsers = '/users';
      var dbRefBattles = '/battles';

      $scope.listChooseUsers = [];
      var cDom = document.getElementById('myField');

      if(step == 1) {

        db.getRoot(dbRefUsers).then(function(allUsers){
        var total = allUsers.numChildren();
          helper.showLoading();

          db.getAll(dbRefUsers, function(dataUser){
            var user = dataUser.val();

            $timeout(function(){
              $scope.listChooseUsers.push(user);
              if(total == $scope.listChooseUsers.length) {
                helper.hideLoading();
              }
            });
          });

        }).catch(helper.showError);

      } else if(step == 2) {
        var jqE = jQuery(cDom);
        var canvas = {
          e: cDom,
          w: parseInt(jqE.css('width')),
          h: parseInt(jqE.css('height'))
        };

        jqE.attr('width', canvas.w);
        jqE.attr('height', canvas.h);
        jqE.attr('style', '');

        var element = angular.element(cDom);
        $ionicGesture.on('tap', function(e){
          var c = helper.getXY(e.gesture.center,cDom);
          
          var context = draw.loadContext(cDom);
          

          var ship = {
            x: c.x,
            y: c.y,
            type: 'ship',
            user: auth.getLoggedUser().id
          };
          $scope.$emit('onGameAddShip', ship);
          
          draw.drawShip(context,ship.x,ship.y);

        }, element);
      }

      $scope.chooseOponent = function(idUser) {
        $scope.$emit('gameStep1', idUser);
        $scope.$emit('goUrl','/game/step/2');
      };


      /**
       * 
       ***************************************************/
      $scope.listGames = [];

      

      db.getAll(dbRefBattles, function(dataBattle){
        var battle = dataBattle.val();

        $timeout(function(){

          var user = auth.getLoggedUser();

          if(battle[user.id]) {
            $scope.listGames.push(battle);
          }
          
        });
      });


      $scope.chooseGame = function(game) {
        draw.setCanvas(document.getElementById('field'));
        $scope.$emit('chooseGame', game, draw);
        
        if(typeof game[auth.getLoggedUser().id].field == 'undefined' || typeof game[auth.getLoggedUser().id].field.ships == 'undefined') {
          $scope.$emit('goUrl','/game/step/2');
        } else {
          $scope.$emit('goUrl','/field');
        }
        
      };
      

    }
  ]);
});
