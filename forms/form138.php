<div id='form138' class='function_detail'>
	<form id='form138_master'>
		<fieldset>
			<label>Project Name: <input type='text' required></label>
			<input type='hidden' name='project_id' form='form138_master'>
			<input type='button' onclick='form138_ini();' title='Display Gantt chart' class='generic_icon' value='Refresh'>
			<input type='button' title='Add Schedule' class='add_icon'>
		</fieldset>
	</form>
	<br><br>
	<div id='form138_gantt' style="height:400px;"></div>
</div>