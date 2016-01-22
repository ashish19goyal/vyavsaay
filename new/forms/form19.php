<div id='form19' class='tab-pane'>
	<form id='form19_master' autocomplete="off">
		<fieldset>
			<label>Supplier <img src='./images/add_image.png' class='add_image' title='Add new supplier' id='form19_add_supplier'><br>
			<input type='text' required></label>
			<label>Return Date<br><input type='text' required></label>
			<label>
				<input type='hidden' name='id'>
				<input type='hidden' name='transaction'>
			</label>
			<label>	<input type='button' title='Save Bill' class='save_icon'></label>
			<label>	<input type='button' title='Print Bill' class='print_icon' onclick='form19_print_form();'></label>
			<label>	<input type='button' id='form19_share' class='share_icon' style='display:none;'></label>
			<label>	<input type='submit' class='submit_hidden'></label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form19_header'></form>
					<th>Product Name</th>
					<th>Batch</th>
					<th>Notes (Add reason for return)</th>
					<th>Quantity</th>
					<th>Return Amount</th>
					<th><input type='button' form='form19_header' title='Add item' class='add_icon' onclick='form19_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form19_body'>
		</tbody>
		<tfoot id='form19_foot'>
		</tfoot>
	</table>
</div>