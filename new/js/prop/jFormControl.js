/**
 * jFormControl
 * Author: Ashish Goyal
 * Copyright: Copyright 2016 | Vyavsaay ERP
 */

(function ($) {
	$.fn.formcontrol=function(options)
	{
		return this.each(function() 
		{
			$(this).find('.floatlabel').trigger('change');
			$(this).find('textarea').autosize();
			$(this).find('.dblclick_editable').longpresseditable();
      });
	};
}(jQuery));

(function ($) {
	$.fn.codeeditor=function(options)
	{
		var defaults={mode:'javascript',content:''};
		var settings = $.extend(defaults, options || {});
	
		if (this.data('codeeditor'))
		{
			var cm=this.data('codeeditor');
			cm.setValue(settings.content);
			return cm;
		}
		else 
		{
			var cm = CodeMirror.fromTextArea(this[0], 
								{
									lineNumbers: true,
									matchBrackets: true,
         						mode: settings.mode,
         						htmlMode: true,
         						height:'auto'
   							});
			this.data('codeeditor', cm);
			cm.setValue(settings.content);
			return cm;
		}
	};
}(jQuery));

(function ($) {
	$.fn.readonly=function(options)
	{
		$(this).find('input,textarea').each(function() 
		{
			$(this).attr('readonly','readonly');
		});
		
		$(this).find('select').each(function() 
		{
			$(this).selectpicker('setStyle', 'btn-info','remove');
		});
	};
}(jQuery));

(function ($) {

	$.fn.longpresseditable=function(options)
	{
		return this.each(function() 
		{
			if($(this).data('longpresseditable'))
			{
				return;
			}
			else 
			{
				var element=$(this)[0];
				$(element).data('longpresseditable', 'longpresseditable');
			
				var tagname=$(element).prop('tagName');
				tagname=tagname.toLowerCase();
	
				if(tagname=='input' || tagname=='textarea')			
				{
					var pressTimer;
					$(element).on('touchend',function()
					{
						clearTimeout(pressTimer);
					}).on('touchstart',function()
					{
						pressTimer = window.setTimeout(function()
						{
							$(element).removeAttr('readonly');
							$(element).focus();
						},500);
					});
		
					$(element).dblclick(function()
					{
						$(element).removeAttr('readonly');
					});
				}
				else if(tagname=='select')
				{
					$(element).selectpicker();
					$(element).on('change',function(e)
					{
						$(element).selectpicker('setStyle', 'btn-info');
					});
				}
			}
      });
	};
}(jQuery));