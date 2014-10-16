<div id='form61' class='function_detail'><b>Service Categories</b>
	<table>
		<thead>
			<tr>
				<form id='form61_header'></form>
					<th>Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form61_header' onblur="form61_ini('');"></th>
					<th>Category <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form61_header' onblur="form61_ini('');"></th>
					<th><input type="button" value='Add new category' form='form61_header' class='add_icon' onclick="form61_add_item();">
						<input type='button' form='form61_header' value='Export' class='export_icon'>
						<input type='button' form='form61_header' value='Import' class='import_icon'>
					</th>
			</tr>
		</thead>
		<tbody id='form61_body'>
		</tbody>
	</table>
</div>