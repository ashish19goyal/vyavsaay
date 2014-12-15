<div id='form54' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form54_header'></form>
					<th>Template Type<img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type="text" class='filter' onblur="form54_ini();" form='form54_header'></th>
					<th>Selection</th>
					<th><input type="submit" title="Save All" class='save_icon' form='form54_header'>
						<input type='button' form='form54_header' value='EXPORT' class='export_icon'>
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