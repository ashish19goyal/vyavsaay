<div class="page-lock" id='lock_screen_page'>
<link href="/new/css_custom/lock.min.css" rel="stylesheet" type="text/css" />
    <div class="page-logo">
		<a class='brand' href="main.php">
          	<b class='logo-default'><span class="logo-text">Vyavsaay</span> ERP</b>    
        </a>                   
    </div>
    <div class="page-body">
        <div class="lock-head"> Locked </div>
        <div class="lock-body">
            <div class="pull-left lock-avatar-block">
                <img src="/new/images/dummy-user.png" class="lock-avatar"> </div>
            <form class="lock-form pull-left" id='lock_form'>
                <h4 class='username'>User</h4>
                <div class="form-group">
                    <input class="form-control placeholder-no-fix" required type="password" autocomplete="off" placeholder="Password" name="password" /> </div>
                <div class="form-actions">
                    <button type="submit" class="btn red uppercase">Login</button>
                </div>
            </form>
        </div>
        <div class="lock-bottom">
            <a onclick='delete_session();'>Not <span class='username'>User</span>?</a>
        </div>
    </div>
</div>