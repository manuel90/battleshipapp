define([
  'app'
], function (app) {
  'use strict';

  app.controller('mainCtrl', [
    '$scope',
    '$state',
    '$location',
    '$timeout',
    'db','helper',
    'auth','game', 'draw',
    function ($scope,$state,$location,$timeout,db,helper,auth,game,draw) {

    	$scope.myGame = {
    		myShips: [],
            myAttacks: []
    	};

    	$scope.go = function(state) {
    		$state.go(state);
    	};

    	$scope.$on('gameStep1', function(event, idUser){
            var user = auth.getLoggedUser();

            game.create(user.id,idUser,function(newGame){
                $timeout(function(){
                    $scope.myGame = newGame;
                });
            });
    	});

        $scope.$on('chooseGame', function(event, gameData,draw){
            var ref = db.connect().getRef().child('/battles/'+gameData.id);
            $scope.myGame = new Game(ref,gameData,draw);
        });

    	$scope.$on('goUrl', function(event, path){
    		$location.path(path);
    	});

    	$scope.$on('onGameAddShip', function(event, ship){
            $scope.myGame.addShip(ship);
    	});

        $scope.$on('onFire', function(event, pointer, cDom, onlyDraw){
            var user = auth.getLoggedUser();

            $scope.myGame.addMyAttack(pointer);
            if(!onlyDraw) {
                $scope.myGame.attack(user.id,pointer).then(function(){

                    draw.drawPointer(pointer,cDom);

                }).catch(helper.showError);
            } else {
                draw.drawPointer(pointer,cDom);
            }
        });
    	
        
      
    }
  ]);
});
