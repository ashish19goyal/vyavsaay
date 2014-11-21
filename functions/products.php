<div id='products_main'>
	<?php 

		echo "<ul>";
			if(strpos($_SESSION['forms'],'form39-')!==false)
				echo "<li><a id='form39_link' href='#form39' onclick='form39_header_ini(); form39_ini();' data-i18n='form.manage_products'></a></li>";
			if(strpos($_SESSION['forms'],'form59-')!==false)
				echo "<li><a id='form59_link' href='#form59' onclick='form59_header_ini(); form59_ini();' data-i18n='form.manage_pre_requisites'></a></li>";	
			if(strpos($_SESSION['reports'],'report29-')!==false)
				echo "<li><a id='report29_link' href='#report29' onclick='report29_header_ini(); report29_ini();' data-i18n='form.pre_requisites_report'></a></li>";
			if(strpos($_SESSION['forms'],'form60-')!==false)
				echo "<li><a id='form60_link' href='#form60' onclick='form60_header_ini(); form60_ini();' data-i18n='form.attributes'></a></li>";
		echo "</ul>";

		if(strpos($_SESSION['forms'],'form39-')!==false)
			include "forms/form39.php";
		if(strpos($_SESSION['forms'],'form59-')!==false)
			include "forms/form59.php";
		if(strpos($_SESSION['reports'],'report29-')!==false)
			include "reports/report29.php"; 
		if(strpos($_SESSION['forms'],'form60-')!==false)
			include "forms/form60.php";
	?>
	
	<script>
	!function(){
		$("#products_main").tabs({
			show:"slide"}).css(
			{
				'min-height': '500px',
				'overflow': 'auto'
			});
		}();
	</script>

</div>
