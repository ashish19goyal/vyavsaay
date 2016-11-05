/**
 * vDB
 * Author: Ashish Goyal
 * Copyright: Copyright 2016 | Vyavsaay ERP
 */

var vDB = function (options)
{
	var defaults={};
	var settings = $.extend(defaults, options || {});

    this.full_backup = function()
    {
        if(is_create_access('form99') || is_create_object('db_backup'))
        {
			var data = vUtil.getCredentials();
            show_loader();

            ajax_with_custom_func(server_root+"/scripts/db_backup.php",data,function(e)
            {
                var response=e.responseText;

                var type = e.getResponseHeader('Content-Type');
                console.log(type);
                //console.log(response);

                var blob = new Blob([response], { type: type });
                var URL = window.URL || window.webkitURL;
                var downloadUrl = URL.createObjectURL(blob);

                var modal_element=document.getElementById('modal55');
                //var updated_response=response.replace(/ /g,"+");
                var link=document.createElement('a');
                link.setAttribute('href',downloadUrl);
                link.setAttribute('download',get_domain()+".sql");
                link.textContent="Click to download the file.";
                $('#modal55 .scroller').html(link);
                $("#modal55_link").click();
                hide_loader();
            });
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    this.config_backup = function()
    {
        if(is_read_access('form99') || is_read_object('db_backup'))
        {
            var data = vUtil.getCredentials();
            show_loader();
            ajax_with_custom_func(server_root+"/scripts/config_db_backup.php",data,function(e)
            {
                var response=e.responseText;

                var type = e.getResponseHeader('Content-Type');
                console.log(type);
                //console.log(response);

                var blob = new Blob([response], { type: type });
                var URL = window.URL || window.webkitURL;
                var downloadUrl = URL.createObjectURL(blob);

                var modal_element=document.getElementById('modal212');
                var link=document.createElement('a');
                link.setAttribute('href',downloadUrl);
                link.setAttribute('download',get_domain()+"_config.sql");
                link.textContent="Click to download the file.";
                $('#modal212 .scroller').html(link);
                $("#modal212_link").click();
                hide_loader();
            });
        }
        else
        {
            $("#modal2_link").click();
        }
    }
};
vDB = new vDB();
