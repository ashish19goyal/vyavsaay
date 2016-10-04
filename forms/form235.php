<div id='form235' class='tab-pane'>
	<form id='form235_header' autocomplete="off">
		<fieldset>
			<label>Name<br><input type='text'></label>
			<label>Make<br><input type='text'></label>
			<label><input type='button' form='form235_header' title='Add new product' class='add_icon'></label>
			<label><input type='button' form='form235_header' value='EXPORT' class='export_icon'></label>
			<input type='submit' class='submit_hidden'>	
		</fieldset>
	</form>
	
	<div class='form_grid'>
		<ul id='form235_grid'></ul>
	</div>	

	<div class='form_nav'>
		<img src='./images/previous.png' id='form235_prev' class='prev_icon' data-index='-25' onclick="$('#form235_index').attr('data-index',$(this).attr('data-index')); form235_ini();">
		<div style='display:hidden;' id='form235_index' data-index='0'></div>
		<img src='./images/next.png' id='form235_next' class='next_icon' data-index='25' onclick="$('#form235_index').attr('data-index',$(this).attr('data-index')); form235_ini();">
	</div>
</div>