<div id='report82' class='tab-pane'>
	<form id='report82_header' autocomplete="off">
		<fieldset>
			<label>Item<br><input type='text' name='product'></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Item</th>
				<th>Total Inventory</th>
				<th>Pending Order</th>
				<th>Available Inventory</th>
			</tr>
		</thead>
		<tbody id='report82_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='report82_prev' class='prev_icon' data-index='-25' onclick="$('#report82_index').attr('data-index',$(this).attr('data-index')); report82_ini();">
		<div style='display:hidden;' id='report82_index' data-index='0'></div>
		<img src='./images/next.png' id='report82_next' class='next_icon' data-index='25' onclick="$('#report82_index').attr('data-index',$(this).attr('data-index')); report82_ini();">
	</div>
</div>