<div id='suppliers_main'>
	<ul>
		<li><a id="form40_link" href="#form40" onclick="form40_header_ini(); form40_ini('');">Manage Vendors</a></li>
		<li><a id="form19_link" href="#form19" onclick="form19_header_ini(); form19_ini('');">Send returns</a></li>
		<li><a id="report37_link" href="#report37" onclick="report37_header_ini(); report37_ini('');">Payments due</a></li>
	</ul>

	<div id='form40' class='function_detail'>
		<?php include "forms/form40.php" ?>
	</div>
	<div id='form19' class='function_detail'>
		<?php include "forms/form19.php" ?>
	</div>
	<div id='report37' class='function_detail'>
		<?php include "reports/report37.php" ?>
	</div>
	
	<script>
	!function(){
		$("#suppliers_main").tabs({
			heightStyle:"fill",
			show:"slide"});
		}();
	</script>

</div>