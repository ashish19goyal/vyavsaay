/**
* @form Update Inventory
* @formNo 1
*/
function form1_import_template()
{
	var data_array=['id','product_name','batch','expiry','manufacture_date','actual_quantity','mrp'];
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
	                'address','pincode','city','state','country','address_status','username'];
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
	var data_array=['id','type','acc_name','total_amount','paid_amount','status','date','source_info','due_date','mode','bill_id'];
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
	var data_array=['id','return_id','item_name','item_desc','quantity','refund_amount','exchange_batch',
	                'saleable','type','batch','tax'];
	my_array_to_csv(data_array);
};

/**
* @form Manage Customer Returns
* @formNo 16
* @table customer_returns
*/
function form16_import_template()
{
	var data_array=['id','order_num','order_id','channel','customer','return_date','total','tax','transaction_id','status'];
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
	var data_array=['id','order_id','item_name','item_desc','supplier_sku','quantity','make','mrp','price','amount','tax','total'];
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
	var data_array=['id','bill_num','customer_name','bill_date','amount','total','type','billing_type','offer','discount','tax','transaction_id'];
	my_array_to_csv(data_array);
};

/**
* @form manage purchase order
* @formNo 43
* @table purchase_orders
*/
function form43_import_template()
{
	var data_array=['id','order_num','order_date','supplier','status','amount','tax','total'];
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
	var data_array=['id','order_id','item_name','item_desc','channel_sku','vendor_sku','quantity','mrp','price','amount','tax','freight','total'];
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
	var data_array=['id','bill_id','item_name','quantity','unit_price','amount',
	                'total','discount','tax'];
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
	var data_array=['id','bill_id','item_name','item_desc','quantity','unit_price','mrp','amount',
	                'total','freight','batch','tax','storage'];
	my_array_to_csv(data_array);
};

/**
* @form Manage Bills(multi-register)
* @formNo 92
* @table bills
*/
function form92_import_template()
{
	var data_array=['id','bill_num','customer_name','bill_date','amount','total','type','billing_type','offer','discount','tax','tax_rate','transaction_id'];
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
	var data_array=['id','product_name','batch','quantity','storage'];
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
	var data_array=['id','order_num','customer_name','order_date','channel','status','amount','tax','freight','total'];
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
* @form Add sale challans
* @formNo 112
*/
function form112_import_template()
{
	var data_array=['id','customer','item_name','item_desc','batch','quantity','sale_date','mrp','unit_price','amount','tax','total','storage','bill_status','picked_status'];
	my_array_to_csv(data_array);
};

/**
* @form Manage sale challans
* @formNo 113
*/
function form113_import_template()
{
	var data_array=['id','customer','item_name','item_desc','batch','quantity','sale_date','mrp','unit_price','amount','tax','total','storage','bill_status','picked_status'];
	my_array_to_csv(data_array);
};

/**
* @form Add purchase challans
* @formNo 114
*/
function form114_import_template()
{
	var data_array=['id','supplier','item_name','item_desc','batch','quantity','purchase_date','unit_price','amount','tax','total','storage','put_away_status','bill_status'];
	my_array_to_csv(data_array);
};

/**
* @form Manage purchase challans
* @formNo 115
*/
function form115_import_template()
{
	var data_array=['id','supplier','item_name','item_desc','batch','quantity','purchase_date','unit_price','amount','tax','total','storage','put_away_status','bill_status'];
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
	var data_array=['id','quantity','product_name','item_desc','batch','bill_id','mrp','unit_price',
					'amount','tax','cst','total','qc','qc_comments','storage','put_away_status'];
	my_array_to_csv(data_array);
};

/**
* @form Mandatory Attributes
* @formNo 123
* @table mandatory_attributes
*/
function form123_import_template()
{
	var data_array=['id','object','attribute','values','status'];
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

/**
* @form Customer Accounts
* @formNo 125
* @table accounts
*/
function form125_import_template()
{
	var data_array=['id','username','acc_name','description','type','status'];
	my_array_to_csv(data_array);
};

/**
* @form Enter supplier bill (wholesale)
* @formNo 136
* @table supplier_bill_items
*/
function form136_import_template()
{
	var data_array=['id','p_quantity','f_quantity','quantity','product_name','batch',
	               'bill_id','unit_price','amount','tax','total','storage'];
	my_array_to_csv(data_array);
};

/**
* @form Project Expenses
* @formNo 137
* @table expenses
*/
function form137_import_template()
{
	var data_array=['id','status','person','amount','detail','expense_date','source','source_id'];
	my_array_to_csv(data_array);
};

/**
* @form Customer Profiling
* @formNo 139
* @table expenses
*/
function form139_import_template()
{
	var data_array=['id','name','type','owner','owner_type','description','location','area','floors','notes'];
	my_array_to_csv(data_array);
};

/**
* @form Customer Profiling
* @formNo 140
* @table expenses
*/
function form140_import_template()
{
	var data_array=['id','name','type','owner','owner_type','description','location','area','floors','notes'];
	my_array_to_csv(data_array);
};


/**
* @form Create Questionnaire
* @formNo 142
* @table ques_fields
*/
function form142_import_template()
{
	var data_array=['id','ques_id','name','display_name','type','fvalues',
	                'forder','freq','description'];
	my_array_to_csv(data_array);
};

/**
* @form Manage Questionnaire
* @formNo 143
* @table ques_struct
*/
function form143_import_template()
{
	var data_array=['id','name','display_name','func','description','status'];
	my_array_to_csv(data_array);
};

/**
* @form Store Movement
* @formNo 145
* @table ques_fields
*/
function form145_import_template()
{
	var data_array=['id','item_name','batch','quantity','source','target',
	                'status','dispatcher','receiver'];
	my_array_to_csv(data_array);
};

/**
* @form Manufacturing
* @formNo 146
*/
function form146_import_template()
{
	var data_array=['id','product','batch','quantity','status','schedule'];
	my_array_to_csv(data_array);
};

/**
* @form Manage Roles
* @formNo 147
*/
function form147_import_template()
{
	var data_array=['id','role_name','description','status'];
	my_array_to_csv(data_array);
};

/**
* @form Assign Roles
* @formNo 149
*/
function form149_import_template()
{
	var data_array=['id','role_name','username','status'];
	my_array_to_csv(data_array);
};

/**
* @form Create Bill (DLM)
* @formNo 154
*/
function form154_import_template()
{
	var data_array=['id','bill_id','item_name','quantity','unit','unit_price','amount','from_date','to_date','storage','hired','fresh'];
	my_array_to_csv(data_array);
};

/**
* @form Update Inventory (DLM)
* @formNo 155
*/
function form155_import_template()
{
	var data_array=['id','product_name','cost_price','sale_price','manufacture_date','mrp','actual_quantity'];
	my_array_to_csv(data_array);
};

/**
* @form Store Placement (DLM)
* @formNo 156
*/
function form156_import_template()
{
	var data_array=['id','item_name','name'];
	my_array_to_csv(data_array);
};

/**
* @form Store Movement (DLM)
* @formNo 157
*/
function form157_import_template()
{
	var data_array=['id','item_name','quantity','source','target',
	                'status','dispatcher','receiver'];
	my_array_to_csv(data_array);
};

/**
* @form Enter Purchase bill (DLM)
* @formNo 158
* @table supplier_bill_items
*/
function form158_import_template()
{
	var data_array=['id','quantity','product_name',
	               'bill_id','unit_price','amount','tax','total','storage'];
	my_array_to_csv(data_array);
};

/**
* @form Checklist items
* @formNo 161
*/
function form161_import_template()
{
	var data_array=['id','checkpoint','desired_result','status'];
	my_array_to_csv(data_array);
};

/**
* @form Checklist mapping
* @formNo 162
*/
function form162_import_template()
{
	var data_array=['id','checkpoint','desired_result','item'];
	my_array_to_csv(data_array);
};

/**
* @form Manage sale prices
* @formNo 166
*/
function form166_import_template()
{
	var data_array=['id','product_name','batch','cost_price','sales_price','mrp'];
	my_array_to_csv(data_array);
};

/**
* @form Storage Structure
* @formNo 167
* @table storage_structure
*/
function form167_import_template()
{
	var data_array=['id','name','parent','length','breadth','height','unit'];
	my_array_to_csv(data_array);
};

/**
* @form Manage Products (Nikki)
* @formNo 169
*/
function form169_import_template()
{
	var data_array=['id','sku','name','brand','tax','bar_code','length','breadth','height','volume','unit','weight','packing'];
	my_array_to_csv(data_array);
};


/**
* @form Store Areas (Nikki)
* @formNo 170
*/
function form170_import_template()
{
	var data_array=['id','name','parent','owner','area_type','height','breadth','length','unit'];
	my_array_to_csv(data_array);
};

/**
* @form Manage Channels
* @formNo 171
*/
function form171_import_template()
{
	var data_array=['id','name','details','dead_weight_factor'];
	my_array_to_csv(data_array);
};

/**
* @form Pricing Sheet
* @formNo 172
*/
function form172_import_template()
{
	var data_array=['id','channel','item','sale_price','freight','discount_customer','gateway_charges','storage_charges','total_charges','service_tax','total_payable','total_receivable','profit_mrp','profit_sp','profit','from_time','to_time','latest'];
	my_array_to_csv(data_array);
};

/**
* @form SKU mapping
* @formNo 173
*/
function form173_import_template()
{
	var data_array=['id','channel','channel_sku','vendor_sku','system_sku','item_desc'];
	my_array_to_csv(data_array);
};

/**
* @form Pickup Charges
* @formNo 174
*/
function form174_import_template()
{
	var data_array=['id','channel','pincode','minimum','maximum','weight_rate'];
	my_array_to_csv(data_array);
};

/**
* @form Channel Categories
* @formNo 175
*/
function form175_import_template()
{
	var data_array=['id','channel','type','name','parent','commission'];
	my_array_to_csv(data_array);
};

/**
* @form Category Item mapping
* @formNo 176
*/
function form176_import_template()
{
	var data_array=['id','channel','cat_type','cat_name','sku'];
	my_array_to_csv(data_array);
};

/**
* @form Prioritization Parameters
* @formNo 177
*/
function form177_import_template()
{
	var data_array=['id','name','type','values','threshold'];
	my_array_to_csv(data_array);
};

/**
* @form create Purchase Order
* @formNo 178
* @table purchase_order_items
*/
function form178_import_template()
{
	var data_array=['id','order_id','item_name','quantity','make','mrp','price','amount','tax','total'];
	my_array_to_csv(data_array);
};

/**
* @form manage purchase order
* @formNo 179
* @table purchase_orders
*/
function form179_import_template()
{
	var data_array=['id','order_num','order_date','priority','supplier','status','amount','tax','total'];
	my_array_to_csv(data_array);
};

/**
* @form Create sale order (CPS)
* @formNo 180
* @table sale_order_items
*/
function form180_import_template()
{
	var data_array=['id','order_id','item_name','item_desc','quantity','mrp','price','amount','tax','total'];
	my_array_to_csv(data_array);
};

/**
* @form Manage sale order (CPS)
* @formNo 181
* @table sale_orders
*/
function form181_import_template()
{
	var data_array=['id','customer_name','order_num','order_date','type','status'];
	my_array_to_csv(data_array);
};

/**
* @form Production Steps
* @formNo 184
*/
function form184_import_template()
{
	var data_array=['id','name','details','time_estimate','default_assignee','order_no','type','status'];
	my_array_to_csv(data_array);
};


/**
* @form Testing Steps
* @formNo 187
*/
function form187_import_template()
{
	var data_array=['id','name','details','time_estimate','default_assignee','order_no','status'];
	my_array_to_csv(data_array);
};

/**
* @form Orders (laundry)
* @formNo 190
*/
function form190_import_template()
{
	var data_array=['id','customer_name','notes','order_date','assignee','status','address'];
	my_array_to_csv(data_array);
};

/**
* @form Manage Values List
* @formNo 191
*/
function form191_import_template()
{
	var data_array=['id','tablename','listname','name','status'];
	my_array_to_csv(data_array);
};

/**
* @form Letterhead
* @formNo 195
*/
function form195_import_template()
{
	var data_array=['id','name','date','receiver','subject','salutation','content','signature','footer'];
	my_array_to_csv(data_array);
};

/**
* @form Supplier Item Mapping
* @formNo 197
*/
function form197_import_template()
{
	var data_array=['id','item','supplier'];
	my_array_to_csv(data_array);
};

/**
* @form Manage DRS
* @formNo 201
*/
function form201_import_template()
{
	var data_array=['id','drs_num','employee','drs_time','status','type','collectable_amount','collected_amount'];
	my_array_to_csv(data_array);
};

/**
* @form Logistics orders
* @formNo 203
*/
function form203_import_template()
{
	var data_array=['id','AWB No.','Type','Order No.','Manifest ID','Merchant Name','Ship To','Address1','Address2','City','State','Pincode','Mobile number','Tel. Number','Prod/SKU code','Product name','Weight','Declared Value','Collectable Value','Vendor Code','Shipper Name','Return Address1','Return Address2','Return Address3','Return Pin','Length ( Cms )','Breadth ( Cms )','Height ( Cms )','Pieces','Carrier Account','Carrier Name','Manifest Type','Dispatch Date','Notes','Pickup Location','Pickup By'];
	my_array_to_csv(data_array);
};

/**
* @form Sale leads (followup)
* @formNo 213
*/
function form213_import_template()
{
	var data_array=['id','customer','detail','due_date','identified_by'];
	my_array_to_csv(data_array);
};

/**
* @form SKU Mapping (Supplier)
* @formNo 217
*/
function form217_import_template()
{
	var data_array=['id','item','item_desc','supplier_sku','margin','supplier'];
	my_array_to_csv(data_array);
};

/**
* @form manage Projects (CPS)
* @formNo 220
* @table projects
*/
function form220_import_template()
{
	var data_array=['id','name','details','priority','start_date','status'];
	my_array_to_csv(data_array);
};

/**
* @form Timesheet
* @formNo 221
* @table Timesheet
*/
function form221_import_template()
{
	var data_array=['id','acc_name','project','date','hours_worked'];
	my_array_to_csv(data_array);
};
