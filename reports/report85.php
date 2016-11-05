<div id='report85' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
        <div class='caption'>
            <a class='btn btn-circle grey btn-outline btn-sm' onclick='report85_ini();'>Refresh</a>
        </div>
        <div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                      	<a id='report85_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                        <a id='report85_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
        <form id='report85_master'>
            <label><input type='text' name='start' class='floatlabel' placeholder='Start Date'></label>
            <label><input type='text' name='end' class='floatlabel' placeholder='End Date'></label>
        </form>

	   <div class='horizontal-bar-chart' id='report85_chart'></div>
    </div>

	<script>

	function report85_header_ini()
	{
        var form=document.getElementById('report85_master');
        var start_date=form.elements['start'];
        var end_date=form.elements['end'];

        $(form).off('submit');
        $(form).on('submit',function(event)
        {
            event.preventDefault();
            report85_ini();
        });

        $(start_date).datepicker();
        $(end_date).datepicker();
        start_date.value=get_my_past_date((get_my_time()-(7*86400000)));
        end_date.value=vTime.date();

		var paginator=$('#report85').paginator({visible:false,container:$('#report85')});

        $('#report85').formcontrol();
	}

	function report85_ini()
	{
		show_loader();
        var form=document.getElementById('report85_master');
        var start_date=get_raw_time(form.elements['start'].value);
        var end_date=get_raw_time(form.elements['end'].value)+86399999;

        var drs_data={data_store:'drs',
					access:'yes',
                    indexes:[{index:'id'},
                            {index:'drs_num'},
                            {index:'drs_time',lowerbound:start_date,upperbound:end_date}]};

        read_json_rows('report85',drs_data,function(orders)
        {
            orders.sort(function(a,b)
            {
                if(parseFloat(a.drs_time)<parseFloat(b.drs_time))
                    return -1;
                else
                    return 1;
            });

            var drs_num_array=[];
            for(var i=0;i<orders.length;i++)
            {
                drs_num_array.push(orders[i].drs_num);
                orders[i].drs_time=get_my_past_date(orders[i].drs_time);
            }

            for(var i=0;i<orders.length;i++)
            {
                orders[i].drs_count=1;
                for(var j=i+1;j<orders.length;j++)
                {
                    if(orders[i].drs_time==orders[j].drs_time)
                    {
                        orders[i].drs_count+=1;
                        orders.splice(j,1);
                        j-=1;
                    }
                }
            }

            var chart = AmCharts.makeChart("report85_chart", {
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
                    "dataProvider": orders,
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
                        "title": "# DRS",
                        "type": "column",
                        "backgroundColor": "#D05454",
                        "color": "#000000",
                        "fillAlphas": 0.8,
                        "valueField": "drs_count"
                    }],
                    "rotate": true,
                    "categoryField": "drs_time",
                    "categoryAxis": {
                        "gridPosition": "start"
                    }
            });

            $('#report85_chart').find('div>div>a').hide();

            var columns={data_store:'logistics_orders',
					access:'yes',
                    indexes:[{index:'id'},
                        {index:'awb_num'},
                        {index:'import_date'},
                        {index:'drs_time'},
                        {index:'order_num'},
                        {index:'weight'},
                        {index:'pieces'},
                        {index:'status'},
                        {index:'delivery_person'},
                        {index:'manifest_type'},
                        {index:'merchant_name'},
                        {index:'phone'},
                        {index:'sku'},
                        {index:'return_address1'},
                        {index:'return_address2'},
                        {index:'return_address3'},
                        {index:'drs_num',array:drs_num_array}]};

			vExport.export_buttons({action:'dynamic',columns:columns,file:'DRS Report',report_id:'report85',feach:function (item)
            {
                item['AWB No']=item.awb_num;
                item['Order Id']=item.order_num;
                item['Import Date']=get_my_past_date(item.import_date);
                item['Status']=item.status;
                item['Wt']=item.weight;
                item['Pcs']=item.pieces;
                item['Delivery Boy']=item.delivery_person;
                item['AWB Type']=item.manifest_type;
                item['Merchant']=item.merchant_name;
                item['Merchant Address']=item.return_address1+", "+item.return_address2+", "+item.return_address3;
                item['Mobile No']=item.phone;
                item['Product Name']=item.sku;
                item['DRS #']=item.drs_num;
                item['DRS Time']=get_my_past_date(item.drs_time);

                delete item.id;
                delete item.awb_num;
                delete item.import_date;
                delete item.order_num;
                delete item.weight;
                delete item.pieces;
                delete item.status;
                delete item.manifest_type;
                delete item.merchant_name;
                delete item.phone;
                delete item.sku;
                delete item.delivery_person;
                delete item.return_address1;
                delete item.return_address2;
                delete item.return_address3;
                delete item.drs_num;
                delete item.drs_time;
            }});

            hide_loader();
        });
	};

	</script>
</div>
