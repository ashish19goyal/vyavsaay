<div id='ecommerce_main' class='vy_tabs function_main'>

		<ul>
			<li><a id='report44_link' href='#report44' onclick='report44_header_ini();' data-i18n='form.compare_products'></a></li>
			<li><a id='form74_link' href='#form74' onclick='form74_header_ini(); form74_ini();' data-i18n='form.completed_sale_orders'></a></li>
			<li><a id='form75_link' href='#form75' onclick='form75_header_ini(); form75_ini();' data-i18n='form.pending_sale_orders'></a></li>
			<li><a id='form76_link' href='#form76' onclick='form76_header_ini(); form76_ini();' data-i18n='form.track_payments'></a></li>
		</ul>

	<?php 
			include "reports/report44.php"; 
			include "forms/form74.php";
			include "forms/form75.php";
			include "forms/form76.php";
	?>		
	
</div>