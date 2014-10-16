<div id='form43' class='function_detail'><b>Manage Purchase Orders</b>
	<table>
		<thead>
			<tr>
				<form id='form43_header'></form>
					<th>Order No. <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form43_header' onblur="form43_ini('');"></th>
					<th>Supplier Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form43_header' onblur="form43_ini('');"></th>
					<th>Order Date <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form43_header' onblur="form43_ini('');"></th>
					<th>Estimated Amount</th>
					<th><input type="button" value='Add new Purchase Order' class='add_icon' form='form43_header' onclick="form24_display('');">
						<input type='button' form='form43_header' value='Export' class='export_icon'>
						<input type='button' form='form43_header' value='Import' class='import_icon'></th>
					</tr>
		</thead>
		<tbody id='form43_body'>
		</tbody>
	</table>
</div>