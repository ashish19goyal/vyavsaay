<div id='form39' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form39_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form39_header'></th>
					<th>Make <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form39_header'></th>
					<th>Description</th>
					<th>Picture</th>
					<th>Tax</th>
					<th><input type='button' form='form39_header' title='Add new product' class='add_icon' onclick='modal14_action();'>
						<input type='button' form='form39_header' title='EXPORT' class='export_icon'>
						<input type='button' form='form39_header' title='IMPORT' class='import_icon'>
						<input type='submit' form='form39_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form39_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form39_prev' class='prev_icon' data-index='-25' onclick="$('#form39_index').attr('data-index',$(this).attr('data-index')); form39_ini();">
		<div style='display:hidden;' id='form39_index' data-index='0'></div>
		<img src='./images/next.png' id='form39_next' class='next_icon' data-index='25' onclick="$('#form39_index').attr('data-index',$(this).attr('data-index')); form39_ini();">
	</div>
</div>