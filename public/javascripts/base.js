

(function(window, $, _, Backbone, undefined) {

  var application = {};

  application.BaseModel = Backbone.Model.extend({
    initalize: function(options) {
      Backbone.Model.prototype.initialize.apply(this, arguments);
    }
  });

  application.BaseView = Backbone.View.extend({
    initialize: function(options) {
      this.contextTransforms = [];
      Backbone.View.prototype.initialize.apply(this, arguments);
      this.loadTemplate(options.tpl);
      if (this.model) {
        this.listenTo(this.model, 'change', this.render);
      }
    },
    loadTemplate: function(tpl) {
      if (_.isString(tpl)) {
        this.template = templates[tpl];
      } else if (_.isFunction(tpl)) {
        this.template = tpl;
      } else {
        throw new Error('template must be a function or string');
      }
    },
    addToRenderContext: function(fn) {
      this.contextTransforms.push(fn);
    },
    render: function() {
      //$el
      this.$el.html('');
      var context = {};
      if (this.model) {
        _.extend(context, this.model.attributes);
      }
      _(this.contextTransforms).each(function(fn) {
        fn.call(this, context);
      }, this);

      this.$el.html(this.template(context));
      return this;
    }
  });

  application.CollectionView = application.BaseView.extend({
    initialize: function(options) {
      application.BaseView.prototype.initialize.apply(this, arguments);
      if (this.ItemView || options.ItemView) {
        this.ItemView = options.ItemView || this.ItemView;
      } else if (this.tpl || options.tpl) {
        this.loadTemplate(options.tpl || this.tpl);
      } else {
        if (_.isUndefined(this.ItemView || options.ItemView) && _.isUndefined(this.tpl || options.tpl)) {
          throw new Error('wtf mehul, you forgot all the bobms!!');
        }
      }

      if (this.collection) {
        //bla
        this.bindRenderEvents();
      }

    },
    bindRenderEvents: function() {
      var bindEvent = function(event, context) {
        context.listenTo(context.collection, event, context.render);
      }
      var events = ['change', 'add',
        'remove', 'reset', 'sort', 'destroy'
      ];
      _(events).each(function(event, index) {
        bindEvent(event, this);
      }, this);
    },
    render: function() {
      this.$el.html('');
      var nodes;
      if (this.ItemView) {
        nodes = this.renderForItemView();
      } else {
        nodes = this.renderForTemplate();
      }
      _(nodes).each(function($node, index) {
        this.$el.append($node);
      }, this);
      return this;
    },
    renderForItemView: function() {
      var $nodes = this.collection.map(function(model, index) {
        return new this.ItemView({
          model: model
        }).render().$el;
      });
      return $nodes;
    },
    renderForTemplate: function() {
      var $nodes =  this.collection.map(function(model, index) {
        return new application.BaseView({
          model: model
        }).render().$el;
      });
      return $nodes;
    }
  });

  application.TopNavView = application.BaseView.extend({
    tpl: 'header',
    initialize: function(options) {
      application.BaseView.prototype.initialize.apply(this, arguments);
    }
  });

  window.application = application;

}).call(this, window, jQuery, _, Backbone);


