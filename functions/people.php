<div id='people_main' class='function_main'>
	<ul>
		<li><a id="form8_link" href="#form8" onclick="form8_header_ini(); form8_ini('');">Manage Staff</a></li>
		<li><a id="form30_link" href="#form30" onclick="form30_header_ini(); form30_ini('');">Manage Customers</a></li>			
		<li><a id="form40_link" href="#form40" onclick="form40_header_ini(); form40_ini('');">Manage Vendors</a></li>
		<li><a id="form35_link" href="#form35" onclick="form35_header_ini(); form35_ini('');">Manage Offers</a></li>						
		<li><a id="form2_link" href="#form2" onclick="form2_header_ini();">Create Pamphlets</a></li>
		<li><a id="form44_link" href="#form44" onclick="form44_header_ini(); form44_ini('');">Manage Pamphlets</a></li>
		<li><a id="form41_link" href="#form41" onclick="form41_ini('');">Verify Addresses</a></li>
		<li><a id="report31_link" href="#report31" onclick="report31_header_ini(); report31_ini();">Customer Map by Credit</a></li>
		<li><a id="report32_link" href="#report32" onclick="report32_header_ini(); report32_ini();">Supplier Map by debit</a></li>
		<li><a id="report33_link" href="#report33" onclick="report33_header_ini(); report33_ini();">Staff Map</a></li>
		<li><a id="report35_link" href="#report35" onclick="report35_header_ini(); report35_ini();">Customer Map by products</a></li>
		<li><a id="report36_link" href="#report36" onclick="report36_header_ini(); report36_ini();">Supplier Map by products</a></li>
		</ul>

	<div id='form8' class='function_detail'>
		<?php include "forms/form8.php" ?>
	</div>
	<div id='form30' class='function_detail'>
		<?php include "forms/form30.php" ?>
	</div>
	<div id='form40' class='function_detail'>
		<?php include "forms/form40.php" ?>
	</div>
	<div id='form35' class='function_detail'>
		<?php include "forms/form35.php" ?>
	</div>
	<div id='form2' class='function_detail'>
		<?php include "forms/form2.php" ?>		
	</div>
	<div id='form44' class='function_detail'>
		<?php include "forms/form44.php" ?>		
	</div>
	<div id='form41' class='function_detail'>
		<?php include "forms/form41.php" ?>		
	</div>
	<div id='report31' class='function_detail'>
		<?php include "reports/report31.php" ?>
	</div>
	<div id='report32' class='function_detail'>
		<?php include "reports/report32.php" ?>
	</div>
	<div id='report33' class='function_detail'>
		<?php include "reports/report33.php" ?>
	</div>
	<div id='report35' class='function_detail'>
		<?php include "reports/report35.php" ?>
	</div>
	<div id='report36' class='function_detail'>
		<?php include "reports/report36.php" ?>
	</div>
	
	<script>
	!function(){
		$("#people_main").tabs({
			heightStyle:"fill",
			show:"slide"});
		}();
	</script>

</div>