<div id='purchase_main' class='function_main'>
	<?php 
	
		echo "<ul>";
			if(strpos($_SESSION['forms'],'form21-')!==false)
				echo "<li><a id='form21_link' href='#form21' onclick='form21_header_ini(); form21_ini();' data-i18n='form.enter_supplier_bill'></a></li>";
			if(strpos($_SESSION['forms'],'form122-')!==false)
				echo "<li><a id='form122_link' href='#form122' onclick='form122_header_ini(); form122_ini();' data-i18n='form.enter_supplier_bill'></a></li>";
			if(strpos($_SESSION['forms'],'form53-')!==false)
				echo "<li><a id='form53_link' href='#form53' onclick='form53_header_ini(); form53_ini();' data-i18n='form.manage_supplier_bills'></a></li>";
			if(strpos($_SESSION['forms'],'form24-')!==false)
				echo "<li><a id='form24_link' href='#form24' onclick='form24_header_ini(); form24_ini();' data-i18n='form.create_purchase_order'></a></li>";
			if(strpos($_SESSION['forms'],'form43-')!==false)
				echo "<li><a id='form43_link' href='#form43' onclick='form43_header_ini(); form43_ini();' data-i18n='form.manage_purchase_orders'></a></li>";
			if(strpos($_SESSION['forms'],'form17-')!==false)
				echo "<li><a id='form17_link' href='#form17' onclick='form17_header_ini(); form17_ini();' data-i18n='form.manage_returns'></a></li>";
			if(strpos($_SESSION['forms'],'form19-')!==false)
				echo "<li><a id='form19_link' href='#form19' onclick='form19_header_ini(); form19_ini();' data-i18n='form.enter_returns'></a></li>";			
			if(strpos($_SESSION['reports'],'report52-')!==false)
				echo "<li><a id='report52_link' href='#report52' onclick='report52_header_ini();' data-i18n='form.product_purchase_report'></a></li>";			
			if(strpos($_SESSION['forms'],'form114-')!==false)
				echo "<li><a id='form114_link' href='#form114' onclick='form114_header_ini();' data-i18n='form.add_unbilled_items'></a></li>";
			if(strpos($_SESSION['forms'],'form115-')!==false)
				echo "<li><a id='form115_link' href='#form115' onclick='form115_header_ini(); form115_ini();' data-i18n='form.manage_unbilled_items'></a></li>";			
		echo "</ul>";

		if(strpos($_SESSION['forms'],'form21-')!==false)
			include "forms/form21.php";
		if(strpos($_SESSION['forms'],'form122-')!==false)
			include "forms/form122.php";
		if(strpos($_SESSION['forms'],'form24-')!==false)
			include "forms/form24.php";
		if(strpos($_SESSION['forms'],'form43-')!==false)
			include "forms/form43.php";
		if(strpos($_SESSION['forms'],'form53-')!==false)
			include "forms/form53.php";
		if(strpos($_SESSION['forms'],'form17-')!==false)
			include "forms/form17.php";
		if(strpos($_SESSION['forms'],'form19-')!==false)
			include "forms/form19.php";
		if(strpos($_SESSION['reports'],'report52-')!==false)
			include "reports/report52.php";
		if(strpos($_SESSION['forms'],'form114-')!==false)
			include "forms/form114.php";
		if(strpos($_SESSION['forms'],'form115-')!==false)
			include "forms/form115.php";
	?>
	
	<script>
	!function(){
		$("#purchase_main").tabs(
		{
			show:"slide",
			activate:function(e, ui) 
		    {
		    	e.currentTarget.blur();
		    },
		    beforeActivate:function(event,ui)
		    {
		    	$(document).off('keydown');
			}
		}).css(
			{
				'min-height': '570px',
				'overflow': 'auto'
			});
		}();
	</script>

</div>