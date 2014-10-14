<div id='products_main'>
	<?php 

		echo "<ul>";
			if(strpos($_SESSION['forms'],'form39')!==false)
				echo "<li><a id='form39_link' href='#form39' onclick=form39_header_ini(); form39_ini();'>Manage Products</a></li>";
			if(strpos($_SESSION['forms'],'form59')!==false)
				echo "<li><a id='form59_link' href='#form59' onclick=form59_header_ini(); form59_ini();'>Manage Pre-requisites</a></li>";	
			if(strpos($_SESSION['reports'],'report29')!==false)
				echo "<li><a id='report29_link' href='#report29' onclick=report29_header_ini(); report29_ini();'>Pre-requisites report</a></li>";
		echo "</ul>";

		if(strpos($_SESSION['forms'],'form39')!==false)
			include "forms/form39.php";
		if(strpos($_SESSION['forms'],'form59')!==false)
			include "forms/form59.php";
		if(strpos($_SESSION['reports'],'report29')!==false)
			include "reports/report29.php"; 
	?>
	
	<script>
	!function(){
		$("#products_main").tabs({
			heightStyle:"fill",
			show:"slide"});
		}();
	</script>

</div>
