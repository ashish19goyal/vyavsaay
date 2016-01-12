<div id='form295' class='function_detail'>
	<form id='form295_master' autocomplete="off">
		<fieldset>
			<label>Supplier <img src='./images/add_image.png' class='add_image' id='form295_add_supplier'><br>
			<input type='text' required name='supplier'></label>
			<label>Bill #<br><input type='text' required name='bill_num'></label>
			<label>Order #<br><input type='text' readonly="readonly" name='po_num'></label>
			<label>Bill Date<br><input type='text' required name='date'></label>
			<label>Entry Date<br><input type='text' required name='entry_date'></label>
			<br><label>Notes<br><textarea name='notes'></textarea></label>
			<label>
				<input type='hidden' name='bill_id'>
				<input type='hidden' name='order_id'>
			</label>
			<label>	<input type='button' title='Save Bill' class='save_icon' name='save'></label>
			<label>	<input type='submit' class='submit_hidden'></label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form295_header'></form>
					<th style='width:50px'>S.No</th>
					<th>Item</th>
					<th>Quantity</th>
					<th>Price</th>					
					<th>Store</th>
					<th><input type='button' form='form295_header' title='Add item' class='add_icon' onclick='form295_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form295_body'>
		</tbody>
		<tfoot id='form295_foot'>
		</tfoot>
	</table>
</div>