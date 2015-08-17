<div id='treatment_main' class='vy_tabs function_main'>
		<ul>
			<li><a id='form208_link' href='#form208' onclick='form208_header_ini(); form208_ini();' data-i18n='form.treatment_plans'></a></li>
			<li><a id='form209_link' href='#form209' onclick='form209_header_ini(); form209_ini();' data-i18n='form.plan_details'></a></li>
			<li><a id='form231_link' href='#form231' onclick='form231_header_ini(); form231_ini();' data-i18n='form.create_prescription'></a></li>
			<li><a id='form232_link' href='#form232' onclick='form232_header_ini(); form232_ini();' data-i18n='form.manage_prescriptions'></a></li>
		</ul>
	
	<?php
			include "forms/form208.php";
			include "forms/form209.php";
			include "forms/form231.php";
			include "forms/form232.php";
	?>
</div>