<div id='form38' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form38_header'></form>
					<th>Product Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form38_header' onblur="form38_ini();"></th>
					<th>Batch <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form38_header' onblur="form38_ini();"></th>
					<th>Store Area <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form38_header' onblur="form38_ini();"></th>
					<th><input type='button' form='form38_header' value='Add item' class='add_icon' onclick='form38_add_item();'>
						<input type='button' form='form38_header' value='Export' class='export_icon'>
						<input type='button' form='form38_header' value='Import' class='import_icon'></th>
					</tr>
		</thead>
		<tbody id='form38_body'>
		</tbody>
	</table>
</div>