<div id='form271' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form271_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form271_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form271_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form271_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form271_header'></form>
						<th><input type='text' placeholder="To" class='floatlabel' name='to' form='form271_header'></th>
						<th><input type='text' placeholder="From" class='floatlabel' name='from' form='form271_header'></th>
						<th><input type='text' placeholder="Date" class='floatlabel' name='date' form='form271_header'></th>
						<th><input type='text' placeholder="Amount" readonly="readonly" form='form271_header'></th>
						<th><input type='text' placeholder="Notes" readonly="readonly" form='form271_header'></th>
						<th><input type='submit' form='form271_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form271_body'>
			</tbody>
		</table>
	</div>

    <script>
        function form271_header_ini()
        {
            var filter_fields=document.getElementById('form271_header');
            var to_filter=filter_fields.elements['to'];
			var from_filter=filter_fields.elements['from'];
            var date_filter=filter_fields.elements['date'];

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form271_ini();
            });

            var staff_data={data_store:'staff',return_column:'acc_name'};
            set_my_filter_json(staff_data,to_filter);
            $(date_filter).datepicker();
        };

        function form271_ini()
        {
            show_loader();
            var fid=$("#form271_link").attr('data_id');
            if(fid==null)
                fid="";

            $('#form271_body').html("");

            var filter_fields=document.getElementById('form271_header');
            var fperson=filter_fields.elements['to'].value;
			var ffrom=filter_fields.elements['from'].value;
            var fdate=get_raw_time(filter_fields.elements['date'].value);

            var paginator=$('#form271_body').paginator();

			var new_columns={count:paginator.page_size(),
                             start_index:paginator.get_index(),
			                 data_store:'cod_collections',
                             access:'yes',
							 indexes:[{index:'id',value:fid},
                                    {index:'acc_name',value:fperson},
									{index:'from_name',value:ffrom},
                                    {index:'date',value:fdate},
									{index:'drs_num'},
                                    {index:'amount'}]};

            read_json_rows('form271',new_columns,function(results)
            {
                results.forEach(function(result)
                {
                    var rowsHTML="<tr>";
                        rowsHTML+="<form id='form271_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='To'>";
                                rowsHTML+="<a onclick=\"show_object('staff','"+result.acc_name+"');\"><input type='text' readonly='readonly' form='form271_"+result.id+"' value='"+result.acc_name+"'></a>";
                            rowsHTML+="</td>";
							rowsHTML+="<td data-th='From'>";
                                rowsHTML+="<a onclick=\"show_object('staff','"+result.from_name+"');\"><input type='text' readonly='readonly' form='form271_"+result.id+"' value='"+result.from_name+"'></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Date'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form271_"+result.id+"' value='"+get_my_past_date(result.date)+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Amount'>";
                                rowsHTML+="<input type='number' class='floatlabel' placeholder='Rs.' readonly='readonly' form='form271_"+result.id+"' step='any' value='"+result.amount+"'>";
                            rowsHTML+="</td>";
							rowsHTML+="<td data-th='Notes'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form271_"+result.id+"' value='"+result.drs_num+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form271_"+result.id+"' value='"+result.id+"'>";
                                rowsHTML+="<button type='button' class='btn red' form='form271_"+result.id+"' title='Delete' onclick='form271_delete_item($(this));' name='delete'><i class='fa fa-trash'></i></button>";
								rowsHTML+="<button type='button' class='btn yellow-saffron' form='form271_"+result.id+"' value='Print Receipt' name='print'><i class='fa fa-print'></i></button>";
                                rowsHTML+="<button type='button' form='form271_"+result.id+"' value='Email Receipt' class='btn red-haze' name='email'><i class='fa fa-envelope'></i></button>";
                            rowsHTML+="</td>";
                    rowsHTML+="</tr>";

                    $('#form271_body').append(rowsHTML);
					var fields=document.getElementById('form271_'+result.id);
					var print_button=fields.elements['print'];
					var share_button=fields.elements['email'];

					$(print_button).on('click',function ()
                    {
                        form271_print(result.from_name,result.acc_name,result.amount,result.date,result.drs_num);
                    });

                    var bt=get_session_var('title');
                    $(share_button).on('click',function ()
                    {
                        modal101_action('COD Receipt - '+bt,result.from_name,'staff',function (func)
                        {
                            print_form271(func,result.from_name,result.acc_name,result.amount,result.date,result.drs_num);
                        });
                    });
                });

                $('#form271').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(new_columns,'COD Collections','form271',function (item)
                {
                    item['To']=item.acc_name;
					item['From']=item.from_name;
                    item['Date']=get_my_past_date(item.date);
					item['Amount']=item.amount;
					item['Notes']=item.drs_num;
					delete item.acc_name;
					delete item.from_name;
					delete item.amount;
					delete item.date;
					delete item.drs_num;
                });
				hide_loader();
            });
        }

        function form271_add_item()
        {
            if(is_create_access('form271'))
            {
                var id=get_new_key();
                var rowsHTML="<tr>";
                rowsHTML+="<form id='form271_"+id+"' autocomplete='off'></form>";
                    rowsHTML+="<td data-th='To'>";
                        rowsHTML+="<input type='text' required form='form271_"+id+"'>";
                    rowsHTML+="</td>";
					rowsHTML+="<td data-th='From'>";
                        rowsHTML+="<input type='text' required form='form271_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Date'>";
                        rowsHTML+="<input type='text' form='form271_"+id+"' required>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Amount'>";
                        rowsHTML+="<input type='number' class='floatlabel' placeholder='Rs.' step='any' required min='0' form='form271_"+id+"'>";
                    rowsHTML+="</td>";
					rowsHTML+="<td data-th='Notes'>";
                        rowsHTML+="<input type='text' form='form271_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Action'>";
                        rowsHTML+="<input type='hidden' form='form271_"+id+"' value='"+id+"'>";
                        rowsHTML+="<button type='submit' class='btn green' form='form271_"+id+"' id='save_form271_"+id+"' name='save'><i class='fa fa-save'></i></button>";
                        rowsHTML+="<button type='button' class='btn red' form='form271_"+id+"' id='delete_form271_"+id+"' onclick='$(this).parent().parent().remove();' name='delete'><i class='fa fa-trash'></i></button>";
						rowsHTML+="<input type='hidden' form='form271_"+id+"' name='from_email'>";
						rowsHTML+="<input type='hidden' form='form271_"+id+"' name='to_email'>";
                    rowsHTML+="</td>";
                rowsHTML+="</tr>";

                $('#form271_body').prepend(rowsHTML);

                var fields=document.getElementById("form271_"+id);
                var person_filter=fields.elements[0];
				var from_filter=fields.elements[1];
                var date_filter=fields.elements[2];
                var amount_filter=fields.elements[3];
                var save_button=fields.elements['save'];
				var to_email_filter=fields.elements['to_email'];
				var from_email_filter=fields.elements['from_email'];

                $(fields).on("submit", function(event)
                {
                    event.preventDefault();
                    form271_create_item(fields);
                });

                var person_data={data_store:'staff',return_column:'acc_name'};
                set_my_value_list_json(person_data,person_filter,function ()
                {
                    $(person_filter).focus();
                });

				set_my_value_list_json(person_data,from_filter);

				vUtil.onChange(from_filter,function()
				{
					var received_data={data_store:'cod_collections',return_column:'amount',sum:'yes',
										indexes:[{index:'acc_name',exact:from_filter.value}]};
					read_json_single_column(received_data,function(received)
					{
						var given_data={data_store:'cod_collections',return_column:'amount',sum:'yes',
											indexes:[{index:'from_name',exact:from_filter.value}]};
						read_json_single_column(given_data,function(given)
						{
							var balance_amount=parseFloat(received[0])-parseFloat(given[0]);
							$(amount_filter).attr('max',balance_amount);
						});
					});

					var email_data={data_store:'staff',return_column:'email',indexes:[{index:'acc_name',exact:from_filter.value}]};
					set_my_value_json(email_data,from_email_filter);
				});

				vUtil.onChange(person_filter,function()
				{
					var email_data={data_store:'staff',return_column:'email',indexes:[{index:'acc_name',exact:person_filter.value}]};
					set_my_value_json(email_data,to_email_filter);
				});

				$(date_filter).datepicker();
                date_filter.value=vTime.date();
				$('#form271').formcontrol();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form271_create_item(form)
        {
            if(is_create_access('form271'))
            {
                var person=form.elements[0].value;
				var from=form.elements[1].value;
                var date=get_raw_time(form.elements[2].value);
                var amount=form.elements[3].value;
				var notes=form.elements[4].value;
                var data_id=form.elements[5].value;
				var from_email=form.elements['from_email'].value;
				var to_email=form.elements['to_email'].value;
                var save_button=form.elements['save'];
                var del_button=form.elements['delete'];
                var last_updated=get_my_time();

                var data_json={data_store:'cod_collections',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'acc_name',value:person},
						{index:'from_name',value:from},
	 					{index:'date',value:date},
	 					{index:'amount',value:amount},
						{index:'drs_num',value:notes},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:'Rs. '+amount+' passed from '+from+' to '+person,link_to:'form271'}};

                create_json(data_json);

                $(form).readonly();

                del_button.removeAttribute("onclick");
                $(del_button).on('click',function(event)
                {
                    form271_delete_item(del_button);
                });

				//sending mails
				print_form271(function(container)
				{
					var email_message=container.innerHTML;

					var bt=get_session_var('title');
					var receiver_array=[{email:from_email,name:from},{email:to_email,name:person}];
					var receiver=JSON.stringify(receiver_array);
					var sub="COD Receipt - "+bt;
					var official_email=get_session_var('email');

	        		send_email(receiver,official_email,bt,sub,email_message,function()
					{
						hide_loader();
					});
				},from,person,amount,date,notes);
				//mail sent

				$(form).off('submit');
                $(form).on('submit',function (e)
                {
                    e.preventDefault();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form271_delete_item(button)
        {
            if(is_delete_access('form271'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

					var person=form.elements[0].value;
					var amount=form.elements[3].value;
					var data_id=form.elements[5].value;
                    var data_json={data_store:'cod_collections',
	 				              log:'yes',
	 				              data:[{index:'id',value:data_id}],
	 				              log_data:{title:'Deleted',notes:'COD collection of Rs. '+amount,link_to:'form271'}};

                    delete_json(data_json);

                    $(button).parent().parent().remove();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

		function form271_print(from,to,amount,date,narration)
		{
			print_form271(function(container)
			{
				$.print(container);
				container.innerHTML="";
			},from,to,amount,date,narration);
		}

		function print_form271(func,from,to,amount,date,narration)
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
				var clear=document.createElement('div');
				var business_contact=document.createElement('div');

			////////////setting styles for containers/////////////////////////

			container.setAttribute('style','width:100%;');
			header.setAttribute('style','width:100%;height:auto;');
				logo.setAttribute('style','width:100%;text-align:center;margin:5px;line-height:40px;font-size:36px;');
			invoice_box.setAttribute('style','width:100%;margin:10px;text-align:center;font-size:20px;');
			info_section.setAttribute('style','width:100%;min-height:60px;margin:10px 5px;padding:2px;');
				info_div.setAttribute('style','width:96%;padding:5px;font-size:14px;line-height:15px;');
				info_table.setAttribute('style','display:block;margin:2px;width:100%;text-align:left;font-size:14px;');
			footer.setAttribute('style','width:100%;min-height:50px');
				signature.setAttribute('style','display:block;float:right;width:100%;text-align:right;font-size:14px;');
				jurisdiction.setAttribute('style','display:block;margin:5px;width:100%;text-align:left;font-size:14px;');
				business_contact.setAttribute('style','display:block;margin:5px;padding:0px;line-height:11px;width:100%;text-align:center;font-size:11px;');
				clear.setAttribute('style','clear:both');
			///////////////getting the content////////////////////////////////////////

			var bt=get_session_var('title');
			var logo_image=get_session_var('logo');
			var business_address=get_session_var('address');
			var business_phone=get_session_var('phone');
			var business_email=get_session_var('email');
			var cin=get_session_var('cin');
			var pan=get_session_var('pan');
			var signature_text="Signature<br>";

			////////////////filling in the content into the containers//////////////////////////
			var wording_total=number2text(amount);

			//logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
			logo.innerHTML=bt;
			invoice_box.innerHTML="<hr style='border: 1px solid #000;margin:5px;'>COD Receipt<hr style='border: 1px solid #000;margin:5px;'>";

			info_div.innerHTML="<div style='width:50%;float:left;text-align:left;'>Dated: "+vTime.date({time:date})+"</div><div style='clear:both'></div>";

			///////////central information table///////////
			var table_text="<table style='text-align:left;font-size:14px;width:100%;'><tr style='border-top:1px solid #555;border-bottom:1px solid #555;'><th style='width:70%;border-right:1px solid #555;font-weight:400;'>Details</th><th style='font-weight:400;width:30%;'>Amount</th></tr>";
				table_text+="<tr style='height:40px;'><td style='text-align:left;border-right:1px solid #555;'>From: "+from+"<br>To: "+to+"</td><td></td></tr>";
				table_text+="<tr style='height:40px;'><td style='text-align:left;border-right:1px solid #555;'>DRS Details: "+narration+"</td><td></td></tr>";
				table_text+="<tr style='border-top:1px solid #555;border-bottom:1px solid #555;text-align:left;'><td style='text-align:left;border-right:1px solid #555;'>Amount (in words): "+wording_total+"</td><td style='text-align:left;'>Rs. "+amount+"</td></tr></table>";

			/////////////////////////////////////////////
			info_table.innerHTML=table_text;

			////////////////filling in the content into the containers//////////////////////////

			signature.innerHTML=signature_text;
			jurisdiction.innerHTML="This is a computer generated receipt.";
			business_contact.innerHTML="<hr style='border: 1px solid #000;margin:5px;'>Address: "+business_address+"<br>Phone: "+business_phone+", E-Mail: "+business_email+"<br>CIN: "+cin+", PAN: "+pan+"<hr style='border: 1px solid #000;margin:5px;'>";
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
			footer.appendChild(clear);
			footer.appendChild(business_contact);

			func(container);
		}

    </script>
</div>
