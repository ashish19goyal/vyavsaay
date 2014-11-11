<div id='sale_reports_main'>
	<?php 

		echo "<ul>";
			if(strpos($_SESSION['reports'],'report26-')!==false)
				echo "<li><a id='report26_link' href='#report26' onclick='report26_header_ini(); report26_ini();' data-i18n='form.sales_by_customers'></a></li>";
			if(strpos($_SESSION['reports'],'report38-')!==false)
				echo "<li><a id='report38_link' href='#report38' onclick='report38_header_ini(); report38_ini();' data-i18n='form.sales_by_products'></a></li>";
			if(strpos($_SESSION['reports'],'report39-')!==false)
				echo "<li><a id='report39_link' href='#report39' onclick='report39_header_ini(); report39_ini();' data-i18n='form.sales_by_services'></a></li>";
			if(strpos($_SESSION['reports'],'report9-')!==false)
				echo "<li><a id='report9_link' href='#report9' onclick='report9_header_ini(); report9_ini();' data-i18n='form.product_sales_report'></a></li>";
		echo "</ul>";

		if(strpos($_SESSION['reports'],'report26-')!==false)
			include "reports/report26.php";
		if(strpos($_SESSION['reports'],'report38-')!==false)
			include "reports/report38.php";
		if(strpos($_SESSION['reports'],'report39-')!==false)
			include "reports/report39.php";
		if(strpos($_SESSION['reports'],'report9-')!==false)
			include "reports/report9.php";
	?>
	
	<script>
	!function(){
		$("#sale_reports_main").tabs({
			show:"slide"}).css(
			{
				'min-height': '500px',
				'overflow': 'auto'
			});
		}();
	</script>

</div>