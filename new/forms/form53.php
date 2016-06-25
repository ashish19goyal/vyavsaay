<div id='form53' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form53_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form53_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form53_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form53_header'></form>
						<th><input type='text' placeholder="Bill #" class='floatlabel' name='bill' form='form53_header'></th>
						<th><input type='text' placeholder="Supplier" class='floatlabel' name='supplier' form='form53_header'></th>
						<th><input type='text' placeholder="Bill Date" readonly='readonly' name='date' form='form53_header'></th>
						<th><input type='text' placeholder="Bill Total" readonly="readonly" form='form53_header'></th>
            <th><input type='text' placeholder="Notes" readonly="readonly" form='form53_header'></th>
						<th><input type='submit' form='form53_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form53_body'>
			</tbody>
		</table>
	</div>

    <script>
        function form53_header_ini()
        {
            var filter_fields=document.getElementById('form53_header');
            var bill_filter=filter_fields.elements['bill'];
            var name_filter=filter_fields.elements['supplier'];

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form53_ini();
            });

            var bill_data={data_store:'supplier_bills',return_column:'bill_id'};
            var sup_data={data_store:'suppliers',return_column:'acc_name'};

            set_my_filter_json(bill_data,bill_filter);
            set_my_filter_json(sup_data,name_filter);
        };

        function form53_ini()
        {
            show_loader();
            var fid=$("#form53_link").attr('data_id');
            if(fid==null)
                fid="";

            $('#form53_body').html("");

            var filter_fields=document.getElementById('form53_header');
            var fbill_id=filter_fields.elements['bill'].value;
            var fname=filter_fields.elements['supplier'].value;

            var paginator=$('#form53_body').paginator();

						var columns=new Object();
								columns.count=paginator.page_size();
								columns.start_index=paginator.get_index();
								columns.data_store='supplier_bills';

								columns.indexes=[{index:'id',value:fid},
												{index:'bill_id',value:fbill_id},
												{index:'supplier',value:fname},
												{index:'bill_date'},
												{index:'total'},
                        {index:'notes'},
                        {index:'order_id'}];

            read_json_rows('form53',columns,function(results)
            {
                results.forEach(function(result)
                {
                    var rowsHTML="";
                    rowsHTML+="<tr>";
                        rowsHTML+="<form id='form53_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='Bill Number'>";
                                rowsHTML+="<a onclick=\"element_display('"+result.id+"','form21',['form122','form136','form158','form192','form270','form295','form333']);\"><input type='text' readonly='readonly' class='input_link' form='form53_"+result.id+"' value='"+result.bill_id+"'></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Supplier'>";
                                rowsHTML+="<a onclick=\"show_object('suppliers','"+result.supplier+"');\"><textarea readonly='readonly' form='form53_"+result.id+"'>"+result.supplier+"</textarea></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Bill Date'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form53_"+result.id+"' value='"+get_my_past_date(result.bill_date)+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Total'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form53_"+result.id+"' value='"+Math.round(result.total)+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Notes'>";
                                rowsHTML+="<textarea readonly='readonly' form='form53_"+result.id+"'>"+result.notes+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form53_"+result.id+"' value='"+result.id+"'>";
                                rowsHTML+="<button type='button' class='btn red' form='form53_"+result.id+"' title='Delete Bill' onclick='form53_delete_item($(this));' name='delete'><i class='fa fa-trash'></i></button>";
                                rowsHTML+="<input type='hidden' form='form53_"+result.id+"' value='"+result.order_id+"'>";
                                if(result.notes=='pending approval')
                                    rowsHTML+="<button type='button' class='btn default yellow-stripe' form='form53_"+result.id+"' title='Approve Bill' onclick='form53_approve_item($(this))'>Approve</button>";
                            rowsHTML+="</td>";
                    rowsHTML+="</tr>";

                    $('#form53_body').append(rowsHTML);
                });

                $('#form53').formcontrol();
								paginator.update_index(results.length);
								initialize_tabular_report_buttons(columns,'Purchase Bills','form53',function (item)
                {
                    item.bill_date=get_my_past_date(item.bill_date);
                    delete item.order_id;
                });
								hide_loader();
            });
        }

        function form53_delete_item(button)
        {
            if(is_delete_access('form53'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var bill_id=form.elements[0].value;
                    var supplier=form.elements[1].value;
                    var data_id=form.elements[5].value;
                    var order_id=form.elements[7].value;
                    var last_updated=get_my_time();
                    var bill_json={data_store:'supplier_bills',
                        log:'yes',
                        data:[{index:'id',value:data_id}],
                        log_data:{title:'Deleted',notes:'Purchase bill # '+bill_id,link_to:'form53'}};

                    var transaction_json={data_store:'transactions',
                        data:[{index:'id',value:data_id}]};
                    var return_bill_json={data_store:'supplier_returns',
                        data:[{index:'id',value:data_id}]};

					var t2_json={data_store:'transactions',
							data:[{index:'receipt_source_id',value:data_id}]};

					var receipt_json={data_store:'receipts',
							data:[{index:'source_id',value:data_id}]};

					delete_json(t2_json);
					delete_json(receipt_json);

                    delete_json(bill_json);
                    delete_json(transaction_json);
                    delete_json(return_bill_json);
                    $(button).parent().parent().remove();

                    var items_data={data_store:'supplier_bill_items',
                        data:[{index:'bill_id',value:data_id}]};
                    delete_json(items_data);

                    var return_items_data={data_store:'supplier_return_items',
                        data:[{index:'return_id',value:data_id}]};
                    delete_json(return_items_data);


                    var po_data={data_store:'purchase_orders',
                                indexes:[{index:'id',value:order_id},
                                        {index:'bill_id'},
                                        {index:'total_quantity'},
                                        {index:'quantity_received'},
                                        {index:'quantity_accepted'}]};
                    read_json_rows('',po_data,function (porders)
                    {
                        if(porders.length>0)
                        {
                            var id_object_array=vUtil.jsonParse(porders[0].bill_id);

                            for(var k in id_object_array)
                            {
                                if(id_object_array[k].bill_id==data_id)
                                {
                                    id_object_array.splice(k,1);
                                    k-=1;
                                }
                            }

                            var quantity_accepted=0;
                            var quantity_received=0;
                            var quantity_qc_pending=0;

                            for(var x in id_object_array)
                            {
                                quantity_received+=parseFloat(id_object_array[x].total_received);
                                quantity_accepted+=parseFloat(id_object_array[x].total_accepted);
                            }

                            if(porders[0].quantity_received=="" || porders[0].quantity_received=='null')
                            {
                                porders[0].quantity_received=0;
                            }

                            if(parseFloat(porders[0].quantity_received)>quantity_received)
                            {
                                quantity_qc_pending=parseFloat(porders[0].quantity_received)-quantity_received;
                                quantity_received=parseFloat(porders[0].quantity_received);
                            }

                            var status='partially received';
                            if(parseFloat(porders[0].total_quantity)<=quantity_accepted)
                            {
                                status='received';
                            }

                            var new_bill_id=JSON.stringify(id_object_array);

                            var po_json={data_store:'purchase_orders',
                                            data:[{index:'id',value:order_id},
                                                 {index:'bill_id',value:new_bill_id},
                                                 {index:'quantity_received',value:quantity_received},
                                                 {index:'quantity_accepted',value:quantity_accepted},
                                                 {index:'quantity_qc_pending',value:quantity_qc_pending},
                                                 {index:'status',value:status},
                                                 {index:'last_updated',value:last_updated}]};
                            update_json(po_json);
                        }
                    });
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form53_approve_item(button)
        {
            if(is_update_access('form53'))
            {
                $(button).hide();
                var form_id=$(button).attr('form');
                var form=document.getElementById(form_id);
                var bill_num=form.elements[0].value;
                var bill_id=form.elements[5].value;
                form.elements[4].value='approved';
                var last_updated=get_my_time();

                var data_json={data_store:'supplier_bills',
						 				log:'yes',
						 				data:[{index:'id',value:bill_id},
						 					{index:'notes',value:'approved'},
						 					{index:'last_updated',value:last_updated}],
						 				log_data:{title:'Approved',notes:'Purchase bill # '+bill_num,link_to:'form53'}};
 								update_json(data_json);
            }
            else
            {
                $("#modal2_link").click();
            }
        }

    </script>
</div>
