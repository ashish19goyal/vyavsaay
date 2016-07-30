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
					if(typeof vt[a].regex!='undefined')
					{
						var test_result=vt[a].regex.test(data_row[vt[a].column]);
						if(!test_result)
						{
							error_array.logs.push({row:row_count,column:vt[a].column,error:"Format Mismatch",data:data_row[vt[a].column]});
							error_array.status='error';
						}
					}

					if((typeof vt[a].list!='undefined') && $.inArray(data_row[vt[a].column],vt[a].list)==-1)
					{
						var list_string="";

						if(vt[a].list.length<10)
						{
							list_string=" - ";
							for(var x in vt[a].list)
							{
								list_string+=vt[a].list[x]+";";
							}
						}
						error_array.logs.push({row:row_count,column:vt[a].column,error:"Data doesn't match system list"+list_string,data:data_row[vt[a].column]});
						error_array.status='error';
					}

					if((typeof vt[a].anti_list!='undefined') && $.inArray(data_row[vt[a].column],vt[a].anti_list)!=-1)
					{
						var list_string="";

						if(vt[a].list.length<10)
						{
							list_string=" - ";
							for(var x in vt[a].list)
							{
								list_string+=vt[a].list[x]+";";
							}
						}
						error_array.logs.push({row:row_count,column:vt[a].column,error:"Duplicate Data - "+list_string,data:data_row[vt[a].column]});
						error_array.status='error';
					}
				}
			}
		});
		return error_array;
	};

};
vImport=new vImport();
