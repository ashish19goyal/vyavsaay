<div id='report96' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report96_ini();'>Refresh</a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='report96_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li>
                        <a id='report96_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='report96_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="Person" class='floatlabel' name='person'></label>
				<label><input type='submit' class='submit_hidden'></label>
			</fieldset>
		</form>
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Person</th>
					<th>Balance</th>
				</tr>
			</thead>
			<tbody id='report96_body'></tbody>
		</table>
	</div>

	<script>

function report96_header_ini()
{
	var form=document.getElementById('report96_header');
	var person_filter=form.elements['person'];

	$('#report96_body').html('');

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report96_ini();
	});

	var person_data={data_store:'staff',return_column:'acc_name'};
	set_my_value_list_json(person_data,person_filter);
}

function report96_ini()
{
	show_loader();
	var form=document.getElementById('report96_header');
	var person=form.elements['person'].value;

	$('#report96_body').html('');

    var paginator=$('#report96_body').paginator({page_size:25});

	var list1_data={data_store:'staff',
                    access:'yes',
					count:paginator.page_size(),
			        start_index:paginator.get_index(),
                  	indexes:[{index:'id'},{index:'acc_name',value:person}]};

	read_json_rows('report96',list1_data,function(staff)
	{
		staff.forEach(function(result)
		{
			var rowsHTML="<tr>";
				rowsHTML+="<td data-th='Person'>";
					rowsHTML+="<a onclick=\"show_object('staff','"+result.acc_name+"');\">"+result.acc_name+"</a>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Balance' id='report96_balance_"+result.id+"'>";
				rowsHTML+="</td>";
			rowsHTML+="</tr>";

			$('#report96_body').append(rowsHTML);

			var received_data={data_store:'cod_collections',return_column:'amount',sum:'yes',
								indexes:[{index:'acc_name',exact:result.acc_name}]};
			read_json_single_column(received_data,function(received)
			{
				var given_data={data_store:'cod_collections',return_column:'amount',sum:'yes',
									indexes:[{index:'from_name',exact:result.acc_name}]};
				read_json_single_column(given_data,function(given)
				{
					var balance_amount=parseFloat(received[0])-parseFloat(given[0]);
					document.getElementById('report96_balance_'+result.id).textContent="Rs. "+balance_amount;
				});
			});
		});

		vExport.export_buttons({file:'COD Collection Report',report_id:'report96',action:'static'});
        hide_loader();
        paginator.update_index(staff.length);
	});
};

	</script>
</div>
