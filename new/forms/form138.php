<div id='form138' class='function_detail'>
	<form id='form138_master' autocomplete="off">
		<fieldset>
			<label>Project Name: <input type='text' required></label>
			<label>	<input type='hidden' name='project_id' form='form138_master'></label>
			<label>	<input type='button' onclick='form138_ini();' title='Display Gantt chart' class='generic_icon' value='Refresh'></label>
			<label>	<input type='button' title='Add Schedule' class='add_icon'>	</label>
		</fieldset>
	</form>
	<br><br>
	<div id='form138_gantt' style="height:400px;"></div>
</div>