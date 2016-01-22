<div id='form46' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form46_header'></form>
					<th>Setting <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type="text" class='filter' form='form46_header'></th>
					<th>Value</th>
					<th><input type="button" class='add_icon' title='Add new item' form='form46_header'>
						<input type='button' form='form46_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form46_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form46_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form46_prev' class='prev_icon' data-index='-25' onclick="$('#form46_index').attr('data-index',$(this).attr('data-index')); form46_ini();">
		<div style='display:hidden;' id='form46_index' data-index='0'></div>
		<img src='./images/next.png' id='form46_next' class='next_icon' data-index='25' onclick="$('#form46_index').attr('data-index',$(this).attr('data-index')); form46_ini();">
	</div>
</div>