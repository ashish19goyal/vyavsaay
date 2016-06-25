<div id='report99' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
        <div class='caption'>
            <a class='btn btn-circle grey btn-outline btn-sm' onclick='report99_ini();'>Refresh</a>
        </div>
        <div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                      	<a id='report99_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                        <a id='report99_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
        <form id='report99_master'>
            <label><input type='text' name='start' class='floatlabel' placeholder='Start Date'></label>
            <label><input type='text' name='end' class='floatlabel' placeholder='End Date'></label>
        </form>

	   <div class='horizontal-bar-chart' id='report99_chart'></div>
    </div>

	<script>

    function report99_header_ini()
	{
        var form=document.getElementById('report99_master');
        var start_date=form.elements['start'];
        var end_date=form.elements['end'];

        $(form).off('submit');
        $(form).on('submit',function(event)
        {
            event.preventDefault();
            report99_ini();
        });

        $(start_date).datepicker();
        $(end_date).datepicker();
        start_date.value=get_my_past_date((get_my_time()-(7*86400000)));
        end_date.value=vTime.date();

		var paginator=$('#report99').paginator({visible:false,container:$('#report99')});

        $('#report99').formcontrol();
	}

    function report99_ini()
	{
		show_loader();
        var form=document.getElementById('report99_master');
        var start_date=get_raw_time(form.elements['start'].value);
        var end_date=get_raw_time(form.elements['end'].value)+86399999;

        var rto_data={data_store:'rto',
					access:{},
                    indexes:[{index:'id'},
                            {index:'rto_num'},
                            {index:'rto_time',lowerbound:start_date,upperbound:end_date}]};

        read_json_rows('report99',rto_data,function(orders)
        {
            orders.sort(function(a,b)
            {
                if(parseFloat(a.rto_time)<parseFloat(b.rto_time))
                    return -1;
                else
                    return 1;
            });

            var rto_num_array=[];
            for(var i=0;i<orders.length;i++)
            {
                rto_num_array.push(orders[i].rto_num);
                orders[i].rto_time=get_my_past_date(orders[i].rto_time);
            }

            for(var i=0;i<orders.length;i++)
            {
                orders[i].rto_count=1;
                for(var j=i+1;j<orders.length;j++)
                {
                    if(orders[i].rto_time==orders[j].rto_time)
                    {
                        orders[i].rto_count+=1;
                        orders.splice(j,1);
                        j-=1;
                    }
                }
            }

            var chart = AmCharts.makeChart("report99_chart", {
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
                        "title": "# rto",
                        "type": "column",
                        "backgroundColor": "#D05454",
                        "color": "#000000",
                        "fillAlphas": 0.8,
                        "valueField": "rto_count"
                    }],
                    "rotate": true,
                    "categoryField": "rto_time",
                    "categoryAxis": {
                        "gridPosition": "start"
                    }
            });

            $('#report99_chart').find('div>div>a').hide();

            var columns={data_store:'logistics_orders',
					access:{},
                    indexes:[{index:'id'},
                        {index:'awb_num'},
                        {index:'import_date'},
                        {index:'order_num'},
                        {index:'weight'},
                        {index:'pieces'},
                        {index:'status'},
                        {index:'return_person'},
                        {index:'manifest_type'},
                        {index:'merchant_name'},
                        {index:'phone'},
                        {index:'sku'},
                        {index:'ship_to'},
						{index:'address1'},
						{index:'address2'},
						{index:'address3'},
                        {index:'return_address1'},
                        {index:'return_address2'},
                        {index:'return_address3'},
                        {index:'rto_num',array:rto_num_array}]};

            initialize_tabular_report_buttons(columns,'RTO Report','report99',function (item)
            {
                item['AWB No']=item.awb_num;
                item['RTO No']=item.rto_num;
                item['Order Id']=item.order_num;
                item['Import Date']=get_my_past_date(item.import_date);
                item['Status']=item.status;
                item['Wt']=item.weight;
                item['Pcs']=item.pieces;
                item['Delivery Boy']=item.return_person;
                item['AWB Type']=item.manifest_type;
                item['Customer Name']=item.merchant_name;
                item['Customer Address']=item.return_address1+", "+item.return_address2+", "+item.return_address3;
                item['Consignee Address']=item.ship_to+", "+item.address1+", "+item.address2+", "+item.address3+", "+item.city;
                item['Mobile No']=item.phone;
                item['Product Name']=item.sku;

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
                delete item.return_person;
                delete item.return_address1;
                delete item.return_address2;
                delete item.return_address3;
                delete item.ship_to;
                delete item.address1;
                delete item.address2;
                delete item.address3;
                delete item.rto_num;
            });

            hide_loader();
        });
	}

	</script>
</div>
