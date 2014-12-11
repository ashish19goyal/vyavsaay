<div id='suppliers_main' class='function_main'>
	<?php 

		echo "<ul>";
		if(strpos($_SESSION['forms'],'form40-')!==false)
			echo "<li><a id='form40_link' href='#form40' onclick='form40_header_ini(); form40_ini();' data-i18n='form.manage_suppliers'></a></li>";
		if(strpos($_SESSION['forms'],'form85-')!==false)
			echo "<li><a id='form85_link' href='#form85' onclick='form85_ini();' data-i18n='form.verify_addresses'></a></li>";
		if(strpos($_SESSION['reports'],'report37-')!==false)
			echo "<li><a id='report37_link' href='#report37' onclick='report37_header_ini();' data-i18n='form.payments_due'></a></li>";
		if(strpos($_SESSION['reports'],'report46-')!==false)
			echo "<li><a id='report46_link' href='#report46' onclick='report46_header_ini();' data-i18n='form.supplier_account_balance'></a></li>";
		echo "</ul>";
	
		if(strpos($_SESSION['forms'],'form40-')!==false)
			include "forms/form40.php";
		if(strpos($_SESSION['forms'],'form85-')!==false)
			include "forms/form85.php";
		if(strpos($_SESSION['reports'],'report37-')!==false)
			include "reports/report37.php";
		if(strpos($_SESSION['reports'],'report46-')!==false)
			include "reports/report46.php";
		
	?>
	
	<script>
	!function(){
		$("#suppliers_main").tabs({
			show:"slide"}).css(
			{
				'min-height': '500px',
				'overflow': 'auto'
			});
		}();
	</script>

</div>