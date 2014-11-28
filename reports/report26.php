<div id='report26' class='report_detail'>
	<form id='report26_header'>
		<fieldset>
			<legend>Select Filters</legend>
			Start date <input type='text' required>
			End date <input type='text' required>
			Select Customer <input type='text' title='If this field is left blank, top 10 customers will be selected'>
			<input type='submit' value='Refresh'>
			<input type='button' title='Print' class='print_icon'>
		</fieldset>
	</form>
	</br>
	<div style='width:90%;height:90%'>
		<div><b>Legend</b><div id="report26_legend" style='display: block;'></div></div>
		<canvas id="report26_canvas" class='report_sizing'></canvas>
	</div>
</div>