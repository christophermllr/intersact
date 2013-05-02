/**
 intersacts.js | 8.7.2012 | v1.0
 @module Common
*/

Clementine.add('klm.repositories.intersact', function(exports) {

  // Declarations

  var IntersActRepository;
  
  // Dependencies
  
  
  // Repository Definitions
  
  IntersActRepository = Class.extend({
    
    /**
     @class UserRepository
     @constructor
     */
    initialize: function() {
      
      
    },

    getMovies: function(keyword) {
      
      var that = this;
      
      // create deferred
      var deferred = jQuery.Deferred();
            
      App.getService('intersact').searchMovies(keyword).then(function(movies) {
        
        // return customer list
        deferred.resolve(movies);
      
      }, function() {
        
        //fail
        deferred.reject();
                
      });

      return deferred;
      
    },
    getActors: function(movie1, movie2) {
      
      var that = this;
      
      // create deferred
      var deferred = jQuery.Deferred();
            
      App.getService('intersact').getActors(movie1, movie2).then(function(actors) {
        
        // return customer list
        deferred.resolve(actors);
      
      }, function() {
        
        //fail
        deferred.reject();
                
      });

      return deferred;
      
    }
  });
  
  // Exports
  
  exports.IntersActRepository = IntersActRepository;

}, ['']);