<div id='form5' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form5_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form5_header' onblur="form5_ini('');"></th>
					<th>Type <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form5_header' onblur="form5_ini('');"></th>
					<th>Details</th>
					<th><input type='button' form='form5_header' value='Add item' class='add_icon' onclick='modal10_action();'>
						<input type='button' form='form5_header' value='EXPORT' class='export_icon'>
						<input type='button' form='form5_header' value='IMPORT' class='import_icon'>
					</th>
					
			</tr>
		</thead>
		<tbody id='form5_body'>
		</tbody>
	</table>
</div>