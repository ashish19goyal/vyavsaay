<div id='form61' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form61_header'></form>
					<th>Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form61_header' onblur="form61_ini();"></th>
					<th>Attribute <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form61_header' onblur="form61_ini();"></th>
					<th>Value</th>
					<th><input type="button" value='Add new category' form='form61_header' class='add_icon' onclick="form61_add_item();">
						<input type='button' form='form61_header' value='EXPORT' class='export_icon'>
						<input type='button' form='form61_header' value='IMPORT' class='import_icon'>
					</th>
			</tr>
		</thead>
		<tbody id='form61_body'>
		</tbody>
	</table>
</div>