<div id='report100' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
        <div class='caption'>
            <div class='btn-group' id='report100_due_date' data-toggle='buttons' data-value='today'>
                <label class='btn red-pink active today' onclick=report100_ini('today');><input name='due_date' type='radio' class='toggle'>Due Today</label>
                <label class='btn red-pink week' onclick=report100_ini('week');><input type='radio' name='due_date' class='toggle'>Due In a Week</label>
            </div>
        </div>
        <div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                      	<a id='report100_remind'><i class='fa fa-bell'></i> Remind Staff</a>
                    </li>
                    <li class='divider'></li>
                    <li>
                      	<a id='report100_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='report100_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='report100_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li>
                        <a id='report100_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
      </div>
	</div>

	<div class="portlet-body">
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Letter #</th>
                    <th>File #</th>
					<th>Department</th>
                    <th>Office</th>
                    <th>DPO Section</th>
					<th>Notes</th>
					<th>Assignee</th>
				</tr>
			</thead>
			<tbody id='report100_body'>
			</tbody>
		</table>
	</div>

	<script>

    function report100_ini(due_date)
    {
        show_loader();

        $('#report100_body').html('');

        var due_time=get_raw_time(vTime.date())+86400000;
        if(typeof due_date!='undefined' && due_date=='week')
        {
			$('#report100_due_date').data('value','week');
            due_time=get_raw_time(vTime.date())+7*86400000;
        }
        else
        {
            $('#report100_due_date').data('value','today');
			$('#report100_due_date').find('label.today').addClass('active');
            $('#report100_due_date').find('label.week').removeClass('active');
        }

        var paginator=$('#report100_body').paginator({func:"report100_ini($('#report100_due_date').data('value'))"});

        var letters_data=new Object();
                letters_data.count=paginator.page_size();
                letters_data.start_index=paginator.get_index();
                letters_data.data_store='letters';

                letters_data.indexes=[{index:'id'},
                                {index:'letter_num'},
                                {index:'file_num'},
                                {index:'department'},
                                {index:'office'},
                                {index:'dpo_section'},
                                {index:'detail'},{index:'remarks'},
                                {index:'assigned_to'},{index:'status',exact:'open'},{index:'due_date',upperbound:due_time}];
        read_json_rows('report100',letters_data,function(letters)
        {
            var rowsHTML="";
            letters.forEach(function (letter)
            {
                rowsHTML+="<tr data-letter='"+letter.letter_num+"' data-assignee='"+letter.assigned_to+"'>";
                rowsHTML+="<td data-th='Letter #'><a title='Click to see followup details' onclick=modal200_action('"+letter.id+"');>";
                    rowsHTML+=letter.letter_num;
                rowsHTML+="</a></td>";
                rowsHTML+="<td data-th='File #'>";
                    rowsHTML+=letter.file_num;
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Department'>";
                    rowsHTML+=letter.department;
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Office'>";
                    rowsHTML+=letter.office;
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='DPO Section'>";
                    rowsHTML+=letter.dpo_section;
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Notes'>";
                    rowsHTML+="<textarea readonly='readonly'>"+letter.detail+"</textarea>"
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Assignee'><a onclick=\"show_object('staff','"+letter.assigned_to+"');\">";
                    rowsHTML+=letter.assigned_to;
                rowsHTML+="</a></td>";
                rowsHTML+="</tr>";
            });
            $('#report100_body').html(rowsHTML);
            $('#report100').formcontrol();
            hide_loader();

            paginator.update_index(letters.length);

			vExport.export_buttons({action:'dynamic',columns:letters_data,file:'Due Letters',report_id:'report100',feach:function (item)
			{
                delete item.status;
                delete item.due_date;
            }});

            var remind_button=document.getElementById('report100_remind');
            $(remind_button).off('click');
            $(remind_button).on('click',function()
            {
                var sms=get_session_var('sms_content');
                var sms_count=0;
                show_loader();
                $('#report100_body').find('tr').each(function()
                {
                    sms_count+=1;
                    var staff_name=$(this).attr('data-assignee');
                    var letter_num=$(this).attr('data-letter');

                    var phone_data={data_store:'staff',return_column:'phone',count:1,indexes:[{index:'acc_name',exact:staff_name}]};
                    read_json_single_column(phone_data,function(phones)
                    {
                        if(phones.length>0 && phones[0]!="" && phones[0]!='0' && phones[0]!=null)
                        {
                            var sms_content=sms.replace(/assignee/g,staff_name);
                            sms_content=sms_content.replace(/letter_num/g,letter_num);
                            send_sms(phones[0],sms_content,'transaction');
                            sms_count-=1;
                        }
                    });
                });

                var sms_timer=setInterval(function()
                {
                    if(sms_count===0)
                    {
                        hide_loader();
                        clearInterval(sms_timer);

                    }
                },1000);
            });
        });
    };

	</script>
</div>
