

(function(window, $, _, Backbone, undefined) {

  var application = {};

  application.BaseModel = Backbone.Model.extend({
    initalize: function(options) {
      Backbone.Model.prototype.initialize.apply(this, arguments);
    }
  });

  application.BaseView = Backbone.View.extend({
    initialize: function(options) {
      Backbone.View.prototype.initialize.apply(this, arguments);
      this.loadTemplate(options.tpl)
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
    render: function() {
      //$el
      this.$el.html('');
      var context = {};
      if (this.model) {
        _.extend(context, this.model.attributes);
      }
      this.$el.html(this.template(context));
      return this;
    }
  });









}).call(this, window, jQuery, _, Backbone);


