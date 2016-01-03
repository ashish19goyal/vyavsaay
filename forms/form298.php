<div id='form298' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form298_header'></form>
					<th>Name<img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form298_header'></th>
					<th>Description</th>
					<th style='width:30%;'>Code</th>
					<th>Markers</th>
					<th>Images</th>
					<th>
						<input type='button' form='form298_header' title='Add' class='add_icon' onclick='form298_add_item();'>
						<input type='button' form='form298_header' name='export' value='EXPORT' class='export_icon'>
						<input type='submit' form='form298_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form298_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form298_prev' class='prev_icon' data-index='-25' onclick="$('#form298_index').attr('data-index',$(this).attr('data-index')); form298_ini();">
		<div style='display:hidden;' id='form298_index' data-index='0'></div>
		<img src='./images/next.png' id='form298_next' class='next_icon' data-index='25' onclick="$('#form298_index').attr('data-index',$(this).attr('data-index')); form298_ini();">
	</div>
</div>