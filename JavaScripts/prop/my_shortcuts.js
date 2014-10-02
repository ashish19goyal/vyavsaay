function set_menu_shortcuts()
{
	console.log("setting shortcuts for menu");
	
	var shortcuts_data="<shortcuts>" +
			"<id></id>" +
			"<element_id></element_id>" +
			"<element_name></element_name>" +
			"<shortcut></shortcut>" +
			"<status>active</status>" +
			"</shortcuts>";

	fetch_requested_data('',shortcuts_data,function(results)
	{
		for(var i in results)
		{
			if(results[i].shortcut!="")
			{	Mousetrap.bind(results[i].shortcut, function(e)
				{
					console.log('shortcut used');
			    	display_functions(results[i].element_id);//function to be executed
				});
			}
		}
	});
		
}

function display_functions(element_id)
{
	switch(element_id)
	{
		case 'form1': form1_display('');
			break;
		case 'form2': form2_display('');
			break;
		case 'form5': form5_display('');
			break;
		case 'form7': form7_display('');
			break;		
		case 'form8': form8_display('');
			break;		
		case 'form9': form9_display('');
			break;		
		case 'form10': form10_display('');
			break;		
		case 'form11': form11_display('');
			break;		
		case 'form12': form12_display('');
			break;		
		case 'form14': form14_display('');
			break;		
		case 'form15': form15_display('');
			break;		
		case 'form19': form19_display('');
			break;		
		case 'form21': form21_display('');
			break;		
		case 'form22': form22_display('');
			break;		
		case 'form24': form24_display('');
			break;		
		case 'form27': form27_display('');
			break;		
		case 'form30': form30_display('');
			break;		
		case 'form35': form35_display('');
			break;		
		case 'form38': form38_display('');
			break;		
		case 'form39': form39_display('');
			break;		
		case 'form40': form40_display('');
			break;		
		case 'form41': form41_display('');
			break;		
		case 'form42': form42_display('');
			break;		
		case 'form43': form43_display('');
			break;		
		case 'form44': form44_display('');
			break;		
		case 'form45': form45_display('');
			break;		
		case 'form46': form46_display('');
			break;		
		case 'form47': form47_display('');
			break;		
		case 'form48': form48_display('');
			break;		
		case 'form49': form49_display('');
			break;		
		case 'form50': form50_display('');
			break;		
		case 'form51': form51_display('');
			break;		
		case 'form52': form52_display('');
			break;
		case 'form53': form53_display('');
			break;
		case 'form54': form54_display('');
			break;
		case 'form55': form55_display('');
			break;
		case 'home': home_display();
			break;
		case 'notifications':show_notifications();
			break;
		case 'opportunities':show_opportunities();
			break;
		case 'switch_offline':switch_to_offline();
			break;
		case 'switch_online':switch_to_online();
			break;
		case 'sync':sync_local_and_server();
			break;
		case 'settings':show_settings();
			break;
		case 'logout':delete_session();
			break;
	}
}