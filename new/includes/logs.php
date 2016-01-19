<li class="dropdown dropdown-extended dropdown-notification" id="header_task_bar">
    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
        <i class="icon-hourglass"></i>
        <span class="badge badge-default" id="log_count">0</span>
    </a>
    <ul class="dropdown-menu extended tasks">
        <li class="external">
            <h3>You have <span class="bold" id="log_count2">0</span> unsynced activities</h3>
            <a onclick=show_activities();>view all</a>
        </li>
        <li>
            <ul id='topbar_logs' class="dropdown-menu-list scroller" style="height: 275px;" data-handle-color="#637283"> 
            </ul>
        </li>
    </ul>
</li>

<script>
	function show_activities() 
	{
		hide_all();
		$("#activities_box").show();
		activities_ini();
	}
</script>