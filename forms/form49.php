<div id='form49' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form49_header'></form>
					<th>Form <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type="text" class='filter' onblur="form49_ini();" form='form49_header'/></th>
					<th>Selection</th>
					<th><input type="submit" title="Save All" class='save_icon' form='form49_header'>
						<input type='button' form='form49_header' value='EXPORT' class='export_icon'>
					</th>
			</tr>
		</thead>
		<tbody id='form49_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form49_prev' class='prev_icon' data-index='-25' onclick="$('#form49_index').attr('data-index',$(this).attr('data-index')); form49_ini();">
		<div style='display:hidden;' id='form49_index' data-index='0'></div>
		<img src='./images/next.png' id='form49_next' class='next_icon' data-index='25' onclick="$('#form49_index').attr('data-index',$(this).attr('data-index')); form49_ini();">
	</div>
</div>