<div id='reach_out_main'>
	<?php 
	
			if(strpos($_SESSION['forms'],'form78-')!==false)
				echo "<li><a id='form78_link' href='#form78' onclick='form78_header_ini(); form78_ini();' data-i18n='form.promotion_mails'></a></li>";
		echo "</ul>";

		if(strpos($_SESSION['forms'],'form81-')!==false)
			include "forms/form81.php";
		if(strpos($_SESSION['forms'],'form82-')!==false)
			include "forms/form82.php";
		if(strpos($_SESSION['forms'],'form83-')!==false)
			include "forms/form83.php";
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