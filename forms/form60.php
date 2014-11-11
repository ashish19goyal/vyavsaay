<div id='form60' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form60_header'></form>
					<th>Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form60_header' onblur="form60_ini();"></th>
					<th>Attribute <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form60_header' onblur="form60_ini();"></th>
					<th>Value</th>
					<th><input type="button" value='Add new category' form='form60_header' class='add_icon' onclick="form60_add_item();">
						<input type='button' form='form60_header' value='Export' class='export_icon'>
						<input type='button' form='form60_header' value='Import' class='import_icon'>
					</th>
			</tr>
		</thead>
		<tbody id='form60_body'>
		</tbody>
	</table>
</div>