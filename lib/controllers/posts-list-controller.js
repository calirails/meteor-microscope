PostsListController = RouteController.extend({
	template: 'postsList',
	increment: 5,
	limit: function() { 
		// console.log('postLimit param is: ' + parseInt(this.params.postLimit));
		return parseInt(this.params.postLimit) || this.increment;
	},
	sort: {submittedAt: -1},
	waitOn: function() { 
		return Meteor.subscribe('topPosts', this.sort, 3); 
	},
	posts: function() {
		return Posts.find({}, {sort: this.sort, limit: this.limit()});
	},
	data: function() { 		
		var hasMore = (this.posts().count() === this.limit()) ? true : false;
		// var nextPath = this.route.path({postLimit: this.limit() + this.limit()});

		return { 
			posts: this.posts(),
			nextPath: hasMore ? this.nextPath() : null
		};
	}
});

RecentPostsListController = PostsListController.extend({
	sort: {submittedAt: -1, _id: -1},
	nextPath: function() {
		return Router.routes.recent.path({postLimit: this.limit() + this.limit()});
	}
});

FavoredPostsListController = PostsListController.extend({
	sort: {votes: -1, submittedAt: -1, _id: -1},
	nextPath: function() {
		return Router.routes.favored.path({postLimit: this.limit() + this.limit()});
	}
});

MostClickedPostsListController = PostsListController.extend({
	sort: {clicks: -1, submittedAt: -1, _id: -1},
	nextPath: function() {
		return Router.routes.mostClickedOnWeb.path({postLimit: this.limit() + this.limit()});
	}
});
