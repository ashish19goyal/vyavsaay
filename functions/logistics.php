<div id='logistics_main' class='vy_tabs function_main'>
		<ul>
			<li><a id='form203_link' href='#form203' onclick='form203_header_ini(); form203_ini();' data-i18n='form.manage_order'></a></li>
			<li><a id='form200_link' href='#form200' onclick="modal132_action('form200',function(){form200_header_ini(); form200_ini();});" data-i18n='form.create_drs'></a></li>
			<li><a id='form201_link' href='#form201' onclick='form201_header_ini(); form201_ini();' data-i18n='form.manage_drs'></a></li>
			<li><a id='form211_link' href='#form211' onclick='form211_header_ini();' data-i18n='form.update_orders'></a></li>
			<li><a id='form199_link' href='#form199' onclick='form199_header_ini();' data-i18n='form.incoming_items'></a></li>
			<li><a id='form204_link' href='#form204' onclick='form204_header_ini();' data-i18n='form.pending_orders'></a></li>
			<li><a id='form205_link' href='#form205' onclick='form205_header_ini();' data-i18n='form.undelivered_orders'></a></li>
			<li><a id='form206_link' href='#form206' onclick='form206_header_ini();' data-i18n='form.delivered_orders'></a></li>
			<li><a id='form198_link' href='#form198' onclick='form198_header_ini(); form198_ini();' data-i18n='form.order_details'></a></li>
		</ul>

	<?php
			include "forms/form203.php";
			include "forms/form200.php";
			include "forms/form201.php";
			include "forms/form211.php";
			include "forms/form199.php";
			include "forms/form204.php";
			include "forms/form205.php";
			include "forms/form206.php";
			include "forms/form198.php";
	?>
	
</div>