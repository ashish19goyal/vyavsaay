<div id='form54' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form54_header'></form>
					<th>Template Type<img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type="text" class='filter' form='form54_header'></th>
					<th>Selection</th>
					<th><input type="button" title="Save All" class='save_icon' form='form54_header'>
						<input type='button' form='form54_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form54_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form54_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form54_prev' class='prev_icon' data-index='-25' onclick="$('#form54_index').attr('data-index',$(this).attr('data-index')); form54_ini();">
		<div style='display:hidden;' id='form54_index' data-index='0'></div>
		<img src='./images/next.png' id='form54_next' class='next_icon' data-index='25' onclick="$('#form54_index').attr('data-index',$(this).attr('data-index')); form54_ini();">
	</div>
</div>