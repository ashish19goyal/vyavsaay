<ul id='report_grid'>		
			<li>
				<div class='grid_header' onclick='bills_grid_click()'>Bills       >>></div>		
				<ul class='list_inside_grid'>
					<li>Last bill No. : <a class='grid_item' id='lastBillNum'>TBD</a></li>
					<li>No. of bills today : <a class='grid_item' id='billsToday'>TBD</a></li>
					<li>Total billed amount today : <a class='grid_item' id='billedAmount'>TBD</a></li>
				</ul>
			</li>
			
			<li>
				<div class='grid_header' onclick='stocks_grid_click()'>Stocks     >>></div>
				<ul class='list_inside_grid'>
					<li>No. of active items in stock : <a class='grid_item' id='itemsStocked'>TBD</a></li>
					<li>No. of active items out of stock : <a class='grid_item' id='itemsOutOfStock'>TBD</a></li>
				</ul>
			</li>
		
			<li>
				<div class='grid_header' onclick='people_grid_click()'>People     >>></div>
				<ul class='list_inside_grid'>
					<li>New customers added this month: <a class='grid_item' id='newCustomers'>TBD</a></li>
					<li>No. of active customers : <a class='grid_item' id='activeCustomers'>TBD</a></li>
					<li>Revenue per customer (current month) : <a class='grid_item' id='revenuePerCustomer'>TBD</a></li>
				</ul>
			</li>
			
			<li>
				<div class='grid_header' onclick='accounts_grid_click()'>Accounts     >>></div>
				<ul class='list_inside_grid'>
					<li>Month's revenue: <a class='grid_item' id='monthRevenue'>TBD</a></li>
					<li>YTD Revenue : <a class='grid_item' id='YTDrevenue'>TBD</a></li>
					<li>Month's expenses : <a class='grid_item' id='monthExpense'>TBD</a></li>
					<li>YTD expenses : <a class='grid_item' id='YTDexpense'>TBD</a></li>
				</ul>
			</li>
				
			<li>
				<div class='grid_header' onclick='tasks_grid_click()'>Tasks     >>></div>
				<ul class='list_inside_grid'>
					<li>Pending tasks: <a class='grid_item' id='pendingTasks'>TBD</a></li>
					<li>No. of tasks performed today : <a class='grid_item' id='numTasksPerformed'>TBD</a></li>
					<li>Cancelled tasks : <a class='grid_item' id='cancelledTasks'>TBD</a></li>
				</ul>
			</li>
</ul>
 <script>
	$(function(){
		$("#report_grid").selectable();
	});
</script>
