Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { return [Meteor.subscribe('notifications', Meteor.userId())]; }
});

Router.map(function() {
	this.route('postPage', {
			path: '/posts/:_id',
			data: function() { return Posts.findOne({_id: this.params._id}); },
			waitOn: function() { return Meteor.subscribe('comments', this.params._id); }
 	});
 	
 	this.route('postSubmit', {path: '/submit'});
 	
 	this.route('postEdit', {
 			path: '/posts/:_id/edit',
 			data: function() { return Posts.findOne({_id: this.params._id}); }
 	});

	this.route('postsList', {
		path: '/:postLimit', 
		waitOn: function() {
			var limit = parseInt(this.params.postLimit) || 5;
			var posts = Meteor.subscribe('posts', {submittedAt: -1}, limit);
		}, 
		data: function() {
			var limit = parseInt(this.params.postLimit) || 5;
			return {
				posts: Posts.find({}, {sort: {submittedAt: -1}, limit: limit})
			};
		}
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

