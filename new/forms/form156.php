<div id='form156' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form156_header'></form>
					<th>Product Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form156_header'></th>
					<th>Store <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form156_header'></th>
					<th>Quantity</th>
					<th><input type='button' form='form156_header' value='Add item' class='add_icon' onclick='form156_add_item();'>
						<input type='button' form='form156_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form156_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form156_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form156_prev' class='prev_icon' data-index='-25' onclick="$('#form156_index').attr('data-index',$(this).attr('data-index')); form156_ini();">
		<div style='display:hidden;' id='form156_index' data-index='0'></div>
		<img src='./images/next.png' id='form156_next' class='next_icon' data-index='25' onclick="$('#form156_index').attr('data-index',$(this).attr('data-index')); form156_ini();">
	</div>
</div>