<div id='customers_main'>
	<ul>
		<li><a id="form30_link" href="#form30" onclick="form30_header_ini(); form30_ini('');">Manage Customers</a></li>			
		<li><a id="form15_link" href="#form15" onclick="form15_header_ini();form15_ini('');">Accept returns</a></li>
		<li><a id="report5_link" href="#report5" onclick="report5_header_ini(); report5_ini();">Customer account balance</a></li>
		<li><a id="report42_link" href="#report42" onclick="report42_header_ini(); report42_ini();">Feedback</a></li>
		<li><a id="report43_link" href="#report43" onclick="report43_header_ini(); report43_ini();">Change in customer behavior</a></li>
	</ul>

	<div id='form30' class='function_detail'>
		<?php include "forms/form30.php" ?>
	</div>
	<div id='form15' class='function_detail'>
		<?php include "forms/form15.php" ?>
	</div>
	<div id='report5' class='function_detail'>
		<?php include "reports/report5.php" ?>
	</div>
	<div id='report42' class='function_detail'>
		<?php include "reports/report42.php" ?>
	</div>
	<div id='report43' class='function_detail'>
		<?php include "reports/report43.php" ?>		
	</div>
	<script>
	!function(){
		$("#customers_main").tabs({
			heightStyle:"fill",
			show:"slide"});
		}();
	</script>

</div>