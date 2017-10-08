/**
 * vExport
 * Author: Ashish Goyal
 * Copyright: Copyright 2016 | Vyavsaay ERP
 */
var vExport = {

	/**
	 * this function exports data with the designated filename
	 * options : {columns: evt that triggers image selection
	 *			filename: size of the image - small,large, original,
	 *			feach: function to be executed on each item
	 *		}
	*/
	old_export : function(options)
	{
		var defaults={};
		var settings = $.extend(defaults, options || {});

		show_loader();

		var new_columns=settings.columns.replace(" count='25'","");
		new_columns=new_columns.replace(" count='100'","");
		new_columns=new_columns.replace("start_index","dont_use_index");

		fetch_requested_data('',new_columns,function(results)
		{
			var data_id=vUtil.newKey();
			var last_updated=vTime.unix();
			var data_json={data_store:'export_log',
		 				log:'yes',
		 				warning:'no',
		 				data:[{index:'id',value:data_id},
		 					{index:'acc_name',value:get_account_name()},
		 					{index:'filename',value:settings.file},
		 					{index:'export_time',value:last_updated},
		 					{index:'last_updated',value:last_updated}],
		 				log_data:{title:'Exported',notes:settings.file+" report",link_to:''}};

			create_json(data_json);

			results.forEach(function(result)
			{
				if(!vUtil.isBlank(result.last_updated)){
					result.last_updated=vTime.date({time:result.last_updated});
				}
				if(!vUtil.isBlank(settings.feach))
				{
					settings.feach(result);
				}
			});

			var export_complete=setInterval(function()
			{
				if(total_export_requests===0)
				{
					clearInterval(export_complete);
					hide_loader();
					vUtil.objArrayToCSV(results,settings.file);
				}
			},500);
		});
	},

	/*
	* Fetches all records for a specified form and exports them to a csv
	*/
	export: function(options)
	{
		var defaults={};
		var settings = $.extend(defaults, options || {});

		show_loader();
		delete settings.columns.count;
		settings.columns.start_index=0;

		read_json_rows('',settings.columns,function(results)
		{
			var data_id=vUtil.newKey();
			var last_updated=vTime.unix();
			var data_json={data_store:'export_log',
				 				log:'yes',
				 				warning:'no',
				 				data:[{index:'id',value:data_id},
				 					{index:'acc_name',value:get_account_name()},
				 					{index:'filename',value:settings.file},
				 					{index:'export_time',value:last_updated},
				 					{index:'last_updated',value:last_updated}],
				 				log_data:{title:'Exported',notes:settings.file+" report",link_to:''}};

			create_json(data_json);

			show_loader();

			if(!vUtil.isBlank(settings.feach))
			{
				results.forEach(function(result)
				{
					settings.feach(result);
				});
			}
			else if(!vUtil.isBlank(settings.fall))
			{
				results=settings.fall(results);
			}

			var export_complete=setInterval(function()
			{
				if(total_export_requests===0)
				{
					clearInterval(export_complete);
					vUtil.objArrayToCSV(results,settings.file);
					hide_loader();
				}
			},500);
		});
	},
	/**
	* Generates a csv file from the result array
	*/
	csv_download: function(options)
	{
		var defaults={};
		var settings = $.extend(defaults, options || {});

		var data_id=vUtil.newKey();
		var last_updated=vTime.unix();
		var data_json={data_store:'export_log',
	 				log:'yes',
	 				warning:'no',
	 				data:[{index:'id',value:data_id},
	 					{index:'acc_name',value:get_account_name()},
	 					{index:'filename',value:settings.file},
	 					{index:'export_time',value:last_updated},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Exported',notes:settings.file+" report",link_to:''}};

		create_json(data_json);

		show_loader();
		vUtil.objArrayToCSV(settings.result,settings.file);
		hide_loader();
	},

	export_buttons:function(options){
		var defaults={};
		var settings = $.extend(defaults, options || {});

		var csv_button=document.getElementById(settings.report_id+'_csv');
		var pdf_button=document.getElementById(settings.report_id+'_pdf');
		var print_button=document.getElementById(settings.report_id+'_print');
		var email_button=document.getElementById(settings.report_id+'_email');

		if(typeof csv_button!='undefined')
		{
			$(csv_button).off("click");
			$(csv_button).on("click", function(event)
			{
				settings.format='csv';
				vExport.button_action(settings);
			});
		}

		if(typeof pdf_button!='undefined')
		{
			$(pdf_button).off("click");
			$(pdf_button).on("click", function(event)
			{
				settings.format='pdf';
				vExport.button_action(settings);
			});
		}

		if(typeof print_button!='undefined')
		{
			$(print_button).off("click");
			$(print_button).on("click", function(event)
			{
				settings.format='print';
				vExport.button_action(settings);
			});
		}

		if(typeof email_button!='undefined')
		{
			$(email_button).off("click");
			$(email_button).on("click", function(event)
			{
				settings.format='email';
				vExport.button_action(settings);
			});
		}
	},

	button_action:function(options)
	{
		show_loader();

		var defaults={};
		var settings = $.extend(defaults, options || {});

		var data_id=vUtil.newKey();
		var last_updated=vTime.unix();
		var data_json={data_store:'export_log',
			 				log:'yes',
			 				warning:'no',
			 				data:[{index:'id',value:data_id},
			 					{index:'acc_name',value:get_account_name()},
			 					{index:'filename',value:settings.file},
			 					{index:'export_time',value:last_updated},
			 					{index:'last_updated',value:last_updated}],
			 				log_data:{title:'Exported',notes:settings.file+" report",link_to:''}};

		create_json(data_json);

		if(settings.action=='dynamic')
		{
			delete settings.columns.count;
			settings.columns.start_index=0;

			read_json_rows('',settings.columns,function(results)
			{
				show_loader();
				if(!vUtil.isBlank(settings.feach))
				{
					results.forEach(function(result)
					{
						settings.feach(result);
					});

					var export_complete=setInterval(function()
					{
						if(total_export_requests===0)
						{
							clearInterval(export_complete);

							if(settings.format!='csv')
						    {
						        results.forEach(function(result)
						        {
						            delete result.id;
						        });
						    }
							settings.results=results;
							vExport.dynamic_action(settings);
							hide_loader();
						}
					},500);
				}
				else if(!vUtil.isBlank(settings.fall))
				{
					show_loader();
					settings.fall(results,function(new_results)
					{
						if(settings.format!='csv')
						{
							new_results.forEach(function(result)
							{
								delete result.id;
							});
						}
						settings.results=new_results;
						vExport.dynamic_action(settings);
						hide_loader();
					});
				}
			});
		}
		else
		{
			if(settings.action=='static')
			{
				vExport.static_action(settings);
			}else
			{
				if(!vUtil.isBlank(settings.feach))
				{
					settings.results.forEach(function(result)
					{
						settings.feach(result);
					});
				}

				if(settings.format!='csv')
			    {
			        settings.results.forEach(function(result)
			        {
			            delete result.id;
			        });
			    }

				vExport.dynamic_action(settings);
			}
			hide_loader();
		}
	},

	dynamic_action:function(options)
	{
		var defaults={};
		var settings = $.extend(defaults, options || {});
		var bt=get_session_var('title');

		switch(settings.format)
		{
			case 'csv': vUtil.objArrayToCSV(settings.results,settings.file);
						break;
			case 'pdf': print_report_table(settings.results,settings.file,function (container)
	                    {
	                        var html_data=container.innerHTML;
	                        var pdfcreator=new htmlToPdf({html:html_data});
	                        pdfcreator.download(settings.file);
	                        container.innerHTML="";
	                    });
	                    break;
			case 'print': print_report_table(settings.results,settings.file,function (container)
	                    {
	                        $.print(container);
	                        container.innerHTML="";
	                    });
	                    break;
			case 'email': modal183_action(bt+" - "+settings.file,function (func)
	                    {
	                        print_report_table(settings.results,settings.file,func);
	                    });
	                    break;
		}
	},

	static_action:function(options)
	{
		var defaults={};
		var settings = $.extend(defaults, options || {});
		var bt=get_session_var('title');

		switch(settings.format)
		{
			case 'pdf': print_static_report_table(settings.report_id,settings.file,function (container)
						{
	                        var html_data=container.innerHTML;
							var pdfcreator=new htmlToPdf({html:html_data});
							pdfcreator.download(settings.file);
	                        container.innerHTML="";
						});
						break;
			case 'print': print_static_report_table(settings.report_id,settings.file,function (container)
						{
							$.print(container);
							container.innerHTML="";
						});
						break;
			case 'email': modal183_action(bt+" - "+settings.file,function (func)
						{
							print_static_report_table(settings.report_id,settings.file,func);
						});
						break;
		}
	}

};
