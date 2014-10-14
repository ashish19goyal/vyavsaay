<div id='offers_main'>
	<?php 
	
		echo "<ul>";
			if(strpos($_SESSION['forms'],'form2')!==false)
				echo "<li><a id='form2_link' href='#form2' onclick='form2_header_ini();'>Create pamphlets</a></li>";
			if(strpos($_SESSION['forms'],'form35')!==false)
				echo "<li><a id='form35_link' href='#form35' onclick='form35_header_ini(); form35_ini();'>Manage Offers</a></li>";
			if(strpos($_SESSION['forms'],'form44')!==false)
				echo "<li><a id='form44_link' href='#form44' onclick='form44_header_ini(); form44_ini();'>Manage Pamphlets</a></li>";			
		echo "</ul>";

		if(strpos($_SESSION['forms'],'form2')!==false)
			include "forms/form2.php";
		if(strpos($_SESSION['forms'],'form35')!==false)
			include "forms/form35.php";
		if(strpos($_SESSION['forms'],'form44')!==false)
			include "forms/form44.php";
	?>
	
	<script>
	!function(){
		$("#offers_main").tabs({
			heightStyle:"fill",
			show:"slide"});
		}();
	</script>

</div>