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
				 action:'listUpcomingEvents',
				 params:{}};
	
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
		});
		//return false;
	};

	/**
	* Print the summary and start datetime/date of the next ten events in
	* the authorized user's calendar. If no events are found an
	* appropriate message is printed.
	*/
	this.listUpcomingEvents = function() 
	{
		var request = gapi.client.calendar.events.list({
			'calendarId': 'primary',
			'timeMin': (new Date()).toISOString(),
			'showDeleted': false,
			'singleEvents': true,
			'maxResults': 10,
			'orderBy': 'startTime'
		});

		request.execute(function(resp) {
	  		settings.act(resp);
		});
	};
	
	this.putEvent = function()
	{
		var event = {
		  'summary': settings.params['title'],
		  'description': settings.params['description'],
		  'end': {
			'dateTime': get_iso_time_tz(settings.params['end']),
			'timeZone': 'Asia/Kolkata'
		  },
		  'start': {
			'dateTime': get_iso_time_tz(settings.params['start']),
			'timeZone': 'Asia/Kolkata'
		  },
		  	'gadget':{
				'display':'chip',
				'link':settings.params['link'],
				'title':'Vyavsaay',
				'iconLink':'https://vyavsaay.com/favicon.ico'
			},
			'id':settings.params['eventId']
		};

		var request = gapi.client.calendar.events.insert({
		  'calendarId': 'primary',
		  //'eventId': settings.params['eventId'],	
		  'resource': event
		});

		request.execute(function(resp) {
		  settings.act(resp);
		});		
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
	
	var operations={listUpcomingEvents:this.listUpcomingEvents,
				   putEvent:this.putEvent,
				   batchEvents:this.batchEvents,
					listCalendars:this.listCalendars,
				   createCalendar:this.createCalendar,
				   deleteCalendar:this.deleteCalendar,
				   insertEvents:this.insertEvents};
};