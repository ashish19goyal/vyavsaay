<div id='form39' class='tab-pane portlet box yellow-saffron'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' id='form39_add'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form39_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
      	<a class='btn btn-default btn-sm' id='form39_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
      	<a class='btn btn-default btn-sm' id='form39_print'><i class='fa fa-print'></i> Print</a>
      </div>	
	</div>
	
	<div class="portlet-body">
		<form id='form39_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="Item" class='floatlabel' name='name'></label>
				<label><input type='text' placeholder="Make" class='floatlabel' name='make'></label>
				<label><input type='submit' class='submit_hidden'></label>			
			</fieldset>
		</form>
		<br>
		<div id='form39_body' class='row'>
			
		</div>
	</div>

    
    <script>
        function form39_header_ini()
        {
            var filter_fields=document.getElementById('form39_header');
            var name_filter=filter_fields.elements['name'];
            var make_filter=filter_fields.elements['make'];
            var add_button=document.getElementById('form39_add');

            $(add_button).off('click');
            $(add_button).on('click',function()
            {
                if(is_read_access('form1') || is_read_access('form207'))
                {
                    modal14_action();
                }
                else 
                {
                    modal112_action();
                }
            });

            var make_data={data_store:'product_master',return_column:'make'};
            var products_data={data_store:'product_master',return_column:'name'};
            
            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form39_ini();
            });

            set_my_filter_json(make_data,make_filter);
            set_my_filter_json(products_data,name_filter);
        };

        function form39_ini()
        {
            show_loader();
            var fid=$("#form39_link").attr('data_id');
            if(fid==null)
                fid="";	

            $('#form39_body').html("");

            var filter_fields=document.getElementById('form39_header');
            var fname=filter_fields.elements['name'].value;
            var fmakes=filter_fields.elements['make'].value;

            var paginator=$('#form39_body').paginator({'page_size':24});
			
			var columns=new Object();
					columns.count=paginator.page_size();
					columns.start_index=paginator.get_index();
					columns.data_store='product_master';

					columns.indexes=[{index:'id',value:fid},
									{index:'name',value:fname},
									{index:'make',value:fmakes},
									{index:'description'},
									{index:'tax'}];		
			
			read_json_rows('form39',columns,function(results)
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
	            										"<button type='submit' class='btn green' form='form39_"+result.id+"' name='save' title='Save'><i class='fa fa-2x fa-save'></i></button>"+
															"<button type='button' class='btn red' form='form39_"+result.id+"' name='delete' title='Delete' onclick='form39_delete_item($(this));'><i class='fa fa-2x fa-trash'></i></button>"+
													"</div>"+
                               			"<div class='row thumbnail-button-top'>"+
	            										"<button type='button' class='btn' form='form39_"+result.id+"'name='image' title='Change Picture'><i class='fa fa-2x fa-pencil link'></i></button>"+
	            										"<input type='file' style='display:none;' form='form39_"+result.id+"'name='image_dummy'>"+
													"</div>"+
                               			"<a onclick=\"show_object('customers','"+result.acc_name+"');\"><img class='vr_image' data-id='' alt='"+first_char+"' id='form39_image_"+result.id+"'></a>"+
                               		"</div>"+
                                 	"<div class='caption'>"+
                                    	"<form id='form39_"+result.id+"'>"+
								            "<a onclick=\"show_object('product_master','"+result.name+"');\"><textarea readonly='readonly' name='name' class='floatlabel' placeholder='Name' form='form39_"+result.id+"'>"+result.name+"</textarea></a>"+
	                                    	"<input type='text' readonly='readonly' class='floatlabel dblclick_editable' placeholder='Make' name='make' form='form39_"+result.id+"' value='"+result.make+"'>"+
	                                    	"<textarea readonly='readonly' class='floatlabel dblclick_editable' placeholder='Description' name='desc' form='form39_"+result.id+"'>"+result.description+"</textarea>"+
	                                    	"<input type='text' readonly='readonly' class='floatlabel dblclick_editable' placeholder='Tax' name='tax' form='form39_"+result.id+"' value='"+result.tax+"'>"+
	                        			    "<input type='hidden' form='form39_"+result.id+"' name='id' value='"+result.id+"'>"+
	            			            "</form>"+
                                 	"</div>"+
                               	"</div>"+
                             "</div>";
					
					$('#form39_body').append(rowsHTML);
					var fields=document.getElementById("form39_"+result.id);
					var image_button=fields.elements['image'];
					var image_dummy=fields.elements['image_dummy'];
					var image_elem=document.getElementById('form39_image_'+result.id);
							
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
								var data_id=get_new_key();
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
						form39_update_item(fields);
					});					
				});
				
				$('#form39').formcontrol();
				paginator.update_index(results.length);				
				initialize_tabular_report_buttons(columns,'Products','form39',function (item)
                {
                    delete item.id;
                });
								
				hide_loader();
			});	
        };

        function form39_update_item(form)
        {
            if(is_update_access('form39'))
            {
                var name=form.elements['name'].value;
                var make=form.elements['make'].value;
                var description=form.elements['desc'].value;
                var tax=form.elements['tax'].value;
                var data_id=form.elements['id'].value;
                var last_updated=get_my_time();
                
                var data_json={data_store:'product_master',
 							data:[{index:'id',value:data_id},
                                 {index:'make',value:make},
                                 {index:'name',value:name},
                                 {index:'description',value:description},
                                 {index:'tax',value:tax},
                                 {index:'last_updated',value:last_updated}],
 							log:'yes',
 							log_data:{title:"Updated",notes:"Product "+name,link_to:"form39"}};
					
                update_json(data_json);
                
                $(form).readonly();
            }
            else
            {
                $("#modal2_link").click();
            }
        }


        function form39_delete_item(button)
        {
            if(is_delete_access('form39'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var name=form.elements['name'].value;
                    var make=form.elements['make'].value;
                    var data_id=form.elements['id'].value;
                    var last_updated=get_my_time();
                    
                    var data_json={data_store:'product_master',
 							data:[{index:'id',value:data_id}],
 							log:'yes',
 							log_data:{title:"Deleted",notes:"Product "+name+" from inventory",link_to:"form39"}};
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
            else
            {
                $("#modal2_link").click();
            }
        }

        function form39_import_template()
        {
            var data_array=['id','name','make','description','tax'];
            my_array_to_csv(data_array);
        };

        function form39_import_validate(data_array)
        {
            var validate_template_array=[{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z /_.,()-]+$')},
                                    {column:'make',regex:new RegExp('^[0-9a-zA-Z _.,@\'/()-]+$')},
                                    {column:'description',regex:new RegExp('^[0-9a-zA-Z _.,/\'+@!$()-]+$')},
                                    {column:'tax',required:'yes',regex:new RegExp('^[0-9.]+$')}];

            var error_array=validate_import_array(data_array,validate_template_array);
            return error_array;					
        }

        function form39_import(data_array,import_type)
        {
            var data_json={data_store:'product_master',
 					loader:'no',
 					log:'yes',
 					data:[],
 					log_data:{title:'Master products list',link_to:'form39'}};

			var counter=1;
			var last_updated=get_my_time();
		
			data_array.forEach(function(row)
			{
				counter+=1;
				if(import_type=='create_new')
				{
					row.id=last_updated+counter;
				}
				
				var data_json_array=[{index:'id',value:row.id},
	 					{index:'name',value:row.name,unique:'yes'},
	 					{index:'make',value:row.make},
	 					{index:'description',value:row.description},
	 					{index:'tax',value:row.tax},
	 					{index:'last_updated',value:last_updated}];

				data_json.data.push(data_json_array);
			});
			
			if(import_type=='create_new')
			{
				create_batch_json(data_json);
			}
			else
			{
				update_batch_json(data_json);
            }            
        };

    </script>
</div>