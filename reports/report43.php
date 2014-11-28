<div id='report43' class='report_detail'>
	<form id='report43_header' style='text-align:left;'>
		<fieldset>
			<legend>Select Filters</legend>
			<div style='display:block;float:left;margin:5px;'>
			Customer <input type='text' title='If this field is left blank, top 10 customers will be shown'>
			</div>
			<div style='display:block;float:left;margin:5px;'>
			<b>Period 1</b>:</br>
			Start Date <input type='text' required></br>
			End Date <input type='text' required>
			</div>
			<div style='display: block;float:left;margin:5px;'>
			<b>Period 2</b>:</br>
			Start Date <input type='text' required></br>
			End Date <input type='text' required>
			</div>
			<div style='display:block;float:left;margin:5px;'>
			<input type='submit' value='Refresh'>
			<input type='button' title='Print' class='print_icon'>
			</div>
		</fieldset>
	</form>
</br>
	<div style='width:90%;height:90%'>
		<div><b>Legend</b><div id="report43_legend" style='display: block;'></div></div>
		<canvas id="report43_canvas" class='report_sizing'></canvas>
	</div>
</div>
