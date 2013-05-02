/**
 lists.js | 8.7.2012 | v1.0
 @module Common
*/

Clementine.add('usf.views.common.lists', function(exports) {

  // Declarations
  
  var ItemListViewController;
  var InfiniteListViewController;
  
  
  // Dependencies
  
  var ViewController = Clementine.ViewController;
  
  
  // Controller Definition
  
//  ItemListViewController = ViewController.extend({
//    
//    /**
//     @class ItemListViewController
//     @extend ViewController
//     @constructor
//     */
//    initialize: function(parent, view) {
//    
      // call super
//      this._super.apply(this, arguments);
//      
//    },
//    
//    /**
//     @method getType
//     @return {String} The unique name of the view.
//     */
//    getType: function() {
//      return 'item-list';
//    },
//    
//    /**
//     @method getBindings
//     @return {Object} The map of event bindings keyed by name.
//     */
//    getBindings: function() {
//      return {};
//    },
//    
//    
//    
//  });

  ItemListViewController = ViewController.extend({

    // Configuration

    getType: function() {
      return 'item-list';
    },

    setup: function() {

      this.groupKey = '';
      
      if (!this.hasOwnProperty('template') || !this.template) {
        this.template = this.target.find('[itemscope]').outerHTML();
      }
      this.target.find('[itemscope]').remove();

    },


    // Public Methods

    cacheElement: function(obj) {

      // build element
      var element = obj instanceof jQuery ? obj : $(obj);

      // clean element
      element.find('[itemid]').removeAttr('itemid');

    },

    refresh: function() {
      var that = this;
      if (!Browser.scroll) {
        setTimeout(function() {
          if (that.scroller) {
            that.scroller.refresh();
          }
        }, 0);
      }
    },

    setData: function(data) {

      // store data
      this.listData = data;

      // build list
      if (this._visible) {
        this.build(data);
      }

    },

    setMessage: function(msg) {
      this.noResultsMsg = msg;
    },

    setItemCallback: function(fn) {
      this.itemCallback = fn;
    },
      
    getData: function () {
      return this.listData !== null ? this.listData : null;
    },

    processItem: function(item, data, list) {
      if (this.itemCallback) {
        this.itemCallback.call(this, item, data, list);
      }
    },

    build: function(data) {
      
      var li = null;
      var list = this.getElement('list')
      var that = this;
      var frag = document.createDocumentFragment();
      var itemprop;

      this.groupKey = '';
      
      try {
        if (this.getType() === 'infinite-paged-list') {
          this.getElement('indicator-prev').addClass('hidden');
          this.target.scrollTop(0);
        }
      }
      catch(err)
      {
        //do nothing
      }
      
      // clear list
      list.empty();
    
      // check for empty
      if (data.length === 0) {
        this.markEmpty();
        return;
      }

      function processImg() {
        var path = $(this).attr('data-path');
        if (path) {
          $(this).attr('src', path);
        }
      }

      function cleanModel(data) {
        for (var prop in data) {
          data[prop] = (typeof data[prop] === 'function') ? data[prop]() : data[prop];
        }
        return data;
      }

      function cleanModels(items) {
        for (var i = 0; i < items.length; i++) {
          items[i] = cleanModel(items[i]);
        }
        return items;
      }

      data = cleanModels(data);

      // bind list of data
      for (var i = 0; i < data.length; i++) {
        li = $(this.template);
        try {
          if (li.length) {
            li.html(Mustache.to_html(li.html(), data[i]));
          }
        } catch (e) { }
        if (data[i].hasOwnProperty('id')) {
          li.attr('itemid', data[i].id);
        }
        for (var prop in data[i]) {
          itemprop = li.find('[itemprop="' + prop + '"]');
          if (itemprop.length && $(itemprop).get(0).tagName === 'SELECT') {
            if (itemprop.find('[value="' + data[i][prop] + '"]').length) {
              itemprop.val(data[i][prop]);
            } else {
              itemprop.append($('<option selected="selected" value="' + data[i][prop] + '">' + data[i][prop] + '</option>'));
            }
          } else if (itemprop.length && $(itemprop).get(0).tagName === 'INPUT') {
            itemprop.val(data[i][prop]);
          } else if (itemprop) {
            itemprop.text(data[i][prop]);
          }
        }
        li.find('img[data-path]').each(processImg);

        if (data[i].id === "-1") {
          li.css('display', 'none');
        }
        this.processItem(li, data[i], frag);
        frag.appendChild(li.get(0));
      }
            
      list.get(0).appendChild(frag);
      
      if (!Browser.scroll) {
        setTimeout(function() {
          if (that.scroller) {
            that.scroller.refresh();
          }
        }, 150);
      }

    },

    markEmpty: function() {
      var that = this;
      this.groupKey = '';
      var msg = this.noResultsMsg || 'No Results';
      this.getElement('list').empty();
      this.getElement('list').append('<li class="empty">' + msg + '</li>');
      if (!Browser.scroll) {
        setTimeout(function() {
          if (that.scroller) {
            that.scroller.refresh();
          }
        }, 0);
      }
    },

    filter: function(keyword) {

      // filter data
      var data = this.listData;
      var filtered = {};
      var pattern = new RegExp(keyword, 'i');

      for (var i = 0; i < data.length; i++) {
        for (var prop in data[i]) {
          if (pattern.test(data[i][prop])) {
            filtered.push(data[i]);
          }
        }
      }

      // build list
      this.build(filtered);

    },

    clearFilter: function() {
      this.build(this.listData || []);
    },

    clearManually: function() {
      this.clearManually = true;
    },

    clear: function() {
      this.listData = [];
      this.getElement('list').empty();
    },


    // State Handlers

    onWillLoad: function() {
      if (!this.clearManually) {
        this.listData = [];
      }
      if (!Browser.scroll) { this.target.wrapInner('<div class="scroller"></div>'); }
      this._super();
    },

    onDidAppear: function() {
      if (this.listData && this.listData.length > 0) {
        this.build(this.listData);
      } else {
        this.getElement('list').empty();
      }
      var that = this;
      this.getElement('list').on('click', 'li:not(.ignored)', $.proxy(this.$onSelect, this));
      if (!Browser.scroll && !this.scroller) {
        setTimeout(function() {
          that.scroller = new iScroll(that.target.get(0));
        }, 500);
      }
      this._super();
    },

    onWillDisappear: function() {
      if (!Browser.scroll) {
        if (this.scroller && this.scroller.destroy) {
          this.scroller.destroy();
          delete this.scroller;
        }
      }
      this._super();
    },


    // Public Methods

    $onSelect: function(e) {
      var target = $(e.target);
      if (e.target.tagName !== 'SELECT' && e.target.tagName !== 'INPUT' && !target.hasClass('ignore') && !target.hasClass('ignored')) {
        e.stopPropagation();
        if (Object.keys(this.listData).length === 0) { return; }
        this.find('li.touched').removeClass('touched');
        var id = $(e.currentTarget).closest('[itemid]').attr('itemid');
        if (this.listData) {
          var data = null;
          for (var i = 0; i < this.listData.length; i++) {
            if (this.listData[i].id === id) {
              data = this.listData[i];
              break;
            }
          }
          this.fire('select', data);
        }
      }
    }

  });
  
  
  InfiniteListViewController = ItemListViewController.extend({
    
    /**
     @class InfiniteListViewController
     @extend ItemListController
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
      return 'infinite-list';
    },
    
    /**
     @method getBindings
     @return {Object} The map of event bindings keyed by name.
     */
    getBindings: function() {
      return {};
    }
    
  });
  
  
  // Exports
  
  exports.ItemListViewController = ItemListViewController;
  exports.InfiniteListViewController = InfiniteListViewController;

}, []);