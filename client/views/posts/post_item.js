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
	}
});


Template.postItem.events({
	'click .upVoteable': function(e, Template) {
		e.preventDefault();
		Meteor.call('upVote', this._id);
		console.log('voting up now...', this);
	}
})