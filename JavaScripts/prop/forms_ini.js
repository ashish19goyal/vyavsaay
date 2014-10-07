/**
  * this function prepares the table for update inventory form
 * @form Update Inventory
 * @formNo 1
 */
function form1_ini(fid)
{
	var filter_fields=document.getElementById('form1_header');
	
	var fname=filter_fields.elements[0].value;
	var fbatch=filter_fields.elements[1].value;
	var fexpiry=filter_fields.elements[2].value;
	
	var columns="<product_instances>" +
		"<id>"+fid+"</id>" +
		"<batch>"+fbatch+"</batch>" +
		"<product_name>"+fname+"</product_name>" +
		"<price></price>" +
		"<expiry>"+fexpiry+"</expiry>" +
		"<quantity></quantity>" +
		"</product_instances>";
	
	fetch_requested_data('form1',columns,function(results)
	{
		var rowsHTML="";
		for(var i in results)
		{
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form1_"+results[i].id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form1_"+results[i].id+"' value='"+results[i].product_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form1_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].batch+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form1_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+get_my_past_date(results[i].expiry)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form1_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].price+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form1_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].quantity+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form1_"+results[i].id+"' value='"+results[i].id+"'>";
						rowsHTML+="<img class='filter_icon' src='./images/save.jpeg' form='form1_"+results[i].id+"' value='Save' onclick='form1_save_item($(this));'>";
						rowsHTML+="<img class='filter_icon' src='./images/delete.jpeg' form='form1_"+results[i].id+"' value='Delete' onclick='form1_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		}
		//console.log(rowsHTML);
		$('#form1_body').html(rowsHTML);
	});
};


/**
 * this function prepares the table for manage assets form
 * @form Manage Assets
 * @formNo 5
 */
function form5_ini(fid)
{
	var filter_fields=document.getElementById('form5_header');
		
	var fasset=filter_fields.elements[0].value;
	var fowner=filter_fields.elements[1].value;
	var ftype=filter_fields.elements[2].value;
	
	var columns="<assets>" +
			"<id>"+fid+"</id>" +
			"<name>"+fasset+"</name>" +
			"<date_inc></date_inc>" +
			"<owner>"+fowner+"</owner>" +
			"<activity></activity>" +
			"<value></value>" +
			"<type>"+ftype+"</type>" +
			"</assets>";
	
	fetch_requested_data('form5',columns,function(results)
	{	
		var rowsHTML="";
		for(var i in results)
		{
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form5_"+results[i].id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form5_"+results[i].id+"' value='"+results[i].name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form5_"+results[i].id+"' value='"+get_my_past_date(results[i].date_inc)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form5_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].owner+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form5_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form5_"+results[i].id+"' value='"+results[i].value+"'>";
						rowsHTML+="<img class='filter_icon' src='./images/add.jpeg' form='form5_"+results[i].id+"' value='Save' onclick='modal9_action($(this));'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form5_"+results[i].id+"' value='"+results[i].activity+"'>";
						rowsHTML+="<img class='filter_icon' src='./images/add.jpeg' form='form5_"+results[i].id+"' value='Save' onclick='modal10_action($(this));'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form5_"+results[i].id+"' value='"+results[i].id+"'>";
						rowsHTML+="<img class='filter_icon' src='./images/save.jpeg' form='form5_"+results[i].id+"' value='Save' onclick='form5_save_item($(this));'>";
						rowsHTML+="<img class='filter_icon' src='./images/delete.jpeg' form='form5_"+results[i].id+"' value='Delete' onclick='form5_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		}
		//console.log(rowsHTML);
		$('#form5_body').html(rowsHTML);
	});
};



/**
 * this function prepares the table for attendance form
 * @form Attendance
 * @formNo 7
 */
function form7_ini(fid)
{
	var filter_fields=document.getElementById('form7_header');
	
	//populating form 
	var fstaff=filter_fields.elements[0].value;
	var fattendance=filter_fields.elements[1].value;
	var fdate=filter_fields.elements[2].value;
	
	var columns="<attendance>" +
			"<id>"+fid+"</id>" +
			"<date>"+fdate+"</date>" +
			"<acc_name>"+fstaff+"</acc_name>" +
			"<presence>"+fattendance+"</presence>" +
			"<hours_worked></hours_worked>" +
			"</attendance>";

	fetch_requested_data('form7',columns,function(results)
	{
		var rowsHTML="";

		for(var i in results)
		{
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form7_"+results[i].id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form7_"+results[i].id+"' value='"+results[i].acc_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form7_"+results[i].id+"' value='"+results[i].presence+"' ondblclick='set_editable($(this));'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form7_"+results[i].id+"' value='"+results[i].hours_worked+"' ondblclick='set_editable($(this));'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form7_"+results[i].id+"' value='"+results[i].id+"'>";
						rowsHTML+="<img class='filter_icon' src='./images/save.jpeg' form='form7_"+results[i].id+"' value='Save' onclick='form7_save_item($(this));'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		}
		//console.log(rowsHTML);
		$('#form7_body').html(rowsHTML);
	});
};



/**
 * this function prepares the table for manage staff form
 * @form Manage Staff
 * @formNo 8
 */
function form8_ini(fid)
{
	var filter_fields=document.getElementById('form8_header');
	
	var fname=filter_fields.elements[0].value;
	var fcontact=filter_fields.elements[1].value;
	var femail=filter_fields.elements[2].value;
	var fstatus=filter_fields.elements[3].value;
	
	var columns="<staff>" +
			"<id>"+fid+"</id>" +
			"<name>"+fname+"</name>" +
			"<phone>"+fcontact+"</phone>" +
			"<email>"+femail+"</email>" +
			"<status>"+fstatus+"</status>" +
			"<joining_date></joining_date>" +
			"<qualification></qualification>" +
			"<skills></skills>" +
			"<fixed_comp></fixed_comp>" +
			"<variable_comp_rate></variable_comp_rate>" +
			"<allowed_pto></allowed_pto>" +
			"<acc_name></acc_name>" +
			"</staff>";

	fetch_requested_data('form8',columns,function(results)
	{
		var rowsHTML="";
	
		results.forEach(function(result)
		{
			var address_data="<address>" +
					"<id></id>" +
					"<acc_name>"+result.acc_name+"</acc_name>" +
					"<address></address>" +
					"<street></street>" +
					"<city></city>" +
					"<state></state>" +
					"<country></country>" +
					"<acc_type>staff</acc_type>" +
					"</address>";
			var detail_string="Joined on "+result.joining_date+", Qualification: "+result.qualification+", Skills: "+result.skills+", Salary: Rs."+result.fixed_comp+"+ Rs."+result.variable_comp_rate+"/hour. Allowed "+result.allowed_pto+"/month.";

			fetch_requested_data('form8',address_data,function(add_results)
			{		
				var res_address,res_street,res_city,res_state,res_country,res_id;
				for (var j in add_results)
				{
					res_id=add_results[j].id;
					res_address=add_results[j].address;
					res_street=add_results[j].street;
					res_city=add_results[j].city;
					res_state=add_results[j].state;
					res_country=add_results[j].country;
				}
				rowsHTML+="<tr>";
					rowsHTML+="<form id='form8_"+result.id+"'></form>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='text' readonly='readonly' form='form8_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.name+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='text' readonly='readonly' form='form8_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.phone+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='text' readonly='readonly' form='form8_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.email+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='text' readonly='readonly' form='form8_"+result.id+"' value='"+res_address+", "+res_street+", "+res_city+", "+res_state+", "+res_country+"'>";
							rowsHTML+="<img class='filter_icon' form='form8_"+result.id+"' src='./images/edit.jpeg' onclick=\"modal16_action($(this),'staff',"+res_id+");\">";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='text' readonly='readonly' form='form8_"+result.id+"' value='"+detail_string+"'>";
							rowsHTML+="<img class='filter_icon' form='form8_"+result.id+"' src='./images/edit.jpeg' onclick='modal17_action($(this));'>";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='text' readonly='readonly' form='form8_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.status+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='hidden' form='form8_"+result.id+"' value='"+result.id+"'>";
							rowsHTML+="<img class='filter_icon' src='./images/save.jpeg' form='form8_"+result.id+"' value='Save' onclick='form8_save_item($(this));'>";
							rowsHTML+="<img class='filter_icon' src='./images/delete.jpeg' form='form8_"+result.id+"' value='Delete' onclick='form8_delete_item($(this));'>";	
						rowsHTML+="</td>";			
				rowsHTML+="</tr>";
			});
		});
		//console.log(rowsHTML);
		$('#form8_body').html(rowsHTML);
	});
};


/**
 * this function prepares the table for cash register form
 * @form Cash Register
 * @formNo 9
 */
function form9_ini(fid)
{
	var filter_fields=document.getElementById('form9_header');
	
	var ftype=filter_fields.elements[0].value;
	var fdate=filter_fields.elements[1].value;
	var ffrom=filter_fields.elements[2].value;
	var fto=filter_fields.elements[3].value;
	var fsystem=filter_fields.elements[4].value;
	
	var columns="<transactions>" +
			"<id>"+fid+"</id>" +
			"<trans_type>"+ftype+"</trans_type>" +
			"<trans_date>"+fdate+"</trans_date>" +
			"<amount></amount>" +
			"<debit_acc>"+ffrom+"</debit_acc>" +
			"<credit_acc>"+fto+"</credit_acc>" +
			"<system_generated>"+fsystem+"</system_generated>" +
			"</transactions>";

	fetch_requested_data('form9',columns,function(results)
	{
		var rowsHTML="";
		for(var i in results)
		{
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form9_"+results[i].id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form9_"+results[i].id+"' value='"+results[i].trans_type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form9_"+results[i].id+"' value='"+get_my_past_date(results[i].trans_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form9_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].amount+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form9_"+results[i].id+"' value='"+results[i].debit_acc+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form9_"+results[i].id+"' value='"+results[i].credit_acc+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form9_"+results[i].id+"' value='"+results[i].system_generated+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form9_"+results[i].id+"' value='"+results[i].id+"'>";
						rowsHTML+="<img class='filter_icon' src='./images/save.jpeg' form='form9_"+results[i].id+"' value='Save' onclick='form9_save_item($(this));'>";
						rowsHTML+="<img class='filter_icon' src='./images/delete.jpeg' form='form9_"+results[i].id+"' value='Delete' onclick='form9_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		}
		//console.log(rowsHTML);
		$('#form9_body').html(rowsHTML);
	});
};


/**
 * this function prepares the table for schedule payments form
 * @form Schedule Payments
 * @formNo 11
 */
function form11_ini(fid)
{
	var filter_fields=document.getElementById('form11_header');
	
	var ftrans=filter_fields.elements[0].value;
	var faccount=filter_fields.elements[1].value;
	var fdue=filter_fields.elements[2].value;
	var fdate=filter_fields.elements[3].value;
	var fstatus=filter_fields.elements[4].value;
	
	var columns="<payments>" +
			"<id>"+fid+"</id>" +
			"<type>debit</type>" +
			"<transaction_id>"+ftrans+"</transaction_id>" +
			"<amount></amount>" +
			"<acc_name>"+faccount+"</acc_name>" +
			"<due_date>"+fdue+"</due_date>" +
			"<status>"+fstatus+"</status>" +
			"<date>"+fdate+"</date>" +
			"</payments>";

	fetch_requested_data('form11',columns,function(results)
	{	
		var rowsHTML="";
	
		for(var i in results)
		{
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form11_"+results[i].id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form11_"+results[i].id+"' value='"+results[i].transaction_id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form11_"+results[i].id+"' value='"+results[i].acc_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form11_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].amount+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form11_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+get_my_past_date(results[i].due_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form11_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form11_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+get_my_past_date(results[i].date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form11_"+results[i].id+"' value='"+results[i].id+"'>";
						rowsHTML+="<img class='filter_icon' src='./images/save.jpeg' form='form11_"+results[i].id+"' value='Save' onclick='form11_save_item($(this));'>";
						rowsHTML+="<img class='filter_icon' src='./images/delete.jpeg' form='form11_"+results[i].id+"' value='Delete' onclick='form11_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		}
		//console.log(rowsHTML);
		$('#form11_body').html(rowsHTML);
	});
};


/**
 * this function prepares the table for manage tasks form
 * @form Manage Tasks
 * @formNo 14
 */
function form14_ini(fid)
{
	var filter_fields=document.getElementById('form14_header');
	
	//populating form 
	var ftype=filter_fields.elements[0].value;
	var fassignee=filter_fields.elements[1].value;
	var fdue=filter_fields.elements[2].value;
	var fexecuted=filter_fields.elements[3].value;
	var fstatus=filter_fields.elements[4].value;
	
	var columns="<task_instances>" +
			"<id>"+fid+"</id>" +
			"<name>"+ftype+"</name>" +
			"<description></description>" +
			"<assignee>"+fassignee+"</assignee>" +
			"<t_due>"+fdue+"</t_due>" +
			"<t_executed>"+fexecuted+"</t_executed>" +
			"<status>"+fstatus+"</status>" +
			"</task_instances>";

	fetch_requested_data('form14',columns,function(results)
	{
		var rowsHTML="";
	
		for(var i in results)
		{
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form14_"+results[i].id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form14_"+results[i].id+"' value='"+results[i].name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form14_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].description+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form14_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].assignee+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form14_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+get_my_past_date(results[i].t_due)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form14_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form14_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+get_my_past_date(results[i].t_executed)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' readonly='readonly' form='form14_"+results[i].id+"' value='"+results[i].id+"'>";
						rowsHTML+="<img class='filter_icon' src='./images/save.jpeg' form='form14_"+results[i].id+"' value='Save' onclick='form14_save_item($(this));'>";
						rowsHTML+="<img class='filter_icon' src='./images/delete.jpeg' form='form14_"+results[i].id+"' value='Delete' onclick='form14_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		}
		//console.log(rowsHTML);
		$('#form14_body').html(rowsHTML);
	});
};


/**
 * this function prepares the table for accept returns form
 * @form Accept returns
 * @formNo 15
 */
function form15_ini(fid)
{
	var filter_fields=document.getElementById('form15_header');
	
	//populating form 
	var fbill=filter_fields.elements[0].value;
	var fname=filter_fields.elements[1].value;
	var fbatch=filter_fields.elements[2].value;
	var fcustomer=filter_fields.elements[3].value;
	
	var columns="<returns>" +
			"<id>"+fid+"</id>" +
			"<bill_id>"+fbill+"</bill_id>" +
			"<product_name>"+fname+"</product_name>" +
			"<batch>"+fbatch+"</batch>" +
			"<customer>"+fcustomer+"</customer>" +
			"<amount></amount>" +
			"<quantity></quantity>" +
			"</returns>";

	fetch_requested_data('form15',columns,function(results)
	{
		var rowsHTML="";
		for(var i in results)
		{
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form15_"+results[i].id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form15_"+results[i].id+"' value='"+results[i].customer+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form15_"+results[i].id+"' value='"+results[i].bill_id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form15_"+results[i].id+"' value='"+results[i].product_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form15_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].batch+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form15_"+results[i].id+"' value='"+results[i].amount+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form15_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].quantity+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form15_"+results[i].id+"' value='"+results[i].id+"'>";
						rowsHTML+="<img class='filter_icon' src='./images/save.jpeg' form='form15_"+results[i].id+"' value='Save' onclick='form15_save_item($(this));'>";
						rowsHTML+="<img class='filter_icon' src='./images/delete.jpeg' form='form15_"+results[i].id+"' value='Delete' onclick='form15_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		}
		$('#form15_body').html(rowsHTML);
	});
};


/**
 * this function prepares the table for Manage returns form
 * @form Manage returns
 * @formNo 19
 */
function form19_ini(fid)
{
	var filter_fields=document.getElementById('form19_header');

	var fproduct=filter_fields.elements[0].value;
	var fbatch=filter_fields.elements[1].value;
	var fbill=filter_fields.elements[2].value;
	var freason=filter_fields.elements[3].value;
	var fsupplier=filter_fields.elements[4].value;
	
	var columns="<supplier_returns>" +
			"<id>"+fid+"</id>" +
			"<batch>"+fbatch+"</batch>" +
			"<product_name>"+fproduct+"</product_name>" +
			"<sup_bill_id>"+fbill+"</sup_bill_id>" +
			"<reason>"+freason+"</reason>" +
			"<quantity></quantity>" +
			"<supplier>"+fsupplier+"</supplier>" +
			"</supplier_returns>";

	fetch_requested_data('form19',columns,function(results)
	{
		var rowsHTML="";
	
		for(var i in results)
		{
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form19_"+results[i].id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form19_"+results[i].id+"' value='"+results[i].product_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form19_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].batch+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form19_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].sup_bill_id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form19_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].supplier+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form19_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].reason+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form19_"+results[i].id+"' value='"+results[i].quantity+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form19_"+results[i].id+"' value='"+results[i].id+"'>";
						rowsHTML+="<img class='filter_icon' src='./images/save.jpeg' form='form19_"+results[i].id+"' value='Save' onclick='form19_save_item($(this));'>";
						rowsHTML+="<img class='filter_icon' src='./images/delete.jpeg' form='form19_"+results[i].id+"' value='Delete' onclick='form19_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		}
		$('#form19_body').html(rowsHTML);
	});
};


/**
 * this function prepares the table for dispose items form
 * @form Dispose Items
 * @formNo 22
 */
function form22_ini(fid)
{
	var filter_fields=document.getElementById('form22_header');
	
	var fproduct=filter_fields.elements[0].value;
	var fbatch=filter_fields.elements[1].value;
	var fmethod=filter_fields.elements[2].value;
	
	var columns="<disposals>" +
			"<id>"+fid+"</id>" +
			"<batch>"+fbatch+"</batch>" +
			"<product_name>"+fproduct+"</product_name>" +
			"<date></date>" +
			"<method>"+fmethod+"</method>" +
			"<quantity></quantity>" +
			"</disposals>";

	fetch_requested_data('form22',columns,function(results)
	{
		var rowsHTML="";
	
		for(var i in results)
		{
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form22_"+results[i].id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form22_"+results[i].id+"' value='"+results[i].product_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form22_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].batch+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form22_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].method+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form22_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].quantity+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form22_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+get_my_past_date(results[i].date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form22_"+results[i].id+"' value='"+results[i].id+"'>";
						rowsHTML+="<img class='filter_icon' src='./images/save.jpeg' form='form22_"+results[i].id+"' value='Save' onclick='form22_save_item($(this));'>";
						rowsHTML+="<img class='filter_icon' src='./images/delete.jpeg' form='form22_"+results[i].id+"' value='Delete' onclick='form22_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		}
		//console.log(rowsHTML);
		$('#form22_body').html(rowsHTML);
	});
};


/**
 * this function prepares the table for manage customers form
 * @form Manage Customers
 * @formNo 30
 */
function form30_ini(fid)
{
	var filter_fields=document.getElementById('form30_header');
	
	var fname=filter_fields.elements[0].value;
	var fcontact=filter_fields.elements[1].value;
	var femail=filter_fields.elements[2].value;
	var fstatus=filter_fields.elements[3].value;
	
	var columns="<customers>" +
			"<id>"+fid+"</id>" +
			"<name>"+fname+"</name>" +
			"<phone>"+fcontact+"</phone>" +
			"<email>"+femail+"</email>" +
			"<status>"+fstatus+"</status>" +
			"<acc_name></acc_name>" +
			"</customers>";

	fetch_requested_data('form30',columns,function(results)
	{
		var rowsHTML="";
	
		results.forEach(function(result)
		{
			var address_data="<address>" +
					"<id></id>" +
					"<acc_name>"+result.acc_name+"</acc_name>" +
					"<address></address>" +
					"<street></street>" +
					"<city></city>" +
					"<state></state>" +
					"<country></country>" +
					"<acc_type>customer</acc_type>" +
					"</address>";
			fetch_requested_data('form30',address_data,function(add_results)
			{		
				var res_address,res_street,res_city,res_state,res_country,res_id;
				for (var j in add_results)
				{
					res_id=add_results[j].id;
					res_address=add_results[j].address;
					res_street=add_results[j].street;
					res_city=add_results[j].city;
					res_state=add_results[j].state;
					res_country=add_results[j].country;
				}
				rowsHTML+="<tr>";
					rowsHTML+="<form id='form30_"+result.id+"'></form>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='text' readonly='readonly' form='form30_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.name+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='text' readonly='readonly' form='form30_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.phone+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='text' readonly='readonly' form='form30_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.email+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='text' readonly='readonly' form='form30_"+result.id+"' value='"+res_address+", "+res_street+", "+res_city+", "+res_state+", "+res_country+"'>";
							rowsHTML+="<img class='filter_icon' form='form30_"+result.id+"' src='./images/edit.jpeg' onclick=\"modal16_action($(this),'customer',"+res_id+");\">";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='text' readonly='readonly' form='form30_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.status+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='hidden' form='form30_"+result.id+"' value='"+result.id+"'>";
							rowsHTML+="<img class='filter_icon' src='./images/save.jpeg' form='form30_"+result.id+"' value='Save' onclick='form30_save_item($(this));'>";
							rowsHTML+="<img class='filter_icon' src='./images/delete.jpeg' form='form30_"+result.id+"' value='Delete' onclick='form30_delete_item($(this));'>";	
						rowsHTML+="</td>";			
				rowsHTML+="</tr>";
			});
		});
		//console.log(rowsHTML);
		$('#form30_body').html(rowsHTML);
	});
};


/**
 * this function prepares the table for manage offers form
 * @form Manage Offers
 * @formNo 35
 */
function form35_ini(fid)
{
	var filter_fields=document.getElementById('form35_header');
	
	var fname=filter_fields.elements[0].value;
	var ftype=filter_fields.elements[1].value;
	var fdate=filter_fields.elements[2].value;
	var fstatus=filter_fields.elements[3].value;
	
	var columns="<offers>" +
			"<id>"+fid+"</id>" +
			"<offer_name>"+fname+"</offer_name>" +
			"<offer_type>"+ftype+"</offer_type>" +
			"<end_date>"+fdate+"</end_date>" +
			"<offer_detail></offer_detail>" +
			"<status>"+fstatus+"</status>" +
			"</offers>";

	fetch_requested_data('form35',columns,function(results)
	{
		var rowsHTML="";
	
		for(var i in results)
		{
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form35_"+results[i].id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form35_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].offer_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form35_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].offer_type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form35_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+get_my_past_date(results[i].end_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form35_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].offer_detail+"'>";
						rowsHTML+="<img class='filter_icon' src='./images/edit.jpeg' form='form35_"+results[i].id+"' onclick='modal8_action($(this));'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form35_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form35_"+results[i].id+"' value='"+results[i].id+"'>";
						rowsHTML+="<img class='filter_icon' src='./images/save.jpeg' form='form35_"+results[i].id+"' value='Save' onclick='form35_save_item($(this));'>";
						rowsHTML+="<img class='filter_icon' src='./images/delete.jpeg' form='form35_"+results[i].id+"' value='Delete' onclick='form35_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		}
		//console.log(rowsHTML);
		$('#form35_body').html(rowsHTML);
	});
};


/**
 * this function prepares the table for store placement form
 * @form Store Placement
 * @formNo 38
 */
function form38_ini(fid)
{
	var filter_fields=document.getElementById('form38_header');
	
	var fname=filter_fields.elements[0].value;
	var fbatch=filter_fields.elements[1].value;
	var farea=filter_fields.elements[2].value;
	
	var columns="<area_utilization>" +
			"<id>"+fid+"</id>" +
			"<batch>"+fbatch+"</batch>" +
			"<product_name>"+fname+"</product_name>" +
			"<name>"+farea+"</name>" +
			"<quantity></quantity>" +
			"</area_utilization>";

	fetch_requested_data('form38',columns,function(results)
	{
		var rowsHTML="";
	
		for(var i in results)
		{
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form38_"+results[i].id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form38_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].product_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form38_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].batch+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form38_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form38_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].quantity+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form38_"+results[i].id+"' value='"+results[i].id+"'>";
						rowsHTML+="<img class='filter_icon' src='./images/save.jpeg' form='form38_"+results[i].id+"' value='Save' onclick='form38_save_item($(this));'>";
						rowsHTML+="<img class='filter_icon' src='./images/delete.jpeg' form='form38_"+results[i].id+"' value='Delete' onclick='form38_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		}
		//console.log(rowsHTML);
		$('#form38_body').html(rowsHTML);
	});
};


/**
 * this function prepares the table for manage products form
 * @form Manage Products
 * @formNo 39
 */
function form39_ini(fid)
{
	var filter_fields=document.getElementById('form39_header');
	
	var ftypes=filter_fields.elements[0].value;
	var fmakes=filter_fields.elements[1].value;
	var fname=filter_fields.elements[2].value;
	
	var columns="<product_master>" +
			"<id>"+fid+"</id>" +
			"<product_type>"+ftypes+"</product_type>" +
			"<name>"+fname+"</name>" +
			"<make>"+fmakes+"</make>" +
			"<description></description>" +
			"<est_price></est_price>" +
			"</product_master>";

	fetch_requested_data('form39',columns,function(results)
	{
		$('#form39_body').html("");
		results.forEach(function(result)
		{
			var picture_column="<documents>" +
					"<id></id>" +
					"<url></url>" +
					"<doc_type>product_master</doc_type>" +
					"<target_id>"+result.id+"</target_id>" +
					"</documents>";
			fetch_requested_data('form39',picture_column,function(pic_results)
			{
				var rowsHTML="";
				var pic_results_url="";
				var pic_results_id="";
				for (var j in pic_results)
				{
					pic_results_id=pic_results[j].id;
					pic_results_url=pic_results[j].url;
				}
				if(pic_results.length===0)
				{
					pic_results_id=get_new_key();
					pic_results_url="";
				}
				
				updated_url=pic_results_url.replace(/ /g,"+");
				rowsHTML+="<tr>";
					rowsHTML+="<form id='form39_"+result.id+"'></form>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='text' readonly='readonly' form='form39_"+result.id+"' value='"+result.product_type+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='text' readonly='readonly' form='form39_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.make+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='text' readonly='readonly' form='form39_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.name+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<output form='form39_"+result.id+"'><div class='figure' name='"+pic_results_id+"'><img id='img_form39_"+result.id+"' src='"+updated_url+"'></div></output>";
							rowsHTML+="<input type='file' form='form39_"+result.id+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='text' readonly='readonly' form='form39_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.est_price+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='text' readonly='readonly' form='form39_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.description+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='hidden' form='form39_"+result.id+"' value='"+result.id+"'>";
							rowsHTML+="<img class='filter_icon' src='./images/save.jpeg' form='form39_"+result.id+"' value='Save' onclick='form39_save_item($(this));'>";
							rowsHTML+="<img class='filter_icon' src='./images/delete.jpeg' form='form39_"+result.id+"' value='Delete' onclick='form39_delete_item($(this));'>";	
						rowsHTML+="</td>";			
				rowsHTML+="</tr>";
			
				$('#form39_body').append(rowsHTML);
	
				var fields=document.getElementById("form39_"+result.id);
				var picture=fields.elements[4];
				var pictureinfo=fields.elements[3];
								
				picture.addEventListener('change',function(evt)
				{
					select_picture(evt,pictureinfo,function(dataURL)
					{
						pictureinfo.innerHTML="<div class='figure' name='"+pic_results_id+"'><img id='img_form39_"+result.id+"' src='"+dataURL+"'></div>";			
					});
				},false);
			});
		});
	});	
};


/**
 * this function prepares the table for manage vendors form
 * @form Manage Vendors
 * @formNo 40
 */
function form40_ini(fid)
{
	var filter_fields=document.getElementById('form40_header');

	var fname=filter_fields.elements[0].value;
	var fcontact=filter_fields.elements[1].value;
	var femail=filter_fields.elements[2].value;
	
	var columns="<suppliers>" +
			"<id>"+fid+"</id>" +
			"<notes></notes>" +
			"<name>"+fname+"</name>" +
			"<phone>"+fcontact+"</phone>" +
			"<email>"+femail+"</email>" +
			"<acc_name></acc_name>" +
			"</suppliers>";

	fetch_requested_data('form40',columns,function(results)
	{
		var rowsHTML="";
	
		results.forEach(function(result)
		{
			var address_data="<address>" +
					"<id></id>" +
					"<acc_name>"+result.acc_name+"</acc_name>" +
					"<address></address>" +
					"<street></street>" +
					"<city></city>" +
					"<state></state>" +
					"<country></country>" +
					"<acc_type>supplier</acc_type>" +
					"</address>";
			
			fetch_requested_data('form40',address_data,function(add_results)
			{
				var res_address,res_street,res_city,res_state,res_country,res_id;
				for (var j in add_results)
				{
					res_id=add_results[j].id;
					res_address=add_results[j].address;
					res_street=add_results[j].street;
					res_city=add_results[j].city;
					res_state=add_results[j].state;
					res_country=add_results[j].country;
				}
				rowsHTML+="<tr>";
					rowsHTML+="<form id='form40_"+result.id+"'></form>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='text' readonly='readonly' form='form40_"+result.id+"' value='"+result.name+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='text' readonly='readonly' form='form40_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.phone+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='text' readonly='readonly' form='form40_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.email+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='text' readonly='readonly' form='form40_"+result.id+"' ondblclick='set_editable($(this));' value='"+res_address+", "+res_street+", "+res_city+", "+res_state+", "+res_country+"'>";
							rowsHTML+="<img class='filter_icon' src='./images/edit.jpeg' form='form40_"+result.id+"' onclick=\"modal16_action($(this),'supplier',"+res_id+");\">";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='text' readonly='readonly' form='form40_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.notes+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='hidden' form='form40_"+result.id+"' value='"+result.id+"'>";
							rowsHTML+="<img class='filter_icon' src='./images/save.jpeg' form='form40_"+result.id+"' value='Save' onclick='form40_save_item($(this));'>";
							rowsHTML+="<img class='filter_icon' src='./images/delete.jpeg' form='form40_"+result.id+"' value='Delete' onclick='form40_delete_item($(this));'>";	
						rowsHTML+="</td>";			
				rowsHTML+="</tr>";
			});
		});
		//console.log(rowsHTML);
		$('#form40_body').html(rowsHTML);
	});
};


function form41_ini(fid)
{
		//console.log(typeof map41+" in ini");
	
	var coordinates_data="<address>" +
			"<acc_type>master</acc_type>" +
			"<lat></lat>" +
			"<lng></lng>" +
			"</address>";	
	fetch_requested_data('form41',coordinates_data,function(coords)
	{
		for(var z in coords)
		{
			if(typeof map41 != 'undefined')
				map41.remove();

			map41 = L.map('form41_map',{
				center: [coords[z].lat,coords[z].lng], 
				zoom: 10
			});
			
		
			L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
		        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		        subdomains:'1234'
		    }).addTo(map41);
			
			
			var customers_data="<address>" +
					"<id></id>" +
					"<acc_type>customer</acc_type>" +
					"<lat></lat>" +
					"<lng></lng>" +
					"<acc_name></acc_name>" +
					"<status>unconfirmed</status>" +
					"<address></address>" +
					"</address>";
			fetch_requested_data('form41',customers_data,function(customers)
			{
				var rowsHTML="";
				for(var x in customers)
				{
					var latlng=L.latLng(customers[x].lat,customers[x].lng);
					var marker=L.marker(latlng,{draggable:true}).addTo(map41).bindPopup("Name: "+customers[x].acc_name);
					marker.on('dragend',function(event){
						var m=event.target;
						var latlng=m.getLatLng();
						var form=document.getElementById('form41_'+customers[x].id);
						form.elements[1].value=latlng.lat;
						form.elements[2].value=latlng.lng;
						var save_button=form.elements[7];
						$(save_button).show();
					});
					
					rowsHTML+="<div class='customers_content_item' onclick=''>" +
							"<form id='form41_"+customers[x].id+"'>" +
							"Name: <input type='text' size='25' readonly='readonly' value='"+customers[x].acc_name+"'>" +
							"Latitude: <input type='text' size='10' readonly='readonly' value='"+customers[x].lat+"'>" +
							"Longitude: <input type='text' size='10' readonly='readonly' value='"+customers[x].lng+"'>" +
							"<input type='hidden' value='"+customers[x].id+"'>" +
							"<input type='hidden' value='"+customers[x].status+"'>" +
							"<input type='hidden' value='"+customers[x].address+"'>" +
							"<input type='hidden' value='"+customers[x].acc_type+"'>" +
							"<input type='button' value='Confirm' form='form41_"+customers[x].id+"' onclick='form41_save_item($(this))'>" +
							"</form>" +
							"</div>";
				}
				//console.log(rowsHTML);
				$('#form41_header').html(rowsHTML);
				//$('#form41_header').find('input:button').hide();
			
				var scrollPane=$(".customers_pane");
				var scrollContent=$(".customers_content");
				scrollContent.css('width',Math.round(200*customers.length)+"px");
				$(".customers_bar").slider({
					slide: function(event,ui) {
						if (scrollContent.width()>scrollPane.width()){
							scrollContent.css( "margin-left", Math.round(ui.value/100*(scrollPane.width()-scrollContent.width()))+"px");
						} 
						else{
							scrollContent.css("margin-left",0);
						}
					}
				});
	
				scrollPane.css("overflow","hidden");			
			});
			break;
		}
	});
}


/**
 * this function prepares the table for manage bills form
 * @form Manage Bills
 * @formNo 42
 */
function form42_ini(fid)
{
	var filter_fields=document.getElementById('form42_header');
	
	//populating form 
	if(fid==="")
		fid=filter_fields.elements[0].value;
	var fname=filter_fields.elements[1].value;
	var fdate=filter_fields.elements[2].value;
	
	var columns="<bills>" +
			"<id>"+fid+"</id>" +
			"<customer_name>"+fname+"</customer_name>" +
			"<date_created>"+fdate+"</date_created>" +
			"<amount></amount>" +
			"<type>product</type>" +
			"</bills>";

	fetch_requested_data('form42',columns,function(results)
	{
		var rowsHTML="";
	
		for(var i in results)
		{
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form42_"+results[i].id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form42_"+results[i].id+"' value='"+results[i].id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form42_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].customer_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form42_"+results[i].id+"' value='"+get_my_past_date(results[i].date_created)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form42_"+results[i].id+"' value='"+results[i].amount+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<img class='filter_icon' src='./images/edit.jpeg' form='form42_"+results[i].id+"' value='Edit' onclick='form42_edit_item($(this));'>";
						rowsHTML+="<img class='filter_icon' src='./images/save.jpeg' form='form42_"+results[i].id+"' value='Save' onclick='form42_save_item($(this));'>";
						rowsHTML+="<img class='filter_icon' src='./images/delete.jpeg' form='form42_"+results[i].id+"' value='Delete' onclick='form42_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		}
		//console.log(rowsHTML);
		$('#form42_body').html(rowsHTML);	
	});
};


/**
 * this function prepares the table for manage purchase orders form
 * @form Manage Purchase Orders
 * @formNo 43
 */
function form43_ini(fid)
{
	var filter_fields=document.getElementById('form43_header');
	
	//populating form 
	if(fid==="")
		fid=filter_fields.elements[0].value;
	var fname=filter_fields.elements[1].value;
	var fdate=filter_fields.elements[2].value;
	
	var columns="<purchase_orders>" +
			"<id>"+fid+"</id>" +
			"<order_date>"+fdate+"</order_date>" +
			"<supplier>"+fname+"</supplier>" +
			"<est_amount></est_amount>" +
			"</purchase_orders>";

	fetch_requested_data('form43',columns,function(results)
	{
		var rowsHTML="";
	
		for(var i in results)
		{
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form43_"+results[i].id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form43_"+results[i].id+"' value='"+results[i].id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form43_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].supplier+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form43_"+results[i].id+"' value='"+get_my_past_date(results[i].order_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form43_"+results[i].id+"' value='"+results[i].est_amount+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<img class='filter_icon' src='./images/edit.jpeg' form='form43_"+results[i].id+"' value='Edit' onclick='form43_edit_item($(this));'>";
						rowsHTML+="<img class='filter_icon' src='./images/save.jpeg' form='form43_"+results[i].id+"' value='Save' onclick='form43_save_item($(this));'>";
						rowsHTML+="<img class='filter_icon' src='./images/delete.jpeg' form='form43_"+results[i].id+"' value='Delete' onclick='form43_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		}
		//console.log(rowsHTML);
		$('#form43_body').html(rowsHTML);
	});
};

/**
 * this function prepares the table for manage pamphlets form
 * @form Manage Pamphlets
 * @formNo 44
 */
function form44_ini(fid)
{
	var filter_fields=document.getElementById('form44_header');
	
	//populating form 
	if(fid==="")
		fid=filter_fields.elements[0].value;
	var fname=filter_fields.elements[1].value;
	var ftemplate=filter_fields.elements[2].value;
	
	var columns="<pamphlets>" +
			"<id>"+fid+"</id>" +
			"<name>"+fname+"</name>" +
			"<template>"+ftemplate+"</template>" +
			"<count_items></count_items>" +
			"</pamphlets>";

	fetch_requested_data('form44',columns,function(results)
	{
		var rowsHTML="";
	
		for(var i in results)
		{
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form44_"+results[i].id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form44_"+results[i].id+"' value='"+results[i].id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form44_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form44_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].template+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form44_"+results[i].id+"' value='"+results[i].count_items+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<img class='filter_icon' src='./images/edit.jpeg' form='form44_"+results[i].id+"' value='Edit' onclick='form44_edit_item($(this));'>";
						rowsHTML+="<img class='filter_icon' src='./images/save.jpeg' form='form44_"+results[i].id+"' value='Save' onclick='form44_save_item($(this));'>";
						rowsHTML+="<img class='filter_icon' src='./images/delete.jpeg' form='form44_"+results[i].id+"' value='Delete' onclick='form44_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		}
		//console.log(rowsHTML);
		$('#form44_body').html(rowsHTML);
	});
};

/**
 * this function prepares the table for manage service receipts form
 * @form Manage Service Receipts
 * @formNo 45
 */
function form45_ini(fid)
{
	var filter_fields=document.getElementById('form45_header');
	
	if(fid==="")
		fid=filter_fields.elements[0].value;
	var fname=filter_fields.elements[1].value;
	var fdate=filter_fields.elements[2].value;
	
	var columns="<bills>" +
			"<id>"+fid+"</id>" +
			"<customer_name>"+fname+"</customer_name>" +
			"<date_created>"+fdate+"</date_created>" +
			"<amount></amount>" +
			"<type>service</type>" +
			"</bills>";


	fetch_requested_data('form45',columns,function(results)
	{
		var rowsHTML="";
	
		for(var i in results)
		{
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form45_"+results[i].id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form45_"+results[i].id+"' value='"+results[i].id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form45_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].customer_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form45_"+results[i].id+"' value='"+get_my_past_date(results[i].created_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form45_"+results[i].id+"' value='"+results[i].amount+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<img class='filter_icon' src='./images/edit.jpeg' form='form45_"+results[i].id+"' value='Edit' onclick='form45_edit_item($(this));'>";
						rowsHTML+="<img class='filter_icon' src='./images/save.jpeg' form='form45_"+results[i].id+"' value='Save' onclick='form45_save_item($(this));'>";
						rowsHTML+="<img class='filter_icon' src='./images/delete.jpeg' form='form45_"+results[i].id+"' value='Delete' onclick='form45_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		}
		//console.log(rowsHTML);
		$('#form45_body').html(rowsHTML);
	});
};


/**
 * @form Set Defaults
 * @formNo 46
 */
function form46_ini(fid)
{
	var filter_fields=document.getElementById('form46_header');
	
	var fname=filter_fields.elements[0].value;
	
	var columns="<user_preferences>" +
			"<id>"+fid+"</id>" +
			"<name></name>" +
			"<display_name>"+fname+"</display_name>" +
			"<value></value>" +
			"<status>active</status>" +
			"<type>other</type>" +
			"</user_preferences>";

	fetch_requested_data('form46',columns,function(results)
	{
		var rowsHTML="";
		for(var i in results)
		{
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form46_"+results[i].id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form46_"+results[i].id+"' value='"+results[i].name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' form='form46_"+results[i].id+"' value='"+results[i].value+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form46_"+results[i].id+"' value='"+results[i].id+"'>";
						rowsHTML+="<input type='hidden' form='form46_"+results[i].id+"' value='"+results[i].name+"'>";
						rowsHTML+="<img class='filter_icon' src='./images/save.jpeg' id='save_form46_"+results[i].id+"' form='form46_"+results[i].id+"' value='Save' onclick='form46_save_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		}
		//console.log(rowsHTML);
		$('#form46_body').html(rowsHTML);
	});
};


/**
 * this function prepares the table for Select Reports form
 * @form Select Reports
 * @formNo 48
 */
function form48_ini(fid)
{
	var filter_fields=document.getElementById('form48_header');
	
	var fname=filter_fields.elements[0].value;
	
	var columns="<user_preferences>" +
			"<id>"+fid+"</id>" +
			"<name></name>" +
			"<display_name>"+fname+"</display_name>" +
			"<value></value>" +
			"<status>active</status>" +
			"<type>report</type>" +
			"</user_preferences>";

	fetch_requested_data('form48',columns,function(results)
	{
		var rowsHTML="";
		for(var i in results)
		{
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form48_"+results[i].id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form48_"+results[i].id+"' value='"+results[i].display_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='checkbox' form='form48_"+results[i].id+"' checked='"+results[i].value+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form48_"+results[i].id+"' value='"+results[i].id+"'>";
						rowsHTML+="<input type='hidden' form='form48_"+results[i].id+"' value='"+results[i].name+"'>";
						rowsHTML+="<img class='filter_icon' src='./images/save.jpeg' id='save_form48_"+results[i].id+"' form='form48_"+results[i].id+"' value='Save' onclick='form48_save_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		}
		//console.log(rowsHTML);
		$('#form48_body').html(rowsHTML);
	});
};

/**
 * this function prepares the table for Select Forms form
 * @form Select Forms
 * @formNo 49
 */
function form49_ini(fid)
{
	var filter_fields=document.getElementById('form49_header');
	
	//populating form
	var fname=filter_fields.elements[0].value;
	
	var columns="<user_preferences>" +
			"<id>"+fid+"</id>" +
			"<name></name>" +
			"<display_name>"+fname+"</display_name>" +
			"<value></value>" +
			"<status>active</status>" +
			"<type>form</type>" +
			"</user_preferences>";

	fetch_requested_data('form49',columns,function(results)
	{
		var rowsHTML="";
	
		for(var i in results)
		{
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form49_"+results[i].id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form49_"+results[i].id+"' value='"+results[i].display_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='checkbox' readonly='readonly' form='form49_"+results[i].id+"' checked='"+results[i].value+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form49_"+results[i].id+"' value='"+results[i].id+"'>";
						rowsHTML+="<input type='hidden' form='form49_"+results[i].id+"' value='"+results[i].name+"'>";
						rowsHTML+="<img class='filter_icon' src='./images/save.jpeg' id='save_form49_"+results[i].id+"' form='form49_"+results[i].id+"' value='Save' onclick='form49_save_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		}
		//console.log(rowsHTML);
		$('#form49_body').html(rowsHTML);
	});
};


/**
 * this function prepares the table for Select Accounting Principles form
 * @form Select Accounting Principles
 * @formNo 50
 */
function form50_ini(fid)
{
	var filter_fields=document.getElementById('form50_header');
	
	//populating form
	var fname=filter_fields.elements[0].value;
	
	var columns="<user_preferences>" +
		"<id>"+fid+"</id>" +
		"<name></name>" +
		"<display_name>"+fname+"</display_name>" +
		"<value></value>" +
		"<status>active</status>" +
		"<type>accounting</type>" +
		"</user_preferences>";

	fetch_requested_data('form50',columns,function(results)
	{
		var rowsHTML="";
	
		for(var i in results)
		{
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form50_"+results[i].id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form50_"+results[i].id+"' value='"+results[i].display_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='checkbox' readonly='readonly' form='form50_"+results[i].id+"' checked='"+results[i].value+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form50_"+results[i].id+"' value='"+results[i].id+"'>";
						rowsHTML+="<input type='hidden' form='form50_"+results[i].id+"' value='"+results[i].name+"'>";
						rowsHTML+="<img class='filter_icon' src='./images/save.jpeg' id='save_form50_"+results[i].id+"' form='form50_"+results[i].id+"' value='Save' onclick='form50_save_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		}
		//console.log(rowsHTML);
		$('#form50_body').html(rowsHTML);
	});
};

/**
 * @form Access Control
 * @formNo 51
 */
function form51_ini(fuser)
{
	var header_fields=document.getElementById('form51_master');
	
	if(fuser==="")
		fuser=header_fields.elements[3].value;
	if(fuser!="")
	{
		var columns="<access_control>" +
			"<id></id>" +
			"<username>"+fuser+"</username>" +
			"<element_id></element_id>" +
			"<element_name></element_name>" +
			"<status>active</status>" +
			"<re></re>" +
			"<cr></cr>" +
			"<up></up>" +
			"<del></del>" +
			"</access_control>";
	
		fetch_requested_data('form51',columns,function(results)
		{
			var rowsHTML="";
		
			for(var i in results)
			{
				rowsHTML+="<tr>";
					rowsHTML+="<form id='form51_"+results[i].id+"'></form>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='text' readonly='readonly' form='form51_"+results[i].id+"' value='"+results[i].element_name+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='checkbox' readonly='readonly' form='form51_"+results[i].id+"' "+results[i].re+">";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
						rowsHTML+="<input type='checkbox' readonly='readonly' form='form51_"+results[i].id+"' "+results[i].cr+">";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='checkbox' readonly='readonly' form='form51_"+results[i].id+"' "+results[i].up+">";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='checkbox' readonly='readonly' form='form51_"+results[i].id+"' "+results[i].del+">";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='hidden' form='form51_"+results[i].id+"' value='"+results[i].id+"'>";
							rowsHTML+="<input type='hidden' form='form51_"+results[i].id+"' value='"+results[i].element_id+"'>";
							rowsHTML+="<img class='filter_icon' src='./images/save.jpeg' id='save_form51_"+results[i].id+"' form='form51_"+results[i].id+"' value='Save' onclick='form51_save_item($(this));'>";	
						rowsHTML+="</td>";			
				rowsHTML+="</tr>";
			}
			//console.log(rowsHTML);
			$('#form51_body').html(rowsHTML);
		});
	}
	else
	{
		$('#form51_body').html("");
	}
};


/**
 * @form Set shortcut keys
 * @formNo 52
 */
function form52_ini(fid)
{
	var filter_fields=document.getElementById('form52_header');
	var felement=filter_fields.elements[0].value;
	var fkey=filter_fields.elements[1].value;
	
	var columns="<shortcuts>" +
		"<id>"+fid+"</id>" +
		"<element_id></element_id>" +
		"<element_name>"+felement+"</element_name>" +
		"<status>active</status>" +
		"<shortcut>"+fkey+"</shortcut>" +
		"</shortcuts>";

	fetch_requested_data('form52',columns,function(results)
	{
		var rowsHTML="";
	
		for(var i in results)
		{
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form52_"+results[i].id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form52_"+results[i].id+"' value='"+results[i].element_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form52_"+results[i].id+"' value='"+results[i].shortcut+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form52_"+results[i].id+"' value='"+results[i].id+"'>";
						rowsHTML+="<input type='hidden' form='form52_"+results[i].id+"' value='"+results[i].element_id+"'>";
						rowsHTML+="<img class='filter_icon' src='./images/save.jpeg' id='save_form52_"+results[i].id+"' form='form52_"+results[i].id+"' value='Save' onclick='form52_save_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		}
		$('#form52_body').html(rowsHTML);
	});
};


/**
 * @form Manage Supplier Bills
 * @formNo 53
 */
function form53_ini(fid)
{
	var filter_fields=document.getElementById('form53_header');
	
	if(fid==="")
		fid=filter_fields.elements[0].value;
	var fname=filter_fields.elements[1].value;
	var fbill_date=filter_fields.elements[2].value;
	var fentry_date=filter_fields.elements[3].value;
	
	var columns="<supplier_bills>" +
			"<id>"+fid+"</id>" +
			"<supplier_name>"+fname+"</supplier_name>" +
			"<bill_date>"+fbill_date+"</bill_date>" +
			"<entry_date>"+fentry_date+"</entry_date>" +
			"<amount></amount>" +
			"</supplier_bills>";

	fetch_requested_data('form53',columns,function(results)
	{
		var rowsHTML="";
	
		for(var i in results)
		{
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form53_"+results[i].id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form53_"+results[i].id+"' value='"+results[i].id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form53_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].supplier_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form53_"+results[i].id+"' value='"+get_my_past_date(results[i].bill_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form53_"+results[i].id+"' value='"+get_my_past_date(results[i].entry_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form53_"+results[i].id+"' value='"+results[i].amount+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<img class='filter_icon' src='./images/edit.jpeg' form='form53_"+results[i].id+"' value='Edit' onclick='form53_edit_item($(this));'>";
						rowsHTML+="<img class='filter_icon' src='./images/save.jpeg' form='form53_"+results[i].id+"' value='Save' onclick='form53_save_item($(this));'>";
						rowsHTML+="<img class='filter_icon' src='./images/delete.jpeg' form='form53_"+results[i].id+"' value='Delete' onclick='form53_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		}
		//console.log(rowsHTML);
		$('#form53_body').html(rowsHTML);	
	});
};

/**
 * @form Select Templates
 * @formNo 54
 */
function form54_ini(fid)
{
	var filter_fields=document.getElementById('form54_header');
	
	var fname=filter_fields.elements[0].value;
	
	var columns="<user_preferences>" +
			"<id>"+fid+"</id>" +
			"<display_name>"+fname+"</display_name>" +
			"<value></value>" +
			"<status>active</status>" +
			"<type>template</type>" +
			"</user_preferences>";

	fetch_requested_data('form54',columns,function(results)
	{
		var rowsHTML="";
		for(var i in results)
		{
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form54"+results[i].id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form54_"+results[i].id+"' value='"+results[i].display_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' form='form54_"+results[i].id+"' value='"+results[i].value+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form54_"+results[i].id+"' value='"+results[i].id+"'>";
						rowsHTML+="<img class='filter_icon' src='./images/save.jpeg' id='save_form54_"+results[i].id+"' form='form54_"+results[i].id+"' value='Save' onclick='form54_save_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		}
		//console.log(rowsHTML);
		$('#form54_body').html(rowsHTML);
	});
};

/**
 * @form Virtual Store
 * @formNo 55
 */
function form55_ini(fid)
{
	var filter_fields=document.getElementById('form55_header');
	
	var fname=filter_fields.elements[0].value;
	var fbatch=filter_fields.elements[1].value;
	
	var utilization="<area_utilization>" +
			"<id>"+fid+"</id>" +
			"<product_name>"+fname+"</product_name>" +
			"<name></name>" +
			"<batch>"+fbatch+"</batch>" +
			"<quantity></quantity>" +
			"</area_utilization>";

	fetch_requested_data('form55',utilization,function(results)
	{
		var canvas = document.getElementById('virtual_store');
		var ctx = canvas.getContext('2d');

		results.forEach(function(result)
		{
			var storages_data="<store_areas>" +
				"<name>"+result.name+"</name>" +
				"<area_type>storage</area_type>" +
				"<height></height>" +
				"<width></width>" +
				"<length></length>" +
				"<locx></locx>" +
				"<locy></locy>" +
				"<locz></locz>" +
				"<storey></storey>" +
				"</store_areas>";
			
			fetch_requested_data('form55',storages_data,function(area_results)
			{
				for(var i in area_results)
				{
					draw_star(ctx,area_results[i].locx,area_results[i].locy,10,"#ff0000");
				}
			});
		});
	});
}

/**
 * @form Expense Register
 * @formNo 56
 */
function form56_ini(fid)
{
	var filter_fields=document.getElementById('form56_header');
	
	var fdate=filter_fields.elements[0].value;
	var faccount=filter_fields.elements[1].value;
	
	var columns="<expenses>" +
			"<id>"+fid+"</id>" +
			"<expense_date>"+fdate+"</expense_date>" +
			"<to_acc>"+faccount+"</to_acc>" +
			"<description></description>" +
			"<amount></amount>" +
			"</expenses>";

	fetch_requested_data('form56',columns,function(results)
	{
		var rowsHTML="";
	
		for(var i in results)
		{
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form56_"+results[i].id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form56_"+results[i].id+"' value='"+results[i].expense_date+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form56_"+results[i].id+"' value='"+results[i].to_acc+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form56_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].description+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form56_"+results[i].id+"' ondblclick='set_editable($(this));' value='"+results[i].amount+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form56_"+results[i].id+"' value='"+results[i].id+"'>";
						rowsHTML+="<img class='filter_icon' src='./images/save.jpeg' form='form56_"+results[i].id+"' value='Save' onclick='form56_save_item($(this));'>";
						rowsHTML+="<img class='filter_icon' src='./images/delete.jpeg' form='form56_"+results[i].id+"' value='Delete' onclick='form56_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		}
		//console.log(rowsHTML);
		$('#form56_body').html(rowsHTML);	
	});
};

/**
 * @form manage services
 * @formNo 57
 */
function form57_ini(fid)
{
	var filter_fields=document.getElementById('form57_header');
	
	var fservices=filter_fields.elements[0].value;
	
	var columns="<services>" +
			"<id>"+fid+"</id>" +
			"<name>"+fservices+"</name>" +
			"<description></description>" +
			"<estimated_cost></estimated_cost>" +
			"</services>";

	fetch_requested_data('form57',columns,function(results)
	{
		var rowsHTML="";
	
		results.forEach(function(result)
		{
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form57_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form57_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form57_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.description+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form57_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.estimated_cost+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form57_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<img class='filter_icon' src='./images/save.jpeg' form='form57_"+result.id+"' value='Save' onclick='form57_save_item($(this));'>";
						rowsHTML+="<img class='filter_icon' src='./images/delete.jpeg' form='form57_"+result.id+"' value='Delete' onclick='form57_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
		});
		//console.log(rowsHTML);
		$('#form57_body').html(rowsHTML);	
	});
};

/**
 * @form manage service pre-requisites
 * @formNo 58
 */
function form58_ini(fid)
{
	var filter_fields=document.getElementById('form58_header');
	
	var fservice=filter_fields.elements[0].value;
	var ftype=filter_fields.elements[1].value;
	var frequisite=filter_fields.elements[2].value;
	
	var columns="<pre_requisites>" +
			"<id>"+fid+"</id>" +
			"<name>"+fservices+"</name>" +
			"<type>service</type>" +
			"<requisite_type>"+ftype+"</requisite_type>" +
			"<requisite_name>"+frequisite+"</requisite_name>" +
			"<quantity></quantity>" +
			"</pre_requisites>";

	fetch_requested_data('form58',columns,function(results)
	{
		var rowsHTML="";
	
		results.forEach(function(result)
		{
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form58_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form58_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form58_"+result.id+"' value='"+result.requisite_type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form58_"+result.id+"' value='"+result.requisite_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form58_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.quantity+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form58_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<img class='filter_icon' src='./images/save.jpeg' form='form58_"+result.id+"' value='Save' onclick='form58_save_item($(this));'>";
						rowsHTML+="<img class='filter_icon' src='./images/delete.jpeg' form='form58_"+result.id+"' value='Delete' onclick='form58_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
		});
		//console.log(rowsHTML);
		$('#form58_body').html(rowsHTML);	
	});
};

/**
 * @form manage product pre-requisites
 * @formNo 59
 */
function form59_ini(fid)
{
	var filter_fields=document.getElementById('form59_header');
	
	var fproduct=filter_fields.elements[0].value;
	var ftype=filter_fields.elements[1].value;
	var frequisite=filter_fields.elements[2].value;
	
	var columns="<pre_requisites>" +
			"<id>"+fid+"</id>" +
			"<name>"+fproduct+"</name>" +
			"<type>product</type>" +
			"<requisite_type>"+ftype+"</requisite_type>" +
			"<requisite_name>"+frequisite+"</requisite_name>" +
			"<quantity></quantity>" +
			"</pre_requisites>";

	fetch_requested_data('form59',columns,function(results)
	{
		var rowsHTML="";
	
		results.forEach(function(result)
		{
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form59_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form59_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form59_"+result.id+"' value='"+result.requisite_type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form59_"+result.id+"' value='"+result.requisite_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form59_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.quantity+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form59_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<img class='filter_icon' src='./images/save.jpeg' form='form59_"+result.id+"' value='Save' onclick='form59_save_item($(this));'>";
						rowsHTML+="<img class='filter_icon' src='./images/delete.jpeg' form='form59_"+result.id+"' value='Delete' onclick='form59_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
		});
		//console.log(rowsHTML);
		$('#form59_body').html(rowsHTML);	
	});
};


function notifications_ini()
{
	var columns="<notifications>" +
			"<title></title>" +
			"<link_to></link_to>" +
			"<data_id></data_id>" +
			"<notes></notes>" +
			"<t_generated></t_generated>" +
			"<status>pending</status>" +
			"</notifications>";

	fetch_requested_data('',columns,function(notifs)
	{	
		var result_html="";
		for(var i in notifs)
		{
			result_html+="<div class='notification_detail'>" +
					notifs[i].title +
					"</br><a onclick=\"" +
					notifs[i].link_to +
					"_display('"+notifs[i].data_id +
					"');\">"+notifs[i].notes+"</a>" +
					"<div class='notification_status'>" +
					" Generated @ " +
					get_formatted_time(notifs[i].t_generated) +
					"</div>" +
					"<div>" +
					"<input type='button' value='Seen' onclick='notifications_update_item()'>" +
					"<input type='button' value='Close' onclick='notifications_update_item()'>" +
					"</div>" +
					"</div>";
		}
		
		var columns2="<notifications>" +
				"<title></title>" +
				"<link_to></link_to>" +
				"<data_id></data_id>" +
				"<notes></notes>" +
				"<t_generated></t_generated>" +
				"<status>reviewed</status>" +
				"</notifications>";
		
		fetch_requested_data('',columns2,function(notifs2)
		{	
			for(var j in notifs2)
			{
				result_html+="<div class='notification_detail'>" +
						notifs2[j].title +
						"</br><a onclick=\"" +
						notifs2[j].link_to +
						"_display('"+notifs2[j].data_id +
						"');\">"+notifs2[j].notes+"</a>" +
						"<div class='notification_status'>" +
						" Generated @ " +
						get_formatted_time(notifs2[j].t_generated) +
						"</div>" +
						"<div>" +
						"<input type='button' value='Unseen' onclick='notifications_update_item()'>" +
						"<input type='button' value='Close' onclick='notifications_update_item()'>" +
						"</div>" +
						"</div>";
			}
			$("#notifications_detail").html(result_html);
		});
	});
}


function opportunities_ini()
{
	var columns="<opportunities>" +
			"<title></title>" +
			"<link_to></link_to>" +
			"<data_id></data_id>" +
			"<notes></notes>" +
			"<t_generated></t_generated>" +
			"<status>pending</status>" +
			"</opportunities>";

	fetch_requested_data('',columns,function(oppors)
	{	
		var result_html="";
		
		for(var i in oppors)
		{
			result_html+="<div class='opportunity_detail'>" +
					oppors[i].title +
					"</br><a onclick=\"" +
					oppors[i].link_to +
					"_display('"+oppors[i].data_id +
					"');\">"+oppors[i].notes+"</a>" +
					"<div class='opportunity_status'>" +
					" Generated @ " +
					get_formatted_time(oppors[i].t_generated) +
					"</div>" +
					"<div>" +
					"<input type='button' value='Seen' onclick='opportunities_update_item()'>" +
					"<input type='button' value='Close' onclick='opportunities_update_item()'>" +
					"</div>" +
					"</div>";	
		}
		var columns2="<opportunities>" +
				"<title></title>" +
				"<link_to></link_to>" +
				"<data_id></data_id>" +
				"<notes></notes>" +
				"<t_generated></t_generated>" +
				"<status>reviewed</status>" +
				"</opportunities>";
		
		fetch_requested_data('',columns2,function(oppors2)
		{	
			for(var j in oppors2)
			{
				result_html+="<div class='opportunity_detail'>" +
						oppors2[j].title +
						"</br><a onclick=\"" +
						oppors2[j].link_to +
						"_display('"+oppors2[j].data_id +
						"');\">"+oppors2[j].notes+"</a>" +
						"<div class='opportunity_status'>" +
						" Generated @ " +
						get_formatted_time(oppors2[j].t_generated) +
						"</div>" +
						"<div>" +
						"<input type='button' value='Unseen' onclick='opportunities_update_item()'>" +
						"<input type='button' value='Close' onclick='opportunities_update_item()'>" +
						"</div>" +
						"</div>";	
			}
		
			$("#opportunities_detail").html(result_html);
		});
		
	});
}

function activities_ini() 
{
	var columns="<activities>" +
		"<title></title>" +
		"<link_to></link_to>" +
		"<data_id></data_id>" +
		"<notes></notes>" +
		"<updated_by></updated_by>" +
		"<user_display>yes</user_display>" +
		"<last_updated></last_updated>" +
		"</activities>";
	
	fetch_requested_data('',columns,function(activities)
	{
		var result_html="";
		for(var i in activities)
		{
			result_html+="<div class='activity_detail'>" +
						activities[i].title +
						"</br><a onclick=\"" +
						activities[i].link_to +
						"_display('"+activities[i].data_id +
						"');\">"+activities[i].notes+"</a>" +
						"<div class='activity_log'>By:" +
						activities[i].updated_by +
						" @ " +
						get_formatted_time(activities[i].last_updated) +
						"</div>" +
						"</div>";
		}
		$("#activity_lane").html(result_html);
		
	});
	setTimeout(activities_ini,100000);	
}


function search_ini()
{
	var searchStr=document.getElementById("search_box").value;	
	
	var columns="<activities>" +
			"<title></title>" +
			"<link_to></link_to>" +
			"<data_id></data_id>" +
			"<notes></notes>" +
			"<updated_by></updated_by>" +
			"<last_updated></last_updated>" +
			"</activities>";

	fetch_requested_data('',columns,function(search_res)
	{
		var num_res=0;
		var result_html="";
		for(var i in search_res)
		{
			result_html+="<div class='activity_detail'>" +
					activities[i].title +
					"</br><a onclick=\"" +
					activities[i].link_to +
					"_display('"+activities[i].data_id +
					"');\">"+activities[i].notes+"</a>" +
					"<div class='activity_log'>By:" +
					activities[i].updated_by +
					" @ " +
					get_formatted_time(activities[i].last_updated) +
					"</div>" +
					"</div>";
			num_res=num_res+1;
		}
		$('#search_header').html(num_res+" results found");
		$("#search_results").html(result_html);

	});

}