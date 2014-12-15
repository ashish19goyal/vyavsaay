<div id='report26' class='report_detail'>
	<form id='report26_header'>
		<fieldset>
			<legend>Select Filters</legend>
			<label>Start date</br><input type='text' required></label>
			<label>End date</br><input type='text' required></label>
			<label>Select Customer</br><input type='text' title='If this field is left blank, top 10 customers will be selected'></label>
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