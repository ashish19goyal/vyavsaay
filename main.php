<?php 
	include "includes/header.php";
	include "includes/searchbar.php";
	include "includes/modal_forms.php";
	include "includes/print_templates.php";
	include "includes/side_menu.php";
	include "functions/activities.php";
	
	echo "<div id='content_box'>";
		//central grid display for reports
		include "includes/grids.php";	
		//display for search results, notifications and opportunities
		include "functions/search.php";
		include "functions/notifications.php";
		include "functions/opportunities.php";
		//central display for individual functions
		include "functions/accounts.php";
		include "functions/bills.php";
		include "functions/people.php";
		include "functions/stocks.php";
		include "functions/tasks.php";
		//display for settings
		include "functions/settings.php";
 	echo "</div>";
		
	include "includes/footer.php";
?>
