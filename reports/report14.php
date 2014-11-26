<div id='report14' class='report_detail'>
	<form id='report14_header'>
		<fieldset>
			<legend>Select Filters</legend>
			Start date <input type='text'>
			End date <input type='text'>
			Select Account <input type='text'>
			<input type='button' value='Refresh' onclick='report14_ini();'>
		</fieldset>
	</form>
	</br>
	<div style='width:90%;height:90%'>
		<div><b>Legend</b><div id="report14_legend" style='display: block;'></div></div>
		<canvas id="report14_canvas" class='report_sizing'></canvas>
	</div>
</div>