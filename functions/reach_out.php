<div id='reach_out_main'>
	<?php 
	
		echo "<ul>";
			if(strpos($_SESSION['forms'],'form81-')!==false)
				echo "<li><a id='form81_link' href='#form81' onclick='form81_header_ini(); form81_ini();' data-i18n='form.whatsapp_promotion'></a></li>";
			if(strpos($_SESSION['forms'],'form82-')!==false)
				echo "<li><a id='form82_link' href='#form82' onclick='form82_ini();' data-i18n='form.get_messages'></a></li>";
			if(strpos($_SESSION['forms'],'form83-')!==false)
				echo "<li><a id='form83_link' href='#form83' onclick='form83_ini();' data-i18n='form.find_locations'></a></li>";
			if(strpos($_SESSION['forms'],'form84-')!==false)
				echo "<li><a id='form84_link' href='#form84' onclick='form84_ini();' data-i18n='form.place_orders'></a></li>";
			if(strpos($_SESSION['forms'],'form85-')!==false)
				echo "<li><a id='form85_link' href='#form85' onclick='form85_ini();' data-i18n='form.assign_tasks'></a></li>";
			if(strpos($_SESSION['forms'],'form78-')!==false)
				echo "<li><a id='form78_link' href='#form78' onclick='form78_header_ini(); form78_ini();' data-i18n='form.promotion_mails'></a></li>";
		echo "</ul>";

		if(strpos($_SESSION['forms'],'form81-')!==false)
			include "forms/form81.php";
		if(strpos($_SESSION['forms'],'form82-')!==false)
			include "forms/form82.php";
		if(strpos($_SESSION['forms'],'form83-')!==false)
			include "forms/form83.php";
		if(strpos($_SESSION['forms'],'form84-')!==false)
			include "forms/form84.php";
		if(strpos($_SESSION['forms'],'form85-')!==false)
			include "forms/form85.php";
		if(strpos($_SESSION['forms'],'form78-')!==false)
			include "forms/form78.php";
	?>
	
	<script>
	!function(){
		$("#reach_out_main").tabs({
			show:"slide"}).css(
			{
				'min-height': '500px',
				'overflow': 'auto'
			});
		}();
	</script>

</div>