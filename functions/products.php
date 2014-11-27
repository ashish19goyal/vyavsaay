<div id='products_main'>
	<?php 

		echo "<ul>";
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
		echo "</ul>";

		if(strpos($_SESSION['forms'],'form39-')!==false)
			include "forms/form39.php";
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
