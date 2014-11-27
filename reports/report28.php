<div id='report28' class='report_detail'>
	<form id='report28_header'>
		<fieldset>
			<legend>Select filter</legend>
			Number of days <input type='number' required title='Inventory is compared to sales over these many number of days'>
			Select Product <input type='text' title='If no product is selected, only top 10 products are shown'>
			<input type='submit' value='Refresh'>
		</fieldset>
	</form>
	</br>
	<div style='width:90%;height:90%'>
		<div><b>Legend</b><div id="report28_legend" style='display: block;'></div></div>
		<canvas id="report28_canvas" class='report_sizing'></canvas>
	</div>
</div>