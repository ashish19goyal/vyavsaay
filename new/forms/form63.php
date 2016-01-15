<div id='form63' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form63_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form63_header'></th>
					<th>Reviewer <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form63_header'></th>
					<th>Detail</th>
					<th>Rating <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form63_header'></th>
					<th><input type="button" value='Add review' form='form63_header' class='add_icon' onclick="form63_add_item();">
						<input type='button' form='form63_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form63_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form63_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form63_prev' class='prev_icon' data-index='-25' onclick="$('#form63_index').attr('data-index',$(this).attr('data-index')); form63_ini();">
		<div style='display:hidden;' id='form63_index' data-index='0'></div>
		<img src='./images/next.png' id='form63_next' class='next_icon' data-index='25' onclick="$('#form63_index').attr('data-index',$(this).attr('data-index')); form63_ini();">
	</div>
</div>