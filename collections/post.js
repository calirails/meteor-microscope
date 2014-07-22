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

		// Extract the allowed client specified attributes
		var postToAdd = _.extend(_.pick(postAttributes, 'url', 'caption'), {
			title: postAttributes.title, // + (this.isSimulation ? '(client)' : '(server)'),
			userId: user._id,
			author: user.username,
			submittedAt: new Date().getTime(),
			commentsCount: 0,
		    upVoters: [],
		    votes: 0
		});

		if (!this.isSimulation) { 
			console.log('we are running real method server side since "isSimulation===false".')
			
			var regexMaskForUrl = /(https?):\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/i;
			if (!!postToAdd.url && postToAdd.url.match(regexMaskForUrl)) {
				var shortenedUrl = Bitly.shortenUrl(postToAdd.url);
				postToAdd.shortenedUrl = shortenedUrl;
			} else {
				throw new Meteor.Error(422, 'This post requires a valid URL passing our format check but does not appear to have one. Please correct and try again.');
			}

			// 	var Future = Npm.require('fibers/future');
			// 	var future = new Future();
			// 	Meteor.setTimeout(function() {
			// 		future.return();
			// 	}, 5*1000);
			// 	future.wait();
		} else {
			console.log('we are running client side since "isSimulation===true".')
		}


		var postId = Posts.insert(postToAdd);
		return postId;
	},

	upVote: function(postId) {
		var voter = Meteor.user();
		if (!voter) {
			throw new Meteor.Error(401, 'You need to be logged in to vote');
		}

		// var post = Posts.findOne(postId);
		// if (!post) {
		// 	throw new Meteor.Error(422, 'Unable to find post to vote on');
		// }

		// if (_.include(post.upVoters, voter._id)) {
		// 	throw new Meteor.Error(422, 'voter.userName' + ' has already voted up this post');
		// }

		Posts.update({
			_id: postId,
			upVoters: {$nin: [voter._id]}
		}, {
			$addToSet: {upVoters: voter._id},
			$inc: {votes: 1}
		});
	}
});