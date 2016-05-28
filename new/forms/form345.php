<div id='form345' class='tab-pane portlet box green-jungle'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' id='form345_save' title='Save Newsletter'>Save <i class='fa fa-save'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form345_print' onclick=form345_print();><i class='fa fa-print'></i> Print</a>
      </div>
	</div>

	<div class="portlet-body">
		<form id='form345_form' style='padding:5px;'>
			<div class='row'>
				<div class='col-sm-12'>
					<input type="hidden" required name='id'>
					<input type="text" required name='name' class='floatlabel' placeholder="Subject of the Newsletter">
				</div>
			</div>
		</form>

		<div class='row'>
			<div class='col-sm-2' style='padding: 0 0;'>

				<div class='portlet light bordered' style='padding:0;'>
					<div class="portlet-title" style='padding:5px;'>Components</div>
          <div class="portlet-body">
            <div class='panel-group accordion'>
              <div class='panel panel-default'>
                <div class='panel-heading'>
                  <h4 class='panel-title'>
                    <a class='accordion-toggle accordion-toggle-styled' data-toggle='collapse' data-parent='#form345_accordion_guidance' href='#form345_accordion_guidance'> Guidance </a>
                  </h4>
                </div>
                <div id='form345_accordion_guidance' class='panel-collapse in'>
                  <div class='panel-body'>
										<ul style='margin:0;padding:0;text-align:left;'>
											<li>Pick design blocks from the list below and drop on the layout.</li>
											<li>Name the block and update attributes.</li>
											<li>Select image by specifying the image name as 'image:name'.</li>
											<li>Re-order blocks by dragging and dropping with mouse.</li>
											<li>Click cross icon against design block or image to delete them.</li>
											<li>Business logo will be included by default as the header of the mail.</li>
										</ul>
									</div>
                </div>
              </div>

							<div class='panel panel-default'>
                <div class='panel-heading'>
                  <h4 class='panel-title'>
                    <a class='accordion-toggle accordion-toggle-styled' data-toggle='collapse' data-parent='#form345_accordion_components' href='#form345_accordion_components'>Components List</a>
                  </h4>
                </div>
                <div id='form345_accordion_components' class='panel-collapse collapse in'>
                  <div class='panel-body'>
										<ul id="form345_components_list" style='list-style-type:none;margin:0;padding:0;min-height:150px;' class='list-group'>
										</ul>
									</div>
                </div>
              </div>

              <div class='panel panel-default'>
                <div class='panel-heading'>
                  <h4 class='panel-title'>
                    <a class='accordion-toggle accordion-toggle-styled' data-toggle='collapse' data-parent='#form345_accordion_selected' href='#form345_accordion_selected'>Added Components</a>
                  </h4>
                </div>
                <div id='form345_accordion_selected' class='panel-collapse in'>
                  <div class='panel-body'>
										<ul id="form345_navigation" style='list-style-type:none;margin:0;padding:0;min-height:150px;' class='list-group'>
										</ul>
									</div>
                </div>
              </div>

              <div class='panel panel-default'>
                <div class='panel-heading'>
                  <h4 class='panel-title'>
                    <div class='row'>
											<div class='col-sm-10'>
												<a class='accordion-toggle accordion-toggle-styled' data-toggle='collapse' data-parent='#form345_accordion_images' href='#form345_accordion_images'>Images</a>
											</div>
											<div class='col-sm-2'>
												<i class='fa fa-plus pull-right link' title='Click to add image' style='padding:15px;' id='form345_add_image'></i>
											</div>
										</div>
                  </h4>
                </div>
                <div id='form345_accordion_images' class='panel-collapse in'>
                  <div class='panel-body'>
										<ul id="form345_images" style='list-style-type:none;margin:0;padding:0;min-height:150px;' class='list-group'>
										</ul>
									</div>
                </div>
              </div>

            </div>
          </div>
        </div>

			</div>

			<div class='col-sm-8' style='padding: 0 0;'>
				<div class='portlet light bordered' style='padding:0;'>
					<div class="portlet-title" style='padding:5px;'>Layout</div>
					<div class="portlet-body" id="form345_section_parent" style='min-height:10in;'>
						<div id='form345_section'></div>
					</div>
				</div>
			</div>

			<div class='col-sm-2' style='padding: 0 0;' style='padding: 0 0;'>
        <div class='portlet light bordered' style='padding:0;'>
          <div class="portlet-title" style='padding:5px;'>Attributes</div>
      	  <div class="portlet-body" style='min-height:10in;'>
						<input type='text' placeholder='Component Name' id='form345_attribute_component_name' class='floatlabel' style='padding:2px;'>
						<form id='form345_attributes_form' style='padding:2px;'></form>
          </div>
        </div>
      </div>

		</div>
	</div>

	<script>
		function form345_header_ini()
		{
			$('#form345_navigation').html("");
			$('#form345_images').html("");
			$('#form345_section').html("");

			var master_form=document.getElementById('form345_form');
			master_form.elements['name'].value="";
			var id_filter=master_form.elements['id'];
			id_filter.value=get_new_key();
			var add_image_button=document.getElementById('form345_add_image');

			$(add_image_button).off('click');
			$(add_image_button).on('click',function ()
			{
				modal176_action(id_filter.value,'newsletter',function (pic_id,url,name)
				{
					var image_elem="<li class='list-group-item bg-red bg-font-red link' id='form345_image_"+pic_id+"' data-name='"+name+"' data-id='"+pic_id+"' data-url='"+url+"'>"+name+
										"<i class='fa fa-times' onclick=\"form345_delete_image('"+pic_id+"');\"></i>"+
										"</li>";
					$('#form345_images').append(image_elem);
				});
			});

			var save_button=document.getElementById('form345_save');
			$(save_button).off('click');
			$(save_button).on('click',function (e)
			{
				e.preventDefault();
				form345_create_item();
			});

			$("#form345_navigation").sortable
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
					$('#form345_section').find('div').each(function (index)
					{
						var div_elem=$(this);
						var div_id=$(this).attr('data-id');
						div_array[div_id]=$(this);
					});

					var new_div=document.createElement('div');
					$('#form345_navigation').find('li').each(function (index)
					{
						var div_id=$(this).attr('data-id');
						$(new_div).append(div_array[div_id]);
					});

					$('#form345_section').remove();
					new_div.setAttribute('id','form345_section');
					$('#form345_section_parent').append(new_div);
				}
			});

			///Creating list of components for selection
			var tname_data={data_store:'newsletter_components',
											indexes:[{index:'id'},{index:'name'},
															{index:'detail'},
															{index:'markers'},
															{index:'html_code'}]};
			read_json_rows('form345',tname_data,function(templates)
			{
				templates.forEach(function(template)
				{
					var component_elem="<li class='list-group-item bg-yellow bg-font-yellow link' id='form345_cl_"+template.id+"' data-name='"+template.name+"' data-id='"+template.id+"' title='"+template.detail+"'>"+template.name+"</li>";
					$('#form345_components_list').append(component_elem);
					$('#form345_cl_'+template.id).on('click',function()
					{
						form345_component_list_attributes(template.markers);
					});
					$('#form345_cl_'+template.id).attr('data-markers',template.markers);
					$('#form345_cl_'+template.id).attr('data-htmlcode',template.html_code);

					$('#form345_cl_'+template.id).draggable(
					{
						zIndex:1000,
						helper:"clone"
					});
				});
			});

			$('#form345_section_parent').droppable(
			{
				drop: function(event,ui)
				{
					var d=ui.helper[0].dataset;
					form345_new_component_attributes(d.id,d.markers,d.htmlcode);
				}
			});

			var paginator=$('#form345').paginator({visible:false,container:$('#form345')});
			$('#form345').formcontrol();
			$("#form345_navigation").disableSelection();
		};

		function form345_ini()
		{
			var fid=$("#form345_link").attr('data_id');
			if(fid==null)
				fid="";

			if(fid!="")
			{
				show_loader();

				var new_columns={count:1,
												data_store:'newsletter',
												indexes:[{index:'id',value:fid},
																{index:'name'},
																{index:'html_content'},
																{index:'components'}]};

				read_json_rows('form345',new_columns,function(newsletters)
				{
					if(newsletters.length>0)
					{
						var master_form=document.getElementById('form345_form');
						master_form.elements['name'].value=newsletters[0].name;
						master_form.elements['id'].value=newsletters[0].id;

						var save_button=document.getElementById('form345_save');
						$(save_button).off('click');
						$(save_button).on('click',function (e)
						{
							e.preventDefault();
							form345_update_item();
						});

						//console.log(revert_htmlentities(newsletters[0].html_content));
						var updated_content=revert_htmlentities(newsletters[0].html_content);
						$('#form345_section').html(updated_content);

						var components_array=JSON.parse(newsletters[0].components);
						components_array.forEach(function (component)
						{
							var component_elem="<li class='list-group-item bg-green bg-font-green link' id='form345_nc_"+component.id+"' data-name='"+component.name+"' data-id='"+component.id+"' data-tid='"+component.tid+"'>"+component.name+
																		"<i class='fa fa-times pull-right' onclick=\"form345_delete_item('"+component.id+"');\"></i>"+
																"</li>";
							$('#form345_navigation').append(component_elem);
							$('#form345_nc_'+component.id).attr('data-attr',component.attr);
							$('#form345_nc_'+component.id).on('click',function ()
							{
								form345_components_attributes(component.id,component.name,component.tid,component.attr);
							});
						});
					}
					hide_loader();
				});

				var img_columns={data_store:'documents',
												indexes:[{index:'id'},
																{index:'doc_type',exact:'newsletter'},
																{index:'target_id',exact:fid},
																{index:'url'},
																{index:'doc_name'}]};

				read_json_rows('form345',img_columns,function(images)
				{
					images.forEach(function (image)
					{
						var image_elem="<li class='list-group-item bg-red bg-font-red link' id='form345_image_"+image.id+"' data-name='"+image.doc_name+"' data-id='"+image.id+"' data-url='"+image.url+"'>"+image.doc_name+
											"<i class='fa fa-times pull-right' onclick=form345_delete_image('"+image.id+"');></i>"+
											"</li>";
						$('#form345_images').append(image_elem);
					});
				});
			}
		};

		function form345_component_list_attributes(markers)
		{
				var markers_array=vUtil.jsonParse(markers);

				var markers_string="";
				markers_array.forEach(function(marker)
				{
					markers_string+="<textarea placeholder='"+marker+"' readonly='readonly'></textarea>";
				});

				$('#form345_attributes_form').html(markers_string);
				$('#form345_attribute_component_name').val('Untitled');
				$('#form345').formcontrol();
		}

		function form345_components_attributes(id,name,tid,attr)
		{
				attr=attr.replace(/\'/g,"\"");
				var attr_array=vUtil.jsonParse(attr);
				var markers_label=document.getElementById('form345_attributes_form');

				var name_filter=document.getElementById('form345_attribute_component_name');
				name_filter.value=name;

				markers_label.innerHTML="";

				var markers_data={count:1,data_store:'newsletter_components',
												indexes:[{index:'id',value:tid},
																{index:'markers'},
																{index:'html_code'}]};
				read_json_rows('form345',markers_data,function(newsletter_markers)
				{
					if(newsletter_markers.length>0)
					{
						var markers=vUtil.jsonParse(newsletter_markers[0].markers);
						markers.forEach(function(marker)
						{
							var marker_value="";

							for(var i in attr_array)
							{
								if(attr_array[i].marker==marker)
								{
									marker_value=attr_array[i].value;
									break;
								}
							}
							var marker_label="<textarea name='"+marker+"' placeholder='"+marker+"' class='floatlabel'>"+marker_value+"</textarea>";
							$(markers_label).append(marker_label);
						});
						var save_button="<button type='button' id='form345_attributes_form_submit' class='btn green'>Update</button>";
						$(markers_label).append(save_button);
						$('#form345_attributes_form_submit').on('click',function()
						{
							form345_update_attributes(id,name_filter.value,tid,newsletter_markers[0].html_code);
						});
						$('#form345').formcontrol();
					}
				});
		}

		function form345_new_component_attributes(tid,markers_string,html_code)
		{
				var markers_label=document.getElementById('form345_attributes_form');
				markers_label.innerHTML="";

				var name_filter=document.getElementById('form345_attribute_component_name');
				name_filter.value='Untitled';

				var markers=vUtil.jsonParse(markers_string);
				markers.forEach(function(marker)
				{
					var marker_label="<textarea name='"+marker+"' placeholder='"+marker+"' class='floatlabel'></textarea>";
					$(markers_label).append(marker_label);
				});
				var save_button="<button type='button' id='form345_attributes_form_submit' class='btn green'>Add</button>";
				$(markers_label).append(save_button);
				$('#form345_attributes_form_submit').on('click',function()
				{
					form345_create_attributes(name_filter.value,tid,html_code);
				});
				$('#form345').formcontrol();
				$(name_filter).focus();
		}

		function form345_create_attributes(name,template_id,html_code)
		{
			if(is_create_access('form345'))
			{
				var id=get_new_key();

				var markers_array=[];
				$("#form345_attributes_form").find('textarea').each(function()
				{
					var value=$(this).val();
					var marker=$(this).attr('name');
					var marker_obj={'marker':marker,'value':value};
					markers_array.push(marker_obj);
				});

				var attr=JSON.stringify(markers_array);
				attr=attr.replace(/"/g,"'");

				var component_elem="<li class='list-group-item bg-green bg-font-green link' id='form345_nc_"+id+"' data-name='"+name+"' data-id='"+id+"' data-tid='"+template_id+"'>"+name+
										"<i class='fa fa-times pull-right' onclick=form345_delete_item('"+id+"');></i></li>";
				$('#form345_navigation').append(component_elem);
				$('#form345_nc_'+id).attr('data-attr',attr);
				$('#form345_nc_'+id).on('click',function ()
				{
					form345_components_attributes(id,name,template_id,attr);
				});

				var images_array=[];
				$("#form345_images").children('li').each(function()
				{
					var image={name:$(this).attr('data-name'),
										id:$(this).attr('data-id'),
										url:$(this).attr('data-url')};
					images_array.push(image);
				});

				////////////////////////////////////////////////
				var doc_columns={data_store:'documents',
												indexes:[{index:'id'},
																{index:'url'},
																{index:'doc_name'},
																{index:'doc_type',exact:'newsletter_components'},
																{index:'target_id',exact:template_id}]};
				read_json_rows('form345',doc_columns,function(doc_results)
				{
					var docHTML="";
					doc_results.forEach(function (doc)
					{
						var updated_url=doc.url.replace(/ /g,"+");
						updated_url=updated_url+"\" data-src=\""+doc.id+".jpeg";
						var replace_word="{{"+doc.doc_name+"}}";
						var re=new RegExp(replace_word,"g");
						html_code=html_code.replace(re,updated_url);
					});

					markers_array.forEach(function (marker)
					{
						var replace_word="{{"+marker.marker+"}}";
						var re=new RegExp(replace_word,"g");
						html_code=html_code.replace(re,marker.value);
					});

					images_array.forEach(function (image)
					{
						var replace_word="image:"+image.name;
						var updated_url=image.url+"\" data-src=\""+image.id+".jpeg";
						var re=new RegExp(replace_word,"g");
						html_code=html_code.replace(re,updated_url);
					});
					var div_dummy=document.createElement('div');
					$(div_dummy).html(html_code);

					var html_elem="";
					$(div_dummy).children('div').each(function (index)
					{
						html_elem=$(this);
						$(html_elem).attr('id','form345_sc_'+id);
						$(html_elem).attr('data-id',id);
					});
					$(div_dummy).remove();
					$('#form345_section').append(html_elem);
				});
				/////////////////////////////////////////////////
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form345_update_attributes(id,name,tid,html_code)
		{
				if(is_update_access('form345'))
				{
					var markers_array=[];

					$("#form345_attributes_form").find('textarea').each(function()
					{
						var value=$(this).val();
						var marker=$(this).attr('name');
						var marker_obj={'marker':marker,'value':value};
						markers_array.push(marker_obj);
					});

					var attr=JSON.stringify(markers_array);
					attr=attr.replace(/\"/g,"'");
					var component_elem=$('#form345_nc_'+id);
					$(component_elem).attr('data-name',name);
					$(component_elem).attr('data-attr',attr);
					$(component_elem).html(name+"<i class='fa fa-times pull-right' onclick=form345_delete_item('"+id+"');></i>");
					$('#form345_nc_'+id).on('click',function ()
					{
						form345_components_attributes(id,name,tid,attr);
					});

					var images_array=[];
					$("#form345_images").children('li').each(function()
					{
						var image={name:$(this).attr('data-name'),
											id:$(this).attr('data-id'),
											url:$(this).attr('data-url')};
						images_array.push(image);
					});

					////////////////////////////////////////////////
					var doc_columns={data_store:'documents',
													indexes:[{index:'id'},
																	{index:'url'},
																	{index:'doc_name'},
																	{index:'doc_type',exact:'newsletter_components'},
																	{index:'target_id',exact:tid}]};

					read_json_rows('form345',doc_columns,function(doc_results)
					{
						var docHTML="";
						doc_results.forEach(function (doc)
						{
							var updated_url=doc.url.replace(/ /g,"+");
							updated_url=updated_url+"\" data-src=\""+doc.id+".jpeg";
							var replace_word="{{"+doc.doc_name+"}}";
							var re=new RegExp(replace_word,"g");
							html_code=html_code.replace(re,updated_url);
						});

						markers_array.forEach(function (marker)
						{
							var replace_word="{{"+marker.marker+"}}";
							var re=new RegExp(replace_word,"g");
							html_code=html_code.replace(re,marker.value);
						});

						images_array.forEach(function (image)
						{
							var replace_word="image:"+image.name;
							var updated_url=image.url+"\" data-src=\""+image.id+".jpeg";
							var re=new RegExp(replace_word,"g");
							html_code=html_code.replace(re,updated_url);
						});

						var div_dummy=document.createElement('div');
						$(div_dummy).html(html_code);

						var html_elem="";
						$(div_dummy).children('div').each(function (index)
						{
							html_elem=$(this);
							$(html_elem).attr('id','form345_sc_'+id);
							$(html_elem).attr('data-id',id);
						});
						$(div_dummy).remove();
						$('#form345_sc_'+id).replaceWith(html_elem);
					});
					/////////////////////////////////////////////////
				}
				else
				{
					$("#modal2_link").click();
				}
		}

		function form345_create_item()
		{
			if(is_create_access('form345'))
			{
				show_loader();
				var form=document.getElementById("form345_form");

				var data_id=form.elements['id'].value;
				var name=form.elements['name'].value;

				$('#form345_section').find("img").each(function(index)
				{
					var image_elem=$(this)[0];
					vUtil.resize_picture(image_elem,image_elem.width);
				});

				var components_array=[];
				$("#form345_navigation").find('li').each(function()
				{
					var c=new Object();
					c.name=$(this).attr('data-name');
					c.id=$(this).attr('data-id');
					c.attr=$(this).attr('data-attr');
					c.tid=$(this).attr('data-tid');
					components_array.push(c);
				});
				var components=JSON.stringify(components_array);

				var html_content=document.getElementById('form345_section').innerHTML;
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
					form345_update_item();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form345_update_item()
		{
			if(is_update_access('form345'))
			{
				show_loader();
				var form=document.getElementById("form345_form");

				var data_id=form.elements['id'].value;
				var name=form.elements['name'].value;

				$('#form345_section').find("img").each(function(index)
				{
					var image_elem=$(this)[0];
					vUtil.resize_picture(image_elem,image_elem.width);
				});

				var components_array=[];
				$("#form345_navigation").find('li').each(function()
				{
					var c=new Object();
					c.name=$(this).attr('data-name');
					c.id=$(this).attr('data-id');
					c.attr=$(this).attr('data-attr');
					c.tid=$(this).attr('data-tid');
					components_array.push(c);
				});
				var components=JSON.stringify(components_array);

				var html_content=document.getElementById('form345_section').innerHTML;
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

		function form345_delete_item(id)
		{
			if(is_delete_access('form345'))
			{
				modal115_action(function()
				{
					$('#form345_nc_'+id).remove();
					$('#form345_sc_'+id).remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form345_delete_image(id)
		{
			if(is_delete_access('form345'))
			{
				modal115_action(function()
				{
					var image_json={data_store:'documents',
			 				data:[{index:'id',value:id}]};

					delete_json(image_json);
					$('#form345_image_'+id).remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form345_print()
		{
			var container=document.getElementById('form345_section');
			$.print(container);
		}

	</script>
</div>
