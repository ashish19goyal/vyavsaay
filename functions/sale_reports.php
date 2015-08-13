<div id='sale_reports_main' class='vy_tabs function_main'>

	<ul>
		<li><a id='report73_link' href='#report73' onclick='report73_header_ini();' data-i18n='form.stock_laundry'></a></li>
		<li><a id='report74_link' href='#report74' onclick='report74_header_ini();' data-i18n='form.feedback'></a></li>
		<li><a id='report26_link' href='#report26' onclick='report26_header_ini();' data-i18n='form.sales_by_customers'></a></li>
		<li><a id='report38_link' href='#report38' onclick='report38_header_ini();' data-i18n='form.sales_by_products'></a></li>
		<li><a id='report39_link' href='#report39' onclick='report39_header_ini();' data-i18n='form.sales_by_services'></a></li>
		<li><a id='report9_link' href='#report9' onclick='report9_header_ini();' data-i18n='form.product_sales_report'></a></li>
		<li><a id='report54_link' href='#report54' onclick='report54_header_ini();' data-i18n='form.best_days'></a></li>
		<li><a id='report55_link' href='#report55' onclick='report55_header_ini();' data-i18n='form.worst_days'></a></li>
		<li><a id='report76_link' href='#report76' onclick='report76_header_ini();' data-i18n='form.order_status'></a></li>
		<li><a id='report80_link' href='#report80' onclick='report80_header_ini();' data-i18n='form.total_sales'></a></li>
		<li><a id='report84_link' href='#report84' onclick='report84_header_ini();' data-i18n='form.num_deliveries'></a></li>
		<li><a id='report85_link' href='#report85' onclick='report85_header_ini();' data-i18n='form.num_drs'></a></li>
	</ul>

	<?php
			include "reports/report73.php";
			include "reports/report74.php"; 
			include "reports/report26.php";
			include "reports/report38.php";
			include "reports/report39.php";
			include "reports/report9.php";
			include "reports/report54.php";
			include "reports/report55.php";
			include "reports/report76.php";
			include "reports/report80.php";			
			include "reports/report84.php";			
			include "reports/report85.php";			
	?>
	
</div>