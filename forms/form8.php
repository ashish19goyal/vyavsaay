<div id='form8' class='function_detail'><b>manage staff information</b>
	<table>
		<thead>
			<tr>
				<form id='form8_header'></form>
					<th>Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form8_header' onblur="form8_ini('');"></th>
					<th>Phone <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form8_header' onblur="form8_ini('');"></th>
					<th>Email <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form8_header' onblur="form8_ini('');"></th>
					<th>Address </th>
					<th>Details </th>
					<th>Status <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form8_header' onblur="form8_ini('');"></th>
					<th><input type='button' form='form8_header' value='Add new staff' class='add_icon' onclick='modal16_action();'>
						<input type='button' form='form8_header' value='Export' class='export_icon'>
						<input type='button' form='form8_header' value='Import' class='import_icon'></th>
					</tr>
		</thead>
		<tbody id='form8_body'>
		</tbody>
	</table>
</div>