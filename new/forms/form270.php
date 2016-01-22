<div id='form270' class='tab-pane'>
	<form id='form270_master' autocomplete="off">
		<fieldset>
			<label>Supplier <img src='./images/add_image.png' class='add_image' id='form270_add_supplier'><br>
			<input type='text' required name='supplier'></label>
			<label>Bill Number<br><input type='text' required name='bill_num'></label>
			<label>Bill Date<br><input type='text' required name='date'></label>
			<label>
				<input type='hidden' name='bill_id'>
			</label>
			<label>	<input type='button' title='Save Bill' class='save_icon' name='save'></label>
			<label>	<input type='button' title='Print' class='print_icon' name='print' onclick='form270_print_form();'></label>
			<label>	<input type='submit' class='submit_hidden'></label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form270_header'></form>
					<th>Item</th>
					<th>Quantity</th>
					<th>Price</th>					
					<th>Amount</th>
					<th><input type='button' form='form270_header' title='Add item' class='add_icon' onclick='form270_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form270_body'>
		</tbody>
		<tfoot id='form270_foot'>
		</tfoot>
	</table>
</div>