Notifications = new Meteor.Collection('notifications');

Notifications.allow({
	update: ownsDocument
});

createCommentNotification = function(comment) {
	var post = Posts.findOne(comment.postId);

	if (comment.userId !== post.userId) {
		var notification = Notifications.insert({
			postId: post._id,
			userId: post.userId,
			commentId: comment._id,
			commenterName: comment.author,
			seen: false
		});

		return notification._id;
	}
}