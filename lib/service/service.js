var Orange = require('orangejs');
var API = require('orangejs').API;

var MovieAdapter = require('../access/movie');
var ActorAdapter = require('../access/actor');

var _ = require('underscore');

var IntersActAPI = API.extend({
  
  initialize: function(db) {
    this.Movie = new MovieAdapter(db);
    this.Actor = new ActorAdapter(db);
  },
  
  getPath: function() {
    return 'api';
  },
  
  getEndpoints: function() {
    return {
      'searchMovies': { validate: ['keyword'] },
      'computeIntersect': { validate: ['movie1', 'movie2'] }
    };
  },
  
  searchMovies: function(data) {
        
    return this.request(function() {
            
      return this.Movie.searchMovies(data.keyword);
        
    }, function(movies) {
            
      return _.map(movies, function(movie) {
          return {
            id: movie.id,
            name: movie.name,
            year: movie.year
          };
      });
        
    });
    
  },
    
  computeIntersect: function(data) {
    
    return this.request(function() {
        
      return this.Actor.computeIntersect(data.movie1, data.movie2);
        
    }, function(actors) {
      return actors;        
    }); 
      
  },
  
});

module.exports = IntersActAPI;