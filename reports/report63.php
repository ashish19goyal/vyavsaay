<div id='report63' class='function_detail'>
	<form id='report63_header' autocomplete="off">
		<fieldset>
			<legend>Select Filters</legend>
			<label>Type<br><input type='text' required></label>
			<label>SKU<br><input type='text'></label>
			<label>Item Name<br><input type='text'></label>
			<label>	
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead id='report63_head'>
			<tr>
				<th>Item</th>
				<th>Batch</th>
				<th>Quantity</th>
				<th>Storage</th>
				<th>Invoice#</th>
				<th>Action</th>
			</tr>
		</thead>
		<tbody id='report63_body'>
		</tbody>
	</table>

	<div class='form_nav'>
		<img src='./images/previous.png' id='report63_prev' class='prev_icon' data-index='-25' onclick="$('#report63_index').attr('data-index',$(this).attr('data-index')); report63_ini();">
		<div style='display:hidden;' id='report63_index' data-index='0'></div>
		<img src='./images/next.png' id='report63_next' class='next_icon' data-index='25' onclick="$('#report63_index').attr('data-index',$(this).attr('data-index')); report63_ini();">
	</div>

</div>