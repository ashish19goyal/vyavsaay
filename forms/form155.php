<div id='form155' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form155_header'></form>
					<th>Product Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form155_header'></th>
					<th>Cost Price (in Rs)</th>
					<th>Sale Price (in Rs)</th>
					<th>Quantity</th>
					<th><input type='button' form='form155_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form155_header' style='display:none;visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form155_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form155_prev' class='prev_icon' data-index='-25' onclick="$('#form155_index').attr('data-index',$(this).attr('data-index')); form155_ini();">
		<div style='display:hidden;' id='form155_index' data-index='0'></div>
		<img src='./images/next.png' id='form155_next' class='next_icon' data-index='25' onclick="$('#form155_index').attr('data-index',$(this).attr('data-index')); form155_ini();">
	</div>
</div>