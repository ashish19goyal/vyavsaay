<li class="dropdown dropdown-extended dropdown-notification" id="header_notification_bar">
    <a href="javascript:;" onclick=notifications_update_seen(); class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
        <i class="icon-bell"></i>
        <span class="badge badge-default" id='notif_count'>0</span>
    </a>
    <ul class="dropdown-menu">
        <li class="external">
            <h3>
                <span class="bold" id='notif_count2'>0</span> pending notifications</h3>
            <a onclick='show_notifications();'>view all</a>
        </li>
        <li>
            <ul id='topbar_notifications' class="dropdown-menu-list scroller" style="height: 250px;" data-handle-color="#637283">
            </ul>
        </li>
    </ul>
</li>

<script>
	function show_notifications()
	{
		vIni.hideAll();
		$("#notifications_box").show();
		notifications_ini();
		notifications_update_seen();
	}

	function notifications_update_seen()
	{
		var columns={data_store:'notifications',access:'yes',indexes:[{index:'id'},{index:'status',exact:'pending'}]};

		read_json_rows('',columns,function(notifs)
		{
			var data_json={data_store:'notifications',loader:'no',log:'no',data:[]};
			var last_updated=get_my_time();

			notifs.forEach(function(notif)
			{
				var data_json_array=[{index:'id',value:(notif.id)},
							{index:'status',value:'reviewed'},
							{index:'last_updated',value:last_updated}];
				data_json.data.push(data_json_array);
			});

			update_batch_json(data_json);
		});
	}
</script>
