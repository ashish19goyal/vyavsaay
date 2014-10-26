<div id='form70' class='function_detail'><b>Manage Sale orders</b>
	<table>
		<thead>
			<tr>
				<form id='form70_header'></form>
					<th>Order No. <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form70_header' onblur="form70_ini();"></th>
					<th>Customer Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form70_header' onblur="form70_ini();"></th>
					<th>Order Date </th>
					<th>Status <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form70_header' onblur="form70_ini();"></th>
					<th><input type="button" value='Add new order' class='add_icon' form='form70_header' onclick="element_display('','form69'); form69_new_form();">
						<input type='button' form='form70_header' value='Export' class='export_icon'>
					</th>
			</tr>
		</thead>
		<tbody id='form70_body'>
		</tbody>
	</table>
</div>