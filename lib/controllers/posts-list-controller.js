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
	posts: function() {
		return Posts.find({}, {sort: this.sort, limit: this.limit()});
	},
	data: function() { 		
		var hasMore = (this.posts().count() === this.limit()) ? true : false;
		var nextPath = this.route.path({postLimit: this.limit() + this.limit()});

		return { 
			posts: this.posts(),
			nextPath: hasMore ? nextPath : null
		};
	}
});