/**
* @form Manage Staff
* @formNo 8
*/
function form8_import_validate(data_array)
{
	var validate_template_array=[{column:'acc_name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
							{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
							{column:'email',regex:new RegExp('^[0-9a-zA-Z_.-]+@[0-9a-zA-Z_.-]+$')},
							{column:'phone',regex:new RegExp('^[0-9 ./,+-]+$')},
							{column:'username',regex:new RegExp('^[0-9a-zA-Z]+$')},
							{column:'status',list:['active','suspended','retired']},
							{column:'address'},
							{column:'city',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
							{column:'state',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
							{column:'country',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
							{column:'pincode',regex:new RegExp('^[0-9]+$')}];
					
	var error_array=validate_import_array(data_array,validate_template_array);
	return error_array;					
}

/**
* @form Manage Customers
* @formNo 30
*/
function form30_import_validate(data_array)
{
	var validate_template_array=[{column:'acc_name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
							{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
							{column:'email',regex:new RegExp('^[0-9a-zA-Z_.-]+@[0-9a-zA-Z_.-]+$')},
							{column:'phone',regex:new RegExp('^[0-9 ./,+-]+$')},
							{column:'address'},
							{column:'city',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
							{column:'state',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
							{column:'pincode',regex:new RegExp('^[0-9]+$')}];
					
	var error_array=validate_import_array(data_array,validate_template_array);
	return error_array;					
}

/**
* @form Manage Products 
* @formNo 39
*/
function form39_import_validate(data_array)
{
	var validate_template_array=[{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z_.,()-]+$')},
							{column:'make',regex:new RegExp('^[0-9a-zA-Z _.,@\'()-]+$')},
							{column:'description',regex:new RegExp('^[0-9a-zA-Z _.,/\'+@!$()-]+$')},
							{column:'tax',required:'yes',regex:new RegExp('^[0-9.]+$')},
							{column:'bar_code',regex:new RegExp('^[a-zA-Z0-9]+$')}];
					
	var error_array=validate_import_array(data_array,validate_template_array);
	return error_array;					
}


/**
* @form Manage Suppliers
* @formNo 40
*/
function form40_import_validate(data_array)
{
	var validate_template_array=[{column:'acc_name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
							{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
							{column:'email',regex:new RegExp('^[0-9a-zA-Z_.-]+@[0-9a-zA-Z_.-]+$')},
							{column:'phone',regex:new RegExp('^[0-9 ./,+-]+$')},
							{column:'notes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
							{column:'address'},
							{column:'city',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
							{column:'state',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
							{column:'country',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
							{column:'pincode',regex:new RegExp('^[0-9]+$')}];
					
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
							{column:'value',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')}];
					
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
* @form Customer Attributes
* @formNo 96
*/
function form96_import_validate(data_array)
{
	var validate_template_array=[{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
							{column:'attribute',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
							{column:'value',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')}];
					
	var error_array=validate_import_array(data_array,validate_template_array);
	return error_array;					
}

/**
* @form Supplier Attributes
* @formNo 97
*/
function form97_import_validate(data_array)
{
	var validate_template_array=[{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
							{column:'attribute',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
							{column:'value',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')}];
					
	var error_array=validate_import_array(data_array,validate_template_array);
	return error_array;					
}

/**
* @form Staff Attributes
* @formNo 98
*/
function form98_import_validate(data_array)
{
	var validate_template_array=[{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
							{column:'attribute',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
							{column:'value',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')}];
					
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
* @form Mandatory Attributes
* @formNo 123
*/
function form123_import_validate(data_array)
{
	var validate_template_array=[{column:'object',required:'yes',list:['account','task','storage','product','service',
							'loan','loyalty program','staff','supplier','customer','asset']},
							{column:'status',required:'yes',list:['required','active','inactive']},
							{column:'attribute',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
							{column:'values',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')}];
					
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
