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

Clementine.add('core.controllers.modal', function(exports) {
  
  // Declarations
  
  var ModalController;
  
  
  // Dependencies
  
  var View = Clementine.View;
  
  
  // Class Definitions
  
  ModalController = Class.extend({
    
    /**
     @class SlideInController
     @extends Class
     @constructor
     @param {HTMLElement} view The view for the navigation controller to operate on.
     */
    initialize: function() {

      // store view reference
      this.view = null;
      
      // store target view
      this.target = null;
      
    },
    
    /**
     @method setView
     @param {View} view The view to display within the modal.
     */
    setView: function(view) {
      
      if (this.target) {
        this.target.remove();
        this.target = null;
      }
      
      this.target = view;
            
    },
    
    /**
     @method clearView
     */
    clearView: function() {
      
      if (this.target) {
        this.target.remove();
        this.target = null;
      }
      
      if (this.view) {
        this.view.remove();
        this.view = null;
      }
      
      // this.view.target.innerHTML = '';
    
    },
    
    /**
     @method presentModalView
     */
    presentModalView: function() {      
      
      document.body.appendChild(this.target.target)
      
    },
    
    /**
     @method dismissModalView
     */
    dismissModalView: function() {
      
      document.body.removeChild(this.target.target)
    
    },
    
    unload: function() {
      
      this.view = null;
      
      if (this.target) {
        this.target.remove();
        this.target = null;
      }
      
      if (this.view) {
        this.view.remove();
        this.view = null;
      }
      
    }
    
  });
  
  
  // Exports
  
  exports.ModalController = ModalController;
  
}, []);