<div id='report40' class='report_detail'>
	<form id='report40_header'>
		<fieldset>
			<legend>Select filter</legend>
			Number of days <input type='number' required title='Inventory is compared to sales over these many number of days'>
			Select Product <input type='text' title='If no product is selected, only top 10 products are shown'>
			<input type='submit' value='Refresh'>
		</fieldset>
	</form>
</br>
	<div style='width:90%;height:90%'>
		<div><b>Legend</b><div id="report40_legend" style='display: block;'></div></div>
		<canvas id="report40_canvas" class='report_sizing'></canvas>
	</div>
</div>