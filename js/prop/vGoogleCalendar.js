/**
 * vGCal
 * Author: Ashish Goyal
 * Copyright: Copyright 2016 | Vyavsaay ERP
 */

var vGCal = function (options) 
{	
	var defaults={client_id:get_session_var('googleClientId'),
				 scopes:["https://www.googleapis.com/auth/calendar"],
				 act:function(response){console.log(response);},
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
		{client_id: settings.client_id, scope: settings.scopes.join(' '),immediate:false},
		function (authResult)
		{
			if (authResult && !authResult.error) 
			{
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
			operations.deleteCalendar(calendarId,function()
			{
				operations.createCalendar(function(calId)
				{
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
		  	//console.log(resp);
			if(typeof func!='undefined')
			{
				func(resp.id);
			}
		});
	};

	this.insertEvents = function(calId)
	{
		var batch = gapi.client.newBatch();
		
		settings.events.forEach(function(ev)
		{
			var event = {
			  'summary': ev.title,
			  'description': ev.notes,
			  'end': {
				'dateTime': get_iso_time_tz(ev.end),
				'timeZone': 'Asia/Kolkata'
			  },
			  'start': {
				'dateTime': get_iso_time_tz(ev.start),
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

			var request = gapi.client.calendar.events.insert({
			  'calendarId': calId,
			  'resource': event
			});

			batch.add(request);
		});
		
		batch.execute(function(resp) {
		  	//console.log(resp);
			settings.act(resp);
		});		
	};
	
	var operations={batchEvents:this.batchEvents,
					listCalendars:this.listCalendars,
				   createCalendar:this.createCalendar,
				   deleteCalendar:this.deleteCalendar,
				   insertEvents:this.insertEvents};
};