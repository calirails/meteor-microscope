Template.notificationList.helpers({
	notifications: function() {
		return Notifications.find({userId: Meteor.userId(), seen: false});
	},
	notificationCount: function() {
		return Notifications.find({userId: Meteor.userId(), seen: false}).count();	
	}
});


Template.notification.helpers({
	notificationPostPath: function() {
		return Router.routes.postPage.path({_id: this.postId});
	}
});


Template.notification.events({
	'click a': function() {
		var updated = Notifications.update(this._id, {$set: {seen: true}});
	}
});