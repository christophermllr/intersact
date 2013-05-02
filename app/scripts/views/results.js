/**
 search.js | 8.7.2012 | v1.0
 USFoods Mobile Ordering
 Copyright 2012. US Foods Inc.
 @module Search
*/

Clementine.add('klm.views.results', function(exports) {
  
  // Declarations
  
  var ResultsViewController;
  
  
  // Dependencies
  
  var ViewController = Clementine.ViewController;
  
  
  // Controller Definitions
  
  ResultsViewController = ViewController.extend({
    
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
        'back': { 'touchclick': this.$onBack }
      };
    },
      
      
    $onSearch: function(e) {
      e.stopPropagation();
      this.fire('back');
    }
    
  });
  
  
  // Exports
  
  exports.ResultsViewController = ResultsViewController;
    
}, ['']);