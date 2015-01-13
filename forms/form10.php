<div id='form10' class='function_detail'>
	<form id='form10_master'>
		<fieldset>
			<label>Customer	<img src='./images/add_image.png' class='add_image' onclick='modal11_action();'></br>
			<input type='text' required></label>
			<label>Bill Date<br><input type='text' required></label>
			<input type='hidden' name='bill_id'>
			<input type='hidden' name='offer'>
			<input type='hidden' name='transaction'>
			<input type='button' title='Save Bill' class='save_icon'>
			<input type='button' title='Print Bill' class='print_icon' onclick='form10_print_form();'>
			<input type='button' id='form10_share' class='share_icon' style='display:none;'>
			<input type='submit' class='submit_hidden'>
			</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form10_header'></form>
					<th>Service Name</th>
					<th>Person</th>
					<th>Additional Notes</th>
					<th>Price</th>
					<th><input type='button' form='form10_header' title='Add item' class='add_icon' onclick='form10_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form10_body'>
		</tbody>
		<tfoot id='form10_foot'>
		</tfoot>
	</table>
</div>