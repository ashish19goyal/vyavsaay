<div id='form240' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick="form240_add_item();">Add <i class='fa fa-plus'></i></a>
            <a class='btn btn-circle grey btn-outline btn-sm' id='form240_save'>Save <i class='fa fa-save'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form240_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
      	<a class='btn btn-default btn-sm' id='form240_print'><i class='fa fa-print'></i> Print</a>
      </div>	
	</div>
	
	<div class="portlet-body">
    <form id='form240_master' autocomplete="off">
		<fieldset>	    
		   <label><input type='text' class='floatlabel' placeholder='Item' required name='item_name'></label>
		   <label><input type='number' class='floatlabel' placeholder='# of raw materials' readonly='readonly' name='num'></label>
            <input type='hidden' name='id'>
            <input type='submit' class='submit_hidden'>
		</fieldset>	
	</form>
	    
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form240_header'></form>
						<th><input type='text' placeholder="S.No." readonly='readonly' form='form240_header'></th>
						<th><input type='text' placeholder="Raw Material" readonly='readonly' form='form240_header'></th>
						<th><input type='text' placeholder="Quantity" readonly='readonly' form='form240_header'></th>
						<th><input type='submit' form='form240_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form240_body'>
			</tbody>
		</table>
	</div>
        
    <script>

        function form240_header_ini()
        {
            var fields=document.getElementById('form240_master');

            var item_filter=fields.elements['item_name'];
            var save_button=document.getElementById('form240_save');
            var num_filter=fields.elements['num'];
            var id_filter=fields.elements['id'];

            id_filter.value=vUtil.newKey();
            num_filter.value=0;

            $(save_button).off('click');
            $(save_button).on("click", function(event)
            {
                event.preventDefault();
                form240_create_form();
            });

            $(document).off('keydown');
            $(document).on('keydown', function(event) {
                if( event.keyCode == 83 && event.ctrlKey) {
                    event.preventDefault();
                    $(save_button).trigger('click');
                }
            });

            $(fields).off('submit');
            $(fields).on("submit", function(event)
            {
                event.preventDefault();
                form240_add_item();
            });

            var item_data={data_store:'attributes',return_column:'name',
                          indexes:[{index:'type',exact:'product'},
                                  {index:'value',exact:'yes'},
                                  {index:'attribute',exact:'manufactured'}]};
            set_my_value_list_json(item_data,item_filter,function () 
            {
                $(item_filter).focus();
            });
            item_filter.value='';

            $('#form240_body').html("");
        }

        function form240_ini()
        {
            var data_id=$("#form240_link").attr('data_id');
            if(data_id==null)
                data_id="";	
            $('#form240_body').html("");

            if(data_id!="")
            {
                show_loader();
                var master_columns={data_store:'manage_pre_requisites',
                                   indexes:[{index:'id',value:data_id},
                                           {index:'name'},
                                           {index:'num_materials'}]};

                read_json_rows('form240',master_columns,function(master_results)
                {
                    var filter_fields=document.getElementById('form240_master');
                    if(master_results.length>0)
                    {
                        filter_fields.elements['item_name'].value=master_results[0].name;
                        filter_fields.elements['num'].value=master_results[0].num_materials;
                        filter_fields.elements['id'].value=master_results[0].id;

                        var save_button=document.getElementById('form240_save');

                        $(save_button).off('click');
                        $(save_button).on("click", function(event)
                        {
                            event.preventDefault();
                            form240_update_form();
                        });
                        $('#form240').formcontrol();
				            
                        var items_column={data_store:'pre_requisites',
                                         indexes:[{index:'id'},
                                                 {index:'type',exact:'product'},
                                                 {index:'requisite_type',exact:'product'},
                                                 {index:'requisite_name'},
                                                 {index:'quantity'},
                                                 {index:'name',exact:master_results[0].name}]};
                        read_json_rows('',items_column,function(results)
                        {
                            results.forEach(function(result)
                            {
                                var id=result.id;
                                var rowsHTML="<tr>";
                                rowsHTML+="<form id='form240_"+id+"'></form>";
                                    rowsHTML+="<td data-th='S.No.'>";
                                    rowsHTML+="</td>";
                                    rowsHTML+="<td data-th='Raw Material'>";
                                        rowsHTML+="<a><input type='text' readonly='readonly' form='form240_"+id+"' value='"+result.requisite_name+"'>";
                                    rowsHTML+="</a></td>";
                                    rowsHTML+="<td data-th='Quantity'>";
                                        rowsHTML+="<input type='number' step='any' readonly='readonly' form='form240_"+id+"' value='"+result.quantity+"'>";
                                    rowsHTML+="</td>";
                                    rowsHTML+="<td data-th='Action'>";
                                        rowsHTML+="<input type='hidden' form='form240_"+id+"' value='"+id+"'>";
                                        rowsHTML+="<button type='button' class='btn red' name='delete' title='Delete' form='form240_"+id+"' id='delete_form240_"+id+"' onclick='form240_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                                    rowsHTML+="</td>";			
                                rowsHTML+="</tr>";

                                $('#form240_body').append(rowsHTML);
                                var drill_down=document.getElementById('form240_'+id).elements[0];
                                $(drill_down).parent().on('click',function(e)
                                {
                                    e.preventDefault();
                                    var requisite_data={data_store:'manage_pre_requisites',count:1,return_column:'id',
                                                       indexes:[{index:'name',exact:result.requisite_name}]};
                                    read_json_single_column(requisite_data,function(requisites)
                                    {
                                        if(requisites.length>0)
                                        {
                                            element_display(requisites[0],'form240');
                                        }
                                        else
                                        {
                                            $("#modal91_link").click();
                                        }
                                    });
                                    
                                });
                            });
                            
                            form240_update_serial_numbers();
                            $('#form240').formcontrol();
				            initialize_static_tabular_report_buttons('Material Requirements','form240');
                            hide_loader();
                        });
                    }
                });
            }
        }

        function form240_add_item()
        {
            if(is_create_access('form240'))
            {
                var id=vUtil.newKey();
                var rowsHTML="<tr>";
                rowsHTML+="<form id='form240_"+id+"'></form>";
                    rowsHTML+="<td data-th='S.No.'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Raw Material'>";
                        rowsHTML+="<input type='text' required form='form240_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Quantity'>";
                        rowsHTML+="<input type='number' step='any' required form='form240_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Action'>";
                        rowsHTML+="<input type='hidden' form='form240_"+id+"' value='"+id+"'>";
                        rowsHTML+="<input type='button' class='submit_hidden' form='form240_"+id+"' id='save_form240_"+id+"' name='save'>";
                        rowsHTML+="<button type='button' class='btn red' form='form240_"+id+"' id='delete_form240_"+id+"' onclick='$(this).parent().parent().remove(); form240_update_serial_numbers();' name='delete' title='Delete'><i class='fa fa-trash'></i></button>";
                        rowsHTML+="<input type='submit' class='submit_hidden' form='form240_"+id+"'>";
                    rowsHTML+="</td>";			
                rowsHTML+="</tr>";

                $('#form240_body').prepend(rowsHTML);

                var item_form=document.getElementById('form240_'+id);
                var item_filter=item_form.elements[0];
                var quantity_filter=item_form.elements[1];
                var save_button=item_form.elements['save'];

                $(save_button).on('click',function (e) 
                {
                    e.preventDefault();
                    form240_create_item(item_form);
                });

                $(item_form).on("submit", function(event)
                {
                    event.preventDefault();
                    form240_add_item();			
                });

                var item_data={data_store:'product_master',return_column:'name'};
                set_my_value_list_json(item_data,item_filter,function () 
                {
                    $(item_filter).focus();
                });

                form240_update_serial_numbers();
                $('#form240').formcontrol();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form240_create_item(form)
        {
            //console.log('form240_create_form');
            if(is_create_access('form240'))
            {
                var item_name=document.getElementById('form240_master').elements['item_name'].value;
                var requisite_name=form.elements[0].value;
                if(requisite_name!="")
                {
                    var quantity=form.elements[1].value;

                    var data_id=form.elements[2].value;
                    var save_button=form.elements['save'];
                    var del_button=form.elements['delete'];

                    var last_updated=get_my_time();
                    var data_json={data_store:'pre_requisites',
                                data:[{index:'id',value:data_id},
                                     {index:'name',value:item_name},
                                     {index:'type',value:'product'},
                                     {index:'quantity',value:quantity},
                                     {index:'requisite_type',value:'product'},
                                     {index:'requisite_name',value:requisite_name},
                                     {index:'last_updated',value:last_updated}]};
                    create_json(data_json);

                    $(form).readonly();
                    del_button.removeAttribute("onclick");
                    $(del_button).on('click',function(event)
                    {
                        form240_delete_item(del_button);
                    });

                    $(save_button).off('click');
                }
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form240_create_form()
        {
            if(is_create_access('form240'))
            {
                var form=document.getElementById("form240_master");
                var item_name=form.elements['item_name'].value;
                var num_materials=form.elements['num'].value;
                var data_id=form.elements['id'].value;
                var save_button=form.elements['save'];
                var last_updated=get_my_time();
                
                var data_json={data_store:'manage_pre_requisites',
                               log:'yes',
                               log_data:{title:"Assigned",notes:"Raw material for "+item_name,link_to:"form240"},
 							data:[{index:'id',value:data_id},
                                 {index:'name',value:item_name,unique:'yes'},
                                 {index:'num_materials',value:num_materials},
                                 {index:'last_updated',value:last_updated}]};

                create_json(data_json);

                $(save_button).off('click');
                $(save_button).on('click',function(event)
                {
                    event.preventDefault();
                    form240_update_form();
                });

                $("[id^='save_form240_']").click();
            }
            else
            {
                $("#modal2_link").click();
            }
        }
        
        function form240_update_form()
        {
            if(is_create_access('form240'))
            {
                var form=document.getElementById("form240_master");
                var item_name=form.elements['item_name'].value;
                var num_materials=form.elements['num'].value;
                var data_id=form.elements['id'].value;
                var last_updated=get_my_time();
                
                var data_json={data_store:'manage_pre_requisites',
                               log:'yes',
                               log_data:{title:"Assigned",notes:"Raw material for "+item_name,link_to:"form240"},
 							data:[{index:'id',value:data_id},
                                 {index:'name',value:item_name,unique:'yes'},
                                 {index:'num_materials',value:num_materials},
                                 {index:'last_updated',value:last_updated}]};

                update_json(data_json);
                $("[id^='save_form240_']").click();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form240_update_serial_numbers()
        {
            var num_orders=0;
            $('#form240_body').find('tr').each(function(index)
            {
                $(this).find('td:nth-child(2)').html(index+1);
                num_orders+=1;
            });
            var form=document.getElementById("form240_master");
            form.elements['num'].value=num_orders;
        }

        function form240_delete_item(button)
        {
            if(is_delete_access('form240'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var data_id=form.elements[2].value;
                    var data_json={data_store:'pre_requisites',
 							data:[{index:'id',value:data_id}]};
                
                    delete_json(data_json);

                    $(button).parent().parent().remove();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

    </script>
</div>