<div id='form14' class='function_detail'>
	<input type='button' value='Switch view' onclick='form14_switch_view();'>
	<div id="form14_calendar" style="max-width: 900px;margin:20px auto;"></div>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form14_header'></form>
					<th>Task <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form14_header' onblur="form14_ini();"></th>
					<th>Assignee <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form14_header' onblur="form14_ini();"></th>
					<th>Due Time </th>
					<th>Execution Time </th>
					<th>Status <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form14_header' onblur="form14_ini();"></th>
					<th><input type='button' form='form14_header' value='Add task' class='add_icon' onclick='form14_add_item();'>
						<input type='button' form='form14_header' value='Export' class='export_icon'>
						<input type='button' form='form14_header' value='Import' class='import_icon'></th>
					</tr>
		</thead>
		<tbody id='form14_body'>
		</tbody>
	</table>
</div>