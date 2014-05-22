Template.header.helpers({
	activeRouteClass: function() {
		var args = Array.prototype.slice.call(arguments, 0);
		args.pop(); // throw out the last argument that handlebars appends to end

		var active = _.any(args, function(name) {
			return Router.current() && Router.current().route.name === name;
		});

		var result = active && 'active';
		return result;
	}
});