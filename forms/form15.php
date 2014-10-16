<div id='form15' class='function_detail'><b>Add items returned by customer</b>
	<table>
		<thead>
			<tr>
				<form id='form15_header'></form>
					<th>Customer Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form15_header' onblur="form15_ini('');"></th>
					<th>Bill Id <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form15_header' onblur="form15_ini('');"></th>
					<th>Product <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form15_header' onblur="form15_ini('');"></th>
					<th>Batch <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form15_header' onblur="form15_ini('');"></th>
					<th>Amount</th>
					<th>Quantity</th>
					<th><input type='button' form='form15_header' value='Add item' class='add_icon' onclick='form15_add_item();'>
						<input type='button' form='form15_header' value='Export' class='export_icon'>
						<input type='button' form='form15_header' value='Import' class='import_icon'></th>
					</tr>
		</thead>
		<tbody id='form15_body'>
		</tbody>
	</table>
</div>