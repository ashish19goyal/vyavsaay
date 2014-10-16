<div id='form64' class='function_detail'><b>Cross Sells</b>
	<table>
		<thead>
			<tr>
				<form id='form64_header'></form>
					<th>Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form64_header' onblur="form64_ini('');"></th>
					<th>Type <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form64_header' onblur="form64_ini('');"></th>
					<th>Cross sold item <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form64_header' onblur="form64_ini('');"></th>
					<th><input type="button" value='Add item' form='form64_header' class='add_icon' onclick="form64_add_item();">
						<input type='button' form='form64_header' value='Export' class='export_icon'>
						<input type='button' form='form64_header' value='Import' class='import_icon'>
					</th>
			</tr>
		</thead>
		<tbody id='form64_body'>
		</tbody>
	</table>
</div>