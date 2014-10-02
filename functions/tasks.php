<div id='tasks_main' class='function_main'>
	<ul>
		<li><a id="form7_link" href="#form7" onclick="form7_header_ini(); form7_ini('');">Attendance</a></li>
		<li><a id="form14_link" href="#form14" onclick="form14_header_ini(); form14_ini('');">Manage Tasks</a></li>
		<li><a id="form38_link" href="#form38" onclick="form38_header_ini(); form38_ini('');">Store Placement</a></li>			
		<li><a id="report30_link" href="#report30" onclick="report30_header_ini(); report30_ini('');">Number of tasks by staff</a></li>			
	</ul>

	<div id='form7' class='function_detail'>
		<?php include "forms/form7.php" ?>
	</div>
	<div id='form14' class='function_detail'>
		<?php include "forms/form14.php" ?>
	</div>
	<div id='form38' class='function_detail'>
		<?php include "forms/form38.php" ?>
	</div>
	<div id='report30' class='function_detail'>
		<?php include "reports/report30.php" ?>
	</div>
	
	<script>
	!function(){
		$("#tasks_main").tabs({
			heightStyle:"fill",
			show:"slide"});
		}();
	</script>
</div>