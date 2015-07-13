<div id='form154' class='function_detail'>
	<form id='form154_master' autocomplete="off">
		<fieldset>
			<label>Customer <img src='./images/add_image.png' class='add_image' id='form154_add_customer'><br>
				<input type='text' required name='customer'></label>
			<label>Type<br><input type='text' name='bill_type' required></label>
			<label>Store<br><input type='text' name='store'></label>
			<label>Date<br><input type='text' name='date' required></label>
			<label>Tax Type<br><input type='text' name='tax_type'></label>
			<br>
			<label>Narration<br><textarea style='width:200px;' name='narration'></textarea></label>
			<label id='form154_1job'>Print as 1 job <input type='checkbox' name='job'></label>
			<label>Invoice #<br><input type='text' name='bill_num'></label>
			<label id='form154_customer_info'></label>
			<label>C-form<input type='checkbox' name='cform'></label>
			<label>
				<input type='hidden' name='bill_id'>
				<input type='hidden' name='t_id'>
			</label>
			<br>
			<label>	<input type='button' title='Save Bill' name='save' class='save_icon'></label>
			<label>	<input type='button' title='Print Bill' class='print_icon' name='print' onclick='form154_print_form();'></label>
			<label>	<input type='submit' class='submit_hidden'>
					<input type='hidden' name='cst'>
					<input type='hidden' name='tin'>
					<input type='hidden' name='bill_total'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead id='form154_head'>
			<tr>
				<form id='form154_header'></form>
				<th style='width:50px'>S.No</th>
				<th style='min-width:200px'>Item</th>
				<th>Qty.</th>
				<th>Rate</th>
				<th>Amount</th>
				<th><input type='button' title='Add Product' class='add_icon' onclick='form154_add_product();'></th>
			</tr>
		</thead>
		<tbody id='form154_body'>
		</tbody>
		<tfoot id='form154_foot'>
		</tfoot>
	</table>
</div>