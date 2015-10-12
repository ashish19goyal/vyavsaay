<div id='manufacturing_main' class='vy_tabs function_main'>
	<ul>
		<li><a id='form88_link' href='#form88' onclick='form88_header_ini(); form88_ini();' data-i18n='form.manufacturing_schedule'></a></li>
		<li><a id='form185_link' href='#form185' onclick='form185_header_ini(); form185_ini();' data-i18n='form.track_manufacturing'></a></li>
		<li><a id='form188_link' href='#form188' onclick='form188_header_ini(); form188_ini();' data-i18n='form.track_testing'></a></li>
		<li><a id='form186_link' href='#form186' onclick='form186_header_ini(); form186_ini();' data-i18n='form.production_plan'></a></li>
		<li><a id='form189_link' href='#form189' onclick='form189_header_ini(); form189_ini();' data-i18n='form.manage_production_plans'></a></li>
		<li><a id='form184_link' href='#form184' onclick='form184_header_ini(); form184_ini();' data-i18n='form.manufacturing_processes'></a></li>
		<li><a id='form187_link' href='#form187' onclick='form187_header_ini(); form187_ini();' data-i18n='form.testing_processes'></a></li>
		<li><a id='form224_link' href='#form224' onclick='form224_header_ini(); form224_ini();' data-i18n='form.testing'></a></li>
		<li><a id='report83_link' href='#report83' onclick='report83_header_ini();' data-i18n='form.testing_results'></a></li>
		<li><a id='form256_link' href='#form256' onclick='form256_header_ini(); form256_ini();' data-i18n='form.batch_info'></a></li>
	</ul>
	<?php 
		include "forms/form88.php";
		include "forms/form185.php"; 
		include "forms/form188.php"; 
		include "forms/form186.php"; 
		include "forms/form189.php";
		include "forms/form184.php";
		include "forms/form187.php";
		include "forms/form224.php";
		include "reports/report83.php";
		include "forms/form256.php";
		
	?>
</div>