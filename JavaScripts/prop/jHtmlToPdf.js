/**
 * jHtmlToPdf
 * Author: Ashish Goyal
 * Copyright: Copyright 2016 | Vyavsaay ERP
 * Description: This is an extension of PdfMake. It creates PDF from html code
 */

var htmlToPdf = function (options) 
{	
	var defaults={filename:'vyavsaay',content:[]};				
	var settings = $.extend(defaults, options || {});
	
	settings.filename=settings.filename+".pdf";
		
	this.parseContainer=function (cnt,e, p, styles) 
	{
	    var elements = [];
	    var children = e.childNodes;
	    if (children.length != 0) {
	        for (var i = 0; i < children.length; i++) p = this.parseElement(elements, children[i], p, styles);
	    }
	    if (elements.length != 0) {            
	        for (var i = 0; i < elements.length; i++) cnt.push(elements[i]);
	    }
	    return p;
	};
	
	this.computeStyle=function (o, styles) 
	{
	    for (var i = 0; i < styles.length; i++) {
	        var st = styles[i].trim().toLowerCase().split(":");
	        if (st.length == 2) {
	            switch (st[0]) {
	                case "font-size":{
	                    o.fontSize = parseInt(st[1]);
	                    break;
	                }
	                case "text-align": {
	                    switch (st[1]) {
	                        case "right": o.alignment = 'right'; break;
	                        case "center": o.alignment = 'center'; break;
	                    }
	                    break;
	                }
	                case "font-weight": {
	                    switch (st[1]) {
	                        case "bold": o.bold = true; break;
	                    }
	                    break;
	                }
	                case "text-decoration": {
	                    switch (st[1]) {
	                        case "underline": o.decoration = "underline"; break;
	                    }
	                    break;
	                }
	                case "font-style": {
	                    switch (st[1]) {
	                        case "italic": o.italics = true; break;
	                    }
	                    break;
	                }
	            }
	        }
	    }
	};
	
	
	this.parseElement=function(cnt,e, p, styles) 
	{
	    if (!styles) styles = [];
	    if (e.getAttribute) {
	        var nodeStyle = e.getAttribute("style");
	        if (nodeStyle) {
	            var ns = nodeStyle.split(";");
	            for (var k = 0; k < ns.length; k++) styles.push(ns[k]);
	        }
	    }
	
	    switch (e.nodeName.toLowerCase()) {
	        case "#text": {
	            var t = { text: e.textContent.replace(/\n/g, "") };
	            if (styles) this.computeStyle(t, styles);
	            p.text.push(t);
	            break;
	        }
            case "input":case 'textarea':{
                var t = { text: e.value };
                if(e.value=='')
                {
                    t={text:e.placeholder};
                }
	            if (styles) this.computeStyle(t, styles);
	            p.text.push(t);
	            break;
	        }    
	        case "b":case "strong": {
	            this.parseContainer(cnt, e, p, styles.concat(["font-weight:bold"]));
	            break;
	        }
	        case "u": {
	            this.parseContainer(cnt, e, p, styles.concat(["text-decoration:underline"]));
	            break;
	        }
	        case "i": {
	            this.parseContainer(cnt, e, p, styles.concat(["font-style:italic"]));
	            break;
	        }
            case "a": {
	            this.parseContainer(cnt, e, p, styles);
	            break;
	        }
	        case "span": {
	            this.parseContainer(cnt, e, p, styles);
	            break;
	        }
            case "form": {
	            this.parseContainer(cnt, e, p, styles);
	            break;
	        }    
	        case "img": 
	        {
	           break;
	        }
	        case "br": {
	            p = this.createParagraph();
	            cnt.push(p);
	            break;
	        }
	        case "hr": 
	        {
	            var t = {
	            	table: {
	            		widths: ['*'],
	            		body: [[" "], [" "]]
				    	},
				    	layout: {
				        hLineWidth: function(i, node) {
				            return (i === 0 || i === node.table.body.length) ? 0 : 2;
				        },
				        vLineWidth: function(i, node) {
				            return 0;
				        },
				    }
				 }
	          cnt.push(t);
	          break;              
	        }
	        case "table":
	            {
	                var t = {
	                    table: {
	                        widths: [],
	                        body: []
	                    }
	                }
	                var border = e.getAttribute("border");
	                var isBorder = false;
	                isBorder = true;
	                this.parseContainer(t.table.body, e, p, styles);
	                
	                var widths = e.getAttribute("widths");
	                if (!widths) {
	                    if (t.table.body.length != 0) {
	                        if (t.table.body[0].length != 0) for (var k = 0; k < t.table.body[0].length; k++) t.table.widths.push("auto");
	                    }
	                } else {
	                    var w = widths.split(",");
	                    for (var k = 0; k < w.length; k++) t.table.widths.push(w[k]);
	                }
	                cnt.push(t);
	                break;
	            }
	        case "tbody": {
	            this.parseContainer(cnt, e, p, styles);
	            break;
	        }
	        case "tr": {
	            var row = [];
	            this.parseContainer(row, e, p, styles);
	            cnt.push(row);
	            break;
	        }
	        case "td": {
                p = this.createParagraph();
	            var st = {stack: []}
	            st.stack.push(p);
	            
	            var rspan = e.getAttribute("rowspan");
	            if (rspan) st.rowSpan = parseInt(rspan);
	            var cspan = e.getAttribute("colspan");
	            if (cspan) st.colSpan = parseInt(cspan);
	            
	            this.parseContainer(st.stack, e, p, styles);
	            cnt.push(st);
	            break;
	        }
            case "th": {
	            p = this.createParagraph();
	            var st = {stack: []}
	            st.stack.push(p);
	            
	            var rspan = e.getAttribute("rowspan");
	            if (rspan) st.rowSpan = parseInt(rspan);
	            var cspan = e.getAttribute("colspan");
	            if (cspan) st.colSpan = parseInt(cspan);
	            this.parseContainer(st.stack, e, p, styles.concat(["font-weight:bold"]));            
	            cnt.push(st);
	            break;
	        }
	        case "div":case "p": {
	            p = this.createParagraph();
	            var st = {stack: []}
	            st.stack.push(p);
	            this.computeStyle(st, styles);
	            this.parseContainer(st.stack, e, p);
	            
	            cnt.push(st);
	            break;
	        }
	        default: {
                this.parseContainer(cnt, e, p, styles);
	            break;
	        
                //console.log("Parsing for node " + e.nodeName + " not found");
	            //break;
	        }
	    }
	    return p;
	};

	this.parseHtml=function(cnt,htmlText) 
	{
	    var html = $(htmlText.replace(/\t/g, "").replace(/\n/g, ""));
	    var p = this.createParagraph();
	    for (var i = 0; i < html.length; i++) this.parseElement(cnt,html.get(i), p);
	};

	this.createParagraph=function (){
	    var p = {text:[]};
	    return p;
	};
	
	this.parseHtml(settings.content,settings.html);
	
    //pdfMake.createPdf({content: settings.content}).download(settings.filename);
    //pdfMake.createPdf({content: settings.content}).open();
    var result=pdfMake.createPdf({content: settings.content});
    return result;
};