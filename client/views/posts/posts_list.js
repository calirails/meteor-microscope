var postsData = [
	{
		title: 'ESPN: clippers unable to stage defense led rally in 4th quarter against the warriros.',
     	author: 'me',
     	url: 'http://nba.espn.com/clippers'
     },
     {
     	 title: 'CNBC: stocks rally after Friday sell off',
	     author: 'me',
	     url: 'http://cnbc.com/growth-stocks'
	 } 
];

//Replaced by router context for '/' that retrieves paginated list of posts rather than all posts
// Template.postsList.helpers({
// 	posts: function() { return Posts.find({}, {sort: {submittedAt: -1}}); }
// });