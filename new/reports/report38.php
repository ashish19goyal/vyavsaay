<div id='report38' class='tab-pane'>
	<form id='report38_header' autocomplete="off">
		<fieldset>
			<label>Start date</br><input type='text' required></label>
			<label>End date</br><input type='text' required></label>
			<label>Select Product</br><input type='text' title='If this field is left blank, top 10 products will be selected'></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	</br>
	<div style="min-height:365px;">
		<div><b>Legend</b><div id="report38_legend" style='display: block;'></div></div>
		<canvas id="report38_canvas" class='report_sizing'></canvas>
	</div>
</div>