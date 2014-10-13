<div id='finances_main'>
	<ul>
		<li><a id="form11_link" href="#form11" onclick="form11_header_ini(); form11_ini();">Manage payments</a></li>
		<li><a id="report4_link" href="#report4" onclick="report4_header_ini(); report4_ini('');">Modes of Payment</a></li>
		<li><a id="form9_link" href="#form9" onclick="form9_header_ini(); form9_ini('');">Cash Register</a></li>			
		<li><a id="form56_link" href="#form56" onclick="form56_header_ini(); form56_ini('');">Expense Register</a></li>			
		<li><a id="report14_link" href="#report14" onclick="report14_header_ini(); report14_ini();">Expenses by period</a></li>
		<li><a id="report15_link" href="#report15" onclick="report15_ini();">Financial Summary</a></li>
		<li><a id="report34_link" href="#report34" onclick="report34_ini()">Profit projector</a></li>
		<li><a id="report6_link" href="#report6" onclick="report6_header_ini(); report6_ini('');">Payments due</a></li>
	</ul>

	<?php 
		include "forms/form11.php"; 
		include "reports/report4.php";
		include "forms/form9.php";
		include "forms/form56.php";
		include "reports/report14.php";
		include "reports/report15.php";
		include "reports/report34.php";
		include "reports/report6.php";
	?>		
	
	<script>
	!function(){
		$("#finances_main").tabs({
			heightStyle:"fill",
			show:"slide"});
		}();
	</script>

</div>