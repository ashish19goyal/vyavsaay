<div id='form63' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form63_header'></form>
					<th>Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form63_header' onblur="form63_ini('');"></th>
					<th>Reviewer <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form63_header' onblur="form63_ini('');"></th>
					<th>Detail</th>
					<th>Rating <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form63_header' onblur="form63_ini('');"></th>
					<th><input type="button" value='Add review' form='form63_header' class='add_icon' onclick="form63_add_item();">
						<input type='button' form='form63_header' value='Export' class='export_icon'>
						<input type='button' form='form63_header' value='Import' class='import_icon'>
					</th>
			</tr>
		</thead>
		<tbody id='form63_body'>
		</tbody>
	</table>
</div>