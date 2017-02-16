/**
 * @properties={typeid:24,uuid:"4AA98EC2-1F59-4674-BA9C-CDF96219FC7C"}
 */
function test3456() {
	var vError = '410 Gone\n\
		{\n\
		  "code" : 410,\n\
		  "errors" : [ {\n\
		    "domain" : "calendar",\n\
		    "location" : "updatedMin",\n\
		    "locationType" : "parameter",\n\
		    "message" : "The requested minimum modification time lies too far in the past.",\n\
		    "reason" : "updatedMinTooLongAgo"\n\
		  } ],\n\
		  "message" : "The requested minimum modification time lies too far in the past."\n\
		}';

	var vLines = vError.split('\n');
	vLines.splice(0, 1);
	vError = vLines.join('\n');
	/**
	 * @type {*}
	 */
	var vErrorJSON = JSON.parse(vError);

	scopes.tools.output(vErrorJSON.message);
}

/**
 * TODO generated, please specify type and doc for the params
 * @param data
 *
 * @properties={typeid:24,uuid:"F0C98600-7F6C-4600-A66F-EE0155320582"}
 */
function base64_decode(data) {
	//  discuss at: http://phpjs.org/functions/base64_decode/
	// original by: Tyler Akins (http://rumkin.com)
	// improved by: Thunder.m
	// improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	//    input by: Aman Gupta
	//    input by: Brett Zamir (http://brett-zamir.me)
	// bugfixed by: Onno Marsman
	// bugfixed by: Pellentesque Malesuada
	// bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	//   example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
	//   returns 1: 'Kevin van Zonneveld'
	//   example 2: base64_decode('YQ===');
	//   returns 2: 'a'
	//   example 3: base64_decode('4pyTIMOgIGxhIG1vZGU=');
	//   returns 3: '✓ à la mode'

	var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
		ac = 0,
		dec = '',
		tmp_arr = [];

	if (!data) {
		return data;
	}

	data += '';

	do {
		// unpack four hexets into three octets using index points in b64
		h1 = b64.indexOf(data.charAt(i++));
		h2 = b64.indexOf(data.charAt(i++));
		h3 = b64.indexOf(data.charAt(i++));
		h4 = b64.indexOf(data.charAt(i++));

		bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

		o1 = bits >> 16 & 0xff;
		o2 = bits >> 8 & 0xff;
		o3 = bits & 0xff;

		if (h3 == 64) {
			tmp_arr[ac++] = String.fromCharCode(o1);
		} else if (h4 == 64) {
			tmp_arr[ac++] = String.fromCharCode(o1, o2);
		} else {
			tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
		}
	} while (i < data.length);

	dec = tmp_arr.join('');

	return decodeURIComponent(escape(dec.replace(/\0+$/, '')));
}

/**
 * TODO generated, please specify type and doc for the params
 * @param data
 *
 * @properties={typeid:24,uuid:"D0049CCC-18A7-42F2-B384-02015ABA4A51"}
 */
function base64_encode(data) {
	//  discuss at: http://phpjs.org/functions/base64_encode/
	// original by: Tyler Akins (http://rumkin.com)
	// improved by: Bayron Guevara
	// improved by: Thunder.m
	// improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// improved by: Rafał Kukawski (http://kukawski.pl)
	// bugfixed by: Pellentesque Malesuada
	//   example 1: base64_encode('Kevin van Zonneveld');
	//   returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
	//   example 2: base64_encode('a');
	//   returns 2: 'YQ=='
	//   example 3: base64_encode('✓ à la mode');
	//   returns 3: '4pyTIMOgIGxhIG1vZGU='

	var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
		ac = 0,
		enc = '',
		tmp_arr = [];

	if (!data) {
		return data;
	}

	data = unescape(encodeURIComponent(data));

	do {
		// pack three octets into four hexets
		o1 = data.charCodeAt(i++);
		o2 = data.charCodeAt(i++);
		o3 = data.charCodeAt(i++);

		bits = o1 << 16 | o2 << 8 | o3;

		h1 = bits >> 18 & 0x3f;
		h2 = bits >> 12 & 0x3f;
		h3 = bits >> 6 & 0x3f;
		h4 = bits & 0x3f;

		// use hexets to index into b64, and append result to encoded string
		tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
	} while (i < data.length);

	enc = tmp_arr.join('');

	var r = data.length % 3;

	return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
}

/**
 * TODO generated, please specify type and doc for the params
 * @param str
 *
 * @properties={typeid:24,uuid:"DF11F2F6-59B3-4C3B-B028-64419C6DF7DB"}
 */
function sha1(str) {
	//  discuss at: http://phpjs.org/functions/sha1/
	// original by: Webtoolkit.info (http://www.webtoolkit.info/)
	// improved by: Michael White (http://getsprink.com)
	// improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	//    input by: Brett Zamir (http://brett-zamir.me)
	//   example 1: sha1('Kevin van Zonneveld');
	//   returns 1: '54916d2e62f65b3afa6e192e6a601cdbe5cb5897'

	var rotate_left = function(n, s) {
		var t4 = (n << s) | (n >>> (32 - s));
		return t4;
	};

	/*var lsb_hex = function (val) {
	 // Not in use; needed?
	 var str="";
	 var i;
	 var vh;
	 var vl;

	 for ( i=0; i<=6; i+=2 ) {
	 vh = (val>>>(i*4+4))&0x0f;
	 vl = (val>>>(i*4))&0x0f;
	 str += vh.toString(16) + vl.toString(16);
	 }
	 return str;
	 };*/

	var cvt_hex = function(val) {
		var str = '';
		var i;
		var v;

		for (i = 7; i >= 0; i--) {
			v = (val >>> (i * 4)) & 0x0f;
			str += v.toString(16);
		}
		return str;
	};

	var blockstart;
	var i, j;
	var W = new Array(80);
	var H0 = 0x67452301;
	var H1 = 0xEFCDAB89;
	var H2 = 0x98BADCFE;
	var H3 = 0x10325476;
	var H4 = 0xC3D2E1F0;
	var A, B, C, D, E;
	var temp;

	// utf8_encode
	str = unescape(encodeURIComponent(str));
	var str_len = str.length;

	var word_array = [];
	for (i = 0; i < str_len - 3; i += 4) {
		j = str.charCodeAt(i) << 24 | str.charCodeAt(i + 1) << 16 | str.charCodeAt(i + 2) << 8 | str.charCodeAt(i + 3);
		word_array.push(j);
	}

	switch (str_len % 4) {
	case 0:
		i = 0x080000000;
		break;
	case 1:
		i = str.charCodeAt(str_len - 1) << 24 | 0x0800000;
		break;
	case 2:
		i = str.charCodeAt(str_len - 2) << 24 | str.charCodeAt(str_len - 1) << 16 | 0x08000;
		break;
	case 3:
		i = str.charCodeAt(str_len - 3) << 24 | str.charCodeAt(str_len - 2) << 16 | str.charCodeAt(str_len - 1) << 8 | 0x80;
		break;
	}

	word_array.push(i);

	while ( (word_array.length % 16) != 14) {
		word_array.push(0);
	}

	word_array.push(str_len >>> 29);
	word_array.push( (str_len << 3) & 0x0ffffffff);

	for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
		for (i = 0; i < 16; i++) {
			W[i] = word_array[blockstart + i];
		}
		for (i = 16; i <= 79; i++) {
			W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
		}

		A = H0;
		B = H1;
		C = H2;
		D = H3;
		E = H4;

		for (i = 0; i <= 19; i++) {
			temp = (rotate_left(A, 5) + ( (B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B, 30);
			B = A;
			A = temp;
		}

		for (i = 20; i <= 39; i++) {
			temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B, 30);
			B = A;
			A = temp;
		}

		for (i = 40; i <= 59; i++) {
			temp = (rotate_left(A, 5) + ( (B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B, 30);
			B = A;
			A = temp;
		}

		for (i = 60; i <= 79; i++) {
			temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B, 30);
			B = A;
			A = temp;
		}

		H0 = (H0 + A) & 0x0ffffffff;
		H1 = (H1 + B) & 0x0ffffffff;
		H2 = (H2 + C) & 0x0ffffffff;
		H3 = (H3 + D) & 0x0ffffffff;
		H4 = (H4 + E) & 0x0ffffffff;
	}

	temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
	return temp.toLowerCase();
}
