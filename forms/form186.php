<div id='form186' class='function_detail'>
	<form id='form186_master'>
		<fieldset>
			<label>Production Plan<br><input type='text' required></label>
			<label>From<br><input type='text' required></label>
			<label>To<br><input type='text' required></label>
			<label>Status<br><input type='text' required value='draft'></label>
			<label>	<input type='hidden' name='plan_id' form='form186_master'></label>
			<label>	<input type='button' value='Save' class='save_icon'></label>
			<label>	<input type='button' class='print_icon' onclick='form186_print();'></label>
			<label>	<input type='submit' class='submit_hidden'></label>
		</fieldset>
	</form>
	<table class='rwd-table sortable'>
		<thead>
			<tr>
				<form id='form186_header'></form>
					<th>Order </th>
					<th>Item </th>
					<th>Quantity </th>
					<th>Schedule </th>
					<th>Status </th>
					<th><input type="button" value='Add new expense' class='add_icon' form='form186_header' onclick="form186_add_item();">
						<input type='button' form='form186_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form186_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form186_body'>
		</tbody>
	</table>
</div>