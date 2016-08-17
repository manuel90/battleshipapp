define([
  'app'
], function (app) {
  'use strict';

  app.service('helper', ['$ionicLoading','$ionicPopup',
	function($ionicLoading,$ionicPopup) {
		this.showError = function(error) {
			console.log('ERROR:',error);
		};

		this.showLoading = function() {
			$ionicLoading.show({
				template: 'Cargando...'
			}).then(function(){
				
			});
		};
		this.hideLoading = function(){
			$ionicLoading.hide().then(function(){
				
			});
		};
		this.showAlert = function(title, content){
			if(arguments[2] && arguments[2] == 'id'){
				content = document.getElementById(content);
				title = document.getElementById(title);
			}
			var alertPopup = $ionicPopup.alert({
				title: title,
				template: content
			});
		};

		this.getXY = function(evt, element) {
			var rect = element.getBoundingClientRect();
			var scrollTop = document.documentElement.scrollTop?
			        document.documentElement.scrollTop:document.body.scrollTop;
			var scrollLeft = document.documentElement.scrollLeft?                   
			        document.documentElement.scrollLeft:document.body.scrollLeft;
			var elementLeft = rect.left+scrollLeft;  
			var elementTop = rect.top+scrollTop;

			var x = evt.pageX-elementLeft;
			var y = evt.pageY-elementTop;

			return {x:x, y:y};
		};
		
	}
  ]);
});
