<div id='form62' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form62_header'></form>
					<th>Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form62_header' onblur="form62_ini('');"></th>
					<th>Reviewer <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form62_header' onblur="form62_ini('');"></th>
					<th>Detail</th>
					<th>Rating <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form62_header' onblur="form62_ini('');"></th>
					<th><input type="button" value='Add review' form='form62_header' class='add_icon' onclick="form62_add_item();">
						<input type='button' form='form62_header' value='Export' class='export_icon'>
						<input type='button' form='form62_header' value='Import' class='import_icon'>
					</th>
			</tr>
		</thead>
		<tbody id='form62_body'>
		</tbody>
	</table>
</div>