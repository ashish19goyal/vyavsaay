<div>
    <div class='scroller' style='height:250px;' data-rail-visible1="1">
        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead><tr><td>Document Name</td></tr></thead>
			<tbody id='object_policies_attachments'>
			</tbody>
		</table>
    </div>
	<script>
		function initialize_object_policies_attachments(obj_name,obj_id)
		{
            var container=document.getElementById('object_policies_attachments');
            container.innerHTML="";
			var attribute_data={data_store:'policies',return_column:'attachments',count:1,
                           indexes:[{index:'policy_num',exact:obj_name}]};
            read_json_single_column(attribute_data,function(results)
            {
				if(results.length>0)
				{
					var attachments = vUtil.jsonParse(results[0]);
					attachments.forEach(function(attachment)
					{
						var rowsHTML="<tr>";
	                        rowsHTML+="<td data-th='Document Name'>";
	                            rowsHTML+="<a title='Click to download' href='https://s3-ap-southeast-1.amazonaws.com/vyavsaay-documents/"+attachment.url+"'>"+attachment.name+"</a>";
	                        rowsHTML+="</td>";
						rowsHTML+="</tr>";

						$(container).append(rowsHTML);
					});
				}
            });
		}
	</script>
</div>
