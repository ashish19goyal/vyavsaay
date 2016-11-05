/**
 * vMSCal
 * Author: Ashish Goyal
 * Copyright: Copyright 2016 | Vyavsaay ERP
 */

var vMSCal = function (options)
{
	var defaults={client_id:get_session_var('outlookClientId'),
				scopes:["https://outlook.office.com/calendars.readwrite"],
				act:function(response){console.log(response);},
				action:'batchEvents'};

	var settings = $.extend(defaults, options || {});

	this.checkAuth = function (event)
	{
		var authContext = new O365Auth.Context();
		authContext.getIdToken("https://outlook.office365.com/").then((function (token)
		{
		   var authToken = token;
			console.log(authToken);
			var outlookClient = new Microsoft.OutlookServices.Client('https://outlook.office365.com/api/v1.0', authToken.getAccessTokenFn('https://outlook.office365.com'));
			console.log(outlookClient);

		}).bind(this), function (reason)
		{
		   console.log('Failed to login. Error = ' + reason.message);
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
