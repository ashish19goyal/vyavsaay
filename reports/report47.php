<div id='report47' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report47_ini();'>Refresh</a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='report47_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li>
                        <a id='report47_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='report47_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="Item Keyword" class='floatlabel' name='key'></label>
				<label><input type='text' placeholder="Item" class='floatlabel' name='item_name'></label>
				<label><input type='text' placeholder="Brand" class='floatlabel' name='make'></label>
                <input type='submit' class='submit_hidden'>
            </fieldset>
		</form>
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Item</th>
					<th>Quantity</th>
					<th>Total Cost Price</th>
					<th>Total Sale Price</th>
                </tr>
			</thead>
			<tbody id='report47_body'>
			</tbody>
            <tfoot id='report47_foot'>
			</tfoot>
		</table>
	</div>
	<script>

	function report47_header_ini()
	{
		var form=document.getElementById('report47_header');
		var name_filter=form.elements['item_name'];
		var make_filter=form.elements['make'];

		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			report47_ini();
		});

		var name_data={data_store:'product_master',return_column:'name'};
		var make_data={data_store:'product_master',return_column:'make'};

		set_my_filter_json(name_data,name_filter);
		set_my_filter_json(make_data,make_filter);

		var paginator=$('#report47_body').paginator({'visible':false,'container':$('#report47_body')});
		vUtil.delay(function(){
			$('#report47').formcontrol();
		});
	}

	function report47_ini()
	{
		var form=document.getElementById('report47_header');
		var index=form.elements['key'].value;
		var name=form.elements['item_name'].value;
		var make=form.elements['make'].value;

		show_loader();
		$('#report47_body').html('');

		var product_master_data={data_store:'product_master',return_column:'name',
								indexes:[{index:'name',value:name},
										{index:'indexes',value:index},
										{index:'make',value:make}]};
		read_json_single_column(product_master_data,function(products)
		{
			var products_data={data_store:"product_instances",
							indexes:[{index:'product_name',array:products},
									{index:'batch'},
									{index:'cost_price'},
									{index:'sale_price'}]};
			read_json_rows('report47',products_data,function(products)
			{
				/////setting inventory value//////
				var products_inventory_count=products.length;
				var inventory_cost_price=0;
				var inventory_sale_price=0;
				var total_quantity=0;
				products.forEach(function(product)
				{
					get_inventory(product.product_name,product.batch,function(quantity)
					{
						product.cost=parseFloat(quantity)*parseFloat(product.cost_price);
						product.sale=parseFloat(quantity)*parseFloat(product.sale_price);
						product.quantity=parseFloat(quantity);

						if(!isNaN(product.cost))
							inventory_cost_price+=product.cost;
						if(!isNaN(product.sale))
							inventory_sale_price+=product.sale;

						total_quantity+=product.quantity;
						products_inventory_count-=1;
					});
				});

				//////final settings////////////
				var report_timer=setInterval(function()
				{
			  	   if(products_inventory_count===0)
			  	   {
			  		   clearInterval(report_timer);
					   for(var i=0;i<products.length;i++)
		  			   {
		  				   for(var j=i+1; j<products.length;j++)
		  				   {
		  					   if(products[i].product_name==products[j].product_name)
		  					   {
		  						 products[i].cost+=products[j].cost;
		  						 products[i].sale+=products[j].sale;
								 products[i].quantity+=products[j].quantity;
		  						 products.splice(j,1);
			  					 j-=1;
		  					   }
		  				   }
		  			   }

					   var rowsHTML="";
					   products.forEach(function(product)
					   {
						   rowsHTML+="<tr>";
							   rowsHTML+="<td data-th='Item'><a onclick=\"show_object('product_master','"+product.product_name+"');\">";
								   rowsHTML+=product.product_name;
							   rowsHTML+="</a></td>";
							   rowsHTML+="<td data-th='Quantity'>";
								   rowsHTML+=product.quantity;
							   rowsHTML+="</td>";
							   rowsHTML+="<td data-th='Total Cost Price'>";
								   rowsHTML+="Rs. "+vUtil.round(product.cost);
							   rowsHTML+="</td>";
							   rowsHTML+="<td data-th='Total Sale Price'>";
								   rowsHTML+="Rs. "+vUtil.round(product.sale);
							   rowsHTML+="</td>";
						   rowsHTML+="</tr>";
					   });

					   $('#report47_body').html(rowsHTML);

					   var total_row="<tr><td data-th='Total'>Total</td><td data-th='Quantity'>"+total_quantity+"</td><td data-th='Cost Price'>Rs. "+Math.round(inventory_cost_price)+"</td><td data-th='Sale Price'>Rs. "+Math.round(inventory_sale_price)+"</td></tr>";
					   $('#report47_foot').html(total_row);

					   vExport.export_buttons({file:'Inventory Value Report',report_id:'report47',action:'static'});
			  		   hide_loader();
				   }
			   },500);
			});
		});
	};

	</script>
</div>
