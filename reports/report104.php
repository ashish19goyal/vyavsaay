<div id='report104' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<div class='btn-group' id='report104_store' data-toggle='buttons'>
                <label class='btn green-jungle my active' onclick=report104_ini('my');><input name='my' type='radio' class='toggle'>My Store</label>
                <label class='btn green-jungle all' onclick=report104_ini('all');><input type='radio' name='all' class='toggle'>All Stores</label>
            </div>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                      	<a id='report104_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='report104_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li>
                        <a id='report104_email'><i class='fa fa-envelope'></i> Email</a>
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
					<form id='report104_header'></form>
						<th><input type='text' placeholder="Item" class='floatlabel' name='name' form='report104_header'></th>
						<th><input type='text' placeholder="Quantity" readonly='readonly' form='report104_header'></th>
				</tr>
			</thead>
			<tbody id='report104_body'>
			</tbody>
		</table>
	</div>

    <script>

        function report104_header_ini()
        {
            var filter_fields=document.getElementById('report104_header');
            var names_filter=filter_fields.elements['name'];

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                report104_ini();
            });

            var item_data={data_store:'product_master',return_column:'name'};
            set_my_filter_json(item_data,names_filter);
        };

        function report104_ini(store_type)
        {
            show_loader();
            var fid=$("#report104_link").attr('data_id');
            if(fid==null)
                fid="";

            $('#report104_body').html('');

            var store=get_session_var('user_setting_Store');
            if(typeof store_type!='undefined' && store_type=='all')
            {
                store='';
                $('#report104_store').find('label.all').addClass('active');
                $('#report104_store').find('label.my').removeClass('active');
            }
            else
            {
                $('#report104_store').find('label.my').addClass('active');
                $('#report104_store').find('label.all').removeClass('active');
            }

            var filter_fields=document.getElementById('report104_header');
            var fname=filter_fields.elements['name'].value;
            var item_columns={data_store:'product_master',
                             indexes:[{index:'id'},{index:'name',value:fname}]};

            read_json_rows('',item_columns,function (items)
            {
                items.forEach(function(result)
                {
                    var rowsHTML="<tr>";
                        rowsHTML+="<td data-th='Item'>";
                            rowsHTML+="<a onclick=\"show_object('product_master','"+result.name+"');\">"+result.name+"</a>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Quantity' id='report104_"+result.id+"'>";
                        rowsHTML+="</td>";
                    rowsHTML+="</tr>";

                    $('#report104_body').append(rowsHTML);
                    var sys_inventory=document.getElementById('report104_'+result.id);

                    if(store=='')
                    {
                        get_inventory(result.name,'',function(inventory)
                        {
                            if(inventory==0)
                            {
                                $(sys_inventory).parent().remove();
                            }
                            else
                            {
                                sys_inventory.innerHTML=inventory;
                            }
                        });
                    }
                    else
                    {
                        get_store_inventory(store,result.name,'',function(inventory)
                        {
                            if(inventory==0)
                            {
                                $(sys_inventory).parent().remove();
                            }
                            else
                            {
                                sys_inventory.innerHTML=inventory;
                            }
                        });
                    }
                });

				vExport.export_buttons({file:'Stock Report',report_id:'report104',action:'static'});

				hide_loader();
            });
        };
    </script>
</div>
