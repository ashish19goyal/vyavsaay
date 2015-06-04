<div id='form94' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form94_header'></form>
					<th>Item <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form94_header'></th>
					<th>Batch <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form94_header'></th>
					<th>Quantity</th>
					<th>Storage</th>
					<th>Source</th>
					<th><input type='button' form='form94_header' title='Discard another item' class='add_icon' onclick="modal40_action('','');">
						<input type='button' form='form94_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form94_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form94_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form94_prev' class='prev_icon' data-index='-25' onclick="$('#form94_index').attr('data-index',$(this).attr('data-index')); form94_ini();">
		<div style='display:hidden;' id='form94_index' data-index='0'></div>
		<img src='./images/next.png' id='form94_next' class='next_icon' data-index='25' onclick="$('#form94_index').attr('data-index',$(this).attr('data-index')); form94_ini();">
	</div>
</div>