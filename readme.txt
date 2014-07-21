// ============ Custom Errors Package ===============
This web site was created by following the learning book at: http://book.discovermeteor.com/

// ============ Local installation and run command ===============
start web site by navigating to the root of meteor app (server side) and type: mrt
or alternatively: use: mrt+set which is aliased in ~/.bash_profile as: mrt+set='mrt --settings settings.json'

// ============ Local installation and run command ===============
// to start up locally, go to root directory and run: mrt
// == you can also run: meteor 
// login/pwd is calvin/???


// ============ Cloud installation and run command ===============
// the cloud DNS claimed on meteor.com is 'cnmic.meteor.com'
// to deploy to the cloud, run: meteor deploy cnmic.meteor.com
// login/pwd is calvin/???


// ============ Custom errors package ===============
The package was named 'cn-meteor-flash-messsages' and is included as a package.
The source code for the package resides at: https://github.com/calirails/meteor-flash-messages.git
	// Github account used for public repo of the custom errors package 
	user name: 'calirails'


// ============ Debug Meteor code ==============
1. Debug client side JS like any other JS application
2. Server side debugging procedure from: http://www.meteorpedia.com/read/Debugging
	Install node-inspector: npm install -g node-inspector
	Start meteor web-app as : 
		1. NODE_OPTIONS='--debug' mrt run (if you are using Meteorite)
		- OR - 
		2. NODE_OPTIONS='--debug' meteor run (or if you don't have Meteorite)
		3. start node-inspector by running the following: 'node-inspector' as shown below.
			calvin@~/Documents/Safezone/Projects/meteor/microscope$ node-inspector
			-> just feedback: Node Inspector v0.7.3
			-> feedback and instruction to: Visit http://127.0.0.1:8080/debug?port=5858 to start debugging.

		Go to the URL given by node-inspector in Chrome
		Debug at will
		Latter, if you need to remove this feature, just unset NODE_OPTIONS
		== OR == 
		For server-side debugging, you can use WebStorm or node-inspector:
