Template.postSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var added = {
			title: $(e.target).find('[name=title]').val(),
			url: $(e.target).find('[name=url]').val(),
			caption: $(e.target).find('[name=caption]').val(),
		};

		added._id = Posts.insert(added);
		Router.go('postPage', added);

	}
});