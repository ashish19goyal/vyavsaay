/**
 * vFileHandler
 * Author: Ashish Goyal
 * Copyright: Copyright 2016 | Vyavsaay ERP
 */
var vFileHandler = {

	/**
	 * this function resizes and sets the preview of the picture
	 * options : {evt: evt that triggers image selection
	 *			size: size of the image - small,large, original,
	 *			fsuccess: function to be executed on success
	 *		}
	*/
	picture : function(options)
	{
		var defaults={};
		var settings = $.extend(defaults, options || {});

		var file=settings.evt.target.files[0];
		if(file.type.match('image.*'))
		{
			var reader = new FileReader();

			reader.onloadend=function()
			{
			    var tempImg = new Image();
			    tempImg.src = reader.result;
			    tempImg.onload = function()
			    {
			        var MAX_WIDTH = 200;
			        var MAX_HEIGHT = 150;
					if(settings.size=='large'){
						MAX_WIDTH = 1600;
				        MAX_HEIGHT = 1200;
					}

					var tempW = tempImg.width;
					var tempH = tempImg.height;

					if(!vUtil.isBlank(settings.size) && settings.size=="small" || settings.size=="large"){
				        if (tempW > tempH) {
				            if (tempW > MAX_WIDTH) {
				               tempH *= MAX_WIDTH / tempW;
				               tempW = MAX_WIDTH;
				            }
				        } else {
				            if (tempH > MAX_HEIGHT) {
				               tempW *= MAX_HEIGHT / tempH;
				               tempH = MAX_HEIGHT;
				            }
				        }
					}

			        var canvas = document.createElement('canvas');
			        canvas.width = tempW;
			        canvas.height = tempH;
			        var ctx = canvas.getContext("2d");
			        ctx.drawImage(this, 0, 0, tempW, tempH);
			        var dataURL = canvas.toDataURL("image/jpeg");
			        settings.fsuccess(dataURL);
			    };

			};
			reader.readAsDataURL(file);
		}
	},

	/**
	 * this function helps in uploading any documents
	 * options : {evt: evt that triggers image selection
	 			fsuccess: function to be executed on success
			}
	*/
	document : function(options)
	{
		var defaults={};
		var settings = $.extend(defaults, options || {});

		var file=settings.evt.target.files[0];
		var reader = new FileReader();

		reader.onloadend=function()
		{
	        var dataURL = reader.result;
	        settings.fsuccess(dataURL);
		};
		reader.readAsDataURL(file);
	}
};
