/**
 * jDatepicker
 * Author: Ashish Goyal
 * Copyright: Copyright 2016 | Vyavsaay ERP
 * description: This is a specific instantiation of bootstrap-datetimepicker
 */

(function ($) {

	$.fn.datepicker=function(options)
	{
		return this.each(function() 
		{
			$(this).datetimepicker({format:'DD/MM/YYYY'});
      });      
	};
}(jQuery));

(function ($) {
	$.fn.vdatetimepicker=function(options)
	{
		return this.each(function() 
		{
			$(this).datetimepicker({format:'DD/MM/YYYY HH:mm'});
      });      
	};
}(jQuery));