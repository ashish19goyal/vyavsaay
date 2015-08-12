<div id='form48' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form48_header'></form>
					<th>Report <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type="text" class='filter' form='form48_header'></th>
					<th>Selection</th>
					<th style='min-width:200px'>Tables <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type="text" class='filter' form='form48_header'></th>
					<th><input type="button" title="Save All" name='save' class='save_icon' form='form48_header'>
						<input type="button" title="Add new" class='add_icon' form='form48_header' onclick="modal136_action('report');">
						<input type='button' form='form48_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form48_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form48_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form48_prev' class='prev_icon' data-index='-25' onclick="$('#form48_index').attr('data-index',$(this).attr('data-index')); form48_ini();">
		<div style='display:hidden;' id='form48_index' data-index='0'></div>
		<img src='./images/next.png' id='form48_next' class='next_icon' data-index='25' onclick="$('#form48_index').attr('data-index',$(this).attr('data-index')); form48_ini();">
	</div>
</div>