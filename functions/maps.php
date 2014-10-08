<div id='maps_main'>
	<ul>
		<li><a id="form41_link" href="#form41" onclick="form41_ini('');">Verify Addresses</a></li>
		<li><a id="report31_link" href="#report31" onclick="report31_header_ini(); report31_ini();">Customer Map by credit</a></li>
		<li><a id="report35_link" href="#report35" onclick="report35_header_ini(); report35_ini();">Customer Map by products</a></li>
		<li><a id="report32_link" href="#report32" onclick="report32_header_ini(); report32_ini();">Staff Map</a></li>
		<li><a id="report33_link" href="#report33" onclick="report33_header_ini(); report33_ini();">Supplier Map by debit</a></li>
		<li><a id="report36_link" href="#report36" onclick="report36_header_ini(); report36_ini();">Supplier Map by products</a></li>
	</ul>

	<div id='form41' class='function_detail'>
		<?php include "forms/form41.php" ?>
	</div>
	<div id='report31' class='function_detail'>
		<?php include "reports/report31.php" ?>		
	</div>
	<div id='report35' class='function_detail'>
		<?php include "reports/report35.php" ?>		
	</div>	
	<div id='report32' class='function_detail'>
		<?php include "reports/report32.php" ?>
	</div>
	<div id='report33' class='function_detail'>
		<?php include "reports/report33.php" ?>
	</div>
	<div id='report36' class='function_detail'>
		<?php include "reports/report36.php" ?>
	</div>
	
	<script>
	!function(){
		$("#maps_main").tabs({
			heightStyle:"fill",
			show:"slide"});
		}();
	</script>

</div>