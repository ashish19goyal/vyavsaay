<div id='report86' class='tab-pane'>
	<form id='report86_header' autocomplete="off">
		<fieldset>
			<label>Item<br><input type='text' name='product'></label>
			<label>Start Date<br><input type='text' name='start' required></label>
			<label>End Date<br><input type='text' name='end' required></label>
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
				<th>Date</th>
				<th>Quantity</th>
				<th>Customer</th>
			</tr>
		</thead>
		<tbody id='report86_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='report86_prev' class='prev_icon' data-index='-25' onclick="$('#report86_index').attr('data-index',$(this).attr('data-index')); report86_ini();">
		<div style='display:hidden;' id='report86_index' data-index='0'></div>
		<img src='./images/next.png' id='report86_next' class='next_icon' data-index='25' onclick="$('#report86_index').attr('data-index',$(this).attr('data-index')); report86_ini();">
	</div>
</div>