<div id='form5' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form5_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form5_header'></th>
					<th>Type <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form5_header'></th>
					<th>Details</th>
					<th><input type='button' form='form5_header' value='Add item' class='add_icon' onclick='modal10_action();'>
						<input type='button' form='form5_header' value='EXPORT' class='export_icon'>
						<input type='button' form='form5_header' value='IMPORT' class='import_icon'>
						<input type='submit' form='form5_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form5_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form5_prev' class='prev_icon' data-index='-25' onclick="$('#form5_index').attr('data-index',$(this).attr('data-index')); form5_ini();">
		<div style='display:hidden;' id='form5_index' data-index='0'></div>
		<img src='./images/next.png' id='form5_next' class='next_icon' data-index='25' onclick="$('#form5_index').attr('data-index',$(this).attr('data-index')); form5_ini();">
	</div>
</div>