/**
 * vTime
 * Author: Ashish Goyal
 * Description: this library provides various time and date manipulations
 * Copyright: Copyright 2016 | Vyavsaay ERP
 */
var vTime = function ()
{
	  //returns an unix timestamp in milliseconds
    this.unix=function ()
    {

    };

    //returns date based on passed arguments
    this.date = function(opts)
    {
      var defs={time:Date.now(),inputFormat:'unix',resultFormat:'mm/dd/yyyy'};
    	var sets = $.extend(defs, opts || {});

      if(sets.time=='' || sets.time==null || sets.time=='null' || sets.time==0)
      {
        return "";
      }

      var inputDate=new Date(parseFloat(sets.time));
      var year = inputDate.getFullYear();
      var month = inputDate.getMonth()+1;
      if (month < 10) {
          month = "0" + month;
      }
      var date = inputDate.getDate();
      if (date < 10) {
          date = "0" + date;
      }
      switch(sets.resultFormat)
      {
        case 'mm/dd/yyyy':return date+"/"+month+"/"+year;
        case 'dd/mm/yyyy':return month+"/"+date+"/"+year;
        case 'mm-dd-yyyy':return date+"-"+month+"-"+year;
        case 'dd-mm-yyyy':return month+"-"+date+"-"+year;
      }
    };

    //returns date with time based on passed arguments
    this.datetime = function(opts)
    {
      var defs={time:Date.now(),inputFormat:'unix',resultFormat:'mm/dd/yyyy hh:mm'};
    	var sets = $.extend(defs, opts || {});

      if(sets.time=='' || sets.time==null || sets.time=='null' || sets.time==0)
      {
        return "";
      }

      var inputDate=new Date(parseFloat(sets.time));
      var year = inputDate.getFullYear();
      var month = inputDate.getMonth()+1;
      if (month < 10) {
          month = "0" + month;
      }
      var date = inputDate.getDate();
      if (date < 10) {
          date = "0" + date;
      }
      var hour=inputDate.getHours();
  		if (hour < 10) {
  		    hour = "0" + hour;
  		}
  		var minutes=inputDate.getMinutes();
  		if (minutes < 10) {
  		    minutes = "0" + minutes;
  		}

      switch(sets.resultFormat)
      {
        case 'mm/dd/yyyy hh:mm':return date+"/"+month+"/"+year+" "+hour+":"+minutes;
        case 'dd/mm/yyyy hh:mm':return month+"/"+date+"/"+year+" "+hour+":"+minutes;
        case 'mm-dd-yyyy hh:mm':return date+"-"+month+"-"+year+" "+hour+":"+minutes;
        case 'dd-mm-yyyy hh:mm':return month+"-"+date+"-"+year+" "+hour+":"+minutes;
      }
    };

    //returns only time based on passed arguments
    this.time = function()
    {

    };

    //return array of dates matching the criteria, for the last 100 years
    this.anniversaryDates = function(opts)
    {
      var defs={time:Date.now(),inputFormat:'unix',resultFormat:'mm/dd/yyyy'};
    	var sets = $.extend(defs, opts || {});
      var results=[];

      var inputDate=new Date();
      var currentYear=inputDate.getFullYear();
      var centuryOld=currentYear-100;
      switch(sets.inputFormat)
      {
        case 'unix': inputDate=new Date(sets.time);
                    break;
      }

      switch(sets.resultFormat)
      {
        case 'mm/dd/yyyy':break;
        case 'all': for(var i=centuryOld;i<=currentYear;i++)
                    {
                      inputDate.setFullYear(i);
                      var timestamp=inputDate.getTime();
                      results.push(this.date({resultFormat:'mm/dd/yyyy',time:timestamp}));
                      results.push(this.date({resultFormat:'mm-dd-yyyy',time:timestamp}));
                      results.push(this.date({resultFormat:'dd/mm/yyyy',time:timestamp}));
                      results.push(this.date({resultFormat:'dd-mm-yyyy',time:timestamp}));
                    }
                    return results;
      }
    };
};
vTime=new vTime();
