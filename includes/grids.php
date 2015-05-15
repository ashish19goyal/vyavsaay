<div id='home_grid'>
	<ul>
		<li id="sale_bills_link" onclick="grid_click('sale_bills');" style='background-color:#E66051'>
			<a><div style='background-color:#c44030'><b data-i18n="function.sale_bills"></b></div></a>
			<ul>
				<li>Last Sale Bill Id: <a class='grid_item' id='grid_item_1'></a></li>
				<li># Sale bills today: <a class='grid_item' id='grid_item_2'>0</a></li>
			</ul>
		</li>
		
		<li id="purchase_link" onclick="grid_click('purchase');" style='background-color:#74dfc5'>
			<a><div style='background-color:#52bda3'><b data-i18n="function.purchase"></b></div></a>		
			<ul>
				<li>Last bill #: <a class='grid_item' id='grid_item_3'></a></li>
				<li># bills entered today: <a class='grid_item' id='grid_item_4'>0</a></li>
			</ul>
		</li>
		
		<li id="finances_link" onclick="grid_click('finances');" style='background-color:#b2a0cf'>
			<a><div style='background-color:#946bba'><b data-i18n="function.finances"></b></div></a>
			<ul>
				<li>Today's Income: <a class='grid_item' id='grid_item_5'>0</a></li>
				<li>Today's Expenses: <a class='grid_item' id='grid_item_6'>0</a></li>
			</ul>
		</li>

		<li id="products_link" onclick="grid_click('products');" style='background-color:#22a49b'>
			<a><div style='background-color:#008279'><b data-i18n="function.products"></b></div></a>		
			<ul>
				<li># Products offered: <a class='grid_item' id='grid_item_7'>0</a></li>
				<li>Most expensive: <a class='grid_item' id='grid_item_11'></a></li>
				<li>Highest Margin: <a class='grid_item' id='grid_item_12'></a></li>
			</ul>
		</li>
		
		<li id="services_link" onclick="grid_click('services');" style='background-color:#8bc6cd'>
			<a><div style='background-color:#69a4ab'><b data-i18n="function.services"></b></div></a>		
			<ul>
				<li># Services Offered: <a class='grid_item' id='grid_item_9'>0</a></li>
			</ul>
		</li>
		
		<li id="customers_link" onclick="grid_click('customers');" style='background-color:#dae545'>
			<a><div style='background-color:#a7b212'><b data-i18n="function.customers"></b></div></a>		
			<ul>
				<li>Today's unique customers: <a class='grid_item' id='grid_item_13'>0</a></li>
				<li>Last customer: <a class='grid_item' id='grid_item_14'></a></li>
			</ul>
		</li>

		<li id="customer_service_link" onclick="grid_click('customer_service');" style='background-color:#314264'>
			<a><div style='background-color:#0f2042'><b data-i18n="function.customer_service"></b></div></a>		
			<ul>
				<li># open service requests: <a class='grid_item' id='grid_item_31'>0</a></li>
				<li>Service requests closed today: <a class='grid_item' id='grid_item_32'></a></li>
			</ul>
		</li>

		<li id="suppliers_link" onclick="grid_click('suppliers');" style='background-color:#ff265e'>
			<a><div style='background-color:#ed043c'><b data-i18n="function.suppliers"></b></div></a>		
			<ul>
				<li>Last supplier: <a class='grid_item' id='grid_item_15'>TBD</a></li>
				<li>Payments due to suppliers: <a class='grid_item' id='grid_item_16'>0</a></li>
			</ul>
		</li>

		<li id="staff_link" onclick="grid_click('staff');" style='background-color:#74dfc5'>
			<a><div style='background-color:#52bda3'><b data-i18n="function.staff"></b></div></a>		
			<ul>
				<li># Staff present: <a class='grid_item' id='grid_item_17'>0</a></li>
				<li># Pending tasks: <a class='grid_item' id='grid_item_18'>0</a></li>
			</ul>
		</li>

		<li id="projects_link" onclick="grid_click('projects');" style='background-color:#c27fe6'>
			<a><div style='background-color:#a05dc4'><b data-i18n="function.projects"></b></div></a>		
			<ul>
				<li># Active projects: <a class='grid_item' id='grid_item_27'>0</a></li>
				<li># Completed projects: <a class='grid_item' id='grid_item_28'>0</a></li>
			</ul>
		</li>

		<li id="store_link" onclick="grid_click('store');" style='background-color:#c3e44a'>
			<a><div style='background-color:#a1b228'><b data-i18n="function.store"></b></div></a>		
			<ul>
				<li># Storage areas: <a class='grid_item' id='grid_item_19'>0</a></li>
			</ul>
		</li>

		<li id="ecommerce_link" onclick="grid_click('ecommerce');" style='background-color:#ff6334'>
			<a><div style='background-color:#f14112'><b data-i18n="function.ecommerce"></b></div></a>		
			<ul>
				<li># Pending orders: <a class='grid_item' id='grid_item_20'>0</a></li>
			</ul>
		</li>

		<li id="offers_link" onclick="grid_click('offers');" style='background-color:#2a78ba'>
			<a><div style='background-color:#085698'><b data-i18n="function.promotion"></b></div></a>		
			<ul>
				<li>Latest offer: <a class='grid_item' id='grid_item_22'></a></li>
				<li># Sale Leads: <a class='grid_item' id='grid_item_23'>0</a></li>
			</ul>
		</li>

		<li id="maps_link" onclick="grid_click('maps');" style='background-color:#b2a0cf'>
			<a><div style='background-color:#946bba'><b data-i18n="function.maps"></b></div></a>		
			<ul>
				<li># Verified customer addresses: <a class='grid_item' id='grid_item_24'>0</a></li>
				<li># Verified supplier addresses: <a class='grid_item' id='grid_item_25'>0</a></li>
			</ul>
		</li>

		<li id="sale_reports_link" onclick="grid_click('sale_reports');" style='background-color:#ef3d8f'>
			<a><div style='background-color:#ce1b6d'><b data-i18n="function.sale_reports"></b></div></a>		
			<ul>
				<li>Today's total sale: <a class='grid_item' id='grid_item_26'>0</a></li>
			</ul>
		</li>
		
		<li id="admin_link" onclick="grid_click('admin');" style='background-color:#652b8d'>
			<a><div style='background-color:#43196b'><b data-i18n="function.admin"></b></div></a>		
			<ul>
				<li># Custom reports: <a class='grid_item' id='grid_item_29'>0</a></li>
				<li># Active tabs: <a class='grid_item' id='grid_item_30'>0</a></li>
			</ul>
		</li>
		
	</ul>
</div>