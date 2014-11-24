<div id='form53' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form53_header'></form>
					<th>Bill Id <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form53_header' onblur="form53_ini();"></th>
					<th>Supplier <img src='../images/filter.jpeg' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form53_header' onblur="form53_ini();"></th>
					<th>Bill Date</th>
					<th>Total (in Rs.)</th>
					<th>Notes</th>
					<th><input type="button" titel='Enter new bill' form='form53_header' class='add_icon' onclick="element_display('','form21'); form21_new_form();">
						<input type='button' form='form53_header' value='Export' class='export_icon'>
					</th>
			</tr>
		</thead>
		<tbody id='form53_body'>
		</tbody>
	</table>
</div>