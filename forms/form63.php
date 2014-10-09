<div class='forms'><b>Service Reviews</b>
	<table>
		<thead>
			<tr>
				<form id='form63_header'></form>
					<th>Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form63_header' onblur="form63_ini('');"></th>
					<th>Reviewer <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form63_header' onblur="form63_ini('');"></th>
					<th>Detail</th>
					<th>Rating <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form63_header' onblur="form63_ini('');"></th>
					<th><input type="button" value='Add review' form='form63_header' onclick="form63_add_item();"></th>
			</tr>
		</thead>
		<tbody id='form63_body'>
		</tbody>
	</table>
</div>