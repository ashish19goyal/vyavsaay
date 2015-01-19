<div id='customers_main' class='function_main'>
	<?php 
		
		echo "<ul>";
			if(strpos($_SESSION['forms'],'form30-')!==false)
				echo "<li><a id='form30_link' href='#form30' onclick='form30_header_ini(); form30_ini();' data-i18n='form.manage_customers'></a></li>";			
			if(strpos($_SESSION['reports'],'report5-')!==false)
				echo "<li><a id='report5_link' href='#report5' onclick='report5_header_ini();' data-i18n='form.customer_account_balance'></a></li>";
			if(strpos($_SESSION['forms'],'form41-')!==false)
				echo "<li><a id='form41_link' href='#form41' onclick='form41_ini();' data-i18n='form.verify_addresses'></a></li>";
			if(strpos($_SESSION['reports'],'report42-')!==false)
				echo "<li><a id='report42_link' href='#report42' onclick='report42_header_ini();' data-i18n='form.feedback'></a></li>";
			if(strpos($_SESSION['reports'],'report6-')!==false)
				echo "<li><a id='report6_link' href='#report6' onclick='report6_header_ini();' data-i18n='form.payments_due'></a></li>";
			if(strpos($_SESSION['reports'],'report43-')!==false)
				echo "<li><a id='report43_link' href='#report43' onclick='report43_header_ini();' data-i18n='form.customer_behaviour'></a></li>";
			if(strpos($_SESSION['forms'],'form96-')!==false)
				echo "<li><a id='form96_link' href='#form96' onclick='form96_header_ini(); form96_ini();' data-i18n='form.attributes'></a></li>";
		echo "</ul>";

		if(strpos($_SESSION['forms'],'form41-')!==false)
			include "forms/form41.php";
		if(strpos($_SESSION['forms'],'form30-')!==false)	
			include "forms/form30.php"; 
		if(strpos($_SESSION['reports'],'report5-')!==false)
			include "reports/report5.php"; 
		if(strpos($_SESSION['reports'],'report42-')!==false)
			include "reports/report42.php"; 
		if(strpos($_SESSION['reports'],'report6-')!==false)
			include "reports/report6.php";
		if(strpos($_SESSION['reports'],'report43-')!==false)
			include "reports/report43.php";
		if(strpos($_SESSION['forms'],'form96-')!==false)
			include "forms/form96.php";
		
	?>		
	
	<script>
	!function(){
		$("#customers_main").tabs(
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