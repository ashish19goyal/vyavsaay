<div id='form77' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form77_header'></form>
					<th>Form/Report <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type="text" class='filter' form='form77_header'></th>
					<th>Key <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type="text" class='filter' form='form77_header'></th>
					<th><input type="button" title="Save All" class='save_icon' form='form77_header'>
						<input type='button' form='form77_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form77_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form77_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form77_prev' class='prev_icon' data-index='-25' onclick="$('#form77_index').attr('data-index',$(this).attr('data-index')); form77_ini();">
		<div style='display:hidden;' id='form77_index' data-index='0'></div>
		<img src='./images/next.png' id='form77_next' class='next_icon' data-index='25' onclick="$('#form77_index').attr('data-index',$(this).attr('data-index')); form77_ini();">
	</div>
</div>