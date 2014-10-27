<div id='sale_bills_main'>
	<?php 
	
		echo "<ul>";
			if(strpos($_SESSION['forms'],'form10')!==false)
				echo "<li><a id='form10_link' href='#form10' onclick='form10_header_ini(); form10_ini();' data-i18n='form.create_service_receipt'></a></li>";
			if(strpos($_SESSION['forms'],'form45')!==false)
				echo "<li><a id='form45_link' href='#form45' onclick='form45_header_ini(); form45_ini();' data-i18n='form.manage_service_receipt'></a></li>";
			if(strpos($_SESSION['forms'],'form12')!==false)
				echo "<li><a id='form12_link' href='#form12' onclick='form12_header_ini(); form12_ini();' data-i18n='form.create_bill'></a></li>";
			if(strpos($_SESSION['forms'],'form42')!==false)
				echo "<li><a id='form42_link' href='#form42' onclick='form42_header_ini(); form42_ini();' data-i18n='form.manage_bills'></a></li>";
			if(strpos($_SESSION['forms'],'form69')!==false)
				echo "<li><a id='form69_link' href='#form69' onclick='form69_header_ini(); form69_ini();' data-i18n='form.create_order'></a></li>";
			if(strpos($_SESSION['forms'],'form70')!==false)
				echo "<li><a id='form70_link' href='#form70' onclick='form70_header_ini(); form70_ini();' data-i18n='form.manage_orders'></a></li>";
		echo "</ul>";

		if(strpos($_SESSION['forms'],'form10')!==false)
			include "forms/form10.php";
		if(strpos($_SESSION['forms'],'form45')!==false)
			include "forms/form45.php";
		if(strpos($_SESSION['forms'],'form12')!==false)
			include "forms/form12.php";
		if(strpos($_SESSION['forms'],'form42')!==false)
			include "forms/form42.php";
		if(strpos($_SESSION['forms'],'form69')!==false)
			include "forms/form69.php";
		if(strpos($_SESSION['forms'],'form70')!==false)
			include "forms/form70.php";
		
	?>
	
	<script>
	!function(){
		$("#sale_bills_main").tabs({
			heightStyle:"fill",
			show:"slide"});
		}();
	</script>

</div>