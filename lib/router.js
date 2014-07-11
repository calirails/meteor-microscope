Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { return [Meteor.subscribe('notifications', Meteor.userId())]; }
});

Router.map(function() {
	this.route('postPage', {
			path: '/posts/:_id',
			waitOn: function() { return [
				Meteor.subscribe('singlePost', this.params._id)
				, Meteor.subscribe('comments', this.params._id)
				]; 
			},
			data: function() { return Posts.findOne({_id: this.params._id}); }
 	});
 	
 	this.route('postSubmit', { 
			path: '/submit',
			disableProgress: true
	});

 	// Fpr RSS
 	this.route('rss', {
 		where: 'server',
 		path: '/feed.xml',
 		action: function() {
 			console.log('server side route for feed.xml handling.');
 			var feed = new RSS({
 				title: 'New Microscope Posts',
 				description: 'The latest posts on Microscope through RSS feeds.'
 			});

 			Posts.find({}, {sort: {submittedAt: -1}, limit: 20}).forEach(function(post) {
 				feed.item({
 					title: post.title,
 					description: post.body,
 					author: post.author,
 					date: post.submittedAt,
 					url: '/posts/' + post._id
 				});
 			});

 			this.response.write(feed.xml());
 			this.response.end();
 		}
 	});

 	// For APIs 
 	this.route('apiAllPosts', {
 		where: 'server',
 		path: '/api/posts',
 		action: function() {
 			var parameters = this.request.query,
		        limit = !!parameters.limit ? parseInt(parameters.limit) : 20,
		        data = Posts.find({}, {limit: limit, fields: {title: 1, author: 1, url: 1, submitted: 1}}).fetch();
 			this.response.write(JSON.stringify(data));
 			this.response.end();
 		}
 	});

 	this.route('apiSinglePost', {
 		where: 'server',
 		path: '/api/posts/:_id',
 		action: function() {
 			console.log('postId passed in was:' + this.params._id);
 			var post = Posts.findOne(this.params._id)
 			if (post) {
	 			this.response.write(JSON.stringify(post));
	 			this.response.end();
	 		} else {
	 			this.response.writeHead(404, {'Content-Type': 'text/html'});
	 			this.response.write('Post not found for Id:' + this.params._id);
	 		}
 		}
 	});
 	
 	this.route('postEdit', {
 			path: '/posts/:_id/edit',
 			waitOn: function() { return Meteor.subscribe('singlePost', this.params._id); },
 			data: function() { return Posts.findOne({_id: this.params._id}); } 
 	});

	this.route('home', {
		path: '/', 
		controller: RecentPostsListController
	});

	this.route('recent', {
		path: '/recent/:postLimit?', 
		controller: RecentPostsListController
	});

	this.route('favored', {
		path: 'favored/:postLimit?', 
		controller: FavoredPostsListController
	});
});

var requireLogin = function(pause) {
	if (!Meteor.user()) {
		if (Meteor.loggingIn())
			this.render(this.loadingTemplate)
		else
			this.render('accessDenied');
		
		this.stop();
	}
}

Router.onBeforeAction(requireLogin, {only: 'postSubmit'})
if (Meteor.isClient) {
	Router.onBeforeAction('loading');
	Router.onBeforeAction(function() { Errors.clearSeen(); });
}

