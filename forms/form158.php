<div id='form158' class='function_detail'>
	<form id='form158_master'>
		<fieldset>
			<label>Supplier <img src='./images/add_image.png' class='add_image' id='form158_add_supplier'><br>
			<input type='text' required></label>
			<label>Bill Number<br><input type='text' required></label>
			<label>Bill Date<br><input type='text' required></label>
			<label>Entry Date<br><input type='text' required></label>
			<label>Imported<br><input type='checkbox'></label>
			<label>
				<input type='hidden' name='id'>
				<input type='hidden' name='transaction'>
			</label>
			<label>	<input type='button' title='Save Bill' class='save_icon'></label>
			<label>	<input type='button' title='Print Bill' class='print_icon' onclick='form158_print_form();'></label>
			<label>	<input type='submit' class='submit_hidden'></label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form158_header'></form>
					<th>Product Name</th>
					<th>Quantity</th>
					<th>Pricing Conversion</th>
					<th>Amount</th>					
					<th>Storage Area</th>
					<th><input type='button' form='form158_header' title='Add item' class='add_icon' onclick='form158_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form158_body'>
		</tbody>
		<tfoot id='form158_foot'>
		</tfoot>
	</table>
</div>