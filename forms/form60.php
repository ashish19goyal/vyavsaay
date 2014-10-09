<div class='forms'><b>Product Categories</b>
	<table>
		<thead>
			<tr>
				<form id='form60_header'></form>
					<th>Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form60_header' onblur="form60_ini('');"></th>
					<th>Category <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form60_header' onblur="form60_ini('');"></th>
					<th><input type="button" value='Add new category' form='form60_header' onclick="form60_add_item();"></th>
			</tr>
		</thead>
		<tbody id='form60_body'>
		</tbody>
	</table>
</div>