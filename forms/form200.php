<div id='form200' class='function_detail'>
	<form id='form200_master' autocomplete="off">
		<fieldset>
			<label>DRS # <br><input type='text' name='drs_num' required></label>
			<label>Employee<br><input type='text' name='employee' required></label>
			<label>DRS Date<br><input type='text' name='date'></label>
			<label>Print Date<br><input type='text' name='pdate'></label>
			<label>	<input type='button' title='Save DRS' name='save' class='save_icon'></label>
			<label>	<input type='button' title='Print DRS' name='print' class='print_icon' onclick='form200_print();'></label>
			<label>	<input type='button' title='Email DRS' name='print' class='share_icon' id='form200_share'></label>
			<label>	<input type='hidden' name='id'>
					<input type='submit' class='submit_hidden'>
			</label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form200_header'></form>
					<th>S. No.</th>
					<th>AWB #</th>
					<th>Address</th>					
					<th>Details</th>
					<th>Status</th>
					<th><input type='button' form='form200_header' title='Add item' class='add_icon' onclick='modal129_action();'></th>
			</tr>
		</thead>
		<tbody id='form200_body'>
		</tbody>
		<tfoot id='form200_foot'>
		</tfoot>
	</table>
</div>