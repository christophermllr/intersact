/**
 intersact.js | 5.6.2012 | v1.0
*/

Clementine.add('klm.repositories.intersact', function(exports) {

  // Declarations

  var IntersActRepository;

    // Dependencies
  
  var Movie = include('klm.models').Movie;
  var Actor = include('klm.models').Actor;
    
  
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

        // create movie list object
        var movieList = _.map(movies, function(demMovies) {
          return new Movie(demMovies);
        });
        
        // return customer list
        deferred.resolve(movieList);
      
      }, function() {
        
        //fail
        deferred.reject();
                
      });

      return deferred;
      
    },
    
    getActors: function(movie1, movie2) {
      
      var deferred = jQuery.Deferred(), that = this;
            
      App.getService('intersact').getActors(movie1, movie2).then(function(actors) {
        
         // create actor list object
        var actorList = _.map(actors, function(demActors) {
          return new Actor(demActors);
        });

        // return customer list
        deferred.resolve(actorList);
      
      }, function() {
        
        //fail
        deferred.reject();
                
      });

      return deferred;
      
    }
    
  });
  
  
  // Exports
  
  exports.IntersActRepository = IntersActRepository;

}, ['klm.models']);