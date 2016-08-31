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
			$(this).find('.floatlabel:visible').floatlabel();
			$(this).find('.floatlabel_right:visible').floatlabel_right();
			$(this).find('textarea').autosize();
			$(this).find("form").attr('autocomplete', 'off');
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
		$(this).closest('tr').find('input,textarea').each(function()
		{
			$(this).attr('readonly','readonly');
		});

		$(this).closest('tr').find('select').each(function()
		{
			$(this).selectpicker('setStyle', 'btn-info','remove');
		});

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
	$.fn.editable=function(options)
	{
		$(this).closest('tr').find('input,textarea').each(function()
		{
			$(this).removeAttr('readonly');
		});

		$(this).find('input,textarea').each(function()
		{
			$(this).removeAttr('readonly');
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

(function ($) {
	$.fn.floatlabel_right=function(options)
	{
		var defaults={labelStartTop:'30%',
                    labelEndTop:'30%',
                    fontsize:'inherit',
                    left: '50%'};
		var settings = $.extend(defaults, options || {});

		if (this.data('plugin_floatlabel'))
		{
			return;
		}
		else
		{
			this.floatlabel(settings);
			return;
		}
	};
}(jQuery));

(function ($) {
	$.fn.fileInput=function(options)
	{
		var defaults={fileType:'.csv'};
		var settings = $.extend(defaults, options || {});
		var dummy = this;

		if (this.data('plugin_file_input'))
		{
			var input_string = this.data('plugin_file_input');
			var input_object = JSON.parse(input_string);
			document.getElementById(input_object.input).value="";
			document.getElementById(input_object.output).value="";
			$(dummy).attr('class','btn red-sunglo');

			return input_string;
		}
		else
		{
			var id = vUtil.newKey();

			var input = document.createElement('input');
			input.type='file';
			input.accept=settings.fileType;
			input.style='display:none;';
			input.id = "file_input_"+id;

			var output = document.createElement('output');
			output.id = "file_output_"+id;

			$(dummy).closest('div').append(input);
			$(dummy).closest('div').append(output);

			$(dummy).off('click');
			$(dummy).on('click',function (e)
			{
				e.preventDefault();
				$(input).trigger('click');
			});

			$(dummy).attr('class','btn red-sunglo');

			input.value="";
			output.value="";

			$(input).on('change',function ()
			{
				var file_name=input.value;
				if(file_name!="" && (file_name.indexOf(settings.fileType)>-1))
				{
					$(dummy).attr('class','btn green-jungle');
					output.value=file_name;
				}
				else
				{
					$(dummy).attr('class','btn red-sunglo');

					input.value="";
					output.value="";
				}
			});

			var return_object = JSON.stringify({input:input.id,output:output.id});
			this.data('plugin_file_input',return_object);
			return this.data('plugin_file_input');
		}
	};
}(jQuery));
