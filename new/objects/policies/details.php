<div>
	<div class="row">
		<div class="col-md-2"><b>Application Number</b></div>
		<div class="col-md-4" id='object_policies_details_app_num'></div>
		<div class="col-md-2"><b>Policy Number</b></div>
		<div class="col-md-4" id='object_policies_details_policy_num'></div>
	</div>
	<div class="row">
		<div class="col-md-2"><b>Preferred</b></div>
		<div class="col-md-4" id='object_policies_details_preferred'></div>
		<div class="col-md-2"><b>Policy Type</b></div>
		<div class="col-md-4" id='object_policies_details_ptype'></div>
	</div>
	<div class="row">
		<div class="col-md-2"><b>Policy Term</b></div>
		<div class="col-md-4" id='object_policies_details_term'></div>
		<div class="col-md-2"><b>Policy Name</b></div>
		<div class="col-md-4" id='object_policies_details_name'></div>
	</div>
	<div class="row">
		<div class="col-md-2"><b>Sum Insured</b></div>
		<div class="col-md-4" id='object_policies_details_sum'></div>
		<div class="col-md-2"><b>Premium</b></div>
		<div class="col-md-4" id='object_policies_details_premium'></div>
	</div>
	<div class="row">
		<div class="col-md-2"><b>Short Premium</b></div>
		<div class="col-md-4" id='object_policies_details_spremium'></div>
		<div class="col-md-2"><b>Discount</b></div>
		<div class="col-md-4" id='object_policies_details_discount'></div>
	</div>
	<div class="row">
		<div class="col-md-2"><b>Adults</b></div>
		<div class="col-md-4" id='object_policies_details_adults'></div>
		<div class="col-md-2"><b>Children</b></div>
		<div class="col-md-4" id='object_policies_details_children'></div>
	</div>
	<div class="row">
		<div class="col-md-2"><b>Age (oldest member)</b></div>
		<div class="col-md-4" id='object_policies_details_age'></div>
		<div class="col-md-2"><b>Sales Source</b></div>
		<div class="col-md-4" id='object_policies_details_source'></div>
	</div>
	<div class="row">
		<div class="col-md-2"><b>Team Lead</b></div>
		<div class="col-md-4" id='object_policies_details_lead'></div>
		<div class="col-md-2"><b>Sales Manager</b></div>
		<div class="col-md-4" id='object_policies_details_manager'></div>
	</div>
	<div class="row">
		<div class="col-md-2"><b>Tele-Caller</b></div>
		<div class="col-md-4" id='object_policies_details_caller'></div>
		<div class="col-md-2"><b>Agent</b></div>
		<div class="col-md-4" id='object_policies_details_agent'></div>
	</div>
	<div class="row">
		<div class="col-md-2"><b>Start Date</b></div>
		<div class="col-md-4" id='object_policies_details_start'></div>
		<div class="col-md-2"><b>Issue Date</b></div>
		<div class="col-md-4" id='object_policies_details_issue'></div>
	</div>
	<div class="row">
		<div class="col-md-2"><b>Issue Type</b></div>
		<div class="col-md-4" id='object_policies_details_itype'></div>
		<div class="col-md-2"><b>Issue Source</b></div>
		<div class="col-md-4" id='object_policies_details_isource'></div>
	</div>

	<script>
		function initialize_object_policies_details(obj_name,obj_id)
		{
            var detail_data={data_store:'policies',count:1,
							indexes:[{index:'id'},
								 {index:'application_num'},
								 {index:'policy_name'},
								 {index:'description'},
								 {index:'issuer'},
								 {index:'premium'},
								 {index:'discount'},
								 {index:'short_premium'},
								 {index:'agent'},
								 {index:'start_date'},
								 {index:'end_date'},
								 {index:'issue_date'},
								 {index:'type'},
								 {index:'term'},
								 {index:'preferred'},
								 {index:'issue_type'},
								 {index:'ported_source'},
								 {index:'renewed_source'},
								 {index:'sum_insured'},
								 {index:'adults'},
								 {index:'children'},
								 {index:'age'},
								 {index:'team_lead'},
								 {index:'sales_manager'},
								 {index:'tele_caller'},
								 {index:'sales_source'},
								 {index:'status'},
                                {index:'policy_num',exact:obj_name}]};
            read_json_rows('',detail_data,function(details)
            {
				if(details.length>0)
				{
					var source="";
					if(details[0].issue_type=="renewed")
					{
						source = details[0].renewed_source;
					}
					else if(details[0].issue_type=="portability")
					{
						source = details[0].ported_source;
					}

	                $('#object_policies_details_app_num').html(details[0].application_num);
					$('#object_policies_details_policy_num').html(details[0].policy_num);
					$('#object_policies_details_preferred').html(details[0].preferred);
					$('#object_policies_details_term').html(details[0].term);
					$('#object_policies_details_ptype').html(details[0].type);
					$('#object_policies_details_pname').html(details[0].policy_name);
					$('#object_policies_details_sum').html(details[0].sum_insured);
					$('#object_policies_details_premium').html(details[0].premium);
					$('#object_policies_details_spremium').html(details[0].short_premium);
					$('#object_policies_details_discount').html(details[0].discount);
					$('#object_policies_details_adults').html(details[0].adults);
					$('#object_policies_details_children').html(details[0].children);
					$('#object_policies_details_age').html(details[0].age);
					$('#object_policies_details_source').html(details[0].sales_source);
					$('#object_policies_details_lead').html(details[0].team_lead);
					$('#object_policies_details_manager').html(details[0].sales_maanger);
					$('#object_policies_details_caller').html(details[0].tele_caller);
					$('#object_policies_details_agent').html(details[0].agent);
					$('#object_policies_details_start').html(vTime.date({time:details[0].start_date}));
					$('#object_policies_details_issue').html(vTime.date({time:details[0].issue_date}));
					$('#object_policies_details_itype').html(details[0].issue_type);
					$('#object_policies_details_isource').html(source);
				}
            });
		}
	</script>
</div>
