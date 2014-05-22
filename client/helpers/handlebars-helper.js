UI.registerHelper('pluralize', function(count, thing) {
	if (count === 1) {
		return '1 ' + thing;
	} else { 
		return count + ' ' + thing + 's';
	}
});