<div id='customers_main' class='function_main'>
		
		<ul>
			<li><a id='form30_link' href='#form30' onclick='form30_header_ini(); form30_ini();' data-i18n='form.manage_customers'></a></li>
			<li><a id='report5_link' href='#report5' onclick='report5_header_ini();' data-i18n='form.customer_account_balance'></a></li>
			<li><a id='form41_link' href='#form41' onclick='form41_ini();' data-i18n='form.verify_addresses'></a></li>
			<li><a id='report42_link' href='#report42' onclick='report42_header_ini();' data-i18n='form.feedback'></a></li>
			<li><a id='report6_link' href='#report6' onclick='report6_header_ini();' data-i18n='form.payments_due'></a></li>
			<li><a id='report43_link' href='#report43' onclick='report43_header_ini();' data-i18n='form.customer_behaviour'></a></li>
			<li><a id='form96_link' href='#form96' onclick='form96_header_ini(); form96_ini();' data-i18n='form.attributes'></a></li>
			<li><a id='form125_link' href='#form125' onclick='form125_header_ini(); form125_ini();' data-i18n='form.customer_accounts'></a></li>
		</ul>

	<?php 
			include "forms/form41.php";
			include "forms/form30.php"; 
			include "reports/report5.php"; 
			include "reports/report42.php"; 
			include "reports/report6.php";
			include "reports/report43.php";
			include "forms/form96.php";
			include "forms/form125.php";		
	?>		
	
	<script>
	!function(){
		$("#customers_main").tabs(
		{
			show:"slide",
			activate:function(e, ui) 
		    {
		    	e.currentTarget.blur();
				if(typeof map41 != 'undefined')
				{
				  	map41.invalidateSize(false);
				}
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