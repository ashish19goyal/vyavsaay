<div id='projects_main' class='vy_tabs function_main'>
		
		<ul>
			<li><a id='form101_link' href='#form101' onclick='form101_header_ini(); form101_ini();' data-i18n='form.manage_projects'></a></li>			
			<li><a id='form220_link' href='#form220' onclick='form220_header_ini(); form220_ini();' data-i18n='form.manage_projects'></a></li>			
			<li><a id='form137_link' href='#form137' onclick='form137_header_ini(); form137_ini();' data-i18n='form.project_expenses'></a></li>
			<li><a id='form104_link' href='#form104' onclick='form104_header_ini(); form104_ini();' data-i18n='form.tasks'></a></li>
			<li><a id='form135_link' href='#form135' onclick='form135_header_ini(); form135_ini();' data-i18n='form.schedule'></a></li>
			<li><a id='form102_link' href='#form102' onclick='form102_header_ini(); form102_ini();' data-i18n='form.project_team'></a></li>
			<li><a id='form103_link' href='#form103' onclick='form103_header_ini(); form103_ini();' data-i18n='form.project_phases'></a></li>
			<li><a id='form138_link' href='#form138' onclick='form138_header_ini(); form138_ini();' data-i18n='form.project_schedule'></a></li>
			<li><a id='form144_link' href='#form144' onclick='form144_header_ini(); form144_ini();' data-i18n='form.budgeting'></a></li>
			<li><a id='form150_link' href='#form150' onclick='form150_header_ini(); form150_ini();' data-i18n='form.feeds'></a></li>
			<li><a id='report68_link' href='#report68' onclick='report68_header_ini();' data-i18n='form.project_prioritization'></a></li>
			<li><a id='report69_link' href='#report69' onclick='report69_header_ini();' data-i18n='form.project_expenses_report'></a></li>
		</ul>

	<?php 
			include "forms/form101.php";
			include "forms/form220.php";
			include "forms/form137.php";
			include "forms/form104.php";
			include "forms/form135.php";
			include "forms/form102.php"; 
			include "forms/form103.php";
			include "forms/form138.php";
			include "forms/form144.php";
			include "forms/form150.php";
			include "reports/report68.php";
			include "reports/report69.php";
	?>		
	
</div>