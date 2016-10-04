<div class="profile-userpic">
	<img id='object_product_master_image_img' class="img-responsive" style="height:200px;width:250px;font-size:100px;text-align:center;color:#bababa;">
	<div class="profile-usertitle">
		<div class="profile-usertitle-name" id='object_product_master_image_name'> Name </div>
	</div>

	<script>
		function initialize_object_product_master_image(obj_name,obj_id)
		{
			var img=document.getElementById('object_product_master_image_img');
            var name=document.getElementById('object_product_master_image_name');
            var first_char=obj_name.substr(0,1);

            img.src="";
            img.alt=first_char;
            name.innerHTML="";

			var detail_data={data_store:'product_master',count:1,return_column:'id',
                           indexes:[{index:'name',value:obj_name}]};
            read_json_single_column(detail_data,function(details)
            {
                name.innerHTML=obj_name;
                var docs=new Object();
                docs.data_store='documents';
                docs.indexes=[{index:'id'},{index:'url'},{index:'doc_type',exact:'product_master'},{index:'doc_name',exact:'image'},{index:'target_id',exact:details[0]}];
                read_json_rows('',docs,function(pics)
                {
                    if(pics.length>0)
                    {
                        img.src=pics[0].url;
                    }
                });
            });
		}
	</script>
</div>
