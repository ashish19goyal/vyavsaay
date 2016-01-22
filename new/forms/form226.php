<div id='form226' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form226_header'></form>
					<th>Person <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form226_header'></th>
					<th>Date <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form226_header'></th>
					<th>Start KMs </th>
					<th>End KMs</th>
					<th>Total Run (KMs)</th>
					<th><input type="button" value='Add new' class='add_icon' form='form226_header' onclick="form226_add_item();">
						<input type='button' form='form226_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form226_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form226_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form226_prev' class='prev_icon' data-index='-25' onclick="$('#form226_index').attr('data-index',$(this).attr('data-index')); form226_ini();">
		<div style='display:hidden;' id='form226_index' data-index='0'></div>
		<img src='./images/next.png' id='form226_next' class='next_icon' data-index='25' onclick="$('#form226_index').attr('data-index',$(this).attr('data-index')); form226_ini();">
	</div>
</div>