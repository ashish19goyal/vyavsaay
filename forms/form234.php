<div id='form234' class='tab-pane portlet box yellow-saffron'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' id='form234_add'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form234_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form234_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form234_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
					<li>
                        <a id='form234_rename' onclick=modal227_action('product');><i class='fa fa-pencil'></i> Rename</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form234_upload' onclick=modal23_action(form234_import_template,form234_import,form234_import_validate);><i class='fa fa-upload'></i> Import</a>
                    </li>
                </ul>
            </div>
      </div>
	</div>

	<div class="portlet-body">
		<form id='form234_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="Item" class='floatlabel' name='name'></label>
				<label><input type='text' placeholder="Make" class='floatlabel' name='make'></label>
				<label><input type='submit' class='submit_hidden'></label>
			</fieldset>
		</form>
		<br>
		<div id='form234_body' class='row'>

		</div>
	</div>


    <script>
        function form234_header_ini()
        {
            var filter_fields=document.getElementById('form234_header');
            var name_filter=filter_fields.elements['name'];
            var make_filter=filter_fields.elements['make'];
            var add_button=document.getElementById('form234_add');

            $(add_button).off('click');
            $(add_button).on('click',function()
            {
                modal214_action();
            });

            var make_data={data_store:'product_master',return_column:'make'};
            var products_data={data_store:'product_master',return_column:'name'};

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form234_ini();
            });

            set_my_filter_json(make_data,make_filter);
            set_my_filter_json(products_data,name_filter);
        };

        function form234_ini()
        {
            show_loader();
            var fid=$("#form234_link").attr('data_id');
            if(fid==null)
                fid="";

            $('#form234_body').html("");

            var filter_fields=document.getElementById('form234_header');
            var fname=filter_fields.elements['name'].value;
            var fmakes=filter_fields.elements['make'].value;

            var paginator=$('#form234_body').paginator({'page_size':24});

					var columns=new Object();
							columns.count=paginator.page_size();
							columns.start_index=paginator.get_index();
							columns.data_store='product_master';

							columns.indexes=[{index:'id',value:fid},
											{index:'name',value:fname},
											{index:'make',value:fmakes},
											{index:'description'},
											{index:'indexes'}];

					read_json_rows('form234',columns,function(results)
					{
						var counter=0;
						results.forEach(function(result)
						{
							var clear_both="";
							if((counter%4)==0)
							{
								clear_both="style='clear:both;'";
							}
							counter++;
							var first_char=result.name.substr(0,1);
							var rowsHTML="<div class='col-xs-6 col-sm-3 col-md-3' "+clear_both+">"+
													"<div class='thumbnail'>"+
														"<div class='vr_image_container'>"+
															"<div class='row thumbnail-button-bottom'>"+
			            								"<button type='submit' class='btn green' form='form234_"+result.id+"' name='save' title='Save'><i class='fa fa-2x fa-save'></i></button>"+
																	"<button type='button' class='btn red' form='form234_"+result.id+"' name='delete' title='Delete' onclick='form234_delete_item($(this));'><i class='fa fa-2x fa-trash'></i></button>"+
															"</div>"+
		                          "<div class='row thumbnail-button-top'>"+
			            								"<button type='button' class='btn' form='form234_"+result.id+"'name='image' title='Change Picture'><i class='fa fa-2x fa-pencil link'></i></button>"+
			            								"<input type='file' style='display:none;' form='form234_"+result.id+"'name='image_dummy'>"+
															"</div>"+
		                          "<a onclick=\"show_object('product_master','"+result.name+"');\"><img class='vr_image' data-id='' alt='"+first_char+"' id='form234_image_"+result.id+"'></a>"+
		                        "</div>"+
		                        	"<div class='caption'>"+
		                          	"<form id='form234_"+result.id+"'>"+
					            						"<a onclick=\"show_object('product_master','"+result.name+"');\"><textarea readonly='readonly' name='name' class='floatlabel' placeholder='Name' form='form234_"+result.id+"'>"+result.name+"</textarea></a>"+
		                            	"<input type='text' readonly='readonly' class='floatlabel dblclick_editable' placeholder='Make' name='make' form='form234_"+result.id+"' value='"+result.make+"'>"+
		                            	"<textarea readonly='readonly' class='floatlabel dblclick_editable' placeholder='Description' name='desc' form='form234_"+result.id+"'>"+result.description+"</textarea>"+
		                          		"<input type='hidden' form='form234_"+result.id+"' name='id' value='"+result.id+"'>"+
																	"<input type='hidden' form='form234_"+result.id+"' name='indexes' value='"+result.indexes+"'>"+
		    			            			"</form>"+
		                       		"</div>"+
		                        "</div>"+
		                      "</div>";

							$('#form234_body').append(rowsHTML);
							var fields=document.getElementById("form234_"+result.id);
							var image_button=fields.elements['image'];
							var image_dummy=fields.elements['image_dummy'];
							var image_elem=document.getElementById('form234_image_'+result.id);

							var docs=new Object();
							docs.data_store='documents';
							docs.indexes=[{index:'id'},{index:'url'},{index:'doc_type',exact:'product_master'},{index:'doc_name',exact:'image'},{index:'target_id',exact:result.id}];
							read_json_rows('',docs,function(pics)
							{
								if(pics.length>0)
								{
									image_elem.src=pics[0].url;
									image_elem.setAttribute('data-id',pics[0].id);
								}
							});

							$(image_button).on('click',function (e)
							{
								e.preventDefault();
								$(image_dummy).click();
							});

							$(image_dummy).on('change',function(evt)
							{
							   select_picture(evt,'',function(dataURL)
								{
									image_elem.src=dataURL;
									var last_updated=get_my_time();
									if(image_elem.getAttribute('data-id')=="")
									{
										var data_id=vUtil.newKey();
										image_elem.setAttribute('data-id',data_id);

										var data_json={data_store:'documents',
							 				data:[{index:'id',value:data_id},
							 					{index:'target_id',value:result.id},
							 					{index:'url',value:dataURL},
							 					{index:'doc_name',value:'image'},
							 					{index:'doc_type',value:'product_master'},
							 					{index:'last_updated',value:last_updated}]};
										create_json(data_json);
									}
									else
									{
										var data_id=image_elem.getAttribute('data-id');
										var data_json={data_store:'documents',
							 				data:[{index:'id',value:data_id},
							 					{index:'url',value:dataURL},
							 					{index:'last_updated',value:last_updated}]};
										update_json(data_json);
									}
								});
							});

							$(fields).on("submit", function(event)
							{
								event.preventDefault();
								form234_update_item(fields);
							});
						});

						$('#form234').formcontrol();
						paginator.update_index(results.length);
						initialize_tabular_report_buttons(columns,'Products','form234',function(item)
						{
							delete item.indexes;
						});

						hide_loader();
					});
        };

        function form234_update_item(form)
        {
            if(is_update_access('form234'))
            {
                var name=form.elements['name'].value;
                var make=form.elements['make'].value;
                var description=form.elements['desc'].value;
                var data_id=form.elements['id'].value;
                var last_updated=get_my_time();
								var old_indexes=form.elements['indexes'].value;

								var old_indexes_array=vUtil.jsonParse(old_indexes);
								var indexes=name.split(/[\s,]+/);
					      var description_indexes=description.split(/[\s,]+/);
					      var make_indexes=make.split(/[\s,]+/);
					      var new_indexes=indexes.concat(description_indexes,make_indexes,old_indexes_array);
					      var anew_indexes=vUtil.arrayUnique(new_indexes);
					      var index_string=JSON.stringify(anew_indexes);

                var data_json={data_store:'product_master',
 															data:[{index:'id',value:data_id},
                                 {index:'make',value:make},
                                 {index:'name',value:name},
                                 {index:'description',value:description},
																 {index:'indexes',value:index_string},
                                 {index:'last_updated',value:last_updated}],
								 							log:'yes',
								 							log_data:{title:"Updated",notes:"Product "+name,link_to:"form234"}};

                update_json(data_json);

                $(form).readonly();
            }
            else
            {
                $("#modal2_link").click();
            }
        }


        function form234_delete_item(button)
        {
            if(is_delete_access('form234'))
            {
				var form_id=$(button).attr('form');
				var form=document.getElementById(form_id);

				var name=form.elements['name'].value;
				var make=form.elements['make'].value;

				var bitems_data={data_store:'bill_items',return_column:'id',
								indexes:[{index:'item_name',exact:name}]};
				read_json_count(bitems_data,function(trans)
				{
					if(trans>0)
					{
						$("#modal98_link").click();
					}
					else
					{
						var sitems_data={data_store:'supplier_bill_items',return_column:'id',
										indexes:[{index:'product_name',exact:name}]};
						read_json_count(sitems_data,function(trans)
						{
							if(trans>0)
							{
								$("#modal98_link").click();
							}
							else
							{
				                modal115_action(function()
				                {
				                    var data_id=form.elements['id'].value;
				                    var last_updated=get_my_time();

				                    var data_json={data_store:'product_master',
									 							data:[{index:'id',value:data_id}],
									 							log:'yes',
									 							log_data:{title:"Deleted",notes:"Product "+name+" from inventory",link_to:"form234"}};
														var other_json={data_store:'product_instances',
									 							data:[{index:'product_name',value:name}]};
														var other2_json={data_store:'documents',
									 							data:[{index:'target_id',value:data_id},{index:'doc_type',value:'product_master'}]};
														var other3_json={data_store:'pre_requisites',
									 							data:[{index:'name',value:name},{index:'type',value:'product'}]};
														var other4_json={data_store:'attributes',
									 							data:[{index:'name',value:name},{index:'type',value:'product'}]};
														var other5_json={data_store:'area_utilization',
									 							data:[{index:'item_name',value:name}]};

				                    delete_json(data_json);
				                    delete_json(other_json);
				                    delete_json(other2_json);
				                    delete_json(other3_json);
				                    delete_json(other4_json);
				                    delete_json(other5_json);

				                    $(button).parent().parent().parent().parent().remove();
				                });
							}
						});
					}
				});
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form234_import_template()
        {
            var data_array=['id','name','make','description','type','specifications','quantity','unit'];
            vUtil.arrayToCSV(data_array);
        };

        function form234_import_validate(data_array)
        {
            var validate_template_array=[{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z /_.,()-]+$')},
                                    {column:'make',regex:new RegExp('^[0-9a-zA-Z _.,@\'/()-]+$')},
																		{column:'type',list:['spare part','cabinet']},
																		{column:'quantity',regex:new RegExp('^[0-9 .]+$')},
																		{column:'description',regex:new RegExp('^[0-9a-zA-Z _.,/\'+@!$()-]+$')}];

            var error_array=vImport.validate(data_array,validate_template_array);
            return error_array;
        }

        function form234_import(data_array,import_type)
        {
            var data_json={data_store:'product_master',
													loader:'no',
													log:'yes',
													data:[],
													log_data:{title:'Master products list',link_to:'form234'}};

						var batch_json={data_store:'product_instances',
														loader:'no',
														data:[]};

						var attr_json={data_store:'attributes',
														loader:'no',
														data:[]};

						var adjust_json={data_store:'inventory_adjust',
														loader:'no',
														data:[]};

						var counter=1;
						var last_updated=get_my_time();

						data_array.forEach(function(row)
						{
							counter++;
							if(import_type=='create_new')
							{
								row.id=last_updated+counter;
							}

							var indexes=row.name.split(/[\s,]+/);
				      var description_indexes=row.description.split(/[\s,]+/);
				      var make_indexes=row.make.split(/[\s,]+/);
				      var new_indexes=indexes.concat(description_indexes,make_indexes);
				      var anew_indexes=vUtil.arrayUnique(new_indexes);
				      var index_string=JSON.stringify(anew_indexes);

							var data_json_array=[{index:'id',value:row.id},
				 					{index:'name',value:row.name,unique:'yes'},
				 					{index:'make',value:row.make},
				 					{index:'description',value:row.description},
									{index:'indexes',value:index_string},
				 					{index:'last_updated',value:last_updated}];

							data_json.data.push(data_json_array);

							var batch_json_array=[{index:'id',value:row.id},
				 					{index:'product_name',value:row.name,unique:'yes'},
				 					{index:'batch',value:row.name},
				 					{index:'last_updated',value:last_updated}];

							batch_json.data.push(batch_json_array);

							var adjust_json_array=[{index:'id',value:row.id},
				 					{index:'product_name',value:row.name},
				 					{index:'batch',value:row.name},
									{index:'quantity',value:row.quantity},
				 					{index:'last_updated',value:last_updated}];

							adjust_json.data.push(adjust_json_array);

							var attr1_json_array=[{index:'id',value:row.id},
				 					{index:'name',value:row.name,uniqueWith:['attribute']},
				 					{index:'type',value:'product'},
									{index:'attribute',value:'Unit'},
									{index:'value',value:row.unit},
				 					{index:'last_updated',value:last_updated}];

							attr_json.data.push(attr1_json_array);

							counter++;
							row.spare='no';
							if(row.type=='spare part')
							{
								row.spare='yes';
							}
							var attr2_json_array=[{index:'id',value:(last_updated+counter)},
				 					{index:'name',value:row.name,uniqueWith:['attribute']},
				 					{index:'type',value:'product'},
									{index:'attribute',value:'Spare Part'},
									{index:'value',value:row.spare},
				 					{index:'last_updated',value:last_updated}];

							attr_json.data.push(attr2_json_array);

							var specs_array=row.specifications.split(";");
							specs_array.forEach(function(spec)
							{
								counter++;
								var attr3_json_array=[{index:'id',value:(last_updated+counter)},
					 					{index:'name',value:row.name},
					 					{index:'type',value:'product'},
										{index:'attribute',value:'Specification'},
										{index:'value',value:spec},
					 					{index:'last_updated',value:last_updated}];
								attr_json.data.push(attr3_json_array);
							});
						});

						if(import_type=='create_new')
						{
							create_batch_json(data_json);
							create_batch_json(batch_json);
							create_batch_json(attr_json);
							create_batch_json(adjust_json);
						}
        };

    </script>
</div>
