<div id='form284' class='function_detail'>
	<form id='form284_master' autocomplete="off">
		<fieldset>
			<label>Customer <img src='./images/add_image.png' class='add_image' id='form284_add_customer'><br>
				<input type='text' required name='customer'></label>
			<label>Type<br><input type='text' name='bill_type' required></label>
			<label>Tax Type<br><input type='text' name='tax_type'></label>
			<label>Date<br><input type='text' name='date' required></label>
			<br>
			<label>Narration<br><textarea style='width:200px;' name='narration'></textarea></label>
			<label>Invoice #<br><input type='text' name='bill_num' readonly="readonly"></label>
			<label>	<input type='button' title='Save Bill' name='save' class='save_icon'></label>
			<label>	<input type='button' title='Print Bill' class='print_icon' name='print' onclick='form284_print_form();'></label>
			<label>	<input type='button' title='Share Bill' class='share_icon' name='share'></label>
			<label>	<input type='submit' class='submit_hidden'>
					<input type='hidden' name='bill_id'>
					<input type='hidden' name='cst'>
					<input type='hidden' name='tin'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead id='form284_head'>
			<tr>
				<form id='form284_header'></form>
				<th style='width:50px'>S.No</th>
				<th style='min-width:200px'>Item</th>
				<th>Details</th>
				<th>Quantity</th>
				<th>Amount</th>
				<th><input type='button' title='Add Item' class='add_icon' onclick='form284_add_product();'></th>
			</tr>
		</thead>
		<tbody id='form284_body'>
		</tbody>
		<tfoot id='form284_foot'>
		</tfoot>
	</table>
</div>