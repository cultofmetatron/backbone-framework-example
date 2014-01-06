
 (function(window, $, _, Backbone, undefined) {
 
  window.templates = {};

  var $sources = $('script[type="text/template"]');
  $sources.each(function(index, el) {
    var $el = $(el);
    templates[$el.data('name')] = _.template($el.html());
  });

  
  var menuLinks = new application.BaseCollection([
    {linkName: 'Home', url: '/home'},
    {linkName: 'About', url: '/about'},
    {linkName: 'Contact', url: '/contact'}
  ]);

  var MenuLinkView = application.BaseView.extend({
    tagName: 'li',
    tpl: 'menuLinks'
  });

  var MenuLinksView = application.CollectionView.extend({
    tagName: 'ul',
    className: 'nav navbar-nav',
    ItemView: MenuLinkView
  });

  window.topNavView = new application.TopNavView({
    tpl: 'header',
    subViews: {
      linkList: new MenuLinksView({
        collection: menuLinks
      })
    }
  });
  //topNavView.render();

  $('div.main').html(topNavView.render().$el)



}).call(this, window, jQuery, _, Backbone);

