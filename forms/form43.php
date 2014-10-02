<div class='forms'><b>Manage Purchase Orders</b>
	<table>
		<thead>
			<tr>
				<form id='form43_header'></form>
					<th>Order No. <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form43_header' onblur="form43_ini('');"></th>
					<th>Supplier Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form43_header' onblur="form43_ini('');"></th>
					<th>Order Date <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form43_header' onblur="form43_ini('');"></th>
					<th>Estimated Amount</th>
					<th><input type="button" value='Add new Purchase Order' form='form43_header' onclick="form24_display('');"></th>
			</tr>
		</thead>
		<tbody id='form43_body'>
		</tbody>
	</table>
</div>