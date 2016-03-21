<div id='form322' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form322_header'></form>
					<th>Manifest # <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form322_header'></th>
					<th>Co-loader <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form322_header'></th>
					<th>Vendor <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form322_header'></th>
					<th>Date <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form322_header'></th>
					<th>
						<input type='button' form='form322_header' value='EXPORT' class='export_icon'>
						<input type='button' form='form322_header' value='IMPORT' class='import_icon' onclick='form322_import();'>
						<input type='submit' form='form322_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form322_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form322_prev' class='prev_icon' data-index='-25' onclick="$('#form322_index').attr('data-index',$(this).attr('data-index')); form322_ini();">
		<div style='display:hidden;' id='form322_index' data-index='0'></div>
		<img src='./images/next.png' id='form322_next' class='next_icon' data-index='25' onclick="$('#form322_index').attr('data-index',$(this).attr('data-index')); form322_ini();">
	</div>
    
    <script>
    
        function form322_header_ini()
        {
            var filter_fields=document.getElementById('form322_header');
            var manifest_filter=filter_fields.elements[0];
            var date_filter=filter_fields.elements[3];
            
            var manifest_data="<manifests>" +
                    "<manifest_num></manifest_num>" +
                    "</manifests>";

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form322_ini();
            });

            set_my_filter(manifest_data,manifest_filter);
            $(date_filter).datepicker();
        };

        function form322_ini()
        {
            show_loader();
            var fid=$("#form322_link").attr('data_id');
            if(fid==null)
                fid="";	

            var filter_fields=document.getElementById('form322_header');

            //populating form 
            var fmanifest=filter_fields.elements[0].value;
            var floader=filter_fields.elements[1].value;
            var fvendor=filter_fields.elements[2].value;
            var fdate=get_raw_time(filter_fields.elements[3].value);
            
            ////indexing///
            var index_element=document.getElementById('form322_index');
            var prev_element=document.getElementById('form322_prev');
            var next_element=document.getElementById('form322_next');
            var start_index=index_element.getAttribute('data-index');
            //////////////

            $('#form322_body').html("");

            var new_columns=new Object();
                new_columns.count=25;
                new_columns.start_index=start_index;
                new_columns.data_store='manifests';		

                new_columns.indexes=[{index:'id',value:fid},
                                    {index:'manifest_num',value:fmanifest},
                                    {index:'coloader',value:floader},
                                    {index:'vendor',value:fvendor},
                                    {index:'date',value:fdate}];

            read_json_rows('form322',new_columns,function(results)
            {			
                results.forEach(function(result)
                {
                    var rowsHTML="";
                    rowsHTML+="<tr>";
                        rowsHTML+="<form id='form322_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='Manifest #'>";
                                rowsHTML+="<input type='text' class='input_link' readonly='readonly' form='form322_"+result.id+"' value='"+result.manifest_num+"' onclick=\"element_display('"+result.id+"','form321');\">";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Co-loader'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form322_"+result.id+"' value='"+result.coloader+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Vendor'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form322_"+result.id+"' value='"+result.vendor+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Date'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form322_"+result.id+"' value='"+get_my_past_date(result.date)+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form322_"+result.id+"' value='"+result.id+"' name='id'>";
                                rowsHTML+="<input type='button' class='delete_icon' form='form322_"+result.id+"' title='Delete' onclick='form322_delete_item($(this));'>";
                            rowsHTML+="</td>";			
                    rowsHTML+="</tr>";

                    $('#form322_body').append(rowsHTML);
                });

                ////indexing///
                var next_index=parseInt(start_index)+25;
                var prev_index=parseInt(start_index)-25;
                next_element.setAttribute('data-index',next_index);
                prev_element.setAttribute('data-index',prev_index);
                index_element.setAttribute('data-index','0');
                if(results.length<25)
                {
                    $(next_element).hide();
                }
                else
                {
                    $(next_element).show();
                }
                if(prev_index<0)
                {
                    $(prev_element).hide();
                }
                else
                {
                    $(prev_element).show();
                }
                /////////////

                longPressEditable($('.dblclick_editable'));
                $('textarea').autosize();

                var export_button=filter_fields.elements[4];

                $(export_button).off("click");
                $(export_button).on("click", function(event)
                {
                    get_export_data(columns,'Manifests');
                });
                hide_loader();
            });
        };

        /**
         * @form Manage Transit manifests
         * @param button
         */
        function form322_delete_item(button)
        {
            if(is_delete_access('form322'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var manifest_num=form.elements[0].value;
                    var data_id=form.elements[4].value;
                    var data_xml="<manifests>" +
                                "<id>"+data_id+"</id>" +
                                "</manifests>";	
                    var activity_xml="<activity>" +
                            "<data_id>"+data_id+"</data_id>" +
                            "<tablename>manifests</tablename>" +
                            "<link_to>form322</link_to>" +
                            "<title>Delete</title>" +
                            "<notes>Manifest # "+manifest_num+"</notes>" +
                            "<updated_by>"+get_name()+"</updated_by>" +
                            "</activity>";

                    var manifest_items_xml="<logistics_orders>"+
                                    "<id></id>"+
                                    "<status exact='yes'>in-transit</status>"+
                                    "<manifest_num exact='yes'>"+manifest_num+"</manifest_num>"+
                                    "</logistics_orders>";			
                    get_single_column_data(function(manifest_items)
                    {
                        var data_xml="<logistics_orders>";
                        var counter=1;
                        var last_updated=get_my_time();

                        manifest_items.forEach(function(manifest_item)
                        {
                            if((counter%500)===0)
                            {
                                data_xml+="</logistics_orders><separator></separator><logistics_orders>";
                            }

                            counter+=1;

                            data_xml+="<row>" +
                                    "<id>"+manifest_item+"</id>" +
                                    "<manifest_num></manifest_num>" +
                                    "<man_id></man_id>" +
                                    "<status>received</status>"+
                                    "<last_updated>"+last_updated+"</last_updated>" +
                                    "</row>";
                        });
                        data_xml+="</logistics_orders>";
                        //console.log(data_xml);
                        update_batch(data_xml);

                    },manifest_items_xml);

                    delete_row(data_xml,activity_xml);
                    $(button).parent().parent().remove();
                });
            }
            else
            {
                $("#modal2").dialog("open");
            }
        }

    </script>
</div>