<div id='form299' class='tab-pane portlet box green-jungle'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' id='form299_save' title='Save Newsletter'>Save <i class='fa fa-save'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form299_print' onclick=form299_print();><i class='fa fa-print'></i> Print</a>
      </div>
	</div>

	<div class="portlet-body">
		<form id='form299_form'>
			<div class='row'>			
				<div class='col-md-3 col-sm-3'><input type="hidden" required name='id'>
					<button type="button" class='btn btn-circle btn-icon-only green' name='add' title="Add Design Component" onclick='modal175_action();'><i class='fa fa-plus'></i></button>
					<button type="button" class='btn btn-circle btn-icon-only red' name='add_image' title="Add Image"><i class='fa fa-plus'></i></button>
				</div>
				<div class='col-md-9 col-sm-9'><input type="text" required name='name' class='floatlabel' placeholder="Subject of the Newsletter"></div>	
			</div>
		</form>

		<div class='row'>
			<div class='col-lg-3 clo-md-3 col-sm-3' style='line-height:30px;background-color:#eeeeee;padding:5px;'>
				<b>Design Blocks</b>
				<ul id="form299_navigation" style='list-style-type:none;margin:0;padding:0;min-height:150px;' class='list-group'>
				</ul>
				
				<b>Images</b>	
				<ul id="form299_images" style='list-style-type:none;margin:0;padding:0;min-height:150px;' class='list-group'>
				</ul>
				
				<b>Guidance</b>
				<ul id="form299_guidance" style='list-style-type:none;margin:0;padding:0;text-align:left;'>
					<li>1. Add design blocks using the green button at the top.</li>
					<li>2. Add images using the red button at the top.</li>
					<li>3. When adding design blocks, select image by specifying the image name as 'image:name'.</li>
					<li>4. Re-order blocks by dragging and dropping with mouse.</li>
					<li>5. Click cross icon against design block or image to delete them.</li>
					<li>6. Business logo will be included by default as the header of the mail.</li>
				</ul>
				
			</div>
		
			<div id="form299_section_parent" class='col-lg-9 col-md-9 col-sm-9' style='min-height:10in;padding:5px;border:1px solid #dddddd;'>
				<div id='form299_section'></div>
			</div>
		</div>
	</div>
	
	<script>
		function form299_header_ini()
		{
			$('#form299_navigation').html("");
			$('#form299_images').html("");
			$('#form299_section').html("");
			
			var master_form=document.getElementById('form299_form');
			master_form.elements['name'].value="";
			var id_filter=master_form.elements['id'];
			id_filter.value=get_new_key();
			var add_image_button=master_form.elements['add_image'];
			
			$(add_image_button).off('click');
			$(add_image_button).on('click',function () 
			{
				modal176_action(id_filter.value,'newsletter',function (pic_id,url,name) 
				{
					var image_elem="<li class='list-group-item bg-red bg-font-red' id='form299_image_"+pic_id+"' data-name='"+name+"' data-id='"+pic_id+"' data-url='"+url+"'>"+name+
										"<a style='float:right;' class='btn btn-circle btn-icon-only yellow-saffron' onclick=\"form299_delete_image('"+pic_id+"');\"><i class='fa fa-times'></i></a>"+
										"</li>";
					$('#form299_images').append(image_elem);
				});
			});
			
			var save_button=document.getElementById('form299_save');
			$(save_button).off('click');
			$(save_button).on('click',function (e) 
			{
				e.preventDefault();
				form299_create_item();
			});
			
			$("#form299_navigation").sortable
			({
				axis: "y",
				stop: function(event, ui) 
				{
					ui.item.effect('highlight');
				},
				update: function(event, ui) 
				{
					//console.log('sorted');
					var div_array=[];
					$('#form299_section').find('div').each(function (index) 
					{
						var div_elem=$(this);
						var div_id=$(this).attr('data-id');
						div_array[div_id]=$(this);
					});
		
					var new_div=document.createElement('div');			
					$('#form299_navigation').find('li').each(function (index) 
					{
						var div_id=$(this).attr('data-id');
						$(new_div).append(div_array[div_id]);				
					});
					
					$('#form299_section').remove();
					new_div.setAttribute('id','form299_section');
					$('#form299_section_parent').append(new_div);
				}
			});
			$('#form299').formcontrol();
			$("#form299_navigation").disableSelection();
		};
		
		function form299_ini()
		{
			var fid=$("#form299_link").attr('data_id');
			if(fid==null)
				fid="";
			
			if(fid!="")
			{
				show_loader();
		
				var new_columns=new Object();
				new_columns.count=1;
				new_columns.data_store='newsletter';
				
				new_columns.indexes=[{index:'id',value:fid},
									{index:'name'},
									{index:'html_content'},
									{index:'components'}];
			
				read_json_rows('form299',new_columns,function(newsletters)
				{
					if(newsletters.length>0)
					{
						var master_form=document.getElementById('form299_form');
						master_form.elements['name'].value=newsletters[0].name;
						master_form.elements['id'].value=newsletters[0].id;
		
						var save_button=document.getElementById('form299_save');
						$(save_button).off('click');
						$(save_button).on('click',function (e) 
						{
							e.preventDefault();
							form299_update_item();
						});

						//console.log(revert_htmlentities(newsletters[0].html_content));
						var updated_content=revert_htmlentities(newsletters[0].html_content);
						$('#form299_section').html(updated_content);
		
						var components_array=JSON.parse(newsletters[0].components);
						components_array.forEach(function (component) 
						{
							var component_elem="<li class='list-group-item bg-green bg-font-green' id='form299_nc_"+component.id+"' data-name='"+component.name+"' data-id='"+component.id+"' data-tid='"+component.tid+"'>"+component.name+
															"<a style='float:right;' class='btn btn-circle btn-icon-only yellow-saffron' onclick=\"form299_delete_item('"+component.id+"');\"><i class='fa fa-times'></i></a>"+
															"<a style='float:right;' class='btn btn-circle btn-icon-only red' id='form299_nc_edit_"+component.id+"'><i class='fa fa-pencil'></i></a>"+
														"</li>";
							$('#form299_navigation').append(component_elem);
							$('#form299_nc_'+component.id).attr('data-attr',component.attr);
							$('#form299_nc_edit_'+component.id).on('click',function () 
							{
								modal179_action(component.name,component.id,component.attr,component.tid);
							});
						});
					}
					hide_loader();
				});	
				
				var img_columns=new Object();
				img_columns.data_store='documents';
				
				img_columns.indexes=[{index:'id'},
									{index:'doc_type',exact:'newsletter'},
									{index:'target_id',exact:fid},
									{index:'url'},
									{index:'doc_name'}];
		
				read_json_rows('form299',img_columns,function(images)
				{
					images.forEach(function (image) 
					{
						var image_elem="<li class='list-group-item bg-red bg-font-red' id='form299_image_"+image.id+"' data-name='"+image.doc_name+"' data-id='"+image.id+"' data-url='"+image.url+"'>"+image.doc_name+
											"<a style='float:right;' class='btn btn-circle btn-icon-only yellow-saffron' onclick=form299_delete_image('"+image.id+"');><i class='fa fa-times'></i></a>"+
											"</li>";
						$('#form299_images').append(image_elem);
					});
				});	
			}
		};
		
		function form299_create_item()
		{
			if(is_create_access('form299'))
			{
				show_loader();
				var form=document.getElementById("form299_form");
				
				var data_id=form.elements['id'].value;
				var name=form.elements['name'].value;
				
				$('#form299_section').find("img").each(function(index)
				{
					var image_elem=$(this)[0];
					resize_picture(image_elem,image_elem.width);			
				});
		
				var components_array=[];	
				$("#form299_navigation").find('li').each(function()
				{
					var c=new Object();
					c.name=$(this).attr('data-name');
					c.id=$(this).attr('data-id');
					c.attr=$(this).attr('data-attr');
					c.tid=$(this).attr('data-tid');
					components_array.push(c);
				});
				var components=JSON.stringify(components_array);		
				
				var html_content=document.getElementById('form299_section').innerHTML;
				var last_updated=get_my_time();
				var data_json={data_store:'newsletter',
			 				data:[{index:'id',value:data_id},
			 					{index:'name',value:name},
			 					{index:'html_content',value:html_content},
			 					{index:'components',value:components},
			 					{index:'status',value:'active'},
			 					{index:'last_updated',value:last_updated}],
			 				log:'yes',
			 				log_data:{title:'Created',notes:'Newsletter '+name,link_to:'form44'}};			 				
								
				create_json(data_json);
				
				$(form).off('submit');
				$(form).on('submit',function(event)
				{
					event.preventDefault();
					form299_update_item();
				});		
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form299_update_item()
		{
			if(is_update_access('form299'))
			{
				show_loader();
				var form=document.getElementById("form299_form");
				
				var data_id=form.elements['id'].value;
				var name=form.elements['name'].value;
				
				$('#form299_section').find("img").each(function(index)
				{
					var image_elem=$(this)[0];
					resize_picture(image_elem,image_elem.width);			
				});
		
				var components_array=[];	
				$("#form299_navigation").find('li').each(function()
				{
					var c=new Object();
					c.name=$(this).attr('data-name');
					c.id=$(this).attr('data-id');
					c.attr=$(this).attr('data-attr');
					c.tid=$(this).attr('data-tid');
					components_array.push(c);
				});
				var components=JSON.stringify(components_array);		
				
				var html_content=document.getElementById('form299_section').innerHTML;
				var last_updated=get_my_time();
				var data_json={data_store:'newsletter',
			 				data:[{index:'id',value:data_id},
			 					{index:'name',value:name},
			 					{index:'html_content',value:html_content},
			 					{index:'components',value:components},
			 					{index:'last_updated',value:last_updated}],
			 				log:'yes',
			 				log_data:{title:'Updated',notes:'Newsletter '+name,link_to:'form44'}};			 				
				update_json(data_json);
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form299_delete_item(id)
		{
			if(is_delete_access('form299'))
			{
				modal115_action(function()
				{
					$('#form299_nc_'+id).remove();
					$('#form299_sc_'+id).remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form299_delete_image(id)
		{
			if(is_delete_access('form299'))
			{
				modal115_action(function()
				{
					var image_json={data_store:'documents',
			 				data:[{index:'id',value:id}]};			 				
				
					delete_json(image_json);			
					$('#form299_image_'+id).remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form299_print()
		{
			var container=document.getElementById('form299_section');
			$.print(container);
		}

	</script>
</div>