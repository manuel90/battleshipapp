define([
  'app',
  'jquery'
], function (app) {
  'use strict';

  app.controller('FieldCtrl', [
    '$scope','$timeout','$ionicModal','$ionicLoading','$ionicPopup','$ionicSideMenuDelegate','db','auth','helper','$state','$ionicGesture','draw',
    function ($scope,$timeout,$ionicModal,$ionicLoading,$ionicPopup,$ionicSideMenuDelegate,db,auth,helper,$state,$ionicGesture,draw) {



      var cDom = document.getElementById('field');
      var jqE = jQuery(cDom);
      var canvas = {
        e: cDom,
        w: parseInt(jqE.css('width')),
        h: parseInt(jqE.css('height')),
        x: parseInt(jqE.position().left),
        y: parseInt(jqE.position().right)
      };

      jqE.attr('width', canvas.w);
      jqE.attr('height', canvas.h);
      jqE.attr('style', '');
      

      

      var element = angular.element(cDom); 
  
      $ionicGesture.on('drag', function(e){
        var c = helper.getXY(e.gesture.center,cDom);
        
        draw.drawLines(cDom,c.x,c.y);
      }, element);

      $ionicGesture.on('release', function(e){

        var attacks = $scope.$parent.myGame.getMyAttacks();
        
        for(var i in attacks) {
          draw.drawPointer(attacks[i],cDom);
        }

        //draw.drawMyAttacks(cDom,10,10);
      }, element);

      var uid = auth.getLoggedUser().id;
      $scope.$parent.myGame.getRef().child('/'+uid+'/field/attacks').once('value').then(function(dataAttack) {

        dataAttack.forEach(function(childSnapshot) {
            // key will be "ada" the first time and "alan" the second time
            var key = childSnapshot.key;
            // childData will be the actual contents of the child
            var childData = childSnapshot.val();
            $scope.$emit('onFire', childData, cDom, true);
        });
        

      }).catch(helper.showError);

      $scope.fire = function() {
        var p = draw.getPointer();
        $scope.$emit('onFire', p, cDom);

      };

    }
  ]);
});
