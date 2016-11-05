<div id='form259' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form259_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form259_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form259_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form259_header'></form>
						<th><input type='text' placeholder="Quotation #" class='floatlabel' name='quot' form='form259_header'></th>
						<th><input type='text' placeholder="Customer" class='floatlabel' name='cust' form='form259_header'></th>
						<th><input type='text' placeholder="Date" class='floatlabel' name='date' form='form259_header'></th>
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form259_header'></th>
						<th><input type='submit' form='form259_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form259_body'>
			</tbody>
		</table>
	</div>

    <script>
    function form259_header_ini()
    {
        var filter_fields=document.getElementById('form259_header');
        var quot_filter=filter_fields.elements['quot'];
        var cust_filter=filter_fields.elements['cust'];
		var date_filter=filter_fields.elements['date'];
        var status_filter=filter_fields.elements['status'];

        $(filter_fields).off('submit');
        $(filter_fields).on('submit',function(event)
        {
            event.preventDefault();
            form259_ini();
        });

        var quot_data={data_store:'quotation',return_column:'quot_num'};
        var cust_data={data_store:'customers',return_column:'acc_name'};

        set_my_filter_json(quot_data,quot_filter);
        set_my_filter_json(cust_data,cust_filter);
        set_static_filter_json('quotation','status',status_filter);

		$('#form259').formcontrol();
    };

    function form259_ini()
    {
        show_loader();
        var fid=$("#form259_link").attr('data_id');
        if(fid==null)
            fid="";

        $('#form259_body').html("");

        var filter_fields=document.getElementById('form259_header');
        var fquot_id=filter_fields.elements['quot'].value;
        var fname=filter_fields.elements['cust'].value;
		var fdate=vTime.unix({date:filter_fields.elements['date'].value});
        var fstatus=filter_fields.elements['status'].value;

        var paginator=$('#form259_body').paginator();

		var columns={count:paginator.page_size(),
					start_index:paginator.get_index(),
					data_store:'quotation',
					indexes:[{index:'id',value:fid},
                            {index:'quot_num',value:fquot_id},
							{index:'customer',value:fname},
							{index:'status',value:fstatus},
							{index:'date',value:fdate}]};

        read_json_rows('form259',columns,function(results)
        {
            results.forEach(function(result)
            {
                var rowsHTML="<tr>";
                    rowsHTML+="<form id='form259_"+result.id+"'></form>";
                        rowsHTML+="<td data-th='Quotation #'>";
                            rowsHTML+="<a onclick=\"element_display('"+result.id+"','form258');\"><input type='text' readonly='readonly' form='form259_"+result.id+"' value='"+result.quot_num+"'></a>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Customer'>";
                            rowsHTML+="<a onclick=\"show_object('customers','"+result.customer+"');\"><textarea readonly='readonly' form='form259_"+result.id+"'>"+result.customer+"</textarea></a>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Date'>";
                            rowsHTML+="<input type='text' readonly='readonly' form='form259_"+result.id+"' value='"+get_my_past_date(result.date)+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Status'>";
                            rowsHTML+="<input type='text' readonly='readonly' form='form259_"+result.id+"' value='"+result.status+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Action'>";
                            rowsHTML+="<input type='hidden' form='form259_"+result.id+"' value='"+result.id+"'>";
                            rowsHTML+="<button type='button' class='btn red' form='form259_"+result.id+"' title='Delete Quotation' onclick='form259_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                        rowsHTML+="</td>";
                rowsHTML+="</tr>";

                $('#form259_body').append(rowsHTML);
            });

            $('#form259').formcontrol();
            paginator.update_index(results.length);
			vExport.export_buttons({action:'dynamic',columns:columns,file:'Quotations',report_id:'form259',feach:function (item)
			{
                item.date=get_my_past_date(item.date);
            }});
			hide_loader();
        });
    }

    function form259_delete_item(button)
    {
        if(is_delete_access('form259'))
        {
            modal115_action(function()
            {
                var form_id=$(button).attr('form');
                var form=document.getElementById(form_id);
                var quot_num=form.elements[0].value;
                var data_id=form.elements[4].value;

                var data_json={data_store:'quotation',
	 				log:'yes',
	 				data:[{index:'id',value:data_id}],
	 				log_data:{title:'Deleted',notes:'Quotation # '+quot_num,link_to:'form259'}};

                var item_json={data_store:'quotation_items',data:[{index:'quotation_id',value:data_id}]};

                delete_json(data_json);
                delete_json(item_json);

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
