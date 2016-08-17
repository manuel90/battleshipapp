define([
  'app'
], function (app) {
  'use strict';

  app.service('db', [
    function() {
		/**
		 * Object to reference database realtime
		 * https://firebase.google.com/docs/database/
		 ***/
		var instanceRef;

		/**
		 * Start the database reference
		 * @return object
		 ***/
		this.connect = function() {

			/**
			 * Get the database reference
			 * @return object database reference
			 ***/
			function createRef() {
				var ref = firebase.database().ref();
		        return ref;
		    }

		    return {
		    	/**
		    	 * Return database refence (apply singleton pattern)
		    	 * @return object database reference 
		    	 ***/
		        getRef: function () {
		            if (!instanceRef) {
		                instanceRef = createRef();
		            }
		            return instanceRef;
		        }
		    };
		};

		/**
		 * Save a object item to root reference database
		 * https://firebase.google.com/docs/database/web/save-data
		 * @param string root branch to save item object
		 * @param object json
		 * @return Promise object
		 ***/
		this.save = function(rootRef,item) {
			
	        if(item.$$hashKey) {
	            delete item.$$hashKey;
	        }
	        var ref = this.connect().getRef().child(rootRef);
	        var newKey = item.id;

			if(!newKey) {
				newKey = ref.push().key;
				item.id = newKey;
			}
			return ref.child(newKey).update(item);
		};

		/**
		 * Change the status to deleted to a child branch
		 * https://firebase.google.com/docs/database/web/save-data
		 * @param string root branch
		 * @param string child branch has been remove
	     * @param Date object [optional] delete date
	     * @param int [optional] number to delete status
		 * @return Promise object
		 ***/
		this.delete = function(rootRef, childRef, deletedDate, deletedStatus) {
	        if(!deletedDate) {
	            deletedDate = new Date();
	        }
	        if(!deletedStatus) {
	            deletedStatus = INACTIVE;
	        }
	        //deletedDate = helpers.changeDateFormat(deletedDate);

			var ref = this.connect().getRef().child(rootRef);
	        return ref.child(childRef).update({
	            status: deletedStatus,
	            deleted_at: deletedDate
	        });
		};

		/**
		 * Request to get child branch's value
		 * https://firebase.google.com/docs/database/web/retrieve-data
		 * @param string root branch 
		 * @param string child branch
		 * @param function callback
		 ***/
		this.get = function(rootRef, childRef, callback) {
			var ref = this.connect().getRef().child(rootRef);
			ref.child(childRef).on('value', callback);
		};

	    /**
	     * Request once to get child branch's value
	     * https://firebase.google.com/docs/database/web/retrieve-data
	     * @param string root branch 
	     * @param string child branch
	     * @param function callback
	     * @return Promise object
	     ***/
	    this.getOnce = function(rootRef, childRef) {
	        var ref = this.connect().getRef().child(rootRef);
	        return ref.child(childRef).once('value');
	    };

		/**
		 * Request to get branch's value
		 * https://firebase.google.com/docs/database/web/retrieve-data
		 * @param string branch 
		 * @param function callback
	     * @return Promise object
		 ***/
		this.getRoot = function(rootRef) {
			var ref = this.connect().getRef().child(rootRef);
			return ref.once('value');
		};

		/**
		 * Request to child_added event firebase
		 * https://firebase.google.com/docs/database/web/retrieve-data
		 * @param string branch
		 * @param function callback 
		 ***/
		this.getAll = function(rootRef, callback) {
			var ref = this.connect().getRef().child(rootRef);
			ref.on('child_added', callback);
		};

	}
  ]);
});