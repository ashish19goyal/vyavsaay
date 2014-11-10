<div id='form22' class='function_detail'><b>Manage disposal of items</b>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form22_header'></form>
					<th>Product Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form22_header' onblur="form22_ini('');"></th>
					<th>Batch <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form22_header' onblur="form22_ini('');"></th>
					<th>Method <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form22_header' onblur="form22_ini('');"></th>
					<th>Quantity</th>
					<th>Date <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form22_header' onblur="form22_ini('');"></th>
					<th><input type='button' form='form22_header' value='Add item' class='add_icon' onclick='form22_add_item();'>
						<input type='button' form='form22_header' value='Export' class='export_icon'>
					</th>
			</tr>
		</thead>
		<tbody id='form22_body'>
		</tbody>
	</table>
</div>