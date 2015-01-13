<div id='services_main' class='function_main'>

	<?php 
		echo "<ul>";
			if(strpos($_SESSION['forms'],'form57-')!==false)
				echo "<li><a id='form57_link' href='#form57' onclick='form57_header_ini(); form57_ini();' data-i18n='form.manage_services'></a></li>";
			if(strpos($_SESSION['forms'],'form58-')!==false)
				echo "<li><a id='form58_link' href='#form58' onclick='form58_header_ini(); form58_ini();' data-i18n='form.manage_pre_requisites'></a></li>";			
			if(strpos($_SESSION['reports'],'report41-')!==false)
				echo "<li><a id='report41_link' href='#report41' onclick='report41_header_ini();' data-i18n='form.pre_requisites_report'></a></li>";
			if(strpos($_SESSION['forms'],'form61-')!==false)
				echo "<li><a id='form61_link' href='#form61' onclick='form61_header_ini(); form61_ini();' data-i18n='form.attributes'></a></li>";
			if(strpos($_SESSION['forms'],'form84-')!==false)
				echo "<li><a id='form84_link' href='#form84' onclick='form84_header_ini(); form84_ini();' data-i18n='form.manage_subscriptions'></a></li>";
			if(strpos($_SESSION['forms'],'form63-')!==false)
				echo "<li><a id='form63_link' href='#form63' onclick='form63_header_ini(); form63_ini();' data-i18n='form.reviews'></a></li>";
			if(strpos($_SESSION['forms'],'form64-')!==false)
				echo "<li><a id='form64_link' href='#form64' onclick='form64_header_ini(); form64_ini();' data-i18n='form.cross_sells'></a></li>";
		echo "</ul>";

		if(strpos($_SESSION['forms'],'form57-')!==false)
			include "forms/form57.php";
		if(strpos($_SESSION['forms'],'form58-')!==false)
			include "forms/form58.php";
		if(strpos($_SESSION['reports'],'report41-')!==false)
			include "reports/report41.php"; 
		if(strpos($_SESSION['forms'],'form61-')!==false)
			include "forms/form61.php";
		if(strpos($_SESSION['forms'],'form84-')!==false)
			include "forms/form84.php";
		if(strpos($_SESSION['forms'],'form63-')!==false)
			include "forms/form63.php";
		if(strpos($_SESSION['forms'],'form64-')!==false)
			include "forms/form64.php";
	?>
	
	<script>
	!function(){
		$("#services_main").tabs(
		{
			show:"slide",
			activate:function(e, ui) 
		    {
		    	e.currentTarget.blur();
		    }
		}).css(
			{
				'min-height': '570px',
				'overflow': 'auto'
			});
		}();
	</script>

</div>
