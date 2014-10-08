<div id='store_main'>
	<ul>
		<li><a id="form5_link" href="#form5" onclick="form5_header_ini(); form5_ini('');">Manage Assets</a></li>
		<li><a id="form38_link" href="#form38" onclick="form38_header_ini(); form38_ini('');">Store Placement</a></li>
		<li><a id="form55_link" href="#form55" onclick="form55_header_ini(); form55_ini('');">Virtual Store</a></li>			
		<li><a id="report1_link" href="#report1" onclick="report1_header_ini(); report1_ini('');">Signage changes</a></li>			
	</ul>

	<div id='form5' class='function_detail'>
		<?php include "forms/form5.php" ?>
	</div>
	<div id='form38' class='function_detail'>
		<?php include "forms/form38.php" ?>
	</div>
	<div id='form55' class='function_detail'>
		<?php include "forms/form55.php" ?>
	</div>
	<div id='report1' class='function_detail'>
		<?php include "reports/report1.php" ?>
	</div>
	
	<script>
	!function(){
		$("#store_main").tabs({
			heightStyle:"fill",
			show:"slide"});
		}();
	</script>

</div>