<div id='logistics_main' class='vy_tabs function_main'>
		<ul>
			<li><a id='report64_link' href='#report64' onclick='report64_header_ini();' data-i18n='form.packing_instructions'></a></li>		
			<li><a id='form210_link' href='#form210' onclick='form210_header_ini();' data-i18n='form.packing_instructions_invoice'></a></li>		
			<li><a id='form215_link' href='#form215' onclick='form215_header_ini(); form215_ini();' data-i18n='form.create_manifest'></a></li>
			<li><a id='form236_link' href='#form236' onclick='form236_header_ini(); form236_ini();' data-i18n='form.manage_manifests'></a></li>
			<li><a id='form94_link' href='#form94' onclick='form94_header_ini(); form94_ini();' data-i18n='form.discard_items'></a></li>
		</ul>

	<?php
			include "reports/report64.php";
			include "forms/form210.php";
			include "forms/form215.php";
			include "forms/form236.php";
			include "forms/form94.php";
		?>
	
</div>