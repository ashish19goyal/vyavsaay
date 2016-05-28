<div id='form342' class='tab-pane portlet box green-jungle'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' id='form342_save' title='Save Tab Structure'>Save <i class='fa fa-save'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form342_get_code' onclick=form342_generate_code();><i class='fa fa-download'></i> Get Code</a>
      </div>
	</div>

	<div class="portlet-body">
		<form id='form342_form'>
					<label><input type="text" required name='name' class='floatlabel' placeholder="Tab Name"></label>
          <label><textarea required name='disp' class='floatlabel' placeholder="Display Name"></textarea></label>
          <label><textarea name='desc' class='floatlabel' placeholder="Description"></textarea></label>
		</form>

		<div class='row'>

      <div class='col-md-3' style='padding: 0 0;'>
        <div class='portlet light bordered' style='padding:0;'>
          <div class="portlet-title">Components</div>
      	  <div class="portlet-body">
            <div class='panel-group accordian'>
              <div class='panel panel-default'>
                <div class='panel-heading'>
                  <h4 class='panel-title'>
                    <a class='accordion-toggle' data-toggle='collapse' data-parent='#form342_accordian_elements' href='#form342_accordian_elements'>Elements</a>
                  </h4>
                </div>
                <div id='form342_accordion_elements' class='panel-collapse in'>
                  <div class='panel-body'></div>
                </div>
              </div>

              <div class='panel panel-default'>
                <div class='panel-heading'>
                  <h4 class='panel-title'>
                    <a class='accordion-toggle' data-toggle='collapse' data-parent='#form342_accordian_selected' href='#form342_accordian_selected'>Selected Elements</a>
                  </h4>
                </div>
                <div id='form342_accordion_selected' class='panel-collapse in'>
                  <div class='panel-body'></div>
                </div>
              </div>

              <div class='panel panel-default'>
                <div class='panel-heading'>
                  <h4 class='panel-title'>
                    <a class='accordion-toggle' data-toggle='collapse' data-parent='#form342_accordian_functions' href='#form342_accordian_functions'>Functions</a>
                  </h4>
                </div>
                <div id='form342_accordion_functions' class='panel-collapse in'>
                  <div class='panel-body'></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div class='col-md-7' style='padding: 0 0;'>
        <div class='portlet light bordered'>
          <div class="portlet-title">Layout</div>
          <div class="portlet-body">

          </div>
        </div>
      </div>

      <div class='col-md-2' style='padding: 0 0;'>
        <div class='portlet light bordered'>
          <div class="portlet-title">Attributes</div>
      	  <div class="portlet-body">

          </div>
        </div>
      </div>

		</div>
	</div>
</div>
