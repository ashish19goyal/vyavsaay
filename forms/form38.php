<div id='form38' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form38_header'></form>
					<th>Product Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form38_header'></th>
					<th>Batch <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form38_header'></th>
					<th>Store Area <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form38_header'></th>
					<th>Quantity</th>
					<th><input type='button' form='form38_header' value='Add item' class='add_icon' onclick='form38_add_item();'>
						<input type='button' form='form38_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form38_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form38_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form38_prev' class='prev_icon' data-index='-25' onclick="$('#form38_index').attr('data-index',$(this).attr('data-index')); form38_ini();">
		<div style='display:hidden;' id='form38_index' data-index='0'></div>
		<img src='./images/next.png' id='form38_next' class='next_icon' data-index='25' onclick="$('#form38_index').attr('data-index',$(this).attr('data-index')); form38_ini();">
	</div>
</div>