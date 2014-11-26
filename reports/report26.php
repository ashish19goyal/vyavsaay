<div id='report26' class='report_detail'>
	<form id='report26_header'>
		<fieldset>
			<legend>Select Filters</legend>
			Start date <input type='text'>
			End date <input type='text'>
			Select Customer <input type='text'>
			<input type='button' value='Refresh' onclick='report26_ini();'>
		</fieldset>
	</form>
	</br>
	<div style='width:90%;height:90%'>
		<div><b>Legend</b><div id="report26_legend" style='display: block;'></div></div>
		<canvas id="report26_canvas" class='report_sizing'></canvas>
	</div>
</div>