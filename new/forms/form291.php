<div id='form291' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='modal155_action();'>Add <i class='fa fa-plus'></i></a>
            <a class='btn btn-circle grey btn-outline btn-sm' onclick='modal31_action();'>Delete <i class='fa fa-trash'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form291_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form291_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form291_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form291_header'></form>
						<th><input type='text' placeholder="Receipt Id" class='floatlabel' name='receipt' form='form291_header'></th>
						<th><input type='text' placeholder="Account" class='floatlabel' name='account' form='form291_header'></th>
						<th><input type='text' placeholder="Amount" readonly='readonly' name='amount' form='form291_header'></th>
						<th><input type='text' placeholder="Narration" class='floatlabel' name='narration' form='form291_header'></th>
						<th>
                            <input type='text' placeholder="Documents" readonly="readonly" name='docs' form='form291_header'>
                            <input type='submit' form='form291_header' class='submit_hidden'>
                        </th>
				</tr>
			</thead>
			<tbody id='form291_body'>
			</tbody>
		</table>
	</div>
    
    <script>
        function form291_header_ini()
        {
            var filter_fields=document.getElementById('form291_header');
            var id_filter=filter_fields.elements['receipt'];
            var account_filter=filter_fields.elements['account'];

            var id_data={data_store:'receipts',return_column:'receipt_id'};
            var account_data={data_store:'accounts',return_column:'acc_name'};

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form291_ini();
            });

            set_my_filter_json(id_data,id_filter);
            set_my_filter_json(account_data,account_filter);
        };

        function form291_ini()
        {
            show_loader();
            var fid=$("#form291_link").attr('data_id');
            if(fid==null)
                fid="";	

            $('#form291_body').html("");

            var filter_fields=document.getElementById('form291_header');
            var rid=filter_fields.elements['receipt'].value;
            var faccount=filter_fields.elements['account'].value;
            var fnarration=filter_fields.elements['narration'].value;

            var paginator=$('#form291_body').paginator();
			
			var columns=new Object();
					columns.count=paginator.page_size();
					columns.start_index=paginator.get_index();
					columns.data_store='receipts';
					columns.indexes=[{index:'id',value:fid},
									{index:'receipt_id',value:rid},
									{index:'acc_name',value:faccount},
									{index:'amount'},{index:'date'},
                                    {index:'narration',value:fnarration},
									{index:'type',exact:'received'}];
			
            read_json_rows('form291',columns,function(results)
            {            
                results.forEach(function(result)
                {
                    var rowsHTML="<tr>";
                        rowsHTML+="<form id='form291_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='Receipt Id'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form291_"+result.id+"' value='"+result.receipt_id+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Account'>";
                                rowsHTML+="<textarea readonly='readonly' form='form291_"+result.id+"'>"+result.acc_name+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Amount'>";
                                rowsHTML+="<input type='number' class='floatlabel' placeholder='Rs.' readonly='readonly' form='form291_"+result.id+"' value='"+result.amount+"'>";
                                rowsHTML+="<input type='hidden' form='form291_"+result.id+"' value='"+result.id+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Narration'>";
                                rowsHTML+="<input type='text' class='floatlabel' placeholder='Issued On' value='"+get_my_past_date(result.date)+"' readonly='readonly'>";
                                rowsHTML+="<textarea readonly='readonly' form='form291_"+result.id+"' class='floatlabel' placeholder='Details'>"+result.narration+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Document'>";
                                rowsHTML+="<div id='form291_documents_"+result.id+"'></div>";
                                rowsHTML+="<a title='Add document' class='btn btn-circle btn-icon-only grey-cascade' id='form291_add_document_"+result.id+"'><i class='fa fa-plus'></i></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<button type='button' class='btn yellow-saffron' form='form291_"+result.id+"' value='Print Receipt' name='print'><i class='fa fa-print'></i></button>";
                                rowsHTML+="<button type='button' form='form291_"+result.id+"' value='Email Receipt' class='btn red-haze' name='email'><i class='fa fa-envelope'></i></button>";
                                rowsHTML+="<input type='hidden' form='form291_"+result.id+"' name='address'>";
                            rowsHTML+="</td>";				
                    rowsHTML+="</tr>";

                    $('#form291_body').append(rowsHTML);
                    var fields=document.getElementById('form291_'+result.id);
                    var print_button=fields.elements['print'];
                    var share_button=fields.elements['email'];
                    var address_filter=fields.elements['address'];

                    var doc_filter=document.getElementById('form291_add_document_'+result.id);

                    $(doc_filter).on('click',function () 
                    {
                        modal144_action('receipts',result.id,function (url,doc_name) 
                        {
                            var docHTML="<a href='"+url+"' download='"+doc_name+"'><u>"+doc_name+"</u></a><br>";
                            var doc_container=document.getElementById('form291_documents_'+result.id);
                            $(doc_container).append(docHTML);
                        });
                    });

                    var doc_column={data_store:'documents',
                                   indexes:[{index:'id'},
                                           {index:'url'},
                                           {index:'doc_name'},
                                           {index:'doc_type',exact:'receipts'},
                                           {index:'target_id',exact:result.id}]};
                    read_json_rows('form291',doc_column,function(doc_results)
                    {
                        var docHTML="";
                        for (var j in doc_results)
                        {
                            var updated_url=doc_results[j].url.replace(/ /g,"+");
                            docHTML+="<a href='"+updated_url+"' download='"+doc_results[j].doc_name+"'><u>"+doc_results[j].doc_name+"</u></a><br>";							
                        }
                        document.getElementById('form291_documents_'+result.id).innerHTML=docHTML;
                    });
                    
                    var address_data={data_store:'customers',
                                     indexes:[{index:'address'},
                                             {index:'city'},
                                             {index:'acc_name',exact:result.acc_name}]};
                    read_json_rows('',address_data,function (addresses) 
                    {
                        if(addresses.length>0)
                        {
                            address_filter.value=addresses[0].address+", "+addresses[0].city;
                        }
                    });				

                    $(print_button).on('click',function () 
                    {
                        form291_print(result.receipt_id,result.acc_name,result.amount,result.date,result.narration,address_filter.value);
                    });

                    var bt=get_session_var('title');
                    $(share_button).on('click',function () 
                    {
                        modal101_action('Payment Receipt - '+BT,result.acc_name,'customer',function (func) 
                        {
                            print_form291(func,result.receipt_id,result.acc_name,result.amount,result.date,result.narration,address_filter.value);
                        });
                    });    
                });

                $('#form291').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(columns,'Receipts (Receivable)','form291',function (item)
                {
                    item.date=get_my_past_date(item.date);
                });
				hide_loader();
            });
        };

        function form291_print(receipt_id,acc_name,amount,date,narration,address)
        {
            print_form291(function(container)
            {
                $.print(container);
                container.innerHTML="";	
            },receipt_id,acc_name,amount,date,narration,address);	
        }

        function print_form291(func,receipt_id,acc_name,amount,date,narration,address)
        {	
            ////////////setting up containers///////////////////////	
            var container=document.createElement('div');
            var header=document.createElement('div');
                var logo=document.createElement('div');

            var invoice_box=document.createElement('div');

            var info_section=document.createElement('div');	
                var info_div=document.createElement('div');
                var info_table=document.createElement('div');

            var footer=document.createElement('div');
                var signature=document.createElement('div');
                var jurisdiction=document.createElement('div');
                var business_contact=document.createElement('div');

            ////////////setting styles for containers/////////////////////////

            container.setAttribute('style','width:100%;');
            header.setAttribute('style','width:100%;height:auto;');
                logo.setAttribute('style','width:100%;text-align:center;margin:5px;line-height:40px;');
            invoice_box.setAttribute('style','width:100%;margin:10px;text-align:center;font-size:20px;');
            info_section.setAttribute('style','width:100%;min-height:60px;margin:10px 5px;padding:2px;');
                info_div.setAttribute('style','width:96%;padding:5px;font-size:13px;line-height:14px;');
                info_table.setAttribute('style','display:block;margin:2px;width:100%;text-align:left;font-size:13px;');
            footer.setAttribute('style','width:100%;min-height:50px');
                signature.setAttribute('style','display:block;float:right;width:100%;text-align:right;');
                jurisdiction.setAttribute('style','display:block;margin:5px;width:100%;text-align:left;font-size:11px;');
                business_contact.setAttribute('style','display:block;margin:5px;padding:0px;line-height:11px;width:100%;text-align:center;font-size:11px;');

            ///////////////getting the content////////////////////////////////////////

            var bt=get_session_var('title');
            var logo_image=get_session_var('logo');
            var business_address=get_session_var('address');
            var business_phone=get_session_var('phone');
            var business_email=get_session_var('email');
            var cin=get_session_var('cin');
            var pan=get_session_var('pan');
            var signature_text="For "+bt+"<br><br><br>Auth. Signatory<br>";

            ////////////////filling in the content into the containers//////////////////////////
            var wording_total=number2text(amount);

            logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
            invoice_box.innerHTML="<hr style='border: 1px solid #00f;margin:5px;'>Receipt Voucher<hr style='border: 1px solid #00f;margin:5px;'>";

            info_div.innerHTML="<div style='width:50%;float:left;text-align:left;'>Receipt #: "+receipt_id+"</div><div style='width:50%;float:right;text-align:right;'>Dated: "+get_my_past_date(date)+"</div>";

            ///////////central information table///////////
            var table_text="<table style='border:none;text-align:left;font-size:13px;'><tr style='border-top:1px solid #555;border-bottom:1px solid #555;'><th style='width:70%;border-right:1px solid #555;font-weight:400;'>Particulars</th><th style='font-weight:400;width:30%;'>Amount</th></tr>";
                table_text+="<tr style='height:40px;'><td style='text-align:left;border-right:1px solid #555;'>Account: "+acc_name+"<br>Address: "+address+"</td><td></td></tr>";
                table_text+="<tr style='height:40px;'><td style='text-align:left;border-right:1px solid #555;'>Remarks: "+narration+"</td><td></td></tr>";
                table_text+="<tr style='border-top:1px solid #555;border-bottom:1px solid #555;text-align:left;'><td style='text-align:left;border-right:1px solid #555;'>Amount (in words): "+wording_total+"</td><td style='text-align:left;'>Rs. "+amount+"</td></tr></table>";

            /////////////////////////////////////////////
            info_table.innerHTML=table_text;	

            ////////////////filling in the content into the containers//////////////////////////

            signature.innerHTML=signature_text;
            jurisdiction.innerHTML="All disputes subjected to Delhi jurisdiction.<br>This is a computer generated receipt.";
            business_contact.innerHTML="<hr style='border: 1px solid #00f;margin:5px;'>Address: "+business_address+"<br>Phone: "+business_phone+", E-Mail: "+business_email+"<br>CIN: "+cin+", PAN: "+pan+"<hr style='border: 1px solid #00f;margin:5px;'>";
            ///////////////////////////////////////

            container.appendChild(header);
            container.appendChild(invoice_box);
            container.appendChild(info_section);
            container.appendChild(footer);

            header.appendChild(logo);

            info_section.appendChild(info_div);
            info_section.appendChild(info_table);

            footer.appendChild(jurisdiction);
            footer.appendChild(signature);
            footer.appendChild(business_contact);

            func(container);
        }

    </script>
</div>