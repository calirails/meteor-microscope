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

Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {only: 'postSubmit'})
Router.onBeforeAction(function() { Errors.clearSeen(); });

