/**
* @form Update Inventory
* @formNo 1
*/
function form1_import_template()
{
	var data_array=['id','product_name','batch','price','expiry','quantity'];
	my_array_to_csv(data_array);
};


/**
* @form Manage Assets
* @formNo 5
*/
function form5_import_template()
{
	var data_array=['id','name','type','description','date_inc','ownership_type','ownership_contract','make','maintained_by',
	                'maintenance_contract','maintenance_activities','initial_value','current_value','asset_location'];
	my_array_to_csv(data_array);
};


/**
* @form Manage Staff
* @formNo 8
*/
function form8_import_template()
{
	var data_array=['id','name','phone','email','status','joining_date','qualification',
	                'skills','fixed_comp','variable_comp_rate','monthly_hours','allowed_pto','acc_name',
	                'address','street','city','state','country','address_status'];
	my_array_to_csv(data_array);
};


/**
* @form Manage Payments
* @formNo 11
*/
function form11_import_template()
{
	var data_array=['id','type','transaction_id','total_amount','paid_amount','acc_name','due_date','status','date'];
	my_array_to_csv(data_array);
};


/**
* @form Manage Tasks
* @formNo 14
*/
function form14_import_template()
{
	var data_array=['id','name','description','assignee','t_due','task_hours','t_executed','t_initiated','status'];
	my_array_to_csv(data_array);
};

/**
* @form Manage Customers
* @formNo 30
*/
function form30_import_template()
{
	var data_array=['id','name','phone','email','status','acc_name','notes',
	                'address','street','city','state','country','address_status'];
	my_array_to_csv(data_array);
};


/**
* @form Manage Offers
* @formNo 35
*/
function form35_import_template()
{
	var data_array=['id','offer_name','offer_type','end_date','offer_detail','status',
	                'product_name','batch','service','criteria_type','criteria_amount','criteria_quantity',
	                'result_type','discount_percent','discount_amount','quantity_add_percent','quantity_add_amount',
	                'free_product_name','free_product_quantity'];
	my_array_to_csv(data_array);
};


/**
* @form Store Placement
* @formNo 38
*/
function form38_import_template()
{
	var data_array=['id','product_name','batch','name','quantity'];
	my_array_to_csv(data_array);
};


/**
* @form Manage Products
* @formNo 39
*/
function form39_import_template()
{
	var data_array=['id','name','make','description','manufactured','unit','tags','taxable','tax',
	                'weight','height','length','width'];
	my_array_to_csv(data_array);
};


/**
* @form Manage suppliers
* @formNo 40
*/
function form40_import_template()
{
	var data_array=['id','name','phone','email','notes','acc_name',
	                'address','street','city','state','country','address_status'];
	my_array_to_csv(data_array);
};


/**
* @form Expense Register
* @formNo 56
*/
function form56_import_template()
{
	var data_array=['id','expense_date','to_acc','description','amount'];
	my_array_to_csv(data_array);
};

/**
* @form manage services
* @formNo 57
*/
function form57_import_template()
{
	var data_array=['id','name','description','price','warranty','tags','duration','taxable','tax'];
	my_array_to_csv(data_array);
};

/**
* @form Service pre-requisites
* @formNo 58
*/
function form58_import_template()
{
	var data_array=['id','name','requisite_type','requisite_name','quantity','type'];
	my_array_to_csv(data_array);
};

/**
* @form product pre-requisites
* @formNo 59
*/
function form59_import_template()
{
	var data_array=['id','name','requisite_type','requisite_name','quantity','type'];
	my_array_to_csv(data_array);
};


/**
* @form Product Categories
* @formNo 60
*/
function form60_import_template()
{
	var data_array=['id','name','category','type'];
	my_array_to_csv(data_array);
};

/**
* @form Service Categories
* @formNo 61
*/
function form61_import_template()
{
	var data_array=['id','name','category','type'];
	my_array_to_csv(data_array);
};

/**
* @form Product reviews
* @formNo 62
*/
function form62_import_template()
{
	var data_array=['id','name','type','reviewer','detail','rating'];
	my_array_to_csv(data_array);
};

/**
* @form Service reviews
* @formNo 63
*/
function form63_import_template()
{
	var data_array=['id','name','type','reviewer','detail','rating'];
	my_array_to_csv(data_array);
};

/**
* @form Service Cross sells
* @formNo 64
*/
function form64_import_template()
{
	var data_array=['id','name','type','cross_type','cross_name'];
	my_array_to_csv(data_array);
};

/**
* @form Service Taxes
* @formNo 65
*/
function form65_import_template()
{
	var data_array=['id','name','taxable','tax'];
	my_array_to_csv(data_array);
};


/**
* @form Product Cross sells
* @formNo 66
*/
function form66_import_template()
{
	var data_array=['id','name','type','cross_type','cross_name'];
	my_array_to_csv(data_array);
};


/**
* @form Product dimensions
* @formNo 67
*/
function form67_import_template()
{
	var data_array=['id','name','weight','length','width','height'];
	my_array_to_csv(data_array);
};

/**
* @form Product Taxes
* @formNo 68
*/
function form68_import_template()
{
	var data_array=['id','name','taxable','tax'];
	my_array_to_csv(data_array);
};

/**
* @form Manage financial accounts
* @formNo 71
*/
function form71_import_template()
{
	var data_array=['id','acc_name','description','type'];
	my_array_to_csv(data_array);
};
