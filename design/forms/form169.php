<div id='form169' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form169_header'></form>
					<th>SKU <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form169_header'></th>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form169_header'></th>
					<th>Brand <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form169_header'></th>
					<th>Picture</th>
					<th>Tax</th>
					<th><input type='button' form='form169_header' title='Add new product' class='add_icon'>
						<input type='button' form='form169_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form169_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form169_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form169_prev' class='prev_icon' data-index='-25' onclick="$('#form169_index').attr('data-index',$(this).attr('data-index')); form169_ini();">
		<div style='display:hidden;' id='form169_index' data-index='0'></div>
		<img src='./images/next.png' id='form169_next' class='next_icon' data-index='25' onclick="$('#form169_index').attr('data-index',$(this).attr('data-index')); form169_ini();">
	</div>
</div>