<div id='form111' class='function_detail'>
	<form id='form111_master' autocomplete="off">
		<fieldset>
			<label>Report Name<br><input type='text' required></label>
			<label>Description<br><textarea></textarea></label>
			<label>	<input type='hidden' name='report_id'></label>
			<label>	<input type='submit' title='Save Report' class='save_icon'></label>
			<label>	<input type='button' value='Generate' class='generic_icon' onclick="generate_report(document.getElementById('form111_master').elements[3].value);"></label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form111_header'></form>
				<th>Table</th>
				<th>Field</th>
				<th>Condition</th>
				<th>Condition Match</th>
				<th><input type='button' form='form111_header' title='Add item' class='add_icon' onclick='form111_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form111_body'>
		</tbody>
	</table>
</div>