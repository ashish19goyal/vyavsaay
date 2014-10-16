<div id='form30' class='function_detail'><b>Manage and add customers</b>
	<table>
		<thead>
			<tr>
				<form id='form30_header'></form>
					<th>Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form30_header' onblur="form30_ini('');"></th>
					<th>Contact No. <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form30_header' onblur="form30_ini('');"></th>
					<th>Email <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form30_header' onblur="form30_ini('');"></th>
					<th>Address</th>
					<th>Status <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form30_header' onblur="form30_ini('');"></th>
					<th><input type='button' form='form30_header' value='Add item' class='add_icon' onclick='form30_add_item();'>
						<input type='button' form='form30_header' value='Export' class='export_icon'>
						<input type='button' form='form30_header' value='Import' class='import_icon'></th>
			</tr>
		</thead>
		<tbody id='form30_body'>
		</tbody>
	</table>
</div>