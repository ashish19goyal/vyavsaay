<div id='form80' class='tab-pane'>
	<form id='form80_master' autocomplete="off">
		<fieldset>
			<label>Object type: <input type='text' required></label>
			<label>
				<input type='hidden' name='table_name'>
				<input type='hidden' name='column'>
				<input type='hidden' name='references'>
				<input type='hidden' name='reference_ids'>
			</label>
			<label>	<input type='button' value='Save all Mappings' name='mapping' class='generic_icon'></label>
			<label>	<input type='button' value='Start merging' name='merging' class='generic_icon'></label>	
			<label>	<input type='submit' class='submit_hidden'></label>
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