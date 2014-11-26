<div id='report4' class='report_detail'>
	<form id='report4_header'>
		<fieldset>
			<legend>Select Period</legend>
			<label>Start date <input type='text'></label>
			<label>End date <input type='text'></label>
			<input type='button' value='Refresh' onclick='report4_ini();'>
		</fieldset>
	</form>
	</br>
	<div style='width:90%;height:90%'>
		<div><b>Legend</b><div id="report4_legend" style='display: block;'></div></div>
		<canvas id="report4_canvas" class='report_sizing'></canvas>
	</div>
</div>