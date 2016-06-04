<div id='form336' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
        <div class='caption'>
            <div class='col-md-6'><input type='text' style='height:30px;' id='form336_manifest_num' placeholder='Scan Manifest #' required></div>
            <div class='col-md-6'><a class="btn btn-circle grey btn-outline btn-sm" onclick=form336_add_items();> <i class='fa fa-plus'></i> Select Orders</a></div>
		</div>
        <div class="actions">
            <a class='btn grey btn-outline btn-sm' id='form336_save'>Save <i class='fa fa-save'></i></a>
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form336_print' onclick='form336_print_form();'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li>
                        <a id='form336_csv'><i class='fa fa-file-excel-o'></i> Download</a>
                    </li>
                    <li>
                        <a id='form336_share'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>
	
	<div class="portlet-body">
        <form id='form336_master' autocomplete="off">
            <fieldset>
                <label><input type='text' required name='pass_num' class='floatlabel' placeholder='Pass #'></label>
                <label><input type='text' name='date' required class='floatlabel' placeholder='Date'></label>
                <label><input type='text' name='loader' class='floatlabel' placeholder='Co-loader'></label>
                <label><input type='text' name='vendor' class='floatlabel' placeholder='Vendor'></label>
                <label><input type='text' name='num' readonly='readonly' class='floatlabel' placeholder='No. of Orders'></label>
                <input type='hidden' name='id'>
                <input type='submit' class='submit_hidden'>
            </fieldset>
        </form>
        
        <br>
		
        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr style='color:#9a9a9a;'>
                    <th>S.No.</th>
                    <th>AWB #</th>
                    <th>Details</th>
					<th>Pieces</th>
					<th>Product</th>
					<th></th>
				</tr>
			</thead>
			<tbody id='form336_body'>
			</tbody>
        </table>
    </div>
    
    <script>
        function form336_header_ini()
        {
            var fields=document.getElementById('form336_master');

            var pass_filter=fields.elements['pass_num'];
            var coloader=fields.elements['loader'];
            var vendor=fields.elements['vendor'];
            var date=fields.elements['date'];
            var num_orders=fields.elements['num'];
            num_orders.value=0;
            fields.elements['id'].value=get_new_key();

            var save_button=document.getElementById('form336_save');
            pass_filter.value="";
            coloader.value="";
            vendor.value="";
            $(date).datepicker();
            date.value=vTime.date();

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
                form336_create_form();
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
                form336_add_item();
            });
            
            $('#form336_manifest_num').val('');
            $('#form336_manifest_num').off('keyup');
            $('#form336_manifest_num').on('keyup',function(e)
            {
                if(e.keyCode==13)
                {
                    e.preventDefault();
                    form336_add_items();
                }
            });
            
            var paginator=$('#form336_body').paginator({visible:false});        

            $('#form336').formcontrol();
        }

        function form336_ini()
        {
            var pass_id=$("#form336_link").attr('data_id');
            if(pass_id==null)
                pass_id="";	
            $('#form336_body').html("");
            
            if(pass_id!="")
            {
                show_loader();
                var pass_columns={data_store:'gate_pass',count:1,
                                     indexes:[{index:'id',value:pass_id},
                                             {index:'pass_num'},
                                             {index:'coloader'},
                                             {index:'vendor'},
                                            {index:'num_orders'},
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
                        filter_fields.elements['num'].value=pass_results[0].num_orders;
                        
                        var save_button=document.getElementById('form336_save');
                        $(save_button).off('click');
                        $(save_button).on("click", function(event)
                        {
                            event.preventDefault();
                            form336_update_form();
                        });
                    }
                });
                        
                var pass_items_column={data_store:'logistics_orders',
                                          indexes:[{index:'id'},
                                                  {index:'awb_num'},
                                                  {index:'sku'},
                                                  {index:'pieces'},
                                                  {index:'weight'}, 
                                                  {index:'pass_num'},
                                                  {index:'lbh'},
												  {index:'weight'}, 
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
							    rowsHTML+="<a onclick=\"element_display('','form198');form198_ini('"+result.awb_num+"');\"><input type='text' readonly='readonly' form='form336_"+id+"' value='"+result.awb_num+"'></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Details'>";
                                rowsHTML+="<input type='text' class='floatlabel' placeholder='LBH' readonly='readonly' form='form336_"+id+"' value='"+result.lbh+"'>";
                                rowsHTML+="<input type='text' class='floatlabel' placeholder='Weight' readonly='readonly' form='form336_"+id+"' value='"+result.weight+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Pieces'>";
                                rowsHTML+="<input type='number' step='any' readonly='readonly' form='form336_"+id+"' value='"+result.pieces+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Product'>";
                                rowsHTML+="<textarea type='text' readonly='readonly' form='form336_"+id+"'>"+result.sku+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' name='id' form='form336_"+id+"' value='"+id+"'>";
                                rowsHTML+="<input type='button' name='save' class='submit_hidden' form='form336_"+id+"' id='save_form336_"+id+"'>";
                                rowsHTML+="<button type='button' name='delete' class='btn red' form='form336_"+id+"' id='delete_form336_"+id+"' onclick='form336_delete_item($(this));'><i class='fa fa-trash'></i></button>";
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
                    $('#form336').formcontrol();
                    hide_loader();
                });
            }
        }

        function form336_add_items()
        {
            if(is_create_access('form336'))
            {
                var manifest_number= $('#form336_manifest_num').val();
               
                var pass_items_column={data_store:'logistics_orders',
                                          indexes:[{index:'id'},
                                                  {index:'awb_num'},
                                                  {index:'sku'},
                                                  {index:'pieces'},
                                                  {index:'weight'},
												  {index:'lbh'}, 
                                                  {index:'pass_num'},
                                                  {index:'manifest_num',exact:manifest_number}]};
                read_json_rows('form336',pass_items_column,function(results)
                {     
                    var orders_found=false;
                    var existing_orders=[];
                    $('#form336_body').find('form').each(function(index)
                    {
                        var form=$(this)[0];
                        var awb_num=form.elements[0].value;
                        existing_orders.push(awb_num);
                    });

                    results.forEach(function(result)
                    {
                        if(vUtil.isBlank(result.pass_num) && existing_orders.indexOf(result.awb_num)==-1)
                        {
                            orders_found=true;
                            var id=result.id;
                            var rowsHTML="<tr>";
                            
                            var address=result.city+", "+result.state;
                            rowsHTML+="<form id='form336_"+id+"'></form>";
                                rowsHTML+="<td data-th='S.No.'>";
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='AWB #'>";
                                    rowsHTML+="<input type='text' readonly='readonly' form='form336_"+id+"' value='"+result.awb_num+"'>";
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Details'>";
                                    rowsHTML+="<input type='text' class='floatlabel' placeholder='LBH' readonly='readonly' form='form336_"+id+"' value='"+result.lbh+"'>";
                                    rowsHTML+="<input type='text' class='floatlabel' placeholder='Weight' readonly='readonly' form='form336_"+id+"' value='"+result.weight+"'>";
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Pieces'>";
                                    rowsHTML+="<input type='number' step='any' readonly='readonly' form='form336_"+id+"' value='"+result.pieces+"'>";
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Product'>";
                                    rowsHTML+="<textarea type='text' readonly='readonly' form='form336_"+id+"'>"+result.sku+"</textarea>";
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Action'>";
                                    rowsHTML+="<input type='hidden' name='id' form='form336_"+id+"' value='"+id+"'>";
                                    rowsHTML+="<input type='button' name='save' class='submit_hidden' form='form336_"+id+"' id='save_form336_"+id+"'>";
                                    rowsHTML+="<button type='button' name='delete' class='btn red' form='form336_"+id+"' id='delete_form336_"+id+"' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
                                rowsHTML+="</td>";			
                            rowsHTML+="</tr>";

                            $('#form336_body').append(rowsHTML);
                            var item_form=document.getElementById('form336_'+id);
                            var save_button=item_form.elements['save'];

                            $(save_button).on('click',function (e) 
                            {
                                e.preventDefault();
                                form336_create_item(item_form);
                            });
                        }
                    });

                    if(!orders_found)
                    {
                        $('#modal95_link').click();
                    }

                    form336_update_serial_numbers();
                    $('#form336').formcontrol();
                    hide_loader();
                });
            }
            else
            {
                $("#modal2_link").click();
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
                
                var data_id=form.elements['id'].value;
                var save_button=form.elements['save'];
                var del_button=form.elements['delete'];

                var last_updated=get_my_time();
                
                var data_json={data_store:'logistics_orders',
	 				data:[{index:'id',value:data_id},
	 					{index:'pass_num',value:pass_num},
                        {index:'pass_id',value:pass_id},
	 					{index:'last_updated',value:last_updated}]};
 				update_json(data_json);
				
                $(form).readonly();
                
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
                $("#modal2_link").click();
            }
        }

        function form336_create_form(func)
        {
            if(is_create_access('form336'))
            {
                var form=document.getElementById("form336_master");
                form336_update_serial_numbers();
                
                var pass_num=form.elements['pass_num'].value;
                var coloader=form.elements['loader'].value;
                var vendor=form.elements['vendor'].value;
                var date=get_raw_time(form.elements['date'].value);
                var data_id=form.elements['id'].value;
                var num_orders=form.elements['num'].value;
                
                var save_button=document.getElementById('form336_save');
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
                                {index:'type',value:'non-bag'},
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

                        $(save_button).off('click');
                        $(save_button).on('click',function(e)
                        {
                            e.preventDefault();
                            form336_update_form();
                        });
                        
                        if(typeof func!='undefined')
                        {
                            func();
                        }
                        $("[id^='save_form336_']").click();
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
                $("#modal2_link").click();
            }
        }


        function form336_update_form()
        {
            if(is_create_access('form336'))
            {
                var form=document.getElementById("form336_master");
                form336_update_serial_numbers();
                
                var pass_num=form.elements['pass_num'].value;
                var coloader=form.elements['loader'].value;
                var vendor=form.elements['vendor'].value;
                var num_orders=form.elements['num'].value;
                var date=get_raw_time(form.elements['date'].value);
                var data_id=form.elements['id'].value;

                var save_button=document.getElementById('form336_save');
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
                        $("#modal77_link").click();
                    }
                });
            }
            else
            {
                $("#modal2_link").click();
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
                                {index:'last_updated',value:last_updated}]};
                    update_json(data_json);

                    $(button).parent().parent().remove();
                    form336_update_serial_numbers();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form336_update_serial_numbers()
        {
            $('#form336_body').find('tr').each(function(index)
            {
                $(this).find('td:nth-child(2)').html(index+1);
            });

            var num_orders=0;
            var filter_fields=document.getElementById('form336_master');

            var new_results=[];
            $('#form336_body').find('form').each(function(index)
            {
                var new_obj={};
                var form=$(this)[0];
                if(form.elements[0].value!="")
                {
                    var num_pieces=form.elements[2].value;
                    if(!vUtil.isBlank(num_pieces) && num_pieces!=0)
                        num_orders+=parseInt(num_pieces);
                    else
                        num_orders+=1;
                }
            
                new_obj['AWB No']=form.elements[0].value;
                new_obj['LBH']=form.elements[1].value;
                new_obj['Weight']=form.elements[2].value;
                new_obj['Pieces']=form.elements[3].value;
                new_obj['Product']=form.elements[4].value;
                new_results.push(new_obj);
            });

            filter_fields.elements['num'].value=num_orders;
            
            $('#form336_share').off('click');
            $('#form336_share').click(function()
            {
                var message_attachment=my_obj_array_to_csv_string(new_results);
                var subject='Gate Pass # '+filter_fields.elements['pass_num'].value;
                var body="Hi,\nPlease find attached the gate pass with this mail.\nCo-loader: "+filter_fields.elements['loader'].value+"\nVendor:"+filter_fields.elements['vendor'].value+"\nDate:"+filter_fields.elements['date'].value+"\n\nRegards,\nBeacon Couriers";

                modal209_action(subject,body,message_attachment);
            });

            $('#form336_csv').off('click');
            $('#form336_csv').click(function()
            {
                my_obj_array_to_csv(new_results,'Gate Pass # '+filter_fields.elements['pass_num'].value);
            });

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
            mts_title.setAttribute('style','display:block;width:98%;height:50px;text-align:center;font-size:40px;');
            detail_section.setAttribute('style','display:block;width:98%;height:30px;text-align:center;');

            ///////////////getting the content////////////////////////////////////////

            var bt=get_session_var('title');
            var font_size=get_session_var('print_size');
            var logo_image=get_session_var('logo');

            var master_form=document.getElementById(form_id+'_master');
            var mts_date=master_form.elements['date'].value;
            var mts_num=master_form.elements['pass_num'].value;
            var coloader=master_form.elements['loader'].value;
            var num_orders=master_form.elements['num'].value;
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
                        "<td style='text-align:left;width:25%'>AWB #</td>"+
                        "<td style='text-align:left;width:14%'>LBH</td>"+
                        "<td style='text-align:left;width:14%'>Weight</td>"+
                        "<td style='text-align:left;width:14%'>Pieces</td>"+
                        "<td style='text-align:left;width:25%'>Product</td></tr>";

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
                        "<td><div style='text-align:left;'>"+form.elements[2].value+"</div></td>"+
                        "<td><div style='text-align:left;'>"+form.elements[3].value+"</div></td>"+
                        "<td><div style='text-align:left;'>"+form.elements[4].value+"</div></td></tr>";				
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