/**
 * vDal
 * Author: Ashish Goyal
 * Copyright: Copyright 2016 | Vyavsaay ERP
 * Description: this library exposes generic data access operations
 */

var vDal = function (options)
{
	var defaults={};
	var settings = $.extend(defaults, options || {});

	this.get = function(element_id,request_data){
		if(is_read_access(element_id)){
			if(is_online())
			{
				return server_read_json_rows(request_data);
			}
			else
			{
				return local_read_json_rows(request_data);
			}
		}
		else{
			hide_loader();
			console.log("Being called from " + arguments.callee.caller.toString());
			if(!vUtil.isBlank(get_session_var('re')))
			{
				$("#modal2_link").click();
			}
			return Promise.resolve([]);
		}
	};

	this.getColumn = function(request_data){
		if(is_online())
		{
			return server_read_json_column(request_data);
		}
		else
		{
			return local_read_json_column(request_data);
		}
	};

	this.getCount = function(request_data){
		if(is_online())
		{
			return server_read_json_count(request_data);
		}
		else
		{
			return local_read_json_count(request_data);
		}
	};

	this.getMaster = function(request_data){
		if(is_read_access(element_id)){
			if(is_online()){
				return server_read_json_rows_master(request_data);
			}
		}
		else{
			hide_loader();
			if(!vUtil.isBlank(get_session_var('re')))
			{
				$("#modal2_link").click();
			}
			return Promise.resolve([]);
		}
	};

	this.getMasterColumn = function(request_data){
		if(is_online())
		{
			return server_read_json_column_master(request_data);
		}else{
			hide_loader();
			if(!vUtil.isBlank(get_session_var('re')))
			{
				$("#modal2_link").click();
			}
			return Promise.resolve([]);
		}
	};

	this.delete = function(request_data){
		if(is_online())
		{
			return server_delete_json(request_data);
		}
		else
		{
			return local_delete_json(request_data);
		}
	};

	this.create = function(request_data){
		if(is_online())
		{
			return server_create_json(request_data);
		}
		else
		{
			return local_create_json(request_data);
		}
	};

	this.update = function(request_data){
		if(is_online())
		{
			return server_update_json(request_data);
		}
		else
		{
			return local_update_json(request_data);
		}
	};

	this.createBatch = function(request_data){
		if(is_online())
		{
			return server_create_batch_json(request_data);
		}
		else
		{
			return local_create_batch_json(request_data);
		}
	};

	this.updateBatch = function(request_data){
		if(is_online())
		{
			return server_update_batch_json(request_data);
		}
		else
		{
			return local_update_batch_json(request_data);
		}
	};

	this.email = function(settings){
		var email_enabled=get_session_var('email_enabled');
		var pdf_elem=document.getElementById('pdf_print_div');

		if(email_enabled=='yes')
		{
			if(settings.attachment_type=='image')
			{
				pdf_elem.innerHTML=settings.message_attachment;
				html2canvas(pdf_elem,
				{
			        onrendered: function(canvas)
			        {
			        	new_message_attachment=canvas.toDataURL("image/jpeg");
						pdf_elem.innerHTML="";

						var data={"to":settings.to,
									"from":settings.from,
									"from_name":settings.from_name,
									"subject":settings.subject,
									"message":settings.message,
									"message_attachment":new_message_attachment,
									"attachment_type":""};
						var data_string=JSON.stringify(data);

						if(is_online())
						{
							return server_send_email(data_string);
						}
						else
						{
							var email_data="<emails>"+
										"<id>"+vUtil.newKey()+"</id>"+
										"<subject>"+settings.subject+"</subject>"+
										"<message>"+htmlentities(settings.message)+"</message>"+
										"<message_attachment>"+new_message_attachment+"</message_attachment>"+
										"<receivers>"+settings.to+"</receivers>"+
										"<sender>"+settings.from+"</sender>"+
										"<sender_name>"+settings.from_name+"</sender_name>"+
										"<attachment_type>"+settings.attachment_type+"</attachment_type>"+
										"<status>pending</status>"+
										"<last_updated>"+get_my_time()+"</last_updated>"+
										"</emails>";
							return local_create_simple(email_data);
						}
			        }
			    });
			}
	        else if(settings.attachment_type=='pdf')
	        {
	            var pdfcreator=new htmlToPdf({html:settings.message_attachment});
	            pdfcreator.getDataUrl(function(new_message_attachment)
	            {
	                var data={"to":settings.to,
	                            "from":settings.from,
	                            "from_name":settings.from_name,
	                            "subject":settings.subject,
	                            "message":settings.message,
	                            "message_attachment":new_message_attachment,
	                            "attachment_type":settings.attachment_type};
	                var data_string=JSON.stringify(data);

	                if(is_online())
	                {
	                    return server_send_email(data_string);
	                }
	                else
	                {
	                    var email_data="<emails>"+
	                                "<id>"+vUtil.newKey()+"</id>"+
	                                "<subject>"+settings.subject+"</subject>"+
	                                "<message>"+htmlentities(settings.message)+"</message>"+
	                                "<message_attachment>"+new_message_attachment+"</message_attachment>"+
	                                "<receivers>"+settings.to+"</receivers>"+
	                                "<sender>"+settings.from+"</sender>"+
	                                "<sender_name>"+settings.from_name+"</sender_name>"+
	                                "<attachment_type>"+settings.attachment_type+"</attachment_type>"+
	                                "<status>pending</status>"+
	                                "<last_updated>"+get_my_time()+"</last_updated>"+
	                                "</emails>";
	                    return local_create_simple(email_data);
	                }
	            });
	        }
			else
			{
				var data={"to":settings.to,
							"from":settings.from,
							"from_name":settings.from_name,
							"subject":settings.subject,
							"message":settings.message,
							"message_attachment":settings.message_attachment,
							"attachment_type":settings.attachment_type};
				var data_string=JSON.stringify(data);

				if(is_online())
				{
					return server_send_email(data_string);
				}
				else
				{
					var email_data="<emails>"+
								"<id>"+vUtil.newKey()+"</id>"+
								"<subject>"+settings.subject+"</subject>"+
								"<message>"+htmlentities(settings.message)+"</message>"+
								"<message_attachment>"+settings.message_attachment+"</message_attachment>"+
								"<receivers>"+settings.to+"</receivers>"+
								"<sender>"+settings.from+"</sender>"+
								"<sender_name>"+settings.from_name+"</sender_name>"+
								"<attachment_type>"+settings.attachment_type+"</attachment_type>"+
								"<status>pending</status>"+
								"<last_updated>"+get_my_time()+"</last_updated>"+
								"</emails>";
					return local_create_simple(email_data);
				}
			}
		}
		else
		{
			hide_loader();
			return Promise.resolve();
		}
	};


	this.sms = function (settings)
	{
		var sms_enabled=get_session_var('sms_enabled');
		if(sms_enabled=='yes' && settings.to!="" && settings.to!=0 && settings.to!="0")
		{
			if(is_online())
			{
				return server_send_sms(settings.to,settings.message,settings.type);
			}
			else
			{
				var sms_data="<sms>"+
							"<id>"+vUtil.newKey()+"</id>"+
							"<receiver>"+settings.to+"</receiver>"+
							"<message>"+htmlentities(settings.message)+"</message>"+
							"<status>pending</status>"+
							"<billing_status>pending</billing_status>"+
							"<type>"+settings.type+"</type>"+
							"<last_updated>"+get_my_time()+"</last_updated>"+
							"</sms>";
				hide_loader();
				return local_create_simple(sms_data);
			}
		}
		else
		{
			hide_loader();
			return Promise.resolve();
		}
	};

};

vDal = new vDal();
