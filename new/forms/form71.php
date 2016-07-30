<div id='form71' class='tab-pane portlet box yellow-saffron'>
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='modal12_action();'>Add <i class='fa fa-plus'></i></a>
		</div>
        <div class='actions'>
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form71_upload' onclick=modal23_action(form71_import_template,form71_import,form71_import_validate);><i class='fa fa-upload'></i> Import</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>
	
	<div class="portlet-body">
		<form id='form71_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="Name" class='floatlabel' name='name'></label>
				<label><input type='text' placeholder="Type" class='floatlabel' name='type'></label>
                <label><input type='submit' class='submit_hidden'></label>
			</fieldset>
		</form>
		<br>
		<div id='form71_body' class='row'>
			
		</div>
	</div>
    
    <script>
    
        function form71_header_ini()
        {
            var filter_fields=document.getElementById('form71_header');
            var name_filter=filter_fields.elements['name'];
            var type_filter=filter_fields.elements['type'];

            var name_data={data_store:'accounts',return_column:'acc_name'};
            set_my_filter_json(name_data,name_filter);
            set_static_filter_json('accounts','type',type_filter);

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form71_ini();
            });
        };

        function form71_ini()
        {
            show_loader();
            var fid=$("#form71_link").attr('data_id');
            if(fid==null)
                fid="";	

            $('#form71_body').html("");

            var filter_fields=document.getElementById('form71_header');
            var fname=filter_fields.elements['name'].value;
            var ftype=filter_fields.elements['type'].value;

            var paginator=$('#form71_body').paginator();
			
			var columns=new Object();
				columns.count=paginator.page_size();
				columns.start_index=paginator.get_index();
				columns.data_store='accounts';
				columns.indexes=[{index:'id',value:fid},
                                 {index:'acc_name',value:fname},
                                 {index:'description'},
                                 {index:'type',value:ftype}];
			
            read_json_rows('form71',columns,function(results)
            {	
                var accounts_string=[];
                for(var a in results)
                {
                    accounts_string.push(results[a].acc_name);
                }
                
                var payments_data={data_store:'payments',
                                  indexes:[{index:'id'},
                                          {index:'acc_name',array:accounts_string},
                                          {index:'type'},
                                          {index:'total_amount'},
                                          {index:'paid_amount'},
                                          {index:'status',exact:'pending'}]};
                read_json_rows('form71',payments_data,function(payments)
                {
                    counter=0;
                    results.forEach(function(result)
                    {
                        var clear_both="";
                        if((counter%4)==0)
                        {
                            clear_both="style='clear:both;'";
                        }
                        counter++;

                        var balance_amount=0;
                        payments.forEach(function(payment)
                        {
                            if(payment.acc_name==result.acc_name)
                            {
                                if(payment.type=='received')
                                {
                                    balance_amount+=parseFloat(payment.total_amount);
                                    balance_amount-=parseFloat(payment.paid_amount);
                                }
                                else if(payment.type=='paid')
                                {
                                    balance_amount-=parseFloat(payment.total_amount);
                                    balance_amount+=parseFloat(payment.paid_amount);
                                }
                            }
                        });

                        balance_amount=vUtil.round(balance_amount,2);
                        var balance_display="";
                        if(balance_amount==0)
                        {
                            balance_display="Rs. 0";
                        }
                        else if(balance_amount>0)
                        {
                            balance_display="Receivable: Rs. "+balance_amount;
                        }
                        else
                        {
                            balance_amount=(-balance_amount);
                            balance_display="Payable: Rs. "+balance_amount;
                        }

                        var rowsHTML="<div class='col-xs-6 col-sm-3 col-md-3' "+clear_both+">"+
                                        "<div class='thumbnail'>"+
                                          "<div class='caption'>"+
                                               "<form id='form71_"+result.id+"'>"+
                                                    "<a onclick=\"show_object('store_areas','"+result.acc_name+"');\"><textarea readonly='readonly' name='name' class='floatlabel' placeholder='Name' form='form71_"+result.id+"'>"+result.acc_name+"</textarea></a>"+
                                                    "<input type='text' readonly='readonly' class='floatlabel' placeholder='Type' name='type' form='form71_"+result.id+"' value='"+result.type+"'>"+
                                                    "<textarea readonly='readonly' form='form71_"+result.id+"' class='floatlabel dblclick_editable' placeholder='Description' name='description'>"+result.description+"</textarea>"+
                                                    "<input type='hidden' form='form71_"+result.id+"' name='id' value='"+result.id+"'>"+
                                                    "<textarea readonly='readonly' class='floatlabel' placeholder='Balance' name='balance' form='form71_"+result.id+"'>"+balance_display+"</textarea>"+
                                                    "<button type='submit' class='btn green' form='form71_"+result.id+"' name='save' title='Save'><i class='fa fa-2x fa-save'></i></button>"+
                                                    "<button type='button' class='btn red' form='form71_"+result.id+"' name='delete' title='Delete' onclick='form71_delete_item($(this));'><i class='fa fa-2x fa-trash'></i></button>"+
                                                    "<input type='hidden' form='form71_"+result.id+"' value='"+balance_amount+"'>"+
                                                "</form>"+
                                          "</div>"+
                                        "</div>"+
                                    "</div>";
                        
                        $('#form71_body').append(rowsHTML);
                        var fields=document.getElementById("form71_"+result.id);
                        $(fields).on("submit", function(event)
                        {
                            event.preventDefault();
                            form71_update_item(fields);
                        });
                    });

                    $('#form71').formcontrol();
				    paginator.update_index(results.length);
                    hide_loader();
                });
            });
        };

        function form71_update_item(form)
        {
            if(is_update_access('form71'))
            {
                var name=form.elements['name'].value;
                var type=form.elements['type'].value;
                var description=form.elements['description'].value;
                var data_id=form.elements['id'].value;
                var last_updated=get_my_time();
                var data_json={data_store:'accounts',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
                        {index:'acc_name',value:name},
                         {index:'description',value:description}],
                    log_data:{title:'Updated',notes:'Account '+name,link_to:'form71'}}; 				
                    
                update_json(data_json);
                $(form).readonly();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form71_delete_item(button)
        {
            var form_id=$(button).attr('form');
            var form=document.getElementById(form_id);
            var type=form.elements['type'].value;

            if(is_delete_access('form71') && type=='financial')
            {
                modal115_action(function()
                {		
                    var name=form.elements['name'].value;
                    var description=form.elements['description'].value;
                    var data_id=form.elements['id'].value;
                    var last_updated=get_my_time();
                    
                    var data_json={data_store:'accounts',
	 				log:'yes',
	 				data:[{index:'id',value:data_id}],
	 				log_data:{title:'Deleted',notes:'Account '+name,link_to:'form71'}}; 				
                    delete_json(data_json);

                    $(button).parent().parent().parent().parent().remove();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form71_import_template()
        {
            var data_array=['id','acc_name','description'];
            my_array_to_csv(data_array);
        };

        function form71_import_validate(data_array)
        {
            var validate_template_array=[{column:'acc_name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')}];
            var error_array=vImport.validate(data_array,validate_template_array);
            return error_array;					
        }

        function form71_import(data_array,import_type)
        {
            var data_json={data_store:'accounts',
 					loader:'no',
 					log:'yes',
 					data:[],
 					log_data:{title:'Accounts for financial purposes',link_to:'form71'}};

			var counter=1;
			var last_updated=get_my_time();
		
			data_array.forEach(function(row)
			{
				counter+=1;
				if(import_type=='create_new')
				{
					row.id=last_updated+counter;
				}
				
				var data_json_array=[{index:'id',value:row.id},
	 					{index:'acc_name',value:row.acc_name},
	 					{index:'description',value:row.description},
	 					{index:'type',value:'financial'},
	 					{index:'last_updated',value:last_updated}];

				data_json.data.push(data_json_array);
			});
			
			if(import_type=='create_new')
			{
				create_batch_json(data_json);
			}
			else
			{
				update_batch_json(data_json);
			}
        };
        
    </script>
</div>