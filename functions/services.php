<div id='services_main'>

	<?php 
		echo "<ul>";
			if(strpos($_SESSION['forms'],'form57-')!==false)
				echo "<li><a id='form57_link' href='#form57' onclick='form57_header_ini(); form57_ini();' data-i18n='form.manage_services'></a></li>";
			if(strpos($_SESSION['forms'],'form58-')!==false)
				echo "<li><a id='form58_link' href='#form58' onclick='form58_header_ini(); form58_ini();' data-i18n='form.manage_pre_requisites'></a></li>";			
			if(strpos($_SESSION['reports'],'report41-')!==false)
				echo "<li><a id='report41_link' href='#report41' onclick='report41_header_ini(); report41_ini();' data-i18n='form.pre_requisites_report'></a></li>";
			if(strpos($_SESSION['forms'],'form61-')!==false)
				echo "<li><a id='form61_link' href='#form61' onclick='form61_header_ini(); form61_ini();' data-i18n='form.attributes'></a></li>";
		echo "</ul>";

		if(strpos($_SESSION['forms'],'form57-')!==false)
			include "forms/form57.php";
		if(strpos($_SESSION['forms'],'form58-')!==false)
			include "forms/form58.php";
		if(strpos($_SESSION['reports'],'report41-')!==false)
			include "reports/report41.php"; 
		if(strpos($_SESSION['forms'],'form61-')!==false)
			include "forms/form61.php";
	?>
	
	<script>
	!function(){
		$("#services_main").tabs({
			show:"slide"}).css(
			{
				'min-height': '500px',
				'overflow': 'auto'
			});
		}();
	</script>

</div>
