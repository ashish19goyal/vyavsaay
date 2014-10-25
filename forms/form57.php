<div id='form57' class='function_detail'><b>Manage Services</b>
	<table>
		<thead>
			<tr>
				<form id='form57_header'></form>
					<th>Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form57_header' onblur="form57_ini('');"></th>
					<th>Description </th>
					<th>Price</th>
					<th>Duration</th>
					<th>Tax (in %)</th>
					<th><input type="button" value='Add new service' form='form57_header' class='add_icon' onclick="modal20_action();">
						<input type='button' form='form57_header' value='Export' class='export_icon'>
						<input type='button' form='form57_header' value='Import' class='import_icon'>
					</th>
			</tr>
		</thead>
		<tbody id='form57_body'>
		</tbody>
	</table>
</div>