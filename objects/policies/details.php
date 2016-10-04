<div>
	<div id='object_policies_details_all' class='capitalize'></div>

	<script>
		function initialize_object_policies_details(obj_name,obj_id)
		{
			$('#object_policies_details_all').html('');
			var add_index={index:'policy_num',exact:obj_name};
			if(vUtil.isBlank(obj_name))
			{
				add_index={index:'id',exact:obj_id};
			}
            var detail_data={data_store:'policies',count:1,all_indexes:'yes',indexes:[add_index]};
            read_json_rows('',detail_data,function(details)
            {
				if(details.length>0)
				{
					var data = details[0];
					var counter=0;
					var html = "";
					for(var i in data)
					{
						if(!vUtil.isBlank(data[i]))
						{
							var add=false;
							try{
								var j = JSON.parse(data[i]);
								if(typeof j=='number')
								{
									add=true;
								}
							}
							catch(e)
							{
								add=true;
							}

							if(add)
							{
								counter++;
								var index = i.replace(/_/g," ");
								if(index.indexOf('date')>-1)
								{
									data[i] = vTime.date({time:data[i]});
								}

								if((counter%2)==1)
								{
									html+="<div class='row'>"+
												"<div class='col-md-2'><b>"+index+"</b></div>"+
												"<div class='col-md-4'>"+data[i]+"</div>";

								}
								else{
									html+=		"<div class='col-md-2'><b>"+index+"</b></div>"+
												"<div class='col-md-4'>"+data[i]+"</div>"+
											"</div>";
								}
							}
						}
					}

					if((counter%2)==1)
					{
						html+="</div>";
					}

					$('#object_policies_details_all').html(html);
				}
            });
		}
	</script>
</div>
