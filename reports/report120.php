<div id='report120' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
        <div class='caption'>
            <a class='btn btn-circle grey btn-outline btn-sm' onclick='report120_ini();'>Refresh</a>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick=report120_add_filter();>Add Filter</a>
        </div>
        <div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                      	<a id='report120_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                        <a id='report120_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='report120_header' autocomplete="off">
			<input type='submit' class='submit_hidden'>
			<fieldset id='report120_filters'></fieldset>
		</form>
	   <div class='horizontal-bar-chart' id='report120_chart'></div>
    </div>

	<script>

	function report120_add_filter()
	{
		var form=document.getElementById('report120_header');
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

		var fieldset=document.getElementById('report120_filters');
		fieldset.appendChild(row);

		var data=['Application #','Policy #','Issue Type','End Date','Start Date','Issue Date',
					'Tele Caller','Sales Manager','Team Lead','Agent','Issuing Company',
					'Policy Name','Policy Holder','Preferred','Term','Out Source'];
		set_value_list_json(data,f_filter);

		$(from_filter).datepicker();
		$(to_filter).datepicker();

		function s(x){
			if(!vUtil.isBlank(x) && x=='d'){
				$(from_filter).show();
				$(to_filter).show();
				$(v_filter).hide();
				$('#report120').formcontrol();
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
				case 'Out Source': i_filter.value = 'out_source'; s(); break;
				default: i_filter.value = 'status'; s();
			}
		});
		$('#report120').formcontrol();
	}

	function report120_header_ini()
	{
		var form=document.getElementById('report120_master');

		$('#report120_filters').html('');
		report120_add_filter();

		$(form).off('submit');
		$(form).on('submit',function(event)
		{
		  event.preventDefault();
		  report120_ini();
	  	});

		var paginator=$('#report120').paginator({visible:false,container:$('#report120')});
      	setTimeout(function(){$('#report120').formcontrol();},500);
	}

	function report120_ini()
	{
		show_loader();
    	var form=document.getElementById('report120_master');

    	var columns={data_store:'policies',
                indexes:[{index:'id'},
						{index:'application_num'},
						{index:'agent'},
						{index:'policy_num'},
						{index:'issuer'},
						{index:'policy_holder'},
						{index:'issue_date'},
						{index:'premium'},
						{index:'sum_insured'},
						{index:'issue_type'},
						{index:'status',exact:'issued'}]};

		$('#report120_filters .row').each(function(index)
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

		read_json_rows('report120',columns,function(policies)
		{
			var policy_numbers = vUtil.arrayColumn(policies,'policy_num');
			var commissions_data={data_store:'policy_commissions',
								indexes:[{index:'amount'},
										{index:'commission_type'},
										{index:'policy_num',array:policy_numbers}]};
			read_json_rows('report120',commissions_data,function(commissions)
			{
				// console.log(commissions);
				var chart_data_array=[];

				var sum_insured = premium = comm = comm_basic = comm_orc = count = 0;
		        policies.forEach(function(policy)
		        {
					// count++;
					if(!vUtil.isBlank(policy.sum_insured))
					{
						sum_insured += parseFloat(policy.sum_insured);
					}
					if(!vUtil.isBlank(policy.premium))
					{
						premium += parseFloat(policy.premium);
					}
	        	});

				commissions.forEach(function(commission)
		        {
					// count++;
					if(!vUtil.isBlank(commission.amount))
					{
						comm += parseFloat(commission.amount);
						if(commission.commission_type=='ORC')
						{
							comm_orc += parseFloat(commission.amount);
						}else{
							comm_basic += parseFloat(commission.amount);
						}
					}
	        	});

				// var sum_insured_obj={'bar':'Total Sum Insured','value':vUtil.round(sum_insured)};
				var premium_obj={'bar':'Total Premium','value':vUtil.round(premium)};
				var comm_obj={'bar':'Total Commission','value':vUtil.round(comm)};
				var comm_basic_obj={'bar':'Total Commission (Basic)','value':vUtil.round(comm_basic)};
				var comm_orc_obj={'bar':'Total Commission (ORC)','value':vUtil.round(comm_orc)};
				// var count_obj={'bar':'Total Policy Count','value':count};

				// chart_data_array.push(sum_insured_obj);
				chart_data_array.push(premium_obj);
				chart_data_array.push(comm_obj);
				chart_data_array.push(comm_basic_obj);
				chart_data_array.push(comm_orc_obj);
				// chart_data_array.push(count_obj);

				var chart = AmCharts.makeChart("report120_chart", {
	                "type": "serial",
	                "theme": "light",
	                "handDrawn": true,
	                "handDrawScatter": 3,
	                "legend": {
	                    "useGraphSettings": true,
	                    "markerSize": 12,
	                    "valueWidth": 0,
	                    "verticalGap": 0
	                },
	                "dataProvider": chart_data_array,
	                "valueAxes": [{
	                    "stackType": "regular",
	                    "axisAlpha": 0.3,
	                    "gridAlpha": 0,
	                    "minorGridAlpha": 0.08,
	                    "minorGridEnabled": true,
	                    "position": "top"
	                }],
	                "startDuration": 1,
	                "graphs": [{
	                    "balloonText": "<b>[[category]]</b><br><span style='font-size:14px'>[[title]]: <b>[[value]]</b></span>",
	                    "labelText": "[[value]]",
	                    "title": "Rs. ",
	                    "type": "column",
	                    "backgroundColor": "#D05454",
	                    "color": "#000000",
	                    "fillAlphas": 0.8,
	                    "valueField": "value"
	                }],
	                "rotate": true,
	                "categoryField": "bar",
	                "categoryAxis": {
	                    "gridPosition": "start"
	                }
	        });

	        $('#report120_chart').find('div>div>a').hide();

	        initialize_tabular_report_buttons(columns,'Policy Financials','report120',function (item)
	        {
				item['Application #']=item.application_num;
	            item['Policy #']=item.policy_num;
				item['Issuer']=item.issuer;
	            item['Policy Holder']=item.policy_holder;
				item['Agent']=item.agent;
	            item['Issue Date']=vTime.date({time:item.issue_date});
				item['Sum Insured']=item.sum_insured;
				item['Premium']=item.premium;
				item['Issue Type']=item.issue_type;

	            delete item.application_num;
	            delete item.agent;
	            delete item.policy_num;
	            delete item.issuer;
	            delete item.policy_holder;
	            delete item.issue_date;
				delete item.sum_insured;
				delete item.premium;
				delete item.id;
				delete item.issue_type;
	        });
			hide_loader();
		});
    });
	}

	</script>
</div>
