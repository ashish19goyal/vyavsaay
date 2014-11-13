<div id='inventory_main'>
	<?php 

		echo "<ul>";
			if(strpos($_SESSION['forms'],'form1-')!==false)
				echo "<li><a id='form1_link' href='#form1' onclick='form1_header_ini(); form1_ini();' data-i18n='form.update_inventory'></a></li>";
			if(strpos($_SESSION['reports'],'report8-')!==false)
				echo "<li><a id='report8_link' href='#report8' onclick='report8_header_ini(); report8_ini();' data-i18n='form.inventory_predictions'></a></li>";
			if(strpos($_SESSION['reports'],'report28-')!==false)
				echo "<li><a id='report28_link' href='#report28' onclick='report28_header_ini(); report28_ini();' data-i18n='form.short_inventory'></a></li>";
			if(strpos($_SESSION['reports'],'report40-')!==false)
				echo "<li><a id='report40_link' href='#report40' onclick='report40_header_ini(); report40_ini();' data-i18n='form.surplus_inventory'></a></li>";
			if(strpos($_SESSION['reports'],'report27-')!==false)
				echo "<li><a id='report27_link' href='#report27' onclick='report27_header_ini(); report27_ini();' data-i18n='form.expiring_inventory'></a></li>";
		echo "</ul>";
	
		if(strpos($_SESSION['forms'],'form1-')!==false)
			include "forms/form1.php";
		if(strpos($_SESSION['reports'],'report8-')!==false)
			include "reports/report8.php";
		if(strpos($_SESSION['reports'],'report28-')!==false)
			include "reports/report28.php";
		if(strpos($_SESSION['reports'],'report40-')!==false)
			include "reports/report40.php";
		if(strpos($_SESSION['reports'],'report27-')!==false)
			include "reports/report27.php";
	?>		
	
	<script>
	!function(){
		$("#inventory_main").tabs({
			show:"slide"}).css(
			{
				'min-height': '500px',
				'overflow': 'auto'
			});
		}();
	</script>

</div>
