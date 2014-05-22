Template.postSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var toAdd = {
			title: $(e.target).find('[name=title]').val(),
			url: $(e.target).find('[name=url]').val(),
			caption: $(e.target).find('[name=caption]').val(),
		};

		// Rather than add to 'local' proxied collection, we'll call server side 'post' method
		// added._id = Posts.insert(added);
		Meteor.call('post', toAdd, function(error, id) {
			if (error) {
				Errors.throw(error.reason);
			
				if (error.error === 302)
					Router.go('postPage', {_id: error.details});
			} else {
				Router.go('home')
			}
		});

		
	}
});