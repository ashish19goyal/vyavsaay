<div id='report4' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
        <div class='caption'>
            <a class='btn btn-circle grey btn-outline btn-sm' onclick='report4_ini();'>Refresh</a>
		</div>
        <div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                      	<a id='report4_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                        <a id='report4_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='report4_header' autocomplete="off">
			<fieldset>
                <label><input type='text' placeholder="From Date" class='floatlabel' required name='from'></label>
                <label><input type='text' placeholder="To Date" class='floatlabel' required name='to'></label>
                <input type='submit' class='submit_hidden'>
            </fieldset>
		</form>
	   <div class='horizontal-bar-chart' id='report4_chart'></div>
    </div>

	<script>

	function report4_header_ini()
	{
		var form=document.getElementById('report4_header');
		var start_date_filter=form.elements['from'];
		var end_date_filter=form.elements['to'];

		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			report4_ini();
		});

		$(start_date_filter).datepicker();
		$(end_date_filter).datepicker();
		start_date_filter.value=vTime.date({addDays:-30});
		end_date_filter.value=vTime.date();
		var paginator=$('#report4').paginator({'visible':false,'container':$('#report4')});
		vUtil.delay(function(){
			$('#report4').formcontrol();
		});
	}

	function report4_ini()
	{
		show_loader();
		var form=document.getElementById('report4_header');
		var start_date=vTime.unix({date:form.elements['from'].value});
		var end_date=vTime.unix({date:form.elements['to'].value});

		var modes_data={data_store:'receipts',
						indexes:[{index:'mode_payment'},
								{index:'type',exact:'received'},
								{index:'amount'},
								{index:'date',lowerbound:start_date,upperbound:end_date}]};

		read_json_rows('report4',modes_data,function(modes)
		{
			var modes_array=vUtil.arrayColumn(modes,'mode_payment');
			var unique_modes=vUtil.arrayUnique(modes_array);
			var chart_data_array=[];

	        unique_modes.forEach(function(ua)
	        {
				var total_amount=0;
				for(var i=0;i<modes.length;i++)
				{
					if(ua==modes[i].mode_payment)
						total_amount+=parseFloat(modes[i].amount);
				}
				var obj={'mode':ua,'total_amount':vUtil.round(total_amount)};
				chart_data_array.push(obj);
        	});

        	var chart = AmCharts.makeChart("report4_chart", {
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
                    "title": "Amount (in Rs.) ",
                    "type": "column",
                    "backgroundColor": "#D05454",
                    "color": "#000000",
                    "fillAlphas": 0.8,
                    "valueField": "total_amount"
                }],
                "rotate": true,
                "categoryField": "mode",
                "categoryAxis": {
                    "gridPosition": "start"
                }
        });

        $('#report4_chart').find('div>div>a').hide();

			vExport.export_buttons({action:'dynamic',columns:modes_data,file:'Payment Mode Report',report_id:'report4'});
			hide_loader();
		});
	};

	</script>
</div>
