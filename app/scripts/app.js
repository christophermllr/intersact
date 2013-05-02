/**
 app.js | 8.7.2012 | v1.0
 USFoods Mobile Ordering
 Copyright 2012. US Foods Inc.
 @module Sales
*/

Clementine.add('intersact.app', function(exports) {
  
  // Declarations
  
  var IntersActApplication;
  
  // Dependencies
  
  var View = Clementine.View;
  
  // Declare services
  var IntersActService = include('klm.services.intersact').IntersActService;

  // Declare Controllers
  var IntersActController = include('klm.controllers.intersact').IntersActController;

  // Decare Repository
  var IntersActRepository = include('klm.repositories.intersact').IntersActRepository;
  
  
  // Controller Definitions
  
  IntersActApplication = Class.extend({
    
    /**
     @class IntersActApplication
     @extend Controller
     @param {Object} config
     */
    initialize: function(config) {
      
      // services
      this.services = {
        'intersact': new IntersActService(config.path)
      };
      
      // register views
      View.register(config.views || [], this.render);      
      this.rootController = null;
      
      // store globally
      window.App = this;

      console.log('init app.js');
      
    },
    
    render: function() {
      var intersactRepository = new intersactRepository(localStorage);
      this.root = new IntersActController(intersactRepository);
      this.root.view.appendTo(document.body);
      this.root.load();
      $(document.body).removeClass('hidden');
    },
    
    getService: function(name) {
      
      if (this.services.hasOwnProperty(name)) {
        return this.services[name];
      } else {
        throw 'Service "' + name + '" not found';
      }
      
    }
    
  });
  
  
  // Exports
  
  exports.IntersActApplication = IntersActApplication;
    
}, ['klm.services.intersact', 'klm.controllers.intersact', 'klm.repositories.intersact']);