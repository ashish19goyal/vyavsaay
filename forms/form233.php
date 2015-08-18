<div id='form233' class='function_detail'>

	<form id='form233_form'>
		Name: <input type="text" required name='name' title="Name of the Newsletter">
		Description: <textarea name='description' title="Description of the Newsletter"></textarea>
		<input type="hidden" required name='id'>
		<input type="submit" class='save_icon' name='save' title="Save Newsletter">
		<input type="button" class='print_icon' name='print' title="Print Newsletter" onclick='form233_print();'>
	</form>

	<div class='print_navigation'>
		<div>	
			<button type="button" onclick="text_button_handler(document.getElementById('form233_section'));" title="Add a textbox">Text</button>
			<button id="form233_image_button" type="button" title="Add an image">Pictures</button>
			<input id="form233_image_input" type="file">
			<button type="button" onclick="delete_sel_elem_4m_canvas();" title="Delete selected element">Delete</button>
			<button type="button" onclick="header_button_handler();">Header</button>
			<button type="button" onclick="footer_button_hanlder();">Footer</button>
		</div>
		<div id="form233_navigation">
		</div>
	</div>
	<div id="form233_section" class='print_section'>
	</div>
</div>