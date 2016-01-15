<!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown style -->
<li class="dropdown dropdown-extended dropdown-notification" id="header_notification_bar">
    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
        <i class="icon-bell"></i>
        <span class="badge badge-default" id='notif_count'>0</span>
    </a>
    <ul class="dropdown-menu">
        <li class="external">
            <h3>
                <span class="bold">12 </span>pending notifications</h3>
            <a onclick='show_notifications();'>view all</a>
        </li>
        <li>
            <ul class="dropdown-menu-list scroller" style="height: 250px;" data-handle-color="#637283">
                <li>
                    <a onclick="element_display('','');">
                        <span class="time">just now</span>
                        <span class="details">
                            <span class="label label-sm label-icon label-success">
                                <i class="fa fa-plus"></i>
                            </span> New user registered. </span>
                    </a>
                </li>
            </ul>
        </li>
    </ul>
</li>