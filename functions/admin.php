<div id='admin_main' class='function_main'>
	<?php 
	
		echo "<ul>";
			if(strpos($_SESSION['forms'],'form46-')!==false)
				echo "<li><a id='form46_link' href='#form46' onclick='form46_header_ini(); form46_ini();' data-i18n='form.set_defaults'></a></li>";
			if(strpos($_SESSION['forms'],'form48-')!==false)
				echo "<li><a id='form48_link' href='#form48' onclick='form48_header_ini(); form48_ini();' data-i18n='form.select_reports'></a></li>";
			if(strpos($_SESSION['forms'],'form49-')!==false)
				echo "<li><a id='form49_link' href='#form49' onclick='form49_header_ini(); form49_ini();' data-i18n='form.select_forms'></a></li>";
			if(strpos($_SESSION['forms'],'form50-')!==false)
				echo "<li><a id='form50_link' href='#form50' onclick='form50_header_ini(); form50_ini();' data-i18n='form.set_accounting_defaults'></a></li>";
			if(strpos($_SESSION['forms'],'form51-')!==false)
				echo "<li><a id='form51_link' href='#form51' onclick='form51_header_ini();' data-i18n='form.access_control'></a></li>";
			if(strpos($_SESSION['forms'],'form80-')!==false)
				echo "<li><a id='form80_link' href='#form80' onclick='form80_header_ini();' data-i18n='form.de-duplication_mapping'></a></li>";
			if(strpos($_SESSION['forms'],'form95-')!==false)
				echo "<li><a id='form95_link' href='#form95' onclick='form95_header_ini(); form95_ini();' data-i18n='form.data_import'></a></li>";
			if(strpos($_SESSION['forms'],'form100-')!==false)
				echo "<li><a id='form100_link' href='#form100' onclick='form100_header_ini(); form100_ini();' data-i18n='form.selective_sync'></a></li>";
			if(strpos($_SESSION['forms'],'form105-')!==false)
				echo "<li><a id='form105_link' href='#form105' onclick='form105_header_ini(); form105_ini();' data-i18n='form.data_access'></a></li>";
			if(strpos($_SESSION['forms'],'form110-')!==false)
				echo "<li><a id='form110_link' href='#form110' onclick='form110_header_ini(); form110_ini();' data-i18n='form.manage_reports'></a></li>";
			if(strpos($_SESSION['forms'],'form111-')!==false)
				echo "<li><a id='form111_link' href='#form111' onclick='form111_header_ini(); form111_ini();' data-i18n='form.create_reports'></a></li>";
		echo "</ul>";

		if(strpos($_SESSION['forms'],'form46-')!==false)
			include "forms/form46.php";
		if(strpos($_SESSION['forms'],'form48-')!==false)
			include "forms/form48.php";
		if(strpos($_SESSION['forms'],'form49-')!==false)
			include "forms/form49.php";
		if(strpos($_SESSION['forms'],'form50-')!==false)
			include "forms/form50.php";
		if(strpos($_SESSION['forms'],'form51-')!==false)
			include "forms/form51.php";
		if(strpos($_SESSION['forms'],'form80-')!==false)
			include "forms/form80.php";
		if(strpos($_SESSION['forms'],'form95-')!==false)
			include "forms/form95.php";
		if(strpos($_SESSION['forms'],'form100-')!==false)
			include "forms/form100.php";
		if(strpos($_SESSION['forms'],'form105-')!==false)
			include "forms/form105.php";
		if(strpos($_SESSION['forms'],'form110-')!==false)
			include "forms/form110.php";
		if(strpos($_SESSION['forms'],'form111-')!==false)
			include "forms/form111.php";
		
	?>
	
	<script>
	!function(){
		$("#admin_main").tabs({
			show:"slide"}).css(
			{
				'min-height': '500px',
				'overflow': 'auto'
			});		
		}();
	</script>

</div>