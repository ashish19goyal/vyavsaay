<div id='form90' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form90_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form90_header'></th>
					<th>Notes</th>
					<th><input type='button' form='form90_header' title='Add new billing type' class='add_icon' onclick='form90_add_item();'>
						<input type='button' form='form90_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form90_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form90_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form90_prev' class='prev_icon' data-index='-25' onclick="$('#form90_index').attr('data-index',$(this).attr('data-index')); form90_ini();">
		<div style='display:hidden;' id='form90_index' data-index='0'></div>
		<img src='./images/next.png' id='form90_next' class='next_icon' data-index='25' onclick="$('#form90_index').attr('data-index',$(this).attr('data-index')); form90_ini();">
	</div>
</div>