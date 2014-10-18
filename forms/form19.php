<div id='form19' class='function_detail'><b>Manage returns to suppliers</b>
	<table>
		<thead>
			<tr>
				<form id='form19_header'></form>
					<th>Product Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form19_header' onblur="form19_ini('');"></th>
					<th>Batch <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form19_header' onblur="form19_ini('');"></th>
					<th>Bill Id <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form19_header' onblur="form19_ini('');"></th>
					<th>Supplier <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form19_header' onblur="form19_ini('');"></th>
					<th>Reason <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form19_header' onblur="form19_ini('');"></th>
					<th>Quantity</th>
					<th><input type='button' form='form19_header' value='Add item' class='add_icon' onclick='form19_add_item();'>
						<input type='button' form='form19_header' value='Export' class='export_icon'>
					</th>
			</tr>
		</thead>
		<tbody id='form19_body'>
		</tbody>
	</table>
</div>