// Placeholder for upcoming Bitly wrapper interfaces
Bitly = Bitly || {};

Bitly.shortenUrl = function(url) {
	if (!Meteor.settings.bitly)
		throw new Meteor.Error(500, 'Bitly OAuth token is missing from server side application. Acquire one and add it before retrying.');

	var shortenedResponse = Meteor.http.get('https://api-ssl.bitly.com/v3/shorten?',
		{
			timeout: 500,
			params: {
				'format': 'json',
				'access_token': Meteor.settings.bitly,
				'longUrl': url
			}
		}
	);

	if (shortenedResponse.statusCode === 200) {
		return shortenedResponse.data.data.url;
	} else {
		throw new Meteor.Error(500, 'Bitly call to shorten URL failed with error: ' +
				shortenedResponse.status_txt);
	}
};

Bitly.getClicks = function(link) {
	if (!Meteor.settings.bitly) {
		var error = 'Bitly OAuth token is missing from server side application. Acquire one and add it before retrying.';
		console.log(error);
		throw new Meteor.Error(500, error);
	}

	var statsResponse = Meteor.http.get('https://api-ssl.bitly.com/v3/link/clicks?', 
		{
			timeout: 5000,
			params: {
				'format': 'json',
				'access_token': Meteor.settings.bitly,
				'link': link
			}
		}
	);

	if (statsResponse.data.status_code == 200)
		return statsResponse.data.data.link_clicks;

};

// Extend Meteor.methods
Meteor.methods({
	'getBitlyClicks': function(link) {
		return Bitly.getClicks(link);
	}
});
