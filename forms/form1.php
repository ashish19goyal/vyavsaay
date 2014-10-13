<div id='form1' class='function_detail'><b>Manage prices of products</b>
	<table>
		<thead>
			<tr>
				<form id='form1_header'></form>
					<th>Product Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form1_header' onblur="form1_ini('');"></th>
					<th>Batch <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form1_header' onblur="form1_ini('');"></th>
					<th>Expiry <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form1_header' onblur="form1_ini('');"></th>
					<th>Price (in Rs)</th>
					<th>Quantity</th>
					<th><input type='button' form='form1_header' value='Add item' onclick='form1_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form1_body'>
		</tbody>
	</table>
</div>