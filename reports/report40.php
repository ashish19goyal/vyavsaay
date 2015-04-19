<div id='report40' class='report_detail'>
	<form id='report40_header'>
		<fieldset>
			<legend>Select filter</legend>
			<label>Number of days</br><input type='number' required title='Inventory is compared to sales over these many number of days'></label>
			<label>Select Product</br><input type='text' title='If no product is selected, only top 10 products are shown'></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
</br>
	<div style="min-height:365px;">
		<div><b>Legend</b><div id="report40_legend" style='display: block;'></div></div>
		<canvas id="report40_canvas" class='report_sizing'></canvas>
	</div>
</div>