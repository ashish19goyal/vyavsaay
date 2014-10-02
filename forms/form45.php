<div class='forms'><b>Manage Service Receipts</b>
	<table>
		<thead>
			<tr>
				<form id='form45_header'></form>
					<th>Receipt No. <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form45_header' onblur="form45_ini('');"></th>
					<th>Customer Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form45_header' onblur="form45_ini('');"></th>
					<th>Receipt Date <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form45_header' onblur="form45_ini('');"></th>
					<th>Total Amount</th>
					<th><input type="button" value='Add new Service Receipt' form='form45_header' onclick="form10_display('');"></th>
			</tr>
		</thead>
		<tbody id='form45_body'>
		</tbody>
	</table>
</div>