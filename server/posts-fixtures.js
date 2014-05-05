if (Posts.find().count() === 0) {
	Posts.insert(
		{
			title: 'ESPN: clippers unable to stage defense led rally in 4th quarter against the warriros.',
	     	author: 'me',
	     	url: 'http://nba.espn.com/clippers'
	     });
     
    Posts.insert(
    	{
     	 title: 'CNBC: stocks rally after Friday sell off',
	     author: 'me',
	     url: 'http://cnbc.com/growth-stocks'
	 	});

    Posts.insert(
    	{
     	 title: 'NBA: Miami Heat offense en-fuego as they sweep Bobcats',
	     author: 'me',
	     url: 'http://nba.com/heat/sweep'
	 	});
}