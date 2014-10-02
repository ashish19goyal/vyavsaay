<div id='settings_main' class='function_main'>
	<ul>
		<li><a id="form46_link" href="#form46" onclick="form46_header_ini(); form46_ini('');">Set defaults</a></li>
		<li><a id="form47_link" href="#form47">Change Password</a></li>
		<li><a id="form48_link" href="#form48" onclick="form48_header_ini(); form48_ini('');">Select Reports</a></li>
		<li><a id="form49_link" href="#form49" onclick="form49_header_ini(); form49_ini('');">Select Forms</a></li>
		<li><a id="form50_link" href="#form50" onclick="form50_header_ini(); form50_ini('');">Select Accounting Principles</a></li>
		<li><a id="form51_link" href="#form51" onclick="form51_header_ini();">Set Access Control</a></li>
		<li><a id="form52_link" href="#form52" onclick="form52_header_ini(); form52_ini('');">Set Shortcuts</a></li>
		<li><a id="form54_link" href="#form54" onclick="form54_header_ini(); form54_ini('');">Select Templates</a></li>
	</ul>

	<div id='form46' class='function_detail'>
		<?php include "forms/form46.php" ?>
	</div>
	<div id='form47' class='function_detail'>
		<?php include "forms/form47.php" ?>
	</div>
	<div id='form48' class='function_detail'>
		<?php include "forms/form48.php" ?>
	</div>
	<div id='form49' class='function_detail'>
		<?php include "forms/form49.php" ?>
	</div>
	<div id='form50' class='function_detail'>
		<?php include "forms/form50.php" ?>
	</div>
	<div id='form51' class='function_detail'>
		<?php include "forms/form51.php" ?>
	</div>
	<div id='form52' class='function_detail'>
		<?php include "forms/form52.php" ?>
	</div>
	<div id='form54' class='function_detail'>
		<?php include "forms/form54.php" ?>
	</div>
	
	<script>
	!function(){
		$("#settings_main").tabs({
			heightStyle:"fill",
			show:"slide"});
		}();
	</script>

</div>