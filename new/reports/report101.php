<div id='report101' class='tab-pane portlet box red-sunglo'>	   
	<div class="portlet-title">
        <div class='caption'>
            <a class='btn btn-circle grey btn-outline btn-sm' onclick='report101_ini();'>Refresh</a>
        </div>
        <div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                      	<a id='report101_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='report101_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='report101_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li>
                        <a id='report101_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>	
	</div>
	
	<div class="portlet-body">
        <form id='report101_master'>
            <label><input type='text' name='date' class='floatlabel' placeholder='Due Date'></label>
        </form>

	   <div class='horizontal-bar-chart' id='report101_chart'></div>
    </div>
	<script>
    
    function report101_header_ini()
    {
        var master_form=document.getElementById('report101_master');
        var date_filter=master_form.elements['date'];
        $(date_filter).datepicker();
        date_filter.value=get_my_date();
        $('#report101').formcontrol();
    }

    function report101_ini(due_date)
    {
        show_loader();

        $('#report101_body').html('');

        var letters_data=new Object();
                letters_data.data_store='letters';

                letters_data.indexes=[{index:'id'},
                                {index:'letter_num'},
                                {index:'department'},
                                {index:'detail'},{index:'assigned_to'},{index:'status',exact:'open'},{index:'due_date'}];

        read_json_rows('report101',letters_data,function(letters)
        {
            var staff_data={data_store:'staff',
                            indexes:[{index:'name'},{index:'acc_name'},      
                                    {index:'status',exact:'active'}]};
            read_json_rows('',staff_data,function(staffs)
            {
                var due_time=get_my_time();
                var master_form=document.getElementById('report101_master');
                var date_filter=master_form.elements['date'].value;

                if(date_filter!='')
                {
                    due_time=get_raw_time(date_filter)+86400000;
                }

                staffs.forEach(function(staff)
                {    
                    staff.due=0;
                    staff.nondue=0;
                    for(var i in letters)
                    {
                        if(staff.acc_name==letters[i].assigned_to)
                        {
                            if(letters[i].due_date<due_time)
                            {
                                staff.due+=1;
                            }
                            else
                            {
                                staff.nondue+=1;
                            }
                            letters.splice(i,1);
                            i--;
                        }
                    }
                });
                
                var chart = AmCharts.makeChart("report101_chart", {
                    "type": "serial",
                    "theme": "light",
                    "handDrawn": true,
                    "handDrawScatter": 3,
                    "legend": {
                        "useGraphSettings": true,
                        "markerSize": 12,
                        "valueWidth": 0,
                        "verticalGap": 0
                    },
                    "dataProvider": staffs,
                    "valueAxes": [{
                        "stackType": "regular",
                        "axisAlpha": 0.3,
                        "gridAlpha": 0,
                        "minorGridAlpha": 0.08,
                        "minorGridEnabled": true,
                        "position": "top"
                    }],
                    "startDuration": 1,
                    "graphs": [{
                        "balloonText": "<b>[[category]]</b><br><span style='font-size:14px'>[[title]]: <b>[[value]]</b></span>",
                        "labelText": "[[value]]",
                        "title": "Due",
                        "type": "column",
                        "backgroundColor": "#D05454",
                        "color": "#000000",
                        "fillAlphas": 0.8,
                        "valueField": "due"
                    },{
                        "balloonText": "<b>[[category]]</b><br><span style='font-size:14px'>[[title]]: <b>[[value]]</b></span>",
                        "fillAlphas": 0.8,
                        "labelText": "[[value]]",
                        "lineAlpha": 0.3,
                        "title": "Pending (Not Due)",
                        "type": "column",
                        "backgroundColor": "#F4d03f",
                        "color": "#000000",
                        "valueField": "nondue"
                    }],
                    "rotate": true,
                    "categoryField": "name",
                    "categoryAxis": {
                        "gridPosition": "start"
                    }
                });
                
                $('#report101_chart').find('div>div>a').hide();
                hide_loader();
            });
        });				
    };
	
	</script>
</div>