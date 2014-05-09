Tinytest.add('Errors collection starts off empty', function(test) {
	test.equal(Errors.collection.find({}).count(), 0);

	Errors.throw('Bad error is first error!');
	test.equal(Errors.collection.find().count(), 1);

	Errors.collection.remove({}); 
	test.equal(Errors.collection.find().count(), 0);	
});


Tinytest.addAsync('Errors templates works', function(test, done) {
	Errors.throw('Bad error is first error!');
	test.equal(Errors.collection.find({seen: false}).count(), 1);

	
	// render the template
	// OnscreenDiv(Spark.render(function() { return Template.flashErrors(); } ));
	
  	UI.insert(UI.render(Template.flashErrors), document.body);

	// wait a bit...
	Meteor.setTimeout(function() {
		test.equal(Errors.collection.find({seen: false}).count(), 0);
		test.equal(Errors.collection.find({seen: true}).count(), 1);
		test.equal(Errors.collection.find({}).count(), 1);

		Errors.clearSeen();
		test.equal(Errors.collection.find({}).count(), 0);
		done();
	}, 500);
});