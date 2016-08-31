<div id='form248' class='tab-pane'>
	<form id='form248_master' autocomplete="off">
		<fieldset>
			<label>Bag # <br><input type='text' name='bag_num' required></label>
			<label>Branch<br><input type='text' name='branch' required></label>
			<label>LBH<br><input type='text' name='lbh' required></label>
			<br><label>Date<br><input type='text' name='date'></label>
			<label>Weight<br><input type='text' name='weight' readonly='readonly'></label>
			<label># of Orders<br><input type='number' readonly='readonly' name='num_orders'></label>
			<label>	<input type='button' title='Save Bag' name='save' class='save_icon'></label>
			<label>	<input type='hidden' name='id'>
					<input type='hidden' name='saved'>
				<input type='submit' class='submit_hidden'>
			</label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form248_header'></form>
					<th style='width:50px'>S. No.</th>
					<th>AWB #</th>
					<th>Address</th>
					<th>Details</th>
					<th>Status</th>
					<th><input type='button' form='form248_header' title='Add item' class='add_icon' onclick='form248_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form248_body'>
		</tbody>
		<tfoot id='form248_foot'>
		</tfoot>
	</table>
</div>