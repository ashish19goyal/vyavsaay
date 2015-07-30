<div id='form210' class='function_detail'>
	<form id='form210_master' autocomplete="off">
		<fieldset>
			<label>Bag #: <input type='text' class='widebox' name='bag'></label>
			<label>Order #: <input type='text' class='widebox' name='order'></label>
			<!--<label><input type='button' name='save' class='generic_icon' value='Update Status'></label>-->
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead id='form210_head'>
			<tr>
				<form id='form210_header'></form>
				<th>AWB #</th>
				<th>Order #</th>
				<th><input type='button' form='form210_header' title='Add item' class='add_icon' onclick='form210_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form210_body'>
		</tbody>
	</table>
</div>