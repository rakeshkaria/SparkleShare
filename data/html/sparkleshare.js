/*
SparkleShare is teh awezome!
Be sure to edit the CoffeeScript file; it generates the JavaScript.

You can do so by running:
  coffee -c --bare .

If you'd like it to generate the JS file while you're editing, do this:
  coffee -w -c --bare .

You can test the event viewer in your browser by running:
  python -m SimpleHTTPServer
...and browsing to http://localhost:8000/events.html

*/var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
(function($) {
  var ChangeSet, changes;
  $.ajaxSetup({
    isLocal: true,
    dataType: 'json'
  });
  ChangeSet = (function() {
    ChangeSet.ajax;
    ChangeSet.changes = {};
    ChangeSet.repo;
    function ChangeSet(repo) {
      this.repo = repo != null ? repo : 'all';
      this.update();
    }
    ChangeSet.prototype.update = function() {
      return this.ajax = $.getJSON(this.buildFileName(), __bind(function(data) {
        return this.changes = data;
      }, this));
    };
    ChangeSet.prototype.buildFileName = function() {
      return "spec.json";
    };
    ChangeSet.prototype.render = function() {
      var _compileTemplate, _ref;
      _compileTemplate = __bind(function() {
        var template;
        template = Handlebars.compile($('#changeset-template').html());
        return $('#content').html(template(this.changes));
      }, this);
      /* 
      * Either template it now, or when a pending ajax request finishes
      */
      if ((_ref = this.ajax) != null ? _ref.readyState : void 0) {
        return this.ajax.complete(function() {
          return _compileTemplate();
        });
      } else {
        return _compileTemplate();
      }
    };
    return ChangeSet;
  })();
  changes = new ChangeSet;
  changes.render();
})(jQuery);