<div id='report26' class='tab-pane'>
	<form id='report26_header' autocomplete="off">
		<fieldset>
			<label>Start date</br><input type='text' required></label>
			<label>End date</br><input type='text' required></label>
			<label>Select Customer</br><input type='text' title='If this field is left blank, top 10 customers will be selected'></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	</br>
	<div style="min-height:365px;">
		<div><b>Legend</b><div id="report26_legend" style='display: block;'></div></div>
		<canvas id="report26_canvas" class='report_sizing'></canvas>
	</div>
</div>