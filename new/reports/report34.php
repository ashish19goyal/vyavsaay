<div id='report34' class='tab-pane'>
	<form id='report34_header' autocomplete="off">
		<fieldset>
			<label>Start date</br><input type='text' required title='Period start date for determination of effective margin'></label>
			<label>End date</br><input type='text' required title='Period end date for determination of effective margin'></label>
			<label>Effective Margin</br><input type="text" id="report34_margin" readonly='readonly'></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	</br>
	<div style="min-height:365px;">
		<div><b>Legend</b><div id="report34_legend" style='display: block;'></div></div>
		<canvas id="report34_canvas" class='report_sizing'></canvas>
	</div>
</div>