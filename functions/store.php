<div id='store_main'>
	<?php
	echo "<ul>";
		if(strpos($_SESSION['forms'],'form5')!==false)
			echo "<li><a id='form5_link' href='#form5' onclick='form5_header_ini(); form5_ini();' data-i18n='form.manage_assets'></a></li>";
		if(strpos($_SESSION['forms'],'form5')!==false)
			echo "<li><a id='form38_link' href='#form38' onclick='form38_header_ini(); form38_ini();' data-i18n='form.store_placement'></a></li>";
		if(strpos($_SESSION['forms'],'form5')!==false)
			echo "<li><a id='form55_link' href='#form55' onclick='form55_header_ini(); form55_ini();' data-i18n='form.virtual_store'></a></li>";
		if(strpos($_SESSION['forms'],'form5')!==false)
			echo "<li><a id='report1_link' href='#report1' onclick='report1_header_ini(); report1_ini();' data-i18n='form.signage_changes'></a></li>";			
	echo "</ul>";

		if(strpos($_SESSION['forms'],'form5')!==false)
			include "forms/form5.php";
		if(strpos($_SESSION['forms'],'form38')!==false)
			include "forms/form38.php";
		if(strpos($_SESSION['forms'],'form55')!==false)
			include "forms/form55.php";
		if(strpos($_SESSION['reports'],'report1')!==false)
			include "reports/report1.php";
	?>
	
	<script>
	!function(){
		$("#store_main").tabs({
			heightStyle:"fill",
			show:"slide"});
		}();
	</script>

</div>