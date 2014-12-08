<div id='form90' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form90_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form90_header' onblur="form90_ini();"></th>
					<th>Notes</th>
					<th><input type='button' form='form90_header' title='Add new billing type' class='add_icon' onclick='form90_add_item();'>
						<input type='button' form='form90_header' value='EXPORT' class='export_icon'>
						<input type='button' form='form90_header' value='IMPORT' class='import_icon'>
					</th>
			</tr>
		</thead>
		<tbody id='form90_body'>
		</tbody>
	</table>
</div>