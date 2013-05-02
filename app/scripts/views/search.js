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
        'search': { 'touchclick': this.$onSearch }
      };
    },
      
      
    $onSearch: function(e) {
      e.stopPropagation();
      this.fire('search', {});
    }
    
  });
  
  
  // Exports
  
  exports.SearchViewController = SearchViewController;
    
}, ['']);