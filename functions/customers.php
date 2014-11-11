<div id='customers_main'>
	<?php 
		
		echo "<ul>";
			if(strpos($_SESSION['forms'],'form30-')!==false)
				echo "<li><a id='form30_link' href='#form30' onclick='form30_header_ini(); form30_ini();' data-i18n='form.manage_customers'></a></li>";			
			if(strpos($_SESSION['reports'],'report5-')!==false)
				echo "<li><a id='report5_link' href='#report5' onclick='report5_header_ini(); report5_ini();' data-i18n='form.customer_account_balance'></a></li>";
			if(strpos($_SESSION['reports'],'report42-')!==false)
				echo "<li><a id='report42_link' href='#report42' onclick='report42_header_ini(); report42_ini();' data-i18n='form.feedback'></a></li>";
			if(strpos($_SESSION['reports'],'report43-')!==false)
				echo "<li><a id='report43_link' href='#report43' onclick='report43_header_ini(); report43_ini();' data-i18n='form.customer_behaviour'></a></li>";
		echo "</ul>";

		if(strpos($_SESSION['forms'],'form30-')!==false)	
			include "forms/form30.php"; 
		if(strpos($_SESSION['reports'],'report5-')!==false)
			include "reports/report5.php"; 
		if(strpos($_SESSION['reports'],'report42-')!==false)
			include "reports/report42.php"; 
		if(strpos($_SESSION['reports'],'report43-')!==false)
			include "reports/report43.php"; 
	?>		
	
	<script>
	!function(){
		$("#customers_main").tabs({
			show:"slide"}).css(
			{
				'min-height': '500px',
				'overflow': 'auto'
			});
		}();
	</script>

</div>