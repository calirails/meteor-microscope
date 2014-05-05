Posts = new Meteor.Collection('posts');

Posts.allow({
	insert: function(userId, doc) {
		// only allow inserts if user is logged in
		return !!userId;
	}
});