<div id='stocks_main' class='function_main'>
	<ul>
		<li><a id="form24_link" href="#form24">Create Purchase Orders</a></li>
		<li><a id="form43_link" href="#form43" onclick="form43_header_ini(); form43_ini('');">Manage Purchase Orders</a></li>
		<li><a id="form39_link" href="#form39" onclick="form39_header_ini(); form39_ini('');">Manage Products</a></li>			
		<li><a id="form22_link" href="#form22" onclick="form22_header_ini(); form22_ini('');">Dispose Items</a></li>			
		<li><a id="form21_link" href="#form21">Enter Goods Received</a></li>
		<li><a id="form53_link" href="#form53" onclick="form53_header_ini(); form53_ini('');">Manage Supplier Bills</a></li>
		<li><a id="form19_link" href="#form19" onclick="form19_header_ini(); form19_ini('');">Manage Returns</a></li>
		<li><a id="form1_link" href="#form1" onclick="form1_header_ini(); form1_ini('');">Update Inventory</a></li>
		<li><a id="form55_link" href="#form55" onclick="form55_header_ini();">Virtual Store</a></li>
	</ul>

	<div id='form24' class='function_detail'>
		<?php include "forms/form24.php" ?>
	</div>
	<div id='form43' class='function_detail'>
		<?php include "forms/form43.php" ?>
	</div>
	<div id='form39' class='function_detail'>
		<?php include "forms/form39.php" ?>
	</div>
	<div id='form22' class='function_detail'>
		<?php include "forms/form22.php" ?>
	</div>
	<div id='form21' class='function_detail'>
		<?php include "forms/form21.php" ?>
	</div>
	<div id='form53' class='function_detail'>
		<?php include "forms/form53.php" ?>
	</div>
	<div id='form19' class='function_detail'>
		<?php include "forms/form19.php" ?>
	</div>
	<div id='form1' class='function_detail'>
		<?php include "forms/form1.php" ?>		
	</div>
	<div id='form55' class='function_detail'>
		<?php include "forms/form55.php" ?>		
	</div>
	
	<script>
	!function(){
		$("#stocks_main").tabs({
			heightStyle:"fill",
			show:"slide"});
		}();
	</script>

</div>
