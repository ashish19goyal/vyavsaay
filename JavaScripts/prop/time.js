function get_raw_time(date)
{
	if(date=='')
	{
		return "";
	}
	else
	{
		var day=parseInt(date.substr(0,2));
		var month=parseInt(date.substr(3,2))-1;
		var year=parseInt(date.substr(6,4));
		var hour=0;
		var minutes=0;
		if(date.substr(11,2)!="" && date.substr(11,2)!=null)
		{
			hour=parseInt(date.substr(11,2));
		}
		if(date.substr(14,2)!="" && date.substr(14,2)!=null)
		{	
			minutes=parseInt(date.substr(14,2));
		}
		var d=new Date(year,month,day,hour,minutes,0,0);
		return d.getTime();
	}
}

function get_raw_time_24h()
{
	var d=new Date();
	var yesterday=parseFloat(d.getTime())-86400000;
	return yesterday;
}

function get_time_from_formatted_date(formatted_date)
{
	if(date=='')
	{
		return "";
	}
	else
	{
		var day=parseInt(date.substr(0,2));
		var month=parseInt(date.substr(3,2))-1;
		var current_date=new Date();
		var year=current_date.getFullYear();
		var d=new Date(year,month,day,0,0,0,0);
		return d.getTime();
	} 
}

function get_formatted_time(my_time)
{
	var d=new Date(parseFloat(my_time));
	
	var month = new Array();
		month[0] = "Jan";
		month[1] = "Feb";
		month[2] = "Mar";
		month[3] = "Apr";
		month[4] = "May";
		month[5] = "Jun";
		month[6] = "Jul";
		month[7] = "Aug";
		month[8] = "Sep";
		month[9] = "Oct";
		month[10] = "Nov";
		month[11] = "Dec";
	
	var mon = month[d.getMonth()]; 
	//var year = d.getFullYear();
	var date = d.getDate();	
	var hr = d.getHours();
	if(hr<10)
		hr="0"+hr;
	var min = d.getMinutes();
	if(min<10)
		min="0"+min;
	var time=date+" "+mon+", "+hr+":"+min;
	return time;

}

function get_my_time()
{
	var d=new Date();
	var seconds=d.getTime();
	seconds=seconds;
	return seconds;
}

function get_my_date()
{
	var d= new Date();
	var year = d.getFullYear();
	var month =d.getMonth()+1;
	if (month < 10) {
	    month = "0" + month;
	}
	var date = d.getDate();
	if (date < 10) {
	    date = "0" + date;
	}

	var time=date+"/"+month+"/"+year;
	return time;
}

function get_my_past_date(raw_time)
{
	if(raw_time=='')
	{
		return "";
	}
	else
	{
		var d= new Date(parseFloat(raw_time));
		var year = d.getFullYear();
		var month =d.getMonth()+1;
		if (month < 10) {
		    month = "0" + month;
		}
		var date = d.getDate();
		if (date < 10) {
		    date = "0" + date;
		}
	
		var time=date+"/"+month+"/"+year;
		return time;
	}
}

function get_my_datetime(raw_time)
{
	if(raw_time=='')
	{
		return "";
	}
	else
	{
		var d= new Date(parseFloat(raw_time));
		var year = d.getFullYear();
		var month =d.getMonth()+1;
		if (month < 10) {
		    month = "0" + month;
		}
		var date = d.getDate();
		if (date < 10) {
		    date = "0" + date;
		}
		var hour=d.getHours();
		if (hour < 10) {
		    hour = "0" + hour;
		}
		var minutes=d.getMinutes();
		if (minutes < 10) {
		    minutes = "0" + minutes;
		}	
		var time=date+"/"+month+"/"+year+" "+hour+":"+minutes;
		return time;
	}
}


function get_iso_date(raw_time)
{
	var d= new Date(parseInt(raw_time));
	var year = d.getFullYear();
	var month =d.getMonth()+1;
	if (month < 10) {
	    month = "0" + month;
	}
	var date = d.getDate();
	if (date < 10) {
	    date = "0" + date;
	}

	var time=year+"-"+month+"-"+date;
	return time;
}

function get_iso_time(raw_time)
{
	var d= new Date(parseInt(raw_time));
	var year = d.getFullYear();
	var month =d.getMonth()+1;
	if (month < 10) {
	    month = "0" + month;
	}
	var date = d.getDate();
	if (date < 10) {
	    date = "0" + date;
	}
	var hr = d.getHours();
	if(hr<10)
		hr="0"+hr;
	var min = d.getMinutes();
	if(min<10)
		min="0"+min;
	var seconds=d.getSeconds();
	if(seconds<10)
		seconds="0"+seconds;
		
	var time=year+"-"+month+"-"+date+"T"+hr+":"+min+":"+seconds+"Z";
	return time;
}


function get_my_date_from_iso(iso_date)
{
	if(iso_date=='')
	{
		return "01/01/1970";
	}
	else
	{
		var year=iso_date.substr(0,4);
		var month=iso_date.substr(5,2);
		var day=iso_date.substr(8,2);
		var my_date=day+"/"+month+"/"+year;
		return my_date;
	}
}