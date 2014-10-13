<div id='form9' class='function_detail'><b>Add and manage cash transaction</b>
	<table>
		<thead>
			<tr>
				<form id='form9_header'></form>
					<th>Transaction Type <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form9_header' onblur="form9_ini('');"></th>
					<th>Date of Transaction <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form9_header' onblur="form9_ini('');"></th>
					<th>From Account <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form9_header' onblur="form9_ini('');"></th>
					<th>To Account <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form9_header' onblur="form9_ini('');"></th>
					<th>Amount</th>
					<th>System Generated <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form9_header' onblur="form9_ini('');"></th>
					<th><input type='button' form='form9_header' value='Add entry' onclick='form9_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form9_body'>
		</tbody>
	</table>
</div>