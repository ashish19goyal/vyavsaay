<div id='form1' class='function_detail'><b>Manage Inventory</b>
	<table>
		<thead>
			<tr>
				<form id='form1_header'></form>
					<th>Product Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form1_header' onblur="form1_ini('');"></th>
					<th>Batch <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form1_header' onblur="form1_ini('');"></th>
					<th>Cost Price (in Rs)</th>
					<th>Sale Price (in Rs)</th>
					<th>Expiry</th>
					<th>Quantity</th>
					<th><input type='button' form='form1_header' title='Add new product' class='add_icon' onclick='modal14_action();'>
						<input type='button' form='form1_header' title='Add new batch' class='add_icon' onclick='modal22_action();'>
						<input type='button' form='form1_header' title='Export' class='export_icon'>
						<input type='button' form='form1_header' title='Import' class='import_icon'>
					</th>
			</tr>
		</thead>
		<tbody id='form1_body'>
		</tbody>
	</table>
</div>