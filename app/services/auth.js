define([
  'app'
], function (app) {
  'use strict';

  app.service('auth', [
    function(){

		var fauth = firebase.auth();

		var currentUser = null;

		/**
		 * 
		 * @param 
		 * @return Promise object
		 ***/
		this.login = function(email, password) {
			var resultLogin = fauth.signInWithEmailAndPassword(email, password);

			resultLogin.then(function(user){
				currentUser = user;//user.uid
				/*
				if(arguments[2]) {
					var success = arguments[2];
					success(currentUser);
				}*/
			});

			return resultLogin;
		};

		/**
		 * 
		 * @param 
		 * @return Promise object
		 ***/
		this.logout = function() {

			var resultLogout = fauth.signOut();

			resultLogout.then(function(){
				currentUser = null;
				/*
				if(arguments[0]) {
					var success = arguments[0];
					success(currentUser);
				}*/
			});

			return resultLogout;
		};

		this.getLoggedUser = function() {
			if(this.isLoggedIn()) {
				return currentUser;
			}
			return null;
		};

		this.setLoggedUser = function(userData) {
			currentUser = userData;
		};
		
		this.isLoggedIn = function() {
			//auth.onAuthStateChanged(onAuthStateChanged);
			var user = fauth.currentUser;
			return currentUser != null && user != null;
			
		};

		this.createAccount = function(email,password) {
			return fauth.createUserWithEmailAndPassword(email,password);
		};

		this.getAuth = function() {
			return fauth;
		};
	}
  ]);
});