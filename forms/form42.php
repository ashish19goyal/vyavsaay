<div id='form42' class='function_detail'><b>Manage Bills</b>
	<table>
		<thead>
			<tr>
				<form id='form42_header'></form>
					<th>Bill No. <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form42_header' onblur="form42_ini('');"></th>
					<th>Customer Name <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form42_header' onblur="form42_ini('');"></th>
					<th>Bill Date <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form42_header' onblur="form42_ini('');"></th>
					<th>Bill Amount</th>
					<th><input type="button" value='Create new bill' form='form42_header' onclick="form12_display(''); form12_new_form();"></th>
			</tr>
		</thead>
		<tbody id='form42_body'>
		</tbody>
	</table>
</div>