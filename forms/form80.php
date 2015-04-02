<div id='form80' class='function_detail'>
	<form id='form80_master'>
		<fieldset>
			<label>Object type: <input type='text' required></label>
			<input type='hidden' name='table_name'>
			<input type='hidden' name='column'>
			<input type='hidden' name='references'>
			<input type='hidden' name='reference_ids'>
			<input type='submit' value='Save all Mappings' class='generic_icon'>
			<input type='button' value='Start merging' class='generic_icon'>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form80_header'></form>
					<th>Change</th>
					<th>To</th>
					<th><input type='button' form='form80_header' title='Add item' class='add_icon' onclick='form80_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form80_body'>
		</tbody>
	</table>
</div>