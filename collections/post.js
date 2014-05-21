Posts = new Meteor.Collection('posts');

// Deferred to manual method that bypasses the allow permissions hook anyhow
Posts.allow({
	update: ownsDocument,
	remove: ownsDocument
});

Posts.deny({
	update: function(userId, post, fieldNames) {
		// deny any update that modifies any field other than url or title
		return _.without(fieldNames, 'url', 'title').length > 0;
	}
});

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

		if (!postAttributes.caption)
			throw new Meteor.Error(422, 'A new post requires a caption. Please provide one');

		if (postByUrl) {
			console.log('Error: cannot use same post url as!');
			console.log('       duplicate post with id=' + postByUrl._id + ' and url=' + postByUrl.url);
			throw new Meteor.Error(302, 'A previous post has already claimed that URL. Redirecting...', postByUrl._id);						
		}

		if (this.isSimulation) { console.log('we are running isSimulation.')}

		var toAdd = _.extend(_.pick(postAttributes, 'url', 'caption'), {
			title: postAttributes.title, // + (this.isSimulation ? '(client)' : '(server)'),
			userId: user._id,
			author: user.username,
			submittedAt: new Date().getTime(),
			commentsCount: 0
		});

		// if (!this.isSimulation)	 {
		// 	var Future = Npm.require('fibers/future');
		// 	var future = new Future();
		// 	Meteor.setTimeout(function() {
		// 		future.return();
		// 	}, 5*1000);
		// 	future.wait();
		// }

		var postId = Posts.insert(toAdd);
		return postId;
	}
});