<div id='form136' class='function_detail'>
	<form id='form136_master'>
		<fieldset>
			<label>Supplier <img src='./images/add_image.png' class='add_image' id='form136_add_supplier'><br>
			<input type='text' required></label>
			<label>Bill Number<br><input type='text' required></label>
			<label>Bill Date<br><input type='text' required></label>
			<label>Entry Date<br><input type='text' required></label>
			<label>Notes<br><textarea row='1'></textarea></label>
			<label>
				<input type='hidden' value=''>
				<input type='hidden' name='transaction'>
			</label>
			<label>	<input type='button' title='Save Bill' class='save_icon'></label>
			<label>	<input type='button' title='Print Bill' class='print_icon' onclick='form136_print_form();'></label>
			<label>	<input type='submit' class='submit_hidden'>	</label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form136_header'></form>
					<th>Product Name</th>
					<th>Batch</th>
					<th>Quantity</th>
					<th>Amount</th>					
					<th>Storage Area</th>
					<th><input type='button' form='form136_header' title='Add item' class='add_icon' onclick='form136_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form136_body'>
		</tbody>
		<tfoot id='form136_foot'>
		</tfoot>
	</table>
</div>