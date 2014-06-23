Meteor.publish('posts', function(sort, pagelimit) {
	console.log("publication context has limit=" + pagelimit);
	return Posts.find({}, {sort: sort, limit: pagelimit});
});

Meteor.publish('singlePost', function(postId) {
	return postId && Posts.find(postId);
})


Meteor.publish('comments', function(postId) {
	return Comments.find({postId: postId});
});


Meteor.publish('notifications', function(userId) {
	return Notifications.find({userId: userId});
});