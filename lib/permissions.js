ownsDocument = function(userId, doc) {
	if (doc) { console.log('Value doc is not null and is equal to: ' + doc); }
	if (doc.userId) { console.log('Value of doc.userId is not null and equal to: ' + doc.userId); }
	if (userId) { 
		console.log('Value of userId is not null and equal to: ' + userId); 
	} else {
		console.log('Value of userId is null'); 
	}

	var ownsIt = doc && doc.userId === userId;
	console.log('Value of ownsIt is: ' + ownsIt)
	return ownsIt;
}