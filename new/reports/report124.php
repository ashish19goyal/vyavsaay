<div id='report124' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report124_ini();'>Refresh</a>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick=report124_add_filter();>Add Filter</a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='report124_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                        <a id='report124_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='report124_header' autocomplete="off">
			<input type='submit' class='submit_hidden'>
			<fieldset id='report124_filters'></fieldset>
		</form>
		<br>
		<!-- <table width="100%"> -->
		<div class='row'>
			<div class='col-sm-4' style='padding-left:0px;padding-right:0px;'>
				<table class="table table-striped table-bordered table-hover">
					<thead>
						<tr>
							<th>Caller</th>
							<th>Issuing Company</th>
				        </tr>
					</thead>
					<tbody id='report124_body1'></tbody>
				</table>
			</div>
			<div class='col-sm-8' style='padding-left:0px;padding-right:0px;'>
				<div style='width:100%;overflow-x:auto;overflow-y:hidden;'>
					<table class="table table-striped table-bordered table-hover">
						<thead id='report124_thead'>
							<tr>
							    <th># of Policies</th>
								<th>Total Premium</th>
								<th>Total Short Premium</th>
							</tr>
						</thead>
						<tbody id='report124_body2'></tbody>
					</table>
				</div>
			</div>
		</div>

	</div>

	<script>

	function report124_add_filter()
	{
		var form=document.getElementById('report124_header');
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

		var fieldset=document.getElementById('report124_filters');
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
				$('#report124').formcontrol();
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
		$('#report124').formcontrol();
	}

    function report124_header_ini()
    {
		var form=document.getElementById('report124_header');
		$('#report124_filters').html('');
		report124_add_filter();

		$(form).off('submit');
        $(form).on('submit',function(event)
        {
            event.preventDefault();
            report124_ini();
        });

		$('#report124_thead>tr>th').each(function(index)
		{
			$(this).attr('colspan',1);
		});

		var paginator=$('#report124_body1').paginator({visible:false});
        setTimeout(function(){$('#report124').formcontrol();},500);
    }

    function report124_ini()
    {
        var form=document.getElementById('report124_header');

        show_loader();
        $('#report124_body1').html('');
		$('#report124_body2').html('');

        var columns={data_store:'policies',
					indexes:[{index:'id'},
                        {index:'issuer'},
                        {index:'tele_caller'},
						{index:'premium'},
						{index:'short_premium'},
						{index:'issue_date'},
						{index:'status',exact:'issued'}]};

		$('#report124_filters .row').each(function(index)
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

		read_json_rows('report124',columns,function(policies)
        {
			var months_object={};
			for(var i in policies)
			{
				policies[i].year = vTime.year({date:policies[i].issue_date,inputFormat:'unix'});
				policies[i].month = vTime.monthName({date:policies[i].issue_date,inputFormat:'unix'});
				var obj_name = policies[i].year+"-"+policies[i].month;
				months_object[obj_name]={m:policies[i].month,y:policies[i].year};
			}

			var months_array = vUtil.objectToArray(months_object);

			var allMonths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
			months_array.sort(function(a,b){
				if(a.y>b.y)
					return 1;
				else if(a.y<b.y)
					return -1;
				else
			    	return allMonths.indexOf(a.m) > allMonths.indexOf(b.m);
			});

			var numMonths = months_array.length;

			$('#report124_thead>tr>th').each(function(index)
			{
				$(this).attr('colspan',numMonths);
			});

			var row2 = "<tr><td>-</td><td>-</td></tr>";
			$('#report124_body1').append(row2);
			$('#report124_body1').append(row2);

			var yearsCells = "";
			var years_object = {};
			for(var a in months_array)
			{
				if(vUtil.isBlank(years_object[months_array[a].y]))
				{
					years_object[months_array[a].y]=0;
				}

				years_object[months_array[a].y]+=1;
			}

			for(var b in years_object)
			{
				yearsCells+="<td colspan='"+years_object[b]+"'>"+b+"</td>";
			}

			var monthsCells = "";
			for(var i in months_array)
			{
				monthsCells+="<td>"+months_array[i].m+"</td>";
			}

			var row2 = "<tr>"+yearsCells+yearsCells+yearsCells+"</tr>";
			$('#report124_body2').append(row2);
			var row2 = "<tr>"+monthsCells+monthsCells+monthsCells+"</tr>";
			$('#report124_body2').append(row2);

			var grid_array={};

			policies.sort(function(a,b){
				return a.tele_caller > b.tele_caller;
			});

            policies.forEach(function(item)
            {
				var obj_name = item.tele_caller+"-"+item.issuer;
				var total_obj = item.tele_caller+"-total";

				if(vUtil.isBlank(grid_array[total_obj]))
				{
					grid_array[total_obj]= {'tele_caller':item.tele_caller,
											'issuer':'Total'};

					months_array.forEach(function(month){
						grid_array[total_obj]['num-'+month.y+month.m] = 0;
						grid_array[total_obj]['p-'+month.y+month.m] = 0;
						grid_array[total_obj]['sp-'+month.y+month.m] = 0;
					});
				}

				if(vUtil.isBlank(grid_array[obj_name]))
				{
					grid_array[obj_name]= {'tele_caller':item.tele_caller,
											'issuer':item.issuer};

					months_array.forEach(function(month){
						grid_array[obj_name]['num-'+month.y+month.m] = 0;
						grid_array[obj_name]['p-'+month.y+month.m] = 0;
						grid_array[obj_name]['sp-'+month.y+month.m] = 0;
					});
				}

				grid_array[total_obj]['num-'+item.year+item.month] += 1;
				if(!vUtil.isBlank(item.premium) && !isNaN(item.premium)){
					grid_array[total_obj]['p-'+item.year+item.month] += parseFloat(item.premium);
				}
				if(!vUtil.isBlank(item.short_premium) && !isNaN(item.short_premium)){
					grid_array[total_obj]['sp-'+item.year+item.month] += parseFloat(item.short_premium);
				}

				grid_array[obj_name]['num-'+item.year+item.month] += 1;
				if(!vUtil.isBlank(item.premium) && !isNaN(item.premium)){
					grid_array[obj_name]['p-'+item.year+item.month] += parseFloat(item.premium);
				}
				if(!vUtil.isBlank(item.short_premium) && !isNaN(item.short_premium)){
					grid_array[obj_name]['sp-'+item.year+item.month] += parseFloat(item.short_premium);
				}

			});

			for (var a in grid_array)
			{
				var item = grid_array[a];
				if(!vUtil.isBlank(item.tele_caller || true))
				{
					var rows1HTML="<tr>";
	                rows1HTML+="<td>";
						rows1HTML+=item.tele_caller;
	                rows1HTML+="</td>";
					rows1HTML+="<td>";
						rows1HTML+=item.issuer;
	                rows1HTML+="</td>";
					rows1HTML+="</tr>";

					$('#report124_body1').append(rows1HTML);

					var num = "";
					var premium = "";
					var spremium ="";
					months_array.forEach(function(month)
					{
						num+="<td>"+item['num-'+month.y+month.m]+"</td>";
						premium+="<td>"+vUtil.round(item['p-'+month.y+month.m])+"</td>";
						spremium+="<td>"+vUtil.round(item['sp-'+month.y+month.m])+"</td>";
					});

					var	rows2HTML="<tr>"+num+premium+spremium+"</tr>";

					$('#report124_body2').append(rows2HTML);
				}
            }

			initialize_static_tabular_report_buttons('Tele-caller Performance Grid','report124');

            hide_loader();
        });
    };

	</script>
</div>
