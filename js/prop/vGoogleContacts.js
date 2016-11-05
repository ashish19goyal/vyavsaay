/**
 * vGContact
 * Author: Ashish Goyal
 * Copyright: Copyright 2016 | Vyavsaay ERP
 */

var vGContact = function (options)
{
	var defaults={client_id:get_session_var('googleClientId'),
				 scopes:["https://www.google.com/m8/feeds"],
				 prompt:'force',
				 act:function(response){
					 hide_loader();
					 console.log(response);
				 },
				 action:'batchEvents'};

	var settings = $.extend(defaults, options || {});


	/**
	* Initiate auth flow in response to user clicking authorize button.
	*
	* @param {Event} event Button click event.
	*/
	this.checkAuth = function (event)
	{
		gapi.auth.authorize(
		{
			client_id: settings.client_id,
			scope: settings.scopes.join(' '),
			immediate:false,
			approval_prompt:settings.prompt
		},
		function (authResult)
		{
			if (authResult && !authResult.error)
			{
				console.log('checkauth');
				gapi.client.load('calendar', 'v3', operations[settings.action]);
			}
			else
			{
				settings.act();
			}
		});
		//return false;
	};

	this.batchEvents = function()
	{
		operations.listCalendars(function(calendarId)
		{
			console.log('listCalendars');
			operations.deleteCalendar(calendarId,function()
			{
				console.log('deleteCalendar');
				operations.createCalendar(function(calId)
				{
					console.log('insertEvents');
					operations.insertEvents(calId);
				});
			});
		});
	};

	this.listCalendars = function(func)
	{
		var request=gapi.client.calendar.calendarList.list({});

		request.execute(function(resp)
		{
			var items=resp.items;
			var calendarId="";
			items.forEach(function(item)
			{
				if(item.summary==settings.calendarName)
				{
					calendarId=item.id;
				}
			});
		  	//console.log(resp);
			if(typeof func!='undefined')
			{
				func(calendarId);
			}
		});
	};

	this.deleteCalendar = function(calendarId,func)
	{
		var request=gapi.client.calendar.calendars.delete({
			'calendarId':calendarId
		});

		request.execute(function(resp)
		{
		  	//console.log(resp);
			if(typeof func!='undefined')
			{
				func();
			}
		});
	};

	this.createCalendar = function(func)
	{
		var request=gapi.client.calendar.calendars.insert({
			//'id':settings.calendarId,
			  'summary':settings.calendarName,
			  'timeZone':'Asia/Kolkata'
		});

		request.execute(function(resp)
		{
		  	console.log(resp);
			if(typeof func!='undefined')
			{
				func(resp.id);
			}
		});
	};

	this.createContacts = function(calId)
	{
		var batch = gapi.client.newBatch();

		settings.contacts.forEach(function(contact)
		{
			var event = {
			  'summary': ev.title,
			  'description': ev.notes,
			  'end': {
				'dateTime': vTime.datetime({resultFormat:'yyyy-mm-ddThh:mm:ss',time:ev.end}),
				'timeZone': 'Asia/Kolkata'
			  },
			  'start': {
				'dateTime': vTime.datetime({resultFormat:'yyyy-mm-ddThh:mm:ss',time:ev.start}),
				'timeZone': 'Asia/Kolkata'
			  },
				'gadget':{
					'display':'chip',
					'link':settings.link,
					'title':'Vyavsaay',
					'iconLink':'https://vyavsaay.com/favicon.ico'
				},
				'id':ev.id
			};

			var new_contact = gdata.contacts.data.ContactEntry();
			new_contact.full_name=contact.name;
			new_contact.email.append(gdata.data.Email({address:contact.email,rel:gdata.data.WORK_REL,primary:'true'});
			new_contact.phone_number.append(gdata.data.PhoneNumber({text:contact.phone,rel:gdata.data.WORK_REL,primary:'true'});

			batch.add(new_contact);
		});

		if(settings.events.length>0)
		{
			batch.execute(function(resp) {
			  	console.log(resp);
				settings.act(resp);
			});
		}else{
			settings.act();
		}
	};

	var operations={batchEvents:this.batchEvents,
					listCalendars:this.listCalendars,
				   createCalendar:this.createCalendar,
				   deleteCalendar:this.deleteCalendar,
				   createContacts:this.createContacts};
};
