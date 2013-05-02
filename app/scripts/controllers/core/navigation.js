/**
 * Copyright (c) 2010-12 ClementineJS

 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:

 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

Clementine.add('core.controllers.navigation', function(exports) {
  
  // Declarations
  
  var NavigationController;
  
  
  // Dependencies
  
  var View = Clementine.View;
  
  
  // Class Definitions
  
  NavigationController = Class.extend({
    
    /**
     @class NavigationController
     @extends Class
     @constructor
     @param {HTMLElement} view The view for the navigation controller to operate on.
     @param {HTMLElement} toolbar The view for the toolbar that operates the navigation contoller
     */
    initialize: function(view, toolbar) {
      
      // store view reference
      this.view = view;
      
      // store toolbar reference
      this.toolbarView = toolbar;
      
      // create container view
      this.containerView = new View('container');
            
      // append toolbar if it exists
      if (toolbar) {
        this.toolbarView.appendTo(this.view);
      }
      
      // append container
      this.containerView.appendTo(this.view);
      
      
    },
    
    // Public Methods
    
    /**
     Pushes a view onto the top of the navigation controller.
     @method pushView
     @param {HTMLElement} view The view to push onto the navigation controller.
     */
    pushView: function(view) {
            
      $(this.containerView.target).children().each(function() {
        $(this).addClass('hidden');
      });
      
      // append view
      view.appendTo(this.containerView);
      
    },
    
    /**
     Pops a view off the top of the navigation controller.
     @method popView
     */
    popView: function(view) {
            
      this.containerView.target.removeChild(view.target);
    
      $(this.containerView.target).children().last().removeClass('hidden');
    
    },
    
    /**
     Pops all views off the stack except for the bottom most view.
     @method popToRootView
     */
    popToRootView: function() {
    
    },
    
    unload: function() {
      
      this.view = null;
      this.toolbarView = null;
      
      if (this.containerView) {
        this.containerView.remove();
        this.containerView = null;
      }
      
    }
    
  });
  
  
  // Exports
  
  exports.NavigationController = NavigationController;
  
}, []);