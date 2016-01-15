<div id='report6' class='report_detail'>
	<form id='report6_header' autocomplete="off">
		<fieldset>
			<label>Due date</br><input type='text' required></label>
			<label>Customer</br><input type='text' title='If this field is left blank, top 10 customers will be shown'></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	</br>
	<div style="min-height:365px;">
		<div><b>Legend</b><div id="report6_legend" style='display: block;'></div></div>
		<canvas id="report6_canvas" class='report_sizing'></canvas>
	</div>
</div>