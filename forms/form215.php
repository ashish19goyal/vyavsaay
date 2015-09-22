<div id='form215' class='function_detail'>
	<form id='form215_master' autocomplete="off">
		<fieldset>
			<label>Manifest # <br><input type='text' name='man_num' required></label>
			<label>Date<br><input type='text' name='date'></label>
			<label># of Orders<br><input type='number' readonly='readonly' name='num_orders'></label>
			<label>	<input type='button' title='Save' name='save' class='save_icon'></label>
			<label>	<input type='button' title='Print' name='print' class='print_icon' onclick='form215_print_form();'></label>
			<label>	<input type='button' title='Email' name='share' class='share_icon' id='form215_share'></label>
			<label>	<input type='hidden' name='id'>
					<input type='submit' class='submit_hidden'>
			</label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form215_header'></form>
					<th style='width:50px'>S. No.</th>
					<th>Bill Id</th>
					<th>Invoice #</th>
					<th>Order #</th>
					<th>Status</th>
					<th><input type='button' form='form215_header' title='Add item' class='add_icon' onclick='form215_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form215_body'>
		</tbody>
		<tfoot id='form215_foot'>
		</tfoot>
	</table>
</div>