<div class="profile-userpic">
	<div class="profile-usertitle">
        <div class="profile-usertitle-name"> <span class='text-uppercase' style='color:#5A5A5A;font-size:18px;' id='object_product_instances_detail_batch'></span> </div>
        <div class="profile-usertitle-name" style='text-align:left;'> <span>Item Name</span> <span class='label label-success' id='object_product_instances_detail_product'></span> </div>
        <div class="profile-usertitle-name" style='text-align:left;'> <span>MRP</span> <span class='label label-danger' id='object_product_instances_detail_mrp'></span> </div>
        <div class="profile-usertitle-name" style='text-align:left;'> <span>Sale Price</span> <span class='label label-danger' id='object_product_instances_detail_sale_price'></span> </div>
        <div class="profile-usertitle-name" style='text-align:left;'> <span>Cost Price</span> <span class='label label-warning' id='object_product_instances_detail_cost_price'></span> </div>
	</div>
	
	<script>
		function initialize_object_product_instances_detail(obj_name,obj_id)
		{
            var batch=document.getElementById('object_product_instances_detail_batch');
			var product=document.getElementById('object_product_instances_detail_product');
			var mrp=document.getElementById('object_product_instances_detail_mrp');
			var sale_price=document.getElementById('object_product_instances_detail_sale_price');
			var cost_price=document.getElementById('object_product_instances_detail_cost_price');
            
            batch.innerHTML=obj_name.batch;
            product.innerHTML=obj_name.product;
            
            var detail_data={data_store:'product_instances',count:1,
                           indexes:[{index:'sale_price'},{index:'cost_price'},{index:'mrp'},
                                    {index:'product_name',exact:obj_name.product},
                                    {index:'batch',exact:obj_name.batch}]};
            read_json_rows('',detail_data,function(details)
            {
                mrp.innerHTML="Rs. "+details[0].mrp;
                cost_price.innerHTML="Rs. "+details[0].cost_price;
                sale_price.innerHTML="Rs. "+details[0].sale_price;
            });
		}		
	</script>
</div>