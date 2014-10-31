<div id='purchase_main'>
	<?php 
	
		echo "<ul>";
			if(strpos($_SESSION['forms'],'form21')!==false)
				echo "<li><a id='form21_link' href='#form21' onclick='form21_header_ini(); form21_ini();' data-i18n='Enter Supplier Bill'></a></li>";
			if(strpos($_SESSION['forms'],'form53')!==false)
				echo "<li><a id='form53_link' href='#form53' onclick='form53_header_ini(); form53_ini();' data-i18n='form.manage_supplier_bills'></a></li>";
			if(strpos($_SESSION['forms'],'form24')!==false)
				echo "<li><a id='form24_link' href='#form24' onclick='form24_header_ini(); form24_ini();' data-i18n='form.create_purchase_order'></a></li>";
			if(strpos($_SESSION['forms'],'form43')!==false)
				echo "<li><a id='form43_link' href='#form43' onclick='form43_header_ini(); form43_ini();' data-i18n='form.manage_purchase_orders'></a></li>";
			
		echo "</ul>";

		if(strpos($_SESSION['forms'],'form21')!==false)
			include "forms/form21.php";
		if(strpos($_SESSION['forms'],'form24')!==false)
			include "forms/form24.php";
		if(strpos($_SESSION['forms'],'form43')!==false)
			include "forms/form43.php";
		if(strpos($_SESSION['forms'],'form53')!==false)
			include "forms/form53.php";
	?>
	
	<script>
	!function(){
		$("#purchase_main").tabs({
			heightStyle:"fill",
			show:"slide"});
		}();
	</script>

</div>