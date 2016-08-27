<div id='form224' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form224_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form224_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form224_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form224_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                </ul>
            </div>
        </div>	
	</div>
	
	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form224_header'></form>
						<th><input type='text' placeholder="Test Id" class='floatlabel' name='test' form='form224_header'></th>
						<th><input type='text' placeholder="Item" class='floatlabel' name='product' form='form224_header'></th>
						<th><input type='text' placeholder="Details" class='floatlabel' name='details' form='form224_header'></th>
						<th><input type='text' placeholder="Next Due" readonly="readonly" form='form224_header'></th>
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form224_header'></th>
						<th><input type='submit' form='form224_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form224_body'>
			</tbody>
		</table>
	</div>
    
    <script>
    function form224_header_ini()
    {
        var filter_fields=document.getElementById('form224_header');
        var test_filter=filter_fields.elements['test'];
        var item_filter=filter_fields.elements['product'];
        var detail_filter=filter_fields.elements['details'];
        var status_filter=filter_fields.elements['status'];

        var test_data={data_store:'testing_process',return_column:'test_id'};
        var item_data={data_store:'product_master',return_column:'name'};

        $(filter_fields).off('submit');
        $(filter_fields).on('submit',function(event)
        {
            event.preventDefault();
            form224_ini();
        });

        set_my_filter_json(test_data,test_filter);
        set_my_filter_json(item_data,item_filter);
        set_static_filter_json('testing_process','status',status_filter);
    };

    function form224_ini()
    {
        show_loader();
        var fid=$("#form224_link").attr('data_id');
        if(fid==null)
            fid="";	

        $('#form224_body').html("");
        
        var filter_fields=document.getElementById('form224_header');
        var fnum=filter_fields.elements['test'].value;
        var fname=filter_fields.elements['product'].value;
        var fdetail=filter_fields.elements['details'].value;
        var fstatus=filter_fields.elements['status'].value;

        var paginator=$('#form224_body').paginator();
			
		var columns={data_store:'testing_process',
				    count:paginator.page_size(),
					start_index:paginator.get_index(),
					indexes:[{index:'id',value:fid},
							{index:'test_id',value:fnum},
							{index:'item',value:fname},
							{index:'details',value:fdetail},
							{index:'status',value:fstatus},
                            {index:'next_due'}]};

        read_json_rows('form224',columns,function(results)
        {	
            results.forEach(function(result)
            {
                var rowsHTML="<tr>";
                    rowsHTML+="<form id='form224_"+result.id+"'></form>";
                        rowsHTML+="<td data-th='Test Id'>";
                            rowsHTML+="<a onclick=\"modal207_action('"+result.test_id+"','"+result.id+"');\"><input type='text' readonly='readonly' form='form224_"+result.id+"' value='"+result.test_id+"'></a>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Item'>";
                            rowsHTML+="<a onclick=\"show_object('product_master','"+result.item+"');\"><textarea readonly='readonly' form='form224_"+result.id+"'>"+result.item+"</textarea></a>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Details'>";
                            rowsHTML+="<textarea readonly='readonly' form='form224_"+result.id+"' class='dblclick_editable'>"+result.details+"</textarea>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Next Due'>";
                            rowsHTML+="<input type='text' class='floatlabel' placeholder='Next Due Date' readonly='readonly' name='due' form='form224_"+result.id+"' value='"+get_my_past_date(result.next_due)+"'>";
                            rowsHTML+="<button type='button' class='btn default green-stripe' form='form224_"+result.id+"' onclick=\"modal146_action('"+result.id+"','"+result.test_id+"','"+result.item+"');\">Add Result</button>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Status'>";
                            rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form224_"+result.id+"' name='status' value='"+result.status+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Action'>";
                            rowsHTML+="<input type='hidden' name='id' form='form224_"+result.id+"' value='"+result.id+"'>";
                            rowsHTML+="<button type='submit' class='btn green' name='save' form='form224_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
                            rowsHTML+="<button type='button' class='btn red' form='form224_"+result.id+"' title='Delete' onclick='form224_delete_item($(this));' name='delete'><i class='fa fa-trash'></i></button>";
                        rowsHTML+="</td>";
                rowsHTML+="</tr>";

                $('#form224_body').append(rowsHTML);
                var fields=document.getElementById("form224_"+result.id);
                var date_filter=fields.elements['due'];
                var status_filter=fields.elements['status'];

                $(date_filter).datepicker();
                set_static_value_list_json('testing_process','status',status_filter);

                $(fields).on("submit",function(event)
                {
                    event.preventDefault();
                    form224_update_item(fields);
                });			
            });

            $('#form224').formcontrol();
            paginator.update_index(results.length);
			initialize_tabular_report_buttons(columns,'Product Testing','form224',function (item)
            {
                item['Next Due']=get_my_past_date(item.next_due);
                delete item.next_due;
            });
			hide_loader();
        });
    };

    function form224_add_item()
    {
        if(is_create_access('form224'))
        {
            var test_id=Math.round(vUtil.newKey()/1000000);
            var id=vUtil.newKey();
            var rowsHTML="<tr>";
            rowsHTML+="<form id='form224_"+id+"' autocomplete='off'></form>";
                rowsHTML+="<td data-th='Test Id'>";
                    rowsHTML+="<input type='text' form='form224_"+id+"' required readonly='readonly' value='"+test_id+"'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Item'>";
                    rowsHTML+="<input type='text' form='form224_"+id+"' required>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Details'>";
                    rowsHTML+="<textarea form='form224_"+id+"'></textarea>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Next Due'>";
                    rowsHTML+="<input type='text' form='form224_"+id+"' required>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Status'>";
                    rowsHTML+="<input type='text' form='form224_"+id+"' required value='pending'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Action'>";
                    rowsHTML+="<input type='hidden' form='form224_"+id+"' name='id' value='"+id+"'>";
                    rowsHTML+="<button type='submit' class='btn green' name='save' form='form224_"+id+"' id='save_form224_"+id+"' title='Save'><i class='fa fa-save'></i></button>";
                    rowsHTML+="<button type='button' class='btn red' form='form224_"+id+"' onclick='$(this).parent().parent().remove();' name='delete' title='Delete'><i class='fa fa-trash'></i></button>";
                rowsHTML+="</td>";			
            rowsHTML+="</tr>";

            $('#form224_body').prepend(rowsHTML);
            var fields=document.getElementById("form224_"+id);
            var item_filter=fields.elements[1];
            var date_filter=fields.elements[3];
            var status_filter=fields.elements[4];

            $(date_filter).datepicker();

            $(fields).on("submit", function(event)
            {
                event.preventDefault();
                form224_create_item(fields);
            });

            var item_data={data_store:'product_master',return_column:'name'};
            set_my_value_list_json(item_data,item_filter,function () 
            {
                $(item_filter).focus();
            });

            set_static_value_list_json('testing_process','status',status_filter);
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    function form224_create_item(form)
    {
        if(is_create_access('form224'))
        {
            var test_id=form.elements[0].value;
            var item=form.elements[1].value;
            var details=form.elements[2].value;
            var next_due=get_raw_time(form.elements[3].value);
            var status=form.elements[4].value;
            var data_id=form.elements[5].value;
            var save_button=form.elements['save'];
            var del_button=form.elements['delete'];
            var last_updated=get_my_time();
            
            var data_json={data_store:'testing_process',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'test_id',value:test_id,unique:'yes'},
                        {index:'item',value:item},
	 					{index:'details',value:details},
	 					{index:'next_due',value:next_due},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Created',notes:'Testing for '+item,link_to:'form224'}};
 				
            create_json(data_json);

            $(form).readonly();
            
            del_button.removeAttribute("onclick");
            $(del_button).on('click',function(event)
            {
                form224_delete_item(del_button);
            });

            $(save_button).off('click');
            $(save_button).on('click',function()
            {
                form224_update_item(form);
            });
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    function form224_update_item(form)
    {
        if(is_update_access('form224'))
        {
            var test_id=form.elements[0].value;
            var item=form.elements[1].value;
            var details=form.elements[2].value;
            var next_due=get_raw_time(form.elements['due'].value);
            var status=form.elements['status'].value;
            var data_id=form.elements['id'].value;
            var save_button=form.elements['save'];
            var del_button=form.elements['delete'];
            var last_updated=get_my_time();
            
            var data_json={data_store:'testing_process',
	 				data:[{index:'id',value:data_id},
	 					{index:'details',value:details},
	 					{index:'next_due',value:next_due},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}]};
 			
            update_json(data_json);

            $(form).readonly();
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    function form224_delete_item(button)
    {
        if(is_delete_access('form224'))
        {
            modal115_action(function()
            {
                var form_id=$(button).attr('form');
                var form=document.getElementById(form_id);

                var data_id=form.elements['id'].value;
                var test_id=form.elements[0].value;
                
                var data_json={data_store:'testing_process',
	 				data:[{index:'id',value:data_id}]};
 			    var data2_json={data_store:'testing_results',
	 				data:[{index:'test_id',value:test_id}]};
 			    var data3_json={data_store:'documents',
	 				data:[{index:'target_id',value:data_id}]};
 			
                delete_json(data_json);
                delete_json(data2_json);
                delete_json(data3_json);
                
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