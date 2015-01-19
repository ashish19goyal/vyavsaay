<div id='store_main' class='function_main'>
	<?php
	echo "<ul>";
		if(strpos($_SESSION['forms'],'form5-')!==false)
			echo "<li><a id='form5_link' href='#form5' onclick='form5_header_ini(); form5_ini();' data-i18n='form.manage_assets'></a></li>";
		if(strpos($_SESSION['forms'],'form109-')!==false)
			echo "<li><a id='form109_link' href='#form109' onclick='form109_header_ini(); form109_ini();' data-i18n='form.asset_attributes'></a></li>";
		if(strpos($_SESSION['forms'],'form38-')!==false)
			echo "<li><a id='form38_link' href='#form38' onclick='form38_header_ini(); form38_ini();' data-i18n='form.store_placement'></a></li>";
		if(strpos($_SESSION['reports'],'report45-')!==false)
			echo "<li><a id='report45_link' href='#report45' onclick='report45_header_ini();' data-i18n='form.virtual_store'></a></li>";
		if(strpos($_SESSION['forms'],'form83-')!==false)
			echo "<li><a id='form83_link' href='#form83' onclick='form83_header_ini(); form83_ini();' data-i18n='form.storage_areas'></a></li>";
		if(strpos($_SESSION['reports'],'report1-')!==false)
			echo "<li><a id='report1_link' href='#report1' onclick='report1_header_ini();' data-i18n='form.signage_changes'></a></li>";			
	echo "</ul>";

		if(strpos($_SESSION['forms'],'form5-')!==false)
			include "forms/form5.php";
		if(strpos($_SESSION['forms'],'form109-')!==false)
			include "forms/form109.php";
		if(strpos($_SESSION['forms'],'form38-')!==false)
			include "forms/form38.php";
		if(strpos($_SESSION['reports'],'report45-')!==false)
			include "reports/report45.php";
		if(strpos($_SESSION['forms'],'form83-')!==false)
			include "forms/form83.php";
		if(strpos($_SESSION['reports'],'report1-')!==false)
			include "reports/report1.php";
	?>
	
	<script>
	!function(){
		$("#store_main").tabs(
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