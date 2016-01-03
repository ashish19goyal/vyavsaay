<div id='form299' class='function_detail'>

	<form id='form299_form'>
		Name: <input type="text" required name='name' title="Name of the Newsletter">
		<input type="hidden" required name='id'>
		<input type="button" class='add_icon' name='add' title="Add Design Component" onclick='modal175_action();'>
		<input type="button" class='add_red_icon' name='add_image' title="Add Image">
		<input type="submit" class='save_icon' name='save' title="Save Newsletter">
		<input type="button" class='print_icon' name='print' title="Print Newsletter" onclick='form299_print();'>
	</form>

	<div class='print_navigation'>
		<b>Design Blocks</b>		
		<ul id="form299_navigation" style='list-style-type:none;margin:0;padding:0;min-height:150px;' class='sortable'>
		</ul>
		
		<b>Images</b>	
		<ul id="form299_images" style='list-style-type:none;margin:0;padding:0;min-height:150px;'>
		</ul>
		
		<b>Guidance</b>
		<ul id="form299_guidance" style='list-style-type:none;margin:0;padding:0;text-align:left;'>
			<li>1. Add design blocks using the green button at the top.</li>
			<li>2. Add images using the red button at the top.</li>
			<li>3. When adding design blocks, select image by specifying the image name as 'image:name'.</li>
			<li>4. Re-order blocks by dragging and dropping with mouse.</li>
			<li>5. Click cross icon against design block or image to delete them.</li>
		</ul>
		
	</div>
	
	<div id="form299_section" class='print_section'>
	</div>

</div>