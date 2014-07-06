// Constants for animating and offsetting posts
POST_HEIGHT = 80;
var Positions = new Meteor.Collection(null); // create a local collection

Template.postItem.helpers({
	domain: function(){
		var a = document.createElement('a');
		a.href = this.url
		return a.hostname;
	},
	ownPost: function() {
		return this.userId && Meteor.user() ? Meteor.user()._id === this.userId : false;
	},
	upVoteAllowed: function() {
		var userId = Meteor.userId();
		if (userId) {//&& !_.include(this.upVoters, userId)) {
			return 'btn-primary upVoteable';
		} else {
			return 'disabled';
		}
	},
	joinedComments: function() {
		return Comments.find({postId: this._id});
	},
	attributes: function() {
		var post = _.extend({}, Positions.findOne({postId: this._id}), this);
		var newPosition = post._rank * POST_HEIGHT;
		var attributes = {};

		if (! _.isUndefined(post.position)) {
			var offset = post.position - newPosition;
			attributes.style = "top: " + offset + "px";
			if (offset === 0)
				attributes.class = "post animate";
		}

		Meteor.setTimeout(function(){
			Positions.upsert({postId: post._id}, {$set: {position: newPosition}})
		});

		return attributes;
	}
});


Template.postItem.events({
	'click .upVoteable': function(e, Template) {
		e.preventDefault();
		Meteor.call('upVote', this._id);
		console.log('voting up now...', this);
	}
})