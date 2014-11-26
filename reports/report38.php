<div id='report38' class='report_detail'>
	<form id='report38_header' style="width: 35%;float:left">
		<fieldset>
			<legend>Select Filters</legend>
			Start date <input type='text'>
			End date <input type='text'>
			Select Product <input type='text'>
			<input type='button' value='Refresh' onclick='report38_ini();'>
		</fieldset>
	</form>
	</br>
	<div style='width:90%;height:90%'>
		<div><b>Legend</b><div id="report38_legend" style='display: block;'></div></div>
		<canvas id="report38_canvas" class='report_sizing'></canvas>
	</div>
</div>