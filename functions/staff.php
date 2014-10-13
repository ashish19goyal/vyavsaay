<div id='staff_main'>
	<ul>
		<li><a id="form8_link" href="#form8" onclick="form8_header_ini(); form8_ini('');">Manage Staff</a></li>
		<li><a id="form7_link" href="#form7" onclick="form7_header_ini(); form7_ini('');">Attendance</a></li>
		<li><a id="form14_link" href="#form14" onclick="form14_header_ini(); form14_ini('');">Manage Tasks</a></li>
		<li><a id="report17_link" href="#report17" onclick="report17_header_ini(); report17_ini('');">Staff performance</a></li>			
		<li><a id="report30_link" href="#report30" onclick="report30_header_ini(); report30_ini();">Tasks performed</a></li>
	</ul>

	<?php 
		include "forms/form8.php";
		include "forms/form7.php";
		include "forms/form14.php";
		include "reports/report17.php";
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