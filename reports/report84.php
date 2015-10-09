<div id='report84' class='report_detail'>
	<form id='report84_header' autocomplete="off">
		<fieldset>
			<label>Start date<br><input type='text' required></label>
			<label>End date<br><input type='text' required></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
				<input type='button' title='Download CSV' class='csv_icon' name='csv'>			
			</label>	
		</fieldset>
	</form>
	<br>
	<div style="min-height:365px;">
		<div><b>Legend</b><div id="report84_legend" style='display: block;'></div></div>
		<canvas id="report84_canvas" class='report_sizing'></canvas>
	</div>
</div>