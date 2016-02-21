<div id='form321' class='function_detail'>
	<form id='form321_master' autocomplete="off">
		<fieldset>
			<label>Manifest # <br><input type='text' name='manifest_num' required></label>
			<label>Date<br><input type='text' name='date'></label>
			<label>Co-loader<br><input type='text' name='loader'></label>
            <label>Vendor<br><input type='text' name='vendor'></label>
			<label># of Orders<br><input type='number' readonly='readonly' name='num_orders'></label>
			<label>	<input type='button' title='Save Manifest' name='save' class='save_icon'></label>
			<label>	<input type='hidden' name='id'>
					<input type='hidden' name='saved'>
				<input type='submit' class='submit_hidden'>
			</label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form321_header'></form>
					<th style='width:50px'>S. No.</th>
					<th>AWB #</th>
					<th>Order #</th>
					<th>Product Name</th>
					<th>Destination</th>
					<th>Status</th>
					<th><input type='button' form='form321_header' title='Add item' class='add_icon' onclick='form321_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form321_body'>
		</tbody>
		<tfoot id='form321_foot'>
		</tfoot>
	</table>
    
    <script>
        function form321_header_ini()
        {
            var fields=document.getElementById('form321_master');

            var manifest_filter=fields.elements['manifest_num'];
            var coloader=fields.elements['loader'];
            var vendor=fields.elements['vendor'];
            var date=fields.elements['date'];
            
            fields.elements['saved'].value='no';
            fields.elements['id'].value=get_new_key();

            var save_button=fields.elements['save'];
            manifest_filter.value="";
            coloader.value="";
            vendor.value="";
            $(date).datepicker();
            date.value=get_my_date();

            var manifest_id=$("#form321_link").attr('data_id');
            if(manifest_id==null)
                manifest_id="";	

            if(manifest_id=="")
            {
                var manifest_num_data="<user_preferences count='1'>"+
                                "<value></value>"+
                                "<name exact='yes'>manifest_num</name>"+
                                "</user_preferences>";
                set_my_value(manifest_num_data,manifest_filter);	
            }

            $(save_button).off('click');
            $(save_button).on("click", function(event)
            {
                event.preventDefault();
                form321_update_form();
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
                form321_add_item();
            });
        }

        function form321_ini()
        {
            var manifest_id=$("#form321_link").attr('data_id');
            if(manifest_id==null)
                manifest_id="";	
            $('#form321_body').html("");
            $('#form321_foot').html("");

            if(manifest_id!="")
            {
                show_loader();
                var manifest_columns="<manifests>" +
                        "<id>"+manifest_id+"</id>" +
                        "<manifest_num></manifest_num>"+
                        "<coloader></coloader>"+
                        "<vendor></vendor>"+
                        "<date></date>"+
                        "<num_orders></num_orders>"+
                        "</manifests>";

                fetch_requested_data('',manifest_columns,function(manifest_results)
                {
                    var filter_fields=document.getElementById('form321_master');
                    if(manifest_results.length>0)
                    {
                        filter_fields.elements['manifest_num'].value=manifest_results[0].manifest_num;
                        filter_fields.elements['loader'].value=manifest_results[0].coloader;
                        filter_fields.elements['vendor'].value=manifest_results[0].vendor;
                        filter_fields.elements['date'].value=get_my_past_date(manifest_results[0].date);
                        filter_fields.elements['id'].value=manifest_results[0].id;
                        filter_fields.elements['num_orders'].value=manifest_results[0].num_orders;
                        filter_fields.elements['saved'].value='yes';

                        filter_fields.elements['branch'].setAttribute('readonly','readonly');

                        var save_button=filter_fields.elements['save'];
                        $(save_button).show();

                        var manifest_items_column="<logistics_orders>" +
                                            "<id></id>" +
                                            "<awb_num></awb_num>" +
                                            "<manifest_type></manifest_type>" +
                                            "<order_num></order_num>" +
                                            "<ship_to></ship_to>" +
                                            "<address1></address1>" +
                                            "<address2></address2>" +
                                            "<city></city>" +
                                            "<pincode></pincode>" +
                                            "<phone></phone>" +
                                            "<status></status>" +
                                            "<product_name></product_name>" +
                                            "<manifest_num exact='yes'>"+manifest_results[0].manifest_num+"</manifest_num>" +
                                            "<manifest_id exact='yes'>"+manifest_id+"</manifest_id>" +
                                            "</logistics_orders>";

                        /////////////////////////////////////////////////////////////////////////

                        fetch_requested_data('',manifest_items_column,function(results)
                        {
                            results.forEach(function(result)
                            {
                                var id=result.id;
                                var rowsHTML="<tr>";

                                var address=result.ship_to+"\n"+result.address1+", "+result.address2+", "+result.city+"-"+result.pincode;
                                if(result.address2=="--" || result.address2==result.address1)
                                {
                                    var address=result.ship_to+"\n"+result.address1+", "+result.city+"-"+result.pincode;
                                }						
                                rowsHTML+="<form id='form321_"+id+"'></form>";
                                    rowsHTML+="<td data-th='S.No.'>";
                                    rowsHTML+="</td>";
                                    rowsHTML+="<td data-th='AWB #'>";
                                        rowsHTML+="<input type='text' readonly='readonly' form='form321_"+id+"' value='"+result.awb_num+"'>";
                                    rowsHTML+="</td>";
                                    rowsHTML+="<td data-th='Order #'>";
                                        rowsHTML+="<input type='text' readonly='readonly' form='form321_"+id+"' value='"+result.order_num+"'>";
                                    rowsHTML+="</td>";
                                    rowsHTML+="<td data-th='Product Name'>";
                                        rowsHTML+="<input type='text' readonly='readonly' form='form321_"+id+"' value='"+result.product_name+"'>";
                                    rowsHTML+="</td>";
                                    rowsHTML+="<td data-th='Destination'>";
                                        rowsHTML+="<textarea readonly='readonly' form='form321_"+id+"'>"+address+"</textarea>";
                                    rowsHTML+="</td>";
                                    rowsHTML+="<td data-th='Status'>";
                                        rowsHTML+="<input type='text' readonly='readonly' form='form321_"+id+"' value='"+result.status+"'>";
                                    rowsHTML+="</td>";
                                    rowsHTML+="<td data-th='Action'>";
                                        rowsHTML+="<input type='hidden' form='form321_"+id+"' value='"+id+"'>";
                                        rowsHTML+="<input type='button' class='submit_hidden' form='form321_"+id+"' id='save_form321_"+id+"'>";
                                        rowsHTML+="<input type='button' class='delete_icon' form='form321_"+id+"' id='delete_form321_"+id+"' onclick='form321_delete_item($(this));'>";
                                    rowsHTML+="</td>";			
                                rowsHTML+="</tr>";

                                $('#form321_body').append(rowsHTML);

                                var item_form=document.getElementById('form321_'+id);
                                var save_button=item_form.elements[6];

                                $(save_button).on('click',function (e) 
                                {
                                    e.preventDefault();
                                    form321_update_item(item_form);
                                });
                            });

                            form321_update_serial_numbers();
                            $('textarea').autosize();
                            hide_loader();
                        });
                    }
                });
            }
        }

        function form321_add_item()
        {
            if(is_create_access('form321'))
            {
                var id=get_new_key();
                var rowsHTML="<tr>";
                rowsHTML+="<form id='form321_"+id+"'></form>";
                    rowsHTML+="<td data-th='S.No.'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='AWB #'>";
                        rowsHTML+="<input type='text' required form='form321_"+id+"' oninvalid=\"setCustomValidity('This AWB # is invalid')\">";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Order #'>";
                        rowsHTML+="<input type='text' readonly='readonly' form='form321_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Product Name'>";
                        rowsHTML+="<input type='text' readonly='readonly' form='form321_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Destination'>";
                        rowsHTML+="<textarea readonly='readonly' form='form321_"+id+"'></textarea>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Status'>";
                        rowsHTML+="<input type='text' readonly='readonly' form='form321_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Action'>";
                        rowsHTML+="<input type='hidden' form='form321_"+id+"' value='"+id+"'>";
                        rowsHTML+="<input type='button' class='submit_hidden' form='form321_"+id+"' id='save_form321_"+id+"'>";
                        rowsHTML+="<input type='button' class='delete_icon' form='form321_"+id+"' id='delete_form321_"+id+"' onclick='$(this).parent().parent().remove(); form321_update_serial_numbers();'>";
                        rowsHTML+="<input type='hidden' form='form321_"+id+"' value='' name='order_history'>";
                    rowsHTML+="</td>";			
                rowsHTML+="</tr>";

                $('#form321_body').prepend(rowsHTML);

                var item_form=document.getElementById('form321_'+id);
                var awb_filter=item_form.elements[0];
                var order_filter=item_form.elements[1];
                var product_filter=item_form.elements[2];
                var address_filter=item_form.elements[3];
                var status_filter=item_form.elements[4];
                var id_filter=item_form.elements[5];
                var save_button=item_form.elements[6];
                var history_filter=item_form.elements[8];

                var new_manifest=true;
                var saved=document.getElementById('form321_master').elements['saved'].value;
                if(saved=='yes')
                {
                    new_manifest=false;
                }

                $(item_form).on("submit", function(event)
                {
                    event.preventDefault();
                    var total_entries=0;
                    var double_entry=0;
                    $("[id^='save_form321']").each(function(index)
                    {
                        var subform_id=$(this).attr('form');
                        var subform=document.getElementById(subform_id);
                        total_entries+=1;
                        if(subform.elements[0].value==awb_filter.value)	
                            double_entry+=1;
                    });

                    if(total_entries==1 && new_manifest)
                    {
                        form321_create_form(function()
                        {
                            if(double_entry<2)
                            {
                                form321_create_item(item_form);
                                form321_add_item();
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
                            form321_create_item(item_form);
                            form321_add_item();
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
                        $("[id^='save_form321']").each(function(index)
                        {
                            var subform_id=$(this).attr('form');
                            var subform=document.getElementById(subform_id);

                            total_entries+=1;

                            if(subform.elements[0].value==awb_filter.value)	
                                double_entry+=1;
                        });

                        if(total_entries==1 && new_manifest)
                        {
                            form321_create_form(function () 
                            {
                                if(double_entry<2)
                                {
                                    var orders_data="<logistics_orders count='1'>"+
                                                    "<id></id>"+
                                                    "<address1></address1>"+
                                                    "<address2></address2>"+
                                                    "<city></city>"+
                                                    "<pincode></pincode>"+
                                                    "<awb_num exact='yes'>"+awb_filter.value+"</awb_num>" +
                                                    "<manifest_type></manifest_type>" +
                                                    "<order_num></order_num>" +
                                                    "<product_name></product_name>" +
                                                    "<merchant_name></merchant_name>" +
                                                    "<ship_to></ship_to>" +
                                                    "<phone></phone>" +
                                                    "<drs_num></drs_num>" +
                                                    "<status array='yes'>--received--undelivered--pending--</status>"+
                                                    "<order_history></order_history>"+
                                                    "</logistics_orders>";
                                    //console.log(orders_data);				
                                    fetch_requested_data('',orders_data,function (orders) 
                                    {
                                        //console.log(orders);
                                        if(orders.length>0)
                                        {
                                            address_filter.value=orders[0].ship_to+"\n"+orders[0].address1+", "+orders[0].address2+", "+orders[0].city+"-"+orders[0].pincode;
                                            order_filter.value=orders[0].order_num;
                                            product_filter.value=orders[0].product_name;
                                            status_filter.value=orders[0].status;
                                            id_filter.value=orders[0].id;
                                            history_filter.value=orders[0].order_history;
                                            form321_create_item(item_form);
                                            form321_add_item();
                                        }
                                        else 
                                        {
                                            address_filter.value="";
                                            order_filter.value="";
                                            product_filter.value="";
                                            status_filter.value="";
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
                                var orders_data="<logistics_orders count='1'>"+
                                                "<id></id>"+
                                                "<address1></address1>"+
                                                "<address2></address2>"+
                                                "<city></city>"+
                                                "<pincode></pincode>"+
                                                "<awb_num exact='yes'>"+awb_filter.value+"</awb_num>" +
                                                "<manifest_type></manifest_type>" +
                                                "<order_num></order_num>" +
                                                "<product_name></product_name>" +
                                                "<merchant_name></merchant_name>" +
                                                "<ship_to></ship_to>" +
                                                "<phone></phone>" +
                                                "<drs_num></drs_num>" +
                                                "<status array='yes'>--received--undelivered--pending--</status>"+
                                                "<order_history></order_history>"+
                                                "</logistics_orders>";
                                //console.log(orders_data);				
                                fetch_requested_data('',orders_data,function (orders) 
                                {
                                    //console.log(orders);
                                    if(orders.length>0)
                                    {
                                        address_filter.value=orders[0].ship_to+"\n"+orders[0].address1+", "+orders[0].address2+", "+orders[0].city+"-"+orders[0].pincode;
                                        order_filter.value=orders[0].order_num;
                                        product_filter.value=orders[0].product_name;
                                        status_filter.value=orders[0].status;
                                        id_filter.value=orders[0].id;
                                        history_filter.value=orders[0].order_history;	
                                        form321_create_item(item_form);
                                        form321_add_item();
                                    }
                                    else 
                                    {
                                        address_filter.value="";
                                        order_filter.value="";
                                        product_filter.value="";
                                        status_filter.value="";
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
                form321_update_serial_numbers();
            }
            else
            {
                $("#modal2").dialog("open");
            }
        }

        function form321_create_item(form)
        {
            //console.log('form321_create_form');
            if(is_create_access('form321'))
            {
                var master_form=document.getElementById('form321_master');
                var manifest_num=master_form.elements['manifest_num'].value;
                var manifest_id=master_form.elements['id'].value;
                var manifest_date=master_form.elements['date'].value;
                var coloader=master_form.elements['loader'].value;
                var vendor=master_form.elements['vendor'].value;
                var num_orders=master_form.elements['num_orders'].value;

                var data_id=form.elements[5].value;
                var save_button=form.elements[6];
                var del_button=form.elements[7];

                var old_order_history=form.elements[8].value;

                var order_history=[];
                if(old_order_history!="")
                    order_history=JSON.parse(old_order_history);
                var history_object=new Object();
                history_object.timeStamp=get_my_time();
                history_object.details="Order in-transit";
                history_object.location=state;
                history_object.status="in-transit";
                order_history.push(history_object);
                var order_history_string=JSON.stringify(order_history);		

                var last_updated=get_my_time();
                var data_xml="<logistics_orders>" +
                            "<id>"+data_id+"</id>" +
                            "<status>in-transit</status>" +
                            "<manifest_num>"+manifest_num+"</manifest_num>"+
                            "<manifest_id>"+manifest_id+"</manifest_id>"+
                            "<order_history>"+order_history_string+"</order_history>"+
                            "<last_updated>"+last_updated+"</last_updated>" +
                            "</logistics_orders>";
                update_simple(data_xml);

                for(var i=0;i<6;i++)
                {
                    $(form.elements[i]).attr('readonly','readonly');
                }
                del_button.removeAttribute("onclick");
                $(del_button).on('click',function(event)
                {
                    form321_delete_item(del_button);
                });

                $(save_button).off('click');
                $(save_button).on('click',function(event)
                {
                    event.preventDefault();
                    form321_update_item(form);
                });
            }
            else
            {
                $("#modal2").dialog("open");
            }
        }

        function form321_create_form(func)
        {
            if(is_create_access('form321'))
            {
                var form=document.getElementById("form321_master");

                var manifest_num=form.elements['manifest_num'].value;
                var coloader=form.elements['loader'].value;
                var vendor=form.elements['vendor'].value;
                var date=get_raw_time(form.elements['date'].value);
                var data_id=form.elements['id'].value;
                var num_orders=form.elements['num_orders'].value;
                
                var save_button=form.elements['save'];
                var last_updated=get_my_time();

                var manifest_columns="<manifests count='1'>" +
                            "<manifest_num exact='yes'>"+manifest_num+"</manifest_num>"+
                            "</manifests>";		
                get_single_column_data(function(manifests)
                {
                    if(manifests.length==0)
                    {	
                        var data_xml="<manifests>" +
                                    "<id>"+data_id+"</id>" +
                                    "<manifest_num>"+manifest_num+"</manifest_num>"+
                                    "<coloader>"+coloader+"</coloader>"+
                                    "<date>"+date+"</date>"+
                                    "<vendor>"+vendor+"</vendor>"+
                                    "<num_orders>"+num_orders+"</num_orders>"+
                                    "<last_updated>"+last_updated+"</last_updated>" +
                                    "</manifests>";
                        var activity_xml="<activity>" +
                                    "<data_id>"+data_id+"</data_id>" +
                                    "<tablename>manifests</tablename>" +
                                    "<link_to>form322</link_to>" +
                                    "<title>Created</title>" +
                                    "<notes>Manifest # "+manifest_num+"</notes>" +
                                    "<updated_by>"+get_name()+"</updated_by>" +
                                    "</activity>";
                        var num_data="<user_preferences>"+
                                    "<id></id>"+						
                                    "<name exact='yes'>manifest_num</name>"+
                                    "</user_preferences>";
                        get_single_column_data(function (manifest_num_ids)
                        {
                            if(manifest_num_ids.length>0)
                            {
                                var num_xml="<user_preferences>"+
                                                "<id>"+manifest_num_ids[0]+"</id>"+
                                                "<value>"+(parseInt(manifest_num)+1)+"</value>"+
                                                "<last_updated>"+last_updated+"</last_updated>"+
                                                "</user_preferences>";
                                update_simple(num_xml);
                            }
                        },num_data);

                        create_row(data_xml,activity_xml);

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
                },manifest_columns);
            }
            else
            {
                $("#modal2").dialog("open");
            }
        }

        function form321_update_item(form)
        {
            if(is_update_access('form321'))
            {
                var manifest_num=document.getElementById('form321_master').elements['manifest_num'].value;
                var data_id=form.elements[5].value;
                var last_updated=get_my_time();

                var data_xml="<logistics_orders>" +
                            "<id>"+data_id+"</id>" +
                            "<manifest_num>"+manifest_num+"</manifest_num>"+
                            "<last_updated>"+last_updated+"</last_updated>" +
                            "</logistics_orders>";
                update_simple(data_xml);
            }
            else
            {
                $("#modal2").dialog("open");
            }
        }


        /**
         * @form Manage Transit manifests
         * @param button
         */
        function form321_update_form()
        {
            if(is_create_access('form321'))
            {
                var form=document.getElementById("form321_master");

                var manifest_num=form.elements['manifest_num'].value;
                var coloader=form.elements['loader'].value;
                var vendor=form.elements['vendor'].value;
                var num_orders=form.elements['num_orders'].value;
                var date=get_raw_time(form.elements['date'].value);
                var data_id=form.elements['id'].value;

                var save_button=form.elements['save'];
                var last_updated=get_my_time();

                var manifest_columns="<manifests count='2'>" +
                            "<id></id>"+
                            "<manifest_num exact='yes'>"+manifest_num+"</manifest_num>"+
                            "</manifests>";		
                fetch_requested_data('',manifest_columns,function(manifests)
                {
                    if(manifests.length==0 || (manifests.length==1 && manifests[0].id==data_id))
                    {
                        var data_xml="<manifests>" +
                                    "<id>"+data_id+"</id>" +
                                    "<manifest_num>"+manifest_num+"</manifest_num>"+
                                    "<coloader>"+coloader+"</coloader>"+
                                    "<vendor>"+vendor+"</vendor>"+
                                    "<num_orders>"+num_orders+"</num_orders>"+
                                    "<date>"+date+"</date>"+
                                    "<last_updated>"+last_updated+"</last_updated>" +
                                    "</manifests>";
                        var activity_xml="<activity>" +
                                    "<data_id>"+data_id+"</data_id>" +
                                    "<tablename>manifests</tablename>" +
                                    "<link_to>form322</link_to>" +
                                    "<title>Updated</title>" +
                                    "<notes>Manifest # "+manifest_num+"</notes>" +
                                    "<updated_by>"+get_name()+"</updated_by>" +
                                    "</activity>";
                        update_row(data_xml,activity_xml);


                        $("[id^='save_form321_']").click();
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

        function form321_delete_item(button)
        {
            if(is_delete_access('form321'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var data_id=form.elements[5].value;
                    var last_updated=get_my_time();
                    var data_xml="<logistics_orders>" +
                                "<id>"+data_id+"</id>" +
                                "<status>received</status>" +
                                "<manifest_num></manifest_num>"+
                                "<manifest_id></manifest_id>"+
                                "<last_updated>"+last_updated+"</last_updated>" +
                                "</logistics_orders>";
                    update_simple(data_xml);
                    $(button).parent().parent().remove();
                    form321_update_serial_numbers();
                });
            }
            else
            {
                $("#modal2").dialog("open");
            }
        }

        function form321_update_serial_numbers()
        {
            $('#form321_body').find('tr').each(function(index)
            {
                $(this).find('td:nth-child(2)').html(index+1);
            });

            var num_orders=0;
            $("[id^='save_form321']").each(function(index)
            {
                var subform_id=$(this).attr('form');
                var subform=document.getElementById(subform_id);

                if(subform.elements[0].value!="")
                {
                    num_orders+=1;			
                }
            });

            var form=document.getElementById("form321_master");
            form.elements['num_orders'].value=num_orders;
        }

    </script>
</div>