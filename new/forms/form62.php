<div id='form62' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form62_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form62_header'></th>
					<th>Reviewer <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form62_header'></th>
					<th>Detail</th>
					<th>Rating <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form62_header'></th>
					<th><input type="button" value='Add review' form='form62_header' class='add_icon' onclick="form62_add_item();">
						<input type='button' form='form62_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form62_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form62_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form62_prev' class='prev_icon' data-index='-25' onclick="$('#form62_index').attr('data-index',$(this).attr('data-index')); form62_ini();">
		<div style='display:hidden;' id='form62_index' data-index='0'></div>
		<img src='./images/next.png' id='form62_next' class='next_icon' data-index='25' onclick="$('#form62_index').attr('data-index',$(this).attr('data-index')); form62_ini();">
	</div>
</div>