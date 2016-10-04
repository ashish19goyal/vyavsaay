<div id='form78' class='tab-pane'>
	<form id='form78_master' autocomplete="off">
		<fieldset>
			<label>Newsletter: <input type='text' required></label>
			<label>SMS content: <textarea required></textarea></label>
			<label>	<input type='hidden' name='nl_id' form='form78_master' value=''></label>
			<label>	<input type='button' value='Send Mails and SMS' class='generic_icon' onclick="modal50_action();"></label>	
			<label>	<input type='submit' style='visibility: hidden;'></label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form78_header'></form>
					<th>Customer Name</th>
					<th>Email</th>
					<th>Phone</th>
					<th>Select</th>
			</tr>
		</thead>
		<tbody id='form78_body'>
		</tbody>
	</table>
</div>