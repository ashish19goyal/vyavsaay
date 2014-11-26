<div id='report30' class='report_detail'>
	<form id='report30_header'>
		<fieldset>
			<legend>Select Period</legend>
			Start date <input type='text'>
			End date <input type='text'>
			<input type='button' value='Refresh' onclick='report30_ini();'>
		</fieldset>
	</form>
	</br>
	<div style='width:90%;height:90%'>
		<div><b>Legend</b><div id="report30_legend" style='display: block;'></div></div>
		<canvas id="report30_canvas" class='report_sizing'></canvas>
	</div>
</div>