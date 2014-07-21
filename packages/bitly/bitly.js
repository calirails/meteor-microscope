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