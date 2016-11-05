<div id='form83' class='tab-pane portlet box yellow-saffron'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='modal35_action();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form83_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form83_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form83_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form83_upload' onclick=modal23_action(form83_import_template,form83_import,form83_import_validate);><i class='fa fa-upload'></i> Import</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='form83_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="Name" class='floatlabel' name='name'></label>
				<label><input type='text' placeholder="Owner" class='floatlabel' name='owner'></label>
				<label><input type='submit' class='submit_hidden'></label>
			</fieldset>
		</form>
		<br>
		<div id='form83_body' class='row'>

		</div>
	</div>

    <script>
        function form83_header_ini()
        {
            var filter_fields=document.getElementById('form83_header');
            var name_filter=filter_fields.elements['name'];
            var owner_filter=filter_fields.elements['owner'];

            var area_data={data_store:'store_areas',return_column:'name'};
            set_my_filter_json(area_data,name_filter);

            var owner_data={data_store:'staff',return_column:'acc_name'};
            set_my_filter_json(owner_data,owner_filter);

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form83_ini();
            });
        };

        function form83_ini()
        {
            show_loader();
            var fid=$("#form83_link").attr('data_id');
            if(fid==null)
                fid="";

            $('#form83_body').html("");

            var filter_fields=document.getElementById('form83_header');
            var fname=filter_fields.elements['name'].value;
            var fowner=filter_fields.elements['owner'].value;

            var paginator=$('#form83_body').paginator({'page_size':24});

			var columns=new Object();
					columns.count=paginator.page_size();
					columns.start_index=paginator.get_index();
					columns.data_store='store_areas';

					columns.indexes=[{index:'id',value:fid},
									{index:'name',value:fname},
									{index:'owner',value:fowner}];


            read_json_rows('form83',columns,function(results)
            {
                counter=0;
                results.forEach(function(result)
                {
                    var clear_both="";
					if((counter%4)==0)
					{
						clear_both="style='clear:both;'";
					}
					counter++;

                    var rowsHTML="<div class='col-xs-6 col-sm-3 col-md-3' "+clear_both+">"+
											"<div class='thumbnail'>"+
                                 	          "<div class='caption'>"+
                                    	           "<form id='form83_"+result.id+"'>"+
                                                        "<a onclick=\"show_object('store_areas','"+result.name+"');\"><textarea readonly='readonly' name='name' class='floatlabel' placeholder='Name' form='form83_"+result.id+"'>"+result.name+"</textarea></a>"+
                                                        "<input type='text' readonly='readonly' class='floatlabel dblclick_editable' placeholder='Owner' name='owner' form='form83_"+result.id+"' value='"+result.owner+"'>"+
	                                    		        "<input type='hidden' form='form83_"+result.id+"' name='id' value='"+result.id+"'>"+
	           	    							        "<button type='submit' class='btn green' form='form83_"+result.id+"' name='save' title='Save'><i class='fa fa-2x fa-save'></i></button>"+
												        "<button type='button' class='btn red' form='form83_"+result.id+"' name='delete' title='Delete' onclick='form83_delete_item($(this));'><i class='fa fa-2x fa-trash'></i></button>"+
													"</form>"+
                                 	          "</div>"+
                               	            "</div>"+
                                    "</div>";

                    $('#form83_body').append(rowsHTML);
                    var fields=document.getElementById("form83_"+result.id);
                    var owner_filter=fields.elements['owner'];

                    var owner_data={data_store:'staff',return_column:'acc_name'};
                    set_my_value_list_json(owner_data,owner_filter);

                    $(fields).on("submit", function(event)
                    {
                        event.preventDefault();
                        form83_update_item(fields);
                    });
                });

                $('#form83').formcontrol();
				paginator.update_index(results.length);
				vExport.export_buttons({action:'dynamic',columns:columns,file:'Customers',report_id:'form83'});
                hide_loader();
            });
        };

        function form83_delete_item(button)
        {
            if(is_delete_access('form83'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var name=form.elements['name'].value;
                    var data_id=form.elements['id'].value;
                    var last_updated=get_my_time();

                    var data_json={data_store:'store_areas',
	 				data:[{index:'id',value:data_id}],
	 				log:'yes',
	 				log_data:{title:'Deleted',notes:'Storage '+name,link_to:'form83'}};

                    delete_json(data_json);
                    $(button).parent().parent().parent().parent().remove();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form83_update_item(form)
        {
            if(is_update_access('form83'))
            {
                var name=form.elements['name'].value;
                var owner=form.elements['owner'].value;
                var data_id=form.elements['id'].value;
                var last_updated=get_my_time();

                var data_json={data_store:'store_areas',
	 				data:[{index:'id',value:data_id},
	 					{index:'owner',value:owner},
	 					{index:'last_updated',value:last_updated}],
	 				log:'yes',
	 				log_data:{title:'Updated',notes:'Owner for storage '+name,link_to:'form83'}};
                update_json(data_json);
                $(form).readonly();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form83_import_template()
        {
            var data_array=['id','name','owner'];
            vUtil.arrayToCSV(data_array);
        };

        function form83_import_validate(data_array)
        {
            var validate_template_array=[{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z_., ()-]+$')},
                                    {column:'owner',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$()-]+$')}];

            var error_array=vImport.validate(data_array,validate_template_array);
            return error_array;
        }

        function form83_import(data_array,import_type)
        {
            var data_json={data_store:'store_areas',
 					loader:'no',
 					log:'yes',
 					data:[],
 					log_data:{title:'Storage structure',link_to:'form83'}};

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
	 					{index:'name',value:row.name},
	 					{index:'owner',value:row.owner},
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
