Template.comment.helpers({
	when: function() {
		return new Date(this.submittedAt).toString();
	}
});