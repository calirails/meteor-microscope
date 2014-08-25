Migrations.add({
	name: 'Add Intercom hash to users without the hash',
	version: 1,

	up: function() {
		var users = Meteor.users.find({intercomHash: {$exists: false}});
		users.forEach(function(user) {
			Meteor.users.update(user._id, {$set: {
				intercomHash: IntercomHash(user, 'theSecretHash')
			}});
		});
	},

	down: function() {
		Meteor.users.update({}, {$unset: {intercomHash: true}}, {multi: true});
	}
});