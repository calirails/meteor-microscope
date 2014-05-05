Router.configure({
	layoutTemplate: 'layout',
	loadingTempalte: 'loadingT',
	waitOn: function() { return Meteor.subscribe('posts'); }
});

Router.map(function() {
	this.route('postsList', {path: '/'});
	this.route('postPage', 
		{
			path: '/posts/:_id',
			data: function() { return Posts.findOne({_id: this.params._id}); }
	 	}
 	);
 	this.route('postSubmit', {path: '/submit'});
});

var requireLogin = function(pause) {
	if (!Meteor.user()) {
		this.render('accessDenied');
		pause();
	}
}

Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {only: 'postSubmit'})

