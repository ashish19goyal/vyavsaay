<div id='services_main'>
	<ul>
		<li><a id="form57_link" href="#form57" onclick="form57_header_ini(); form57_ini('');">Manage Services</a></li>
		<li><a id="form58_link" href="#form58" onclick="form58_header_ini(); form58_ini('');">Manage Pre-requisites</a></li>			
		<li><a id="report41_link" href="#report41" onclick="report41_header_ini(); report41_ini('');">Pre-requisites report</a></li>
	</ul>

	<div id='form57' class='function_detail'>
		<?php include "forms/form57.php" ?>
	</div>
	<div id='form58' class='function_detail'>
		<?php include "forms/form58.php" ?>
	</div>
	<div id='report41' class='function_detail'>
		<?php include "reports/report41.php" ?>
	</div>
	
	<script>
	!function(){
		$("#services_main").tabs({
			heightStyle:"fill",
			show:"slide"});
		}();
	</script>

</div>
