<div id='form161' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form161_header'></form>
					<th>Checkpoint <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form161_header'></th>
					<th>Desired Result </th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form161_header'></th>
					<th><input type="button" value='Add new' class='add_icon' form='form161_header' onclick="form161_add_item();">
						<input type='button' form='form161_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form161_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form161_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form161_prev' class='prev_icon' data-index='-25' onclick="$('#form161_index').attr('data-index',$(this).attr('data-index')); form161_ini();">
		<div style='display:hidden;' id='form161_index' data-index='0'></div>
		<img src='./images/next.png' id='form161_next' class='next_icon' data-index='25' onclick="$('#form161_index').attr('data-index',$(this).attr('data-index')); form161_ini();">
	</div>
</div>