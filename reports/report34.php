<div id='report34' class='report_detail'>
	<form id='report34_header'>
		<fieldset>
			<legend>Set parameters</legend>
			Start date <input type='text' required title='Period start date for determination of effective margin'>
			End date <input type='text' required title='Period end date for determination of effective margin'>
			Effective Margin: <input type="text" id="report34_margin" readonly='readonly'>
			<input type='submit' value='Refresh'>
			<input type='button' title='Print' class='print_icon'>
		</fieldset>
	</form>
	</br>
	<div style='width:90%;height:90%'>
		<div><b>Legend</b><div id="report34_legend" style='display: block;'></div></div>
		<canvas id="report34_canvas" class='report_sizing'></canvas>
	</div>
</div>