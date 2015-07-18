<div id='suppliers_main' class='vy_tabs function_main'>

		<ul>
			<li><a id='form40_link' href='#form40' onclick='form40_header_ini(); form40_ini();' data-i18n='form.manage_suppliers'></a></li>
			<li><a id='form85_link' href='#form85' onclick='form85_ini();' data-i18n='form.verify_addresses'></a></li>
			<li><a id='report37_link' href='#report37' onclick='report37_header_ini();' data-i18n='form.payments_due'></a></li>
			<li><a id='report46_link' href='#report46' onclick='report46_header_ini();' data-i18n='form.supplier_account_balance'></a></li>
			<li><a id='form97_link' href='#form97' onclick='form97_header_ini(); form97_ini();' data-i18n='form.attributes'></a></li>
		</ul>
	
	<?php
			include "forms/form40.php";
			include "forms/form85.php";
			include "reports/report37.php";
			include "reports/report46.php";
			include "forms/form97.php";
	?>
</div>