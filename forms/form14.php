<div id='form14' class='function_detail'><b>Manage and assign tasks</b>
	<table>
		<thead>
			<tr>
				<form id='form14_header'></form>
					<th>Task Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form14_header' onblur="form14_ini('');"></th>
					<th>Description</th>
					<th>Assignee <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form14_header' onblur="form14_ini('');"></th>
					<th>Due Time <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form14_header' onblur="form14_ini('');"></th>
					<th>Execution Time <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form14_header' onblur="form14_ini('');"></th>
					<th>Status <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form14_header' onblur="form14_ini('');"></th>
					<th><input type='button' form='form14_header' value='Add task' onclick='form14_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form14_body'>
		</tbody>
	</table>
</div>