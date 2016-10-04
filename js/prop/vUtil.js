/**
 * vUtil
 * Author: Ashish Goyal
 * Copyright: Copyright 2016 | Vyavsaay ERP
 */
var vUtil = function (options)
{
	var defaults={};
	var settings = $.extend(defaults, options || {});

    //returns an index from an array
    this.fetch_index=function (array,index)
    {
        if(array[index])
        {
            return array[index];
        }
        else
        {
            return "";
        }
    };

	//check if an element is null or blank
    this.isBlank=function(variable)
    {
		if(variable=="" || variable==null || variable=="null" || variable=='undefined')
		{
           return true;
	    }
        return false;
    };

	//executes a function if it is set
	this.execute=function(func)
    {
        if(typeof func!='undefined')
           func();
    };

	//parses a json string to get a js object/array
	this.jsonParse = function(markers)
	{
		var markers_array=[];
		if(markers!="" && markers!='undefined' && markers!=null && markers!=0)
		{
			try
			{
				markers_array=JSON.parse(markers);
			}
			catch (ee)
			{
				return [];
			}
		}
		return markers_array;
	};

	//converts an object into an array
    this.objectToArray=function (obj)
    {
        var column = [];
        for(var i in obj)
        {
            column.push(obj[i]);
        }
        return column;
    };

    //extracts a single column from a multidimensional array
    this.arrayColumn=function (array, col_name)
    {
        var column = [];
        for(var i=0; i<array.length; i++)
        {
            column.push(array[i][col_name]);
        }
        return column;
    };

	//extracts a single column from a multidimensional array and returns as an object
    this.keyedArrayColumn=function (array, key, col_name)
    {
        var column = {};
        for(var i=0; i<array.length; i++)
        {
            column[array[i][key]]=array[i][col_name];
        }
        return column;
    };

	//get an array with unique values only
	this.arrayUnique = function(array)
    {
        return array.filter(function(el,index,arr)
        {
            return index===arr.indexOf(el);
        });
    };

	this.round = function(number,decimal)
	{
		if(!decimal)
		{
			return Math.round(number);
		}

		if(this.isBlank(number))
		{
			number=0;
		}

		var multiplier=1;
		for(var i=0;i<decimal;i++)
		{
			multiplier*=10;
		}
		var result=(Math.round(number*multiplier))/multiplier;
		return result;
	};

	this.newKey = function()
	{
		var d=new Date();
		return d.getTime();
	}

	this.uniqueNewKey = function()
	{
		var d=new Date();
		var key = d.getTime()+""+parseInt(Math.random()*1000);
		return key;
	}

    this.resize_picture=function (picture_tag,pic_width)
    {
        var tempW = picture_tag.width;
        var tempH = picture_tag.height;
        if (tempW > tempH)
        {
            if (tempW > pic_width)
            {
               tempH *= pic_width / tempW;
               tempW = pic_width;
            }
        }

        var canvas = document.createElement('canvas');
        canvas.width = tempW;
        canvas.height = tempH;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(picture_tag, 0, 0, tempW, tempH);
        var dataURL = canvas.toDataURL("image/jpeg");
        picture_tag.setAttribute("src", dataURL);
    };

    this.CSVToArray = function (strData)
    {
        strData = strData.replace(/[^a-z0-9A-Z<>\t\n \!\@\$\%\^\&\*\(\)\_\+\-\=\{\}\[\]\|\\\:\;\"\'\?\/\>\.\<\,]/g,'');
        strData = strData.replace(/â/g,'');

        var strDelimiter = ",";

        // Create a regular expression to parse the CSV values.
        var objPattern = new RegExp((
        // Delimiters.
        "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
        // Quoted fields.
        "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
        // Standard fields.
        "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
        // Create an array to hold our data. Give the array
        // a default empty first row.
        var arrData = [[]];
        // Create an array to hold our individual pattern
        // matching groups.
        var arrMatches = null;
        // Keep looping over the regular expression matches
        // until we can no longer find a match.
        while (arrMatches = objPattern.exec(strData)) {
            // Get the delimiter that was found.
            var strMatchedDelimiter = arrMatches[1];
            // Check to see if the given delimiter has a length
            // (is not the start of string) and if it matches
            // field delimiter. If id does not, then we know
            // that this delimiter is a row delimiter.
            if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
                // Since we have reached a new row of data,
                // add an empty row to our data array.
                arrData.push([]);
            }
            // Now that we have our delimiter out of the way,
            // let's check to see which kind of value we
            // captured (quoted or unquoted).
            if (arrMatches[2]) {
                // We found a quoted value. When we capture
                // this value, unescape any double quotes.
                var strMatchedValue = arrMatches[2].replace(
                new RegExp("\"\"", "g"), "\"");
            } else {
                // We found a non-quoted value.
                var strMatchedValue = arrMatches[3];
            }
            // Now that we have our value string, let's add
            // it to the data array.
			strMatchedValue = strMatchedValue.replace(/^"(.*)"$/, '$1');
            arrData[arrData.length - 1].push(strMatchedValue);
        }

        var objArray = [];
        for (var i = 1; i < arrData.length; i++)
        {
            objArray[i - 1] = {};
            for (var k = 0; k < arrData[0].length && k < arrData[i].length; k++)
            {
                var key = arrData[0][k];
                objArray[i - 1][key] = arrData[i][k];
            }
        }

        console.log(objArray);
        return (objArray);
    };


    /**
     * This function converts a csv string into array of named objects
     * @param csvString CSV String to be converted
     * @returns {Array} Array of objects
     */
    this.csv2array = function (csvString)
    {
        csvString = csvString.replace(/[^a-z0-9A-Z<>\t\n \!\@\$\%\^\&\*\(\)\_\+\-\=\{\}\[\]\|\\\:\;\"\'\?\/\>\.\<\,]/g,'');
        csvString = csvString.replace(/â/g,'');

        var rows=csvString.split("\n");
        var results=[];

        for(var x=0;x<rows.length;x++)
        {
            var dquotes=rows[x].match(/"/g);
            if(dquotes!=null && dquotes.length===1)
            {
                for(var y=x+1;y<rows.length;y++)
                {
                    rows[x]+="\n"+rows[y];
                    var second_dquotes=rows[y].match(/"/g);
                    rows.splice(y,1);
                    y-=1;
                    if(second_dquotes!=null && second_dquotes.length===1)
                    {
                        break;
                    }
                }
            }
        }

        var header_cols=rows[0].split(',');
		for(var i in header_cols)
        {
			header_cols[i] = header_cols[i].replace(/^"(.*)"$/, '$1');
		}

        for(var i=1;i<rows.length;i++)
        {
            if(rows[i]!="")
            {
                var columns=rows[i].split(',');
                var col_result=new Object();

                for(var j=0;j<columns.length;j++)
                {
                    var dquotes=columns[j].match(/"/g);
                    if(dquotes!=null && dquotes.length===1)
                    {
                        for(var k=j+1;k<columns.length;k++)
                        {
                            columns[j]+=","+columns[k];
                            var second_dquotes=columns[k].match(/"/g);
                            columns.splice(k,1);
                            k-=1;
                            if(second_dquotes!=null && second_dquotes.length===1)
                            {
                                break;
                            }
                        }
                        columns[j]=columns[j].replace(/^\"/, "");
                        columns[j]=columns[j].replace(/\"$/, "");
                    }
                    columns[j]=columns[j].replace(/&/g, "and");
                    columns[j]=columns[j].replace(/^\"+|\"+$/gm,'');
                    if(header_cols[j]=='id')
                    {
                        columns[j]=columns[j].replace(/'/gm,'');
                    }
                    col_result[header_cols[j]]=columns[j];
                }
                results.push(col_result);
            }
        }
        return results;
    };


	this.onChange = function(element,func)
	{
		$(element).off('blur');
		$(element).off('change');
		//$(element).off('input');

		$(element).on('blur change',function()
		{
			if(!vUtil.isBlank(func))
			{
				func();
			}
		});
	};

	this.dropdownHover = function(element,func)
	{
		if(!element.data['dropdownHover'])
		{
			$(element).parent().addClass('dropdown');
			$(element).addClass('dropdown-toggle');
			$(element).attr('data-toggle','dropdown');
			$(element).attr('data-hover','dropdown');

			var ul=document.createElement('div');
			$(ul).addClass('dropdown-menu');
			$(ul).attr('style','padding:2px;line-height:25px;background-color:#eee');
			$(element).parent().append(ul);

			$(element).dropdownHover();

			$(element).on('mouseover',function()
			{
				$(ul).html("Loading...");
				if(!vUtil.isBlank(func))
				{
					func(function(html)
					{
						$(ul).html(html);
					});
				}
			});

			element.data['dropdownHover']='yes';
		}
	};

	this.fileToDataUrl = function(file,func)
	{
		var reader = new FileReader();
		reader.onloadend=function()
		{
	        var dataURL = reader.result;
	        func(dataURL);
		};
		reader.readAsDataURL(file);
	}

	this.getCredentials = function()
	{
		return {
			domain:get_domain(),
			username:get_username(),
			cr:get_session_var('cr'),
			up:get_session_var('up'),
			re:get_session_var('re'),
			del:get_session_var('del'),
		};
	}

	/*
	*	Converts a one dimensional array to CSV file with just the header row
	*/
	this.arrayToCSV = function (data_array,filename)
    {
		if(vUtil.isBlank(filename)){
			filename='import template';
		}
        var csvString = data_array.join(",");

        var a = document.createElement('a');
        var type = 'text/csv;';
        var blob = new Blob([csvString], { type: type });
        var URL = window.URL || window.webkitURL;
        var downloadUrl = URL.createObjectURL(blob);

        a.setAttribute('href',downloadUrl);
        a.download = filename+".csv";
        a.target = '_blank';

        document.body.appendChild(a);
        a.click();
    };

	/**
     * Converts an array of objects into a csv string
     */
    this.objArrayToCSVString = function (data_array)
    {
        var csvRows = [];

        ///for header row
        var header_string="";
        var header_array=[];
        for(var p in data_array[0])
        {
            header_array.push(p);
            header_string+=p+",";
        }

        csvRows.push(header_string);

        /////for data rows
        data_array.forEach(function(data_row)
        {
            //console.log(data_row);
            var data_string="";
            for(var i=0;i<header_array.length;i++)
            {
                //if(!vUtil.isBlank(data_row[header_array[i]]))
				if(data_row[header_array[i]]!="undefined" && data_row[header_array[i]]!="null" && (typeof data_row[header_array[i]]!='undefined'))
				{
					if(header_array[i]=='id')
                    {
                        data_string+="`"+data_row[header_array[i]]+",";
                    }
                    else
                    {
						if(isNaN(data_row[header_array[i]]))
						{
							if(data_row[header_array[i]].indexOf('"')>-1)
	                        {
	                            data_row[header_array[i]]=data_row[header_array[i]].replace(/\"/g, '\"\"');
	                        }
	                        if(data_row[header_array[i]].indexOf(",")>-1)
	                        {
	                            data_row[header_array[i]]="\""+data_row[header_array[i]]+"\"";
	                        }
						}

                        data_string+=data_row[header_array[i]]+",";
                    }
                }
                else
                {
                    data_string+=",";
                }
            }
            csvRows.push(data_string);
        });

        var csvString = csvRows.join("\n");
        return csvString;
    }


	/**
     * Converts an array of objects into a csv file
     */
    this.objArrayToCSV = function (data_array,file_name)
    {
        var csvString = this.objArrayToCSVString(data_array);
        var a = document.createElement('a');

        var type = 'text/csv;';
        var blob = new Blob([csvString], { type: type });
        var URL = window.URL || window.webkitURL;
        var downloadUrl = URL.createObjectURL(blob);

        a.setAttribute('href',downloadUrl);
        a.download = file_name+'.csv';
        a.target = '_blank';

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

};
vUtil=new vUtil();

	function get_new_key()
	{
		var d=new Date();
		var seconds=d.getTime();
		//seconds=(seconds*1000)+Math.floor(Math.random()*1000);
		return seconds;
	}

    function htmlentities(str)
    {
        return String(str).replace(/&/g,'&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function revert_htmlentities(str)
    {
        return String(str).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
    }
