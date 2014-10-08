<div id='inventory_main'>
	<ul>
		<li><a id="form1_link" href="#form1" onclick="form1_header_ini(); form1_ini('');">Update Inventory</a></li>
		<li><a id="form22_link" href="#form22" onclick="form22_header_ini(); form22_ini('');">Dispose items</a></li>			
		<li><a id="report8_link" href="#report8" onclick="report8_header_ini(); report8_ini();">Inventory predictions</a></li>
		<li><a id="report28_link" href="#report28" onclick="report28_header_ini(); report28_ini();">Short Inventory</a></li>
		<li><a id="report40_link" href="#report40" onclick="report40_header_ini(); report40_ini();">Surplus Inventory</a></li>
		<li><a id="report27_link" href="#report27" onclick="report27_header_ini(); report27_ini();">Expiring Inventory</a></li>
	</ul>
	
	<div id='form1' class='function_detail'>
		<?php include "forms/form1.php" ?>		
	</div>
	<div id='form22' class='function_detail'>
		<?php include "forms/form22.php" ?>		
	</div>
	<div id='report8' class='function_detail'>
		<?php include "reports/report8.php" ?>
	</div>
	<div id='report28' class='function_detail'>
		<?php include "reports/report28.php" ?>
	</div>
	<div id='report40' class='function_detail'>
		<?php include "reports/report40.php" ?>
	</div>
	<div id='report27' class='function_detail'>
		<?php include "reports/report27.php" ?>		
	</div>
	
	<script>
	!function(){
		$("#inventory_main").tabs({
			heightStyle:"fill",
			show:"slide"});
		}();
	</script>

</div>
