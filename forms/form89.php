<div id='form89' class='function_detail'>
	<input type='button' value='Switch view' onclick='form89_switch_view();'>
	<div id="form89_calendar" style="max-width:900px;margin:20px auto;"></div>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form89_header'></form>
					<th>Customer <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form89_header' onblur="form89_ini();"></th>
					<th>Assignee <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form89_header' onblur="form89_ini();"></th>
					<th>Schedule</th>
					<th>Notes</th>
					<th>Status <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form89_header' onblur="form89_ini();"></th>
					<th><input type='button' form='form89_header' title='Add appointment' class='add_icon' onclick='form89_add_item();'>
						<input type='button' form='form89_header' value='EXPORT' class='export_icon'>
						<input type='button' form='form89_header' value='IMPORT' class='import_icon'>
					</th>
			</tr>
		</thead>
		<tbody id='form89_body'>
		</tbody>
	</table>
</div>