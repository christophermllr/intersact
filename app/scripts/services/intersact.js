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
    
    
    
  });
  
  
  // Exports
  
  exports.IntersActService = IntersActService;

}, []);