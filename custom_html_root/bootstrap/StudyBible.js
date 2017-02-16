jQuery(document).ready(function() {
	//alert('StudyBible.js externaly loaded correctly!');
	$('head').append('<link rel="icon" type="image/png" href="/favicon.png">');
});

(function() {
  if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement("style");
    msViewportStyle.appendChild(
      document.createTextNode("@-ms-viewport{width:1024px !important}")
    );
    document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
  }
})();

/**
 * @method DetectViewPort
 * @author Rick Bonkestoter <rick@directict.nl>
 * @date 2015-05-29
 * @description Detects the zoomfactor of the desired viewport, also will ajust the zoomfactor
 */
function DetectViewPort() {
	var _r;
	_r = {scale:1, width: 1024};
	if( /Android|webOS|BlackBerry/i.test(navigator.userAgent) ) {
	  var ww = ( $(window).width() < window.screen.width ) ? $(window).width() : window.screen.width; //get proper width
	  var mw = 1024; // min width of site
	  var ratio = ww/mw; //calculate ratio
	  if( ww < mw){
	  	_r = {scale:ratio, width: mw};
	  }
	} else if( /iPhone|iPod/i.test(navigator.userAgent) ) {
	  var ww = ( $(window).width() < window.screen.width ) ? $(window).width() : window.screen.width; //get proper width
	  var mw = 580; // min width of site
	  var ratio = ww/mw; //calculate ratio
	  if( ww < mw){
	  	_r = {scale:ratio, width: mw};
	  }
	 
	}
	console.log(_r);
	return JSON.stringify(_r);
}

/**
 * @method DetectMobileDevice
 * @author Rick Bonkestoter <rick@directict.nl>
 * @date 2016-09-12
 * @description Detects if an person is using an mobile device
 * @return Boolean
 */
function DetectMobileDevice() {
	if(/Android|webOS|BlackBerry|iPhone|iPod|iPad/i.test(navigator.userAgent)) {
		return true 
	} else {
		return false
	}
}


function DetectSmartphone() {
	if(/iPhone|iPod/i.test(navigator.userAgent)) {
		return true;
	}
	
	var mobile = window.screen.width < 500;
	
	var isAndroid = /Android/i.test(navigator.userAgent);
	var isMobile = /mobile/i.test(navigator.userAgent);
	
	if(isAndroid && isMobile && mobile) {
		return true;
	}
	
	return false;
}
 