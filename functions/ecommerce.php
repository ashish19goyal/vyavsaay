<div id='ecommerce_main'>

	<?php 

		echo "<ul>";
			if(strpos($_SESSION['forms'],'report44')!==false)
				echo "<li><a id='report44_link' href='#report44' onclick='report44_header_ini(); report44_ini();' data-i18n='form.compare_products'></a></li>";
			if(strpos($_SESSION['forms'],'form74')!==false)
				echo "<li><a id='form74_link' href='#form74' onclick='form74_header_ini(); form74_ini();' data-i18n='form.completed_sale_orders'></a></li>";
			if(strpos($_SESSION['forms'],'form75')!==false)
				echo "<li><a id='form75_link' href='#form75' onclick='form75_header_ini(); form75_ini();' data-i18n='form.pending_sale_orders'></a></li>";			
			if(strpos($_SESSION['forms'],'form76')!==false)
				echo "<li><a id='form76_link' href='#form76' onclick='form76_header_ini(); form76_ini();' data-i18n='form.track_payments'></a></li>";
		echo "</ul>";

		if(strpos($_SESSION['reports'],'report44')!==false)
			include "reports/report44.php"; 
		if(strpos($_SESSION['forms'],'form74')!==false)
			include "forms/form74.php";
		if(strpos($_SESSION['forms'],'form75')!==false)
			include "forms/form75.php";
		if(strpos($_SESSION['forms'],'form76')!==false)
			include "forms/form76.php";
	?>		
	
	<script>
	!function(){
		$("#ecommerce_main").tabs({
			heightStyle:"fill",
			show:"slide"});
		}();
	</script>

</div>