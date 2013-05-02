/**
 search.js | 8.7.2012 | v1.0
 @module Search
*/

Clementine.add('klm.views.search', function(exports) {
  
  // Declarations
  
  var SearchViewController;
  
  
  // Dependencies
  
  var ViewController = Clementine.ViewController;
  
  
  // Controller Definitions
  
  SearchViewController = ViewController.extend({
    
    /**
     @class ShoppingSearchViewController
     @extend ViewController
     @constructor
     */
    initialize: function(parent, view) {
      
      // call super
      this._super.apply(this, arguments);
      
    },
    
    /**
     @method getType
     @return {String} The unique name of the view.
     */
    getType: function() {
      return 'search';
    },
    
    /**
     @method getBindings
     @return {Object} The map of event bindings keyed by name.
     */
    getBindings: function() {
      return {        
        'search-btn': { 'touchclick': this.$onSearch },
        'movie1': { 'enter': this.onMovieOneEnter },
        'movie2': { 'enter': this.onMovieTwoEnter }
      };
    },
      
    $onSearch: function(e) {
      e.stopPropagation();

      // get movie IDs
      var movie1 = this.getElement('movie1').attr('data-id');
      var movie2 = this.getElement('movie1').attr('data-id');

      var movies = {
        movie1Id: movie1,
        movie2Id: movie2
      }

      this.fire('search', movies);
    },
    
    setMovieOne: function(name, id) {
      this.getView('movie1').setValue(name);
      this.getView('movie1').target.attr('itemid', id);
    },
    
    setMovieTwo: function(name, id) {
      this.getView('movie2').setValue(name);
      this.getView('movie2').target.attr('itemid', id);
    },
    
    onMovieOneEnter: function(e) {
      
      e.stopPropagation();
      
      this.fire('movie-one', e.data);
      
    },
    
    onMovieTwoEnter: function(e) {
      
      e.stopPropagation();
      
      this.fire('movie-two', e.data);
      
    }
    
  });
  
  
  // Exports
  
  exports.SearchViewController = SearchViewController;
    
}, ['']);