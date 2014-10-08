<div id='products_main'>
	<ul>
		<li><a id="form39_link" href="#form39" onclick="form39_header_ini(); form39_ini('');">Manage Products</a></li>			
		<li><a id="form59_link" href="#form59" onclick="form59_header_ini(); form59_ini('');">Manage Pre-requisites</a></li>			
		<li><a id="report29_link" href="#report29" onclick="report29_header_ini(); report29_ini('');">Pre-requisites report</a></li>
	</ul>

	<div id='form39' class='function_detail'>
		<?php include "forms/form39.php" ?>
	</div>
	<div id='form59' class='function_detail'>
		<?php include "forms/form59.php" ?>
	</div>
	<div id='report29' class='function_detail'>
		<?php include "reports/report29.php" ?>
	</div>
	
	<script>
	!function(){
		$("#products_main").tabs({
			heightStyle:"fill",
			show:"slide"});
		}();
	</script>

</div>
