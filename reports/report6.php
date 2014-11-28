<div id='report6' class='report_detail'>
	<form id='report6_header'>
		<fieldset>
			<legend>Select Filters</legend>
			Due date <input type='text' required>
			Customer <input type='text' title='If this field is left blank, top 10 customers will be shown'>
			<input type='submit' value='Refresh'>
			<input type='button' title='Print' class='print_icon'>
		</fieldset>
	</form>
	</br>
	<div style='width:90%;height:90%'>
		<div><b>Legend</b><div id="report6_legend" style='display: block;'></div></div>
		<canvas id="report6_canvas" class='report_sizing'></canvas>
	</div>
</div>