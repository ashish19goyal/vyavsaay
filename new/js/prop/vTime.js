/**
 * vTime
 * Author: Ashish Goyal
 * Description: this library provides various time and date manipulations
 * Copyright: Copyright 2016 | Vyavsaay ERP
 */
var vTime = function ()
{
	  //returns an unix timestamp in milliseconds
    this.unix=function (opts)
    {
      var defs={date:'today',inputFormat:'dd/mm/yyyy hh:mm:ss'};
    	var sets = $.extend(defs, opts || {});

      if(sets.date=='' || sets.date==null || sets.date==0 || sets.date=='null')
      {
        return '';
      }

      var d=new Date();
      if(sets.date=='today')
      {
        return d.getTime();
      }

      switch(sets.inputFormat)
      {
        case 'dd/mm/yyyy hh:mm:ss':
                var date_time_array=String(sets.date).split(/ /);
                var date_elem=date_time_array[0];
                var date_array=date_elem.split(/[\-\/]+/);

                var day=1;
                var month=0;
                var year=2016;
                if(date_array.length==3)
                {
                  day=parseInt(date_array[0]);
                  month=parseInt(date_array[1])-1;
                  year=parseInt(date_array[2]);
                }
                else if(date_array.length==2)
                {
                  month=parseInt(date_array[0])-1;
                  year=parseInt(date_array[1]);
                }
                else if(date_array.length==1)
                {
                  year=parseInt(date_array[0]);
                }

                if(year<50)
                {
                    year=2000+year;
                }
                else if(year>50 && year<100)
                {
                    year=1900+year;
                }

                var hour=0;
                var minutes=0;
                var seconds=0;

                if(date_time_array.length==2)
                {
                  var time_elem=date_time_array[1];
                  var time_array=time_elem.split(/:/);
                  if(time_array.length==1)
                  {
                    hour=parseInt(time_array[0]);
                  }
                  else if(time_array.length==2)
                  {
                    hour=parseInt(time_array[0]);
                    minutes=parseInt(time_array[1]);
                  }
                  else if(time_array.length==3)
                  {
                    hour=parseInt(time_array[0]);
                    minutes=parseInt(time_array[1]);
                    seconds=parseInt(time_array[2]);
                  }
                }
                d=new Date(year,month,day,hour,minutes,seconds,0);
            		break;
        case 'mm/dd/yyyy hh:mm:ss AM':
                var date_time_array=String(sets.date).split(/ /);
                var date_elem=date_time_array[0];
                var date_array=date_elem.split(/[\-\/]+/);

                var day=parseInt(date_array[1]);
                var month=parseInt(date_array[0])-1;
                var year=parseInt(date_array[2]);

                if(year<50)
                {
                    year=2000+year;
                }
                else if(year>50 && year<100)
                {
                    year=1900+year;
                }

                var hour=0;
                var minutes=0;
                var seconds=0;

                if(date_time_array.length==2)
                {
                  var time_elem=date_time_array[1];
                  var time_array=time_elem.split(/:/);

                  hour=parseInt(time_array[0]);
                  minutes=parseInt(time_array[1]);
                  seconds=parseInt(time_array[2]);
                }
                d=new Date(year,month,day,hour,minutes,seconds,0);
            	break;
      }

      return d.getTime();
    };

    //returns date based on passed arguments
    this.date = function(opts)
    {
      var defs={time:Date.now(),inputFormat:'unix',resultFormat:'dd/mm/yyyy',addDays:0};
      var sets = $.extend(defs, opts || {});

      if(sets.time=='' || sets.time==null || sets.time=='null' || sets.time==0)
      {
        return "";
      }

      sets.time=parseFloat(sets.time)+parseFloat(sets.addDays)*86400000;

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
        case 'dd/mm/yyyy':return date+"/"+month+"/"+year;
        case 'mm/dd/yyyy':return month+"/"+date+"/"+year;
        case 'dd-mm-yyyy':return date+"-"+month+"-"+year;
        case 'mm-dd-yyyy':return month+"-"+date+"-"+year;
      }
    };

    //returns date with time based on passed arguments
    this.datetime = function(opts)
    {
      var defs={time:Date.now(),inputFormat:'unix',resultFormat:'dd/mm/yyyy hh:mm',addDays:0};
      var sets = $.extend(defs, opts || {});

      if(sets.time=='' || sets.time==null || sets.time=='null' || sets.time==0)
      {
        return "";
      }

      sets.time=parseFloat(sets.time)+parseFloat(sets.addDays)*86400000;

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
        case 'dd/mm/yyyy hh:mm':return date+"/"+month+"/"+year+" "+hour+":"+minutes;
        case 'mm/dd/yyyy hh:mm':return month+"/"+date+"/"+year+" "+hour+":"+minutes;
        case 'dd-mm-yyyy hh:mm':return date+"-"+month+"-"+year+" "+hour+":"+minutes;
        case 'mm-dd-yyyy hh:mm':return month+"-"+date+"-"+year+" "+hour+":"+minutes;
      }
    };

    //returns only time based on passed arguments
    this.time = function(opts)
    {
        var defs={time:Date.now(),inputFormat:'unix',resultFormat:'hh:mm'};
        var sets = $.extend(defs, opts || {});

        if(sets.time=='' || sets.time==null || sets.time=='null' || sets.time==0)
        {
          return "";
        }

        var inputDate=new Date(parseFloat(sets.time));
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
          case 'hh:mm':return hour+":"+minutes;
        }
    };

    //return array of dates matching the criteria, for the last 100 years
    this.anniversaryDates = function(opts)
    {
      var defs={time:Date.now(),inputFormat:'unix',resultFormat:'dd/mm/yyyy'};
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
        case 'dd/mm/yyyy':break;
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

    /**
    *   This function returns the month of the specified date
    */
    this.month=function (opts)
    {
        var defs={date:'today',inputFormat:'dd/mm/yyyy'};
    	var sets = $.extend(defs, opts || {});

        if(sets.date=='' || sets.date==null || sets.date==0 || sets.date=='null')
        {
            return '';
        }

        var d=new Date();
        if(sets.date=='today')
        {
            return d.getMonth()+1;
        }

        switch(sets.inputFormat)
        {
            case 'dd/mm/yyyy':
                var date_time_array=String(sets.date).split(/ /);
                var date_elem=date_time_array[0];
                var date_array=date_elem.split(/[\-\/]+/);
                return parseInt(date_array[1]);

            case 'mm/dd/yyyy':
                var date_time_array=String(sets.date).split(/ /);
                var date_elem=date_time_array[0];
                var date_array=date_elem.split(/[\-\/]+/);
                return parseInt(date_array[0]);

            case 'unix':
                d=new Date(parseFloat(sets.time));
        }

      return d.getMonth()+1;
    };

    /**
    *   This function returns the quarter of the specified date
    */
    this.quarter=function (opts)
    {
        var quarter = parseInt(((this.month(opts)-1)/3)+1);
        return quarter;
    };
};
vTime=new vTime();
