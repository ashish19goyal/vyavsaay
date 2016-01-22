<div id='form171' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form171_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form171_header'></th>
					<th>Details</th>
					<th>Dead Weight Factor</th>
					<th><input type='button' form='form171_header' title='Add new channel' class='add_icon' onclick='form171_add_item();'>
						<input type='button' form='form171_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form171_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form171_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form171_prev' class='prev_icon' data-index='-25' onclick="$('#form171_index').attr('data-index',$(this).attr('data-index')); form171_ini();">
		<div style='display:hidden;' id='form171_index' data-index='0'></div>
		<img src='./images/next.png' id='form171_next' class='next_icon' data-index='25' onclick="$('#form171_index').attr('data-index',$(this).attr('data-index')); form171_ini();">
	</div>
</div>