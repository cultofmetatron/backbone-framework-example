
 (function(window, $, _, Backbone, undefined) {
 
  window.templates = {};

  var $sources = $('script[type="text/template"]');
  $sources.each(function(index, el) {
    var $el = $(el);
    templates[$el.data('name')] = _.template($el.html());
  });



}).call(this, window, jQuery, _, Backbone);

