/**
 intersact.js | 5.6.2012 | v1.0
*/

Clementine.add('klm.repositories.intersact', function(exports) {

  // Declarations

  var IntersActRepository;
    
  
  // Repository Definitions
  
  IntersActRepository = Class.extend({
    
    /**
     @class UserRepository
     @constructor
     */
    initialize: function() {
    
    },

    getMovies: function(keyword) {
      
      var deferred = jQuery.Deferred(), that = this;
            
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
      
      var deferred = jQuery.Deferred(), that = this;
            
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