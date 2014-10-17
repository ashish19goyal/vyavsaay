/**
* @form Update Inventory
* @formNo 1
*/
function form1_import_template()
{
	var data_array=['product_name','batch','price','expiry','quantity'];
	my_array_to_csv(data_array);
};


/**
* @form Manage Assets
* @formNo 5
*/
function form5_import_template()
{
	var data_array=['name','date_inc','owner','activity','value','type'];
	my_array_to_csv(data_array);
};


/**
* @form Manage Staff
* @formNo 8
*/
function form8_import_template()
{
	var data_array=['name','phone','email','status','joining_date','qualification',
	                'skills','fixed_comp','variable_comp_rate','allowed_pto','acc_name',
	                'address','street','city','state','country'];
	my_array_to_csv(data_array);
};


/**
* @form Cash Register
* @formNo 9
*/
function form9_import_template()
{
	var data_array=['trans_type','trans_date','amount','debit_acc','credit_acc'];
	my_array_to_csv(data_array);
};


/**
* @form Schedule Payments
* @formNo 11
*/
function form11_import_template()
{
	var data_array=['type','transaction_id','amount','acc_name','due_date','status','date'];
	my_array_to_csv(data_array);
};


/**
* @form Manage Tasks
* @formNo 14
*/
function form14_import_template()
{
	var data_array=['name','description','assignee','t_due','t_executed','status'];
	my_array_to_csv(data_array);
};


/**
* @form Accept returns
* @formNo 15
*/
function form15_import_template()
{
	var data_array=['bill_id','product_name','batch','customer','amount','quantity'];
	my_array_to_csv(data_array);
};


/**
* @form Manage returns
* @formNo 19
*/
function form19_import_template()
{
	var data_array=['product_name','batch','sup_bill_id','reason','quantity','supplier'];
	my_array_to_csv(data_array);
};


/**
* @form Dispose Items
* @formNo 22
*/
function form22_import_template()
{
	var data_array=['product_name','batch','date','method','quantity'];
	my_array_to_csv(data_array);
};


/**
* @form Manage Customers
* @formNo 30
*/
function form30_import_template()
{
	var data_array=['id','name','phone','email','status','acc_name','notes','address','street','city','state','country'];
	my_array_to_csv(data_array);
};


/**
* @form Manage Offers
* @formNo 35
*/
function form35_import_template()
{
	var data_array=['offer_name','offer_type','end_date','product_name','batch','service',
	                'criteria_type','criteria_amount','criteria_quantity','result_type','discount_percent',
	                'discount_amount','quantity_add_percent','quantity_add_amount','free_product_name','free_product_quantity',
	                'offer_detail','status'];
	my_array_to_csv(data_array);
};


/**
* @form Store Placement
* @formNo 38
*/
function form38_import_template()
{
	var data_array=['product_name','batch','name','quantity'];
	my_array_to_csv(data_array);
};


/**
* @form Manage Products
* @formNo 39
*/
function form39_import_template()
{
	var data_array=['name','make','description','manufactured','unit','tags'];
	my_array_to_csv(data_array);
};


/**
* @form Manage suppliers
* @formNo 40
*/
function form40_import_template()
{
	var data_array=['name','phone','email','notes','acc_name',
	                'address','street','city','state','country'];
	my_array_to_csv(data_array);
};


/**
* @form Manage Bills
* @formNo 42
*/
function form42_import_template()
{
	var data_array=['customer_name','bill_date','total'];
	my_array_to_csv(data_array);
};


/**
* @form Manage Purchase Orders
* @formNo 43
*/
function form43_import_template()
{
	var columns="<purchase_orders>" +
			"<id>"+fid+"</id>" +
			"<order_date>"+fdate+"</order_date>" +
			"<supplier>"+fname+"</supplier>" +
			"<est_amount></est_amount>" +
			"</purchase_orders>";

	var data_array=['order_date','supplier','est_amount'];
	my_array_to_csv(data_array);
};

/**
* this function prepares the table for manage pamphlets form
* @form Manage Pamphlets
* @formNo 44
*/
function form44_import_template()
{
	var columns="<pamphlets>" +
			"<id>"+fid+"</id>" +
			"<name>"+fname+"</name>" +
			"<count_items></count_items>" +
			"</pamphlets>";

	var data_array=['product_name','batch','price','expiry','quantity'];
	my_array_to_csv(data_array);
};

/**
* this function prepares the table for manage service receipts form
* @form Manage Service Receipts
* @formNo 45
*/
function form45_import_template()
{
	
	var columns="<bills>" +
			"<id>"+fid+"</id>" +
			"<customer_name>"+fname+"</customer_name>" +
			"<date_created>"+fdate+"</date_created>" +
			"<amount></amount>" +
			"<type>service</type>" +
			"</bills>";

	var data_array=['product_name','batch','price','expiry','quantity'];
	my_array_to_csv(data_array);
};


/**
* @form Set Defaults
* @formNo 46
*/
function form46_import_template()
{
	var columns="<user_preferences>" +
			"<id>"+fid+"</id>" +
			"<name></name>" +
			"<display_name>"+fname+"</display_name>" +
			"<value></value>" +
			"<status>active</status>" +
			"<type>other</type>" +
			"</user_preferences>";

	var data_array=['product_name','batch','price','expiry','quantity'];
	my_array_to_csv(data_array);
};


/**
* this function prepares the table for Select Reports form
* @form Select Reports
* @formNo 48
*/
function form48_import_template()
{
	var columns="<user_preferences>" +
			"<id>"+fid+"</id>" +
			"<name></name>" +
			"<display_name>"+fname+"</display_name>" +
			"<value></value>" +
			"<status>active</status>" +
			"<type>report</type>" +
			"</user_preferences>";
	var data_array=['product_name','batch','price','expiry','quantity'];
	my_array_to_csv(data_array);
};

/**
* this function prepares the table for Select Forms form
* @form Select Forms
* @formNo 49
*/
function form49_import_template()
{
	var columns="<user_preferences>" +
			"<id>"+fid+"</id>" +
			"<name></name>" +
			"<display_name>"+fname+"</display_name>" +
			"<value></value>" +
			"<status>active</status>" +
			"<type>form</type>" +
			"</user_preferences>";

	var data_array=['product_name','batch','price','expiry','quantity'];
	my_array_to_csv(data_array);
};


/**
* this function prepares the table for Select Accounting Principles form
* @form Select Accounting Principles
* @formNo 50
*/
function form50_import_template()
{
	var columns="<user_preferences>" +
		"<id>"+fid+"</id>" +
		"<name></name>" +
		"<display_name>"+fname+"</display_name>" +
		"<value></value>" +
		"<status>active</status>" +
		"<type>accounting</type>" +
		"</user_preferences>";

	var data_array=['product_name','batch','price','expiry','quantity'];
	my_array_to_csv(data_array);
};


/**
* @form Set shortcut keys
* @formNo 52
*/
function form52_import_template()
{
	var columns="<shortcuts>" +
		"<id>"+fid+"</id>" +
		"<element_id></element_id>" +
		"<element_name>"+felement+"</element_name>" +
		"<status>active</status>" +
		"<shortcut>"+fkey+"</shortcut>" +
		"</shortcuts>";

		var data_array=['product_name','batch','price','expiry','quantity'];
	my_array_to_csv(data_array);
};


/**
* @form Manage Supplier Bills
* @formNo 53
*/
function form53_import_template()
{
	var columns="<supplier_bills>" +
			"<id>"+fid+"</id>" +
			"<bill_id>"+fbill_id+"</bill_id>" +
			"<supplier_name>"+fname+"</supplier_name>" +
			"<bill_date>"+fbill_date+"</bill_date>" +
			"<entry_date>"+fentry_date+"</entry_date>" +
			"<amount></amount>" +
			"</supplier_bills>";

		var data_array=['product_name','batch','price','expiry','quantity'];
	my_array_to_csv(data_array);
};

/**
* @form Select Templates
* @formNo 54
*/
function form54_import_template()
{
	var columns="<user_preferences>" +
			"<id>"+fid+"</id>" +
			"<display_name>"+fname+"</display_name>" +
			"<value></value>" +
			"<status>active</status>" +
			"<type>template</type>" +
			"</user_preferences>";

		var data_array=['product_name','batch','price','expiry','quantity'];
	my_array_to_csv(data_array);
};

/**
* @form Virtual Store
* @formNo 55
*/
function form55_import_template()
{
	var utilization="<area_utilization>" +
			"<id>"+fid+"</id>" +
			"<product_name>"+fname+"</product_name>" +
			"<name></name>" +
			"<batch>"+fbatch+"</batch>" +
			"<quantity></quantity>" +
			"</area_utilization>";

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
			
}

/**
* @form Expense Register
* @formNo 56
*/
function form56_import_template()
{
	var columns="<expenses>" +
			"<id>"+fid+"</id>" +
			"<expense_date>"+fdate+"</expense_date>" +
			"<to_acc>"+faccount+"</to_acc>" +
			"<description></description>" +
			"<amount></amount>" +
			"</expenses>";

		var data_array=['product_name','batch','price','expiry','quantity'];
	my_array_to_csv(data_array);
};

/**
* @form manage services
* @formNo 57
*/
function form57_import_template()
{
	var columns="<services>" +
			"<id>"+fid+"</id>" +
			"<name>"+fservices+"</name>" +
			"<description></description>" +
			"<price></price>" +
			"<warranty></warranty>" +
			"<tags></tags>" +
			"<duration></duration>" +
			"</services>";

	var data_array=['product_name','batch','price','expiry','quantity'];
	my_array_to_csv(data_array);
};

/**
* @form Service pre-requisites
* @formNo 58
*/
function form58_import_template()
{
	var columns="<pre_requisites>" +
			"<id>"+fid+"</id>" +
			"<name>"+fservices+"</name>" +
			"<type>service</type>" +
			"<requisite_type>"+ftype+"</requisite_type>" +
			"<requisite_name>"+frequisite+"</requisite_name>" +
			"<quantity></quantity>" +
			"</pre_requisites>";

	var data_array=['product_name','batch','price','expiry','quantity'];
	my_array_to_csv(data_array);
};

/**
* @form product pre-requisites
* @formNo 59
*/
function form59_import_template()
{
	var columns="<pre_requisites>" +
			"<id>"+fid+"</id>" +
			"<name>"+fproduct+"</name>" +
			"<type>product</type>" +
			"<requisite_type>"+ftype+"</requisite_type>" +
			"<requisite_name>"+frequisite+"</requisite_name>" +
			"<quantity></quantity>" +
			"</pre_requisites>";

	var data_array=['product_name','batch','price','expiry','quantity'];
	my_array_to_csv(data_array);
};


/**
* @form Product Categories
* @formNo 60
*/
function form60_import_template()
{
	var columns="<categories>" +
			"<id>"+fid+"</id>" +
			"<name>"+fproduct+"</name>" +
			"<type>product</type>" +
			"<category>"+fcategory+"</category>" +
			"</categories>";

	var data_array=['product_name','batch','price','expiry','quantity'];
	my_array_to_csv(data_array);
};

/**
* @form Service Categories
* @formNo 61
*/
function form61_import_template()
{
	var columns="<categories>" +
			"<id>"+fid+"</id>" +
			"<name>"+fservice+"</name>" +
			"<type>service</type>" +
			"<category>"+fcategory+"</category>" +
			"</categories>";

	var data_array=['product_name','batch','price','expiry','quantity'];
	my_array_to_csv(data_array);
};

/**
* @form Product reviews
* @formNo 62
*/
function form62_import_template()
{
	var columns="<reviews>" +
			"<id>"+fid+"</id>" +
			"<name>"+fproduct+"</name>" +
			"<type>product</type>" +
			"<reviewer>"+freviewer+"</reviewer>" +
			"<detail></detail>" +
			"<rating>"+frating+"</rating>" +
			"</reviews>";
	var data_array=['product_name','batch','price','expiry','quantity'];
	my_array_to_csv(data_array);
};

/**
* @form Service reviews
* @formNo 63
*/
function form63_import_template()
{
	var columns="<reviews>" +
			"<id>"+fid+"</id>" +
			"<name>"+fservice+"</name>" +
			"<type>service</type>" +
			"<reviewer>"+freviewer+"</reviewer>" +
			"<detail></detail>" +
			"<rating>"+frating+"</rating>" +
			"</reviews>";

	var data_array=['product_name','batch','price','expiry','quantity'];
	my_array_to_csv(data_array);
};

/**
* @form Service Cross sells
* @formNo 64
*/
function form64_import_template()
{
	var columns="<cross_sells>" +
			"<id>"+fid+"</id>" +
			"<name>"+fservice+"</name>" +
			"<type>service</type>" +
			"<cross_type>"+ftype+"</cross_type>" +
			"<cross_name>"+fcross+"</cross_name>" +
			"</cross_sells>";
	var data_array=['product_name','batch','price','expiry','quantity'];
	my_array_to_csv(data_array);
};

/**
* @form Service Taxes
* @formNo 65
*/
function form65_import_template()
{
	var columns="<services>" +
			"<id>"+fid+"</id>" +
			"<name>"+fservice+"</name>" +
			"<taxable>"+ftaxable+"</taxable>" +
			"<tax></tax>" +
			"</services>";

	var data_array=['product_name','batch','price','expiry','quantity'];
	my_array_to_csv(data_array);
};


/**
* @form Cross sells
* @formNo 66
*/
function form66_import_template()
{
	var columns="<cross_sells>" +
			"<id>"+fid+"</id>" +
			"<name>"+fproduct+"</name>" +
			"<type>product</type>" +
			"<cross_type>"+ftype+"</cross_type>" +
			"<cross_name>"+fcross+"</cross_name>" +
			"</cross_sells>";

	var data_array=['product_name','batch','price','expiry','quantity'];
	my_array_to_csv(data_array);
};


/**
* @form Product dimensions
* @formNo 67
*/
function form67_import_template()
{
	var columns="<product_master>" +
			"<id>"+fid+"</id>" +
			"<name>"+fproduct+"</name>" +
			"<weight></weight>" +
			"<length></length>" +
			"<width></width>" +
			"<height></height>" +
			"</product_master>";

	var data_array=['product_name','batch','price','expiry','quantity'];
	my_array_to_csv(data_array);
};

/**
* @form Product Taxes
* @formNo 68
*/
function form68_import_template()
{
	var columns="<product_master>" +
			"<id>"+fid+"</id>" +
			"<name>"+fproduct+"</name>" +
			"<taxable>"+ftaxable+"</taxable>" +
			"<tax></tax>" +
			"</product_master>";
	var data_array=['product_name','batch','price','expiry','quantity'];
	my_array_to_csv(data_array);
};

