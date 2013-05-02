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

Clementine.add('core.controllers.slide', function(exports) {
  
  // Declarations
  
  var SlideInController;
  
  
  // Class Definitions
  
  SlideInController = Class.extend({
    
    /**
     @class SlideInController
     @extends Class
     @constructor
     @param {HTMLElement} view The view for the navigation controller to operate on.
     */
    initialize: function(view) {
      
      // store view reference
      this.view = view;
            
      this.menuView = null;
      this.mainView = null;
      
    },
    
    /**
     @method setView
     @param {View} view The controller view to display in the slide in.
     */
    setView: function(view) {
      
      this.mainView = view;
      
//      while (this.mainView.target.hasChildNodes()) {
//        this.mainView.target.removeChild(this.mainView.target.lastChild);
//      }
      
      view.appendTo(this.view);
      
    },
    
    hasView: function() {
      
      return !!this.mainView;
      
    },
    
    /**
     @method setMenu
     @param {View} menu The menu view to use in the slide in.
     */
    setMenu: function(menu) {
                  
      this.menuView = menu;
      menu.appendTo(this.view);
      
      setTimeout(function() {
        menu.target.classList.add('scroll');
      }, 1000);
            
    },
    
    toggleMenu: function() {
      
      var el = $(this.mainView.target);
      
      if (el.hasClass('translate')) {
        el.removeClass('translate');
      } else {
        el.addClass('translate');
      }
      
    },
    
    showMenu: function() {
      $(this.mainView.target).addClass('translate');      
    },
    
    hideMenu: function() {
      $(this.mainView.target).removeClass('translate');
    },
    
    remove: function() {
    
      if (this.menuView) {
        this.view.target.removeChild(this.menuView.target);
      }
      
      if (this.mainView) {
        this.view.target.removeChild(this.mainView.target);
      }
      
      this.menuView = null;
      this.mainView = null;
    
    },
    
    getViewName: function() {
      if (this.mainView) {
        return this.mainView.name;
      } else {
        throw 'View not set for slide in controller.';
      }
    }
    
  });
  
  
  // Exports
  
  exports.SlideInController = SlideInController;
  
}, []);