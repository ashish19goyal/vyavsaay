<div id='form56' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form56_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form56_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form56_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form56_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form56_upload' onclick=modal23_action(form56_import_template,form56_import,form56_import_validate);><i class='fa fa-upload'></i> Import</a>
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
					<form id='form56_header'></form>
						<th><input type='text' placeholder="Account" class='floatlabel' name='account' form='form56_header'></th>
						<th><input type='text' placeholder="Type" class='floatlabel' name='type' form='form56_header'></th>
						<th><input type='text' placeholder="Amount" readonly='readonly' name='amount' form='form56_header'></th>
						<th><input type='text' placeholder="Date" readonly="readonly" name='date' form='form56_header'></th>
						<th><input type='text' placeholder="Notes" class='floatlabel' name='notes' form='form56_header'></th>
						<th><input type='submit' form='form56_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form56_body'>
			</tbody>
		</table>
	</div>

    <script>

        function form56_header_ini()
        {
            var filter_fields=document.getElementById('form56_header');
            var account_filter=filter_fields.elements['account'];
            var type_filter=filter_fields.elements['type'];

            var account_data={data_store:'accounts',return_column:'acc_name'};
            set_my_filter_json(account_data,account_filter);
            set_static_filter_json('cash_register','type',type_filter);

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form56_ini();
            });
        };

        function form56_ini()
        {
            show_loader();
            var fid=$("#form56_link").attr('data_id');
            if(fid==null)
                fid="";

            $('#form56_body').html("");

            var filter_fields=document.getElementById('form56_header');
            var faccount=filter_fields.elements['account'].value;
            var ftype=filter_fields.elements['type'].value;
            var fnotes=filter_fields.elements['notes'].value;

            var paginator=$('#form56_body').paginator();

						var columns={count:paginator.page_size(),
												start_index:paginator.get_index(),
												data_store:'cash_register',
												indexes:[{index:'id',value:fid},
												{index:'type',value:ftype},
												{index:'acc_name',value:faccount},
												{index:'notes',value:fnotes},
			                  {index:'date'},
			                  {index:'amount'}]};

            read_json_rows('form56',columns,function(results)
            {
                results.forEach(function(result)
                {
                    var rowsHTML="<tr>";
                        rowsHTML+="<form id='form56_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='Account'>";
                                rowsHTML+="<a onclick=\"show_object('accounts','"+result.acc_name+"');\"><textarea readonly='readonly' form='form56_"+result.id+"'>"+result.acc_name+"</textarea>";
                            rowsHTML+="</a></td>";
                            rowsHTML+="<td data-th='Type'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form56_"+result.id+"' value='"+result.type+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Amount'>";
                                rowsHTML+="<input type='number' readonly='readonly' step='any' form='form56_"+result.id+"' value='"+result.amount+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Date'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form56_"+result.id+"' value='"+get_my_past_date(result.date)+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Notes'>";
                                rowsHTML+="<textarea readonly='readonly' form='form56_"+result.id+"' class='dblclick_editable'>"+result.notes+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form56_"+result.id+"' value='"+result.id+"'>";
                                rowsHTML+="<button type='submit' title='Save' class='btn green' form='form56_"+result.id+"' name='save'><i class='fa fa-save'></i></button>";
                                rowsHTML+="<button type='button' class='btn red' name='delete' title='Delete' form='form56_"+result.id+"' onclick='form56_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                            rowsHTML+="</td>";
                    rowsHTML+="</tr>";

                    $('#form56_body').append(rowsHTML);
                    var fields=document.getElementById("form56_"+result.id);
                    $(fields).on("submit", function(event)
                    {
                        event.preventDefault();
                        form56_update_item(fields);
                    });
                });

                $('#form56').formcontrol();
								paginator.update_index(results.length);
								initialize_tabular_report_buttons(columns,'Cash Register','form56',function (item)
                {
                    item.date=get_my_past_date(item.date);
                });
								hide_loader();
            });
        };

        function form56_add_item()
        {
            if(is_create_access('form56'))
            {
                var id=get_new_key();
                var rowsHTML="<tr>";
                rowsHTML+="<form id='form56_"+id+"' autocomplete='off'></form>";
                    rowsHTML+="<td data-th='Account'>";
                        rowsHTML+="<input type='text' required form='form56_"+id+"'>";
                        rowsHTML+="<a title='Add new account' class='btn btn-circle btn-icon-only grey-cascade' id='form56_add_account_"+id+"'><i class='fa fa-plus'></i></a>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Type'>";
                        rowsHTML+="<input type='text' required form='form56_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Amount'>";
                        rowsHTML+="<input type='number' required step='any' form='form56_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Date'>";
                        rowsHTML+="<input type='text' required form='form56_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Notes'>";
                        rowsHTML+="<textarea form='form56_"+id+"'></textarea>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Action'>";
                        rowsHTML+="<input type='hidden' form='form56_"+id+"' value='"+id+"'>";
                        rowsHTML+="<button type='submit' class='btn green' title='Save' name='save' form='form56_"+id+"'><i class='fa fa-save'></i></button>";
                        rowsHTML+="<button type='button' class='btn red' title='Delete' name='delete' form='form56_"+id+"' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
                    rowsHTML+="</td>";
                rowsHTML+="</tr>";

                $('#form56_body').prepend(rowsHTML);
                var fields=document.getElementById("form56_"+id);
                var account_filter=fields.elements[0];
                var type_filter=fields.elements[1];
                var date_filter=fields.elements[3];

                $(date_filter).datepicker();
                date_filter.value=vTime.date();

                $(fields).on("submit", function(event)
                {
                    event.preventDefault();
                    form56_create_item(fields);
                });

                var add_account=document.getElementById('form56_add_account_'+id);
                $(add_account).on('click',function()
                {
                    modal12_action(function()
                    {
                        var account_data={data_store:'accounts',return_column:'acc_name'};
                        set_my_value_list_json(account_data,account_filter,function ()
                        {
                            $(account_filter).focus();
                        });
                    });
                });

                var account_data={data_store:'accounts',return_column:'acc_name'};
                set_my_value_list_json(account_data,account_filter,function ()
                {
                    $(account_filter).focus();
                });
                set_static_value_list_json('cash_register','type',type_filter);

                $('#form56').formcontrol();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form56_create_item(form)
        {
            if(is_create_access('form56'))
            {
                var account=form.elements[0].value;
                var type=form.elements[1].value;
                var amount=form.elements[2].value;
                var date=get_raw_time(form.elements[3].value);
                var notes=form.elements[4].value;
                var data_id=form.elements[5].value;
                var del_button=form.elements['delete'];
                var last_updated=get_my_time();
                var receiver=account;
                var giver="master";

                var period=localStorage.getItem('debit_period');

                if(type=='received')
                {
                    period=localStorage.getItem('credit_period');
                    giver=account;
                    receiver="master";
                }

                if(period==null || period=='')
                {
                    period=0;
                }
                var due_time=date+(parseFloat(period)*86400000);

                var data_json={data_store:'cash_register',
					 				log:'yes',
					 				data:[{index:'id',value:data_id},
					 					{index:'type',value:type},
					 					{index:'acc_name',value:account},
					 					{index:'notes',value:notes},
				                        {index:'amount',value:amount},
				                        {index:'date',value:date},
					 					{index:'last_updated',value:last_updated}],
					 				log_data:{title:'Added',notes:'Cash record of amount '+amount,link_to:'form56'}};

          //       var transaction_json={data_store:'transactions',
					// 	data:[{index:'id',value:data_id},
	 			// 		{index:'trans_date',value:date},
	 			// 		{index:'amount',value:amount},
	 			// 		{index:'receiver',value:giver},
          //               {index:'giver',value:receiver},
          //               {index:'tax',value:'0'},
	 			// 		{index:'last_updated',value:last_updated}]};
					//
          //       var payment_id=get_my_time();
					//
          //       var transaction2_json={data_store:'transactions',
					// 	data:[{index:'id',value:payment_id},
	 			// 		{index:'trans_date',value:date},
	 			// 		{index:'amount',value:amount},
	 			// 		{index:'receiver',value:receiver},
          //               {index:'giver',value:giver},
          //               {index:'tax',value:'0'},
	 			// 		{index:'last_updated',value:last_updated}]};
					//
          //       var payment_json={data_store:'payments',
					// 	data:[{index:'id',value:payment_id},
	 			// 		{index:'acc_name',value:account},
	 			// 		{index:'type',value:type},
          //               {index:'total_amount',value:amount},
          //               {index:'paid_amount',value:amount},
          //               {index:'status',value:'closed'},
	 			// 		{index:'date',value:date},
          //               {index:'due_date',value:due_time},
          //               {index:'mode',value:'cash'},
          //               {index:'transaction_id',value:payment_id},
          //               {index:'source_id',value:data_id},
	 			// 		{index:'last_updated',value:last_updated}]};

                create_json(data_json);
                // create_json(transaction_json);
                // create_json(transaction2_json);
                // create_json(payment_json);

                $(form).readonly();

                del_button.removeAttribute("onclick");
                $(del_button).on('click',function(event)
                {
                    form56_delete_item(del_button);
                });

                $(form).off('submit');
                $(form).on('submit',function(event)
                {
                    event.preventDefault();
                    form56_update_item(form);
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form56_update_item(form)
        {
            if(is_update_access('form56'))
            {
                var account=form.elements[0].value;
                var type=form.elements[1].value;
                var amount=form.elements[2].value;
                var notes=form.elements[4].value;
                var data_id=form.elements[5].value;
                var last_updated=get_my_time();
                var receiver=account;
                var giver="master";
                if(type=='received')
                {
                    giver=account;
                    receiver="master";
                }

                var data_json={data_store:'cash_register',
						 				log:'yes',
						 				data:[{index:'id',value:data_id},
						 					{index:'type',value:type},
						 					{index:'acc_name',value:account},
						 					{index:'notes',value:notes},
					                        {index:'amount',value:amount},
					                        {index:'last_updated',value:last_updated}],
						 				log_data:{title:'Updated',notes:'Cash record of amount '+amount,link_to:'form56'}};

                update_json(data_json);

                $(form).readonly();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form56_delete_item(button)
        {
            if(is_delete_access('form56'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var account=form.elements[0].value;
                    var type=form.elements[1].value;
                    var amount=form.elements[2].value;
                    var notes=form.elements[3].value;
                    var data_id=form.elements[5].value;
                    var last_updated=get_my_time();

                    var data_json={data_store:'cash_register',
									 				log:'yes',
									 				data:[{index:'id',value:data_id}],
									 				log_data:{title:'Deleted',notes:'Cash record of amount '+amount,link_to:'form56'}};

                    // var transaction_json={data_store:'transactions',
	 								// 				data:[{index:'id',value:data_id}]};
										//
                    // var payment_data={data_store:'payments',
                    //                   indexes:[{index:'id'},
                    //                           {index:'acc_name',exact:account},
                    //                           {index:'type',value:type},
                    //                           {index:'source_id',exact:data_id}]};
                    // read_json_rows('',payment_data,function(payments)
                    // {
                    //     if(payments.length>0)
                    //     {
                    //         var transaction2_json={data_store:'transactions',
										//       data:[{index:'id',value:payments[0].id}]};
										//
                    //         var payment_json={data_store:'payments',
										//       data:[{index:'id',value:payments[0].id}]};
										//
                    //         delete_json(payment_json);
                    //         delete_json(transaction2_json);
                    //     }
                    // });

                    delete_json(data_json);
                    //delete_json(transaction_json);

                    $(button).parent().parent().remove();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form56_import_template()
        {
            var data_array=['id','type','acc_name','amount','date','notes'];
            my_array_to_csv(data_array);
        };

        function form56_import_validate(data_array)
        {
            var validate_template_array=[{column:'acc_name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
                                    {column:'amount',required:'yes',regex:new RegExp('^[0-9.]+$')},
                                    {column:'type',required:'yes',list:['paid','received']}];

            var error_array=vImport.validate(data_array,validate_template_array);
            return error_array;
        }

        function form56_import(data_array,import_type)
        {
            var data_json={data_store:'cash_register',
 					loader:'no',
 					log:'yes',
 					data:[],
 					log_data:{title:'Entries for cash register',link_to:'form56'}};

          //   var transaction_json={data_store:'transactions',
 				// 	loader:'no',
 				// 	data:[]};
					//
          //   var payment_json={data_store:'payments',
 				// 	loader:'no',
 				// 	data:[]};

			var counter=1;
			var last_updated=get_my_time();
            var payment_id=get_new_key()+100000;
			data_array.forEach(function(row)
			{
				counter+=1;
				if(import_type=='create_new')
				{
					row.id=last_updated+counter;
				}
                var receiver=row.acc_name;
                var giver="master";

                if(row.type=='received')
                {
                    giver=row.acc_name;
                    receiver="master";
                }

				var data_json_array=[{index:'id',value:row.id},
	 					{index:'type',value:row.type},
	 					{index:'acc_name',value:row.acc_name},
	 					{index:'amount',value:row.amount},
	 					{index:'notes',value:row.notes},
            {index:'date',value:get_raw_time(row.date)},
	 					{index:'last_updated',value:last_updated}];

        // var t1_json_array=[{index:'id',value:row.id},
	 		// 			{index:'amount',value:row.amount},
	 		// 			{index:'receiver',value:giver},
	 		// 			{index:'giver',value:receiver},
	 		// 			{index:'tax',value:'0'},
        //     {index:'trans_date',value:get_raw_time(row.date)},
	 		// 			{index:'last_updated',value:last_updated}];
				//
        // var t2_json_array=[{index:'id',value:payment_id+counter},
	 		// 			{index:'amount',value:row.amount},
	 		// 			{index:'receiver',value:receiver},
	 		// 			{index:'giver',value:giver},
	 		// 			{index:'tax',value:'0'},
        //     {index:'trans_date',value:get_raw_time(row.date)},
	 		// 			{index:'last_updated',value:last_updated}];
				//
        //     var payment_json_array=[{index:'id',value:payment_id+counter},
				// 			 					{index:'acc_name',value:row.acc_name},
				// 			 					{index:'type',value:row.type},
				// 			 					{index:'total_amount',value:row.amount},
				// 			 					{index:'paid_amount',value:row.amount},
				// 			 					{index:'status',value:'closed'},
        //                 {index:'date',value:get_raw_time(row.date)},
        //                 {index:'due_date',value:get_my_time()},
        //                 {index:'mode',value:'cash'},
        //                 {index:'transaction_id',value:payment_id},
        //                 {index:'source_id',value:row.id},
	 		// 									{index:'last_updated',value:last_updated}];

            data_json.data.push(data_json_array);
            // transaction_json.data.push(t1_json_array);
            // transaction_json.data.push(t2_json_array);
            // payment_json.data.push(payment_json_array);
			});

			if(import_type=='create_new')
			{
				create_batch_json(data_json);
        // create_batch_json(transaction_json);
        // create_batch_json(payment_json);
			}
			else
			{
				update_batch_json(data_json);
        // update_batch_json(transaction_json);
        // update_batch_json(payment_json);
			}
    };

    </script>
</div>
