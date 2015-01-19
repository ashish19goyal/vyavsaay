<div id='projects_main' class='function_main'>
	<?php 
		
		echo "<ul>";
			if(strpos($_SESSION['forms'],'form101-')!==false)
				echo "<li><a id='form101_link' href='#form101' onclick='form101_header_ini(); form101_ini();' data-i18n='form.manage_projects'></a></li>";			
			if(strpos($_SESSION['forms'],'form102-')!==false)
				echo "<li><a id='form102_link' href='#form102' onclick='form102_header_ini(); form102_ini();' data-i18n='form.project_team'></a></li>";
			if(strpos($_SESSION['forms'],'form103-')!==false)
				echo "<li><a id='form103_link' href='#form103' onclick='form103_header_ini(); form103_ini();' data-i18n='form.project_phases'></a></li>";
			if(strpos($_SESSION['forms'],'form104-')!==false)
				echo "<li><a id='form104_link' href='#form104' onclick='form104_header_ini(); form104_ini();' data-i18n='form.project_tasks'></a></li>";
		echo "</ul>";

		if(strpos($_SESSION['forms'],'form101-')!==false)
			include "forms/form101.php";
		if(strpos($_SESSION['forms'],'form102-')!==false)	
			include "forms/form102.php"; 
		if(strpos($_SESSION['forms'],'form103-')!==false)
			include "forms/form103.php";
		if(strpos($_SESSION['forms'],'form104-')!==false)
			include "forms/form104.php";
		
	?>		
	
	<script>
	!function(){
		$("#projects_main").tabs(
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