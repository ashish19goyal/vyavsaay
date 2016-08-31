<div id='report122' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report122_ini();'>Refresh</a>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick=report122_add_filter();>Add Filter</a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='report122_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                        <a id='report122_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='report122_header' autocomplete="off">
			<input type='submit' class='submit_hidden'>
			<fieldset id='report122_filters'></fieldset>
		</form>
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Application #</th>
					<th>Issuing Company</th>
		            <th>Holder</th>
		            <th>Agent</th>
					<th>Sum Insured</th>
					<th>Premium</th>
				</tr>
			</thead>
			<tbody id='report122_body'></tbody>
		</table>
	</div>

	<script>

	function report122_add_filter()
	{
		var form=document.getElementById('report122_header');
		var f_filter=document.createElement('input');
		f_filter.type='text';
		f_filter.placeholder='Filter By';
		f_filter.className='floatlabel';
		f_filter.setAttribute('data-name','f');

		var v_filter=document.createElement('input');
		v_filter.type='text';
		v_filter.placeholder='Filter Value';
		v_filter.className='floatlabel';
		v_filter.setAttribute('data-name','v');

		var i_filter=document.createElement('input');
		i_filter.type='hidden';
		i_filter.setAttribute('data-name','i');
		i_filter.value='status';

		var from_filter=document.createElement('input');
		from_filter.type='text';
		from_filter.placeholder='From Date';
		from_filter.className='floatlabel';
		from_filter.setAttribute('data-name','from');

		var to_filter=document.createElement('input');
		to_filter.type='text';
		to_filter.placeholder='To Date';
		to_filter.className='floatlabel';
		to_filter.setAttribute('data-name','to');

		var remove_link = document.createElement('a');
		remove_link.onclick = function(){
			$(this).parent().parent().remove();
		};
		remove_link.style="vertical-align:top";
		remove_link.title="Remove Filter";
		remove_link.innerHTML = "<i class='fa fa-times' style='font-size:25px;margin-top:20px;'></i>";

		var row=document.createElement('div');
		row.className='row';
		var col=document.createElement('div');
		col.className='col-md-12';

		var label1=document.createElement('label');
		var label2=document.createElement('label');
		var label3=document.createElement('label');
		var label4=document.createElement('label');
		// var label5=document.createElement('label');

		row.appendChild(col);
		col.appendChild(label1);
		col.appendChild(label2);
		col.appendChild(label3);
		col.appendChild(label4);
		col.appendChild(remove_link);

		label1.appendChild(f_filter);
		label2.appendChild(v_filter);
		label3.appendChild(from_filter);
		label4.appendChild(to_filter);
		// label5.appendChild(remove_link);
		col.appendChild(i_filter);

		var fieldset=document.getElementById('report122_filters');
		fieldset.appendChild(row);

		var data=['Application #','Issue Type','End Date','Start Date','Issue Date',
					'Tele Caller','Sales Manager','Team Lead','Agent','Issuing Company',
					'Policy Name','Policy Holder','Preferred','Term'];
		set_value_list_json(data,f_filter);

		$(from_filter).datepicker();
		$(to_filter).datepicker();

		function s(x){
			if(!vUtil.isBlank(x) && x=='d'){
				$(from_filter).show();
				$(to_filter).show();
				$(v_filter).hide();
				$('#report122').formcontrol();
			}else{
				$(from_filter).hide();
				$(to_filter).hide();
				$(v_filter).show();
				var value_data={data_store:'policies',return_column:i_filter.value};
				set_my_filter_json(value_data,v_filter);
			}
			v_filter.value="";
			from_filter.value="";
			to_filter.value="";
		}

		s();
		vUtil.onChange(f_filter,function()
		{
			switch(f_filter.value)
			{
				case 'Application #': i_filter.value = 'application_num'; s(); break;
				case 'Issue Type': i_filter.value = 'issue_type'; s(); break;
				case 'End Date':  i_filter.value = 'end_date'; s('d'); break;
				case 'Start Date':  i_filter.value = 'start_date'; s('d'); break;
				case 'Issue Date':  i_filter.value = 'issue_date'; s('d'); break;
				case 'Tele Caller': i_filter.value = 'tele_caller'; s(); break;
				case 'Sales Manager': i_filter.value = 'sales_manager'; s(); break;
				case 'Team Lead': i_filter.value = 'team_lead'; s(); break;
				case 'Agent': i_filter.value = 'agent'; s(); break;
				case 'Issuing Company': i_filter.value = 'issuer'; s(); break;
				case 'Policy Name': i_filter.value = 'policy_name'; s(); break;
				case 'Policy Holder': i_filter.value = 'policy_holder'; s(); break;
				case 'Preferred': i_filter.value = 'preferred'; s(); break;
				case 'Term': i_filter.value = 'term'; s(); break;
				default: i_filter.value = 'status'; s();
			}
		});
		$('#report122').formcontrol();
	}

    function report122_header_ini()
    {
		var form=document.getElementById('report122_header');
		$('#report122_filters').html('');
		report122_add_filter();

		$(form).off('submit');
        $(form).on('submit',function(event)
        {
            event.preventDefault();
            report122_ini();
        });

        setTimeout(function(){$('#report122').formcontrol();},500);
    }

    function report122_ini()
    {
        var form=document.getElementById('report122_header');

        show_loader();
        $('#report122_body').html('');

        var paginator=$('#report122_body').paginator({'page_size':25});

        var columns={count:paginator.page_size(),
                    start_index:paginator.get_index(),
                    data_store:'policies',
					indexes:[{index:'id'},
                        {index:'application_num'},
                        {index:'issuer'},
                        {index:'policy_holder'},
						{index:'agent'},
						{index:'sum_insured'},
						{index:'premium'},
						{index:'issue_date'},
						{index:'end_date'},
						{index:'status',exact:'applied'}]};

		$('#report122_filters .row').each(function(index)
		{
			var row = this;
			var f_filter = $(this).find("input[data-name='f']").val();
			var v_filter = $(this).find("input[data-name='v']").val();
			var i_filter = $(this).find("input[data-name='i']").val();
			var from_filter = $(this).find("input[data-name='from']").val();
			var to_filter = $(this).find("input[data-name='to']").val();

			if(!vUtil.isBlank(v_filter)){
				columns.indexes.push({index:i_filter,value:v_filter});
			}
			else{
				if(!vUtil.isBlank(from_filter)){
					columns.indexes.push({index:i_filter,lowerbound:vTime.unix({date:from_filter})});
				}
			 	if(!vUtil.isBlank(to_filter)){
					columns.indexes.push({index:i_filter,upperbound:vTime.unix({date:to_filter})});
				}
			}
		});

		read_json_rows('report122',columns,function(items)
        {
            var rowsHTML="";
            items.forEach(function(item)
            {
                rowsHTML+="<tr>";
                rowsHTML+="<form id='report122_"+item.id+"'></form>";
                rowsHTML+="<td data-th='Application #'>";
				    rowsHTML+="<a onclick=\"show_object('policies','','"+item.id+"');\">"+item.application_num+"</a>";
                rowsHTML+="</td>";
				rowsHTML+="<td data-th='Issuing Company'>";
					rowsHTML+=item.issuer;
                rowsHTML+="</td>";
				rowsHTML+="<td data-th='Policy Holder'>";
					rowsHTML+="<a onclick=\"show_object('customers','"+item.policy_holder+"');\">"+item.policy_holder+"</a>";
                rowsHTML+="</td>";
				rowsHTML+="<td data-th='Agent'>";
					rowsHTML+=item.agent;
                rowsHTML+="</td>";
				rowsHTML+="<td data-th='Sum Insured'>";
					rowsHTML+=item.sum_insured;
                rowsHTML+="</td>";
				rowsHTML+="<td data-th='Premium'>";
					rowsHTML+=item.premium;
                rowsHTML+="</td>";
				rowsHTML+="</tr>";
            });
            $('#report122_body').append(rowsHTML);

            initialize_tabular_report_buttons(columns,'Policies Report','report122',function (item)
            {});

            paginator.update_index(items.length);
            hide_loader();
        });
    };

	</script>
</div>
