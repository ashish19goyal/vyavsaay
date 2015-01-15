<div id='finances_main' class='function_main'>

	<?php 

		echo "<ul>";
			if(strpos($_SESSION['forms'],'form124-')!==false)
				echo "<li><a id='form124_link' href='#form124' onclick='form124_header_ini(); form124_ini();' data-i18n='form.receipts'></a></li>";
			if(strpos($_SESSION['forms'],'form11-')!==false)
				echo "<li><a id='form11_link' href='#form11' onclick='form11_header_ini(); form11_ini();' data-i18n='form.manage_payments'></a></li>";
			if(strpos($_SESSION['reports'],'report4-')!==false)
				echo "<li><a id='report4_link' href='#report4' onclick='report4_header_ini();' data-i18n='form.modes_of_payment'></a></li>";
			if(strpos($_SESSION['forms'],'form56-')!==false)
				echo "<li><a id='form56_link' href='#form56' onclick='form56_header_ini(); form56_ini();' data-i18n='form.cash_register'></a></li>";			
			if(strpos($_SESSION['reports'],'report14-')!==false)
				echo "<li><a id='report14_link' href='#report14' onclick='report14_header_ini();' data-i18n='form.expenses_by_period'></a></li>";
			if(strpos($_SESSION['reports'],'report15-')!==false)
				echo "<li><a id='report15_link' href='#report15' onclick='report15_header_ini();' data-i18n='form.financial_summary'></a></li>";
			if(strpos($_SESSION['reports'],'report34-')!==false)
				echo "<li><a id='report34_link' href='#report34' onclick='report34_header_ini();' data-i18n='form.effective_margin'></a></li>";
			if(strpos($_SESSION['forms'],'form71-')!==false)
				echo "<li><a id='form71_link' href='#form71' onclick='form71_header_ini(); form71_ini();' data-i18n='form.manage_accounts'></a></li>";
			if(strpos($_SESSION['forms'],'form93-')!==false)
				echo "<li><a id='form93_link' href='#form93' onclick='form93_header_ini(); form93_ini();' data-i18n='form.manage_loans'></a></li>";
			if(strpos($_SESSION['reports'],'report53-')!==false)
				echo "<li><a id='report53_link' href='#report53' onclick='report53_header_ini();' data-i18n='form.sales_tax'></a></li>";
		echo "</ul>";

		if(strpos($_SESSION['forms'],'form124-')!==false)
			include "forms/form124.php"; 
		if(strpos($_SESSION['forms'],'form11-')!==false)
			include "forms/form11.php"; 
		if(strpos($_SESSION['reports'],'report4-')!==false)
			include "reports/report4.php";
		if(strpos($_SESSION['forms'],'form56-')!==false)
			include "forms/form56.php";
		if(strpos($_SESSION['reports'],'report14-')!==false)
			include "reports/report14.php";
		if(strpos($_SESSION['reports'],'report15-')!==false)
			include "reports/report15.php";
		if(strpos($_SESSION['reports'],'report34-')!==false)
			include "reports/report34.php";
		if(strpos($_SESSION['forms'],'form71-')!==false)
			include "forms/form71.php";
		if(strpos($_SESSION['forms'],'form93-')!==false)
			include "forms/form93.php";
		if(strpos($_SESSION['reports'],'report53-')!==false)
			include "reports/report53.php";
		
	?>		
	
	<script>
	!function(){
		$("#finances_main").tabs(
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