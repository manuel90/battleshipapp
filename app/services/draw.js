define([
  'app'
], function (app) {
  'use strict';

  app.service('draw', ['helper',
	function(helper) {

		this.SHIP = {
			width: 10,
			height: 14
		};

		var context = null;
		var myCanvas = null;
		var pointer = {
			r: 4
		};

		this.loadContext = function(canvas){
			if(canvas && canvas.getContext){
				var context = canvas.getContext('2d');
				if(context){
					return context;
				}
			}
			return false;
		};

		this.getContext = function(canvas){
			if(!context){
				context = this.loadContext(canvas);
			}
			return context;
		};

		this.getPointer = function(){
			if(!pointer){
				
			}
			return pointer;
		};

		this.setCanvas = function(canvas) {
			myCanvas = canvas;
		};

		this.drawPointer = function(pointer,canvas) {
			if(!canvas) {
				canvas = myCanvas;
			}
			//console.log('canvas',canvas);
			var context = this.getContext(canvas);

			context.beginPath();

			context.arc(pointer.x, pointer.y, pointer.r, 0, 2*Math.PI);
			context.fillStyle = "#f00";
			context.fill();

			context.strokeStyle = "#f00";


			context.stroke();
		};

		

		this.cleanCanvas = function(canvas) {
			var context = this.getContext(canvas);
			context.clearRect(0, 0, canvas.width, canvas.height);
		};

		this.drawShip = function(ctx,x,y) {
			ctx.fillStyle = "green";
			ctx.fillRect(x, y, this.SHIP.width, this.SHIP.height);
		};

		this.lines = function(canvas,x,y) {
        	var ctx = this.getContext(canvas);
	        var nX = parseInt(x);

	        context.strokeStyle = "#000";
	        
	        ctx.beginPath();

	        ctx.moveTo(nX,0);
	        ctx.lineTo(nX,canvas.height);
			ctx.stroke();
	        
	        var nY = parseInt(y);
	        

	        ctx.beginPath();
	        ctx.moveTo(0,nY-35);
	        ctx.lineTo(canvas.width,nY-35);
	        ctx.stroke();

	        pointer.x = nX;
	        pointer.y = nY-35;
	    };

      this.drawLines = function(canvas,x,y){
        var context = this.getContext(canvas);
        context.clearRect(0, 0, canvas.width, canvas.height);
        if(context){
          this.lines(canvas,x,y);
          return true;
        }
        return false;
      };
		
	}
  ]);
});
