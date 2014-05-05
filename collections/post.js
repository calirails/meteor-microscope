Posts = new Meteor.Collection('posts');

// Deferred to manual method that bypasses the allow permissions hook anyhow
// Posts.allow({
// 	insert: function(userId, doc) {
// 		// only allow inserts if user is logged in
// 		return !!userId;
// 	}
// });

Meteor.methods({
	post: function(postAttributes) {
		var user = Meteor.user(),
			postByUrl = Posts.findOne({url: postAttributes.url});

		if (!user)
			throw new Meteor.Error(401, 'You must be signed in to create a new post.');

		if (!postAttributes.url)
			throw new Meteor.Error(422, 'A new post requires a url. Please provide one');			

		if (!postAttributes.title)
			throw new Meteor.Error(422, 'A new post requires a title. Please provide one');

		if (postByUrl)
			throw new Meteor.Error(302, 'A previous post has already claimed that URL. Redirecting...', postByUrl._id);						

		var toAdd = _.extend(_.pick(postAttributes, 'url', 'caption'), {
			title: postAttributes.title + (this.isSimulation ? '(client)' : '(server)'),
			userId: user._id,
			author: user.username,
			submittedAt: new Date().getTime()
		});

		if (!this.isSimulation)	 {
			var Future = Npm.require('fibers/future');
			var future = new Future();
			Meteor.setTimeout(function() {
				future.return();
			}, 5*1000);
			future.wait();
		}

		var postId = Posts.insert(toAdd);
		return postId;


	}
});