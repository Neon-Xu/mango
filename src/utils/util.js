
const util = {
	formatDateTime : function(d, pattern) {
	    pattern = pattern || 'yyyy-MM-dd';
	    var y = d.getFullYear().toString(),
	        o = {
	            M: d.getMonth() + 1, 
	            d: d.getDate(), 
	            h: d.getHours(), 
	            m: d.getMinutes(), 
	            s: d.getSeconds() 
	        };
	    pattern = pattern.replace(/(y+)/ig, function(a, b) {
	        return y.substr(4 - Math.min(4, b.length));
	    });
	    for (var i in o) {
	        pattern = pattern.replace(new RegExp('(' + i + '+)', 'g'), function(a, b) {
	            return (o[i] < 10 && b.length > 1) ? '0' + o[i] : o[i];
	        });
	    }
	    return pattern;
	},
	guid :  function() {
	    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	        return v.toString(16);
	    });
	}
}


export default util;