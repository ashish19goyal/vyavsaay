<div id='inventory_main' class='vy_tabs function_main'>

		<ul>
			<li><a id='form1_link' href='#form1' onclick='form1_header_ini(); form1_ini();' data-i18n='form.update_inventory'></a></li>
			<li><a id='form94_link' href='#form94' onclick='form94_header_ini(); form94_ini();' data-i18n='form.discard_items'></a></li>
			<li><a id='report28_link' href='#report28' onclick='report28_header_ini();' data-i18n='form.short_inventory'></a></li>
			<li><a id='report40_link' href='#report40' onclick='report40_header_ini();' data-i18n='form.surplus_inventory'></a></li>
			<li><a id='report27_link' href='#report27' onclick='report27_header_ini();' data-i18n='form.expiring_inventory'></a></li>
			<li><a id='report47_link' href='#report47' onclick='report47_header_ini();' data-i18n='form.inventory_value'></a></li>
		</ul>
	
	<?php 
			include "forms/form1.php";
			include "forms/form94.php";
			include "reports/report28.php";
			include "reports/report40.php";
			include "reports/report27.php";
			include "reports/report47.php";
	?>		
	
</div>
