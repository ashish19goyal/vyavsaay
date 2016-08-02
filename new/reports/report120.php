<div id='report120' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
        <div class='caption'>
            <a class='btn btn-circle grey btn-outline btn-sm' onclick='report120_ini();'>Refresh</a>
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
        <form id='report120_master'>
			<label><input type='text' placeholder="Filter By" class='floatlabel' name='filter'></label>
			<label><input type='text' placeholder="Filter Value" class='floatlabel' name='v'></label>
			<label><input type='text' placeholder="From Date" class='floatlabel' name='from'></label>
			<label><input type='text' placeholder="To Date" class='floatlabel' name='to'></label>
			<input type='hidden' name='index' value='status'>
		</form>

	   <div class='horizontal-bar-chart' id='report120_chart'></div>
    </div>

	<script>

	function report120_header_ini()
	{
		var form=document.getElementById('report120_master');
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
		  event.preventDefault();
		  report120_ini();
	  	});

		var f_filter=form.elements['filter'];
		var v_filter=form.elements['v'];
		var from_filter=form.elements['from'];
		var to_filter=form.elements['to'];
		var f_filter_index=form.elements['index'];

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
				$('#report119').formcontrol();
			}else{
				$(from_filter).hide();
				$(to_filter).hide();
				$(v_filter).show();
				var value_data={data_store:'policies',return_column:f_filter_index.value};
				set_my_filter_json(value_data,v_filter);
			}
			v_filter.value="";
			from_filter.value="";
			to_filter.value="";
		}

		s();
		f_filter.value="";
		vUtil.onChange(f_filter,function()
		{
			switch(f_filter.value)
			{
				case 'Application #': f_filter_index.value = 'application_num'; s(); break;
				case 'Policy #': f_filter_index.value = 'policy_num'; s(); break;
				case 'Issue Type': f_filter_index.value = 'issue_type'; s(); break;
				case 'End Date':  f_filter_index.value = 'end_date'; s('d'); break;
				case 'Start Date':  f_filter_index.value = 'start_date'; s('d'); break;
				case 'Issue Date':  f_filter_index.value = 'issue_date'; s('d'); break;
				case 'Tele Caller': f_filter_index.value = 'tele_caller'; s(); break;
				case 'Sales Manager': f_filter_index.value = 'sales_manager'; s(); break;
				case 'Team Lead': f_filter_index.value = 'team_lead'; s(); break;
				case 'Agent': f_filter_index.value = 'agent'; s(); break;
				case 'Issuing Company': f_filter_index.value = 'issuer'; s(); break;
				case 'Policy Name': f_filter_index.value = 'policy_name'; s(); break;
				case 'Policy Holder': f_filter_index.value = 'policy_holder'; s(); break;
				case 'Preferred': f_filter_index.value = 'preferred'; s(); break;
				case 'Term': f_filter_index.value = 'term'; s(); break;
				default: f_filter_index.value = 'status'; s();
			}
		});

		var paginator=$('#report120').paginator({visible:false,container:$('#report120')});
      	setTimeout(function(){$('#report120').formcontrol();},500);
	}

	function report120_ini()
	{
		show_loader();
    	var form=document.getElementById('report120_master');
		var f_filter_index=form.elements['index'].value;
		var v_filter=form.elements['v'].value;
		var from_filter=vTime.unix({date:form.elements['from'].value});
		var to_filter=vTime.unix({date:form.elements['to'].value});

    	var policies_data={data_store:'policies',
                indexes:[{index:'id'},
						{index:'application_num'},
						{index:'agent'},
						{index:'policy_num'},
						{index:'issuer'},
						{index:'policy_holder'},
						{index:'issue_date'},
						{index:'premium'},
						{index:'sum_insured'}]};

		if(!vUtil.isBlank(v_filter)){
			policies_data.indexes.push({index:f_filter_index,value:v_filter});
		}
		else{
			if(!vUtil.isBlank(from_filter)){
				policies_data.indexes.push({index:f_filter_index,lowerbound:from_filter});
			}
			if(!vUtil.isBlank(to_filter)){
				policies_data.indexes.push({index:f_filter_index,upperbound:to_filter});
			}
		}

		read_json_rows('report120',policies_data,function(policies)
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

	        initialize_tabular_report_buttons(policies_data,'Policy Financials','report120',function (item)
	        {
				item['Application #']=item.application_num;
	            item['Policy #']=item.policy_num;
				item['Issuer']=item.issuer;
	            item['Policy Holder']=item.policy_holder;
				item['Agent']=item.agent;
	            item['Issue Date']=vTime.date({time:item.issue_date});
				item['Sum Insured']=item.sum_insured;
				item['Premium']=item.premium;

	            delete item.application_num;
	            delete item.agent;
	            delete item.policy_num;
	            delete item.issuer;
	            delete item.policy_holder;
	            delete item.issue_date;
				delete item.sum_insured;
				delete item.premium;
				delete item.id;
	        });
			hide_loader();
		});
    });
	}

	</script>
</div>
