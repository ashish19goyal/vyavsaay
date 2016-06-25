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
                             access:{},
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
                                rowsHTML+="<a onclick=\"show_object('staff','"+result.acc_name+"');\"><input type='text' readonly='readonly' form='form271_"+result.id+"' value='"+result.from_name+"'></a>";
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
                            rowsHTML+="</td>";
                    rowsHTML+="</tr>";

                    $('#form271_body').append(rowsHTML);
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
                    rowsHTML+="</td>";
                rowsHTML+="</tr>";

                $('#form271_body').append(rowsHTML);

                var fields=document.getElementById("form271_"+id);
                var person_filter=fields.elements[0];
				var from_filter=fields.elements[1];
                var date_filter=fields.elements[2];
                var amount_filter=fields.elements[3];
                var save_button=fields.elements['save'];

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

    </script>
</div>
