<div id='purchase_main'>
	<ul>
		<li><a id="form21_link" href="#form21" onclick="form21_header_ini();">Goods Received</a></li>
		<li><a id="form24_link" href="#form24" onclick="form24_header_ini(); form24_ini('');">Create purchase order</a></li>
		<li><a id="form43_link" href="#form43" onclick="form43_header_ini(); form43_ini('');">Manage purchase orders</a></li>
		<li><a id="form53_link" href="#form53" onclick="form53_header_ini(); form53_ini('');">Manage Supplier Bills</a></li>
	</ul>

	<div id='form21' class='function_detail'>
		<?php include "forms/form21.php" ?>
	</div>
	<div id='form24' class='function_detail'>
		<?php include "forms/form24.php" ?>
	</div>
	<div id='form43' class='function_detail'>
		<?php include "forms/form43.php" ?>
	</div>
	<div id='form53' class='function_detail'>
		<?php include "forms/form53.php" ?>
	</div>
	
	<script>
	!function(){
		$("#purchase_main").tabs({
			heightStyle:"fill",
			show:"slide"});
		}();
	</script>

</div>