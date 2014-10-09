<div class='forms'><b>Product Reviews</b>
	<table>
		<thead>
			<tr>
				<form id='form62_header'></form>
					<th>Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form62_header' onblur="form62_ini('');"></th>
					<th>Reviewer <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form62_header' onblur="form62_ini('');"></th>
					<th>Detail</th>
					<th>Rating <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form62_header' onblur="form62_ini('');"></th>
					<th><input type="button" value='Add review' form='form62_header' onclick="form62_add_item();"></th>
			</tr>
		</thead>
		<tbody id='form62_body'>
		</tbody>
	</table>
</div>