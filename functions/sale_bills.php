<div id='sale_bills_main'>
	<ul>
		<li><a id="form10_link" href="#form10" onclick="form10_header_ini();">Create Service Receipt</a></li>
		<li><a id="form45_link" href="#form45" onclick="form45_header_ini(); form45_ini('');">Manage Service Receipts</a></li>
		<li><a id="form12_link" href="#form12" onclick="form12_header_ini();">New Bill</a></li>
		<li><a id="form42_link" href="#form42" onclick="form42_header_ini(); form42_ini('');">Manage Bills</a></li>
	</ul>

	<?php 
		include "forms/form10.php";
		include "forms/form45.php";
		include "forms/form12.php";
		include "forms/form42.php";
	?>
	
	<script>
	!function(){
		$("#sale_bills_main").tabs({
			heightStyle:"fill",
			show:"slide"});
		}();
	</script>

</div>