<div id='form211' class='function_detail'>
	<form id='form211_master' autocomplete="off">
		<fieldset>
			<label>DRS #<br><input type='text' name='drs'></label>
			<label>Set Status<br><input type='text' name='status'></label>
			<label>Set Remark<br><textarea name='remark'></textarea></label>
			<label>
				<input type='submit' class='generic_icon' name='refresh' value="Refresh">
				<input type='button' class='save_icon' name='save' title="Save All">
			</label>
		</fieldset>
	</form>
		<table class='rwd-table'>
		<thead id='form211_head'>
			<tr>
				<form id='form211_header'></form>
					<th>AWB #</th>
					<th>Current Status</th>
					<th>Updated Status</th>
					<th>Remark</th>
					<th><input type='button' form='form211_header' title='Add item' class='add_icon' onclick='form211_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form211_body'>
		</tbody>
	</table>
</div>