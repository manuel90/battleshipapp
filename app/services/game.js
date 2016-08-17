define([
  'app'
], function (app) {
  'use strict';

  app.service('game', ['db','helper',
	function(db,helper) {
		
		this.create = function(challenging,opponent,callbackResolve) {
			
			var gameData = {};

			gameData[challenging] = {
				me: challenging,
				field: {}
			};

			gameData[opponent] = {
				me: opponent,
				field: {}
			};
			db.save('/battles',gameData).then(function(){
				
				var ref = db.connect().getRef().child('/battles/'+gameData.id);
				var newGame = new Game(ref,gameData);

				callbackResolve(newGame);

			}).catch(helper.showError);
		}
		
	}
  ]);
});
