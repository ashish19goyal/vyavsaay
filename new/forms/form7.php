<div id='form7' class='tab-pane'>
	<input type='button' value='Switch view' class='generic_icon' onclick='form7_switch_view();'>
	<div id="form7_calendar" style="max-width: 900px;margin:20px auto;"></div>
		<form id='form7_master'>
			<fieldset>
				<label>Select Date: <input type='text' required onchange='form7_ini();'></label>
				<label><input type='submit' class='generic_icon' value="Save All"></label>
			</fieldset>
		</form>
		<table class='rwd-table'>
			<thead>
				<tr>
					<form id='form7_header'></form>
						<th>Staff Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form7_header'></th>
						<th>Attendance <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form7_header'></th>
						<th>Hours worked</th>
						<th><input type='submit' form='form7_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form7_body'>
			</tbody>
		</table>
</div>