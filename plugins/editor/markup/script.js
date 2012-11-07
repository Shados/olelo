(function(){var e=function(){var g=typeof document.selection!=="undefined"&&typeof document.selection.createRange!=="undefined";return{getSelectionRange:function(a){var b,c,d;a.focus();if(typeof a.selectionStart!=="undefined"){b=a.selectionStart;c=a.selectionEnd}else if(g){b=document.selection.createRange();c=b.text.length;if(b.parentElement()!==a)throw"Unable to get selection range.";if(a.type==="textarea"){d=b.duplicate();d.moveToElementText(a);d.setEndPoint("EndToEnd",b);b=d.text.length-c}else{a=
a.createTextRange();a.setEndPoint("EndToStart",b);b=a.text.length}c=b+c}else throw"Unable to get selection range.";return{start:b,end:c}},getSelectionStart:function(a){return this.getSelectionRange(a).start},getSelectionEnd:function(a){return this.getSelectionRange(a).end},setSelectionRange:function(a,b,c){var d;a.focus();if(typeof c==="undefined")c=b;if(typeof a.selectionStart!=="undefined")a.setSelectionRange(b,c);else if(g){d=a.value;a=a.createTextRange();c-=b+d.slice(b+1,c).split("\n").length-
1;b-=d.slice(0,b).split("\n").length-1;a.move("character",b);a.moveEnd("character",c);a.select()}else throw"Unable to set selection range.";},getSelectedText:function(a){var b=this.getSelectionRange(a);return a.value.substring(b.start,b.end)},insertText:function(a,b,c,d,h){d=d||c;var i=c+b.length,k=a.value.substring(0,c);d=a.value.substr(d);a.value=k+b+d;h===true?this.setSelectionRange(a,c,i):this.setSelectionRange(a,i)},replaceSelectedText:function(a,b,c){var d=this.getSelectionRange(a);this.insertText(a,
b,d.start,d.end,c)},wrapSelectedText:function(a,b,c,d){b=b+this.getSelectedText(a)+c;this.replaceSelectedText(a,b,d)}}}();window.Selection=e})();
(function(e){e.fn.extend({getSelectionRange:function(){return Selection.getSelectionRange(this[0])},getSelectionStart:function(){return Selection.getSelectionStart(this[0])},getSelectionEnd:function(){return Selection.getSelectionEnd(this[0])},getSelectedText:function(){return Selection.getSelectedText(this[0])},setSelectionRange:function(g,a){return this.each(function(){Selection.setSelectionRange(this,g,a)})},insertText:function(g,a,b,c){return this.each(function(){Selection.insertText(this,g,a,
b,c)})},replaceSelectedText:function(g,a){return this.each(function(){Selection.replaceSelectedText(this,g,a)})},wrapSelectedText:function(g,a,b){return this.each(function(){Selection.wrapSelectedText(this,g,a,b)})}})})(jQuery);(function(e){var g={creole:{link:["[[","link text","]]"],bold:["**","bold text","**"],italic:["//","italic text","//"],ul:["* ","list item","",true],ol:["# ","list item","",true],h1:["= ","headline","",true],h2:["== ","headline","",true],h3:["=== ","headline","",true],sub:["~~","subscript","~~"],sup:["^^","superscript","^^"],del:["--","deleted text","--"],ins:["++","inserted text","++"],image:["{{","image","}}"],preformatted:["{{{","preformatted","}}}"]},markdown:{link:function(a){return(a=prompt("link target:",
a))?["[","link text","]("+a+")"]:null},bold:["**","bold text","**"],italic:["*","italic text","*"],ul:["* ","list item","",true],ol:["1. ","list item","",true],h1:["","headline","\n========",true],h2:["","headline","\n--------",true],image:function(a){return(a=prompt("image path:",a))?["![","image alt text","]("+a+")"]:null},preformatted:["    ","preformatted","",true]},orgmode:{bold:["*","bold text","*"],italic:["/","italic text","/"],ul:["- ","list item",""],ol:["1. ","list item",""],h1:["* ","headline",
""],h2:["** ","headline",""],h3:["*** ","headline",""]},textile:{link:function(a){return(a=prompt("link target:",a))?['"',"link text",'":'+a]:null},bold:["*","bold text","*"],italic:["_","italic text","_"],ul:["* ","list item","",true],ol:["# ","list item","",true],h1:["h1. ","headline","",true],h2:["h2. ","headline","",true],h3:["h3. ","headline","",true],em:["_","emphasized text","_"],sub:["~","subscript","~"],sup:["^","superscript","^"],del:["-","deleted text","-"],ins:["+","inserted text","+"],
image:["!","image","!"]}};e.fn.markupEditor=function(a){if(a=g[a]){var b=e('<ul class="button-bar" id="markup-editor"/>'),c=[];for(var d in a)c.push(d);c.sort();for(d=0;d<c.length;++d)b.append('<li><a href="#" id="markup-editor-'+c[d]+'">'+c[d]+"</a></li>");this.before(b);var h=this;e("a",b).click(function(){var i=a[this.id.substr(14)],k=h.getSelectedText();if(typeof i=="function")i=i(k);if(i){var f=h.getSelectionRange(),j=i[0],m=i[1],l=i[2];if(i[3]){h.setSelectionRange(f.start-1,f.start);if(f.start!==
0&&h.getSelectedText()!="\n")j="\n"+j;h.setSelectionRange(f.end,f.end+1);if(h.getSelectedText()!="\n")l+="\n"}if(f.start==f.end){h.insertText(j+m+l,f.start,f.start,false);h.setSelectionRange(f.start+j.length,f.start+j.length+m.length)}else h.insertText(j+k+l,f.start,f.end,false)}return false})}}})(jQuery);$(function(){var e=Olelo.page_mime;if(e=="application/x-empty"||e=="inode/directory")e=Olelo.default_mime;(e=/text\/x-(\w+)/.exec(e))&&$("#edit-content").markupEditor(e[1])});
