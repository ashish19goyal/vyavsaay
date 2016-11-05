<div id='form309' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick=modal187_action('master');>Add Table<i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form309_expand'><i class='fa fa-plus'></i> Expand All</a>
      	<a class='btn btn-default btn-sm' id='form309_collapse'><i class='fa fa-minus'></i> Collapse All</a>
      </div>
	</div>

	<div class="portlet-body">
		<br>
		<form id='form309_header'>
			<th><input type='text' placeholder="Table" class='floatlabel' name='table'></th>
		</form>
		<br>

		<div class="dd">
          <ol class="dd-list" id="form309_list">
          </ol>
      </div>
	</div>

	<script>
		function form309_header_ini()
		{
			var filter_fields=document.getElementById('form309_header');

			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form309_ini();
			});

			$('#form309_expand').off('click');
			$('#form309_expand').on('click', function (e)
			{
				$('#form309').find('.dd').nestable('expandAll');
			});

			$('#form309_collapse').off('click');
			$('#form309_collapse').on('click', function (e)
			{
				$('#form309').find('.dd').nestable('collapseAll');
			});
		}

		function form309_ini()
		{
			show_loader();
			var fid=$("#form309_link").attr('data_id');
			if(fid==null)
				fid="";

			var filter_fields=document.getElementById('form309_header');
			var ftable=filter_fields.elements['table'].value;

			$('#form309_list').html("");

			get_table_structure(ftable,function(results)
			{
				$("#form309").find('.dd').nestable('destroy');

				results.forEach(function(result)
				{
					var rowsHTML="<li class='dd-item' data-table='"+result.tablename+"'>"+
					   			"<button type='button' data-action='collapse' style='dispay:none;'></button>"+
									"<button type='button' data-action='expand' style='dispay:block;'></button>"+
									"<div class='dd-handle'> </div>"+
                  			"<div class='dd-content'>"+result.tablename+"<i class='fa fa-times link' style='float:right;color:#d64635;' title='Delete Table' onclick=form309_delete_table('"+result.tablename+"',$(this));></i><i class='fa fa-plus link' style='float:right;color:#1bbc9b;' title='Add Column' onclick=modal188_action('"+result.tablename+"','master');></i></div>"+
			 						"<ol class='dd-list'>";
               result.columns.forEach(function (column)
               {
               	rowsHTML+="<li class='dd-item' data-column='"+column.colname+"' data-type='"+column.coltype+"'>";
					   rowsHTML+="<div class='dd-handle'> </div>"+
                  			"<div class='dd-content'><span title='Click to change column type' style='cursor:pointer;' onclick=modal189_action('"+result.tablename+"','"+column.colname+"','"+column.coltype+"','master');> "+column.colname+" - "+column.coltype+" </span><i class='fa fa-times link' style='float:right;color:#d64635;' title='Delete Column' onclick=form309_delete_column('"+result.tablename+"','"+column.colname+"',$(this));></i></div></li>";
               });

              rowsHTML+="</ol></li>";

					$('#form309_list').append(rowsHTML);
					//$("#form309_"+result.tablename).nestable().on('change',form309_update_item(result.tablename));
				});
				$("#form309").find('.dd').nestable();
				$("#form309").find('.dd').nestable('collapseAll');
				hide_loader();
			});
		};

		function form309_delete_table(tablename,button)
		{
			if(is_delete_access('form309'))
			{
				modal115_action(function()
				{
					delete_server_table(tablename,'master');
					$(button).parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form309_delete_column(tablename,columnname,button)
		{
			if(is_delete_access('form309'))
			{
				modal115_action(function()
				{
					delete_server_table_column(tablename,columnname,'master');
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
