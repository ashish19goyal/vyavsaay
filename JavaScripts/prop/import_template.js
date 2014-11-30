/**
* @form Update Inventory
* @formNo 1
*/
function form1_import_template()
{
	var data_array=['id','product_name','batch','cost_price','sale_price','expiry'];
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
	                'address','pincode','city','state','country','address_status'];
	my_array_to_csv(data_array);
};


/**
* @form Manage Payments
* @formNo 11
*/
function form11_import_template()
{
	var data_array=['id','type','acc_name','total_amount','paid_amount','status','date','due_date','mode','bill_id'];
	my_array_to_csv(data_array);
};


/**
* @form Manage Tasks
* @formNo 14
*/
function form14_import_template()
{
	var data_array=['id','name','description','assignee','t_due','task_hours','t_initiated','status'];
	my_array_to_csv(data_array);
};

/**
* @form Manage Customers
* @formNo 30
*/
function form30_import_template()
{
	var data_array=['id','name','phone','email','status','acc_name','notes',
	                'address','pincode','city','state','country','address_status'];
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
	var data_array=['id','item_name','batch','name'];
	my_array_to_csv(data_array);
};


/**
* @form Manage Products
* @formNo 39
*/
function form39_import_template()
{
	var data_array=['id','name','make','description','tax','bar_code'];
	my_array_to_csv(data_array);
};


/**
* @form Manage suppliers
* @formNo 40
*/
function form40_import_template()
{
	var data_array=['id','name','phone','email','notes','acc_name',
	                'address','pincode','city','state','country','address_status'];
	my_array_to_csv(data_array);
};


/**
* @form Cash Register
* @formNo 56
*/
function form56_import_template()
{
	var data_array=['id','type','acc_name','amount','notes'];
	my_array_to_csv(data_array);
};

/**
* @form manage services
* @formNo 57
*/
function form57_import_template()
{
	var data_array=['id','name','description','price','duration','tax'];
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
* @form Product Attributes
* @formNo 60
*/
function form60_import_template()
{
	var data_array=['id','name','type','attribute','value'];
	my_array_to_csv(data_array);
};

/**
* @form Service Attributes
* @formNo 61
*/
function form61_import_template()
{
	var data_array=['id','name','type','attribute','value'];
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
* @form Product Cross sells
* @formNo 66
*/
function form66_import_template()
{
	var data_array=['id','name','type','cross_type','cross_name'];
	my_array_to_csv(data_array);
};



/**
* @form Manage accounts
* @formNo 71
*/
function form71_import_template()
{
	var data_array=['id','acc_name','description','type'];
	my_array_to_csv(data_array);
};

/**
* @form Manage task types
* @formNo 79
*/
function form79_import_template()
{
	var data_array=['id','name','description','est_hours'];
	my_array_to_csv(data_array);
};

/**
* @form Sale leads
* @formNo 81
*/
function form81_import_template()
{
	var data_array=['id','customer','detail','due_date','identified_by'];
	my_array_to_csv(data_array);
};

/**
* @form Store Areas
* @formNo 83
*/
function form83_import_template()
{
	var data_array=['id','name','area_type','height','width','length','locx','locy','locz','storey','color','loc_type','faceEast','faceWest','faceNorth','faceSouth'];
	my_array_to_csv(data_array);
};

/**
* @form Manage Subscriptions
* @formNo 84
*/
function form84_import_template()
{
	var data_array=['id','customer','service','status','notes','last_bill_id','last_bill_date','next_due_date'];
	my_array_to_csv(data_array);
};

/**
* @form Manage Products
* @formNo 87
*/
function form87_import_template()
{
	var data_array=['id','name','make','description','tax','bar_code'];
	my_array_to_csv(data_array);
};
