<div id='report125' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report125_ini();'>Refresh</a>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick=report125_add_filter();>Add Filter</a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='report125_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                        <a id='report125_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
					<li>
                        <a id='report125_print'><i class='fa fa-print'></i> Print</a>
                    </li>
					<li>
						<a id='report125_pdf'><i class='fa fa-file-pdf-o'></i> Download as PDF</a>
					</li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='report125_header' autocomplete="off">
			<input type='submit' class='submit_hidden'>
			<fieldset id='report125_filters'></fieldset>
		</form>
		<br>
		<!-- <table width="100%"> -->
		<div class='row'>
			<div class='col-sm-4' style='padding-left:0px;padding-right:0px;'>
				<table class="table table-striped table-bordered table-hover">
					<thead>
						<tr>
							<th>Issuing Company</th>
							<th>Agent</th>
				        </tr>
					</thead>
					<tbody id='report125_body1'></tbody>
				</table>
			</div>
			<div class='col-sm-8' style='padding-left:0px;padding-right:0px;'>
				<div style='width:100%;overflow-x:auto;overflow-y:hidden;'>
					<table class="table table-striped table-bordered table-hover">
						<thead id='report125_thead'>
							<tr>
							    <th>Renewal_NOP</th>
								<th>Renewed_NOP</th>
								<th>Renewed_%</th>
								<th>Renewal_Premium</th>
								<th>Renewed_Premium</th>
								<th>Renewed_Premium_%</th>
								<th>Upsell_NOP</th>
								<th>Upsell_%</th>
								<th>Upsell_Extra_Premium</th>
							</tr>
						</thead>
						<tbody id='report125_body2'></tbody>
					</table>
				</div>
			</div>
		</div>

	</div>

	<script>

	function report125_add_filter()
	{
		var form=document.getElementById('report125_header');
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

		var fieldset=document.getElementById('report125_filters');
		fieldset.appendChild(row);

		var data=['Application #','Policy #','Issue Type','End Date','Start Date','Issue Date',
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
				$('#report125').formcontrol();
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
				case 'Policy #': i_filter.value = 'policy_num'; s(); break;
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
		$('#report125').formcontrol();
	}

    function report125_header_ini()
    {
		var form=document.getElementById('report125_header');
		$('#report125_filters').html('');
		report125_add_filter();

		$(form).off('submit');
        $(form).on('submit',function(event)
        {
            event.preventDefault();
            report125_ini();
        });

		var paginator=$('#report125_body1').paginator({visible:false});
        setTimeout(function(){$('#report125').formcontrol();},500);
    }

    function report125_ini()
    {
        var form=document.getElementById('report125_header');

        show_loader();
        $('#report125_body1').html('');
		$('#report125_body2').html('');

        var columns={data_store:'policies',
					indexes:[{index:'id'},
						{index:'policy_num'},
						{index:'issuer'},
						{index:'agent'},
						{index:'premium'},
						{index:'end_date'},
						{index:'status',exact:'issued'}]};

		$('#report125_filters .row').each(function(index)
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

		read_json_rows('report125',columns,function(renewable_policies)
		{
			var policies_nums=vUtil.arrayColumn(renewable_policies,'policy_num');

			var renewed_columns={data_store:'policies',
					indexes:[{index:'id'},
						{index:'application_num',array:policies_nums},
						{index:'issuer'},
                        {index:'agent'},
						{index:'premium'}]};

			read_json_rows('report125',renewed_columns,function(renewed_policies)
	        {
				var grid_array_obj={};

				for(var i in renewable_policies)
				{
					var obj_index = renewable_policies[i].issuer+"-"+renewable_policies[i].agent;
					if(vUtil.isBlank(grid_array_obj[obj_index]))
					{
						grid_array_obj[obj_index]={'Issuing Company':renewable_policies[i].issuer,
													'Agent':renewable_policies[i].agent,
													'Renewal NOP':0,
													'Renewed NOP':0,
													'Renewed %':0,
													'Renewal Premium':0,
													'Renewed Premium':0,
													'Renewed Premium %':0,
													'Upsell NOP':0,
													'Upsell %':0,
													'Upsell Extra Premium':0};
					}

					grid_array_obj[obj_index]['Renewal NOP']+=1;
					if(!isNaN(renewable_policies[i].premium)){
						grid_array_obj[obj_index]['Renewal Premium']+=parseFloat(renewable_policies[i].premium);
					}

					for(var j in renewed_policies)
					{
						if(renewable_policies[i].policy_num==renewed_policies[j].application_num)
						{
							grid_array_obj[obj_index]['Renewed NOP']+=1;
							if(!isNaN(renewed_policies[j].premium)){
								grid_array_obj[obj_index]['Renewed Premium']+=parseFloat(renewed_policies[j].premium);
								if(parseFloat(renewed_policies[j].premium)>parseFloat(renewable_policies[i].premium))
								{
									grid_array_obj[obj_index]['Upsell NOP']+=1;
									grid_array_obj[obj_index]['Upsell Extra Premium']+=parseFloat(renewed_policies[j].premium)-parseFloat(renewable_policies[i].premium);
								}
							}
							break;
						}
					}
				}

				var grid_array = vUtil.objectToArray(grid_array_obj);

				grid_array.sort(function(a,b){
					return a.issuer > b.issuer;
				});

				for (var a in grid_array)
				{
					var item = grid_array[a];
					item['Renewed %']=vUtil.round((100*item['Renewed NOP']/item['Renewal NOP']),2);
					item['Renewal Premium']=vUtil.round(item['Renewal Premium']);
					item['Renewed Premium']=vUtil.round(item['Renewed Premium']);
					item['Renewed Premium %']=vUtil.round((100*item['Renewed Premium']/item['Renewal Premium']),2);
					item['Upsell %']=vUtil.round((100*item['Upsell NOP']/item['Renewal NOP']),2);
					item['Upsell Extra Premium']=vUtil.round(item['Upsell Extra Premium']);

					var rows1HTML="<tr>";
	                rows1HTML+="<td>";
						rows1HTML+=item['Issuing Company'];
	                rows1HTML+="</td>";
					rows1HTML+="<td>";
						rows1HTML+="<a onclick=\"show_object('staff','"+item['Agent']+"');\">"+item['Agent']+"</a>";
	                rows1HTML+="</td>";
					rows1HTML+="</tr>";

					var rows2HTML="<tr>";
					rows2HTML+="<td>";
						rows2HTML+=item['Renewal NOP'];
					rows2HTML+="</td>";
					rows2HTML+="<td>";
						rows2HTML+=item['Renewed NOP'];
					rows2HTML+="</td>";
					rows2HTML+="<td>";
						rows2HTML+=item['Renewed %'];
					rows2HTML+="</td>";
					rows2HTML+="<td>";
						rows2HTML+=item['Renewal Premium'];
					rows2HTML+="</td>";
					rows2HTML+="<td>";
						rows2HTML+=item['Renewed Premium'];
					rows2HTML+="</td>";
					rows2HTML+="<td>";
						rows2HTML+=item['Renewed Premium %'];
					rows2HTML+="</td>";
					rows2HTML+="<td>";
						rows2HTML+=item['Upsell NOP'];
					rows2HTML+="</td>";
					rows2HTML+="<td>";
						rows2HTML+=item['Upsell %'];
					rows2HTML+="</td>";
					rows2HTML+="<td>";
						rows2HTML+=item['Upsell Extra Premium'];
					rows2HTML+="</td>";
					rows2HTML+="</tr>";

					$('#report125_body1').append(rows1HTML);
					$('#report125_body2').append(rows2HTML);

	            }
				initialize_fixed_tabular_report_buttons(grid_array,'Renewals Report','report125');

	            hide_loader();
	        });
		});
    };

	</script>
</div>
