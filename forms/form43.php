<div id='form43' class='function_detail'><b>Manage Purchase orders</b>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form43_header'></form>
					<th>Order No. <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form43_header' onblur="form43_ini();"></th>
					<th>Supplier Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form43_header' onblur="form43_ini();"></th>
					<th>Order Date </th>
					<th>Status <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form43_header' onblur="form43_ini();"></th>
					<th><input type="button" value='Add new order' class='add_icon' form='form43_header' onclick="element_display('','form24'); form24_new_form();">
						<input type='button' form='form43_header' value='Export' class='export_icon'>
					</th>
			</tr>
		</thead>
		<tbody id='form43_body'>
		</tbody>
	</table>
</div>