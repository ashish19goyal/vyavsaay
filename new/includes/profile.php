<!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
<li class="dropdown dropdown-user">
    <a href="" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
        <img alt="Profile Image" class="img-circle" src="./images/dummy-user.png">
        <span class="username username-hide-on-mobile"> Nick </span>
        <i class="fa fa-angle-down"></i>
    </a>
    <ul class="dropdown-menu dropdown-menu-default">
        <li>
            <a href="page_user_profile_1.html">
                <i class="icon-user"></i> My Profile </a>
        </li>
        <li>
            <a href="" onclick="">
                <i class="icon-rocket"></i> Switch to Online </a>
        </li>
        <li>
            <a href="" onclick="">
                <i class="icon-calendar"></i> Switch to Offline </a>
        </li>
        <li class="divider"> </li>
        <li>
            <a href="" onclick="show_lock_screen();">
                <i class="icon-lock"></i> Lock Screen </a>
        </li>
        <li>
            <a href="" onclick="delete_session();">
                <i class="icon-key"></i> Log Out </a>
        </li>
    </ul>
</li>