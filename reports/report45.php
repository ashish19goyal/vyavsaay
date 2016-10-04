<div id='report45' class='tab-pane'>
	<form id='report45_header' autocomplete="off">
		<fieldset>
			<label>Select Product</br><input type="text" form='report45_header'/></label>
			<label>Select Batch</br><input type="text" form='report45_header'/></label>
			<label>
				<input type="button" value='Locate' class='generic_icon' onclick="report45_ini();"/>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	</br>
	<div style='width:90%;height:90%'>
		<div><b>Legend</b><div id="report45_legend" style='display: block;'></div></div>
		<canvas id="report45_canvas" class='report_sizing'></canvas>
	</div>
	
	<script>

function report45_header_ini()
{	
	var filter_fields=document.getElementById('report45_header');
	var products_filter=filter_fields.elements[0];
	var batches_filter=filter_fields.elements[1];
	
	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	set_my_filter(product_data,products_filter);
	
	$(products_filter).off('blur');
	$(products_filter).on('blur',function(event)
	{
		var batches_data="<product_instances>" +
			"<batch></batch>" +
			"<product_name exact='yes'>"+products_filter.value+"</product_name>" +
			"</product_instances>";

		set_my_filter(batches_data,batches_filter);
	});
	
	var canvas = document.getElementById('report45_canvas');
	var ctx = canvas.getContext('2d');
	
	var blocks_data="<store_areas>" +
			"<name></name>" +
			"<area_type exact='yes'>block</area_type>" +
			"<height></height>" +
			"<width></width>" +
			"<len></len>" +
			"<locx></locx>" +
			"<locy></locy>" +
			"<locz></locz>" +
			"<storey></storey>" +
			"<color></color>" +
			"<radius></radius>" +
			"<loc_type></loc_type>" +
			"<faceEast></faceEast>" +
			"<faceWest></faceWest>" +
			"<faceNorth></faceNorth>" +
			"<faceSouth></faceSouth>" +	
			"</store_areas>";
	fetch_requested_data('',blocks_data,function(blocks)
	{	
	    draw_blocks(ctx,blocks);
	});
	
	var doors_data="<store_areas>" +
			"<name></name>" +
			"<area_type exact='yes'>door</area_type>" +
			"<height></height>" +
			"<width></width>" +
			"<len></len>" +
			"<locx></locx>" +
			"<locy></locy>" +
			"<locz></locz>" +
			"<storey></storey>" +
			"<color></color>" +
			"<radius></radius>" +
			"<loc_type></loc_type>" +
			"<faceEast></faceEast>" +
			"<faceWest></faceWest>" +
			"<faceNorth></faceNorth>" +
			"<faceSouth></faceSouth>" +	
			"</store_areas>";

	fetch_requested_data('',doors_data,function(doors)
	{	
		draw_doors(ctx,doors);		
	});
	
	var storages_data="<store_areas>" +
			"<name></name>" +
			"<area_type exact='yes'>storage</area_type>" +
			"<height></height>" +
			"<width></width>" +
			"<len></len>" +
			"<locx></locx>" +
			"<locy></locy>" +
			"<locz></locz>" +
			"<storey></storey>" +
			"<color></color>" +
			"<radius></radius>" +
			"<loc_type></loc_type>" +
			"<faceEast></faceEast>" +
			"<faceWest></faceWest>" +
			"<faceNorth></faceNorth>" +
			"<faceSouth></faceSouth>" +	
			"</store_areas>";
	fetch_requested_data('',storages_data,function(storages)
	{	
	    draw_storages(ctx,storages);
	});
	
};

function report45_ini()
{
	show_loader();
	
	var filter_fields=document.getElementById('report45_header');
	
	var fname=filter_fields.elements[0].value;
	var fbatch=filter_fields.elements[1].value;
	
	///optimize this query
	var utilization="<area_utilization>" +
			"<id></id>" +
			"<item_name>"+fname+"</item_name>" +
			"<name></name>" +
			"<batch>"+fbatch+"</batch>" +
			"</area_utilization>";

	fetch_requested_data('report45',utilization,function(results)
	{
		var canvas = document.getElementById('report45_canvas');
		var ctx = canvas.getContext('2d');

		var storage_area_string="--";
		for(var i in results)
		{
			storage_area_string+=results[i].name+"--";
		}
		
		var storages_data="<store_areas>" +
			"<name array='yes'>"+storage_area_string+"</name>" +
			"<area_type exact='yes'>storage</area_type>" +
			"<height></height>" +
			"<width></width>" +
			"<len></len>" +
			"<locx></locx>" +
			"<locy></locy>" +
			"<locz></locz>" +
			"<storey></storey>" +
			"</store_areas>";
		
		fetch_requested_data('report45',storages_data,function(area_results)
		{
			for(var j in area_results)
			{
				draw_star(ctx,area_results[j].locx,area_results[j].locy,5,"#00ff00");
			}
		});
		
		hide_loader();
	});
}
	
	</script>
</div>