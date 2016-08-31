<div class="profile-userpic">
	<div class="profile-usertitle">
        <div class="profile-usertitle-name" style='text-align:left;'> <span>AWB #</span> <span class='label label-success' id='object_logistics_orders_details_awb'></span> </div>
        <div class="profile-usertitle-name" style='text-align:left;'> <span>Order #</span> <span class='label label-warning' id='object_logistics_orders_details_order'></span> </div>
        <div class="profile-usertitle-name" style='text-align:left;'> <span>Channel</span> <span class='label label-warning' id='object_logistics_orders_details_channel'></span> </div>
        <div class="profile-usertitle-name" style='text-align:left;'> <span>Type</span> <span class='label label-warning' id='object_logistics_orders_details_type'></span> </div>
        <div class="profile-usertitle-name" style='text-align:left;'> <span><input type='text' id='object_logistics_orders_details_custom_attribute' placeholder='Select Attribute' /></span> <span class='label label-warning' id='object_logistics_orders_details_custom'></span> </div>
	</div>
	
	<script>
		function initialize_object_logistics_orders_details(obj_name,obj_id)
		{
            var awb=document.getElementById('object_logistics_orders_details_awb');
			var order=document.getElementById('object_logistics_orders_details_order');
			var channel=document.getElementById('object_logistics_orders_details_channel');
			var type=document.getElementById('object_logistics_orders_details_type');
			var custom=document.getElementById('object_logistics_orders_details_custom');
            var custom_attr=document.getElementById('object_logistics_orders_details_custom_attribute');
            
			$(custom_attr).on('change blur',function()
			{
				var details_data={data_store:'logistics_orders',return_column:custom_attr.value,count:1,
                           indexes:[{index:'awb_num',exact:obj_name}]};
				read_json_single_column(details_data,function(details)
				{
					custom.innerHTML=details[0];
				});
				hide_loader();
			});
			
            awb.innerHTML=obj_name;
            
            var detail_data={data_store:'logistics_orders',count:1,
                           indexes:[{index:'order_num'},{index:'channel_name'},{index:'type'},
                                    {index:'awb_num',exact:obj_name}]};
            read_json_rows('',detail_data,function(details)
            {
                type.innerHTML=details[0].type;
                channel.innerHTML=details[0].channel_name;
                order.innerHTML=details[0].order_num;
            });
		}		
	</script>
</div>