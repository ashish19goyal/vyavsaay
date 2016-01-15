<div id='form209' class='function_detail'>
	<form id='form209_master' autocomplete="off">
		<fieldset>
			<label>Plan #<br><input type='text' name='num' readonly='readonly' required></label>
			<label>Customer<br><input type='text' name='customer' required></label>
			<label>Start Date<br><input type='text' name='date' required></label>
			<label>Status<br><input type='text' required name='status' value='inactive'></label>
			<label>	<input type='hidden' name='plan_id' form='form209_master'></label>
			<label>	<input type='button' value='Save' name='save' class='save_icon'></label>
			<label>	<input type='button' class='print_icon' name='print' onclick='form209_print_form();'></label>
			<label><input type='button' id='form209_share' class='share_icon' name='share' style='display:none;'><label>
			<label>	<input type='submit' class='submit_hidden'></label>
		</fieldset>
	</form>
	<table class='rwd-table sortable'>
		<thead>
			<tr>
				<form id='form209_header'></form>
					<th>Order </th>
					<th>Item </th>
					<th>Details </th>
					<th>Schedule </th>
					<th>Status </th>
					<th><input type="button" value='Add new' class='add_icon' form='form209_header' onclick="form209_add_item();">
						<input type='button' form='form209_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form209_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form209_body'>
		</tbody>
	</table>
</div>