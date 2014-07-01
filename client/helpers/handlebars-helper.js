UI.registerHelper('pluralize', function(count, thing) {
	if (count === 0 || count > 1) {
		return count + ' ' + thing + 's';
	} else if (count === 1) {
		return '1 ' + thing;
	} else {
		return  'No ' + thing + 's';
	}
});