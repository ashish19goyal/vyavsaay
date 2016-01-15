<div id='form143' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form143_header'></form>
					<th>ID <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form143_header'></th>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form143_header'></th>
					<th>Display Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form143_header'></th>
					<th>Workflow </th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form143_header'></th>
					<th><input type='button' form='form143_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form143_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form143_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form143_prev' class='prev_icon' data-index='-25' onclick="$('#form143_index').attr('data-index',$(this).attr('data-index')); form143_ini();">
		<div style='display:hidden;' id='form143_index' data-index='0'></div>
		<img src='./images/next.png' id='form143_next' class='next_icon' data-index='25' onclick="$('#form143_index').attr('data-index',$(this).attr('data-index')); form143_ini();">
	</div>
</div>