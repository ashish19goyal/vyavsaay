/**
 * vImport
 * Author: Ashish Goyal
 * Copyright: Copyright 2016 | Vyavsaay ERP
 */
var vImport = function (options)
{
	var defaults={};
	var settings = $.extend(defaults, options || {});

	//valdiates the import data as per the provided argument
	this.validate = function(data_array,vt)
	{
		var error_array=new Object();
		error_array.status='success';
		error_array.logs=[];
		//console.log(vt);
		var row_count=1;
		data_array.forEach(function(data_row)
		{
			// console.log(data_row);
			row_count+=1;
			for (var a=0;a<vt.length;a++)
			{
				if(data_row[vt[a].column]=='undefined')
				{
					error_array.logs.push({row:row_count,column:vt[a].column,error:"Undefined",data:''});
					error_array.status='error';
				}
				else if((typeof vt[a].required!='undefined') && vt[a].required=='yes' && (data_row[vt[a].column]=="" || data_row[vt[a].column]=='null'))
				{
					error_array.logs.push({row:row_count,column:vt[a].column,error:"Blank",data:''});
					error_array.status='error';
				}
				else if(data_row[vt[a].column]!="")
				{
					vImport.validateRegex(vt[a],data_row,error_array);
					vImport.validateList(vt[a],data_row,error_array);
					vImport.validateAntiList(vt[a],data_row,error_array);
				}
			}
		});
		return error_array;
	};

	//this function validates the regex match
	this.validateRegex = function(column,data_row,error_array)
	{
		if(typeof column.regex!='undefined')
		{
			var test_result=column.regex.test(data_row[column.column]);
			if(!test_result)
			{
				error_array.logs.push({row:row_count,column:column.column,error:"Format Mismatch",data:data_row[column.column]});
				error_array.status='error';
			}
		}
	};

	//this function validates that the provided list should be matched
	this.validateList = function(column,data_row,error_array)
	{
		if((typeof column.list!='undefined') && $.inArray(data_row[column.column],column.list)==-1)
		{
			var list_string="";
			if(column.list.length<10)
			{
				list_string=" - ";
				for(var x in column.list)
				{
					list_string+=column.list[x]+";";
				}
			}
			error_array.logs.push({row:row_count,column:column.column,error:"Data doesn't match system list"+list_string,data:data_row[column.column]});
			error_array.status='error';
		}
	};

	//this function validates that the provided list should not be matched, i.e, avoids duplicate entries.
	this.validateAntiList = function(column,data_row,error_array)
	{
		if((typeof column.anti_list!='undefined') && $.inArray(data_row[column.column],column.anti_list)!=-1)
		{
			var list_string="";
			if(column.anti_list.length<10)
			{
				list_string=" - ";
				for(var x in column.anti_list)
				{
					list_string+=column.anti_list[x]+";";
				}
			}
			error_array.logs.push({row:row_count,column:column.column,error:"Duplicate Data - "+list_string,data:data_row[column.column]});
			error_array.status='error';
		}
	};

};
vImport=new vImport();
