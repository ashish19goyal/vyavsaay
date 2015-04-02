<div id='sale_reports_main' class='vy_tabs function_main'>

		<ul>
			<li><a id='report26_link' href='#report26' onclick='report26_header_ini();' data-i18n='form.sales_by_customers'></a></li>
			<li><a id='report38_link' href='#report38' onclick='report38_header_ini();' data-i18n='form.sales_by_products'></a></li>
			<li><a id='report39_link' href='#report39' onclick='report39_header_ini();' data-i18n='form.sales_by_services'></a></li>
			<li><a id='report9_link' href='#report9' onclick='report9_header_ini();' data-i18n='form.product_sales_report'></a></li>
			<li><a id='report54_link' href='#report54' onclick='report54_header_ini();' data-i18n='form.best_days'></a></li>
			<li><a id='report55_link' href='#report55' onclick='report55_header_ini();' data-i18n='form.worst_days'></a></li>
		</ul>

	<?php 

			include "reports/report26.php";
			include "reports/report38.php";
			include "reports/report39.php";
			include "reports/report9.php";
			include "reports/report54.php";
			include "reports/report55.php";
	?>
	
</div>