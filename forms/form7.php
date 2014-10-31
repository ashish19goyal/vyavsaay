<div id='form7' class='function_detail'>
	<div id="attendance_calendar" style="max-width: 900px;margin:20px auto;"></div>
	
		<form id='form7_master'>
			<fieldset>
				Select Date <input type='text' required onchange='form7_ini();'>
				<input type='submit' value="Save All">
			</fieldset>
		</form>
		<table>
			<thead>
				<tr>
					<form id='form7_header'></form>
						<th>Staff Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form7_header' onblur="form7_ini();"></th>
						<th>Attendance <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form7_header' onblur="form7_ini();"></th>
						<th>Hours worked</th>
						<th></th>
				</tr>
			</thead>
			<tbody id='form7_body'>
			</tbody>
		</table>
</div>