<div class='forms'><b>Manage and add products</b>
	<table>
		<thead>
			<tr>
				<form id='form39_header'></form>
					<th>Product type <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form39_header' onblur="form39_ini('');"></th>
					<th>Product Make <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form39_header' onblur="form39_ini('');"></th>
					<th>Product Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form39_header' onblur="form39_ini('');"></th>
					<th>Picture</th>
					<th>Estimated Price</th>
					<th>Description</th>
					<th><input type='button' form='form39_header' value='Add new product' onclick='form39_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form39_body'>
		</tbody>
	</table>
</div>