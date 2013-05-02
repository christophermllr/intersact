/**
 sales-tools.js | 8.7.2012 | v1.0
 USFoods Mobile Ordering
 Copyright 2012. US Foods Inc.
 @module Sales
*/

Clementine.add('klm.controllers.intersact', function(exports) {
  
  // Declarations
  
  var IntersActController;
  
  
  // Dependencies
    
  var View = Clementine.View;
  
  var Controller                      = include('core.controllers.common').Controller;
  var NavigationController            = include('core.controllers.navigation').NavigationController;
  var ModalController                 = include('core.controllers.modal').ModalController;
  var IntersActRepository             = include('klm.repositories.intersact').IntersActRepository;
  
  // Controller Definitions
  
  IntersActController = Controller.extend({
    
    /**
     @class IntersActController
     @extends Controller
     @constructor
     @param {IntersActRepository} intersactRepository
     */
    initialize: function(intersactRepository) {
      
      // call super
      this._super();
      
      // store repository
      this.intersactRepository = intersactRepository;
       
      // store state
      
      // create primary view
      this.view = new View('intersact');

      console.log('load controller');
      
    },
    
    
    // Configuration
    
    /**
     @method getBindings
     @return {Object} The map of event bindings keyed by name.
     */
    getBindings: function() {
      return {
        'back': { 'back': this.onBack }
      };
    },
    
    /**
     @method getRoutes
     @return {Object} The map of routes methods for the controller.
     */
    getRoutes: function() {
      
      function onHome(current) {
                          
      }
      
      function onList(current) {
                      
      }
    
      return {
        'home': onHome,
        'list': onList,
      };
      
    },
    
    
    // Public Methods
    
    /**
     Loads the controller and binds all listeners.
     @method load
     */
    load: function() {
    
      this.navigateTo('home');

    },
    
    /**
     Unloads the controller and removes all listeners.
     @method unload
     */
    unload: function() {
      
      this._super();
    
    }
    
  });  
  
  // Exports
  
  exports.IntersActController        = IntersActController;
    
}, [
  'core.controllers.common',
  'core.controllers.navigation',
  'core.controllers.modal',
  'klm.repositories.intersact'
]);