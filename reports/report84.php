<div id='report84' class='tab-pane portlet box red-sunglo'>	   
	<div class="portlet-title">
        <div class='caption'>
            <a class='btn btn-circle grey btn-outline btn-sm' onclick='report84_ini();'>Refresh</a>
        </div>
        <div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                      	<a id='report84_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                        <a id='report84_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>	
	</div>

	<div class="portlet-body">
        <form id='report84_master'>
            <label><input type='text' name='start' class='floatlabel' placeholder='Start Date'></label>
            <label><input type='text' name='end' class='floatlabel' placeholder='End Date'></label>
        </form>

	   <div class='horizontal-bar-chart' id='report84_chart'></div>
    </div>
	
	<script>

    function report84_header_ini()
    {
        var form=document.getElementById('report84_master');
        var start_date=form.elements['start'];
        var end_date=form.elements['end'];

        $(form).off('submit');
        $(form).on('submit',function(event)
        {
            event.preventDefault();
            report84_ini();
        });

        $(start_date).datepicker();
        $(end_date).datepicker();
        start_date.value=get_my_past_date((get_my_time()-(7*86400000)));
        end_date.value=vTime.date();
        
        $('#report84').formcontrol();
        var paginator=$('#report84').paginator({visible:false,container:$('#report84')});
    }

    function report84_ini()
    {
        show_loader();
        var form=document.getElementById('report84_master');
        var start_date=get_raw_time(form.elements['start'].value);
        var end_date=get_raw_time(form.elements['end'].value)+86399999;
			
        var columns={data_store:'logistics_orders',
                    indexes:[{index:'id'},
                        {index:'awb_num'},
                        {index:'import_date',lowerbound:start_date,upperbound:end_date},
                        {index:'drs_time'},
                        {index:'order_num'},
                        {index:'weight'},
                        {index:'pieces'},
                        {index:'status',exact:'delivered'},
                        {index:'delivery_person'},
                        {index:'manifest_type'},
                        {index:'merchant_name'},
                        {index:'phone'},
                        {index:'sku'},
                        {index:'return_address1'},
                        {index:'return_address2'},
                        {index:'return_address3'},
                        {index:'drs_num'}]};		

        read_json_rows('report84',columns,function(orders)
        {
            for(var i=0;i<orders.length;i++)
            {
                orders[i].deliveries=1;
                for(var j=i+1;j<orders.length;j++)
                {
                    if(orders[i].delivery_person==orders[j].delivery_person)
                    {
                        orders[i].deliveries+=1;
                        orders.splice(j,1);
                        j-=1;
                    }
                }
            }

            for(var i=0;i<orders.length;i++)
            {
                if(orders[i].delivery_person=="")
                {
                    orders[i].delivery_person="Unknown";
                    break;
                }
            }

            var chart = AmCharts.makeChart("report84_chart", {
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
                        "title": "# Deliveries",
                        "type": "column",
                        "backgroundColor": "#D05454",
                        "color": "#000000",
                        "fillAlphas": 0.8,
                        "valueField": "deliveries"
                    }],
                    "rotate": true,
                    "categoryField": "delivery_person",
                    "categoryAxis": {
                        "gridPosition": "start"
                    }
            });
                
            $('#report84_chart').find('div>div>a').hide();
                
            initialize_tabular_report_buttons(columns,'Deliveries Report','report84',function (item)
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
            });

            hide_loader();
        });
    };
	
	</script>
</div>