<div id='form195' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form195_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form195_header'></th>
					<th>To </th>
					<th>Date </th>
					<th>
						<input type='button' class='add_icon' form='form195_header' title='Add new' onclick="form195_add_item();">
						<input type='button' form='form195_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form195_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form195_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form195_prev' class='prev_icon' data-index='-25' onclick="$('#form195_index').attr('data-index',$(this).attr('data-index')); form195_ini();">
		<div style='display:hidden;' id='form195_index' data-index='0'></div>
		<img src='./images/next.png' id='form195_next' class='next_icon' data-index='25' onclick="$('#form195_index').attr('data-index',$(this).attr('data-index')); form195_ini();">
	</div>
</div>