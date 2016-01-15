<div id='form192' class='function_detail'>
	<form id='form192_master' autocomplete="off">
		<fieldset>
			<label>Supplier <img src='./images/add_image.png' class='add_image' id='form192_add_supplier'><br>
			<input type='text' required></label>
			<label>Bill Number<br><input type='text' required></label>
			<label>Bill Date<br><input type='text' required></label>
			<label>Entry Date<br><input type='text' required></label>
			<label>
				<input type='hidden' name='id'>
				<input type='hidden' name='transaction'>
			</label>
			<label>	<input type='button' title='Save Bill' class='save_icon'></label>
			<label>	<input type='submit' class='submit_hidden'></label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form192_header'></form>
					<th>Item</th>
					<th>Quantity</th>
					<th>Price</th>					
					<th>Amount</th>
					<th><input type='button' form='form192_header' title='Add item' class='add_icon' onclick='form192_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form192_body'>
		</tbody>
		<tfoot id='form192_foot'>
		</tfoot>
	</table>
</div>