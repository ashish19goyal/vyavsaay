<div id='report107' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
        <div class='caption'>
            <a class='btn btn-circle grey btn-outline btn-sm' onclick='report107_ini();'>Refresh</a>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick=report107_add_filter();>Add Filter</a>
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
		<form id='report107_header' autocomplete="off">
			<input type='submit' class='submit_hidden'>
			<fieldset id='report107_filters'></fieldset>
		</form>
	   <div class='horizontal-bar-chart' id='report107_chart'></div>
    </div>

	<script>

	function report107_add_filter()
	{
		var form=document.getElementById('report107_header');
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

		var fieldset=document.getElementById('report107_filters');
		fieldset.appendChild(row);

		var data=['Policy #','Issue Date','Agent','Issuing Company','Commission Type'];
		set_value_list_json(data,f_filter);

		$(from_filter).datepicker();
		$(to_filter).datepicker();

		function s(x){
			if(!vUtil.isBlank(x) && x=='d'){
				$(from_filter).show();
				$(to_filter).show();
				$(v_filter).hide();
				$('#report107').formcontrol();
			}else{
				$(from_filter).hide();
				$(to_filter).hide();
				$(v_filter).show();
				var value_data={data_store:'policy_commissions',return_column:i_filter.value};
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
				case 'Policy #': i_filter.value = 'policy_num'; s(); break;
				case 'Issue Date':  i_filter.value = 'issue_date'; s('d'); break;
				case 'Agent': i_filter.value = 'agent'; s(); break;
				case 'Issuing Company': i_filter.value = 'issuer'; s(); break;
				case 'Commission Type': i_filter.value = 'commission_type'; s(); break;
				default: i_filter.value = 'commission_type'; s();
			}
		});
		$('#report107').formcontrol();
	}

  	function report107_header_ini()
	{
      var form=document.getElementById('report107_header');

	  $('#report107_filters').html('');
	  report107_add_filter();

      $(form).off('submit');
      $(form).on('submit',function(event)
      {
          event.preventDefault();
          report107_ini();
      });

	  var paginator=$('#report107').paginator({visible:false,container:$('#report107')});
      setTimeout(function(){$('#report107').formcontrol();},500);
	}

	function report107_ini()
	{
		show_loader();
    	var form=document.getElementById('report107_header');

    	var columns={data_store:'policy_commissions',
                indexes:[{index:'id'},
						{index:'agent'},
						{index:'amount'},
						{index:'policy_num'},
						{index:'issuer'},
						{index:'premium'},
						{index:'comm_percent'},
						{index:'issue_date'},
						{index:'commission_type'}]};

		$('#report107_filters .row').each(function(index)
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
					columns.indexes.push({index:i_filter,lowerbound:from_filter});
				}
			 	if(!vUtil.isBlank(to_filter)){
					columns.indexes.push({index:i_filter,upperbound:to_filter});
				}
			}
		});

		read_json_rows('report107',columns,function(commissions)
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
				var obj={'agent':ua,'total_amount':vUtil.round(total_amount)};
				chart_data_array.push(obj);
        	});

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

        initialize_tabular_report_buttons(columns,'Commissions Report','report107',function (item)
        {
			item['Issuing Company']=item.issuer;
            item['Policy #']=item.policy_num;
			item['Agent']=item.agent;
			item['Premium']=item.premium;
			item['Commission Type']=item.commission_type;
			item['Commission %']=item.comm_percent;
			item['Commission Amount']=item.amount;
			item['Issue Date']=get_my_past_date(item.issue_date);

            delete item.agent;
            delete item.amount;
            delete item.policy_num;
            delete item.issuer;
            delete item.commission_type;
            delete item.comm_percent;
			delete item.premium;
            delete item.issue_date;
        });

        hide_loader();
    });
	}

	</script>
</div>
