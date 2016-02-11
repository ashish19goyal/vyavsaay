/**
* @form Manage Products 
* @formNo 39
*/
function form39_import_validate(data_array)
{
	var validate_template_array=[{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z /_.,()-]+$')},
							{column:'make',regex:new RegExp('^[0-9a-zA-Z _.,@\'/()-]+$')},
							{column:'description',regex:new RegExp('^[0-9a-zA-Z _.,/\'+@!$()-]+$')},
							{column:'tax',required:'yes',regex:new RegExp('^[0-9.]+$')},
							{column:'bar_code',regex:new RegExp('^[a-zA-Z0-9]+$')}];
					
	var error_array=validate_import_array(data_array,validate_template_array);
	return error_array;					
}


/**
* @form Product Attributes
* @formNo 60
*/
function form60_import_validate(data_array)
{
	var validate_template_array=[{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
							{column:'attribute',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
							{column:'value',regex:new RegExp('^[0-9a-zA-Z \'_.,/:@$*#%^!()-]+$')}];
					
	var error_array=validate_import_array(data_array,validate_template_array);
	return error_array;					
}

/**
* @form Service Attributes
* @formNo 61
*/
function form61_import_validate(data_array)
{
	var validate_template_array=[{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
							{column:'attribute',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
							{column:'value',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')}];
					
	var error_array=validate_import_array(data_array,validate_template_array);
	return error_array;					
}

/**
* @form Store Areas
* @formNo 83
*/
function form83_import_validate(data_array)
{
	var validate_template_array=[{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z_.,()-]+$')},
							{column:'parent',regex:new RegExp('^[0-9a-zA-Z_.,()-]+$')},
							{column:'owner',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$()-]+$')}];
					
	var error_array=validate_import_array(data_array,validate_template_array);
	return error_array;					
}

/**
* @form Manage Products 
* @formNo 87
*/
function form87_import_validate(data_array)
{
	var validate_template_array=[{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z_.,()-]+$')},
							{column:'make',requried:'yes',regex:new RegExp('^[0-9a-zA-Z_.,@\'()-]+$')},
							{column:'description',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$()-]+$')},
							{column:'tax',required:'yes',regex:new RegExp('^[0-9.]+$')},
							{column:'bar_code',regex:new RegExp('^[a-zA-Z0-9]+$')}];
					
	var error_array=validate_import_array(data_array,validate_template_array);
	return error_array;					
}


/**
* @form Asset Attributes
* @formNo 109
*/
function form109_import_validate(data_array)
{
	var validate_template_array=[{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
							{column:'attribute',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
							{column:'value',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')}];
					
	var error_array=validate_import_array(data_array,validate_template_array);
	return error_array;					
}

/**
* @form Manage Products (nikki) 
* @formNo 169
*/
function form169_import_validate(data_array)
{
	var validate_template_array=[{column:'sku',required:'yes',regex:new RegExp('^[0-9a-zA-Z_.,()-]+$')},
							{column:'brand',required:'yes',regex:new RegExp('^[0-9a-zA-Z_ .,@\'()-]+$')},
							{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,/\'+@!$()-]+$')},
							{column:'tax',required:'yes',regex:new RegExp('^[0-9.]+$')},
							{column:'length',regex:new RegExp('^[0-9.]+$')},
							{column:'breadth',regex:new RegExp('^[0-9.]+$')},
							{column:'height',regex:new RegExp('^[0-9.]+$')},
							{column:'volume',regex:new RegExp('^[0-9.]+$')},
							{column:'weight',regex:new RegExp('^[0-9.]+$')},
							{column:'unit',regex:new RegExp('^[a-zA-Z0-9.()]+$')},
							{column:'packing',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$()-]+$')},
							{column:'bar_code',regex:new RegExp('^[a-zA-Z0-9]+$')}];
					
	var error_array=validate_import_array(data_array,validate_template_array);
	return error_array;					
}


/**
* @form Store Areas (nikki)
* @formNo 170
*/
function form170_import_validate(data_array)
{
	var validate_template_array=[{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z_.,()-]+$')},
							{column:'parent',regex:new RegExp('^[0-9a-zA-Z_.,()-]+$')},
							{column:'owner',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$()-]+$')},
							{column:'area_type',required:'yes',regex:new RegExp('^[0-9a-zA-Z_.,()-]+$')},
							{column:'length',regex:new RegExp('^[0-9.]+$')},
							{column:'width',regex:new RegExp('^[0-9.]+$')},
							{column:'height',regex:new RegExp('^[0-9.]+$')},
							{column:'unit',regex:new RegExp('^[a-zA-Z.()-]+$')}];
					
	var error_array=validate_import_array(data_array,validate_template_array);
	return error_array;					
}

/**
* @form SKU mapping
* @formNo 173
*/
function form173_import_validate(data_array)
{
	var validate_template_array=[{column:'channel_sku',required:'yes',regex:new RegExp('^[0-9a-zA-Z_.,()-]+$')},
							{column:'item_desc',regex:new RegExp('^[0-9a-zA-Z _.,/\'+@!$()-]+$')},
							{column:'system_sku',required:'yes',regex:new RegExp('^[0-9a-zA-Z_.,()-]+$')},
							{column:'channel',required:'yes',regex:new RegExp('^[0-9a-zA-Z_.,()-]+$')}];
					
	var error_array=validate_import_array(data_array,validate_template_array);
	return error_array;					
}

/**
* @form SKU mapping supplier
* @formNo 217
*/
function form217_import_validate(data_array)
{
	var validate_template_array=[{column:'item',required:'yes',regex:new RegExp('^[0-9a-zA-Z_.,()-]+$')},
							{column:'item_desc',regex:new RegExp('^[0-9a-zA-Z _.,/\'+@!$()-]+$')},
							{column:'supplier',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$()-]+$')},
							{column:'supplier_sku',regex:new RegExp('^[0-9a-zA-Z_.,()-]+$')},
							{column:'margin',required:'yes',regex:new RegExp('^[0-9.]+$')}];
					
	var error_array=validate_import_array(data_array,validate_template_array);
	return error_array;					
}

/**
* @form Manage Products (without tax) 
* @formNo 234
*/
function form234_import_validate(data_array)
{
	var validate_template_array=[{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z_.,()-]+$')},
							{column:'make',regex:new RegExp('^[0-9a-zA-Z_ .,@\'()-]+$')},
							{column:'description',regex:new RegExp('^[0-9a-zA-Z _.,/\'+@!$()-]+$')},
							{column:'mrp',required:'yes',regex:new RegExp('^[0-9.]+$')},
							{column:'cost_price',regex:new RegExp('^[0-9.]+$')},
							{column:'sale_price',regex:new RegExp('^[0-9.]+$')},
							{column:'bar_code',regex:new RegExp('^[a-zA-Z0-9]+$')}];
					
	var error_array=validate_import_array(data_array,validate_template_array);
	return error_array;					
}

/**
* @form SKU Components
* @formNo 245
*/
function form245_import_validate(data_array)
{
	var validate_template_array=[{column:'sku',required:'yes',regex:new RegExp('^[0-9a-zA-Z_.,()-]+$')},
							{column:'component_name',regex:new RegExp('^[0-9a-zA-Z _.,/\'+@!$()-]+$')},
							{column:'component_sku',required:'yes',regex:new RegExp('^[0-9a-zA-Z_.,()-]+$')},
							{column:'quantity',required:'yes',regex:new RegExp('^[0-9.]+$')}];
					
	var error_array=validate_import_array(data_array,validate_template_array);
	return error_array;					
}

/**
* @form Inventory (Spares)
* @formNo 260
*/
function form260_import_validate(data_array)
{
	var validate_template_array=[{column:'quantity',required:'yes',regex:new RegExp('^[0-9]+$')},
							{column:'item',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$#%\*()-]+$')}];
					
	var error_array=validate_import_array(data_array,validate_template_array);
	return error_array;					
}

/**
* @form bank Accounts
* @formNo 261
*/
function form261_import_validate(data_array)
{
	var validate_template_array=[{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'+!_.,()@/-]+$')},
							{column:'bank',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,/\'+@!$()-]+$')},
							{column:'branch',regex:new RegExp('^[0-9a-zA-Z _.,/\'+@!$()-]+$')},
							{column:'ifsc',regex:new RegExp('^[a-zA-Z0-9]+$')},
							{column:'account_name',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,/\'+@!$()-]+$')},
							{column:'account_num',required:'yes',regex:new RegExp('^[a-zA-Z0-9]+$')},
							{column:'status',required:'yes',list:['active','inactive']}];
					
	var error_array=validate_import_array(data_array,validate_template_array);
	return error_array;					
}


/**
* @form Enter COD Collections
* @formNo 271
*/
function form271_import_validate(data_array)
{
	var validate_template_array=[{column:'date',required:'yes',regex:new RegExp('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}')},
							{column:'acc_name',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$()-]+$')},
							{column:'amount',required:'yes',regex:new RegExp('^[0-9.]+$')}];
					
	var error_array=validate_import_array(data_array,validate_template_array);
	return error_array;					
}

/**
* @form Purchase Leads
* @formNo 273
*/
function form273_import_validate(data_array)
{
	var validate_template_array=[{column:'price',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$#%\*()-]+$')},
							{column:'identified date',regex:new RegExp('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}')},
							{column:'quantity',required:'yes',regex:new RegExp('^[0-9]+$')},
							{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$()/-]+$')},
							{column:'phone',regex:new RegExp('^[0-9 .,+()-]+$')},
							{column:'email',regex:new RegExp('^[0-9a-zA-Z_.-]+@[0-9a-zA-Z_.-]+$')},
							{column:'address',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$#%\*()/-]+$')},
							{column:'city',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$#%\*()-]+$')},
							{column:'comments',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$#%\*()/-]+$')},
							{column:'company',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$#%\*()/-]+$')},
							{column:'item',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$#%\*()/ -]+$')}];
					
	var error_array=validate_import_array(data_array,validate_template_array);
	return error_array;					
}

/**
* @form Inventory (poojaelec)
* @formNo 274
*/
function form274_import_validate(data_array)
{
	var validate_template_array=[{column:'item',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$()-]+$')},
							{column:'quantity',required:'yes',regex:new RegExp('^[0-9.-]+$')}];

	var error_array=validate_import_array(data_array,validate_template_array);
	return error_array;					
}

/**
* @form In-out
* @formNo 275
*/
function form275_import_validate(data_array)
{
	var validate_template_array=[{column:'date',required:'yes',regex:new RegExp('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}')},
							{column:'item',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$()-]+$')},
							{column:'quantity',required:'yes',regex:new RegExp('^[0-9.-]+$')},
							{column:'type',required:'yes',regex:new RegExp('^[0-9a-zA-Z_.-]+@[0-9a-zA-Z_.-]+$')},
							{column:'to/from',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$#%\*()-]+$')},
							{column:'notes',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$#%\*()-]+$')}];
					
	var error_array=validate_import_array(data_array,validate_template_array);
	return error_array;					
}

/**
* @form Inventory (Cabinets)
* @formNo 285
*/
function form285_import_validate(data_array)
{
	var validate_template_array=[{column:'quantity',required:'yes',regex:new RegExp('^[0-9]+$')},
							{column:'item',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$#%\*()-]+$')}];
					
	var error_array=validate_import_array(data_array,validate_template_array);
	return error_array;					
}

/**
* @form Buyer Leads
* @formNo 289
*/
function form289_import_validate(data_array)
{
	var validate_template_array=[{column:'price',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$#%\*()/-]+$')},
							{column:'followup date',regex:new RegExp('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}')},
							{column:'name',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$() /-]+$')},
							{column:'quantity',required:'yes',regex:new RegExp('^[0-9]+$')},
							{column:'phone',regex:new RegExp('^[0-9 .,+()-]+$')},
							{column:'email',regex:new RegExp('^[0-9a-zA-Z_.-]+@[0-9a-zA-Z_.-]+$')},
							{column:'point-of-contact',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$#%\*()-]+$')},
							{column:'address',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$#%\*()-]+$')},
							{column:'city',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$#%\*()-]+$')},
							{column:'comments',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$#%\*()/-]+$')},
							{column:'company',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$#%\*()/-]+$')},
							{column:'item',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$#%\*() /-]+$')}];
					
	var error_array=validate_import_array(data_array,validate_template_array);
	return error_array;					
}

/**
* @form Cities
* @formNo 290
*/
function form290_import_validate(data_array)
{
	var validate_template_array=[{column:'city',regex:new RegExp('^[0-9a-zA-Z _.,\'()-]+$')},
							{column:'state',regex:new RegExp('^[0-9a-zA-Z _.,\'()-]+$')},
							{column:'country',regex:new RegExp('^[0-9a-zA-Z _.,\'()-]+$')}];
					
	var error_array=validate_import_array(data_array,validate_template_array);
	return error_array;					
}

/**
* @form Manage Products (without tax) 
* @formNo 300
*/
function form300_import_validate(data_array)
{
	var validate_template_array=[{column:'Model',required:'yes',regex:new RegExp('^[0-9a-zA-Z_.,()/\' -]+$')},
							{column:'Company',regex:new RegExp('^[0-9a-zA-Z_ .,@\'()-]+$')},
							{column:'Category',regex:new RegExp('^[0-9a-zA-Z_ .,@\'()-]+$')},
							{column:'Description',regex:new RegExp('^[0-9a-zA-Z _.,/\'+@!$()-]+$')},
							{column:'MRP',required:'yes',regex:new RegExp('^[0-9.]+$')},
							{column:'Cost Price',regex:new RegExp('^[0-9.]+$')},
							{column:'Sale Price',regex:new RegExp('^[0-9.]+$')}];
					
	var error_array=validate_import_array(data_array,validate_template_array);
	return error_array;					
}
