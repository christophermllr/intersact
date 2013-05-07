/**
 lists.js | 8.7.2012 | v1.0
 @module Common
*/

Clementine.add('klm.views.common.inputs', function(exports) {

  // Declarations
  
  var InputFieldViewController;
  var LiveInputFieldViewController;
  var AutocompleteViewController;
  
  
  // Dependencies
  
  var ViewController = Clementine.ViewController;
  
  
  // Controller Definitions
  
  InputFieldViewController = ViewController.extend({
    
    /**
     @class InputFieldViewController
     @extends ViewController
     @constructor
    */
    initialize: function(parent, view) {
      
      // call super
      this._super.apply(this, arguments);
      
    },
    
    
    // Configuration
    
    /**
     @method getType
     @return {String} The unique name of the view.
     */
    getType: function() {
      return 'input-field';
    },
    
    /**
     @method getBindings
     @return {Object} The map of event bindings keyed by name.
     */
    getBindings: function() {
      return {
        'input-box': { 'input': this.$onKeyPress },
        'clear-btn': { 'touchclick': this.$onClear }
      };
    },
    
    
    // Public Methods
    
    /**
     Updates the current value of the input field
     @method setValue
     @param {String} value A string to set the value of the input field.
     */
    setValue: function(value) {
      this.getElement('input-box').val(value);
    },
    
    /**
     Returns the current value of the input field
     @method getValue
     @return {String} The current value of the input field.
     */
    getValue: function() {
      return this.getElement('input-box').attr('itemid');
    },
    
    /**
     Clears out the value of the input field.
     @method clearValue
     */
    clearValue: function() {
      this.getElement('clear-btn').removeClass('clear');
      this.getElement('input-box').val('').blur();
    },

    /**
     Imitates a user pressing enter while focused on the input field.
     @method triggerEnter
     */
    triggerEnter: function() {
      var searchKeyword = this.getElement('input-box').val();
      this.fire('enter', searchKeyword);
    },


    // DOM Listeners
    
    /**
     Called when a key is pressed while focused in the input field.
     @method $onKeyPress
     @param {Event} e The event object.
     */
    $onKeyPress: function(e) {
      var el = this.getElement('input-box');
      var code = (e.keyCode ? e.keyCode : e.which);
      if (el.val().length > 0) {
        this.getElement('clear-btn').addClass('clear');
      } else {
        this.getElement('clear-btn').removeClass('clear');
      }
      if (code === 13) { // enter keycode
        e.preventDefault();
        el.blur();
        this.fire('enter', el.val());
      }
    },
    
    /**
     Called when the user clicks the clear button on the input field.
     @method $onClear
     @param {Event} e The event object.
     */
    $onClear: function(e) {
      e.stopPropagation();
      this.clearValue();
      this.fire('clear');
    }
    
  });

  
  LiveInputFieldViewController = InputFieldViewController.extend({
    
    /**
     @class LiveInputFieldViewController
     @extends InputFieldController
     @constructor
    */
    initialize: function(parent, view) {
            
      // call super
      this._super.apply(this, arguments);
      
    },
    
    getBindings: function() {
      return {
        'input-box': { 'input': this.$onKeyPress, 'blur': this.$onBlur },
        'clear-btn': { 'touchclick': this.$onClear }
      };
    },
    

    // Configuration

    /**
     @method getType
     @return {String} The unique name of the view.
     */
    getType: function() {
      return 'live-input-field';
    },


    // DOM Listeners

    /**
     Called after the third key is pressed while focused in the input field.
     @method $onKeyPress
     @param {Event} e The event object.
     */
    $onKeyPress: function(e) {
      var that = this;
      if (this.hasOwnProperty("keyPressTimeout")) {
        clearTimeout(this.keyPressTimeout);
      }
      var el = this.getElement('input-box');
      var code = (e.keyCode ? e.keyCode : e.which);
      if (el.val().length > 0) {
        this.getElement('clear-btn').addClass('clear');
      } else {
        this.getElement('clear-btn').removeClass('clear');
      }
      if ((el.val().length > 2 && code !== 13) || el.val().length === 0) {
        this.keyPressTimeout = setTimeout(function() {
          that.fire('enter', el.val());
        }, 500);
      }

      if (code === 13) { // enter keycode
        e.preventDefault();
        this.fire('enter', el.val());
        el.blur();
      }
    },
    
    $onBlur: function(e) {
    
      //this.getElement('result-list').hide();
    
    },
    
    $onChoose: function(e) {
      
      var itemid = $(e.currentTarget).attr('itemid');
      
      this.getElement('input-box').val($(e.currentTarget).text());
      this.getElement('input-box').attr('itemid', itemid);
      
      this.getElement('result-list').hide();
      
    },
    
    setResults: function(itemlist) {
    
      if (!itemlist || itemlist.length === 0) {
        return this.getElement('result-list').empty().hide();
      }
    
      var list = this.getElement('result-list');
      
      list.empty();
    
      list.show();
    
      for (var i=0; i<itemlist.length; i++) {
        
        list.append('<li itemid="' + itemlist[i].id + '">' + itemlist[i].name + ' (' + itemlist[i].year + ')</li>');
        
      }
    
    }

  });
  
  
  AutocompleteViewController = LiveInputFieldViewController.extend({
    
    /**
     @class AutocompleteViewController
     @extends LiveInputFieldViewController
     @constructor
    */
    initialize: function(parent, view) {
            
      // call super
      this._super.apply(this, arguments);
      
    },
    
    getBindings: function() {
      return {
        'input-box': { 'input': this.$onKeyPress, 'blur': this.$onBlur },
        'clear-btn': { 'touchclick': this.$onClear },
        'result-list(li)': { 'click': this.$onChoose }
      };
    },
    

    // Configuration

    /**
     @method getType
     @return {String} The unique name of the view.
     */
    getType: function() {
      return 'autocomplete';
    },


    // DOM Listeners
    
    $onChoose: function(e) {
      
      var itemid = $(e.currentTarget).attr('itemid');
      
      this.getElement('input-box').val($(e.currentTarget).text());
      this.getElement('input-box').attr('itemid', itemid);
      
      this.getElement('result-list').hide();
      
    },
    
    setResults: function(itemlist) {
    
      if (!itemlist || itemlist.length === 0) {
        return this.getElement('result-list').empty().hide();
      }
    
      var list = this.getElement('result-list');
      
      list.empty();
      list.show();
    
      for (var i=0; i<itemlist.length; i++) {
        list.append('<li itemid="' + itemlist[i].id + '"><img class="image" src="' + itemlist[i].imageLink + '"></img>' + itemlist[i].name + ' (' + itemlist[i].year + ')</li>');        
      }
    
    }
    
  });
  
  
  // Exports
  
  exports.InputFieldViewController = InputFieldViewController;
  exports.LiveInputFieldViewController = LiveInputFieldViewController;
  exports.AutocompleteViewController = AutocompleteViewController;

}, []);