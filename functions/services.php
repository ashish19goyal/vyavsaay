<div id='services_main'>

	<?php 
		echo "<ul>";
			if(strpos($_SESSION['forms'],'form57')!==false)
				echo "<li><a id='form57_link' href='#form57' onclick='form57_header_ini(); form57_ini();'>Manage Services</a></li>";
			if(strpos($_SESSION['forms'],'form58')!==false)
				echo "<li><a id='form58_link' href='#form58' onclick='form58_header_ini(); form58_ini();'>Manage Pre-requisites</a></li>";			
			if(strpos($_SESSION['reports'],'report41')!==false)
				echo "<li><a id='report41_link' href='#report41' onclick='report41_header_ini(); report41_ini();'>Pre-requisites report</a></li>";
		echo "</ul>";

		if(strpos($_SESSION['forms'],'form57')!==false)
			include "forms/form57.php";
		if(strpos($_SESSION['forms'],'form58')!==false)
			include "forms/form58.php";
		if(strpos($_SESSION['reports'],'report41')!==false)
			include "reports/report41.php"; 
	?>
	
	<script>
	!function(){
		$("#services_main").tabs({
			heightStyle:"fill",
			show:"slide"});
		}();
	</script>

</div>
