Package.describe({summary: 'A custom package to show errors on web pages as flash messages.'});

Package.on_use(function(api, where) {
	api.use(['minimongo', 'mongo-livedata', 'templating'], 'client');
	
	api.add_files(['errors.js', 'flash-errors.html', 'flash-errors.js'], 'client');

	if (api.export) {
		api.export('Errors');
	};
});
