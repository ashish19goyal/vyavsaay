<div id='finances_main' class='function_main'>

		<ul>
			<li><a id='form124_link' href='#form124' onclick='form124_header_ini(); form124_ini();' data-i18n='form.receipts'></a></li>
			<li><a id='form11_link' href='#form11' onclick='form11_header_ini(); form11_ini();' data-i18n='form.manage_payments'></a></li>
			<li><a id='report4_link' href='#report4' onclick='report4_header_ini();' data-i18n='form.modes_of_payment'></a></li>
			<li><a id='form56_link' href='#form56' onclick='form56_header_ini(); form56_ini();' data-i18n='form.cash_register'></a></li>
			<li><a id='report14_link' href='#report14' onclick='report14_header_ini();' data-i18n='form.expenses_by_period'></a></li>
			<li><a id='report15_link' href='#report15' onclick='report15_header_ini();' data-i18n='form.financial_summary'></a></li>
			<li><a id='report34_link' href='#report34' onclick='report34_header_ini();' data-i18n='form.effective_margin'></a></li>
			<li><a id='form71_link' href='#form71' onclick='form71_header_ini(); form71_ini();' data-i18n='form.manage_accounts'></a></li>
			<li><a id='form93_link' href='#form93' onclick='form93_header_ini(); form93_ini();' data-i18n='form.manage_loans'></a></li>
			<li><a id='report53_link' href='#report53' onclick='report53_header_ini();' data-i18n='form.sales_tax'></a></li>
			<li><a id='report58_link' href='#report58' onclick='report58_header_ini();' data-i18n='form.ledger'></a></li>
		</ul>

	<?php 
			include "forms/form124.php"; 
			include "forms/form11.php"; 
			include "reports/report4.php";
			include "forms/form56.php";
			include "reports/report14.php";
			include "reports/report15.php";
			include "reports/report34.php";
			include "forms/form71.php";
			include "forms/form93.php";
			include "reports/report53.php";
			include "reports/report58.php";		
	?>		
	
</div>