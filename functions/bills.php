<div id='bills_main' class='function_main'>
	<ul>
		<li><a id="form10_link" href="#form10" onclick="form10_header_ini();">Create Service Receipt</a></li>
		<li><a id="form45_link" href="#form45" onclick="form45_header_ini(); form45_ini('');">Manage Service Receipts</a></li>
		<li><a id="form11_link" href="#form11" onclick="form11_header_ini(); form11_ini('');">Schedule Payments</a></li>			
		<li><a id="form12_link" href="#form12" onclick="form12_header_ini();">New Bill</a></li>
		<li><a id="form42_link" href="#form42" onclick="form42_header_ini(); form42_ini('');">Manage Bills</a></li>
		<li><a id="form15_link" href="#form15" onclick="form15_header_ini(); form15_ini('');">Accept Returns</a></li>						
	</ul>

	<div id='form10' class='function_detail'>
		<?php include "forms/form10.php" ?>
	</div>
	<div id='form45' class='function_detail'>
		<?php include "forms/form45.php" ?>
	</div>
	<div id='form11' class='function_detail'>
		<?php include "forms/form11.php" ?>
	</div>
	<div id='form12' class='function_detail'>
		<?php include "forms/form12.php" ?>
	</div>
	<div id='form42' class='function_detail'>
		<?php include "forms/form42.php" ?>
	</div>
	<div id='form15' class='function_detail'>
		<?php include "forms/form15.php" ?>
	</div>
	
	<script>
	!function(){
		$("#bills_main").tabs({
			heightStyle:"fill",
			show:"slide"});
		}();
	</script>

</div>