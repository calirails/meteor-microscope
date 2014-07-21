Package.describe({
	summary: 'Bitly package to wrap server side APIs'
});

Package.on_use(function(api) {
	api.add_files('bitly.js', 'server');
	if (api.export)
		api.export('Bitly');
});