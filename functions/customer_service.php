<div id='customer_service_main' class='function_main'>
	<?php 
		
		echo "<ul>";
			if(strpos($_SESSION['forms'],'form125-')!==false)
				echo "<li><a id='form125_link' href='#form125' onclick='form125_header_ini(); form125_ini();' data-i18n='form.customer_accounts'></a></li>";			
			if(strpos($_SESSION['forms'],'form126-')!==false)
				echo "<li><a id='form126_link' href='#form126' onclick='form126_header_ini(); form126_ini();' data-i18n='form.issues_list'></a></li>";
			if(strpos($_SESSION['forms'],'form128-')!==false)
				echo "<li><a id='form128_link' href='#form128' onclick='form128_header_ini(); form128_ini();' data-i18n='form.manage_service_requests'></a></li>";
			if(strpos($_SESSION['forms'],'form129-')!==false)
				echo "<li><a id='form129_link' href='#form129' onclick='form129_ini();' data-i18n='form.engineer_locations'></a></li>";
			if(strpos($_SESSION['forms'],'form130-')!==false)
				echo "<li><a id='form130_link' href='#form130' onclick='form130_header_ini(); form130_ini();' data-i18n='form.job_orders'></a></li>";
			if(strpos($_SESSION['forms'],'form131-')!==false)
				echo "<li><a id='form131_link' href='#form131' onclick='form131_header_ini(); form131_ini();' data-i18n='form.assign_tasks'></a></li>";
			if(strpos($_SESSION['forms'],'form132-')!==false)
				echo "<li><a id='form132_link' href='#form132' onclick='form132_header_ini(); form132_ini();' data-i18n='form.create_service_request'></a></li>";			
		echo "</ul>";

		if(strpos($_SESSION['forms'],'form125-')!==false)
			include "forms/form125.php";
		if(strpos($_SESSION['forms'],'form126-')!==false)	
			include "forms/form126.php"; 
		if(strpos($_SESSION['forms'],'form128-')!==false)
			include "forms/form128.php";
		if(strpos($_SESSION['forms'],'form129-')!==false)
			include "forms/form129.php";
		if(strpos($_SESSION['forms'],'form130-')!==false)
			include "forms/form130.php";
		if(strpos($_SESSION['forms'],'form131-')!==false)
			include "forms/form131.php";
		if(strpos($_SESSION['forms'],'form132-')!==false)
			include "forms/form132.php";
	?>		
	
	<script>
	!function(){
		$("#customer_service_main").tabs(
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