<div class="profile-userpic">
	<div class="profile-usertitle">
		<div class="profile-usertitle-name" id='object_staff_image_name'> Name </div>
	</div>
	<img id='object_staff_image_img' class="img-responsive" style="height:200px;width:200px;font-size:100px;text-align:center;color:#bababa;">

	<script>
		function initialize_object_staff_image(obj_name,obj_id)
		{
            $('#object_staff_image_name').parent().parent().parent().parent().find('.portlet-title').hide();
			var img=document.getElementById('object_staff_image_img');
            var name=document.getElementById('object_staff_image_name');
            var first_char=obj_name.substr(0,1);

            img.src="";
            img.alt=first_char;
            name.innerHTML="";

			var detail_data={data_store:'staff',count:1,return_column:'id',
                           indexes:[{index:'name',exact:obj_name}]};
            read_json_single_column(detail_data,function(details)
            {
                name.innerHTML=obj_name;
				if(details.length>0)
				{
	                var docs={data_store:'documents',
							indexes:[{index:'id'},{index:'url'},{index:'doc_type',exact:'staff'},
									{index:'doc_name',exact:'image'},{index:'target_id',exact:details[0]}]};
	                read_json_rows('',docs,function(pics)
	                {
	                    if(pics.length>0)
	                    {
	                        img.src=pics[0].url;
	                    }
	                });
				}
            });
		}
	</script>
</div>
