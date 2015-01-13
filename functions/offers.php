<div id='offers_main' class='function_main'>
	<?php 
	
		echo "<ul>";
			if(strpos($_SESSION['forms'],'form35-')!==false)
				echo "<li><a id='form35_link' href='#form35' onclick='form35_header_ini(); form35_ini();' data-i18n='form.manage_offers'></a></li>";
			if(strpos($_SESSION['forms'],'form2-')!==false)
				echo "<li><a id='form2_link' href='#form2' onclick='form2_header_ini(); form2_ini();' data-i18n='form.create_pamphlet'></a></li>";
			if(strpos($_SESSION['forms'],'form44-')!==false)
				echo "<li><a id='form44_link' href='#form44' onclick='form44_header_ini(); form44_ini();' data-i18n='form.manage_pamphlets'></a></li>";
			if(strpos($_SESSION['forms'],'form78-')!==false)
				echo "<li><a id='form78_link' href='#form78' onclick='form78_header_ini(); form78_ini();' data-i18n='form.promotion_mails'></a></li>";
			if(strpos($_SESSION['forms'],'form116-')!==false)
				echo "<li><a id='form116_link' href='#form116' onclick='form116_header_ini(); form116_ini();' data-i18n='form.manage_loyalty_programs'></a></li>";
			if(strpos($_SESSION['forms'],'form120-')!==false)
				echo "<li><a id='form120_link' href='#form120' onclick='form120_header_ini(); form120_ini();' data-i18n='form.manage_customers'></a></li>";
			if(strpos($_SESSION['forms'],'form121-')!==false)
				echo "<li><a id='form121_link' href='#form121' onclick='form121_header_ini(); form121_ini();' data-i18n='form.adjust_loyalty_points'></a></li>";
		echo "</ul>";

		if(strpos($_SESSION['forms'],'form2-')!==false)
			include "forms/form2.php";
		if(strpos($_SESSION['forms'],'form35-')!==false)
			include "forms/form35.php";
		if(strpos($_SESSION['forms'],'form44-')!==false)
			include "forms/form44.php";
		if(strpos($_SESSION['forms'],'form78-')!==false)
			include "forms/form78.php";
		if(strpos($_SESSION['forms'],'form116-')!==false)
			include "forms/form116.php";
		if(strpos($_SESSION['forms'],'form120-')!==false)
			include "forms/form120.php";
		if(strpos($_SESSION['forms'],'form121-')!==false)
			include "forms/form121.php";
	?>
	
	<script>
	!function(){
		$("#offers_main").tabs(
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