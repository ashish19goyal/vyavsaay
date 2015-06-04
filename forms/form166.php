<div id='form166' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form166_header'></form>
					<th>Item <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form166_header'></th>
					<th>Batch <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form166_header'></th>
					<th>MRP</th>
					<th>Cost Price</th>
					<th>Sale Price</th>
					<th><input type='button' form='form166_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form166_header' style='display:none;visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form166_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form166_prev' class='prev_icon' data-index='-25' onclick="$('#form166_index').attr('data-index',$(this).attr('data-index')); form166_ini();">
		<div style='display:hidden;' id='form166_index' data-index='0'></div>
		<img src='./images/next.png' id='form166_next' class='next_icon' data-index='25' onclick="$('#form166_index').attr('data-index',$(this).attr('data-index')); form166_ini();">
	</div>
</div>