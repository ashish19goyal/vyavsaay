<div id='report45' class='report_detail'>
	<form id='report45_header'>
		<fieldset>
		<legend>Select filter</legend>
			<label>Select Product</br><input type="text" form='report45_header'/></label>
			<label>Select Batch</br><input type="text" form='report45_header'/></label>
			<label>
				<input type="button" value='Locate' class='generic_icon' onclick="report45_ini();"/>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	</br>
	<div style='width:90%;height:90%'>
		<div><b>Legend</b><div id="report45_legend" style='display: block;'></div></div>
		<canvas id="report45_canvas" class='report_sizing'></canvas>
	</div>
</div>