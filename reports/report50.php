<div id='report50' class='function_detail'>
	<form id='report50_header'>
		<fieldset>
			<legend>Select Filters</legend>
			<label>Make</br><input type='text' title='If this field is blank, all applicable makes will be shown'></label>
			<label>Product</br><input type='text' title='If this field is blank, all applicable products will be shown'></label>
			<label>Margin</br><input type='text' name='margin' readonly='readonly'></label>
			<div style="width: auto;margin:10px;" id="report50_slider"></div>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Product</th>
				<th>Highest Margin</th>
				<th>Lowest Margin</th>
			</tr>
		</thead>
		<tbody id='report50_body'>
		</tbody>
	</table>
</div>