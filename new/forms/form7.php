<div id='form7' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
            <div class='btn-group' id='form7_view' data-toggle='buttons'>
                <label class='btn green-jungle cc active' onclick=form7_ini('calendar');><input name='cc' type='radio' class='toggle'>Calendar</label>
                <label class='btn green-jungle tt' onclick=form7_ini('table');><input type='radio' name='tt' class='toggle'>Table</label>
            </div>
		</div>
		<div class="actions">
			<div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
										<li class="divider"> </li>
										<li>
                        <a id='form7_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form7_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form7_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form7_upload' onclick=modal23_action(form7_import_template,form7_import,form7_import_validate);><i class='fa fa-upload'></i> Import</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		 <form id='form7_master'>
				<label><input type='text' placeholder='Date' class='floatlabel' name='date' required onchange=form7_ini('table');></label>
				<button type='button' class='btn red-sunglo' style='vertical-align:top;margin-top:10px;' name='automark' onclick=form7_auto_mark_attendance();>Auto Mark Attendance</button>
		 </form>
		 <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form7_header'></form>
						<th><input type='text' placeholder="Staff" class='floatlabel' name='staff' form='form7_header'></th>
						<th><input type='text' placeholder="Attendance" class="floatlabel" name='attendance' form='form7_header'></th>
						<th><input type='text' placeholder="Hours Worked" readonly='readonly' form='form7_header'></th>
						<th>
							<input type='submit' form='form7_header' style='display:none;'>
							<a class='btn btn-circle grey btn-outline btn-sm' onclick='form7_add_item();' style='margin-bottom:10px;'>Add <i class='fa fa-plus'></i></a>
						</th>
				</tr>
			</thead>
			<tbody id='form7_body'>
			</tbody>
		</table>

    <div class='row'>
        <div class="col-md-12 col-sm-12">
            <div id="form7_calendar" class="has-toolbar"></div>
        </div>
    </div>

    </div>

		<script>

		function form7_header_ini()
		{
			///calendar set
			var fields=document.getElementById('form7_master');
			var date_filter=fields.elements['date'];

			$(date_filter).datepicker();
			date_filter.value=vTime.date();

			var filter_fields=document.getElementById('form7_header');
			var staff_filter=filter_fields.elements['staff'];
			var attendance_filter=filter_fields.elements['attendance'];

			var staff_data={data_store:'staff',return_column:'acc_name'};
			set_my_filter_json(staff_data,staff_filter);
			set_static_filter_json('attendance','presence',attendance_filter);

			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form7_ini();
			});

			var paginator=$('#form7').paginator({visible:false,container:$('#form7')});
		};

		function form7_ini(view)
		{
				var fid=$("#form7_link").attr('data_id');
				if(fid==null)
						fid="";
				show_loader();
				$('#form7_body').html("");
				$('#form7_calendar').fullCalendar('destroy');

				var view_filter='calendar';
				if(typeof view!='undefined' && view=='table')
				{
						view_filter='table';
						$('#form7_view').find('label.tt').addClass('active');
						$('#form7_view').find('label.cc').removeClass('active');
				}
				else
				{
						$('#form7_view').find('label.cc').addClass('active');
						$('#form7_view').find('label.tt').removeClass('active');
				}

				var date_filter=document.getElementById('form7_master').elements['date'];

				if(view_filter=='calendar')
				{
						$("#form7_body").parent().hide();
						$("#form7_master").hide();
						$("#form7_calendar").parent().parent().show();

						$('#form7_calendar').fullCalendar({
								header: {
										left: 'prev,next',
										center: 'title',
										right: 'today'
								},
								editable: true,
								slotEventOverlap:true,
								events: function(start, end, timezone, callback)
								{
										var start_time=parseFloat(start.unix())*1000;
										var end_time=parseFloat(end.unix())*1000;
										var attendance_data={data_store:'attendance',
															access:'yes',
														 	indexes:[{index:'id'},
																	 {index:'acc_name'},
																	 {index:'date',lowerbound:start_time,upperbound:end_time},
																	 {index:'presence'},
																	 {index:'hours_worked'}]};
										read_json_rows('form7',attendance_data,function(attendances)
										{
											var events=[];

											attendances.sort(function(a,b)
											{
												if(a.date>b.date)
													return 1;
												else
													return -1;
											});

											for(var i=0;i<attendances.length;i++)
											{
												var start_iterator=0;
												var presents=0;
												var hours_worked=parseFloat(attendances[i].hours_worked);
												var absents=0;

												if(attendances[i].presence=='present')
													presents+=1;
												else
													absents+=1;

												for(var j=i+1;j<attendances.length;j++)
												{
													if(attendances[i].date===attendances[j].date)
													{
														hours_worked+=parseFloat(attendances[j].hours_worked);
														if(attendances[j].presence=='present')
															presents+=1;
														else
															absents+=1;

														attendances.splice(j,1);
														j-=1;
													}
												}

												var color='#1bbc9b';
												if(absents>presents)
												{
													color='#f3565d';
												}
												events.push({
													title:"Total strength:"+presents,
													start:get_iso_date(attendances[i].date),
													allDay:true,
													color:color,
													editable:false,
													hours_worked:hours_worked
												});
											}
											callback(events);

											initialize_tabular_report_buttons(attendance_data,'Attendance','form7',function (item)
                      {
													item.staff=item.acc_name;
                          item.date=get_my_datetime(item.date);
													item.attendance=item.presence;
													item['hours worked']=item.hours_worked;

													delete item.hours_worked;
                          delete item.presence;
													delete item.acc_name;
                      });

											hide_loader();
										});
								},
								dayClick: function(date,jsEvent,view){
									var my_date=get_my_date_from_iso(date.format());
									date_filter.value=my_date;
									form7_ini('table');
								},
								eventClick: function(calEvent,jsEvent,view){
									var my_date=get_my_date_from_iso(calEvent.start.format());
									date_filter.value=my_date;
									form7_ini('table');
								},
								eventMouseover: function(event, jsEvent, view)
								{
									$('.fc-title', this).append("<div id='form7_tooltip_"+event.id+"' class='hover-end'>Total Hours Worked: "+event.hours_worked+"</div>");
									},
								eventMouseout: function(event, jsEvent, view)
								{
									$('#form7_tooltip_'+event.id).remove();
								}
						});
						setTimeout(function(){$('#form7 .fc-today-button').click()},1000);
				}
				else
				{
						$("#form7_body").parent().show();
						$("#form7_master").show();
						$("#form7_calendar").parent().parent().hide();

						var fields=document.getElementById('form7_header');
						var staff_filter=fields.elements['staff'].value;
						var attendance_filter=fields.elements['attendance'].value;
						var paginator=$('#form7_body').paginator();

						var columns={data_store:'attendance',
												 count:paginator.page_size(),
												 start_index:paginator.get_index(),
												 access:'yes',
												 indexes:[{index:'id',value:fid},
																	 {index:'acc_name',value:staff_filter},
																	 {index:'presence'},
																	 {index:'date',exact:get_raw_time(date_filter.value)},
																	 {index:'hours_worked'}]};

						read_json_rows('form7',columns,function(results)
						{
								results.forEach(function(result)
								{
										var rowsHTML="<tr>";
										rowsHTML+="<form id='form7_"+result.id+"'></form>";
											rowsHTML+="<td data-th='Staff'>";
												rowsHTML+="<a onclick=\"show_object('staff','"+result.customer+"');\"><textarea readonly='readonly' form='form7_"+result.id+"'>"+result.acc_name+"</textarea></a>";
											rowsHTML+="</td>";
											rowsHTML+="<td data-th='Attendance'>";
												rowsHTML+="<input type='text' readonly='readonly' form='form7_"+result.id+"' class='dblclick_editable' value='"+result.presence+"'>";
											rowsHTML+="</td>";
											rowsHTML+="<td data-th='Hours Worked'>";
												rowsHTML+="<input type='number' readonly='readonly' form='form7_"+result.id+"' class='dblclick_editable' value='"+result.hours_worked+"'>";
											rowsHTML+="</td>";
											rowsHTML+="<td data-th='Action'>";
												rowsHTML+="<input type='hidden' readonly='readonly' form='form7_"+result.id+"' value='"+result.id+"'>";
												rowsHTML+="<button type='submit' class='btn green' form='form7_"+result.id+"' title='Save' name='save'><i class='fa fa-save'></i></button>";
												rowsHTML+="<button type='button' class='btn red' form='form7_"+result.id+"' title='Delete' onclick='form7_delete_item($(this));' name='delete'><i class='fa fa-trash'></i></button>";
											rowsHTML+="</td>";
									rowsHTML+="</tr>";

									$('#form7_body').append(rowsHTML);
									var fields=document.getElementById("form7_"+result.id);
									$(fields).on("submit", function(event)
									{
										event.preventDefault();
										form7_update_item(fields);
									});

									var attendance_filter=fields.elements[1];
									set_static_value_list_json('attendance','presence',attendance_filter);
								});

								paginator.update_index(results.length);

								initialize_tabular_report_buttons(columns,'Attendance','form7',function (item)
								{
									item.staff=item.acc_name;
									item.date=get_my_datetime(item.date);
									item.attendance=item.presence;
									item['hours worked']=item.hours_worked;

									delete item.hours_worked;
									delete item.presence;
									delete item.acc_name;
								});

								$('#form7').formcontrol();
								hide_loader();
						});

				}
		}

		function form7_add_item()
		{
			if(is_create_access('form7'))
			{
				var id=vUtil.newKey();
				var rowsHTML="<tr>";
				rowsHTML+="<form id='form7_"+id+"' autocomplete='off'></form>";
					rowsHTML+="<td data-th='Staff'>";
	          rowsHTML+="<input type='text' placeholder='Staff' required form='form7_"+id+"'>";
	        rowsHTML+="</td>";
					rowsHTML+="<td data-th='Attendance'>";
						rowsHTML+="<input type='text' form='form7_"+id+"' required>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Hours Worked'>";
						rowsHTML+="<input type='number' form='form7_"+id+"' step='any'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form7_"+id+"' value='"+id+"'>";
						rowsHTML+="<button type='submit' class='btn green' form='form7_"+id+"' name='save'><i class='fa fa-save'></i></button>";
						rowsHTML+="<button type='button' class='btn red' form='form7_"+id+"' onclick='$(this).parent().parent().remove();' name='delete'><i class='fa fa-trash'></i></button>";
					rowsHTML+="</td>";
				rowsHTML+="</tr>";

				$('#form7_body').prepend(rowsHTML);

				var fields=document.getElementById("form7_"+id);
				var staff_filter=fields.elements[0];
				var attendance_filter=fields.elements[1];

				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form7_create_item(fields);
				});

				var staff_data={data_store:'staff',return_column:'acc_name'};
				set_my_value_list_json(staff_data,staff_filter,function ()
				{
					$(staff_filter).focus();
				});

				set_static_value_list_json('attendance','presence',attendance_filter);
				$('#form7').formcontrol();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form7_create_item(form)
		{
			if(is_create_access('form7'))
			{
				var name=form.elements[0].value;
				var presence=form.elements[1].value;
				var hours=form.elements[2].value;
				var data_id=form.elements[3].value;
				var date=get_raw_time(document.getElementById('form7_master').elements['date'].value);
				var last_updated=get_my_time();

				var data_json={data_store:'attendance',
	 							data:[{index:'id',value:data_id},
									  {index:'acc_name',value:name,uniqueWith:['date']},
									  {index:'presence',value:presence},
									  {index:'hours_worked',value:hours},
									  {index:'date',value:date},
									  {index:'last_updated',value:last_updated}]};
	    	create_json(data_json);

				$(form).readonly();

				$(form).off('submit');
				$(form).on('submit',function(event)
				{
					event.preventDefault();
					form7_update_item(form);
				});
			}
			else
			{
				$("#modal2_link").click();
			}

		}

		function form7_update_item(form)
		{
			if(is_update_access('form7'))
			{
				var name=form.elements[0].value;
				var presence=form.elements[1].value;
				var hours=form.elements[2].value;
				var data_id=form.elements[3].value;
				var date=get_raw_time(document.getElementById('form7_master').elements['date'].value);
				var last_updated=get_my_time();

				var data_json={data_store:'attendance',
	 							data:[{index:'id',value:data_id},
									  {index:'acc_name',value:name},
									  {index:'presence',value:presence},
									  {index:'hours_worked',value:hours},
									  {index:'date',value:date},
									  {index:'last_updated',value:last_updated}]};
	    	update_json(data_json);
				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form7_auto_mark_attendance()
		{
			var data_json={data_store:'attendance',
					data:[]};

			var counter=1;
			var last_updated=get_my_time();

			var default_hours_worked=get_session_var('hours_worked');
			if(vUtil.isBlank(default_hours_worked))
			{
				default_hours_worked=8;
			}
			var date=get_raw_time(document.getElementById('form7_master').elements['date'].value);

			var staff_data={data_store:'staff',return_column:'acc_name'};
			read_json_single_column(staff_data,function(data_array)
			{
				data_array.forEach(function(row)
				{
					counter+=1;
					var id=last_updated+counter;

					var data_json_array=[{index:'id',value:id},
							{index:'acc_name',value:row,uniqueWith:['date']},
							{index:'date',value:date},
							{index:'presence',value:'present'},
							{index:'hours_worked',value:default_hours_worked},
							{index:'last_updated',value:last_updated}];

					data_json.data.push(data_json_array);
				});

				if(is_create_access('form7'))
				{
					create_batch_json(data_json,function(){form7_ini('table')});
				}
				else
				{
					$("#modal2_link").click();
				}
			});
		};

		</script>
</div>
