/**
 * vGCal
 * Author: Ashish Goyal
 * Copyright: Copyright 2016 | Vyavsaay ERP
 */

var vGCal = function (options) 
{	
	var defaults={client_id:'259342250392-4r2mfdinc03t6rpc03bdujjglnjrq2qj.apps.googleusercontent.com',
				 scopes:["https://www.googleapis.com/auth/calendar"],
				 act:function(response){console.log(response);},
				 action:'listUpcomingEvents'};
	
	var settings = $.extend(defaults, options || {});
		

	/**
	* Check if current user has authorized this application.
	*/
	this.immediateCheckAuth = function() {
		gapi.auth.authorize({
			'client_id': settings.client_id,
			'scope': settings.scopes.join(' '),
			'immediate': true
	  	}, this.handleAuthResult);
	};
	
	/**
	* Initiate auth flow in response to user clicking authorize button.
	*
	* @param {Event} event Button click event.
	*/
	this.checkAuth = function (event) {
		gapi.auth.authorize({
			client_id: settings.client_id, scope: settings.scopes,immediate:false},this.handleAuthResult);
		return false;
	};

	/**
	* Handle response from authorization server.
	*
	* @param {Object} authResult Authorization result.
	*/
	this.handleAuthResult = function (authResult) {
		if (authResult && !authResult.error) {
			gapi.client.load('calendar', 'v3', this[settings.action]);
	  	}
  	};

	/**
	* Print the summary and start datetime/date of the next ten events in
	* the authorized user's calendar. If no events are found an
	* appropriate message is printed.
	*/
	this.listUpcomingEvents = function() {
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
};