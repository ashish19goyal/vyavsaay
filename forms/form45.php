<div id='form45' class='function_detail'><b>Manage Service Receipts</b>
	<table>
		<thead>
			<tr>
				<form id='form45_header'></form>
					<th>Receipt No. <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form45_header' onblur="form45_ini('');"></th>
					<th>Customer Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form45_header' onblur="form45_ini('');"></th>
					<th>Receipt Date <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form45_header' onblur="form45_ini('');"></th>
					<th>Total Amount</th>
					<th><input type="button" value='Add new Service Receipt' class='add_icon' form='form45_header' onclick="form10_display('');">
						<input type='button' form='form45_header' value='Export' class='export_icon'>
						<input type='button' form='form45_header' value='Export' class='import_icon'>
					</tr>
		</thead>
		<tbody id='form45_body'>
		</tbody>
	</table>
</div>