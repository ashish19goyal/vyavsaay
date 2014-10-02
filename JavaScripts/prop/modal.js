function modal_verify_password()
{
	var dialog=$("#modal_re_password").dialog({
   		autoOpen: false,
   		modal: true,
   		show: "bounce",
   		closeOnEscape: true,
       	buttons:{ OK:function(){$(this).dialog("close");}}
	});
	dialog.find("form").on("submit", function(event)
	{
		event.preventDefault();
		$(this).parent().dialog("close");
	});
}

function modal_access_denied()
{
	var dialog=$("#modal_access_denied").dialog({
   		autoOpen: false,
   		modal: true,
   		show: "bounce",
   		closeOnEscape: true,
       	buttons:{ OK:function(){$(this).dialog("close");}}
	});
}
