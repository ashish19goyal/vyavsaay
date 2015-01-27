<?php 
	include "includes/header.php";
	
	echo "<script type='text/javascript'>"
			."history.pushState(null, null, 'main.php');"
			."window.addEventListener('popstate', function(event) {"
			."	history.pushState(null, null, 'main.php');"
			."});"
			."</script>";
	
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
		include "functions/all_activities.php";
		
		//display for each of the grids
		include "functions/sale_bills.php";
		include "functions/products.php";
		include "functions/services.php";
		include "functions/purchase.php";
		include "functions/store.php";
		include "functions/inventory.php";
		include "functions/customers.php";
		include "functions/customer_service.php";
		include "functions/staff.php";
		include "functions/suppliers.php";
		include "functions/offers.php";
		include "functions/finances.php";
		include "functions/ecommerce.php";
		include "functions/sale_reports.php";
		include "functions/maps.php";
		include "functions/projects.php";
		include "functions/admin.php";
		//display for settings
		include "functions/settings.php";
 	echo "</div>";
		
	include "includes/footer.php";
?>
