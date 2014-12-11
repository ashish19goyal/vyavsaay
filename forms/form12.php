<div id='form12' class='function_detail'>
	<form id='form12_master'>
		<fieldset>
			<label>Customer <img src='./images/add_image.png' class='add_image' onclick='modal11_action();'>
			</br><input type='text' required></label>
			<label>Bill Date</br><input type='text' required></label>
			<label>Amount</br>Rs. <input readonly='readonly' type='number'></label>
			<label>Discount</br>Rs. <input readonly='readonly' type='number'></label>
			<label>Tax</br>Rs. <input readonly='readonly' type='number'></label>
			<label>Total</br>Rs. <input readonly='readonly' type='number'></label>
			<input type='hidden' name='bill_id'>
			<input type='hidden' name='offer'>
			<input type='hidden' name='transaction'>
			<input type='button' title='New Bill' class='add_icon' onclick='form12_new_form();'>
			<input type='submit' title='Save Bill' class='save_icon'>
			<input type='button' title='Print Bill' class='print_icon' onclick='form12_print_form();'>
			<input type='hidden' name='email_id' value=''>
			<input type='hidden' name='phone' value=''>
			<a id='form12_whatsapp' target='_blank' style='display:none;'><img style='width:25px;height:25px;' src='./images/whatsapp.jpeg' title='Send details through WhatsApp'></a>
			<a id='form12_gmail' target='_blank' style='display:none;'><img style='width:25px;height:25px;' src='./images/gmail.png' title='Send details through Gmail'></a>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form12_header'></form>
					<th>Product Name</th>
					<th>Batch</th>
					<th>Quantity</th>
					<th>Unit Price</th>
					<th>Total</th>
					<th><input type='button' form='form12_header' title='Add item' class='add_icon' onclick='form12_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form12_body'>
		</tbody>
	</table>
</div>