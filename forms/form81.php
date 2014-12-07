<div id='form81' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form81_header'></form>
					<th>Customer <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form81_header' onblur="form81_ini();"></th>
					<th>Details </th>
					<th>Due Date</th>
					<th>Identified By </th>
					<th><input type='button' form='form81_header' title='Add new' class='add_icon' onclick='form81_add_item();'>
						<input type='button' form='form81_header' value='EXPORT' class='export_icon'>
						<input type='button' form='form81_header' value='IMPORT' class='import_icon'>
					</th>
			</tr>
		</thead>
		<tbody id='form81_body'>
		</tbody>
	</table>
</div>