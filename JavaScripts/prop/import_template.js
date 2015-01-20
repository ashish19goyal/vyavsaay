/**
* @form Update Inventory
* @formNo 1
*/
function form1_import_template()
{
	var data_array=['id','product_name','batch','cost_price','sale_price','expiry','manufacture_date','mrp','actual_quantity'];
	my_array_to_csv(data_array);
};

/**
* @form Manage Assets
* @formNo 5
*/
function form5_import_template()
{
	var data_array=['id','name','type','description'];
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
* @form Create Service Bills
* @formNo 10
* @table bill_items
*/
function form10_import_template()
{
	var data_array=['id','bill_id','item_name','quantity','unit_price','mrp','amount',
	                'total','discount','offer','type','batch','notes',
	                'staff','tax','free_with'];
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
* @form Create Product Bills
* @formNo 12
* @table bill_items
*/
function form12_import_template()
{
	var data_array=['id','bill_id','item_name','quantity','unit_price','mrp','amount',
	                'total','discount','offer','type','batch','notes',
	                'staff','tax','free_with'];
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
* @form Enter Customer Returns
* @formNo 15
* @table customer_return_items
*/
function form15_import_template()
{
	var data_array=['id','return_id','item_name','quantity','refund_amount','exchange_batch',
	                'saleable','type','batch','notes','tax'];
	my_array_to_csv(data_array);
};

/**
* @form Manage Customer Returns
* @formNo 16
* @table customer_returns
*/
function form16_import_template()
{
	var data_array=['id','customer','return_date','total','type','tax','transaction_id'];
	my_array_to_csv(data_array);
};

/**
* @form Manage Supplier Returns
* @formNo 17
* @table supplier_returns
*/
function form17_import_template()
{
	var data_array=['id','supplier','return_date','total','type','tax','transaction_id'];
	my_array_to_csv(data_array);
};

/**
* @form Enter Supplier Returns
* @formNo 19
* @table supplier_return_items
*/
function form19_import_template()
{
	var data_array=['id','return_id','item_name','quantity','refund_amount',
	                'saleable','batch','notes','tax'];
	my_array_to_csv(data_array);
};


/**
* @form Enter supplier bill
* @formNo 21
* @table supplier_bill_items
*/
function form21_import_template()
{
	var data_array=['id','p_quantity','f_quantity','quantity','product_name','batch',
	               'bill_id','unit_price','amount','tax','total','storage'];
	my_array_to_csv(data_array);
};

/**
* @form create Purchase Order
* @formNo 24
* @table purchase_order_items
*/
function form24_import_template()
{
	var data_array=['id','order_id','product_name','quantity','make','price'];
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
* @form Manage Bills
* @formNo 42
* @table bills
*/
function form42_import_template()
{
	var data_array=['id','customer_name','bill_date','amount','total','type','billing_type','offer','discount','tax','transaction_id'];
	my_array_to_csv(data_array);
};

/**
* @form manage purchase order
* @formNo 43
* @table purchase_orders
*/
function form43_import_template()
{
	var data_array=['id','order_date','supplier','status','notes'];
	my_array_to_csv(data_array);
};

/**
* @form Manage supplier bill
* @formNo 53
* @table supplier_bills
*/
function form53_import_template()
{
	var data_array=['id','bill_id','supplier','bill_date','entry_date','amount',
	                'discount','tax','total','transaction_id','notes'];
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
	var data_array=['id','name','attribute','value'];
	my_array_to_csv(data_array);
};

/**
* @form Service Attributes
* @formNo 61
*/
function form61_import_template()
{
	var data_array=['id','name','attribute','value'];
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
* @form Create sale order
* @formNo 69
* @table sale_order_items
*/
function form69_import_template()
{
	var data_array=['id','order_id','item_name','quantity','notes'];
	my_array_to_csv(data_array);
};

/**
* @form Manage sale order
* @formNo 70
* @table sale_orders
*/
function form70_import_template()
{
	var data_array=['id','customer_name','order_date','type','status'];
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
* @form Create Bills
* @formNo 72
* @table bill_items
*/
function form72_import_template()
{
	var data_array=['id','bill_id','item_name','quantity','unit_price','mrp','amount',
	                'total','discount','offer','type','batch','notes',
	                'staff','tax','free_with'];
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
* @form Scan items
* @formNo 82
* @table bill_items
*/
function form82_import_template()
{
	var data_array=['id','bill_id','item_name','quantity','unit_price','mrp','amount',
	                'total','discount','offer','type','batch','notes',
	                'staff','tax','free_with'];
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

/**
* @form Manufacturing Schedule
* @formNo 88
*/
function form88_import_template()
{
	var data_array=['id','product','process_notes','status','schedule','iteration_notes'];
	my_array_to_csv(data_array);
};

/**
* @form Appointments
* @formNo 89
* @table appointments
*/
function form89_import_template()
{
	var data_array=['id','customer','schedule','status','assignee','hours','notes'];
	my_array_to_csv(data_array);
};


/**
* @form Billing types
* @formNo 90
*/
function form90_import_template()
{
	var data_array=['id','name','notes'];
	my_array_to_csv(data_array);
};

/**
* @form Create bills(multiple registers)
* @formNo 91
* @table bill_items
*/
function form91_import_template()
{
	var data_array=['id','bill_id','item_name','quantity','unit_price','mrp','amount',
	                'total','discount','offer','type','batch','notes',
	                'staff','tax','free_with'];
	my_array_to_csv(data_array);
};

/**
* @form Manage Bills(multi-register)
* @formNo 92
* @table bills
*/
function form92_import_template()
{
	var data_array=['id','customer_name','bill_date','amount','total','type','billing_type','offer','discount','tax','transaction_id'];
	my_array_to_csv(data_array);
};


/**
* @form Manage Loans
* @formNo 93
*/
function form93_import_template()
{
	var data_array=['id','type','account','date_initiated','loan_amount','repayment_method',
	                'interest_paid','interest_rate','interest_period','next_interest_date','interest_type',
	                'emi','emi_period','next_emi_date','pending_emi','status'];
	my_array_to_csv(data_array);
};

/**
* @form Discard Items
* @formNo 94
*/
function form94_import_template()
{
	var data_array=['id','product_name','batch','quantity'];
	my_array_to_csv(data_array);
};

/**
* @form Customer Attributes
* @formNo 96
*/
function form96_import_template()
{
	var data_array=['id','name','attribute','value'];
	my_array_to_csv(data_array);
};

/**
* @form Supplier Attributes
* @formNo 97
*/
function form97_import_template()
{
	var data_array=['id','name','attribute','value'];
	my_array_to_csv(data_array);
};

/**
* @form staff Attributes
* @formNo 98
*/
function form98_import_template()
{
	var data_array=['id','name','attribute','value'];
	my_array_to_csv(data_array);
};

/**
* @form manage Projects
* @formNo 101
* @table projects
*/
function form101_import_template()
{
	var data_array=['id','name','details','start_date','status'];
	my_array_to_csv(data_array);
};

/**
* @form Project Team
* @formNo 102
* @table project_team
*/
function form102_import_template()
{
	var data_array=['id','project_id','member','notes','role','status'];
	my_array_to_csv(data_array);
};

/**
* @form Project Phases
* @formNo 103
* @table project_phases
*/
function form103_import_template()
{
	var data_array=['id','project_id','phase_name','details','start_date','due_date','status'];
	my_array_to_csv(data_array);
};

/**
* @form Project Tasks
* @formNo 104
*/
function form104_import_template()
{
	var data_array=['id','name','project_id','description','assignee','t_due','task_hours','t_initiated','status'];
	my_array_to_csv(data_array);
};


/**
* @form Manage sale order (multi-register)
* @formNo 108
* @table sale_orders
*/
function form108_import_template()
{
	var data_array=['id','customer_name','order_date','type','status'];
	my_array_to_csv(data_array);
};

/**
* @form Asset Attributes
* @formNo 109
*/
function form109_import_template()
{
	var data_array=['id','name','attribute','value'];
	my_array_to_csv(data_array);
};

/**
* @form Add unbilled sale items
* @formNo 112
*/
function form112_import_template()
{
	var data_array=['id','customer','item_name','batch','quantity','sale_date','notes'];
	my_array_to_csv(data_array);
};

/**
* @form Manage unbilled sale items
* @formNo 113
*/
function form113_import_template()
{
	var data_array=['id','customer','item_name','batch','quantity','sale_date','notes'];
	my_array_to_csv(data_array);
};

/**
* @form Add unbilled purchase items
* @formNo 114
*/
function form114_import_template()
{
	var data_array=['id','supplier','item_name','batch','quantity','purchase_date','notes'];
	my_array_to_csv(data_array);
};

/**
* @form Manage unbilled purchase items
* @formNo 115
*/
function form115_import_template()
{
	var data_array=['id','supplier','item_name','batch','quantity','purchase_date','notes'];
	my_array_to_csv(data_array);
};

/**
* @form Manage Loyalty Programs
* @formNo 116
*/
function form116_import_template()
{
	var data_array=['id','name','type','tier','tier_criteria_lower','tier_criteria_upper','points_addition',
	                'discount','redemption_criteria','cashback','reward_product','status'];
	my_array_to_csv(data_array);
};

/**
* @form Create bills(loyalty)
* @formNo 118
* @table bill_items
*/
function form118_import_template()
{
	var data_array=['id','bill_id','item_name','quantity','p_quantity','f_quantity','unit_price','mrp','amount',
	                'total','discount','offer','type','batch','notes',
	                'staff','tax','free_with'];
	my_array_to_csv(data_array);
};


/**
* @form Create bills(multiple registers, unbilled items)
* @formNo 119
* @table bill_items
*/
function form119_import_template()
{
	var data_array=['id','bill_id','item_name','quantity','p_quantity','f_quantity','unit_price','mrp','amount',
	                'total','discount','offer','type','batch','notes',
	                'staff','tax','free_with'];
	my_array_to_csv(data_array);
};

/**
* @form Manage Loyalty customers
* @formNo 120
*/
function form120_import_template()
{
	var data_array=['id','program_name','customer','tier','status'];
	my_array_to_csv(data_array);
};

/**
* @form Adjust Loyalty Points
* @formNo 121
*/
function form121_import_template()
{
	var data_array=['id','program_name','customer','points','date','source','source_id'];
	my_array_to_csv(data_array);
};

/**
* @form Enter supplier bill(unbilled items)
* @formNo 122
* @table supplier_bill_items
*/
function form122_import_template()
{
	var data_array=['id','p_quantity','f_quantity','quantity','product_name','batch',
		               'bill_id','unit_price','amount','tax','total','storage'];
	my_array_to_csv(data_array);
};

/**
* @form Mandatory Attributes
* @formNo 123
* @table mandatory_attributes
*/
function form123_import_template()
{
	var data_array=['id','object','attribute','status'];
	my_array_to_csv(data_array);
};

/**
* @form Receipts
* @formNo 124
* @table receipts
*/
function form124_import_template()
{
	var data_array=['id','receipt_id','payment_id','type','amount','acc_name','date'];
	my_array_to_csv(data_array);
};
