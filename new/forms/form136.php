<div id='form136' class='tab-pane'>
	<form id='form136_master' autocomplete="off">
		<fieldset>
			<label>Supplier <img src='./images/add_image.png' class='add_image' id='form136_add_supplier'><br>
			<input type='text' required name='supplier'></label>
			<label>Bill #<br><input type='text' required name='bill_num'></label>
			<label>PO #<br><input type='text' name='po_num' readonly="readonly"></label>
			<label>Bill Date<br><input type='text' required name='bill_date'></label>
			<label>Entry Date<br><input type='text' required name='entry_date'></label>
			<label>
				<input type='hidden' value='' name='id'>
				<input type='hidden' value='' name='order_id'>
			</label>
			<label>	<input type='button' title='Save Bill' name='save' class='save_icon'></label>
			<label>	<input type='button' title='Print Bill' name='print' class='print_icon' onclick='form136_print_form();'></label>
			<label>	<input type='submit' class='submit_hidden'>	</label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form136_header'></form>
					<th>Item</th>
					<th>Batch</th>
					<th>Bill Details</th>
					<th>PO Details</th>
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