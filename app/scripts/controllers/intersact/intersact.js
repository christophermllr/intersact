/**
 intersact.js | 8.7.2012 | v1.0
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
  var SearchViewController            = include('klm.views.search').SearchViewController;
  var ResultsViewController           = include('klm.views.results').ResultsViewController;
  
  // Controller Definitions
  
  IntersActController = Controller.extend({
    
    /**
     @class IntersActController
     @extends Controller
     @constructor
     @param {IntersActRepository} intersactRepository
     */
    initialize: function(intersactRepository) {

      console.log('load controller');
      
      // call super
      this._super();
      // store repository
      this.intersactRepository = intersactRepository;
       
      // store state
      this.actors = null;

      // create primary view
      this.view = new View('intersact');

      // create child views
      this.searchView = new View('search', 'search.html');
      console.log('create search');
      this.resultsView = null;
      console.log('create results');
      
    },
    
    
    // Configuration
    
    /**
     @method getBindings
     @return {Object} The map of event bindings keyed by name.
     */
    getBindings: function() {
      return {
        'search': { 'search': this.onSearch, 'movie-one': this.onMovieOne, 'movie-two': this.onMovieTwo },
        'results': { 'back': this.onBack }
      };
    },
    
    /**
     @method getRoutes
     @return {Object} The map of routes methods for the controller.
     */
    getRoutes: function() {
      
      function onSearch(current) {
        
        if (this.searchView) {
          $(this.searchView.target).show();
          $(this.searchView.target).find('input[type="text"]').val('').removeAttr('itemid');
        }
        
        if (this.resultsView) {
          $(this.resultsView.target).hide();
        }
        
        if (current === 'results') {
        
          this.remove('results');
          
          return;
        
        }
        
        // create the order list view controller
        var searchViewController = new SearchViewController(this, this.searchView);

        // add the order list view controller
        this.add('search', searchViewController);
                  
        // push the order list view
        this.searchView.appendTo(this.view);
                          
      }
      
      function onResults(current) {
        
        this.resultsView = new View('results', 'results.html');
        
        // create the order list view controller
        var resultsViewController = new ResultsViewController(this, this.resultsView);
                
        $(this.searchView.target).hide();
        
        $(this.resultsView.target).show();
        
        resultsViewController.setResults(this.actors);
        
        // add the order list view controller
        this.add('results', resultsViewController);
                  
        // push the order list view
        this.resultsView.appendTo(this.view);
        
                      
      }
    
      return {
        'search': onSearch,
        'results': onResults,
      };
      
    },
    
    
    // Public Methods
    
    /**
     Loads the controller and binds all listeners.
     @method load
     */
    load: function() {
    
      this.navigateTo('search');

    },
    
    /**
     Unloads the controller and removes all listeners.
     @method unload
     */
    unload: function() {
      
      this._super();
    
    },

    //Event handlers

    onSearch: function(e) {
      
      console.log('asdsa', e.data);
      
      var movies = e.data;
      var that = this;

      // fetch customers
      this.intersactRepository.getActors(movies.movie1Id, movies.movie2Id).then(function(actors) {  

        that.actors =  actors;

        that.navigateTo('results');

      }, function() {

        // show error
        console.log('error');
        
      });

    },

    onMovieOne: function(e) {
      
      e.stopPropagation();
      
      var keyword = e.data, that = this;
      
      // fetch customers
      this.intersactRepository.getMovies(keyword).then(function(movies) {
        
        that.get('search').getView('movie1').setResults(movies);
                  
      }, function() {

        // show error
        console.log('error');
        
      });
      
    },
    
    onMovieTwo: function(e) {
      
      e.stopPropagation();
            
      var keyword = e.data, that = this;
      
      // fetch customers
      this.intersactRepository.getMovies(keyword).then(function(movies) {
                
        that.get('search').getView('movie2').setResults(movies);
                  
      }, function() {

        // show error
        console.log('error');
        
      });
      
    },

    onBack: function(e) {
      
      console.log('back');
      
      this.navigateTo('search');
      
    }
    
  });  
  
  // Exports
  
  exports.IntersActController        = IntersActController;
    
}, [
  'core.controllers.common',
  'core.controllers.navigation',
  'core.controllers.modal',
  'klm.repositories.intersact',
  'klm.views.search',
  'klm.views.results'
]);