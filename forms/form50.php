<div id='form50' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form50_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type="text" class='filter' onblur="form50_ini();" form='form50_header'/></th>
					<th>Value</th>
					<th><input type="submit" title="Save All" class='save_icon' form='form50_header'/>
						<input type='button' form='form50_header' value='EXPORT' class='export_icon'>
					</th>
			</tr>
		</thead>
		<tbody id='form50_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form50_prev' class='prev_icon' data-index='-25' onclick="$('#form50_index').attr('data-index',$(this).attr('data-index')); form50_ini();">
		<div style='display:hidden;' id='form50_index' data-index='0'></div>
		<img src='./images/next.png' id='form50_next' class='next_icon' data-index='25' onclick="$('#form50_index').attr('data-index',$(this).attr('data-index')); form50_ini();">
	</div>
</div>