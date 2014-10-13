<div id='form40' class='function_detail'><b>Manage and add vendors</b>
	<table>
		<thead>
			<tr>
				<form id='form40_header'></form>
					<th>Vendor Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form40_header' onblur="form40_ini('');"></th>
					<th>Phone <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form40_header' onblur="form40_ini('');"></th>
					<th>Email <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form40_header' onblur="form40_ini('');"></th>
					<th>Address</th>
					<th>Notes</th>
					<th><input type='button' form='form40_header' value='Add new vendor' onclick='form40_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form40_body'>
		</tbody>
	</table>
</div>