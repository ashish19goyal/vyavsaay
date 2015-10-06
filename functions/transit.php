<div id='transit_main' class='vy_tabs function_main'>
	<ul>
		<li><a id='form202_link' href='#form202' onclick='form202_header_ini();' data-i18n='form.exchanges'></a></li>
		<li><a id='form212_link' href='#form212' onclick='form212_header_ini();' data-i18n='form.update_orders'></a></li>
		<li><a id='form248_link' href='#form248' onclick='form248_header_ini(); form248_ini();' data-i18n='form.create_transit_bag'></a></li>
		<li><a id='form249_link' href='#form249' onclick='form249_header_ini(); form249_ini();' data-i18n='form.manage_transit_bags'></a></li>
		<li><a id='form250_link' href='#form250' onclick='form250_header_ini(); form250_ini();' data-i18n='form.create_mts'></a></li>
		<li><a id='form251_link' href='#form251' onclick='form251_header_ini(); form251_ini();' data-i18n='form.manage_mts'></a></li>
	</ul>

	<?php
			include "forms/form202.php";
			include "forms/form212.php";
			include "forms/form248.php";
			include "forms/form249.php";
			include "forms/form250.php";
			include "forms/form251.php";
	?>
</div>