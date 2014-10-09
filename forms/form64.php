<div class='forms'><b>Cross Sells</b>
	<table>
		<thead>
			<tr>
				<form id='form64_header'></form>
					<th>Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form64_header' onblur="form64_ini('');"></th>
					<th>Type <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form64_header' onblur="form64_ini('');"></th>
					<th>Cross sold item <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form64_header' onblur="form64_ini('');"></th>
					<th><input type="button" value='Add review' form='form64_header' onclick="form64_add_item();"></th>
			</tr>
		</thead>
		<tbody id='form64_body'>
		</tbody>
	</table>
</div>