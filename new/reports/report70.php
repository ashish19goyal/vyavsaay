<div id='report70' class='tab-pane'>
	<form id='report70_header' autocomplete="off">
		<fieldset>
			<label>Min balance amount</br><input type='number' value='0' required title='Customers with balance more than this amount will be shown'></label>
			<label>Customer</br><input type='text' title='If this field is blank, all applicable customers will be shown'></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Customer </th>
				<th>Account Balance </th>
				<th>Bill Ids </th>
			</tr>
		</thead>
		<tbody id='report70_body'>
		</tbody>
		<tfoot id='report70_foot'>
		</tfoot>
	</table>
</div>