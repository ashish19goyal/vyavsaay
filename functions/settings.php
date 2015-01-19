<div id='settings_main' class='function_main'>
	<?php 
	
		echo "<ul>";
			if(strpos($_SESSION['forms'],'form47-')!==false)
				echo "<li><a id='form47_link' href='#form47' onclick='form47_header_ini();' data-i18n='form.change_password'></a></li>";
			if(strpos($_SESSION['forms'],'form99-')!==false)
				echo "<li><a id='form99_link' href='#form99' data-i18n='form.delete_storage'></a></li>";
			if(strpos($_SESSION['forms'],'form77-')!==false)
				echo "<li><a id='form77_link' href='#form77' onclick='form77_header_ini(); form77_ini();' data-i18n='form.set_shortcuts'></a></li>";
			if(strpos($_SESSION['forms'],'form54-')!==false)
				echo "<li><a id='form54_link' href='#form54' onclick='form54_header_ini(); form54_ini();' data-i18n='form.select_print_templates'></a></li>";
		echo "</ul>";

		if(strpos($_SESSION['forms'],'form47-')!==false)
			include "forms/form47.php";
		if(strpos($_SESSION['forms'],'form77-')!==false)
			include "forms/form77.php";
		if(strpos($_SESSION['forms'],'form54-')!==false)
			include "forms/form54.php";
		if(strpos($_SESSION['forms'],'form99-')!==false)
			include "forms/form99.php";
	?>
	
	<script>
	!function(){
		$("#settings_main").tabs(
		{
			show:"slide",
			activate:function(e, ui) 
		    {
		    	e.currentTarget.blur();
		    },
		    beforeActivate:function(event,ui)
		    {
		    	$(document).off('keydown');
			}
		}).css(
			{
				'min-height': '570px',
				'overflow': 'auto'
			});
		}();
	</script>

</div>