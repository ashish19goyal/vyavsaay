<div id='maps_main' class='vy_tabs function_main'>

		<ul>
			<li><a id='report31_link' href='#report31' onclick='report31_header_ini();' data-i18n='form.customer_map_by_credit'></a></li>
			<li><a id='report35_link' href='#report35' onclick='report35_header_ini();' data-i18n='form.customer_map_by_products'></a></li>
			<li><a id='report32_link' href='#report32' onclick='report32_header_ini();' data-i18n='form.staff_map'></a></li>
			<li><a id='report33_link' href='#report33' onclick='report33_header_ini();' data-i18n='form.supplier_map_by_debit'></a></li>
			<li><a id='report36_link' href='#report36' onclick='report36_header_ini();' data-i18n='form.supplier_map_by_products'></a></li>
		</ul>

	<?php
			include "reports/report31.php";
			include "reports/report35.php";
			include "reports/report32.php";
			include "reports/report33.php";
			include "reports/report36.php";
	?>
	
</div>