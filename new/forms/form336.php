<div id='form336' class='function_detail'>
	<form id='form336_master' autocomplete="off">
		<fieldset>
			<label>Pass # <br><input type='text' name='pass_num' required></label>
			<label>Date<br><input type='text' name='date'></label>
			<label>Co-loader<br><input type='text' name='loader'></label>
            <label>Vendor<br><input type='text' name='vendor'></label>
			<label># of Orders<br><input type='number' readonly='readonly' name='num_orders'></label>
			<label>	<input type='button' title='Save pass' name='save' class='save_icon'></label>
            <label>	<input type='button' title='Print pass' name='print' class='print_icon' onclick='form336_print_form();'></label>
            <label>	<input type='hidden' name='id'>
					<input type='hidden' name='saved'>
				<input type='submit' class='submit_hidden'>
			</label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form336_header'></form>
					<th style='width:50px'>S. No.</th>
					<th>AWB #</th>
					<th>Pieces</th>
					<th>Product</th>
					<th><input type='button' form='form336_header' title='Add item' class='add_icon' onclick='form336_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form336_body'>
		</tbody>
		<tfoot id='form336_foot'>
		</tfoot>
	</table>
    
    <script>
        function form336_header_ini()
        {
            var fields=document.getElementById('form336_master');

            var pass_filter=fields.elements['pass_num'];
            var coloader=fields.elements['loader'];
            var vendor=fields.elements['vendor'];
            var date=fields.elements['date'];
            
            fields.elements['saved'].value='no';
            fields.elements['id'].value=get_new_key();

            var save_button=fields.elements['save'];
            pass_filter.value="";
            coloader.value="";
            vendor.value="";
            $(date).datepicker();
            date.value=get_my_date();

            var pass_id=$("#form336_link").attr('data_id');
            if(pass_id==null)
                pass_id="";	

            if(pass_id=="")
            {
                var pass_num_data={data_store:'user_preferences',return_column:'value',
                                      indexes:[{index:'name',exact:'pass_num'}]};
                set_my_value_json(pass_num_data,pass_filter);	
            }

            $(save_button).off('click');
            $(save_button).on("click", function(event)
            {
                event.preventDefault();
                form336_update_form();
            });

            $(save_button).hide();

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
                form336_add_item();
            });
        }

        function form336_ini()
        {
            var pass_id=$("#form336_link").attr('data_id');
            if(pass_id==null)
                pass_id="";	
            $('#form336_body').html("");
            $('#form336_foot').html("");

            if(pass_id!="")
            {
                show_loader();
                var pass_columns={data_store:'gate_pass',count:1,
                                     indexes:[{index:'id',value:pass_id},
                                             {index:'pass_num'},
                                             {index:'coloader'},
                                             {index:'vendor'},
                                             {index:'date'}]};

                read_json_rows('form336',pass_columns,function(pass_results)
                {
                    var filter_fields=document.getElementById('form336_master');
                    if(pass_results.length>0)
                    {
                        filter_fields.elements['pass_num'].value=pass_results[0].pass_num;
                        filter_fields.elements['loader'].value=pass_results[0].coloader;
                        filter_fields.elements['vendor'].value=pass_results[0].vendor;
                        filter_fields.elements['date'].value=get_my_past_date(pass_results[0].date);
                        filter_fields.elements['id'].value=pass_results[0].id;
                        filter_fields.elements['num_orders'].value=pass_results[0].num_orders;
                        filter_fields.elements['saved'].value='yes';

                        var save_button=filter_fields.elements['save'];
                        $(save_button).show();

                        var pass_items_column={data_store:'logistics_orders',
                                                  indexes:[{index:'id'},
                                                          {index:'awb_num'},
                                                          {index:'sku'},
                                                          {index:'pieces'},
                                                          {index:'weight'}, 
                                                          {index:'pass_num',exact:pass_results[0].pass_num},
                                                          {index:'pass_id',exact:pass_id}]};

                        read_json_rows('form336',pass_items_column,function(results)
                        {
                            results.forEach(function(result)
                            {
                                var id=result.id;
                                var rowsHTML="<tr>";

                                var address=result.city+", "+result.state;
                                rowsHTML+="<form id='form336_"+id+"'></form>";
                                    rowsHTML+="<td data-th='S.No.'>";
                                    rowsHTML+="</td>";
                                    rowsHTML+="<td data-th='AWB #'>";
                                        rowsHTML+="<input type='text' readonly='readonly' form='form336_"+id+"' value='"+result.awb_num+"'>";
                                    rowsHTML+="</td>";
                                    rowsHTML+="<td data-th='Pieces'>";
                                        rowsHTML+="<input type='number' step='any' readonly='readonly' form='form336_"+id+"' value='"+result.pieces+"'>";
                                    rowsHTML+="</td>";
                                    rowsHTML+="<td data-th='Product'>";
                                        rowsHTML+="<input type='text' readonly='readonly' form='form336_"+id+"' value='"+result.sku+"'>";
                                    rowsHTML+="</td>";
                                    rowsHTML+="<td data-th='Action'>";
                                        rowsHTML+="<input type='hidden' name='id' form='form336_"+id+"' value='"+id+"'>";
                                        rowsHTML+="<input type='button' name='save' class='submit_hidden' form='form336_"+id+"' id='save_form336_"+id+"'>";
                                        rowsHTML+="<input type='button' name='delete' class='delete_icon' form='form336_"+id+"' id='delete_form336_"+id+"' onclick='form336_delete_item($(this));'>";
                                    rowsHTML+="</td>";			
                                rowsHTML+="</tr>";

                                $('#form336_body').append(rowsHTML);
                                var item_form=document.getElementById('form336_'+id);
                                var save_button=item_form.elements['save'];

                                $(save_button).on('click',function (e) 
                                {
                                    e.preventDefault();
                                    form336_update_item(item_form);
                                });
                            });

                            form336_update_serial_numbers();
                            $('textarea').autosize();
                            hide_loader();
                        });
                    }
                });
            }
        }

        function form336_add_item()
        {
            if(is_create_access('form336'))
            {
                var id=get_new_key();
                var rowsHTML="<tr>";
                rowsHTML+="<form id='form336_"+id+"'></form>";
                    rowsHTML+="<td data-th='S.No.'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='AWB #'>";
                        rowsHTML+="<input type='text' required form='form336_"+id+"' oninvalid=\"setCustomValidity('This AWB # is invalid')\">";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Pieces'>";
                        rowsHTML+="<input type='text' readonly='readonly' form='form336_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Product'>";
                        rowsHTML+="<input type='text' readonly='readonly' form='form336_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Action'>";
                        rowsHTML+="<input type='hidden' form='form336_"+id+"' name='id' value='"+id+"'>";
                        rowsHTML+="<input type='button' class='submit_hidden' name='save' form='form336_"+id+"' id='save_form336_"+id+"'>";
                        rowsHTML+="<input type='button' class='delete_icon' name='delete' form='form336_"+id+"' id='delete_form336_"+id+"' onclick='$(this).parent().parent().remove(); form336_update_serial_numbers();'>";
                        rowsHTML+="<input type='hidden' form='form336_"+id+"' name='history' value='' name='order_history'>";
                    rowsHTML+="</td>";			
                rowsHTML+="</tr>";

                $('#form336_body').prepend(rowsHTML);

                var item_form=document.getElementById('form336_'+id);
                var awb_filter=item_form.elements[0];
                var pieces_filter=item_form.elements[1];
                var product_filter=item_form.elements[2];
                var id_filter=item_form.elements[3];
                var save_button=item_form.elements['save'];
                var history_filter=item_form.elements['history'];

                var new_pass=true;
                var saved=document.getElementById('form336_master').elements['saved'].value;
                if(saved=='yes')
                {
                    new_pass=false;
                }

                $(item_form).on("submit", function(event)
                {
                    event.preventDefault();
                    var total_entries=0;
                    var double_entry=0;
                    $("[id^='save_form336']").each(function(index)
                    {
                        var subform_id=$(this).attr('form');
                        var subform=document.getElementById(subform_id);
                        total_entries+=1;
                        if(subform.elements[0].value==awb_filter.value)	
                            double_entry+=1;
                    });

                    if(total_entries==1 && new_pass)
                    {
                        form336_create_form(function()
                        {
                            if(double_entry<2)
                            {
                                form336_create_item(item_form);
                                form336_add_item();
                            }
                            else 
                            {
                                awb_filter.value="";
                                $("#modal65").dialog("open");
                            }
                        });
                    }
                    else 
                    {
                        if(double_entry<2)
                        {
                            form336_create_item(item_form);
                            form336_add_item();
                        }
                        else 
                        {
                            awb_filter.value="";
                            $("#modal65").dialog("open");
                        }
                    }
                });

                $(awb_filter).focus();

                $(awb_filter).on('keydown',function (event) 
                {
                    if(event.keyCode == 13 ) 
                    {
                        event.preventDefault();

                        var total_entries=0;
                        var double_entry=0;
                        $("[id^='save_form336']").each(function(index)
                        {
                            var subform_id=$(this).attr('form');
                            var subform=document.getElementById(subform_id);

                            total_entries+=1;

                            if(subform.elements[0].value==awb_filter.value)	
                                double_entry+=1;
                        });

                        if(total_entries==1 && new_pass)
                        {
                            form336_create_form(function () 
                            {
                                if(double_entry<2)
                                {
                                    var orders_data={data_store:'logistics_orders',count:1,
                                                    indexes:[{index:'id'},
                                                            {index:'awb_num',exact:awb_filter.value},
                                                            {index:'sku'},
                                                            {index:'pieces'},
                                                            {index:'weight'},
                                                            {index:'man_id',unequal:""},
                                                            {index:'status',array:['received','undelivered','pending']},
                                                            {index:'order_history'}]};
                                    				
                                    read_json_rows('',orders_data,function (orders) 
                                    {
                                        //console.log(orders);
                                        if(orders.length>0)
                                        {
                                            product_filter.value=orders[0].sku;
                                            pieces_filter.value=orders[0].pieces;
                                            id_filter.value=orders[0].id;
                                            history_filter.value=orders[0].order_history;
                                            form336_create_item(item_form);
                                            form336_add_item();
                                        }
                                        else 
                                        {
                                            product_filter.value="";
                                            pieces_filter.value="";
                                            id_filter.value="";
                                            history_filter.value="";
                                            awb_filter.value="";
                                            $("#modal65").dialog("open");
                                        }
                                    });
                                }
                                else 
                                {
                                    awb_filter.value="";
                                    $("#modal65").dialog("open");
                                }
                            });
                        }
                        else 
                        {
                            if(double_entry<2)
                            {
                                var orders_data={data_store:'logistics_orders',count:1,
                                                    indexes:[{index:'id'},
                                                            {index:'awb_num',exact:awb_filter.value},
                                                            {index:'sku'},
                                                            {index:'pieces'},
                                                            {index:'weight'},
                                                            {index:'man_id',unequal:""},
                                                            {index:'status',array:['received','undelivered','pending']},
                                                            {index:'order_history'}]};
                                    
                                read_json_rows('',orders_data,function (orders) 
                                {
                                    if(orders.length>0)
                                    {
                                        product_filter.value=orders[0].sku;
                                        pieces_filter.value=orders[0].pieces;
                                        id_filter.value=orders[0].id;
                                        history_filter.value=orders[0].order_history;	
                                        form336_create_item(item_form);
                                        form336_add_item();
                                    }
                                    else 
                                    {
                                        product_filter.value="";
                                        pieces_filter.value="";
                                        id_filter.value="";
                                        awb_filter.value="";
                                        history_filter.value="";
                                        $("#modal65").dialog("open");
                                    }
                                });
                            }
                            else 
                            {
                                awb_filter.value="";
                                $("#modal65").dialog("open");
                            }
                        }
                    }
                });
                $('textarea').autosize();
                form336_update_serial_numbers();
            }
            else
            {
                $("#modal2").dialog("open");
            }
        }

        function form336_create_item(form)
        {
            //console.log('form336_create_form');
            if(is_create_access('form336'))
            {
                var master_form=document.getElementById('form336_master');
                var pass_num=master_form.elements['pass_num'].value;
                var pass_id=master_form.elements['id'].value;
                var pass_date=master_form.elements['date'].value;
                var coloader=master_form.elements['loader'].value;
                var vendor=master_form.elements['vendor'].value;
                var num_orders=master_form.elements['num_orders'].value;

                var data_id=form.elements['id'].value;
                var save_button=form.elements['save'];
                var del_button=form.elements['delete'];

                var old_order_history=form.elements['history'].value;

                var order_history=[];
                if(old_order_history!="")
                    order_history=JSON.parse(old_order_history);
                var history_object=new Object();
                history_object.timeStamp=get_my_time();
                history_object.details="Order in-transit";
                history_object.location='';
                history_object.status="in-transit";
                order_history.push(history_object);
                var order_history_string=JSON.stringify(order_history);		

                var last_updated=get_my_time();
                
                var data_json={data_store:'logistics_orders',
	 				data:[{index:'id',value:data_id},
	 					{index:'pass_num',value:pass_num},
                        {index:'pass_id',value:pass_id},  
                        {index:'status',value:'in-transit'},
	 					{index:'order_history',value:order_history_string},
	 					{index:'last_updated',value:last_updated}]};
 				update_json(data_json);
				
                for(var i=0;i<3;i++)
                {
                    $(form.elements[i]).attr('readonly','readonly');
                }
                del_button.removeAttribute("onclick");
                $(del_button).on('click',function(event)
                {
                    form336_delete_item(del_button);
                });

                $(save_button).off('click');
                $(save_button).on('click',function(event)
                {
                    event.preventDefault();
                    form336_update_item(form);
                });
            }
            else
            {
                $("#modal2").dialog("open");
            }
        }

        function form336_create_form(func)
        {
            if(is_create_access('form336'))
            {
                var form=document.getElementById("form336_master");

                var pass_num=form.elements['pass_num'].value;
                var coloader=form.elements['loader'].value;
                var vendor=form.elements['vendor'].value;
                var date=get_raw_time(form.elements['date'].value);
                var data_id=form.elements['id'].value;
                var num_orders=form.elements['num_orders'].value;
                
                var save_button=form.elements['save'];
                var last_updated=get_my_time();

                var pass_columns={data_store:'gate_pass',count:1,return_column:'id',
                                 indexes:[{index:'pass_num',exact:pass_num}]};	
                read_json_single_column(pass_columns,function(gate_pass)
                {
                    if(gate_pass.length==0)
                    {
                        var data_json={data_store:'gate_pass',
                            log:'yes',
                            data:[{index:'id',value:data_id},
                                {index:'pass_num',value:pass_num,unique:'yes'},
                                {index:'coloader',value:coloader},  
                                {index:'date',value:date},
                                {index:'vendor',value:vendor},
                                {index:'num_orders',value:num_orders},  
                                {index:'last_updated',value:last_updated}],
                            log_data:{title:'Created',notes:'Gate Pass # '+pass_num,link_to:'form337'}};
                        create_json(data_json);

                        var num_data={data_store:'user_preferences',return_column:'id',count:1,
                                     indexes:[{index:'name',exact:'pass_num'}]};
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

                        $(save_button).show();

                        if(typeof func!='undefined')
                        {
                            func();
                        }
                    }
                    else 
                    {
                        $("#modal77").dialog("open");
                    }
                });
            }
            else
            {
                $("#modal2").dialog("open");
            }
        }

        function form336_update_item(form)
        {
            if(is_update_access('form336'))
            {
                var pass_num=document.getElementById('form336_master').elements['pass_num'].value;
                var data_id=form.elements['id'].value;
                var last_updated=get_my_time();

                var data_json={data_store:'logistics_orders',
                                data:[{index:'id',value:data_id},
                                        {index:'pass_num',value:pass_num},
                                        {index:'last_updated',value:last_updated}]};
                update_json(data_json);
            }
            else
            {
                $("#modal2").dialog("open");
            }
        }


        function form336_update_form()
        {
            if(is_create_access('form336'))
            {
                var form=document.getElementById("form336_master");

                var pass_num=form.elements['pass_num'].value;
                var coloader=form.elements['loader'].value;
                var vendor=form.elements['vendor'].value;
                var num_orders=form.elements['num_orders'].value;
                var date=get_raw_time(form.elements['date'].value);
                var data_id=form.elements['id'].value;

                var save_button=form.elements['save'];
                var last_updated=get_my_time();

                var pass_columns={data_store:'gate_pass',return_column:'id',count:2,
                                 indexes:[{index:'pass_num',exact:pass_num}]};
                read_json_single_column(pass_columns,function(gate_pass)
                {
                    if(gate_pass.length==0 || (gate_pass.length==1 && gate_pass[0]==data_id))
                    {
                        var data_json={data_store:'gate_pass',
                            log:'yes',
                            data:[{index:'id',value:data_id},
                                {index:'pass_num',value:pass_num},
                                {index:'coloader',value:coloader},  
                                {index:'date',value:date},
                                {index:'vendor',value:vendor},
                                {index:'num_orders',value:num_orders},  
                                {index:'last_updated',value:last_updated}],
                            log_data:{title:'Updated',notes:'Gate Pass # '+pass_num,link_to:'form337'}};
                        update_json(data_json);

                        $("[id^='save_form336_']").click();
                    }
                    else 
                    {
                        $("#modal77").dialog("open");
                    }
                });
            }
            else
            {
                $("#modal2").dialog("open");
            }
        }

        function form336_delete_item(button)
        {
            if(is_delete_access('form336'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var data_id=form.elements['id'].value;
                    var last_updated=get_my_time();
                    var data_json={data_store:'logistics_orders',
                            data:[{index:'id',value:data_id},
                                {index:'pass_num',value:''},
                                {index:'pass_id',value:''},  
                                {index:'status',value:'pending'},
                                {index:'last_updated',value:last_updated}]};
                    update_json(data_json);

                    $(button).parent().parent().remove();
                    form336_update_serial_numbers();
                });
            }
            else
            {
                $("#modal2").dialog("open");
            }
        }

        function form336_update_serial_numbers()
        {
            $('#form336_body').find('tr').each(function(index)
            {
                $(this).find('td:nth-child(2)').html(index+1);
            });

            var num_orders=0;
            $("[id^='save_form336']").each(function(index)
            {
                var subform_id=$(this).attr('form');
                var subform=document.getElementById(subform_id);

                if(subform.elements[0].value!="")
                {
                    num_orders+=1;			
                }
            });

            var form=document.getElementById("form336_master");
            form.elements['num_orders'].value=num_orders;
        }

        function form336_print_form()
        {
            print_form336(function(container)
            {
                $.print(container);
                container.innerHTML="";	
            });	
        }

        function print_form336(func)
        {
            var form_id='form336';

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
            header.setAttribute('style','display:block;width:98%;height:70px;margin-top:10px;');
                logo.setAttribute('style','float:left;width:35%;height:60px;');
                business_title.setAttribute('style','float:left;width:40%;height:60px;text-align:center;font-weight:bold;');
                mts_barcode.setAttribute('style','float:right;width:23%;height:60px;padding:left:5px;padding-right:5px;');
            mts_title.setAttribute('style','display:block;width:98%;height:30px;text-align:center;font-size:40px;');
            detail_section.setAttribute('style','display:block;width:98%;height:30px;text-align:center;');

            ///////////////getting the content////////////////////////////////////////

            var bt=get_session_var('title');
            var font_size=get_session_var('print_size');
            var logo_image=get_session_var('logo');

            var master_form=document.getElementById(form_id+'_master');
            var mts_date=master_form.elements['date'].value;
            var mts_num=master_form.elements['pass_num'].value;
            var coloader=master_form.elements['loader'].value;
            var num_orders=master_form.elements['num_orders'].value;
            var vendor=master_form.elements['vendor'].value;

            ////////////////filling in the content into the containers//////////////////////////

            var table_element=document.getElementById(form_id+'_body');
            var total_items=$(table_element).find('tr').length;

            logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"' style='height:98%;margin-left:10%'>";
            business_title.innerHTML=bt;

            $(mts_barcode).JsBarcode(mts_num,{displayValue:false});

            mts_title.innerHTML="Gate-Pass";

            employee_text="<td>Co-loader: "+coloader+"</td><td>Vendor: "+vendor+"</td>";
            mts_text="<td>pass #: "+mts_num+"</td><td>Date: "+mts_date+"</td><td>Total Orders: "+num_orders+"</td>";
            detail_text="<table style='border:none;width:98%;font-size:11px;'><tr>"+employee_text+"</tr><tr>"+mts_text+"</tr></table>";

            detail_section.innerHTML=detail_text;

            var new_table=document.createElement('table');
            new_table.setAttribute('style','font-size:10px;border:none;text-align:left;');
            new_table.setAttribute('class','printing_tables');

            var table_header="<tr style='border-top: 1px solid #000000;'><td style='text-align:left;width:6%'>S.No.</td>"+
                        "<td style='text-align:left;width:35%'>AWB #</td>"+
                        "<td style='text-align:left;width:20%'>Pieces</td>"+
                        "<td style='text-align:left;width:35%'>Product</td></tr>";

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

                table_rows+="<tr style='border-top: 1px solid #000000;height:60px;'><td><div>"+counter+"</div></td>"+
                        "<td><div style='text-align:left;'>"+cnote_no.innerHTML+"</div></td>"+
                        "<td><div style='text-align:left;'>"+form.elements[1].value+"</div></td>"+
                        "<td><div style='text-align:left;'>"+form.elements[2].value+"</div></td></tr>";				
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