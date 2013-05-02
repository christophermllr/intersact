/**
 intersact.js | 8.7.2012 | v1.0
 @module Common
*/

Clementine.add('klm.services.intersact', function(exports) {

  // Declarations

  var IntersActService;

  
  // Dependencies
  
  var Service = Clementine.Service;
  
    
  // Repository Definitions
  
  IntersActService = Service.extend({
  
    /**
     @class IntersAct Service
     @extends Service
     @constructor
     */
    initialize: function() {
      
      // call super
      this._super.apply(this, arguments);
      
    },
    
    getType: function() {
      return 'intersact';
    },
    
    getPrefix: function() {
      return 'api/';
    },

    searchMovies: function(keyword) {

      var params = {
        keyword: keyword
      };

      var map = function(data) {
        if (data === null) {
          throw 'Invalid session';
        }
        return data;
      };

      return this.deferRequest('searchMovies', 'GET', params, map);

    },

    getActors: function(movie1, movie2) {

      var params = {
        movie1: movie1,
        movie2: movie2
      };

      var map = function(data) {
        if (data === null) {
          throw 'Invalid session';
        }
        return data;
      };

      return this.deferRequest('computeIntersect', 'GET', params, map);
    }
    
    
    
  });
  
  
  // Exports
  
  exports.IntersActService = IntersActService;

}, []);