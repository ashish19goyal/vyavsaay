<div id='form78' class='function_detail'>
	<form id='form78_master'>
		<fieldset>
			<label>Pamphlet Name: <input type='text' required></label>
			<label>			
				<input type='hidden' name='pamphlet_id' form='form78_master' value=''>
				<input type='button' value='Send Mails' class='generic_icon' onclick="modal50_action();">	
				<input type='button' value='Add another customer' class='generic_icon' onclick='form78_add_item();'>
				<input type='submit' style='visibility: hidden;'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form78_header'></form>
					<th>Customer Name</th>
					<th>Email</th>
					<th>Select for mailing</th>
			</tr>
		</thead>
		<tbody id='form78_body'>
		</tbody>
	</table>
</div>