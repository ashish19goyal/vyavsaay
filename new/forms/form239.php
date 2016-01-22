<div id='form239' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form239_header'></form>
					<th>Item <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form239_header'></th>
					<th># of raw materials </th>
					<th><input type='button' form='form239_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form239_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form239_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form239_prev' class='prev_icon' data-index='-25' onclick="$('#form239_index').attr('data-index',$(this).attr('data-index')); form239_ini();">
		<div style='display:hidden;' id='form239_index' data-index='0'></div>
		<img src='./images/next.png' id='form239_next' class='next_icon' data-index='25' onclick="$('#form239_index').attr('data-index',$(this).attr('data-index')); form239_ini();">
	</div>
</div>