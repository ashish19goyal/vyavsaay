<div id='form337' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form337_header'></form>
					<th>Pass # <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form337_header'></th>
					<th>Co-loader <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form337_header'></th>
					<th>Vendor <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form337_header'></th>
					<th>Date <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form337_header'></th>
					<th>
						<input type='button' form='form337_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form337_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form337_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form337_prev' class='prev_icon' data-index='-25' onclick="$('#form337_index').attr('data-index',$(this).attr('data-index')); form337_ini();">
		<div style='display:hidden;' id='form337_index' data-index='0'></div>
		<img src='./images/next.png' id='form337_next' class='next_icon' data-index='25' onclick="$('#form337_index').attr('data-index',$(this).attr('data-index')); form337_ini();">
	</div>
    
    <script>
    
        function form337_header_ini()
        {
            var filter_fields=document.getElementById('form337_header');
            var pass_filter=filter_fields.elements[0];
            var date_filter=filter_fields.elements[3];
            
            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form337_ini();
            });

            var pass_data={data_store:'gate_pass',return_column:'pass_num'};
            set_my_filter_json(pass_data,pass_filter);
            $(date_filter).datepicker();
        };

        function form337_ini()
        {
            show_loader();
            var fid=$("#form337_link").attr('data_id');
            if(fid==null)
                fid="";	

            var filter_fields=document.getElementById('form337_header');

            //populating form 
            var fpass=filter_fields.elements[0].value;
            var floader=filter_fields.elements[1].value;
            var fvendor=filter_fields.elements[2].value;
            var fdate=get_raw_time(filter_fields.elements[3].value);
            
            ////indexing///
            var index_element=document.getElementById('form337_index');
            var prev_element=document.getElementById('form337_prev');
            var next_element=document.getElementById('form337_next');
            var start_index=index_element.getAttribute('data-index');
            //////////////

            $('#form337_body').html("");

            var new_columns=new Object();
                new_columns.count=25;
                new_columns.start_index=start_index;
                new_columns.data_store='gate_pass';		

                new_columns.indexes=[{index:'id',value:fid},
                                    {index:'pass_num',value:fpass},
                                    {index:'coloader',value:floader},
                                    {index:'vendor',value:fvendor},
                                    {index:'date',value:fdate}];

            read_json_rows('form337',new_columns,function(results)
            {			
                results.forEach(function(result)
                {
                    var rowsHTML="<tr>";
                        rowsHTML+="<form id='form337_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='Pass #'>";
                                rowsHTML+="<input type='text' class='input_link' readonly='readonly' form='form337_"+result.id+"' value='"+result.pass_num+"' onclick=\"element_display('"+result.id+"','form336');\">";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Co-loader'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form337_"+result.id+"' value='"+result.coloader+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Vendor'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form337_"+result.id+"' value='"+result.vendor+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Date'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form337_"+result.id+"' value='"+get_my_past_date(result.date)+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form337_"+result.id+"' value='"+result.id+"' name='id'>";
                                rowsHTML+="<input type='button' class='delete_icon' form='form337_"+result.id+"' title='Delete' onclick='form337_delete_item($(this));'>";
                            rowsHTML+="</td>";			
                    rowsHTML+="</tr>";

                    $('#form337_body').append(rowsHTML);
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
                    get_export_data(columns,'Gate-Pass');
                });
                hide_loader();
            });
        };

        function form337_delete_item(button)
        {
            if(is_delete_access('form337'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var pass_num=form.elements[0].value;
                    var data_id=form.elements[4].value;
                    var data_json={data_store:'gate_pass',
 							data:[{index:'id',value:data_id}],
 							log:'yes',
 							log_data:{title:"Deleted",notes:"Gate pass # "+pass_num,link_to:"form337"}};
                    delete_json(data_json);
                    
                    var pass_items_json={data_store:'logistics_orders',return_column:'id',
                                       indexes:[{index:'status',exact:'in-transit'},
                                               {index:'pass_num',exact:pass_num}]};
                    read_json_single_column(pass_items_json,function(pass_items)
                    {
                        var data_json={data_store:'logistics_orders',
                                loader:'no',
                                data:[]};

                        var counter=1;
                        var last_updated=get_my_time();

                        pass_items.forEach(function(pass_item)
                        {
                            var data_json_array=[{index:'id',value:pass_item},
                                    {index:'pass_num',value:''},
                                    {index:'pass_id',value:''},
                                    {index:'status',value:'pending'},
                                    {index:'last_updated',value:last_updated}];

                            data_json.data.push(data_json_array);
                        });
                        update_batch_json(data_json);                        
                    });

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