<div id='form265' class='tab-pane'>
	<form id='form265_master' autocomplete="off">
		<fieldset>
			<label>RTO # <br><input type='text' name='rto_num' required></label>
			<label>Employee<br><input type='text' name='employee' required></label>
			<label>RTO Date<br><input type='text' name='date'></label>
			<label># of Orders<br><input type='number' readonly='readonly' name='num_orders'></label>
			<label>Branch<br><input type='text' readonly='readonly' name='branch'></label>
			<label>	<input type='button' title='Save DRS' name='save' class='save_icon'></label>
			<label>	<input type='button' title='Print DRS' name='print' class='print_icon' onclick='form265_print_form();'></label>
			<label>	<input type='button' title='Email DRS' name='share' class='share_icon' id='form265_share'></label>
			<label>	<input type='hidden' name='id'>
					<input type='hidden' name='saved'>
				<input type='submit' class='submit_hidden'>
			</label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form265_header'></form>
					<th style='width:50px'>S. No.</th>
					<th>AWB #</th>
					<th>Address</th>					
					<th>Details</th>
					<th>Status</th>
					<th><input type='button' form='form265_header' title='Add item' class='add_icon' onclick='form265_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form265_body'>
		</tbody>
		<tfoot id='form265_foot'>
		</tfoot>
	</table>
</div>