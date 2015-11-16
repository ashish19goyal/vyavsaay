<div class="search_bar">
	<div class="header_person" id='menu_username'></div>
	<div class="searchBlock">
		<input type="text" id='search_box' placeholder='search..' onkeydown="if(event.keyCode==13){show_search_results();return false;}">
	</div>
</div>

<script type="text/javascript">
	function show_search_results() 
	{
		hide_all();
		$("#search_results_box").show();
		search_ini();
	}
</script>