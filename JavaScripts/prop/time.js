function get_raw_time(date)
{
	if(date=='')
	{
		var d=new Date();
		return d.getTime();
	}
	else
	{
		var day=parseInt(date.substr(0,2));
		var month=parseInt(date.substr(3,2))-1;
		var year=parseInt(date.substr(6,4));
		var d=new Date(year,month,day,0,0,0,0);
		return d.getTime();
	}
}

function get_formatted_time(my_time)
{
	var d=new Date(parseInt(my_time));
	
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

	var time=date+"/"+month+"/"+year;
	return time;
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