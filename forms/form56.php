<div class='forms'><b>Expense Register</b>
	<table>
		<thead>
			<tr>
				<form id='form56_header'></form>
					<th>Expense Date <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form56_header' onblur="form56_ini('');"></th>
					<th>Account <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form56_header' onblur="form56_ini('');"></th>
					<th>Description </th>
					<th>Amount </th>
					<th><input type="button" value='Enter new bill' form='form56_header' onclick="form56_add_item();"></th>
			</tr>
		</thead>
		<tbody id='form56_body'>
		</tbody>
	</table>
</div>