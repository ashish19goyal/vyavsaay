<div id='form11' class='function_detail'><b>Manage and schedule payments</b>
	<table>
		<thead>
			<tr>
				<form id='form11_header'></form>
					<th>Transaction Id <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form11_header' onblur="form11_ini('');"></th>
					<th>From <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form11_header' onblur="form11_ini('');"></th>
					<th>Amount</th>
					<th>Due Date <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form11_header' onblur="form11_ini('');"></th>
					<th>Date Closed <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form11_header' onblur="form11_ini('');"></th>
					<th>Status <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form11_header' onblur="form11_ini('');"></th>
					<th><input type='button' form='form11_header' value='Add entry' onclick='form11_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form11_body'>
		</tbody>
	</table>
</div>