/**
 results.js | 8.7.2012 | v1.0
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
      return 'results';
    },
    
    /**
     @method getBindings
     @return {Object} The map of event bindings keyed by name.
     */
    getBindings: function() {
      return {        
        'back-btn': { 'click': this.$onBack }
      };
    },
    
    setResults: function(itemlist) {
        
      if (!itemlist || itemlist.length === 0) {
          return this.getElement('result-list').empty().hide();
        }
      
        var list = this.getElement('result-list');
        
        list.empty();
      
        list.show();
      
        for (var i=0; i<itemlist.length; i++) {
          
          list.append('<li>' + itemlist[i].firstName + ' ' + itemlist[i].lastName + '</li>');
          
        }
    
    },
    
    $onBack: function(e) {
      
      e.stopPropagation();
      
      this.fire('back');
            
    }
    
  });
  
  
  // Exports
  
  exports.ResultsViewController = ResultsViewController;
    
}, ['']);