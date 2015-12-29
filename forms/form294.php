<div id='form294' class='function_detail'>
	<form id='form294_master' autocomplete="off">
		<fieldset>
			<label>Customer <img src='./images/add_image.png' class='add_image' id='form294_add_customer'><br>
				<input type='text' required name='customer'></label>
			<label>Tax Type<br><input type='text' name='tax_type'></label>
			<label>Date<br><input type='text' name='date' required></label>
			<label>Invoice #<br><input type='text' readonly='readonly' name='bill_num'></label>
			<br>
			<label id='form294_customer_info'></label>
			<label>
				<input type='hidden' name='bill_id'>
			</label>
			<br>
			<label>	<input type='button' title='Save Bill' name='save' class='save_icon'></label>
			<label>	<input type='button' title='Print Bill' class='print_icon' name='print' onclick='form294_print_form();'></label>
			<label>	<input type='submit' class='submit_hidden'>
					<input type='hidden' name='cst'>
					<input type='hidden' name='tin'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead id='form294_head'>
			<tr>
				<form id='form294_header'></form>
				<th style='width:50px'>S.No</th>
				<th>Item</th>
				<th>Quantity</th>
				<th>Price</th>
				<th>Store</th>
				<th><input type='button' title='Add Item' class='add_icon' onclick='form294_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form294_body'>
		</tbody>
		<tfoot id='form294_foot'>
		</tfoot>
	</table>
</div>