<div id='form58' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form58_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form58_header' onblur="form58_ini('');"></th>
					<th>Requisite Type <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form58_header' onblur="form58_ini('');"></th>
					<th>Requisite Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form58_header' onblur="form58_ini('');"></th>
					<th>Quantity</th>
					<th><input type="button" value='Add new requisite' form='form58_header' class='add_icon' onclick="form58_add_item();">
						<input type='button' form='form58_header' value='EXPORT' class='export_icon'>
						<input type='button' form='form58_header' value='IMPORT' class='import_icon'>
					</th>
			</tr>
		</thead>
		<tbody id='form58_body'>
		</tbody>
	</table>
</div>