<div id='form250' class='function_detail'>
	<form id='form250_master' autocomplete="off">
		<fieldset>
			<label>MTS # <br><input type='text' name='mts_num' required></label>
			<label>Branch<br><input type='text' name='branch'></label>
			<label>Date<br><input type='text' name='date'></label>
			<label>Weight<br><input type='text' name='weight' readonly='readonly'></label>
			<label># of Orders<br><input type='number' readonly='readonly' name='num_orders'></label>
			<label># of bags<br><input type='text' readonly='readonly' name='num_bags'></label>
			<label>	<input type='button' title='Save MTS' name='save' class='save_icon'></label>
			<label>	<input type='button' title='Print MTS' name='print' class='print_icon' onclick='form250_print_form();'></label>
			<label>	<input type='button' title='Email MTS' name='share' class='share_icon' id='form250_share'></label>
			<label>	<input type='hidden' name='id'>
					<input type='hidden' name='saved'>
					<input type='submit' class='submit_hidden'>
			</label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form250_header'></form>
					<th style='width:50px'>S. No.</th>
					<th>Bag #</th>
					<th>LBH</th>
					<th>Weight</th>
					<th># of Orders</th>
					<th><input type='button' form='form250_header' title='Add item' class='add_icon' onclick='form250_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form250_body'>
		</tbody>
		<tfoot id='form250_foot'>
		</tfoot>
	</table>
</div>