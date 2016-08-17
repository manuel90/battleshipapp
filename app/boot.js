// requires routes, config, run they implicit requiring the app
function Game(myRefDB,dataGame,draw) {
	var data = dataGame;
	var uid = firebase.auth().currentUser.uid;
	this.myAttacks = [];

	for(var key in data){
		if(key == 'id' || key == '$$hashKey' || key == uid) continue;

		myRefDB.child('/'+key+'/field/attacks').on('child_added', function(dataAttack) {
			var attack = dataAttack.val();
		});
	}

	this.getRef = function() {
		return myRefDB;
	};


	this.addShip = function(ship) {
		var ref = myRefDB.child('/'+ship.user+'/field/ships');

		var newKey = ship.id;

		if(!newKey) {
			newKey = ref.push().key;
			ship.id = newKey;
		}
		return ref.child(newKey).update(ship);
	};

	this.attack = function(idUser,pointer) {
		var ref = myRefDB.child('/'+idUser+'/field/attacks');

		var newKey = pointer.id;
		
		newKey = ref.push().key;
		pointer.id = newKey;
		
		return ref.child(newKey).update(pointer);
	};

	this.getMyAttacks = function() {
		return this.myAttacks;
	};

	this.addMyAttack = function(attack) {
		var at = {
			x: attack.x,
			y: attack.y,
			r: attack.r,
			id: attack.id
		};

		this.myAttacks.push(at);
	};

}
require([
  'routes',
  'config',
  'run'
], function () {
  'use strict';

  Object.defineProperty(window, 'FB_CONFIG', {
	  get: function() { return {
	    apiKey: "AIzaSyCIYAjC3vVMk5FdbexxJhoR-2N5QKYGA9o",
	    authDomain: "tests-d0ba7.firebaseapp.com",
	    databaseURL: "https://tests-d0ba7.firebaseio.com",
	    storageBucket: "tests-d0ba7.appspot.com"
	  };}
	});
	// Initialize Firebase
	firebase.initializeApp(FB_CONFIG);

	
  // Here you have to set your app name to bootstrap it manually
  angular.bootstrap(document, ['app']);
});
