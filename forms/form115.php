<div id='form115' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form115_header'></form>
					<th>Supplier <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form115_header'></th>
					<th>Item Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form115_header'></th>
					<th>Batch <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form115_header'></th>
					<th>Quantity</th>
					<th>Date</th>
					<th><input type='button' form='form115_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form115_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form115_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form115_prev' class='prev_icon' data-index='-25' onclick="$('#form115_index').attr('data-index',$(this).attr('data-index')); form115_ini();">
		<div style='display:hidden;' id='form115_index' data-index='0'></div>
		<img src='./images/next.png' id='form115_next' class='next_icon' data-index='25' onclick="$('#form115_index').attr('data-index',$(this).attr('data-index')); form115_ini();">
	</div>
</div>