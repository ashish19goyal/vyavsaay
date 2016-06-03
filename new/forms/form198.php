<div id='form198' class='tab-pane'>
    <div class='portlet box yellow-casablanca'>
        <div class='portlet-title'>
            <div class='caption row'>
                <div class='col-md-6'><input type='text' style='height:30px;' id='form198_awb' name='awb_num' placeholder='Enter AWB #' required></div>
                <div class='col-md-6'><a class="btn btn-circle grey btn-outline btn-sm" onclick=form198_ini();> <i class='fa fa-refresh'></i> Check AWB</a></div>
            </div>
        </div>
        <div class='portlet-body'>
            <div class='panel panel-default'>
                <div class='panel-heading'>
                    <h3 class='panel-title'>Order History</h3>
                </div>
                <div class='panel-body'>
                    <table id='form198_table' class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
                        <tr><th>Time</th><th>Details</th><th>Location</th><th>Status</th><th></th></tr>
                    </table>
                </div>
            </div>
            <br>
            <div class='panel panel-default'>
                <div class='panel-heading'>
                    <h3 class='panel-title'>Order Details</h3>
                </div>
                <div class='panel-body'>
                    <form id='form198_master' autocomplete="off">
                        <input type='hidden' name='id'>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>Order #</span></div><div class='col-md-8 col-sm-8'><input type='text' name='order_num'></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>Channel</span></div><div class='col-md-8 col-sm-8'><input type='text' name='channel_name'></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>Type</span></div><div class='col-md-8 col-sm-8'><input type='text' name='type'></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>Manifest Type</span></div><div class='col-md-8 col-sm-8'><input type='text' name='manifest_type'></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>Manifest Id</span></div><div class='col-md-8 col-sm-8'><input type='text' name='manifest_id'></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>Customer Name</span></div><div class='col-md-8 col-sm-8'><input type='text' name='merchant_name'></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>Consignee</span></div><div class='col-md-8 col-sm-8'><input type='text' name='ship_to'></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>Address 1</span></div><div class='col-md-8 col-sm-8'><textarea name='address1'></textarea></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>Address 2</span></div><div class='col-md-8 col-sm-8'><textarea name='address2'></textarea></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>Destination City</span></div><div class='col-md-8 col-sm-8'><input type='text' name='city'></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>State</span></div><div class='col-md-8 col-sm-8'><input type='text' name='state'></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>Pincode</span></div><div class='col-md-8 col-sm-8'><input type='text' name='pincode'></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>Phone</span></div><div class='col-md-8 col-sm-8'><input type='text' name='phone'></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>Telephone</span></div><div class='col-md-8 col-sm-8'><input type='text' name='telephone'></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>Weight</span></div><div class='col-md-8 col-sm-8'><input type='text' name='weight'></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>Volumetric Weight</span></div><div class='col-md-8 col-sm-8'><input type='text' name='vol_weight'></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>Declared Value</span></div><div class='col-md-8 col-sm-8'><input type='text' name='d_value'></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>Collectable Value</span></div><div class='col-md-8 col-sm-8'><input type='text' name='c_value'></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>Vendor Name</span></div><div class='col-md-8 col-sm-8'><textarea name='shipper_name'></textarea></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>Return Address 1</span></div><div class='col-md-8 col-sm-8'><textarea name='r_address1'></textarea></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>Return Address 2</span></div><div class='col-md-8 col-sm-8'><textarea name='r_address2'></textarea></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>Return Address 3</span></div><div class='col-md-8 col-sm-8'><textarea name='r_address3'></textarea></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>Return Pincode</span></div><div class='col-md-8 col-sm-8'><input type='text' name='rpincode'></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>LBH</span></div><div class='col-md-8 col-sm-8'><input type='text' name='lbh'></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>Import Date</span></div><div class='col-md-8 col-sm-8'><input type='text' name='ddate'></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>Product Name</span></div><div class='col-md-8 col-sm-8'><input type='text' name='product_name'></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>Status</span></div><div class='col-md-8 col-sm-8'><input type='text' name='status'></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>DRS #</span></div><div class='col-md-8 col-sm-8'><input type='text' name='drs'></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>RTO #</span></div><div class='col-md-8 col-sm-8'><input type='text' name='rto'></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>Manifest #</span></div><div class='col-md-8 col-sm-8'><input type='text' name='manifest_num'></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>Delivery Person</span></div><div class='col-md-8 col-sm-8'><input type='text' name='delivery_person'></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>Branch</span></div><div class='col-md-8 col-sm-8'><input type='text' name='branch'></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>Received By</span></div><div class='col-md-8 col-sm-8'><input type='text' name='received_by'></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>Received By (Phone)</span></div><div class='col-md-8 col-sm-8'><input type='text' name='received_by_phone'></div></div>
						<div class='row'><div class='col-md-4 col-sm-4' style='height:45px;'><span style='position:relative;top:30%;'>Signature</span></div><div class='col-md-8 col-sm-8'><div id='form198_canvas_div'></div></div></div>
                        <div class='row'><div class='col-md-8 col-sm-8 pull-right'><button type='button' class='btn red' name='update' onclick=form198_update_item(); style='width:100%;'>Update</button></div></div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script>
    function form198_header_ini()
    {
        var awb_filter=document.getElementById('form198_awb');
        awb_filter.value="";
        $(awb_filter).focus();

        $(awb_filter).off('onkeyup');

        $(awb_filter).on('onkeyup',function(event)
        {
            if(event.keycode=='13')
            {
                event.preventDefault();
                form198_ini();
            }
        });

        $('#form198_fieldset').html("");

        var paginator=$('#form198_table').paginator({visible:false,container:$('#form198_table')});
    }

    function form198_ini(awb_num_passed)
    {
        show_loader();
        var fid=$("#form198_link").attr('data_id');
        if(fid==null)
            fid="";

        var awb_num=document.getElementById('form198_awb');
		if(typeof awb_num_passed!='undefined')
		{
			awb_num.value=awb_num_passed;
		}

        var new_columns={count:1,
                        data_store:'logistics_orders',
                        indexes:[{index:'id',value:fid},
                                {index:'order_num'},
                                {index:'awb_num',value:awb_num.value},
                                {index:'type'},
                                {index:'manifest_type'},
                                {index:'channel_name'},
                                {index:'merchant_name'},
                                {index:'ship_to'},
                                {index:'import_date'},
                                {index:'address1'},
                                {index:'address2'},
                                {index:'city'},
                                {index:'pincode'},
                                {index:'state'},
                                {index:'phone'},
                                {index:'telephone'},
                                {index:'sku'},
                                {index:'pieces'},
                                {index:'collectable_value'},
                                {index:'declared_value'},
                                {index:'weight'},
                                {index:'volumetric_weight'},
                                {index:'lbh'},
                                {index:'shipper_name'},
                                {index:'return_address1'},
                                {index:'return_address2'},
                                {index:'return_address3'},
                                {index:'vendor_phone'},
                                {index:'return_pincode'},
                                {index:'manifest_id'},
                                {index:'delivery_person'},
                                {index:'order_history'},
                                {index:'drs_num'},
                                {index:'rto_num'},
                                {index:'manifest_num'},
                                {index:'branch'},
                                {index:'received_by'},
                                {index:'received_by_phone'},
                                {index:'received_by_sign'},
                                {index:'status'}]};
        read_json_rows('form198',new_columns,function(results)
        {
            results.forEach(function(result)
            {
                if(awb_num.value=="")
                {
                    awb_num.value=result.awb_num;
                }

                var order_history=vUtil.jsonParse(result.order_history);

                var tableHTML="";
                for(var k in order_history)
                {
                    tableHTML+="<tr><td data-th='Time'>"+get_my_datetime(order_history[k].timeStamp)+"</td>"+
                        "<td data-th='Details'>"+order_history[k].details+"</td>"+
                        "<td data-th='Location'>"+order_history[k].location+"</td>"+
                        "<td data-th='Status'>"+order_history[k].status+"</td>"+
                        "<td><button class='btn red' onclick=\"if(is_delete_access('form198')){$(this).parent().parent().remove();}\"><i class='fa fa-trash'></i></button></td></tr>";
                }
                $('#form198_table').html(tableHTML);

                var form=document.getElementById('form198_master');
                form.elements['id'].value=result.id;
                form.elements['order_num'].value=result.order_num;
                form.elements['channel_name'].value=result.channel_name;
                form.elements['type'].value=result.type;
                form.elements['manifest_type'].value=result.manifest_type;
                form.elements['manifest_id'].value=result.manifest_id;
                form.elements['merchant_name'].value=result.merchant_nam;
                form.elements['ship_to'].value=result.ship_to;
                form.elements['address1'].value=result.address1;
                form.elements['address2'].value=result.address2;
                form.elements['city'].value=result.city;
                form.elements['state'].value=result.state;
                form.elements['pincode'].value=result.pincode;
                form.elements['phone'].value=result.phone;
                form.elements['telephone'].value=result.telephone;
                form.elements['weight'].value=result.weight;
                form.elements['vol_weight'].value=result.volumetric_weight;
                form.elements['d_value'].value=result.declared_value;
                form.elements['c_value'].value=result.collectable_value;
                form.elements['shipper_name'].value=result.shipper_name;
                form.elements['r_address1'].value=result.return_address1;
                form.elements['r_address2'].value=result.return_address2;
                form.elements['r_address3'].value=result.return_address3;
                form.elements['rpincode'].value=result.return_pincode;
                form.elements['lbh'].value=result.lbh;
                form.elements['ddate'].value=get_my_past_date(result.import_date);
                form.elements['product_name'].value=result.sku;
                form.elements['status'].value=result.status;
                form.elements['drs'].value=result.drs_num;
                form.elements['rto'].value=result.rto_num;
                form.elements['manifest_num'].value=result.manifest_num;
                form.elements['delivery_person'].value=result.delivery_person;
                form.elements['branch'].value=result.branch;
                form.elements['received_by'].value=result.received_by;
                form.elements['received_by_phone'].value=result.received_by_phone;

                if(result.received_by_sign!="" && result.received_by_sign!=null && result.received_by_sign!="null")
                {
                    dataURL="data:image/jsignature;base30,"+result.received_by_sign;
                    $("#form198_canvas_div").jSignature({width:300,height:200,color:"#00F","background-color":"#F5F4A8"}); // inits the jSignature widget.
                    $("#form198_canvas_div").jSignature("setData",dataURL);
                }
            });

            $('#form198').formcontrol();
            hide_loader();
        });
    };

    function form198_update_item()
    {
        if(is_update_access('form198'))
        {
            var form=document.getElementById("form198_master");

            var awb_num=document.getElementById('form198_awb').value;
            var order_num=form.elements['order_num'].value;
            var type=form.elements['type'].value;
            var manifest_type=form.elements['manifest_type'].value;
            var manifest_id=form.elements['manifest_id'].value;
            var merchant_name=form.elements['merchant_name'].value;
            var channel_name=form.elements['channel_name'].value;
            var ship_to=form.elements['ship_to'].value;
            var address1=form.elements['address1'].value;
            var address2=form.elements['address2'].value;
            var city=form.elements['city'].value;
            var state=form.elements['state'].value;
            var pincode=form.elements['pincode'].value;
            var phone=form.elements['phone'].value;
            var telephone=form.elements['telephone'].value;
            var weight=form.elements['weight'].value;
            var volumetric_weight=form.elements['vol_weight'].value;
            var d_value=form.elements['d_value'].value;
            var c_value=form.elements['c_value'].value;
            var shipper_name=form.elements['shipper_name'].value;
            var r_address1=form.elements['r_address1'].value;
            var r_address2=form.elements['r_address2'].value;
            var r_address3=form.elements['r_address3'].value;
            var rpincode=form.elements['rpincode'].value;
            var lbh=form.elements['lbh'].value;
            var product_name=form.elements['product_name'].value;
            var status=form.elements['status'].value;
            var delivery_person=form.elements['delivery_person'].value;
            var branch=form.elements['branch'].value;
            var import_date=get_raw_time(form.elements['ddate'].value);
            var id=form.elements['id'].value;
            var last_updated=get_my_time();

            var order_history_object=[];

            $('#form198_table').find('tr').each(function()
            {
                var row=$(this);
                var row_object={timestamp:get_raw_time($(row).find('td:first-child').html()),
                                details:$(row).find('td:nth-child(2)').html(),
                                location:$(row).find('td:nth-child(3)').html(),
                                status:$(row).find('td:nth-child(4)').html()};
                order_history_object.push(row_object);
            });
            console.log(order_history_object);
            var order_history=JSON.stringify(order_history_object);

            var data_json={data_store:'logistics_orders',
	 				log:'yes',
	 				data:[{index:'id',value:id},
	 					{index:'type',value:type},
	 					{index:'order_num',value:order_num},
	 					{index:'manifest_id',value:manifest_id},
	 					{index:'manifest_type',value:manifest_type},
	 					{index:'merchant_name',value:merchant_name},
	 					{index:'channel_name',value:channel_name},
	 					{index:'ship_to',value:ship_to},
	 					{index:'address1',value:address1},
	 					{index:'address2',value:address2},
	 					{index:'city',value:city},
	 					{index:'state',value:state},
	 					{index:'pincode',value:pincode},
	 					{index:'phone',value:phone},
	 					{index:'telephone',value:telephone},
	 					{index:'weight',value:weight},
	 					{index:'volumetric_weight',value:volumetric_weight},
	 					{index:'declared_value',value:d_value},
                        {index:'collectable_value',value:c_value},
                        {index:'shipper_name',value:shipper_name},
                        {index:'return_address1',value:r_address1},
                        {index:'return_address2',value:r_address2},
                        {index:'return_address3',value:r_address3},
                        {index:'lbh',value:lbh},
                        {index:'import_date',value:import_date},
	 					{index:'product_name',value:product_name},
                        {index:'status',value:status},
                        {index:'delivery_person',value:delivery_person},
                        {index:'branch',value:branch},
                        {index:'order_history',value:order_history},
                        {index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'AWB # '+awb_num,link_to:'form198'}};

            update_json(data_json);
            $("#modal92_link").click();
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    </script>
</div>
