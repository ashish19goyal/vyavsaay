<div id='sale_bills_main'>
	<?php 
	
		echo "<ul>";
			if(strpos($_SESSION['forms'],'form10')!==false)
				echo "<li><a id='form10_link' href='#form10' onclick='form10_header_ini();'>Create Service Receipt</a></li>";
			if(strpos($_SESSION['forms'],'form45')!==false)
				echo "<li><a id='form45_link' href='#form45' onclick='form45_header_ini(); form45_ini();'>Manage Service Receipts</a></li>";
			if(strpos($_SESSION['forms'],'form12')!==false)
				echo "<li><a id='form12_link' href='#form12' onclick='form12_header_ini();'>New Bill</a></li>";
			if(strpos($_SESSION['forms'],'form42')!==false)
				echo "<li><a id='form42_link' href='#form42' onclick='form42_header_ini(); form42_ini();'>Manage Bills</a></li>";
		echo "</ul>";

		if(strpos($_SESSION['forms'],'form10')!==false)
			include "forms/form10.php";
		if(strpos($_SESSION['forms'],'form45')!==false)
			include "forms/form45.php";
		if(strpos($_SESSION['forms'],'form12')!==false)
			include "forms/form12.php";
		if(strpos($_SESSION['forms'],'form42')!==false)
			include "forms/form42.php";
	?>
	
	<script>
	!function(){
		$("#sale_bills_main").tabs({
			heightStyle:"fill",
			show:"slide"});
		}();
	</script>

</div>