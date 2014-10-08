<div id='offers_main'>
	<ul>
		<li><a id="form2_link" href="#form2" onclick="form2_header_ini();">Create pamphlets</a></li>
		<li><a id="form35_link" href="#form35" onclick="form35_header_ini(); form35_ini('');">Manage Offers</a></li>
		<li><a id="form44_link" href="#form44" onclick="form44_header_ini(); form44_ini('');">Manage Pamphlets</a></li>			
	</ul>

	<div id='form2' class='function_detail'>
		<?php include "forms/form2.php" ?>
	</div>
	<div id='form35' class='function_detail'>
		<?php include "forms/form35.php" ?>
	</div>
	<div id='form44' class='function_detail'>
		<?php include "forms/form44.php" ?>
	</div>
	
	<script>
	!function(){
		$("#offers_main").tabs({
			heightStyle:"fill",
			show:"slide"});
		}();
	</script>

</div>