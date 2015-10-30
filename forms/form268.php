<div id='form268' class='function_detail'>
	<form id='form268_master' autocomplete="off">
		<fieldset>
			<label>Customer <img src='./images/add_image.png' class='add_image' id='form268_add_customer'><br>
			<input type='text' required name='customer'></label>
			<label>Challan #<br><input type='text' readonly='readonly' required name='challan_num'></label>
			<label>Date<br><input type='text' required name='date'></label>
			<!--<label>Status<br><input type='text' required name='status'></label>-->
			<br><label>AWB #<br><input type='text' name='awb_num'></label>
			<label>Vehicle #<br><input type='text' name='vehicle_num'></label>
			<label>Type<br><input type='text' required name='type'></label>
			<label>Prepared By<br><input type='text' name='prepared'></label>
			<br><label>
				<input type='hidden' name='id'>
				<input type='hidden' name='address'>
			</label>
			<label>	<input type='button' title='Save' class='save_icon' name='save'></label>
			<label>	<input type='button' title='Print' class='print_icon' name='print' onclick='form268_print_form();'></label>
			<label>	<input type='button' title='Email' class='share_icon' name='email'></label>
			<label>	<input type='submit' class='submit_hidden'></label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form268_header'></form>
					<th>Item</th>
					<th>Specification</th>					
					<th>Quantity</th>
					<th><input type='button' form='form268_header' title='Add item' class='add_icon' onclick='form268_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form268_body'>
		</tbody>
		<tfoot id='form268_foot'>
		</tfoot>
	</table>
</div>