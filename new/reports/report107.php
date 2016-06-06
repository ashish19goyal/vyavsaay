<div id='report107' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
        <div class='caption'>
            <a class='btn btn-circle grey btn-outline btn-sm' onclick='report107_ini();'>Refresh</a>
        </div>
        <div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                      	<a id='report107_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                        <a id='report107_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
        <form id='report107_master'>
						<label><input type='text' name='agent' class='floatlabel' placeholder='Agent Name'></label>
            <label><input type='text' required name='start' class='floatlabel' placeholder='Start Date'></label>
            <label><input type='text' required name='end' class='floatlabel' placeholder='End Date'></label>
        </form>

	   <div class='horizontal-bar-chart' id='report107_chart'></div>
    </div>

	<script>

  function report107_header_ini()
	{
      var form=document.getElementById('report107_master');
			var agent_filter=form.elements['agent'];
      var start_date=form.elements['start'];
      var end_date=form.elements['end'];

      $(form).off('submit');
      $(form).on('submit',function(event)
      {
          event.preventDefault();
          report107_ini();
      });

			var agent_data={data_store:'staff',return_column:'acc_name'};
			set_my_filter_json(agent_data,agent_filter);

      $(start_date).datepicker();
      $(end_date).datepicker();
      start_date.value=get_my_past_date((get_my_time()-(30*86400000)));
      end_date.value=vTime.date();

			var paginator=$('#report107').paginator({visible:false,container:$('#report107')});

      $('#report107').formcontrol();
	}

	function report107_ini()
	{
		show_loader();
    var form=document.getElementById('report107_master');
		var agent_name=form.elements['agent'].value;
    var start_date=get_raw_time(form.elements['start'].value);
    var end_date=get_raw_time(form.elements['end'].value)+86400000-1;

    var commissions_data={data_store:'policy_commissions',
                indexes:[{index:'id'},
												{index:'commission_num'},
                        {index:'agent',value:agent_name},
												{index:'amount'},
												{index:'policy_num'},
												{index:'policy_holder'},
												{index:'issuer'},
												{index:'policy_type'},
												{index:'issue_date',lowerbound:start_date,upperbound:end_date},
												{index:'status',exact:'received'},
												{index:'notes'}]};

    read_json_rows('report107',commissions_data,function(commissions)
    {
				//console.log(commissions);
				var agents=vUtil.arrayColumn(commissions,'agent');
				var unique_agents=vUtil.arrayUnique(agents);
				var chart_data_array=[];

        unique_agents.forEach(function(ua)
        {
						var total_amount=0;
						for(var i=0;i<commissions.length;i++)
						{
							if(ua==commissions[i].agent)
								total_amount+=parseFloat(commissions[i].amount);
						}
						var obj={'agent':ua,'total_amount':total_amount};
						chart_data_array.push(obj);
        });

				console.log(chart_data_array);

        var chart = AmCharts.makeChart("report107_chart", {
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
                    "title": "Commission (in Rs.) ",
                    "type": "column",
                    "backgroundColor": "#D05454",
                    "color": "#000000",
                    "fillAlphas": 0.8,
                    "valueField": "total_amount"
                }],
                "rotate": true,
                "categoryField": "agent",
                "categoryAxis": {
                    "gridPosition": "start"
                }
        });

        $('#report107_chart').find('div>div>a').hide();

        initialize_tabular_report_buttons(commissions_data,'Commissions Report','report107',function (item)
        {
					  item['Agent']=item.agent;
            item['Commission #']=item.commission_num;
            item['Amount']=item.amount;
						item['Policy #']=item.policy_num;
						item['Issuer']=item.issuer;
            item['Policy Holder']=item.policy_holder;
            item['Policy Type']=item.policy_type;
            item['Notes']=item.notes;
						item['Issue Date']=get_my_past_date(item.issue_date);
            item['Status']=item.status;

            delete item.commission_num;
            delete item.agent;
            delete item.amount;
            delete item.policy_num;
            delete item.issuer;
            delete item.policy_holder;
            delete item.policy_type;
            delete item.notes;
            delete item.issue_date;
            delete item.status;
        });

        hide_loader();
    });
	}

	</script>
</div>
