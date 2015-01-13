<div id='sale_bills_main' class='function_main'>
	<?php 
	
		echo "<ul>";
			if(strpos($_SESSION['forms'],'form10-')!==false)
				echo "<li><a id='form10_link' href='#form10' onclick='form10_header_ini(); form10_ini();' data-i18n='form.service_bill'></a></li>";
			if(strpos($_SESSION['forms'],'form12-')!==false)
				echo "<li><a id='form12_link' href='#form12' onclick='form12_header_ini(); form12_ini();' data-i18n='form.product_bill'></a></li>";
			if(strpos($_SESSION['forms'],'form72-')!==false)
				echo "<li><a id='form72_link' href='#form72' onclick='form72_header_ini(); form72_ini();' data-i18n='form.create_bill'></a></li>";
			if(strpos($_SESSION['forms'],'form42-')!==false)
				echo "<li><a id='form42_link' href='#form42' onclick='form42_header_ini(); form42_ini();' data-i18n='form.manage_bills'></a></li>";
			if(strpos($_SESSION['forms'],'form91-')!==false)
				echo "<li><a id='form91_link' href='#form91' onclick='form91_header_ini(); form91_ini();' data-i18n='form.create_bill'></a></li>";
			if(strpos($_SESSION['forms'],'form119-')!==false)
				echo "<li><a id='form119_link' href='#form119' onclick='form119_header_ini(); form119_ini();' data-i18n='form.create_bill'></a></li>";
			if(strpos($_SESSION['forms'],'form92-')!==false)
				echo "<li><a id='form92_link' href='#form92' onclick='form92_header_ini(); form92_ini();' data-i18n='form.manage_bills'></a></li>";
			if(strpos($_SESSION['forms'],'form69-')!==false)
				echo "<li><a id='form69_link' href='#form69' onclick='form69_header_ini(); form69_ini();' data-i18n='form.create_order'></a></li>";
			if(strpos($_SESSION['forms'],'form70-')!==false)
				echo "<li><a id='form70_link' href='#form70' onclick='form70_header_ini(); form70_ini();' data-i18n='form.manage_order'></a></li>";
			if(strpos($_SESSION['forms'],'form108-')!==false)
				echo "<li><a id='form108_link' href='#form108' onclick='form108_header_ini(); form108_ini();' data-i18n='form.manage_order'></a></li>";
			if(strpos($_SESSION['forms'],'form15-')!==false)
				echo "<li><a id='form15_link' href='#form15' onclick='form15_header_ini(); form15_ini();' data-i18n='form.enter_returns'></a></li>";
			if(strpos($_SESSION['forms'],'form16-')!==false)
				echo "<li><a id='form16_link' href='#form16' onclick='form16_header_ini(); form16_ini();' data-i18n='form.manage_returns'></a></li>";
			if(strpos($_SESSION['forms'],'form81-')!==false)
				echo "<li><a id='form81_link' href='#form81' onclick='form81_header_ini(); form81_ini();' data-i18n='form.sale_leads'></a></li>";
			if(strpos($_SESSION['forms'],'form82-')!==false)
				echo "<li><a id='form82_link' href='#form82' onclick='form82_header_ini();' data-i18n='form.scan_items'></a></li>";
			if(strpos($_SESSION['forms'],'form89-')!==false)
				echo "<li><a id='form89_link' href='#form89' onclick='form89_header_ini();' data-i18n='form.appointments'></a></li>";
			if(strpos($_SESSION['forms'],'form90-')!==false)
				echo "<li><a id='form90_link' href='#form90' onclick='form90_header_ini(); form90_ini();' data-i18n='form.billing_types'></a></li>";
			if(strpos($_SESSION['forms'],'form112-')!==false)
				echo "<li><a id='form112_link' href='#form112' onclick='form112_header_ini();' data-i18n='form.add_unbilled_items'></a></li>";
			if(strpos($_SESSION['forms'],'form113-')!==false)
				echo "<li><a id='form113_link' href='#form113' onclick='form113_header_ini(); form113_ini();' data-i18n='form.manage_unbilled_items'></a></li>";
			if(strpos($_SESSION['forms'],'form118-')!==false)
				echo "<li><a id='form118_link' href='#form118' onclick='form118_header_ini(); form118_ini();' data-i18n='form.create_bill'></a></li>";
		echo "</ul>";

		if(strpos($_SESSION['forms'],'form10-')!==false)
			include "forms/form10.php";
		if(strpos($_SESSION['forms'],'form12-')!==false)
			include "forms/form12.php";
		if(strpos($_SESSION['forms'],'form72-')!==false)
			include "forms/form72.php";
		if(strpos($_SESSION['forms'],'form42-')!==false)
			include "forms/form42.php";
		if(strpos($_SESSION['forms'],'form91-')!==false)
			include "forms/form91.php";
		if(strpos($_SESSION['forms'],'form92-')!==false)
			include "forms/form92.php";
		if(strpos($_SESSION['forms'],'form69-')!==false)
			include "forms/form69.php";
		if(strpos($_SESSION['forms'],'form70-')!==false)
			include "forms/form70.php";		
		if(strpos($_SESSION['forms'],'form108-')!==false)
			include "forms/form108.php";		
		if(strpos($_SESSION['forms'],'form15-')!==false)
			include "forms/form15.php";		
		if(strpos($_SESSION['forms'],'form16-')!==false)
			include "forms/form16.php";
		if(strpos($_SESSION['forms'],'form81-')!==false)
			include "forms/form81.php";		
		if(strpos($_SESSION['forms'],'form82-')!==false)
			include "forms/form82.php";		
		if(strpos($_SESSION['forms'],'form89-')!==false)
			include "forms/form89.php";
		if(strpos($_SESSION['forms'],'form90-')!==false)
			include "forms/form90.php";
		if(strpos($_SESSION['forms'],'form112-')!==false)
			include "forms/form112.php";
		if(strpos($_SESSION['forms'],'form113-')!==false)
			include "forms/form113.php";
		if(strpos($_SESSION['forms'],'form118-')!==false)
			include "forms/form118.php";
		if(strpos($_SESSION['forms'],'form119-')!==false)
			include "forms/form119.php";
	?>
	
	<script>
	!function(){
		$("#sale_bills_main").tabs(
		{
			show:"slide",
			activate:function(e, ui) 
		    {
		    	e.currentTarget.blur();
		    }
		}).css(
			{
				'min-height': '570px',
				'overflow': 'auto'
			});
		}();
	</script>
</div>