Comments = new Meteor.Collection('comments');

Meteor.methods({
	comment: function(commentAttributes) {
		var user = Meteor.user();
		var post = Posts.findOne(commentAttributes.postId);

		if (!user)
			throw new Meteor.error(401, 'You need to be logged in to create a comment.');

		if (!post)
			throw new Meteor.error(422, 'Cannot locate an active post that this comment is associated with.');

		if (!commentAttributes.body)
			throw new Meteor.error(422, 'Comment cannot be empty. Give us something to talk about?');

		comment = _.extend(_.pick(commentAttributes, 'postId', 'body'), {
			userId: user._id,
			author: user.username,
			submittedAt: new Date().getTime()
		});

		Posts.update(post._id, {$inc: {commentsCount: 1}});

		comment._id = Comments.insert(comment);

		// Create notification for author of post
		createCommentNotification(comment);

		return comment._id;
	}
})