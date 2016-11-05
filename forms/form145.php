<div id='form145' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form145_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form145_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form145_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form145_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form145_header'></form>
						<th><input type='text' placeholder="Item" class='floatlabel' name='item_name' form='form145_header'></th>
						<th><input type='text' placeholder="Production Plan" class='floatlabel' name='plan' form='form145_header'></th>
						<th><input type='text' placeholder="Quantity" readonly="readonly" name='quantity' form='form145_header'></th>
						<th><input type='text' placeholder="Storage" readonly='readonly' name='store' form='form145_header'></th>
						<th><input type='text' placeholder="Dates" readonly='readonly' form='form145_header'></th>
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form145_header'></th>
						<th><input type='submit' form='form145_header' style='display: none;'></th>
				</tr>
			</thead>
			<tbody id='form145_body'>
			</tbody>
		</table>
	</div>

    <script>

        function form145_header_ini()
        {
            var filter_fields=document.getElementById('form145_header');
            var product_filter=filter_fields.elements['item_name'];
            var plan_filter=filter_fields.elements['plan'];
            var status_filter=filter_fields.elements['status'];

            var products_data={data_store:'product_master',return_column:'name'};
            var plan_data={data_store:'production_plan',return_column:'name'};
            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form145_ini();
            });

            set_my_filter_json(products_data,product_filter);
            set_my_filter_json(plan_data,plan_filter);
            set_static_filter_json('store_movement','status',status_filter);
        };

        function form145_ini()
        {
            show_loader();
            var fid=$("#form145_link").attr('data_id');
            if(fid==null)
                fid="";

            var filter_fields=document.getElementById('form145_header');
            var fproduct=filter_fields.elements['item_name'].value;
            var fplan=filter_fields.elements['plan'].value;
            var fstatus=filter_fields.elements['status'].value;

            $('#form145_body').html("");

            var paginator=$('#form145_body').paginator();

			var columns={count:paginator.page_size(),
						start_index:paginator.get_index(),
						data_store:'store_movement',
                    	access:'yes',
						indexes:[{index:'id',value:fid},
									{index:'item_name',value:fproduct},
									{index:'batch'},
									{index:'quantity'},
                                    {index:'source'},
                                    {index:'target'},
                                    {index:'dispatcher'},
                                    {index:'receiver'},
									{index:'dispatched_time'},
									{index:'received_time'},
									{index:'production_plan',value:fplan},
									{index:'production_line'},
                                    {index:'status',value:fstatus},
                                    {index:'applicable_from'}]};


            read_json_rows('form145',columns,function(results)
            {
                results.forEach(function(result)
                {
					var result_json=JSON.stringify(result);
                    var class_string="";
                    if(result.status=='received' || result.status=='cancelled')
                    {
                        class_string="class='active'";
                    }
                    else if(result.applicable_from!="" && (result.applicable_from<get_my_time()))
                    {
                        class_string="class='warning'";
                    }
                        var rowsHTML="<tr "+class_string+">";
                            rowsHTML+="<form id='form145_"+result.id+"'></form>";
                                rowsHTML+="<td data-th='Item'>";
                                    rowsHTML+="<a onclick=\"show_object('product_master','"+result.item_name+"');\"><textarea class='floatlabel' placeholder='Item' readonly='readonly' form='form145_"+result.id+"'>"+result.item_name+"</textarea></a>";
									rowsHTML+="<a><input type='text' class='floatlabel' placeholder='Batch' readonly='readonly' form='form145_"+result.id+"' value='"+result.batch+"'></a>";
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Production Plan'>";
									rowsHTML+="<input type='text' class='floatlabel' placeholder='Plan' readonly='readonly' form='form145_"+result.id+"' value='"+result.production_plan+"'>";
									rowsHTML+="<input type='text' class='floatlabel' placeholder='Line' readonly='readonly' form='form145_"+result.id+"' value='"+result.production_line+"'>";
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Quantity'>";
                                    rowsHTML+="<input type='number' readonly='readonly' form='form145_"+result.id+"' value='"+result.quantity+"'>";
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Store'>";
                                    rowsHTML+="<a onclick=\"show_object('store_areas','"+result.source+"');\"><input type='text' placeholder='Source' class='floatlabel' readonly='readonly' form='form145_"+result.id+"' value='"+result.source+"'></a>";
                                    rowsHTML+="<a onclick=\"show_object('store_areas','"+result.target+"');\"><input type='text' placeholder='Target' class='floatlabel' readonly='readonly' form='form145_"+result.id+"' value='"+result.target+"'></a>";
                                rowsHTML+="</td>";
								rowsHTML+="<td data-th='Date'>";
                                    rowsHTML+="<input type='text' class='floatlabel' placeholder='Scheduled for' readonly='readonly' form='form145_"+result.id+"' value='"+vTime.datetime({time:result.applicable_from})+"'>";
									rowsHTML+="<input type='text' class='floatlabel' placeholder='Dispatched At' readonly='readonly' form='form145_"+result.id+"' value='"+vTime.datetime({time:result.dispatched_time})+"'>";
									rowsHTML+="<input type='text' class='floatlabel' placeholder='Received At' readonly='readonly' form='form145_"+result.id+"' value='"+vTime.datetime({time:result.received_time})+"'>";
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Status'>";
                                    rowsHTML+="<input type='text' placeholder='Status' readonly='readonly' form='form145_"+result.id+"' value='"+result.status+"'>";
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Action'>";
                                    rowsHTML+="<input type='hidden' form='form145_"+result.id+"' value='"+result.id+"' name='id'>";
                                    rowsHTML+="<button type='button' class='btn blue' form='form145_"+result.id+"' name='print' title='Print' onclick=\"form145_print_item('"+result.id+"');\"><i class='fa fa-print'></i></button>";
									if(result.status!='received' && result.status!='cancelled')
                                        rowsHTML+="<button type='button' class='btn red' form='form145_"+result.id+"' onclick='form145_cancel_item($(this));' name='cancel'>Cancel</button>";
                                    if(result.status=='pending')
                                        rowsHTML+="<button type='button' class='btn green' form='form145_"+result.id+"' onclick='form145_dispatch_item($(this));' name='dispatch'>Dispatch</button>";
                                    if(result.status=='dispatched')
                                        rowsHTML+="<button type='button' class='btn yellow' form='form145_"+result.id+"' name='receive' onclick='form145_receive_item($(this));'>Receive</button>";
								rowsHTML+="</td>";
                    rowsHTML+="</tr>";

                    $('#form145_body').append(rowsHTML);
                    var batch=document.getElementById('form145_'+result.id).elements[1];
                    var batch_object={product:result.item_name,batch:result.batch};
                    $(batch).parent().on('click',function()
                    {
                        show_object('product_instances',batch_object);
                    });
                });

                $('#form145').formcontrol();
                paginator.update_index(results.length);
				vExport.export_buttons({action:'dynamic',columns:columns,file:'Store Movement',report_id:'form145',feach:function (item)
                {
					item['Scheduled Time']=vTime.datetime({time:result.applicable_from});
					item['Dispatched Time']=vTime.datetime({time:result.dispatched_time});
					item['Received Time']=vTime.datetime({time:result.received_time});

					delete item.applicable_from;
					delete item.dispatched_time;
					delete item.received_time;
				}});
                hide_loader();
            });
        }

        function form145_add_item()
        {
            if(is_create_access('form145'))
            {
                var id=vUtil.newKey();
                var rowsHTML="<tr>";
                rowsHTML+="<form id='form145_"+id+"' autocomplete='off'></form>";
                    rowsHTML+="<td data-th='Item'>";
                        rowsHTML+="<input type='text' class='floatlabel' placeholder='Item' required form='form145_"+id+"'>";
						rowsHTML+="<input type='text' class='floatlabel' placeholder='Batch' required form='form145_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Production Plan'>";
                        rowsHTML+="<input type='text' class='floatlabel' placeholder='Plan' form='form145_"+id+"'>";
						rowsHTML+="<input type='text' class='floatlabel' placeholder='Line' form='form145_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Quantity'>";
                        rowsHTML+="<input type='number' required form='form145_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Store'>";
                        rowsHTML+="<input type='text' class='floatlabel' placeholder='Source' required form='form145_"+id+"'>";
                        rowsHTML+="<input type='text' class='floatlabel' placeholder='Target' required form='form145_"+id+"'>";
                    rowsHTML+="</td>";
					rowsHTML+="<td data-th='Dates'>";
                        rowsHTML+="<input type='text' class='floatlabel' placeholder='Scheduled @' form='form145_"+id+"'>";
						rowsHTML+="<input type='text' class='floatlabel' placeholder='Dispatched @' readonly='readonly' form='form145_"+id+"'>";
						rowsHTML+="<input type='text' class='floatlabel' placeholder='Received @' readonly='readonly' form='form145_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Status'>";
                        rowsHTML+="<input type='text' readonly='readonly' class='floatlabel' placeholder='Status' required form='form145_"+id+"' value='pending'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Action'>";
                        rowsHTML+="<input type='hidden' form='form145_"+id+"' value='"+id+"'>";
                        rowsHTML+="<input type='hidden' form='form145_"+id+"' required name='receiver'>";
                        rowsHTML+="<button type='submit' class='btn green' name='save' form='form145_"+id+"'><i class='fa fa-save'></i></button>";
                        rowsHTML+="<button type='button' class='btn red' name='delete' form='form145_"+id+"' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
                    rowsHTML+="</td>";
                rowsHTML+="</tr>";

                $('#form145_body').prepend(rowsHTML);
                var fields=document.getElementById("form145_"+id);
                var product_filter=fields.elements[0];
                var batch_filter=fields.elements[1];
				var plan_filter=fields.elements[2];
                var quantity_filter=fields.elements[4];
                var source_filter=fields.elements[5];
                var target_filter=fields.elements[6];
                var status_filter=fields.elements[10];
                var schedule_filter=fields.elements[7];
                var receiver_filter=fields.elements['receiver'];
                var save_button=fields.elements['save'];

                $(schedule_filter).vdatetimepicker();

                $(fields).on("submit", function(event)
                {
                    event.preventDefault();
                    var receiver_data={data_store:'store_areas',return_column:'owner',
                                      indexes:[{index:'name',exact:target_filter.value}]};
                    set_my_value_json(receiver_data,receiver_filter,function()
                    {
                       form145_create_item(fields);
                    });
                });

                var product_data={data_store:'product_master',return_column:'name'};
                set_my_value_list_json(product_data,product_filter,function ()
                {
                    $(product_filter).focus();
                });

                $(product_filter).on('blur',function(event)
                {
                    var batch_data={data_store:'product_instances',return_column:'batch',
                                   indexes:[{index:'product_name',exact:product_filter.value}]};
                    set_my_value_list_json(batch_data,batch_filter);
                });

                var source_data={data_store:'store_areas',return_column:'name',
                                indexes:[{index:'owner',value:get_account_name()}]};
                set_my_value_list_json(source_data,source_filter);

                $(source_filter).on('blur',function ()
                {
                    get_store_inventory(source_filter.value,product_filter.value,batch_filter.value,function(inventory)
                    {
                        $(quantity_filter).attr('max',inventory);
                    });
                });

				var plan_data={data_store:'production_plan',return_column:'name'};
				set_my_value_list_json(plan_data,plan_filter);

                var target_data={data_store:'store_areas',return_column:'name'};
                set_my_value_list_json(target_data,target_filter);

                set_static_value_list_json('store_movement','status',status_filter);
                $('#form145').formcontrol();

            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form145_create_item(form)
        {
            if(is_create_access('form145'))
            {
                var product_name=form.elements[0].value;
                var batch=form.elements[1].value;
				var plan=form.elements[2].value;
				var line=form.elements[3].value;
                var quantity=form.elements[4].value;
                var source=form.elements[5].value;
                var target=form.elements[6].value;
				var schedule=vTime.unix({date:form.elements[7].value});
                var status=form.elements[10].value;
                var data_id=form.elements['id'].value;
                var receiver=form.elements['receiver'].value;
                var save_button=form.elements['save'];
                var del_button=form.elements['delete'];

                var last_updated=get_my_time();
                var data_json={data_store:'store_movement',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'item_name',value:product_name},
	 					{index:'batch',value:batch},
	 					{index:'quantity',value:quantity},
	 					{index:'source',value:source},
	 					{index:'target',value:target},
	 					{index:'status',value:status},
	 					{index:'dispatcher',value:get_account_name()},
	 					{index:'receiver',value:receiver},
	 					{index:'applicable_from',value:schedule},
						{index:'received_time',value:''},
						{index:'dispatched_time',value:''},
						{index:'production_plan',value:plan},
						{index:'production_line',value:line},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'New',notes:'Store movement initiated for item '+product_name+' from storage '+source,link_to:'form145'}};

                create_json(data_json);
                $(form).readonly();

                $(save_button).hide();
                del_button.removeAttribute("onclick");
                $(del_button).on('click',function(event)
                {
                    form145_delete_item(del_button);
                });

                ///////////adding store placement////////
                var storage_data={data_store:'area_utilization',return_column:'id',
                                 indexes:[{index:'name',exact:target},{index:'item_name',exact:product_name},{index:'batch',exact:batch}]};
                read_json_count(storage_data,function(placements)
                {
                    if(placements==0 && target!="")
                    {
                        var storage_json={data_store:'area_utilization',
                            data:[{index:'id',value:vUtil.newKey()},
	 					         {index:'item_name',value:product_name},
	 					         {index:'batch',value:batch},
	 					         {index:'name',value:target},
	 					         {index:'last_updated',value:get_my_time()}]};
                        create_json(storage_json);
                    }
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form145_delete_item(button)
        {
            if(is_delete_access('form145'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var data_id=form.elements['id'].value;
                    var data_json={data_store:'store_movement',
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

        function form145_dispatch_item(button)
        {
            if(is_update_access('form145'))
            {
                var form_id=$(button).attr('form');
                var form=document.getElementById(form_id);

                var product_name=form.elements[0].value;
                var source=form.elements[5].value;
                form.elements[10].value='dispatched';

                var data_id=form.elements['id'].value;
                var last_updated=get_my_time();
                var data_json={data_store:'store_movement',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'status',value:'dispatched'},
						{index:'dispatched_time',value:last_updated},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Dispatched',notes:'Product '+product_name+' from storage '+source,link_to:'form145'}};

                update_json(data_json);
                $(form).readonly();
                $(button).hide();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form145_receive_item(button)
        {
            if(is_update_access('form145'))
            {
                var form_id=$(button).attr('form');
                var form=document.getElementById(form_id);

                var product_name=form.elements[0].value;
                var batch=form.elements[1].value;
                var target=form.elements[6].value;
                form.elements[10].value='received';

                var data_id=form.elements['id'].value;
                var last_updated=get_my_time();
                var data_json={data_store:'store_movement',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'status',value:'received'},
						{index:'received_time',value:last_updated},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Received',notes:'Product '+product_name+' at storage '+target,link_to:'form145'}};

                var util_json={data_store:'area_utilization',
                        data:[{index:'id',value:data_id},
                             {index:'item_name',value:product_name},
                             {index:'batch',value:batch},
                             {index:'name',value:target},
                             {index:'last_updated',value:last_updated}]};

                update_json(data_json);
                create_json(util_json);

                $(form).readonly();
                $(button).hide();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form145_cancel_item(button)
        {
            if(is_update_access('form145'))
            {
                var form_id=$(button).attr('form');
                var form=document.getElementById(form_id);

                var product_name=form.elements[0].value;
                var source=form.elements[5].value;
                form.elements[10].value='cancelled';

                var data_id=form.elements['id'].value;
                var last_updated=get_my_time();
                var data_json={data_store:'store_movement',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'status',value:'cancelled'},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Cancelled',notes:'Movement of Product '+product_name+' from storage '+source,link_to:'form145'}};

                update_json(data_json);

                $(form).readonly();
                $(button).hide();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

		function form145_print_item(data_id)
		{
			var form_id='form145';

			////////////setting up containers///////////////////////
			var container=document.createElement('div');
			var header=document.createElement('div');
				var logo=document.createElement('div');
				var business_title=document.createElement('div');

			var plan_line=document.createElement('div');

			var table_container=document.createElement('div');

			var footer=document.createElement('div');

			////////////setting styles for containers/////////////////////////

			header.setAttribute('style','width:100%;min-height:100px;');
			plan_line.setAttribute('style','width:100%;min-height:100px;');
			footer.setAttribute('style','width:100%;min-height:50px;');

			business_title.setAttribute('style','width:100%;min-height:30px;text-align:center;');

			///////////////getting the content////////////////////////////////////////

			var bt=get_session_var('title');
			var logo_image=get_session_var('logo');
			var business_intro_text=get_session_var('business_intro');
			var business_address=get_session_var('address');
			var business_phone=get_session_var('phone');
			var business_email=get_session_var('email');
			var business_website=get_session_var('website');

			////////////////filling in the content into the containers//////////////////////////
			var form_id="form145_"+data_id;
			var form=document.getElementById(form_id);

			var item_name=form.elements[0].value;
			var item_batch=form.elements[1].value;
			var production_plan=form.elements[2].value;
			var production_line=form.elements[3].value;
			var source=form.elements[4].value;
			var target=form.elements[5].value;
			var item_quantity=form.elements[6].value;
			var scheduled_at=form.elements[7].value;
			var dispatched_at=form.elements[8].value;
			var received_at=form.elements[9].value;
			var item_status=form.elements[10].value;

			business_title.innerHTML = "<b>Store Movement Challan</b>";
			logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
			plan_line.innerHTML="<div>Production Plan: "+production_plan+
								"<br>Scheduled at: "+scheduled_at+
								"<br>Dispatched at: "+dispatched_at+
								"<br>Received at: "+received_at+
								"<br>Status: <b>"+item_status+"</b>"+
								"</div>";
			footer.innerHTML=business_address+"<br>Phone: "+business_phone+", Email: "+business_email+", Website: "+business_website;

			var table_copy=document.createElement('table');
			table_copy.setAttribute('style','min-height:300px;width:100%');
			var th_elem="<tr>"+
							"<th style='border:2px solid black;text-align:left;'>Item</th>"+
							"<th style='border:2px solid black;text-align:left;'>Batch</th>"+
							"<th style='border:2px solid black;text-align:left;'>Line</th>"+
							"<th style='border:2px solid black;text-align:left;'>Quantity</th>"+
							"<th style='border:2px solid black;text-align:left;'>Source</th>"+
							"<th style='border:2px solid black;text-align:left;'>Target</th>"+
						"</tr>";
			$(table_copy).append(th_elem);


			var td_elem="<tr>"+
							"<td style='border:2px solid black;text-align:left;'>"+item_name+"</td>"+
							"<td style='border:2px solid black;text-align:left;'>"+item_batch+"</td>"+
							"<td style='border:2px solid black;text-align:left;'>"+production_line+"</td>"+
							"<td style='border:2px solid black;text-align:left;'>"+item_quantity+"</td>"+
							"<td style='border:2px solid black;text-align:left;'>"+source+"</td>"+
							"<td style='border:2px solid black;text-align:left;'>"+target+"</td>"+
						"</tr>";

			$(table_copy).append(td_elem);

			container.appendChild(header);
			container.appendChild(plan_line);
			container.appendChild(table_copy);
			container.appendChild(footer);

			header.appendChild(logo);
			header.appendChild(business_title);

			$.print(container);
		}

    </script>
</div>
