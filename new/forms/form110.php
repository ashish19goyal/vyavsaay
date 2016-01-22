<div id='form110' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form110_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form110_header'></th>
					<th>Description</th>
					<th><input type="button" value='Add new report' form='form110_header' class='add_icon' onclick="element_display('','form111');">
						<input type='submit' form='form110_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form110_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form110_prev' class='prev_icon' data-index='-25' onclick="$('#form110_index').attr('data-index',$(this).attr('data-index')); form110_ini();">
		<div style='display:hidden;' id='form110_index' data-index='0'></div>
		<img src='./images/next.png' id='form110_next' class='next_icon' data-index='25' onclick="$('#form110_index').attr('data-index',$(this).attr('data-index')); form110_ini();">
	</div>
</div>