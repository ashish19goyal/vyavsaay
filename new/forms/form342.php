<div id='form342' class='tab-pane portlet box green-jungle'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' id='form342_save' title='Save Newsletter'>Save <i class='fa fa-save'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form342_get_code' onclick=form342_print();><i class='fa fa-download'></i> Download Code</a>
      </div>
	</div>

	<div class="portlet-body">
		<form id='form342_form'>
			<div class='row'>
				<div class='col-sm-12'>
					<input type="hidden" required name='id'>
					<label><input type="text" required name='name' class='floatlabel' placeholder="Name"></label>
					<label><input type="text" required name='disp' class='floatlabel' placeholder="Display Name"></label>
					<label><textarea name='desc' class='floatlabel' placeholder="Description"></textarea></label>
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
                    <a class='accordion-toggle accordion-toggle-styled' data-toggle='collapse' data-parent='#form342_accordion_components' href='#form342_accordion_components'>Elements List</a>
                  </h4>
                </div>
                <div id='form342_accordion_components' class='panel-collapse collapse in'>
                  <div class='panel-body'>
										<ul id="form342_components_list" style='list-style-type:none;margin:0;padding:0;min-height:150px;' class='list-group'>
										</ul>
									</div>
                </div>
              </div>

              <div class='panel panel-default'>
                <div class='panel-heading'>
                  <h4 class='panel-title'>
                    <a class='accordion-toggle accordion-toggle-styled' data-toggle='collapse' data-parent='#form342_accordion_selected' href='#form342_accordion_selected'>Added Elements</a>
                  </h4>
                </div>
                <div id='form342_accordion_selected' class='panel-collapse in'>
                  <div class='panel-body'>
										<ul id="form342_selected_elements" style='list-style-type:none;margin:0;padding:0;min-height:150px;' class='list-group'>
										</ul>
									</div>
                </div>
              </div>

							<div class='panel panel-default'>
                <div class='panel-heading'>
                  <h4 class='panel-title'>
                    <a class='accordion-toggle accordion-toggle-styled' data-toggle='collapse' data-parent='#form342_accordion_functions' href='#form342_accordion_functions'>Functions List</a>
                  </h4>
                </div>
                <div id='form342_accordion_functions' class='panel-collapse collapse in'>
                  <div class='panel-body'>
										<ul id="form342_functions_list" style='list-style-type:none;margin:0;padding:0;min-height:150px;' class='list-group'>
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
					<div class="portlet-body" id="form342_section_parent" style='min-height:10in;'>
						<div id='form342_section'></div>
					</div>
				</div>
			</div>

			<div class='col-sm-2' style='padding: 0 0;' style='padding: 0 0;'>
        <div class='portlet light bordered' style='padding:0;'>
          <div class="portlet-title" style='padding:5px;'>Attributes</div>
      	  <div class="portlet-body" style='min-height:10in;'>
						<input type='text' placeholder='Component Name' id='form342_attribute_component_name' class='floatlabel' style='padding:2px;'>
						<form id='form342_attributes_form' style='padding:2px;'></form>
          </div>
        </div>
      </div>

		</div>
	</div>

	<script>
		function form342_header_ini()
		{
			$('#form342_section').html("");

			var master_form=document.getElementById('form342_form');
			master_form.elements['name'].value="";
			master_form.elements['disp'].value="";
			master_form.elements['desc'].value="";
			var id_filter=master_form.elements['id'];
			id_filter.value=get_new_key();

			var save_button=document.getElementById('form342_save');
			$(save_button).off('click');
			$(save_button).on('click',function (e)
			{
				e.preventDefault();
				form342_create_item();
			});

			///Creating list of components for selection
			var tname_data={data_store:'tab_components',
											indexes:[{index:'id'},{index:'name'},
															{index:'description'},
															{index:'markers'},
															{index:'code'},
															{index:'type'}]};
			read_json_rows('form342',tname_data,function(templates)
			{
				$('#form342_components_list').html("");
				$('#form342_functions_list').html("");
				templates.forEach(function(template)
				{
					if(template.type=='element')
					{
						var component_elem="<li class='list-group-item bg-green bg-font-yellow link' id='form342_cl_"+template.id+"' data-name='"+template.name+"' data-id='"+template.id+"' title='"+template.description+"'>"+template.name+"</li>";
						$('#form342_components_list').append(component_elem);
						$('#form342_cl_'+template.id).on('click',function()
						{
							form342_component_list_attributes(template.markers);
						});
						$('#form342_cl_'+template.id).attr('data-markers',template.markers);
						$('#form342_cl_'+template.id).attr('data-htmlcode',template.code);

						$('#form342_cl_'+template.id).draggable(
						{
							zIndex:1000,
							helper:"clone"
						});
					}
					else {
						var function_elem="<li class='list-group-item bg-green bg-font-yellow link' id='form342_fn_"+template.id+"' data-name='"+template.name+"' data-id='"+template.id+"' title='"+template.description+"'><input type='checkbox' id='form342_fn_cb_"+template.id+"' style='float:left;margin:0px 5px 0px 0px;'> "+template.name+"</li>";
						$('#form342_functions_list').append(function_elem);
						$('#form342_fn_'+template.id).on('click',function()
						{
							form342_component_list_attributes(template.markers);
						});
						$('#form342_fn_'+template.id).attr('data-markers',template.markers);
						$('#form342_fn_'+template.id).attr('data-htmlcode',template.code);
					}
				});
			});

			$('#form342_section').droppable(
			{
				drop: function(event,ui)
				{
					var d=ui.helper[0].dataset;
					form342_new_component_attributes(d.id,d.markers,d.htmlcode);
				}
			});

			var paginator=$('#form342').paginator({visible:false,container:$('#form342')});
			$('#form342').formcontrol();
		};

		function form342_ini()
		{
			var fid=$("#form342_link").attr('data_id');
			if(fid==null)
				fid="";

			if(fid!="")
			{
				show_loader();

				var new_columns={count:1,
												data_store:'tabs_list',
												indexes:[{index:'id',value:fid},
																{index:'name'},
																{index:'description'},
																{index:'display_name'},
																{index:'code'},
																{index:'elements'},
																{index:'functions'}]};

				read_json_rows('form342',new_columns,function(newsletters)
				{
					if(newsletters.length>0)
					{
						var master_form=document.getElementById('form342_form');
						master_form.elements['name'].value=newsletters[0].name;
						master_form.elements['id'].value=newsletters[0].id;

						var save_button=document.getElementById('form342_save');
						$(save_button).off('click');
						$(save_button).on('click',function (e)
						{
							e.preventDefault();
							form342_update_item();
						});

						//console.log(revert_htmlentities(newsletters[0].html_content));
						var updated_content=revert_htmlentities(newsletters[0].html_content);
						$('#form342_section').html(updated_content);

						var components_array=vUtil.jsonParse(newsletters[0].components);
						components_array.forEach(function (component)
						{
							var component_elem="<li class='list-group-item bg-green bg-font-green link' id='form342_nc_"+component.id+"' data-name='"+component.name+"' data-id='"+component.id+"' data-tid='"+component.tid+"'>"+component.name+
																		"<i class='fa fa-times pull-right' onclick=\"form342_delete_item('"+component.id+"');\"></i>"+
																"</li>";
							$('#form342_navigation').append(component_elem);
							$('#form342_nc_'+component.id).attr('data-attr',component.attr);
							$('#form342_nc_'+component.id).on('click',function ()
							{
								form342_components_attributes(component.id,component.name,component.tid,component.attr);
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

				read_json_rows('form342',img_columns,function(images)
				{
					images.forEach(function (image)
					{
						var image_elem="<li class='list-group-item bg-red bg-font-red link' id='form342_image_"+image.id+"' data-name='"+image.doc_name+"' data-id='"+image.id+"' data-url='"+image.url+"'>"+image.doc_name+
											"<i class='fa fa-times pull-right' onclick=form342_delete_image('"+image.id+"');></i>"+
											"</li>";
						$('#form342_images').append(image_elem);
					});
				});
			}
		};

		function form342_component_list_attributes(markers)
		{
				var markers_array=vUtil.jsonParse(markers);

				var markers_string="";
				markers_array.forEach(function(marker)
				{
					markers_string+="<textarea placeholder='"+marker+"' readonly='readonly'></textarea>";
				});

				$('#form342_attributes_form').html(markers_string);
				$('#form342_attribute_component_name').val('Untitled');
				$('#form342').formcontrol();
		}

		function form342_components_attributes(id,name,tid,attr)
		{
				attr=attr.replace(/\'/g,"\"");
				var attr_array=vUtil.jsonParse(attr);
				var markers_label=document.getElementById('form342_attributes_form');

				var name_filter=document.getElementById('form342_attribute_component_name');
				name_filter.value=name;

				markers_label.innerHTML="";

				var markers_data={count:1,data_store:'newsletter_components',
												indexes:[{index:'id',value:tid},
																{index:'markers'},
																{index:'html_code'}]};
				read_json_rows('form342',markers_data,function(newsletter_markers)
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
						var save_button="<button type='button' id='form342_attributes_form_submit' class='btn green'>Update</button>";
						$(markers_label).append(save_button);
						$('#form342_attributes_form_submit').on('click',function()
						{
							form342_update_attributes(id,name_filter.value,tid,newsletter_markers[0].html_code);
						});
						$('#form342').formcontrol();
					}
				});
		}

		function form342_new_component_attributes(tid,markers_string,html_code)
		{
				var markers_label=document.getElementById('form342_attributes_form');
				markers_label.innerHTML="";

				var name_filter=document.getElementById('form342_attribute_component_name');
				name_filter.value='Untitled';

				var markers=vUtil.jsonParse(markers_string);
				markers.forEach(function(marker)
				{
					var marker_label="<textarea name='"+marker+"' placeholder='"+marker+"' class='floatlabel'></textarea>";
					$(markers_label).append(marker_label);
				});
				var save_button="<button type='button' id='form342_attributes_form_submit' class='btn green'>Add</button>";
				$(markers_label).append(save_button);
				$('#form342_attributes_form_submit').on('click',function()
				{
					form342_create_attributes(name_filter.value,tid,html_code);
				});
				$('#form342').formcontrol();
				$(name_filter).focus();
		}

		function form342_create_attributes(name,template_id,html_code)
		{
			if(is_create_access('form342'))
			{
				var id=get_new_key();

				var markers_array=[];
				$("#form342_attributes_form").find('textarea').each(function()
				{
					var value=$(this).val();
					var marker=$(this).attr('name');
					var marker_obj={'marker':marker,'value':value};
					markers_array.push(marker_obj);
				});

				var attr=JSON.stringify(markers_array);
				attr=attr.replace(/"/g,"'");

				var component_elem="<li class='list-group-item bg-green bg-font-green link' id='form342_nc_"+id+"' data-name='"+name+"' data-id='"+id+"' data-tid='"+template_id+"'>"+name+
										"<i class='fa fa-times pull-right' onclick=form342_delete_item('"+id+"');></i></li>";
				$('#form342_navigation').append(component_elem);
				$('#form342_nc_'+id).attr('data-attr',attr);
				$('#form342_nc_'+id).on('click',function ()
				{
					form342_components_attributes(id,name,template_id,attr);
				});

				var images_array=[];
				$("#form342_images").children('li').each(function()
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
				read_json_rows('form342',doc_columns,function(doc_results)
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
						$(html_elem).attr('id','form342_sc_'+id);
						$(html_elem).attr('data-id',id);
					});
					$(div_dummy).remove();
					$('#form342_section').append(html_elem);
				});
				/////////////////////////////////////////////////
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form342_update_attributes(id,name,tid,html_code)
		{
				if(is_update_access('form342'))
				{
					var markers_array=[];

					$("#form342_attributes_form").find('textarea').each(function()
					{
						var value=$(this).val();
						var marker=$(this).attr('name');
						var marker_obj={'marker':marker,'value':value};
						markers_array.push(marker_obj);
					});

					var attr=JSON.stringify(markers_array);
					attr=attr.replace(/\"/g,"'");
					var component_elem=$('#form342_nc_'+id);
					$(component_elem).attr('data-name',name);
					$(component_elem).attr('data-attr',attr);
					$(component_elem).html(name+"<i class='fa fa-times pull-right' onclick=form342_delete_item('"+id+"');></i>");
					$('#form342_nc_'+id).on('click',function ()
					{
						form342_components_attributes(id,name,tid,attr);
					});

					var images_array=[];
					$("#form342_images").children('li').each(function()
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

					read_json_rows('form342',doc_columns,function(doc_results)
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
							$(html_elem).attr('id','form342_sc_'+id);
							$(html_elem).attr('data-id',id);
						});
						$(div_dummy).remove();
						$('#form342_sc_'+id).replaceWith(html_elem);
					});
					/////////////////////////////////////////////////
				}
				else
				{
					$("#modal2_link").click();
				}
		}

		function form342_create_item()
		{
			if(is_create_access('form342'))
			{
				show_loader();
				var form=document.getElementById("form342_form");

				var data_id=form.elements['id'].value;
				var name=form.elements['name'].value;

				$('#form342_section').find("img").each(function(index)
				{
					var image_elem=$(this)[0];
					vUtil.resize_picture(image_elem,image_elem.width);
				});

				var components_array=[];
				$("#form342_navigation").find('li').each(function()
				{
					var c=new Object();
					c.name=$(this).attr('data-name');
					c.id=$(this).attr('data-id');
					c.attr=$(this).attr('data-attr');
					c.tid=$(this).attr('data-tid');
					components_array.push(c);
				});
				var components=JSON.stringify(components_array);

				var html_content=document.getElementById('form342_section').innerHTML;
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
					form342_update_item();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form342_update_item()
		{
			if(is_update_access('form342'))
			{
				show_loader();
				var form=document.getElementById("form342_form");

				var data_id=form.elements['id'].value;
				var name=form.elements['name'].value;

				$('#form342_section').find("img").each(function(index)
				{
					var image_elem=$(this)[0];
					vUtil.resize_picture(image_elem,image_elem.width);
				});

				var components_array=[];
				$("#form342_navigation").find('li').each(function()
				{
					var c=new Object();
					c.name=$(this).attr('data-name');
					c.id=$(this).attr('data-id');
					c.attr=$(this).attr('data-attr');
					c.tid=$(this).attr('data-tid');
					components_array.push(c);
				});
				var components=JSON.stringify(components_array);

				var html_content=document.getElementById('form342_section').innerHTML;
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

		function form342_delete_item(id)
		{
			if(is_delete_access('form342'))
			{
				modal115_action(function()
				{
					$('#form342_nc_'+id).remove();
					$('#form342_sc_'+id).remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form342_print()
		{
			var container=document.getElementById('form342_section');
			$.print(container);
		}

	</script>
</div>
