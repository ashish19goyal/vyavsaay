<div id='customer_service_main' class='function_main'>
		
		<ul>
			<li><a id='form128_link' href='#form128' onclick='form128_header_ini(); form128_ini();' data-i18n='form.manage_service_requests'></a></li>
			<li><a id='form134_link' href='#form134' onclick='form134_header_ini(); form134_ini();' data-i18n='form.service_request_dashboard'></a></li>
			<li><a id='form126_link' href='#form126' onclick='form126_header_ini(); form126_ini();' data-i18n='form.issues_list'></a></li>
			<li><a id='form129_link' href='#form129' onclick='form129_ini();' data-i18n='form.engineer_locations'></a></li>
			<li><a id='form130_link' href='#form130' onclick='form130_header_ini(); form130_ini();' data-i18n='form.job_orders'></a></li>
			<li><a id='form131_link' href='#form131' onclick='form131_header_ini(); form131_ini();' data-i18n='form.check_tasks'></a></li>
			<li><a id='form132_link' href='#form132' onclick='form132_header_ini();' data-i18n='form.create_service_request'></a></li>	
			<li><a id='form133_link' href='#form133' onclick='form133_header_ini(); form133_ini();' data-i18n='form.service_documents'></a></li>
			<li><a id='report56_link' href='#report56' onclick='report56_header_ini();' data-i18n='form.service_requests_report'></a></li>
			<li><a id='report57_link' href='#report57' onclick='report57_header_ini();' data-i18n='form.warranty_status'></a></li>
		</ul>

	<?php 
			include "forms/form128.php";
			include "forms/form134.php";
			include "forms/form126.php"; 
			include "forms/form129.php";
			include "forms/form130.php";
			include "forms/form131.php";
			include "forms/form132.php";
			include "forms/form133.php";
			include "reports/report56.php";
			include "reports/report57.php";
	?>		
</div>