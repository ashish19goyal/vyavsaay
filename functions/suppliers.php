<div id='suppliers_main'>
	<?php 

		echo "<ul>";
		if(strpos($_SESSION['forms'],'form40')!==false)
			echo "<li><a id='form40_link' href='#form40' onclick='form40_header_ini(); form40_ini();'>Manage Vendors</a></li>";
		if(strpos($_SESSION['forms'],'form19')!==false)
			echo "<li><a id='form19_link' href='#form19' onclick='form19_header_ini(); form19_ini();'>Send returns</a></li>";
		if(strpos($_SESSION['reports'],'report37')!==false)
			echo "<li><a id='report37_link' href='#report37' onclick='report37_header_ini(); report37_ini();'>Payments due</a></li>";
		echo "</ul>";
	
		if(strpos($_SESSION['forms'],'form40')!==false)
			include "forms/form40.php";
		if(strpos($_SESSION['forms'],'form19')!==false)
			include "forms/form19.php";
		if(strpos($_SESSION['reports'],'report37')!==false)
			include "reports/report37.php";
	?>
	
	<script>
	!function(){
		$("#suppliers_main").tabs({
			heightStyle:"fill",
			show:"slide"});
		}();
	</script>

</div>