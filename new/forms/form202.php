<div id='form202' class='tab-pane'>
	<form id='form202_master' autocomplete="off">
		<fieldset>
			<label>Target Office: <input type='text' name='target' required></label>
			<!--<label><input type='button' name='save' class='generic_icon' value='Update Status'></label>-->
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead id='form202_head'>
			<tr>
				<form id='form202_header'></form>
					<th>AWB #</th>
					<th>Order #</th>
					<th>Address</th>
					<th><input type='button' form='form202_header' title='Add item' class='add_icon' onclick='form202_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form202_body'>
		</tbody>
	</table>
</div>