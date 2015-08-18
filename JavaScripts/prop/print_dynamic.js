/*******************************************************************
* Purpose:     Fuction to add buttons for formatting text   
* Description: Adds buutons and appends it to the navigation pane
*********************************************************************/
function add_button_4_txt_formatting(nav_id,format_specifier, formatting_type, button_name) 
{
    var elem = document.createElement("button");
    elem.id       = "txt_formatting_button";
    elem.setAttribute("onclick","format_selected_text('" + format_specifier + "')");
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
    var unique_id = Math.round(Math.random()*100);
    
    /* Adding draggable and resizable div elements */
    var new_parent = document.createElement("div");
    new_parent.setAttribute("id", "parent_" + unique_id);
    new_parent.setAttribute("class", "draggable");
    new_parent.setAttribute("style", "padding: 10px; width:200px; border:1px solid #000000;");

    var new_child = document.createElement("div");
    new_child.setAttribute("id", unique_id);
    new_child.setAttribute("class", "editable");
    new_child.setAttribute("contenteditable", "true");
    new_child.setAttribute("style", "width:200px; height:100px;");

    //Append these elemnts id DOM hierarchy under section area
    section_elem.appendChild(new_parent);
    new_parent.appendChild(new_child);
    	
    /* Fuction to store element value for deletion */
    $("#parent_" + unique_id).click(function () {
        set_html_elem_4_del(this);
    });
	    
    /* Make editable(child) element resizable and 
       draggable(parent) element draggable*/
    $(".editable").resizable();
    $(".draggable").draggable();

    /********* Code so that the text in editable area can be 
     selected without dragging the divs. The common area which
     is both editable and draggable has been disabled for dragging*/
    var draggableDiv = $('#parent_' + unique_id).draggable();

    $('#' + unique_id, "#parent_" + unique_id).mousedown(function(ev) {
         draggableDiv.draggable('disable');
    }).mouseup(function(ev) {
         draggableDiv.draggable('enable');
    });
    /********************* END************************/

    /* Adjust the width of the Parent DIV as soon as the child resizable 
       div's width is changed. */
    $("#" + unique_id).mouseup(function() {
        $('#parent_' + unique_id).css('width', $('#' + unique_id).width());
    });
};
 
/*******************************************************************
* Purpose:     Fuction to format selected text   
* Description: This function formats the selected text in the browser
*              window
*********************************************************************/
function format_selected_text( format_specifier) 
{
    var range, html;
    if (window.getSelection && window.getSelection().getRangeAt) {
	html  = window.getSelection();    
	strg  = extract_html();    
        range = window.getSelection().getRangeAt(0);
        range.deleteContents();

        var elem_4_insertion = document.createElement("div");

	elem_4_insertion.innerHTML = "<"+ format_specifier + " contenteditable='false'><" + format_specifier + " class='format_class' contenteditable='true'>" + strg + "</" + format_specifier + "></" + format_specifier + ">";
	console.log(elem_4_insertion.innerHTML);

        var frag = document.createDocumentFragment(), child;
        while ( (child = elem_4_insertion.firstChild) ) {
            frag.appendChild(child);
        }

        range.insertNode(frag);

	$(".format_class").keyup(function(e) {
	    //e.stopPropagation();		
	    console.log('CHILD ASHU');
            console.log(this.textContent);	
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
     newsletter_element_4_deletion = [];

     for (var i = 0; i < arguments.length; i++) {
         /* Without 'var' keyword it will become global */	
	 newsletter_element_4_deletion[i] = arguments[i];
     }	 
}