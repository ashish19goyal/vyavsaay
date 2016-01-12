<div id='form302' class='function_detail'>
	<script id='form302_script_tag'></script>	
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form302_header'></form>
					<th>Source <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form302_header'></th>
					<th>Format </th>
					<th>Conversion Function </th>
					<th>Pending Records </th>
					<th><input type='button' form='form302_header' name='add' title='Add new source' class='add_icon' onclick='form302_add_item();'>
						<input type='button' form='form302_header' name='export' value='EXPORT' class='export_icon'>
						<input type='submit' form='form302_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form302_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form302_prev' class='prev_icon' data-index='-25' onclick="$('#form302_index').attr('data-index',$(this).attr('data-index')); form302_ini();">
		<div style='display:hidden;' id='form302_index' data-index='0'></div>
		<img src='./images/next.png' id='form302_next' class='next_icon' data-index='25' onclick="$('#form302_index').attr('data-index',$(this).attr('data-index')); form302_ini();">
	</div>
</div>