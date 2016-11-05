<div id='report106' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
        <div class='caption'>
            <a class='btn btn-circle grey btn-outline btn-sm' onclick='report106_ini();'>Refresh</a>
        </div>
        <div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                      	<a id='report106_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                        <a id='report106_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
        <form id='report106_master'>
            <label><input type='text' name='start' class='floatlabel' placeholder='Start Date'></label>
            <label><input type='text' name='end' class='floatlabel' placeholder='End Date'></label>
        </form>

	   <div class='horizontal-bar-chart' id='report106_chart'></div>
    </div>

	<script>

    function report106_header_ini()
	{
        var form=document.getElementById('report106_master');
        var start_date=form.elements['start'];
        var end_date=form.elements['end'];

        $(form).off('submit');
        $(form).on('submit',function(event)
        {
            event.preventDefault();
            report106_ini();
        });

        $(start_date).datepicker();
        $(end_date).datepicker();
        start_date.value=get_my_past_date((get_my_time()-(7*86400000)));
        end_date.value=vTime.date();

		var paginator=$('#report106').paginator({visible:false,container:$('#report106')});

        $('#report106').formcontrol();
	}

  function report106_ini()
	{
		show_loader();
        var form=document.getElementById('report106_master');
        var start_date=get_raw_time(form.elements['start'].value);
        var end_date=get_raw_time(form.elements['end'].value)+86400000;

        var manifest_data={data_store:'manifests',
					access:'yes',
                    indexes:[{index:'id'},
                            {index:'manifest_num'},
							{index:'seal_num'},
							{index:'coloader'},
							{index:'vendor'},
							{index:'date',lowerbound:start_date,upperbound:end_date}]};

        read_json_rows('report106',manifest_data,function(orders)
        {
            orders.sort(function(a,b)
            {
                if(parseFloat(a.date)<parseFloat(b.date))
                    return -1;
                else
                    return 1;
            });

            var manifest_num_array=vUtil.arrayColumn(orders,'manifest_num');

			var orders_data = {};
            for(var i=0;i<orders.length;i++)
            {
				if(vUtil.isBlank(orders_data[orders[i].date]))
                {
					var no = {date:vTime.date({time:orders[i].date}),manifest_count:1};
					orders_data[orders[i].date] = no;
				}
				else{
					orders_data[orders[i].date].manifest_count+=1;
				}
            }

			var orders_array=[];
			for(var x in orders_data)
			{
				orders_array.push(orders_data[x]);
			}

            var chart = AmCharts.makeChart("report106_chart", {
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
                    "dataProvider": orders_array,
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
                        "title": "# Manifest",
                        "type": "column",
                        "backgroundColor": "#D05454",
                        "color": "#000000",
                        "fillAlphas": 0.8,
                        "valueField": "manifest_count"
                    }],
                    "rotate": true,
                    "categoryField": "date",
                    "categoryAxis": {
                        "gridPosition": "start"
                    }
            });

            $('#report106_chart').find('div>div>a').hide();

            var columns={data_store:'logistics_orders',
					access:'yes',
                    indexes:[{index:'id'},
                        {index:'awb_num'},
                        {index:'import_date'},
                        {index:'order_num'},
                        {index:'weight'},
                        {index:'pieces'},
                        {index:'status'},
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
						{index:'consignment_num'},
						{index:'city'},
						{index:'pass_num'},
						{index:'pass_date'},
						{index:'status'},
                        {index:'manifest_num',array:manifest_num_array}]};

			vExport.export_buttons({action:'dynamic',columns:columns,file:'Manifest Report',report_id:'report106',feach:function (item)
			{
				var coloader="";
				var vendor="";
				var manifest_date="";
				var seal_num="";
				for(var i in orders)
				{
					if(item.manifest_num==orders[i].manifest_num)
					{
						coloader = orders[i].coloader;
						vendor = orders[i].vendor;
						manifest_date = vTime.date({time:orders[i].date});
						seal_num = orders[i].seal_num;
						break;
					}
				}

				item['AWB No']=item.awb_num;
                item['Manifest No']=item.manifest_num;
				item['Manifest Date']=manifest_date;
				item['Gate Pass No']=item.pass_num;
				item['Gate Pass Date']=vTime.date({time:item.pass_date});
				item['Seal No']=seal_num;
                item['Order Id']=item.order_num;
                item['Import Date']=get_my_past_date(item.import_date);
                item['Status']=item.status;
                item['Wt']=item.weight;
                item['Pcs']=item.pieces;
                item['AWB Type']=item.manifest_type;
                item['Merchant Name']=item.merchant_name;
                item['Merchant Address']=item.return_address1+", "+item.return_address2+", "+item.return_address3;
                item['Consignment Number']=item.consignment_num;
                item['Consignee']=item.ship_to;
                item['Consignee Address']=item.address1+", "+item.address2+", "+item.address3;
                item['Consignee City']=item.city;
                item['Mobile No']=item.phone;
                item['Product Name']=item.sku;
				item['Co-loader']=coloader;
				item['Vendor']=vendor;

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
                delete item.return_address1;
                delete item.return_address2;
                delete item.return_address3;
                delete item.ship_to;
                delete item.address1;
                delete item.address2;
                delete item.address3;
				delete item.city;
				delete item.consignment_num;
                delete item.manifest_num;
				delete item.pass_num;
				delete item.pass_date;
            }});

            hide_loader();
        });
	}

	</script>
</div>
