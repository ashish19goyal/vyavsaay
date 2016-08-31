<div id='form287' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='modal187_action();'>Add Table<i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form287_expand'><i class='fa fa-plus'></i> Expand All</a>
      	<a class='btn btn-default btn-sm' id='form287_collapse'><i class='fa fa-minus'></i> Collapse All</a>
      </div>
	</div>

	<div class="portlet-body">
		<br>
		<form id='form287_header'>
			<th><input type='text' placeholder="Table" class='floatlabel' name='table'></th>
		</form>
		<br>

		<div class="dd">
          <ol class="dd-list" id="form287_list">
          </ol>
      </div>
	</div>
	
	<script>
		function form287_header_ini()
		{
			var filter_fields=document.getElementById('form287_header');	
			
			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form287_ini();
			});
			
			$('#form287_expand').off('click');
			$('#form287_expand').on('click', function (e) 
			{
				$('#form287').find('.dd').nestable('expandAll');
			});

			$('#form287_collapse').off('click');
			$('#form287_collapse').on('click', function (e) 
			{
				$('#form287').find('.dd').nestable('collapseAll');
			});
		}
		
		function form287_ini()
		{
			show_loader();
			var fid=$("#form287_link").attr('data_id');
			if(fid==null)
				fid="";
			
			var filter_fields=document.getElementById('form287_header');
			var ftable=filter_fields.elements['table'].value;
			
			$('#form287_list').html("");
			
			get_table_structure(ftable,function(results)
			{
				$("#form287").find('.dd').nestable('destroy');
							
				results.forEach(function(result)
				{
					var rowsHTML="<li class='dd-item' data-table='"+result.tablename+"'>"+
									"<button type='button' data-action='collapse' style='dispay:none;'></button>"+
									"<button type='button' data-action='expand' style='dispay:block;'></button>"+		
					   			"<div class='dd-handle'> </div>"+
                  			"<div class='dd-content'>"+result.tablename+"<i class='fa fa-times link' style='float:right;color:#d64635;' title='Delete Table' onclick=form287_delete_table('"+result.tablename+"',$(this));></i><i class='fa fa-plus link' style='float:right;color:#1bbc9b;' title='Add Column' onclick=modal188_action('"+result.tablename+"');></i></div>"+
			 						"<ol class='dd-list'>";
               result.columns.forEach(function (column) 
               {
               	rowsHTML+="<li class='dd-item' data-column='"+column.colname+"' data-type='"+column.coltype+"'>";
					   rowsHTML+="<div class='dd-handle'> </div>"+
                  			"<div class='dd-content'><span title='Click to change column type' style='cursor:pointer;' onclick=modal189_action('"+result.tablename+"','"+column.colname+"','"+column.coltype+"');> "+column.colname+" - "+column.coltype+" </span><i class='fa fa-times link' style='float:right;color:#d64635;' title='Delete Column' onclick=form287_delete_column('"+result.tablename+"','"+column.colname+"',$(this));></i></div></li>";
               }); 

              rowsHTML+="</ol></li>";
					
					$('#form287_list').append(rowsHTML);
					//$("#form287_"+result.tablename).nestable().on('change',form287_update_item(result.tablename));
				});
				$("#form287").find('.dd').nestable();				
				$("#form287").find('.dd').nestable('collapseAll');
				//initialize_tabular_report_buttons(new_columns,'User Accounts','form287',function (item){});
				hide_loader();
			});
		};

		function form287_delete_table(tablename,button)
		{
			if(is_delete_access('form287'))
			{
				modal115_action(function()
				{
					delete_server_table(tablename);
					$(button).parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form287_delete_column(tablename,columnname,button)
		{
			if(is_delete_access('form287'))
			{
				modal115_action(function()
				{
					delete_server_table_column(tablename,columnname);
					$(button).parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

	</script>
</div>