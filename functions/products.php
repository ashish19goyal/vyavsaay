<div id='products_main' class='function_main'>
	<?php 

		echo "<ul>";
			if(strpos($_SESSION['forms'],'form87-')!==false)
				echo "<li><a id='form87_link' href='#form87' onclick='form87_header_ini(); form87_ini();' data-i18n='form.manage_products'></a></li>";
			if(strpos($_SESSION['forms'],'form39-')!==false)
				echo "<li><a id='form39_link' href='#form39' onclick='form39_header_ini(); form39_ini();' data-i18n='form.manage_products'></a></li>";
			if(strpos($_SESSION['forms'],'form59-')!==false)
				echo "<li><a id='form59_link' href='#form59' onclick='form59_header_ini(); form59_ini();' data-i18n='form.manage_pre_requisites'></a></li>";	
			if(strpos($_SESSION['reports'],'report29-')!==false)
				echo "<li><a id='report29_link' href='#report29' onclick='report29_header_ini();' data-i18n='form.pre_requisites_report'></a></li>";
			if(strpos($_SESSION['forms'],'form60-')!==false)
				echo "<li><a id='form60_link' href='#form60' onclick='form60_header_ini(); form60_ini();' data-i18n='form.attributes'></a></li>";
			if(strpos($_SESSION['forms'],'form62-')!==false)
				echo "<li><a id='form62_link' href='#form62' onclick='form62_header_ini(); form62_ini();' data-i18n='form.reviews'></a></li>";
			if(strpos($_SESSION['forms'],'form66-')!==false)
				echo "<li><a id='form66_link' href='#form66' onclick='form66_header_ini(); form66_ini();' data-i18n='form.cross_sells'></a></li>";
			if(strpos($_SESSION['forms'],'form88-')!==false)
				echo "<li><a id='form88_link' href='#form88' onclick='form88_header_ini(); form88_ini();' data-i18n='form.manufacturing_schedule'></a></li>";
			if(strpos($_SESSION['reports'],'report48-')!==false)
				echo "<li><a id='report48_link' href='#report48' onclick='report48_header_ini();' data-i18n='form.resource_analysis'></a></li>";
			if(strpos($_SESSION['reports'],'report50-')!==false)
				echo "<li><a id='report50_link' href='#report50' onclick='report50_header_ini();' data-i18n='form.margin_by_products'></a></li>";
			if(strpos($_SESSION['reports'],'report51-')!==false)
				echo "<li><a id='report51_link' href='#report51' onclick='report51_header_ini();' data-i18n='form.dead_items'></a></li>";
		echo "</ul>";

		if(strpos($_SESSION['forms'],'form39-')!==false)
			include "forms/form39.php";
		if(strpos($_SESSION['forms'],'form87-')!==false)
			include "forms/form87.php";
		if(strpos($_SESSION['forms'],'form59-')!==false)
			include "forms/form59.php";
		if(strpos($_SESSION['reports'],'report29-')!==false)
			include "reports/report29.php"; 
		if(strpos($_SESSION['forms'],'form60-')!==false)
			include "forms/form60.php";
		if(strpos($_SESSION['forms'],'form62-')!==false)
			include "forms/form62.php";
		if(strpos($_SESSION['forms'],'form66-')!==false)
			include "forms/form66.php";
		if(strpos($_SESSION['forms'],'form88-')!==false)
			include "forms/form88.php";
		if(strpos($_SESSION['reports'],'report48-')!==false)
			include "reports/report48.php";
		if(strpos($_SESSION['reports'],'report50-')!==false)
			include "reports/report50.php";
		if(strpos($_SESSION['reports'],'report51-')!==false)
			include "reports/report51.php";
	?>
	
	<script>
	!function(){
		$("#products_main").tabs({
			show:"slide"}).css(
			{
				'min-height': '570px',
				'overflow': 'auto'
			});
		}();
	</script>

</div>
