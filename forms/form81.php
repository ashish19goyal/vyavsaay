<div id='form81' class='function_detail'>
	<form id='form81_master'>
		<fieldset>
			Offer Name <input type='text' required>
			<input type='hidden' name='offer_id' form='form81_master' value=''>
			<input type='submit' title='Send Message' value='Send Messages'>
			<input type='button' title='Add another customer' class='add_icon' onclick='form81_add_item();'>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form81_header'></form>
					<th>Customer Name</th>
					<th>Contact</th>
					<th>Select for messaging</th>
			</tr>
		</thead>
		<tbody id='form81_body'>
		</tbody>
	</table>
</div>