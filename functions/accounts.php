<div id='accounts_main' class='function_main'>
	<ul>
		<li><a id="form5_link" href="#form5" onclick="form5_header_ini(); form5_ini('');">Manage Assets</a></li>
		<li><a id="form9_link" href="#form9" onclick="form9_header_ini(); form9_ini('');">Cash Register</a></li>			
		<li><a id="form56_link" href="#form56" onclick="form56_header_ini(); form56_ini('');">Expense Register</a></li>			
		<li><a id="report4_link" href="#report4" onclick="report4_header_ini(); report4_ini()">Modes of payment</a></li>
		<li><a id="report6_link" href="#report6" onclick="report6_header_ini(); report6_ini()">Payments due from customers</a></li>
		<li><a id="report14_link" href="#report14" onclick="report14_header_ini(); report14_ini()">Expenses by period</a></li>
		<li><a id="report15_link" href="#report15" onclick="report15_ini()">Financial Summary</a></li>
	</ul>

	<div id='form5' class='function_detail'>
		<?php include "forms/form5.php" ?>
	</div>
	<div id='form9' class='function_detail'>
		<?php include "forms/form9.php" ?>
	</div>
	<div id='form56' class='function_detail'>
		<?php include "forms/form56.php" ?>
	</div>
	<div id='report4' class='function_detail'>
		<?php include "reports/report4.php" ?>
	</div>
	<div id='report6' class='function_detail'>
		<?php include "reports/report6.php" ?>
	</div>
	<div id='report14' class='function_detail'>
		<?php include "reports/report14.php" ?>
	</div>
	<div id='report15' class='function_detail'>
		<?php include "reports/report15.php" ?>
	</div>
	
	<script>
	!function(){
		$("#accounts_main").tabs({
			heightStyle:"fill",
			show:"slide"});
		}();
	</script>

</div>