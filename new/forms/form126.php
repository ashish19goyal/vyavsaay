<div id='form126' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form126_header'></form>
					<th>Issue Id <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form126_header'></th>
					<th>Short Description <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form126_header'></th>
					<th>Detail</th>
					<th>Solutions</th>
					<th><input type="button" value='Add new issue' class='add_icon' form='form126_header' onclick="modal49_action();">
						<input type='button' form='form126_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form126_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form126_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form126_prev' class='prev_icon' data-index='-25' onclick="$('#form126_index').attr('data-index',$(this).attr('data-index')); form126_ini();">
		<div style='display:hidden;' id='form126_index' data-index='0'></div>
		<img src='./images/next.png' id='form126_next' class='next_icon' data-index='25' onclick="$('#form126_index').attr('data-index',$(this).attr('data-index')); form126_ini();">
	</div>
</div>