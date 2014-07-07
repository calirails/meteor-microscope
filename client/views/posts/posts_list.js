Template.postsList.helpers({
	// See posts-list-controller that replaces this custom property here 
	// by router context for '/' that retrieves paginated list of posts rather than all posts
	// posts: function() { return Posts.find({}, {sort: {submittedAt: -1}}); }

	postsWithRank: function() {
		if (this.posts) {
			this.posts.rewind();
			return this.posts.map(function(post, index, cursor) {
				post._rank = index; // augment with rank property and set it to index as default
				return post;
			});
		}
	}
});