/*******************************************************************
* Purpose:     Fuction to add buttons for formatting text   
* Description: Adds buutons and appends it to the navigation pane
*********************************************************************/
function add_button_4_txt_formatting(nav_id,format_specifier, formatting_type, button_name) 
{
    var elem = document.createElement("button");
    elem.id       = "txt_formatting_button";
    elem.setAttribute("onclick","format_selected_text('" + format_specifier + "', '"+ format_specifier +"')");
    elem.title    = formatting_type;
    elem.innerHTML= button_name;

	var nav_elem=document.getElementById(nav_id);
    nav_elem.appendChild(elem);
}

/*******************************************************************
* Purpose:     A handler for text button selection in the
*              navigation pane   
* Description: 1) Creates a parent div which is draggable and child 
*                 div which are editable and resizable
*              2) Makes sure that mouse action inside editable area
*                 selects text and doesn't drag the divs.
*              3) Makes sure that parent div get resized according
*                 to child div.
*********************************************************************/
function text_button_handler(section_elem) 
{
    /* Unique id generated for all div elements*/
    var unique_id="vyavsaay_text_box"+Math.round(Math.random()*10000);
    
    /* Adding draggable and resizable div elements */
    var new_parent = document.createElement("div");
    new_parent.setAttribute("id", "parent_" + unique_id);
    new_parent.setAttribute("class", "draggable");
    new_parent.setAttribute("style", "padding: 10px; width:200px; border:1px solid #000000; white-space: pre-wrap; word-wrap:break-word");

    var new_child = document.createElement("div");
    new_child.setAttribute("id", unique_id);
    new_child.setAttribute("class", "resizable");
    //new_child.setAttribute("contenteditable", "true");
    new_child.setAttribute("style", "width:200px; height:100px;");

	var new_grand_child = document.createElement("div");
    new_grand_child.setAttribute("id", "child_"+unique_id);
    new_grand_child.setAttribute("class", "editable");
    new_grand_child.setAttribute("contenteditable", "true");
    new_grand_child.setAttribute("style", "width:200px; height:100px;");

    //Append these elemnts id DOM hierarchy under section area
    section_elem.appendChild(new_parent);
    new_parent.appendChild(new_child);
    new_child.appendChild(new_grand_child);
    	
    /* Fuction to store element value for deletion */
	document.getElementById('parent_'+unique_id).setAttribute('onclick',"set_html_elem_4_del(this);");	

    $(".draggable").draggable();

    /* Code so that the text in editable area can be 
     selected without dragging the divs. The common area which
     is both editable and draggable has been disabled for dragging*/

	var onmousedown_func="var draggableDiv = $('#parent_"+unique_id+"').draggable();"+
		"draggableDiv.draggable('disable');";

	var onmouseup_func="var draggableDiv = $('#parent_"+unique_id+"').draggable();"+
		"draggableDiv.draggable('enable');"+
        "$('#parent_"+unique_id+"').css('width', $('#"+unique_id+"').width());";

	document.getElementById(unique_id).setAttribute('onmousedown',onmousedown_func);
	document.getElementById(unique_id).setAttribute("onmouseup",onmouseup_func);

	$(".resizable").resizable(
	{
		stop:function(event,ui)
		{
			var this_element=$(ui.element)[0];
			var object_id=this_element.id;
			console.log(object_id);
			var editable_element=document.getElementById('child_'+object_id);
			editable_element.setAttribute('style',this_element.getAttribute('style'));
			//editable_element.setAttribute('height',this_element.getAttribute('height'));
			
			console.log(this_element);
			console.log(editable_element);
		}
	});
};

/*********************************************************************
* Purpose:     Function to add selection list for adjusting font size 
               of text   
* Description: Adds select list and appends it to the navigation pane
*********************************************************************/
function add_font_selection_button(nav_id) 
{
    var elem = document.createElement('select');
    
    var option_elem = document.createElement('option');
    option_elem.innerHTML = "Font";
    elem.appendChild(option_elem);
    
    var font_size = 8;
    for (; font_size < 50 ; font_size = font_size + 2) {    
        var option_elem = document.createElement('option');
	option_elem.innerHTML = font_size;
        elem.appendChild(option_elem);
    }		

    /* Span is used instead of paragraph as a paragraph cannot contain another paragraph.
       Because of this all the <p> elements will get automatically closed by </p> */
    elem.setAttribute("onchange",   'font_formatting(this)');


	var nav_elem=document.getElementById(nav_id);
    nav_elem.appendChild(elem);
}	
 
/**********************************************************************
* Purpose:    Onchnge event triggered on selecting an option in the
              Font selection list 
*********************************************************************/
function font_formatting(elem) {
    if (elem.value == "Font") {
        return; 
    }

    var format_specifier = "span style='line-height:" + elem.value + "px;font-size:" + elem.value + "px;'";
    
    format_selected_text( format_specifier , "span");
}	
 
 
/**********************************************************************
* Purpose:     Fuction to add selection list for adjusting color 
               of text   
* Description: Adds select list and appends it to the navigation pane
*********************************************************************/
function add_color_selection_button(nav_id) 
{
    var elem = document.createElement('select');
    elem.id = "text_color";

    
    var option_elem = document.createElement('option');
    option_elem.innerHTML = "Color";
    elem.appendChild(option_elem);
    
    var font_color = ["Black", "Green", "Red", "Blue", "Brown", "Yellow", "Orange", "Purple"];

    var idx = 0;

    for (; idx < font_color.length; idx++) {    
        var option_elem = document.createElement('option');
	option_elem.value = font_color[idx];
	option_elem.setAttribute("style", "background-color:" + font_color[idx]);
        elem.appendChild(option_elem);
    }		

    /* Span is used instead of paragraph as a paragraph cannot contain another paragraph.
       Because of this all the <p> elements will get automatically closed by </p> */
    elem.setAttribute("onchange",   'color_formatting(this)');


	var nav_elem=document.getElementById(nav_id);
    nav_elem.appendChild(elem);
}	

/**********************************************************************
* Purpose:    Onchnge event triggered on selecting an option in the
              Color selection list 
*********************************************************************/
function color_formatting(elem) {
    if (elem.value == "Color") {
        return; 
    }

    $("#text_color").attr("style", "background-color:" + elem.value);

    var format_specifier = "span style='color:" + elem.value + ";'";
    
    format_selected_text( format_specifier , "span");
}	
 
 
/*******************************************************************
* Purpose:     Fuction to format selected text   
* Description: This function formats the selected text in the browser
*              window
*********************************************************************/
function format_selected_text( format_specifier, element_name) 
{
    var range, html;
    if (window.getSelection && window.getSelection().getRangeAt) {
	html  = window.getSelection();    
	strg  = extract_html();    
        range = window.getSelection().getRangeAt(0);
        range.deleteContents();

        var elem_4_insertion = document.createElement("div");

	elem_4_insertion.innerHTML = "<"+ format_specifier + " contenteditable='false'> <" 
		  + format_specifier + " class='format_class' contenteditable='true'>" 
		  + strg + "</" + element_name + "></" + element_name + ">";


        var frag = document.createDocumentFragment(), child;
        while ( (child = elem_4_insertion.firstChild) ) {
            frag.appendChild(child);
        }

        range.insertNode(frag);

	$(".format_class").keyup(function(e) {
	    //e.stopPropagation();		
            if( this.textContent.trim() === '' ) {
	        var parent_node = this.parentNode; 
                parent_node.removeChild(this);
                parent_node.parentNode.removeChild(parent_node);
            }

        });
    } else if (document.selection && document.selection.createRange) {
        //range = document.selection.createRange();
        //range.pasteHTML(html);
    }
}


/*******************************************************************
* Purpose:     Fuction to extract html from selected text   
*********************************************************************/
function extract_html() {
    var html = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");

            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }

            html = container.innerHTML;

	    console.log(container);
	    console.log(html);

        }
    	} else if (typeof document.selection != "undefined") {
        	if (document.selection.type == "Text") {
            	html = document.selection.createRange().htmlText;
        }
    }

    return html;
}

/**********************************************************************
*  FUNCTIONS TO ADD SELECTION LIST FOR OUTLINE FORMATTING
*  THERE ARE 3 SUCH LISTS PROVIDED
*********************************************************************/
function add_outline_border_selection_button(nav_id) 
{
    var elem = document.createElement('select');
    elem.id = "border-style";

    
    var option_elem = document.createElement('option');
    option_elem.innerHTML = "Outline-style";
    elem.appendChild(option_elem);
    
    var border_style = ["dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset"];

    var idx = 0;

    for (; idx < border_style.length; idx++) {    
        var option_elem = document.createElement('option');
	option_elem.value = border_style[idx];
	option_elem.innerHTML = border_style[idx];
	option_elem.setAttribute("style", "margin:3px; border:3px " + border_style[idx] + " #000000;");
        elem.appendChild(option_elem);
    }		

    /* Span is used instead of paragraph as a paragraph cannot contain another paragraph.
       Because of this all the '<p>' elements will get automatically closed by '</p>' */
    elem.setAttribute("onchange",   'border_formatting_cbk(this, "border-style")');


	var nav_elem=document.getElementById(nav_id);
    nav_elem.appendChild(elem);
}	


function add_outline_color_selection_button(nav_id) 
{

    var elem = document.createElement('select');
    elem.id = "border-color";

    
    var option_elem = document.createElement('option');
    option_elem.innerHTML = "Outline-Color";
    elem.appendChild(option_elem);
    
    var border_color = ["Black", "Green", "Red", "Blue", "Brown", "Yellow", "Orange", "Purple"];

    var idx = 0;

    for (; idx < border_color.length; idx++) {    
        var option_elem = document.createElement('option');
	option_elem.value = border_color[idx];
	option_elem.innerHTML = border_color[idx];
	option_elem.setAttribute("style", "margin:3px; border:3px solid " + border_color[idx] + ";");
        elem.appendChild(option_elem);
    }		

    /* Span is used instead of paragraph as a paragraph cannot contain another paragraph.
       Because of this all the '<p>' elements will get automatically closed by '</p>' */
    elem.setAttribute("onchange",   'border_formatting_cbk(this, "border-color")');


	var nav_elem=document.getElementById(nav_id);
    nav_elem.appendChild(elem);
}	

function add_outline_width_selection_button(nav_id) 
{
    var elem = document.createElement('select');
    elem.id = "border-width";

    
    var option_elem = document.createElement('option');
    option_elem.innerHTML = "Outline-Width";
    elem.appendChild(option_elem);
    
    var border_width = ["0px","1px", "2px", "3px", "4px", "5px", "6px", "7px", "8px"];

    var idx = 0;

    for (; idx < border_width.length; idx++) {    
        var option_elem = document.createElement('option');
	option_elem.value = border_width[idx];
	option_elem.innerHTML = border_width[idx];
	option_elem.setAttribute("style", "margin:3px; border:"+ border_width[idx] + " solid black;");
        elem.appendChild(option_elem);
    }		

    /* Span is used instead of paragraph as a paragraph cannot contain another paragraph.
       Because of this all the '<p>' elements will get automatically closed by '</p>' */
    elem.setAttribute("onchange",   'border_formatting_cbk(this, "border-width")');


	var nav_elem=document.getElementById(nav_id);
    nav_elem.appendChild(elem);
}	


/*******************************************************************
* Purpose: Format outline of the selected div. 
*********************************************************************/
function border_formatting_cbk (elem, format_type) {

    $("#" + format_type).css(format_type, elem.value);

    if (newsletter_element_4_deletion.length != 0) {	

        for (var i = 0; i < newsletter_element_4_deletion.length; i++) {
            $(newsletter_element_4_deletion[i]).css(format_type , elem.value);
	}

	newsletter_element_4_deletion = [];
    }
}	


/*******************************************************************
* Purpose: Function to deleted selected elements  
*********************************************************************/
function delete_sel_elem_4m_canvas() 
{ 
    if (newsletter_element_4_deletion.length != 0) {	

        for (var i = 0; i < newsletter_element_4_deletion.length; i++) {
            newsletter_element_4_deletion[i].parentNode.removeChild(newsletter_element_4_deletion[i]);
		}

	newsletter_element_4_deletion = [];
    }
}	

/*******************************************************************
* Purpose: Function to store HTML element when they are clicked
*          so that if Delete is selcted then the element could 
*          deleted
*********************************************************************/
function set_html_elem_4_del()
{ 
	//console.log('element selected for delete');
     newsletter_element_4_deletion = [];

     for (var i = 0; i < arguments.length; i++) {
         /* Without 'var' keyword it will become global */	
	 newsletter_element_4_deletion[i] = arguments[i];
     }	 
}