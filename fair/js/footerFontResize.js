var currentFontSize = 11;
function changeSize(size) {
	var targetSize;	
	switch ( size ) {
		case "small":
			targetSize = 9;
			break;
		case "normal":
			targetSize = 11;
			break;
		case "large":
			targetSize = 13;
			break;
		default:
			targetSize = 11;
	}
	
	var change = targetSize - currentFontSize;
	currentFontSize = targetSize;
		
	// Apply to all elements
	var wiserContent = document.body;
	//var elements = (document.all)? document.all : document.getElementsByTagName("*");
	var elements = wiserContent.getElementsByTagName("*");
	for ( i=0; i<elements.length; i++ ) {
		if ( elements[i].tagName == "SPAN" || elements[i].tagName == "A" || elements[i].tagName == "DIV" || elements[i].tagName == "P") {
			if ( elements[i].tagName == "DIV" && elements[i].childNodes ) {
				var hasTextNode = false;
				for ( j=0; j<elements[i].childNodes.length; j++ ) {
					if ( elements[i].childNodes[j].nodeType == 3 && trim(elements[i].childNodes[j].nodeValue).length > 0 )
						hasTextNode = true;
				}
				
				if ( hasTextNode == false )
					continue;
			} else if ( elements[i].parentNode
				&& (elements[i].parentNode.tagName == "SPAN" || elements[i].tagName == "A" || elements[i].parentNode.tagName == "P")
				&& (elements[i].parentNode.className ||
					(elements[i].parentNode.parentNode && elements[i].parentNode.parentNode.className &&
						((elements[i].parentNode.parentNode.tagName == "SPAN" || elements[i].tagName == "A" || elements[i].parentNode.parentNode.tagName == "P"))
					)
				) 
			) {
				continue;
			}
			
			if ( elements[i].currentStyle ) {
				if ( elements[i].currentStyle["position"] == "static" &&
					elements[i].currentStyle["fontSize"] != null &&
					elements[i].currentStyle["fontSize"] != "" )
					//if ( (getFontSize(elements[i]) + change) > 0 )
						elements[i].style.fontSize = (getFontSize(elements[i]) + change) + "px";
			} else if ( window.getComputedStyle ) {
				var fontSize = document.defaultView.getComputedStyle(elements[i], null).getPropertyValue("font-size");
				if ( fontSize != null && fontSize != "" )
					elements[i].style.fontSize = (parseInt(fontSize) + change) + "px";
			}
		}
	}
	
	function getFontSize(element) {
		var fs, u;
		var isIE6 = (this.isIE && this.version<=6)?true:false;
		var emu = getPixelSize(element, "1em", false);
				
		element = (typeof(element)=="string")?document.getElementById(element):element;
		
		if ( element.currentStyle ) {
			fs = element.currentStyle["fontSize"];
		} else if ( window.getComputedStyle ) {
			fs = document.defaultView.getComputedStyle(element, null).getPropertyValue("font-size");
		}
		
		if ( /^[-a-z]+$/.test(fs) )
			return cssAbsoluteSizeToPx(fs);
		
		u = fs.match(/^\d*\.?\d*\s*([\w%]+)$/)[1];
		
		if ( element.currentStyle && element.tagName != "BODY" ) {
			if ( u == "%" || isIE6 ) {
				var ps = getFontSize(element.parentNode||element);
			}
		}
		
		switch (u) {
			case "%":
				if ( element.tagName == "BODY" ) {
					return emu;
				} else {
					return ((ps/100)*parseFloat(fs));
				}
			case "pt":
				return getPixelSize(element, fs, false);
			case "em":
				return em2px(fs, element);
			case "px":
				return parseInt(fs);
			default:
				if ( isInteger(fs) == true ) {
					return htmlFontSizeToPx(fs);
				}
				return getPixelSize(element, fs);
		}
	}
	
	function getPixelSize(el, styleVal, force) {
		// get unit of measurement
		var u = styleVal.match(/^\d*\.?\d*\s*([\w%]+)$/)[1];
		// If size is in pt then use Dean Edwards method to convert it to px as it works if not
		// we fallback to some simple math which relies on the fact that most browsers treat points the same now
		// based on the following calculation.
		// 1pt = 1/72nd of an inch
		// Browsers assume 96 CSS px per inch so the calculation is 96/72 = 1.333px per pt
		if(u=="pt"){
			if(el.currentStyle){
				var style = el.style,left = style.left,rsLeft = el.runtimeStyle.left;
				// Put in the new values to get a computed value out
				el.runtimeStyle.left = el.currentStyle.left;
				style.left = styleVal || 0;
				
				px = style.pixelLeft;

				style.left = left;
				el.runtimeStyle.left = rsLeft;
			}else{
				px = Math.round(1.3333*parseFloat(styleVal));		
			}
			return px;
		}

		if(document.createElement){
			var px, el = (!el)?document.body:(typeof(el)=="string")?document.getElementById(el):el; //allow passing of ids OR element references
			var name = (el.id) ? el.id : el.tagName;
			var ue = el.tagName.toUpperCase();
			var div = document.createElement("div"); 
			div.style.position = "absolute"; 
			div.style.visibility = 'hidden'; //hide	
			div.style.lineHeight = '0'; //Apparently IE adds invisible space if this is not set

			// % and em need to be calculated in relation to the parent of the element so do IMG tags
			if(/(%|em)$/.test(styleVal) || ue === "IMG"){
				// unless we have forced it to use the current element
				if(!force && ue!="BODY"){
					el = el.parentNode || el;
				}
				div.style.height = styleVal;
			}else{
				div.style.borderStyle = 'solid';
				div.style.borderBottomWidth = '0';					
				div.style.borderTopWidth = styleVal;	
			}
			//append hidden div to our element OR parent element if required
			el.appendChild(div);			
			//measure size in px by getting offsetHeight
			px = div.offsetHeight;

			//clean up			
			//el.removeChild(div);
			div.removeNode(true);
		}
		return px || 0;
	}
	
	function em2px(em, el) {
		if(!em||em=="0")return 0;
		em = parseFloat(em)+"em"; //may have passed in 2.3em or 2.3 or 2
		var px = getPixelSize(el,em);
		return px;
	}
	
	function cssAbsoluteSizeToPx(size) {
		var px = 0;
		if ( size ) {
			var isIE = (/msie/i.test(navigator.userAgent) && (!window.opera));
			var quirks = (document.documentMode) ? (document.documentMode==5) ? true : false : ((document.compatMode=="CSS1Compat") ? false : true);
			var q = (isIE && quirks);
			switch (size)
			{
				case "xx-small": 
					px = (q) ? 9 : 5;
					break;
				case "x-small": 
					px = (q) ? 11 : 7;
					break;
				case "small":
					px = (q) ? 13 : 11;
					break;
				case "medium": 
					px = (q) ? 16 : 16;
					break;
				case "large": 
					px = (q) ? 19 : 24;
					break;						
				case "x-large": 
					px = (q) ? 23 : 36;
					break;
				case "xx-large":						
					px = (q) ? 28 : 54;
					break;
			}
		}
		return px;
	}
	
	function htmlFontSizeToPx(size) {
		if ( size ) {
			switch (size)
			{
				case "1": 
					return 10;
				case "2": 
					return 14;
				case "3":
					return 16;
				case "4": 
					return 19;
				case "5": 
					return 24;
				case "6": 
					return 32;
				case "7":						
					return 48;
			}
		}
	}
	
	function trim(val) {
		return val.replace(/^\s*/, "").replace(/\s*$/, "");
	}
	
	function isInteger(s) {
		return ( s.toString().search(/^-?[0-9]+$/) == 0 );
	}
}