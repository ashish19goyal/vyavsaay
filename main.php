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
		
		//display for each of the grids
		include "functions/sale_bills.php";
		include "functions/products.php";
		include "functions/services.php";
		include "functions/purchase.php";
		include "functions/store.php";
		include "functions/inventory.php";
		include "functions/customers.php";
		include "functions/staff.php";
		include "functions/suppliers.php";
		include "functions/offers.php";
		include "functions/finances.php";
		include "functions/sale_reports.php";
		include "functions/maps.php";
		//display for settings
		include "functions/settings.php";
 	echo "</div>";
		
	include "includes/footer.php";
?>
