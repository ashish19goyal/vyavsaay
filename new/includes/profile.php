<li class="dropdown dropdown-user">
    <a href="" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
        <img alt="Profile Image" class="img-circle" src="/new/images/dummy-user.png">
        <span class="username username-hide-on-mobile"> User </span>
        <i class="fa fa-angle-down"></i>
    </a>
    <ul class="dropdown-menu dropdown-menu-default">
        <li>
            <a id='user_profile_nav'><i class="icon-user"></i> My Profile </a>
        </li>
        <li>
            <a onclick="modal182_action();">
                <i class="icon-key"></i> Change Password </a>
        </li>
        <li id='location_icon'>
            <a onclick="modal111_action();">
                <i class="icon-location-pin"></i> Log Location </a>
        </li>
        <li id='api_sync_icon'>
            <a onclick="sync_logistics_apis();">
                <i class="icon-cloud-upload"></i> Sync APIs </a>
        </li>

        <li class="divider"> </li>

        <li id='online_icon'>
            <a onclick="switch_to_online();">
                <i class="icon-rocket"></i> Switch to Online </a>
        </li>
        <li id='offline_icon'>
            <a onclick="switch_to_offline();">
                <i class="icon-anchor"></i> Switch to Offline </a>
        </li>
        <li id='sync_icon'>
            <a onclick="sync_local_and_server();">
                <i class="icon-cloud-upload"></i> Sync Offline Data </a>
        </li>
        <li>
            <a onclick="delete_local_db();">
                <i class="icon-trash"></i> Delete Offline Data </a>
        </li>

        <li class="divider"> </li>

        <li>
            <a onclick="var vdb=new vDB();vdb.full_backup();">
                <i class="icon-energy"></i> Backup Data </a>
        </li>

        <li id='system_config_backup'>
            <a onclick="var vdb=new vDB();vdb.config_backup();">
                <i class="icon-wrench"></i> Backup Config </a>
        </li>

        <li id='system_delete_logs'>
            <a onclick="server_delete_logs({},function(){$('#modal93_link').click()});">
                <i class="icon-clock"></i> Delete Logs </a>
        </li>
        
        <li class="divider"> </li>

        <li>
            <a onclick="lock_screen();">
                <i class="icon-lock"></i> Lock Screen </a>
        </li>
        <li>
            <a onclick="delete_session();">
                <i class="icon-logout"></i> Log Out </a>
        </li>
    </ul>
</li>