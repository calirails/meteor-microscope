Template.postEdit.events({
	'submit form': function(e) {
		e.preventDefault();

		var postId = this._id;
		var postAttributes = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val(),
		};

		Posts.update(postId, {$set: postAttributes}, function(error, id) {
			if (error)
				Errors.throw(error.reason);
			else
				Router.go('postPage', {_id: postId});
		});
	},

	'click .delete': function(e) {
		e.preventDefault();

		if (confirm('Sure you want to delete?')) {
			var postId = this._id;
			Posts.remove(postId);
			Router.go('home');
		}
	}
});