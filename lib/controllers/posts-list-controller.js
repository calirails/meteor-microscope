PostsListController = RouteController.extend({
	template: 'postsList',
	increment: 5,
	limit: function() { 
		// console.log('postLimit param is: ' + parseInt(this.params.postLimit));
		return parseInt(this.params.postLimit) || this.increment;
	},
	sort: {submittedAt: -1},
	waitOn: function() { 
		return Meteor.subscribe('posts', this.sort, 3); 
	},
	data: function() { 
		var cursor = Posts.find({}, {sort: this.sort, limit: this.limit()});
		return { posts: cursor };
	}
});