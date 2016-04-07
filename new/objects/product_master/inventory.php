<div class="profile-userpic">
	<div class="profile-usertitle">
        <div class="profile-usertitle-name" style='text-align:left;'> <span>Quantity </span> <span class='label label-success' id='object_product_master_inventory'>0</span> </div>
	</div>
	<script>
		function initialize_object_product_master_inventory(obj_name,obj_id)
		{
            get_inventory(obj_name,'',function(inventory)
            {
                $('#object_product_master_inventory').html(inventory);
            });    
		} 

	</script>
</div>