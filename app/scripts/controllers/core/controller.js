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

Clementine.add('core.controllers.common', function(exports) {
  
  // Declarations
  
  var Controller;
  
  
  // Class Definitions
  
  Controller = Class.extend({
    
    /**
     @class Controller
     @extends Class
     @constructor
     */
    initialize: function() {
      
      this.controllers = {};
      
      this.state = null;
      
    },
    
    setParent: function(parent) {
      this._parent = parent;
    },
    
    /**
     @method navigateTo
     @param {String} route The route of the controller to navigate to.
     */
    navigateTo: function(route) {
      
      console.log("[INFO] Navigating to: '" + route + "'");
      
      var current = this.state;      
      var routes = this.getRoutes();
      
      if (routes.hasOwnProperty(route)) {
        routes[route].call(this, current);
      } else {
        throw 'Route ' + route + ' not defined';
      }
      
      this.state = route;
      
    },
    
    get: function(name) {
      if (this.controllers.hasOwnProperty(name)) {
        return this.controllers[name];
      } else {
        return null;
      }
    },
    
    add: function(name, controller) {
            
      if (!this.controllers.hasOwnProperty(name)) {
        
        //console.log('Adding view: ' + name);
        
        controller.setParent(this);
        
        // setup controller
        this.controllers[name] = controller;
        
        // bind events
        var bindings = this.getBindings();
        
        if (bindings.hasOwnProperty(name)) {
          var events = bindings[name];
          for (var event in events) {
            controller.on(event, events[event], this);
          }
        }
        
        // load controller
        controller.load();
        
        if (controller.show) {
          controller.show();
        }
        
      } else{
        throw 'Cannot add view ' + name + ' controller, duplicate key exists';
      }
      
    },
    
    remove: function(name) {
      
      if (this.controllers.hasOwnProperty(name)) {
      
        //console.log('Removing view: ' + name);
      
        this.controllers[name]._parent = null;
        if (this.controllers[name].hide) {
          this.controllers[name].hide().unload().destroy();
        } else {
          this.controllers[name].unload();
        }
        delete this.controllers[name];
      }
      
    },
    
    load: function() {},
    
    unload: function() {
    
      for (var name in this.controllers) {
        if (this.controllers[name].hide) {
          this.controllers[name].hide().unload();
        } else {
          this.controllers[name].unload();
        }
      }
      
      this.controllers = {};
    
    }
    
  }).include(Clementine.Events);
  
  
  // Exports
  
  exports.Controller = Controller;
  
}, []);