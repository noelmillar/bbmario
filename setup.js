var fs = require('fs');

// App Structure
var structure = ['collections', 'controllers', 'models', 'modules', 'templates', 'views'];

fs.mkdir('app', 0777, function(){ console.log('App folder created'); });
for(i=0;i<structure.length;i++) {
	var folder = structure[i];
	fs.mkdir('app/'+folder, 0777, function(){
		fs.exists('app/'+folder, function(exists){ console.log('Folder created'); });
	});
}

// Require Config

config = "// Global Config */ \
\n\trequirejs.config({ \
	\n\t\tbaseUrl:'/js/libs', \
	\n\t\tpaths: { \
		\n\t\t\t'jquery': 'jquery/dist/jquery', \
        \n\t\t\t'backbone': 'backbone/backbone', \
        \n\t\t\t'marionette' : 'marionette/lib/backbone.marionette.min', \
        \n\t\t\t'underscore': 'underscore/underscore', \
        \n\t\t\t'router' : '../app/router', \
        \n\t\t\t'collections' : '../app/collections',    \
        \n\t\t\t'controllers': '../app/controllers', \
        \n\t\t\t'views': '../app/views', \
        \n\t\t\t'models' : '../app/models', \
        \n\t\t\t'modules' : '../app/modules' \
    	\n\t\t} \
    	\n\t\tshim: { \
		\n\t\t\t'underscore': { exports: '_' },\
		\n\t\t\t'backbone': {\
		\n\t\t\t\tdeps: ['jquery', 'underscore'], \
		\n\t\t\t\texports: 'Backbone' \
		\n\t\t\t} \
		\n\t\t}, \
		\n\t\t\t'marionette': { \
		\n\t\t\t\tdeps: ['jquery', 'underscore', 'backbone'], \
		\n\t\t\t\texports: 'Marionette' \
		\n\t\t }\
		\n\t)};";

	fs.writeFile('config.js', config, function(err){
		if (err) throw err;
		console.log('Config created');
		console.log('Preparing to install Marionette via Bower, please wait...');
	});


var exec = require('child_process').exec;

requireShell = exec('bower install requirejs', function(error){
	if(error !== null) { console.log('There was an error installing RequireJS'); }
	console.log('RequireJS install completed.');
});

marionetteShell = exec('bower install marionette',
  function (error) {
    if (error !== null) { console.log('There was an error installing Marionette.'); }
	console.log('Bower Marionette install completed.');
	fs.exists('bower_components/marionette', function(exists){
		if(exists === true) fs.rename('bower_components', 'libs', function(){ console.log('Setup Complete!'); });
	});
});



	
