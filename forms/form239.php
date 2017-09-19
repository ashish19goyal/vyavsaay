<div id='form239' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick="element_display('','form240');">Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form239_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form239_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form239_print'><i class='fa fa-print'></i> Print</a>
                    </li>
					<li class="divider"> </li>
					<li>
						<a id='form239_upload' onclick=modal23_action(form239_import_template,form239_import);><i class='fa fa-upload'></i> Import</a>
					</li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form239_header'></form>
						<th><input type='text' placeholder="Item" class='floatlabel' name='name' form='form239_header'></th>
						<th><input type='text' placeholder="# of raw materials" readonly='readonly' name='raw' form='form239_header'></th>
						<th><input type='submit' form='form239_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form239_body'>
			</tbody>
		</table>
	</div>

    <script>

        function form239_header_ini()
        {
            var filter_fields=document.getElementById('form239_header');
            var item_filter=filter_fields.elements['name'];

            var item_data={data_store:'attributes',return_column:'name',
                          indexes:[{index:'type',exact:'product'},
                                  {index:'value',exact:'yes'},
                                  {index:'attribute',exact:'manufactured'}]};

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form239_ini();
            });

            set_my_filter_json(item_data,item_filter);
        };

        function form239_ini()
        {
            show_loader();
            var fid=$("#form239_link").attr('data_id');
            if(fid==null)
                fid="";

            $('#form239_body').html("");

            var filter_fields=document.getElementById('form239_header');
            var	fitem=filter_fields.elements['name'].value;

            var paginator=$('#form239_body').paginator();

			var columns={count:paginator.page_size(),
						start_index:paginator.get_index(),
						data_store:'manage_pre_requisites',
						indexes:[{index:'id',value:fid},
									{index:'name',value:fitem},
									{index:'num_materials'}]};

            read_json_rows('form239',columns,function(results)
            {
                results.forEach(function(result)
                {
                    var rowsHTML="<tr>";
                        rowsHTML+="<form id='form239_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='Item'>";
                                rowsHTML+="<a onclick=\"element_display('"+result.id+"','form240');\"><input type='text' readonly='readonly' form='form239_"+result.id+"' value='"+result.name+"'>";
                            rowsHTML+="</a></td>";
                            rowsHTML+="<td data-th='# of raw materials'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form239_"+result.id+"' value='"+result.num_materials+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form239_"+result.id+"' value='"+result.id+"'>";
                                rowsHTML+="<button type='button' class='btn red' form='form239_"+result.id+"' title='Delete' name='delete' onclick='form239_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                            rowsHTML+="</td>";
                    rowsHTML+="</tr>";

                    $('#form239_body').append(rowsHTML);
                });

                $('#form239').formcontrol();
				paginator.update_index(results.length);
				vExport.export_buttons({action:'dynamic',columns:columns,file:'Material Requirements',report_id:'form239'});
				hide_loader();
            });
        }

        function form239_delete_item(button)
        {
            if(is_delete_access('form239'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var item_name=form.elements[0].value;
                    var data_id=form.elements[2].value;
                    var data_json={data_store:'manage_pre_requisites',
 							data:[{index:'id',value:data_id}],
 							log:'yes',
 							log_data:{title:"Deleted",notes:"Raw material requirements for "+item_name,link_to:"form239"}};
                    var pre_requisites_json={data_store:'pre_requisites',
 							data:[{index:'name',value:item_name}]};

                    delete_json(data_json);
                    delete_json(pre_requisites_json);

                    $(button).parent().parent().remove();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

		function form239_import_template()
        {
            var data_array=['id','finished item','raw material','quantity'];
            vUtil.arrayToCSV(data_array);
        };

        function form239_import(data_array,import_type)
        {
            var data_json={data_store:'pre_requisites',
	 					data:[]};
			var manage_data_json={data_store:'manage_pre_requisites',
						log:'yes',
						data:[],
						log_data:{title:'Raw Material requirements for finished items',link_to:'form239'}};

			var counter=1;
			var last_updated=get_my_time();

			var unique_items = {};

			data_array.forEach(function(row)
			{
				counter++;
				if(import_type=='create_new')
				{
					row.id=last_updated+counter;
				}

				var data_json_array=[{index:'id',value:row.id},
						{index:'type',value:'product'},
						{index:'requisite_type',value:'product'},
						{index:'requisite_name',value:row['raw material']},
						{index:'quantity',value:row['quantity']},
						{index:'name',value:row['finished item']},
	 					{index:'last_updated',value:last_updated}];

				data_json.data.push(data_json_array);
				if(vUtil.isBlank(unique_items[row['finished item']])){
					unique_items[row['finished item']] = 1;
				}else{
					unique_items[row['finished item']] += 1;
				}
			});

			for(var i in unique_items)
			{
				counter++;
				var id = last_updated+counter;
				var data_json_array=[{index:'id',value:id},
						{index:'num_materials',value:unique_items[i]},
						{index:'name',value:i},
	 					{index:'last_updated',value:last_updated}];
				manage_data_json.data.push(data_json_array);
			}

			if(import_type=='create_new')
			{
				if(is_create_access('form238'))
				{
					create_batch_json(data_json);
					create_batch_json(manage_data_json);
				}
				else
		          {
		              $("#modal2_link").click();
		          }
			}
			else
			{
				if(is_update_access('form238'))
				{
					update_batch_json(data_json);
				}
				else
	            {
	              $("#modal2_link").click();
	            }
            }
        }

    </script>
</div>
