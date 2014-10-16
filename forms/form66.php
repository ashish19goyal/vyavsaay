<div id='form66' class='function_detail'><b>Cross Sells</b>
	<table>
		<thead>
			<tr>
				<form id='form66_header'></form>
					<th>Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form66_header' onblur="form66_ini('');"></th>
					<th>Type <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form66_header' onblur="form66_ini('');"></th>
					<th>Cross sold item <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form66_header' onblur="form66_ini('');"></th>
					<th><input type="button" value='Add item' form='form66_header' class='add_icon' onclick="form66_add_item();">
						<input type='button' form='form66_header' value='Export' class='export_icon'>
						<input type='button' form='form66_header' value='Import' class='import_icon'></th>
					</tr>
		</thead>
		<tbody id='form66_body'>
		</tbody>
	</table>
</div>