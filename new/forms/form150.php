<div id='form150' class='tab-pane'>
	<div class='feed_item'>
		<form id='form150_master' autocomplete="off">
			<fieldset>
				<input style='width:80%' type='text' required placeholder='Select Project'><br>
				<textarea required placeholder='details...' class='feed_detail'></textarea><br>
				<input type='hidden' name='project_id'>
				<input type='button' title='Post' value='Post' class='generic_icon' onclick='form150_post_feed();'>
			</fieldset>
		</form>	
	</div>	
	<div id='form150_body'>
	</div>
	
	<script>
		function like_feed(feed_id,element)
{
	var like_xml="<feed_likes>"+
				"<id>"+vUtil.newKey()+"</id>"+	
				"<feed_id exact='yes'>"+feed_id+"</feed_id>"+
				"<person exact='yes'>"+get_account_name()+"</person>"+
				"<last_updated>"+get_my_time()+"</last_updated>"+						
				"</feed_likes>";
	create_simple(like_xml);
	$(element).attr('src','../images/thumbs_up.png');
	$(element).attr('title','Unlike this post');
	$(element).attr("onclick",'');
	$(element).off('click');	
	$(element).on('click',function()
	{
		dislike_feed(feed_id,element);
	});
	var likes_count=parseInt($('#form150_likes_count_'+feed_id).html());
	$('#form150_likes_count_'+feed_id).html(likes_count+1);
}

function dislike_feed(feed_id,element)
{
	var like_xml="<feed_likes>"+
				"<feed_id>"+feed_id+"</feed_id>"+
				"<person>"+get_account_name()+"</person>"+	
				"</feed_likes>";
	delete_simple(like_xml);
	
	$(element).attr('src','../images/thumbs_up_line.png');
	$(element).attr('title','Like this post');
	$(element).attr("onclick",'');
	$(element).off('click');	
	$(element).on('click',function()
	{
		like_feed(feed_id,element);
	});
	var likes_count=parseInt($('#form150_likes_count_'+feed_id).html());
	$('#form150_likes_count_'+feed_id).html(likes_count-1);
}

function create_feed_comment(feed_id,element)
{
	var comment_text=element.value;
	var account_name=get_account_name();
	var data_id=vUtil.newKey();
	var comment_xml="<feed_comments>"+
				"<id>"+data_id+"</id>"+	
				"<feed_id exact='yes'>"+feed_id+"</feed_id>"+
				"<person exact='yes'>"+account_name+"</person>"+
				"<comment_text>"+comment_text+"</comment_text>"+
				"<last_updated>"+get_my_time()+"</last_updated>"+						
				"</feed_comments>";
	create_simple(comment_xml);
	
	var comments_content="<label>"+account_name+": "+comment_text;
	comments_content+=" <a class='small_cross_icon' onclick=\"delete_feed_comment('"+data_id+"',$(this));\" title='Delete comment'>&#10006;</a>";
	comments_content+="</label><br>";
	comments_content+="<label>"+account_name+": <textarea class='feed_comments' placeholder='comment..'></textarea></label>";
	$(element).parent().parent().append(comments_content);
	//$('#form150_comments_'+feed_id).append(comments_content);
	$(element).parent().parent().find('label').find('textarea').on('keyup',function(e)
	{
		if (e.keyCode==13) 
		{
			create_feed_comment(feed_id,this);
		}
	});
	$(element).parent().remove();
}


function delete_feed_comment(comment_id,element)
{
	var comment_xml="<feed_comments>"+
					"<id>"+comment_id+"</id>"+
					"</feed_comments>";
	delete_simple(comment_xml);
	$(element).parent().remove();
}

function delete_feed(feed_id,element)
{
	var feed_xml="<feeds>"+
					"<id>"+feed_id+"</id>"+
					"</feeds>";
	var like_xml="<feed_likes>"+
					"<feed_id>"+feed_id+"</feed_id>"+
					"</feed_likes>";
	var comment_xml="<feed_comments>"+
					"<feed_id>"+feed_id+"</feed_id>"+
					"</feed_comments>";
	delete_simple(feed_xml);
	delete_simple(like_xml);
	delete_simple(comment_xml);
	$(element).parent().parent().remove();
}

	</script>
</div>