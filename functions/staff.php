<div id='staff_main'>
	<?php 
		echo "<ul>";
			if(strpos($_SESSION['forms'],'form8')!==false)
				echo "<li><a id='form8_link' href='#form8' onclick='form8_header_ini(); form8_ini();'>Manage Staff</a></li>";
			if(strpos($_SESSION['forms'],'form7')!==false)
				echo "<li><a id='form7_link' href='#form7' onclick='form7_header_ini(); form7_ini();'>Attendance</a></li>";
			if(strpos($_SESSION['forms'],'form14')!==false)
				echo "<li><a id='form14_link' href='#form14' onclick='form14_header_ini(); form14_ini();'>Manage Tasks</a></li>";
			if(strpos($_SESSION['reports'],'report17')!==false)
				echo "<li><a id='report17_link' href='#report17' onclick='report17_header_ini(); report17_ini();'>Staff performance</a></li>";			
			if(strpos($_SESSION['reports'],'report30')!==false)
				echo "<li><a id='report30_link' href='#report30' onclick='report30_header_ini(); report30_ini();'>Tasks performed</a></li>";
		echo "</ul>";

		if(strpos($_SESSION['forms'],'form8')!==false)
			include "forms/form8.php";
		if(strpos($_SESSION['forms'],'form7')!==false)
			include "forms/form7.php";
		if(strpos($_SESSION['forms'],'form14')!==false)
			include "forms/form14.php";
		if(strpos($_SESSION['reports'],'report17')!==false)
			include "reports/report17.php";
		if(strpos($_SESSION['reports'],'report30')!==false)
			include "reports/report30.php";
	?>
	
	<script>
	!function(){
		$("#staff_main").tabs({
			heightStyle:"fill",
			show:"slide"});
		}();
	</script>

</div>