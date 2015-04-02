<div id='form44' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form44_header'></form>
					<th>Pamphlet Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form44_header'></th>
					<th><input type="button" value='Add new Pamphlet' class='add_icon' form='form44_header' onclick="element_display('','form2');">
						<input type='button' form='form44_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form44_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form44_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form44_prev' class='prev_icon' data-index='-25' onclick="$('#form44_index').attr('data-index',$(this).attr('data-index')); form44_ini();">
		<div style='display:hidden;' id='form44_index' data-index='0'></div>
		<img src='./images/next.png' id='form44_next' class='next_icon' data-index='25' onclick="$('#form44_index').attr('data-index',$(this).attr('data-index')); form44_ini();">
	</div>
</div>