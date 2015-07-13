<div id='side_menu'>

	<div id='home_icon' class='menu_icon'>
			<img title='Home' src='./images/home.png' class="icon" onclick='home_display();'>
	</div>
	
	<div id='notification_icon' class='menu_icon' onclick='show_notifications();'>
			<div id='count_notif'></div>
			<img title='Notifications' src='./images/notification.png' class="icon">
	</div>
		
	<div id='offline_icon' class='menu_icon'>
		<img title='Working offline, click to switch to online' src='./images/offline.png' class='icon' onclick='switch_to_online();' >
	</div>
	
	<div id='sync_icon' class='menu_icon'>
		<div id='count_sync'></div>
		<img title='Sync to server' src='./images/sync.png' class='icon' onclick='sync_local_and_server();'>
	</div>

	<div id='online_icon' class='menu_icon'>
		<img title='Working online, click to switch to offline' src='./images/online.png' class='icon' onclick='switch_to_offline();'>
	</div>

	<div id='location_icon' class='menu_icon'>
		<img title='Log location' src='./images/location.png' class="icon" onclick='modal111_action();'>
	</div>
	
	<div id='settings_icon' class='menu_icon'>
		<img title='Settings' src='./images/settings.png' class="icon" onclick='show_settings();'>
	</div>	
	
	<div id='logout_icon' class='menu_icon'>
			<img title='Logout' src='./images/logout.png' class="icon" onclick='delete_session();'>
	</div>

</div>