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


// Ticket created at: https://github.com/DiscoverMeteor/book/issues/299
Meteor.publish('topPosts', function(sort, limit) {
	var sub = this, commentHandles = [], postHandle = null;
  
  	// send over the top two comments attached to a single post
	function publishPostComments(postId) {
		var commentsCursor = Comments.find({postId: postId}, {limit: 2}); 
		commentHandles[postId] = Meteor.Collection._publishCursor(commentsCursor, sub, 'comments');
		console.log('Inside publishPostComments, for the current post (Id=' + postId + ') comment count is: ' + Comments.find({postId: postId}, {limit: 2}).count());
  	}

	postHandle = Posts.find({}, {sort: sort, limit: limit}).observeChanges({ 
		added: function(id, post) {
	      	publishPostComments(id);
	      	sub.added('posts', id, post);
    	},

		changed: function(id, fields) { 
			sub.changed('posts', id, fields);
		},

		removed: function(id) {
	      	// stop observing changes on the post's comments
			commentHandles[id] && commentHandles[id].stop(); // delete the post
			sub.removed('posts', id);
		}
	});
  
  	sub.ready();
	// make sure we clean everything up (note `_publishCursor` does this for us with the comment observers) 
	sub.onStop(function() { postHandle.stop(); });
});


// Meteor.publish('postsAndComments', function(sort, pagelimit) {
// 	var publisher = this, commentHandles = [], postHandle = null;

// 	// send over top 2 comments for specified post
// 	function publishCommentsForPost(post) {
// 		var commentsCursor = Comments.find({postId: post._id}, {limit: 2});
// 		commentHandles[post._id] = Meteor.Collection._publishCursor(commentsCursor, publisher, 'comments');
// 	}


// 	postHandle = Posts.find({}, {sort: sort, limit: pagelimit}).observeChanges({
// 		added: function(id, post) {
// 			publishCommentsForPost(id);
// 			publisher.added('posts', id, post._id);
// 		}, 

// 		changed: function(id, fields) {
// 			publisher.changed('posts', id, fields);
// 		},

// 		removed: function(id) {
// 			// stop observing changes on these comments, this matters because we want to avoid memory leaks
// 			commentHandles[id] && commentHandles[id].stop();
// 			// remove post by forwarding to publisher
// 			publisher.removed('posts', id);
// 		}
// 	});

// 	publisher.ready();

// 	// make sure we stop and clean up after pulication
// 	// note: that _publishCursor handles the comments for us inline
// 	publisher.onStop(function() {
// 		postHandle.stop();
// 	});
// });

