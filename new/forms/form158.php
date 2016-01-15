<div id='form158' class='function_detail'>
	<form id='form158_master' autocomplete="off">
		<fieldset>
			<label>Supplier <img src='./images/add_image.png' class='add_image' id='form158_add_supplier'><br>
			<input type='text' required name='supplier'></label>
			<label>Bill Number<br><input type='text' required name='bill_num'></label>
			<label>Bill Date<br><input type='text' required name='date'></label>
			<label>Imported<br><input type='checkbox' name='imported'></label>
			<label>
				<input type='hidden' name='bill_id'>
				<input type='hidden' name='t_id'>
			</label>
			<label>	<input type='button' title='Save Bill' class='save_icon' name='save'></label>
			<label>	<input type='submit' class='submit_hidden'></label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form158_header'></form>
					<th>Item</th>
					<th>Quantity</th>
					<th>Amount</th>					
					<th>Storage</th>
					<th><input type='button' form='form158_header' title='Add item' class='add_icon' onclick='form158_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form158_body'>
		</tbody>
		<tfoot id='form158_foot'>
		</tfoot>
	</table>
</div>