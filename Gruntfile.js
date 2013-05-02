/*global module:false*/
module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/**n * <%= pkg.title || pkg.name %> | <%= pkg.version %> | ' + '<%= grunt.template.today("yyyy-mm-dd") %>n' + ' * <%= pkg.homepage ? pkg.homepage : "" %>n' + ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>n */'
    }
  });
  

  // load tasks
  grunt.loadNpmTasks('grunt-contrib-connect');
    
  // Default task.
  grunt.registerTask('default', ['jshint:beforeconcat', 'csslint', 'concat', 'jshint:afterconcat', 'uglify', 'clean']);
  
  grunt.registerTask('build', ['clean', 'jshint:beforeconcat', 'csslint', 'concat', 'jshint:afterconcat', 'uglify', 'cssmin', 'copy', 'crusher']);
  
  var connect = require('connect');
  
  grunt.registerTask('server', 'Start a custom web server.', function() {
    var done = this.async();
    grunt.log.writeln('Starting web server on port 8000.');
    var spawn = require('child_process').spawn;
    spawn('open', ['http://localhost:8000']);
    connect(connect.static('app')).listen(8000).on('close', done);
  });
  
};