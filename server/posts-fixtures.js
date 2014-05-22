if (Posts.find().count() === 0) {
  var now = new Date().getTime();

  // create two users
  var tomId = Meteor.users.insert({
    profile: {name: 'Tom Coleman'}
  });
  tom = Meteor.users.findOne(tomId);

  var sachaId = Meteor.users.insert({
    profile: {name: 'Sacha Greif'}
  });
  sacha = Meteor.users.findOne(sachaId);

  var telescopeId = Posts.insert({
    title: 'Introducing Telescope',
    userId: sacha._id,
    author: sacha.profile.name,
    url: 'http://sachagreif.com/introducing-telescope/',
    submittedAt: now - 7*3600*1000,
    commentsCount: 2,
    upVoters: [],
    votes: 0
  });

  Comments.insert({
    postId: telescopeId,
    userId: tom._id,
    author: tom.profile.name,
    submittedAt: now-5*3600*1000,
    body: 'Interesting project Sacha, can I get involved?'
  });

  Comments.insert({
    postId: telescopeId,
    userId: sacha._id,
    author: sacha.profile.name, 
    submittedAt: now-3*3600*1000, 
    body: 'You sure can Tom!'
    });
  
  Posts.insert({
    title: 'Meteor',
    userId: tom._id,
    author: tom.profile.name,
    url: 'http://meteor.com',
    submittedAt: now-10*3600*1000,
    commentsCount: 0,
    upVoters: [],
    vote: 0
  });
  
  Posts.insert({
    title: 'The Meteor Book',
    userId: tom._id,
    author: tom.profile.name,
    url: 'http://themeteorbook.com',
    submittedAt: now-12*3600*1000,
    commentsCount: 0,
    upVoters: [],
    vote: 0
  });

  // Loop to insert a batch of fake posts
  for (var i = 0; i < 10; i++) { 
    Posts.insert({
    title: 'Test post #' + i,
    author: sacha.profile.name,
    userId: sacha._id,
    url: 'http://google.com/?q=test-' + i, 
    submitted: now - i * 3600 * 1000, 
    commentsCount: 0,
    upVoters: [],
    vote: 0
    }); 
  }
}