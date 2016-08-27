/**
 * this function resizes and sets the preview of the picture
 * @param evt Event that is called when image is selected
 * @param pictureinfo the html element to display the preview of the image
 */
function select_picture(evt,pictureinfo,func)
{
	var file=evt.target.files[0];
	if(file.type.match('image.*'))
	{
		var reader = new FileReader();

		reader.onloadend=function()
		{
		    var tempImg = new Image();
		    tempImg.src = reader.result;
		    tempImg.onload = function()
		    {
		        var MAX_WIDTH = 200;
		        var MAX_HEIGHT = 150;
		        var tempW = tempImg.width;
		        var tempH = tempImg.height;
		        if (tempW > tempH) {
		            if (tempW > MAX_WIDTH) {
		               tempH *= MAX_WIDTH / tempW;
		               tempW = MAX_WIDTH;
		            }
		        } else {
		            if (tempH > MAX_HEIGHT) {
		               tempW *= MAX_HEIGHT / tempH;
		               tempH = MAX_HEIGHT;
		            }
		        }

		        var canvas = document.createElement('canvas');
		        canvas.width = tempW;
		        canvas.height = tempH;
		        var ctx = canvas.getContext("2d");
		        ctx.drawImage(this, 0, 0, tempW, tempH);
		        var dataURL = canvas.toDataURL("image/jpeg");
		        func(dataURL);
		    };

		};
		reader.readAsDataURL(file);
	}
}

function select_picture_large(evt,func)
{
	var file=evt.target.files[0];
	if(file.type.match('image.*'))
	{
		var reader = new FileReader();

		reader.onloadend=function()
		{
		    var tempImg = new Image();
		    tempImg.src = reader.result;
		    tempImg.onload = function()
		    {
		        var MAX_WIDTH = 1600;
		        var MAX_HEIGHT = 1200;
		        var tempW = tempImg.width;
		        var tempH = tempImg.height;
		        if (tempW > tempH) {
		            if (tempW > MAX_WIDTH) {
		               tempH *= MAX_WIDTH / tempW;
		               tempW = MAX_WIDTH;
		            }
		        } else {
		            if (tempH > MAX_HEIGHT) {
		               tempW *= MAX_HEIGHT / tempH;
		               tempH = MAX_HEIGHT;
		            }
		        }

		        var canvas = document.createElement('canvas');
		        canvas.width = tempW;
		        canvas.height = tempH;
		        var ctx = canvas.getContext("2d");
		        ctx.drawImage(this, 0, 0, tempW, tempH);
		        var dataURL = canvas.toDataURL("image/jpeg");
		        func(dataURL);
		    };

		};
		reader.readAsDataURL(file);
	}
}

function select_picture_unsized(evt,func)
{
	var file=evt.target.files[0];
	if(file.type.match('image.*'))
	{
		var reader = new FileReader();

		reader.onloadend=function()
		{
		    var tempImg = new Image();
		    tempImg.src = reader.result;
		    tempImg.onload = function()
		    {
		        var tempW = tempImg.width;
		        var tempH = tempImg.height;

		        var canvas = document.createElement('canvas');
		        canvas.width = tempW;
		        canvas.height = tempH;
		        var ctx = canvas.getContext("2d");
		        ctx.drawImage(this, 0, 0, tempW, tempH);
		        var dataURL = canvas.toDataURL("image/jpeg");
		        func(dataURL);
		    };
		};
		reader.readAsDataURL(file);
	}
}


/**
 * this function saves the document
 * @param evt Event that is called when document selected
 */
function select_document(evt,func)
{
	var file=evt.target.files[0];
	var reader = new FileReader();

	reader.onloadend=function()
	{
        var dataURL = reader.result;
        func(dataURL);
	};
	reader.readAsDataURL(file);
}


/*
* Fetches all records for a specified form and exports them to a csv
*/
function get_export_data(columns,filename)
{
	var new_columns=columns.replace(" count='25'","");
	new_columns=new_columns.replace(" count='100'","");
	new_columns=new_columns.replace("start_index","dont_use_index");
	//console.log(new_columns);
	show_loader();
	fetch_requested_data('',new_columns,function(results)
	{
		var data_id=vUtil.newKey();
		var last_updated=get_my_time();
		var data_json={data_store:'export_log',
			 				log:'yes',
			 				warning:'no',
			 				data:[{index:'id',value:data_id},
			 					{index:'acc_name',value:get_account_name()},
			 					{index:'filename',value:filename},
			 					{index:'export_time',value:last_updated},
			 					{index:'last_updated',value:last_updated}],
			 				log_data:{title:'Exported',notes:filename+" report",link_to:''}};

		create_json(data_json);

		results.forEach(function(result)
		{
			result.last_updated=get_my_datetime(result.last_updated);
		});

		hide_loader();
		vUtil.objArrayToCSV(results,filename);
	});
}

/*
* Fetches all records for a specified form and exports them to a csv
*/
function get_export_data_extended(columns,filename,func)
{
	show_loader();
	var new_columns=columns.replace(" count='25'","");
	new_columns=new_columns.replace(" count='100'","");
	new_columns=new_columns.replace("start_index","dont_use_index");
	//console.log(new_columns);

	fetch_requested_data('',new_columns,function(results)
	{
		var data_id=vUtil.newKey();
		var last_updated=get_my_time();
		var data_json={data_store:'export_log',
			 				log:'yes',
			 				warning:'no',
			 				data:[{index:'id',value:data_id},
			 					{index:'acc_name',value:get_account_name()},
			 					{index:'filename',value:filename},
			 					{index:'export_time',value:last_updated},
			 					{index:'last_updated',value:last_updated}],
			 				log_data:{title:'Exported',notes:filename+" report",link_to:''}};

		create_json(data_json);

		results.forEach(function(result)
		{
			func(result);
		});

		var export_complete=setInterval(function()
		{

			//console.log(total_export_requests);
			if(total_export_requests===0)
			{
				clearInterval(export_complete);
				//console.log(results);
				hide_loader();
				vUtil.objArrayToCSV(results,filename);
			}
		},1000);
	});
}


/*
* Fetches all records for a specified form and exports them to a csv
*/
function get_export_data_restructured(columns,filename,func)
{
	show_loader();
	delete columns.count;
	columns.start_index=0;

	read_json_rows('',columns,function(results)
	{
		var data_id=vUtil.newKey();
		var last_updated=get_my_time();
		var data_json={data_store:'export_log',
			 				log:'yes',
			 				warning:'no',
			 				data:[{index:'id',value:data_id},
			 					{index:'acc_name',value:get_account_name()},
			 					{index:'filename',value:filename},
			 					{index:'export_time',value:last_updated},
			 					{index:'last_updated',value:last_updated}],
			 				log_data:{title:'Exported',notes:filename+" report",link_to:''}};

		create_json(data_json);

		var new_result_array=func(results);

		var export_complete=setInterval(function()
		{
			//console.log(total_export_requests);
			if(total_export_requests===0)
			{
				clearInterval(export_complete);
				//console.log(new_result_array);
				hide_loader();
				vUtil.objArrayToCSV(new_result_array,filename);
			}
		},1000);
	});
}

/*
* Fetches all records for a specified form and exports them to a csv
*/
function get_limited_export_data(columns,filename,func)
{
	show_loader();
	delete columns.count;
	columns.start_index=0;

	read_json_rows('',columns,function(results)
	{
		var data_id=vUtil.newKey();
		var last_updated=get_my_time();
		var data_json={data_store:'export_log',
			 				log:'yes',
			 				warning:'no',
			 				data:[{index:'id',value:data_id},
			 					{index:'acc_name',value:get_account_name()},
			 					{index:'filename',value:filename},
			 					{index:'export_time',value:last_updated},
			 					{index:'last_updated',value:last_updated}],
			 				log_data:{title:'Exported',notes:filename+" report",link_to:''}};

		create_json(data_json);

		if(typeof func!='undefined')
		{
			results.forEach(function(result)
			{
				func(result);
			});
		}

		var export_complete=setInterval(function()
		{
			//console.log(total_export_requests);
			if(total_export_requests===0)
			{
				clearInterval(export_complete);
				//console.log(results);
				hide_loader();
				vUtil.objArrayToCSV(results,filename);
			}
		},1000);
	});
}


function initialize_tabular_report_buttons(columns,report_title,report_id,func)
{
	var csv_button=document.getElementById(report_id+'_csv');
	var pdf_button=document.getElementById(report_id+'_pdf');
	var print_button=document.getElementById(report_id+'_print');
	var email_button=document.getElementById(report_id+'_email');

	if(typeof csv_button!='undefined')
	{
		$(csv_button).off("click");
		$(csv_button).on("click", function(event)
		{
			get_tabular_report_data(columns,report_title,'csv',func);
		});
	}

	if(typeof pdf_button!='undefined')
	{
		$(pdf_button).off("click");
		$(pdf_button).on("click", function(event)
		{
			get_tabular_report_data(columns,report_title,'pdf',func);
		});
	}

	if(typeof print_button!='undefined')
	{
		$(print_button).off("click");
		$(print_button).on("click", function(event)
		{
			get_tabular_report_data(columns,report_title,'print',func);
		});
	}

	if(typeof email_button!='undefined')
	{
		$(email_button).off("click");
		$(email_button).on("click", function(event)
		{
			get_tabular_report_data(columns,report_title,'email',func);
		});
	}
}

function initialize_static_tabular_report_buttons(report_title,report_id)
{
	var pdf_button=document.getElementById(report_id+'_pdf');
	var print_button=document.getElementById(report_id+'_print');
	var email_button=document.getElementById(report_id+'_email');

	if(typeof pdf_button!='undefined')
	{
		$(pdf_button).off("click");
		$(pdf_button).on("click", function(event)
		{
			get_static_report_data(report_title,'pdf',report_id);
		});
	}

	if(typeof print_button!='undefined')
	{
		$(print_button).off("click");
		$(print_button).on("click", function(event)
		{
			get_static_report_data(report_title,'print',report_id);
		});
	}

	if(typeof email_button!='undefined')
	{
		$(email_button).off("click");
		$(email_button).on("click", function(event)
		{
			get_static_report_data(report_title,'email',report_id);
		});
	}
}


function get_tabular_report_data(columns,filename,action_type,func)
{
	show_loader();
	delete columns.count;
	columns.start_index=0;

	read_json_rows('',columns,function(results)
	{
		var data_id=vUtil.newKey();
		var last_updated=get_my_time();
		var data_json={data_store:'export_log',
			 				log:'yes',
			 				warning:'no',
			 				data:[{index:'id',value:data_id},
			 					{index:'acc_name',value:get_account_name()},
			 					{index:'filename',value:filename},
			 					{index:'export_time',value:last_updated},
			 					{index:'last_updated',value:last_updated}],
			 				log_data:{title:'Exported',notes:filename+" report",link_to:''}};

		create_json(data_json);

		if(typeof func!='undefined')
		{
			results.forEach(function(result)
			{
				func(result);
			});
		}

		var export_complete=setInterval(function()
		{
			if(total_export_requests===0)
			{
				clearInterval(export_complete);
				hide_loader();
				var bt=get_session_var('title');
                if(action_type!='csv')
                {
                    results.forEach(function(result)
                    {
                        delete result.id;
                    });
                }
				switch(action_type)
				{
					case 'csv': vUtil.objArrayToCSV(results,filename);
								break;
					case 'pdf': print_report_table(results,filename,function (container)
                                {
                                    var html_data=container.innerHTML;
                                    var pdfcreator=new htmlToPdf({html:html_data});
                                    pdfcreator.download(filename);
                                    container.innerHTML="";
                                });
                                break;
					case 'print': print_report_table(results,filename,function (container)
                                {
                                    $.print(container);
                                    container.innerHTML="";
                                });
                                break;
					case 'email': modal183_action(bt+" - "+filename,function (func)
                                {
                                    print_report_table(results,filename,func);
                                });
                                break;
				}
			}
		},500);
	});
}

function get_static_report_data(filename,action_type,report_id)
{
	var data_id=vUtil.newKey();
	var last_updated=get_my_time();
	var data_json={data_store:'export_log',
		 				log:'yes',
		 				warning:'no',
		 				data:[{index:'id',value:data_id},
		 					{index:'acc_name',value:get_account_name()},
		 					{index:'filename',value:filename},
		 					{index:'export_time',value:last_updated},
		 					{index:'last_updated',value:last_updated}],
		 				log_data:{title:'Exported',notes:filename+" report",link_to:report_id}};
	create_json(data_json);

	var bt=get_session_var('title');
	switch(action_type)
	{
		case 'pdf': print_static_report_table(report_id,filename,function (container)
						{
                            var html_data=container.innerHTML;
							var pdfcreator=new htmlToPdf({html:html_data});
							pdfcreator.download(filename);
                            container.innerHTML="";
						});
						break;
		case 'print': print_static_report_table(report_id,filename,function (container)
							{
								$.print(container);
								container.innerHTML="";
							});
							break;
		case 'email': modal183_action(bt+" - "+filename,function (func)
							{
								print_static_report_table(report_id,filename,func);
							});
							break;
	}
}


/*
* Fetches all records for a specified report and exports them to a csv
*/
function csv_download_report(result_array,filename)
{
	var data_id=vUtil.newKey();
	var last_updated=get_my_time();
	var data_json={data_store:'export_log',
			 				log:'yes',
			 				warning:'no',
			 				data:[{index:'id',value:data_id},
			 					{index:'acc_name',value:get_account_name()},
			 					{index:'filename',value:filename},
			 					{index:'export_time',value:last_updated},
			 					{index:'last_updated',value:last_updated}],
			 				log_data:{title:'Exported',notes:filename+" report",link_to:''}};

	create_json(data_json);

	hide_loader();
	vUtil.objArrayToCSV(result_array,filename);
}


function my_datalist_change(element,func)
{
	$(element).off('keyup');
	$(element).on('keyup', function()
	{
		var list_id=element.getAttribute('list');
    	var options = $('#'+list_id)[0].options;
    	for (var i=0;i<options.length;i++)
    	{
	       	if (options[i].value == $(this).val())
    	    {
    	    	func();
    	    	break;
    	    }
    	}
	});
}


function get_all_child_storage(store_area,area_array)
{
	var child_data={data_store:'store_areas',return_column:'name'};
		child_data.indexes=[{index:'parent',exact:store_area}];

	storage_count_tracker+=1;

	read_json_single_column(child_data,function(children)
	{
		if(children.length>0)
		{
			children.forEach(function(child)
			{
				area_array.push(child);
				get_all_child_storage(child,area_array);
			});
		}
		storage_count_tracker-=1;
	});
}

function get_available_batch(item_name,batch_array,min_quantity,result_array,success_func)
{
	if(batch_array.length>0)
	{
		get_inventory(item_name,batch_array[0],function(inventory)
		{
			if(parseFloat(inventory)>0)
			{
				if(parseFloat(inventory)>=parseFloat(min_quantity))
				{
					var result_item=new Object();
					result_item.batch=batch_array[0];
					result_item.quantity=min_quantity;
					result_array.push(result_item);
					success_func();
				}
				else
				{
					var result_item=new Object();
					result_item.batch=batch_array[0];
					result_item.quantity=inventory;
					result_array.push(result_item);
					min_quantity=parseFloat(min_quantity)-parseFloat(inventory);
					batch_array.splice(0,1);
					get_available_batch(item_name,batch_array,min_quantity,result_array,success_func);
				}
			}
			else
			{
				batch_array.splice(0,1);
				get_available_batch(item_name,batch_array,min_quantity,result_array,success_func);
			}
		});
	}
	else
	{
		success_func();
	}
}

function get_available_storage(item_name,batch,storage_array,min_quantity,result_array,success_func)
{
	if(storage_array.length>0)
	{
		get_store_inventory(storage_array[0],item_name,batch,function(inventory)
		{
			if(parseFloat(inventory)>0)
			{
				if(parseFloat(inventory)>=parseFloat(min_quantity))
				{
					var result_item=new Object();
					result_item.storage=storage_array[0];
					result_item.quantity=min_quantity;
					result_array.push(result_item);
					success_func();
				}
				else
				{
					var result_item=new Object();
					result_item.storage=storage_array[0];
					result_item.quantity=inventory;
					result_array.push(result_item);
					min_quantity=parseFloat(min_quantity)-parseFloat(inventory);
					storage_array.splice(0,1);
					get_available_storage(item_name,batch,storage_array,min_quantity,result_array,success_func);
				}
			}
			else
			{
				storage_array.splice(0,1);
				get_available_storage(item_name,batch,storage_array,min_quantity,result_array,success_func);
			}
		});
	}
	else
	{
		success_func();
	}
}
