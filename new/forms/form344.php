<div id='form344' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form344_add_item();'>Add <i class='fa fa-plus'></i></a>
            <a class='btn btn-circle grey btn-outline btn-sm' id='form344_save'>Save <i class='fa fa-save'></i></a>
		</div>
        <div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form344_print' onclick="form344_print_form();"><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li>
                        <a id='form344_csv'><i class='fa fa-file-excel-o'></i> Download</a>
                    </li>
                    <li>
                        <a id='form344_share'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
        <form id='form344_master' autocomplete="off">
            <fieldset>
                <label><input type='text' required name='pass_num' class='floatlabel' placeholder='Pass #'></label>
                <label><input type='text' name='date' required class='floatlabel' placeholder='Date'></label>
                <label><input type='text' name='loader' class='floatlabel' placeholder='Co-loader'></label>
                <label><input type='text' name='vendor' class='floatlabel' placeholder='Vendor'></label>
				<label><input type='text' name='vehicle' class='floatlabel' placeholder='Vehicle #'></label>
				<label><input type='text' name='exec' class='floatlabel' placeholder='Executive'></label>
				<label><input type='text' name='branch' class='floatlabel' placeholder='Branch' required></label>
				<label><input type='number' name='num' readonly='readonly' class='floatlabel' placeholder='Number of Pieces'></label>
                <input type='hidden' name='id'>
				<input type='hidden' name='orders'>
                <input type='hidden' name='saved'>
                <input type='submit' class='submit_hidden'>
            </fieldset>
        </form>

        <br>

        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr style='color:#9a9a9a;'>
                    <th>S.No.</th>
                    <th>Seal #</th>
					<th>Manifest #</th>
					<th>Details</th>
					<th>Pieces</th>
					<th>AWBs</th>
					<th></th>
				</tr>
			</thead>
			<tbody id='form344_body'>
			</tbody>
        </table>
    </div>

    <script>
        function form344_header_ini()
        {
            var fields=document.getElementById('form344_master');

            var pass_filter=fields.elements['pass_num'];
            var coloader=fields.elements['loader'];
            var vendor=fields.elements['vendor'];
            var date=fields.elements['date'];
            var id_filter=fields.elements['id'];
			var branch=fields.elements['branch'];

            fields.elements['saved'].value='no';
            fields.elements['id'].value=get_new_key();

            var save_button=document.getElementById('form344_save');
            pass_filter.value="";
            coloader.value="";
            vendor.value="";
            $(date).datepicker();
            date.value=vTime.date();
			branch.value="";

			var branch_data={data_store:'store_areas',return_column:'name'};
			set_my_value_list_json(branch_data,branch);

            var pass_id=$("#form344_link").attr('data_id');
            if(pass_id==null)
                pass_id="";

            if(pass_id=="")
            {
                id_filter.value=get_new_key();
                var pass_num_data={data_store:'user_preferences',return_column:'value',
                                      indexes:[{index:'name',exact:'pass_num'}]};
                set_my_value_json(pass_num_data,pass_filter);
            }

            $(save_button).off('click');
            $(save_button).on("click", function(event)
            {
                event.preventDefault();
                form344_create_form();
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
                form344_add_item();
            });

            var paginator=$('#form344_body').paginator({visible:false});

            setTimeout(function(){$('#form344').formcontrol();},500);
        }

        function form344_ini()
        {
            var pass_id=$("#form344_link").attr('data_id');
            if(pass_id==null)
                pass_id="";
            $('#form344_body').html("");

            var filter_fields=document.getElementById('form344_master');

            if(pass_id!="")
            {
                show_loader();
                var pass_columns={data_store:'gate_pass',count:1,
								access:'yes',
								indexes:[{index:'id',value:pass_id},
                                             {index:'pass_num'},
                                             {index:'coloader'},
                                             {index:'vendor'},
                                             {index:'type'},
											 {index:'branch'},
											 {index:'vehicle'},
											 {index:'executive'},
											 {index:'num_orders'},
                                             {index:'date'}]};

                read_json_rows('form344',pass_columns,function(pass_results)
                {
                    if(pass_results.length>0)
                    {
                        filter_fields.elements['pass_num'].value=pass_results[0].pass_num;
                        filter_fields.elements['loader'].value=pass_results[0].coloader;
                        filter_fields.elements['vendor'].value=pass_results[0].vendor;
						filter_fields.elements['vehicle'].value=pass_results[0].vehicle;
						filter_fields.elements['exec'].value=pass_results[0].executive;
						filter_fields.elements['branch'].value=pass_results[0].branch;
                        filter_fields.elements['date'].value=get_my_past_date(pass_results[0].date);
                        filter_fields.elements['id'].value=pass_results[0].id;
                        filter_fields.elements['num'].value=pass_results[0].num_orders;
                        filter_fields.elements['saved'].value='yes';

                        var save_button=document.getElementById('form344_save');
                        $(save_button).click('off');
                        $(save_button).click('on',function(e)
                        {
                            e.preventDefault();
                            form344_update_form();
                        });
                    }
                    $('#form344').formcontrol();
                });

                var pass_items_column={data_store:'manifests',
                                          indexes:[{index:'id'},
                                                  {index:'manifest_num'},
                                                  {index:'seal_num'},
                                                  {index:'num_orders'},
                                                  {index:'pass_num'},
                                                  {index:'lbh'},
                                                  {index:'weight'},
                                                  {index:'pass_id',exact:pass_id}]};

                read_json_rows('form344',pass_items_column,function(results)
                {
                    results.forEach(function(result)
                    {
                        var id=result.id;
                        var rowsHTML="<tr>";
                        rowsHTML+="<form id='form344_"+id+"'></form>";
                            rowsHTML+="<td data-th='S.No.'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Seal #'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form344_"+id+"' value='"+result.seal_num+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Manifest #'>";
                                rowsHTML+="<a onclick=\"element_display('"+result.id+"','form321');\"><input type='text' readonly='readonly' form='form344_"+id+"' value='"+result.manifest_num+"'></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Details'>";
                                rowsHTML+="<input type='text' class='floatlabel' placeholder='LBH' readonly='readonly' form='form344_"+id+"' value='"+result.lbh+"'>";
                                rowsHTML+="<input type='text' class='floatlabel' placeholder='Weight' readonly='readonly' form='form344_"+id+"' value='"+result.weight+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Pieces'>";
                                rowsHTML+="<input type='number' step='any' readonly='readonly' form='form344_"+id+"' value='"+result.num_orders+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='AWBs'>";
                                rowsHTML+="<textarea name='awbs' readonly='readonly' form='form344_"+id+"'>"+result.sku+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form344_"+id+"' name='id' value='"+id+"'>";
                                rowsHTML+="<input type='hidden' form='form344_"+id+"' name='awb_ids'>";
                                rowsHTML+="<input type='button' class='submit_hidden' form='form344_"+id+"' id='save_form344_"+id+"' name='save'>";
                                rowsHTML+="<button type='button' class='btn red' form='form344_"+id+"' id='delete_form344_"+id+"' onclick='form344_delete_item($(this));' name='delete'><i class='fa fa-trash'></i></button>";
                            rowsHTML+="</td>";
                        rowsHTML+="</tr>";

                        $('#form344_body').append(rowsHTML);
                        var item_form=document.getElementById('form344_'+id);
                        var save_button=item_form.elements['save'];

                        $(save_button).on('click',function (e)
                        {
                            e.preventDefault();
                            form344_update_item(item_form);
                        });

                        var awbs_data={data_store:'logistics_orders',
                                      indexes:[{index:'id'},{index:'awb_num'},{index:'man_id',exact:result.id}]};
                        read_json_rows('',awbs_data,function(awbs)
                        {
                            var awb_string="";
                            var id_string="";
                            awbs.forEach(function(awb)
                            {
                               awb_string+=awb.awb_num+" ";
                                id_string+=awb.id+",";
                            });
                            awb_string=awb_string.trim();
                            item_form.elements[5].value=awb_string;
                            item_form.elements['awb_ids'].value=id_string;
                        });
                    });

                    form344_update_serial_numbers();

                    $('#form344').formcontrol();
                    hide_loader();
                });
            }
        }

        function form344_add_item()
        {
            if(is_create_access('form344'))
            {
                var id=get_new_key();
                var rowsHTML="<tr>";
                rowsHTML+="<form id='form344_"+id+"'></form>";
                    rowsHTML+="<td data-th='S.No.'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Seal #'>";
                        rowsHTML+="<input type='text' placeholder='Scan Seal #' required form='form344_"+id+"' oninvalid=\"setCustomValidity('This Seal # is invalid')\">";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Manifest #'>";
                        rowsHTML+="<input type='text' readonly='readonly' form='form344_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Details'>";
                        rowsHTML+="<input type='text' class='floatlabel' placeholder='LBH' readonly='readonly' form='form344_"+id+"'>";
                        rowsHTML+="<input type='text' class='floatlabel' placeholder='Weight' readonly='readonly' form='form344_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Pieces'>";
                        rowsHTML+="<input type='number' readonly='readonly' form='form344_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='AWBs'>";
                        rowsHTML+="<textarea name='awbs' readonly='readonly' form='form344_"+id+"'></textarea>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Action'>";
                        rowsHTML+="<input type='hidden' name='id' form='form344_"+id+"' value='"+id+"'>";
                        rowsHTML+="<input type='hidden' name='awb_ids' form='form344_"+id+"'>";
                        rowsHTML+="<input type='button' class='submit_hidden' form='form344_"+id+"' id='save_form344_"+id+"' name='save'>";
                        rowsHTML+="<button type='button' class='btn red' name='delete' form='form344_"+id+"' id='delete_form344_"+id+"' onclick='$(this).parent().parent().remove(); form344_update_serial_numbers();'><i class='fa fa-trash'></i></button>";
                    rowsHTML+="</td>";
                rowsHTML+="</tr>";

                $('#form344_body').prepend(rowsHTML);

                var item_form=document.getElementById('form344_'+id);
                var seal_filter=item_form.elements[0];
                var manifest_filter=item_form.elements[1];
                var lbh_filter=item_form.elements[2];
                var weight_filter=item_form.elements[3];
                var pieces_filter=item_form.elements[4];
                var awbs_filter=item_form.elements[5];
                var id_filter=item_form.elements['id'];
                var save_button=item_form.elements['save'];

                var new_pass=true;
                var saved=document.getElementById('form344_master').elements['saved'].value;
                if(saved=='yes')
                {
                    new_pass=false;
                }

                $(item_form).on("submit", function(event)
                {
                    event.preventDefault();
                    var total_entries=0;
                    var double_entry=0;
                    $("[id^='save_form344']").each(function(index)
                    {
                        var subform_id=$(this).attr('form');
                        var subform=document.getElementById(subform_id);
                        total_entries+=1;
                        if(subform.elements[0].value==seal_filter.value)
                            double_entry+=1;
                    });

                    if(total_entries==1 && new_pass)
                    {
                        if(double_entry<2)
                        {
							form344_create_form(function()
	                        {
                                form344_create_item(item_form);
                                form344_add_item();
                            });
						}
                        else
                        {
							seal_filter.value="";
                            $("#modal65_link").click();
                        }
                    }
                    else
                    {
                        if(double_entry<2)
                        {
							form344_create_item(item_form);
                            form344_add_item();
                        }
                        else
                        {
							seal_filter.value="";
                            $("#modal65_link").click();
                        }
                    }
                });

                $(seal_filter).focus();
                $(seal_filter).on('keydown',function (event)
                {
                    if(event.keyCode == 13 )
                    {
                        event.preventDefault();

                        var total_entries=0;
                        var double_entry=0;
                        $("[id^='save_form344']").each(function(index)
                        {
                            var subform_id=$(this).attr('form');
                            var subform=document.getElementById(subform_id);

                            total_entries+=1;

                            if(subform.elements[0].value==seal_filter.value)
                                double_entry+=1;
                        });

                        if(total_entries==1 && new_pass)
                        {
							if(double_entry<2)
                            {
							    var orders_data={data_store:'manifests',count:1,
                                        indexes:[{index:'id'},
                                                {index:'manifest_num'},
                                                {index:'lbh'},
                                                {index:'weight'},
                                                {index:'seal_num',exact:seal_filter.value},
                                                {index:'num_orders'},
                                                {index:'type',exact:'bag'}]};

                                read_json_rows('',orders_data,function (orders)
                                {
							        if(orders.length>0)
                                    {
							            manifest_filter.value=orders[0].manifest_num;
                                        pieces_filter.value=orders[0].num_orders;
                                        lbh_filter.value=orders[0].lbh;
                                        weight_filter.value=orders[0].weight;
                                        id_filter.value=orders[0].id;
                                        var awbs_data={data_store:'logistics_orders',
                                                      indexes:[{index:'id'},{index:'awb_num'},{index:'man_id',exact:id_filter.value}]};
                                        read_json_rows('',awbs_data,function(awbs)
                                        {
                                            var awb_string="";
                                            var id_string="";
                                            awbs.forEach(function(awb)
                                            {
                                               awb_string+=awb.awb_num+" ";
                                                id_string+=awb.id+",";
                                            });
                                            awb_string=awb_string.trim();
                                            item_form.elements[5].value=awb_string;
                                            item_form.elements['awb_ids'].value=id_string;
											form344_create_form(function ()
				                            {
	                                            form344_create_item(item_form);
	                                            form344_add_item();
											});
                                        });
                                    }
                                    else
                                    {
										manifest_filter.value="";
                                        pieces_filter.value="";
                                        lbh_filter.value="";
                                        weight_filter.value="";
                                        awbs_filter.value="";
                                        id_filter.value="";
                                        seal_filter.value="";
                                        item_form.elements['awb_ids'].value="";
                                        $("#modal65_link").click();
                                    }
                                    $('#form344').formcontrol();
                                });
                            }
                            else
                            {
                                seal_filter.value="";
                                $("#modal65_link").click();
                            }
                        }
                        else
                        {
                            if(double_entry<2)
                            {
                                var orders_data={data_store:'manifests',count:1,
                                            indexes:[{index:'id'},
                                                    {index:'manifest_num'},
													{index:'lbh'},
													{index:'weight'},
                                                    {index:'seal_num',exact:seal_filter.value},
                                                    {index:'num_orders'},
                                                    {index:'type',exact:'bag'}]};

                                read_json_rows('',orders_data,function (orders)
                                {
                                    if(orders.length>0)
                                    {
                                        manifest_filter.value=orders[0].manifest_num;
                                        pieces_filter.value=orders[0].num_orders;
                                        lbh_filter.value=orders[0].lbh;
                                        weight_filter.value=orders[0].weight;
                                        id_filter.value=orders[0].id;
                                        var awbs_data={data_store:'logistics_orders',
                                                          indexes:[{index:'id'},{index:'awb_num'},{index:'man_id',exact:id_filter.value}]};
                                        read_json_rows('',awbs_data,function(awbs)
                                        {
                                            var awb_string="";
                                            var id_string="";
                                            awbs.forEach(function(awb)
                                            {
                                               awb_string+=awb.awb_num+" ";
                                                id_string+=awb.id+",";
                                            });
                                            awb_string=awb_string.trim();
                                            item_form.elements[5].value=awb_string;
                                            item_form.elements['awb_ids'].value=id_string;
                                            form344_create_item(item_form);
                                            form344_add_item();
                                        });
                                    }
                                    else
                                    {
                                        manifest_filter.value="";
                                        pieces_filter.value="";
                                        lbh_filter.value="";
                                        weight_filter.value="";
                                        awbs_filter.value="";
                                        id_filter.value="";
                                        seal_filter.value="";
                                        item_form.elements['awb_ids'].value="";
                                        $("#modal65_link").click();
                                    }
                                    $('#form344').formcontrol();
                                });
                            }
                            else
                            {
                                seal_filter.value="";
                                $("#modal65_link").click();
                            }
                        }
                    }
                });
                $('#form344').formcontrol();
                form344_update_serial_numbers();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form344_create_item(form)
        {
            if(is_create_access('form344'))
            {
                var master_form=document.getElementById('form344_master');
                var pass_num=master_form.elements['pass_num'].value;
                var pass_id=master_form.elements['id'].value;
                var pass_date=vTime.unix({date:master_form.elements['date'].value});

                var manifest_num=form.elements[1].value;
                var data_id=form.elements['id'].value;
                var save_button=form.elements['save'];
                var del_button=form.elements['delete'];

                var last_updated=get_my_time();
                var data_json={data_store:'manifests',
	 				data:[{index:'id',value:data_id},
	 					{index:'pass_num',value:pass_num},
                        {index:'pass_id',value:pass_id},
	 					{index:'last_updated',value:last_updated}]};
                update_json(data_json);

                var awbs=form.elements['awb_ids'].value;
                var awbs_array=awbs.split(",");

                var data_json={data_store:'logistics_orders',
                        loader:'yes',
                        data:[]};
                awbs_array.forEach(function(row)
                {
                    if(!vUtil.isBlank(row))
                    {
                        var data_json_array=[{index:'id',value:row},
                                {index:'pass_num',value:pass_num},
                                {index:'pass_id',value:pass_id},
								{index:'pass_date',value:pass_date},
                                {index:'last_updated',value:last_updated}];
                        data_json.data.push(data_json_array);
                    }
                });
                update_batch_json(data_json);

                $(form).readonly();

                del_button.removeAttribute("onclick");
                $(del_button).on('click',function(event)
                {
                    form344_delete_item(del_button);
                });

                $(save_button).off('click');
                $(save_button).on('click',function(event)
                {
                    event.preventDefault();
                    form344_update_item(form);
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form344_create_form(func)
        {
            if(is_create_access('form344'))
            {
                var form=document.getElementById("form344_master");

                var pass_num=form.elements['pass_num'].value;
                var coloader=form.elements['loader'].value;
                var vendor=form.elements['vendor'].value;
				var vehicle=form.elements['vehicle'].value;
				var executive=form.elements['exec'].value;
				var branch=form.elements['branch'].value;
                var date=get_raw_time(form.elements['date'].value);
                var data_id=form.elements['id'].value;
                var num_orders=form.elements['num'].value;
                form.elements['saved'].value='yes';

                var save_button=document.getElementById('form344_save');
                var last_updated=get_my_time();

                form344_update_serial_numbers();

                var pass_columns={data_store:"gate_pass",count:1,return_column:'id',indexes:[{index:'pass_num',exact:pass_num}]};
                read_json_single_column(pass_columns,function(passs)
                {
                    if(passs.length==0)
                    {
                        var data_json={data_store:'gate_pass',
                                    data:[{index:'id',value:data_id},
                                        {index:'pass_num',value:pass_num},
                                        {index:'coloader',value:coloader},
                                        {index:'date',value:date},
                                        {index:'vendor',value:vendor},
										{index:'vehicle',value:vehicle},
										{index:'executive',value:executive},
										{index:'branch',value:branch},
                                        {index:'type',value:'bag'},
                                        {index:'num_orders',value:num_orders},
                                        {index:'last_updated',value:last_updated}],
                                      log:'yes',
                                      log_data:{title:'Created',notes:'Pass # '+pass_num,link_to:'form322'}};

                        var num_data={data_store:'user_preferences',return_column:'id',count:1,indexes:[{index:'name',exact:'pass_num'}]};
                        read_json_single_column(num_data,function (pass_num_ids)
                        {
                            if(pass_num_ids.length>0)
                            {
                                var num_json={data_store:'user_preferences',
                                    data:[{index:'id',value:pass_num_ids[0]},
                                        {index:'value',value:(parseInt(pass_num)+1)},
                                        {index:'last_updated',value:last_updated}]};

                                update_json(num_json);
                            }
                        });

                        create_json(data_json);

                        if(typeof func!='undefined')
                        {
                            func();
                        }
                    }
                    else
                    {
                        $("#modal77_link").click();
                    }
                });

				$(save_button).off('click');
				$(save_button).on('click',function(e)
				{
					e.preventDefault();
					form344_update_form();
				});
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form344_update_item(form)
        {
            if(is_update_access('form344'))
            {
                var pass_num=document.getElementById('form344_master').elements['pass_num'].value;
				var pass_date=vTime.unix({date:document.getElementById('form344_master').elements['pass_num'].value});
                var data_id=form.elements['id'].value;
                var last_updated=get_my_time();

                var data_json={data_store:'manifests',
	 				data:[{index:'id',value:data_id},
	 					{index:'pass_num',value:pass_num},
                        {index:'last_updated',value:last_updated}]};
 				update_json(data_json);

				var awbs=form.elements['awb_ids'].value;
				var awbs_array=awbs.split(",");

                var data_json={data_store:'logistics_orders',
                        loader:'yes',
                        data:[]};
                awbs_array.forEach(function(row)
                {
                    if(!vUtil.isBlank(row))
                    {
                        var data_json_array=[{index:'id',value:row},
                                {index:'pass_num',value:pass_num},
                                {index:'pass_id',value:pass_id},
								{index:'pass_date',value:pass_date},
                                {index:'last_updated',value:last_updated}];
                        data_json.data.push(data_json_array);
                    }
                });
                update_batch_json(data_json);

            }
            else
            {
                $("#modal2_link").click();
            }
        }


        function form344_update_form()
        {
            if(is_update_access('form344'))
            {
                var form=document.getElementById("form344_master");

                var pass_num=form.elements['pass_num'].value;
                var coloader=form.elements['loader'].value;
                var vendor=form.elements['vendor'].value;
				var vehicle=form.elements['vehicle'].value;
				var executive=form.elements['exec'].value;
				var branch=form.elements['branch'].value;
                var date=get_raw_time(form.elements['date'].value);
                var data_id=form.elements['id'].value;
                var num_orders=form.elements['num'].value;
                var save_button=document.getElementById('form344_save');
                var last_updated=get_my_time();

                form344_update_serial_numbers();

                var pass_columns={data_store:"gate_pass",count:2,return_column:'id',indexes:[{index:'pass_num',exact:pass_num}]};
                read_json_single_column(pass_columns,function(passs)
                {
                    if(passs.length==0 || (passs.length==1 && passs[0]==data_id))
                    {
                        var data_json={data_store:'gate_pass',
                                    data:[{index:'id',value:data_id},
                                        {index:'pass_num',value:pass_num},
                                        {index:'coloader',value:coloader},
                                        {index:'date',value:date},
                                        {index:'vendor',value:vendor},
										{index:'vehicle',value:vehicle},
										{index:'executive',value:executive},
										{index:'branch',value:branch},
                                        {index:'num_orders',value:num_orders},
                                        {index:'last_updated',value:last_updated}],
                                      log:'yes',
                                      log_data:{title:'Updated',notes:'Pass # '+pass_num,link_to:'form322'}};

                        update_json(data_json);
                        $("[id^='save_form344_']").click();
                    }
                    else
                    {
                        $("#modal77_link").click();
                    }
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }


        function form344_delete_item(button)
        {
            if(is_delete_access('form344'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var data_id=form.elements['id'].value;
                    var last_updated=get_my_time();

                    var data_json={data_store:'manifests',
	 				data:[{index:'id',value:data_id},
	 					{index:'pass_num',value:''},
                        {index:'pass_id',value:''},
	 					{index:'last_updated',value:last_updated}]};

                    update_json(data_json);

                    var data_json={data_store:'logistics_orders',
                            loader:'yes',
                            data:[]};
                    awbs_array.forEach(function(row)
                    {
                        if(!vUtil.isBlank(row))
                        {
                            var data_json_array=[{index:'id',value:row},
                                    {index:'pass_num',value:''},
                                    {index:'pass_id',value:''},
									{index:'pass_date',value:''},
                                    {index:'last_updated',value:last_updated}];
                            data_json.data.push(data_json_array);
                        }
                    });
                    update_batch_json(data_json);

                    $(button).parent().parent().remove();
                    form344_update_serial_numbers();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form344_update_serial_numbers()
        {
            $('#form344_body').find('tr').each(function(index)
            {
                $(this).find('td:nth-child(2)').html(index+1);
            });
            var filter_fields=document.getElementById('form344_master');
            var new_results=[];
            var total_orders=0;
			var total_pieces=0;

            $('#form344_body').find('form').each(function(index)
            {
                var new_obj={};
                var form=$(this)[0];
                new_obj['Seal No']=form.elements[0].value;
                new_obj['Manifest No']=form.elements[1].value;
                new_obj['LBH']=form.elements[2].value;
                new_obj['Weight']=form.elements[3].value;
                new_obj['Pieces']=form.elements[4].value;
                new_obj['AWBs']=form.elements[5].value;
                new_results.push(new_obj);

                var num_pieces=form.elements[4].value;
                if(!vUtil.isBlank(num_pieces) && num_pieces!=0)
                    total_pieces+=parseInt(num_pieces);
                else
                    total_pieces+=1;

				var awbs_array=form.elements[5].value.split(" ");
				total_orders+=awbs_array.length;
            });

            filter_fields.elements['num'].value=total_pieces;
			filter_fields.elements['orders'].value=total_orders;

            $('#form344_share').off('click');
            $('#form344_share').click(function()
            {
                var message_attachment=my_obj_array_to_csv_string(new_results);
                var subject='Gate pass # '+filter_fields.elements['pass_num'].value;
                var body="Hi,\nPlease find attached the gate-pass with this mail.\nCo-loader: "+filter_fields.elements['loader'].value+"\nVendor:"+filter_fields.elements['vendor'].value+"\nDate:"+filter_fields.elements['date'].value+"\n\nRegards,\nBeacon Couriers";

                modal209_action(subject,body,message_attachment);
            });

            $('#form344_csv').off('click');
            $('#form344_csv').click(function()
            {
                my_obj_array_to_csv(new_results,'Gate-pass # '+filter_fields.elements['pass_num'].value);
            });

        }

        function form344_print_form()
        {
            print_form344_form(function(container)
            {
                $.print(container);
                container.innerHTML="";
            });
        }

        function print_form344_form(func)
        {
            var form_id='form344';

            ////////////setting up containers///////////////////////
            var container=document.createElement('div');

            var header=document.createElement('div');
                var logo=document.createElement('div');
                var business_title=document.createElement('div');
                var mts_barcode=document.createElement('img');

            var mts_title=document.createElement('div');
            var detail_section=document.createElement('div');
            var table_container=document.createElement('div');

            ////////////setting styles for containers/////////////////////////

            container.setAttribute('style','width:98%;height:90%;margin:0px;padding:0px;');
            header.setAttribute('style','display:block;width:100%;height:70px;margin-top:10px;');
                logo.setAttribute('style','float:left;width:35%;height:60px;');
                business_title.setAttribute('style','float:left;width:40%;height:60px;text-align:center;font-weight:bold;');
                mts_barcode.setAttribute('style','float:right;width:25%;height:60px;padding:left:5px;padding-right:5px;');
            mts_title.setAttribute('style','display:block;width:100%;height:60px;text-align:center;font-size:40px;');
            detail_section.setAttribute('style','display:block;width:100%;height:50px;text-align:center;');

            ///////////////getting the content////////////////////////////////////////

            var bt=get_session_var('title');
            var font_size=get_session_var('print_size');
            var logo_image=get_session_var('logo');

            var master_form=document.getElementById(form_id+'_master');
            var mts_date=master_form.elements['date'].value;
            var mts_num=master_form.elements['pass_num'].value;
            var coloader=master_form.elements['loader'].value;
            var vendor=master_form.elements['vendor'].value;
			var vehicle=master_form.elements['vehicle'].value;
			var executive=master_form.elements['exec'].value;
			var branch=master_form.elements['branch'].value;
			var num_pieces=master_form.elements['num'].value;
			var num_orders=master_form.elements['orders'].value;

            ////////////////filling in the content into the containers//////////////////////////

            var table_element=document.getElementById(form_id+'_body');
            var total_items=$(table_element).find('tr').length;

            logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"' style='height:98%;margin-left:10%'>";
            business_title.innerHTML=bt;

            $(mts_barcode).JsBarcode(mts_num,{displayValue:true,fontSize:20});

            mts_title.innerHTML="Gate-Pass";
            detail_text="<table style='border:none;width:100%;font-size:11px;'>"+
							"<tr>"+
								"<td>Pass #: "+mts_num+"</td>"+
								"<td>Total Orders: "+num_orders+"</td>"+
								"<td>Total Pieces: "+num_pieces+"</td>"+
							"</tr>"+
							"<tr>"+
								"<td>Co-loader: "+coloader+"</td>"+
								"<td>Vehicle #: "+vehicle+"</td>"+
								"<td>Branch: "+branch+"</td>"+
							"</tr>"+
							"<tr>"+
								"<td>Vendor: "+vendor+"</td>"+
								"<td>Executive: "+executive+"</td>"+
								"<td>Date: "+mts_date+"</td>"+
							"</tr>"+
						"</table>";

            detail_section.innerHTML=detail_text;

            var new_table=document.createElement('table');
            new_table.setAttribute('style','font-size:10px;border:none;text-align:left;width:100%;');
            new_table.setAttribute('class','printing_tables');

            var table_header="<tr style='border-top: 1px solid #000000;'><td style='text-align:left;width:5%'>S.No.</td>"+
                        "<td style='text-align:left;width:25%'>Seal #</td>"+
                        "<td style='text-align:left;width:10%'>Manifest #</td>"+
                        "<td style='text-align:left;width:10%'>LBH</td>"+
                        "<td style='text-align:left;width:10%'>Weight</td>"+
                        "<td style='text-align:left;width:10%'>Pieces</td>"+
                        "<td style='text-align:left;width:30%'>AWBs</td></tr>";

            var table_rows=table_header;
            var counter=0;

            $(table_element).find('form').each(function(index)
            {
                counter+=1;
                var form=$(this)[0];

                var awb_num=""+form.elements[0].value;

                var cnote_no=document.createElement('div');
                var barcode_image=document.createElement('img');
                var barcode_value=document.createElement('div');

                barcode_image.setAttribute('style','width:130px;height:30px;');
                barcode_value.setAttribute('style','width:130px;font-size:14px;margin:1px;text-align:center;');

                barcode_value.innerHTML=awb_num;
                $(barcode_image).JsBarcode(awb_num,{displayValue:false});

                cnote_no.appendChild(barcode_image);
                cnote_no.appendChild(barcode_value);

				if(awb_num!="")
				{
                	table_rows+="<tr style='border-top: 1px solid #000000;height:60px;'><td><div>"+counter+"</div></td>"+
                        "<td><div style='text-align:left;'>"+cnote_no.innerHTML+"</div></td>"+
                        "<td><div style='text-align:left;'>"+form.elements[1].value+"</div></td>"+
                        "<td><div style='text-align:left;'>"+form.elements[2].value+"</div></td>"+
                        "<td><div style='text-align:left;'>"+form.elements[3].value+"</div></td>"+
                        "<td><div style='text-align:left;'>"+form.elements[4].value+"</div></td>"+
                        "<td><div style='text-align:left;'>"+form.elements[5].value+"</div></td></tr>";
				}
            });
            new_table.innerHTML=table_rows;
            /////////////placing the containers //////////////////////////////////////////////////////

            container.appendChild(header);
            container.appendChild(mts_title);
            container.appendChild(detail_section);

            container.appendChild(new_table);

            header.appendChild(logo);
            header.appendChild(business_title);
            header.appendChild(mts_barcode);

			func(container);
        }

    </script>
</div>
