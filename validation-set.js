/*global define*/
define(['jquery', 'underscore', 'events'], function ($, _, Events) {
  'use strict';

  var api = {
    add: function (selector, rule) {
      if (!_.has(this._rules, selector)) {
        this._rules[selector] = [];
      }
      this._rules[selector].push(rule);
    },
    remove: function (selector, rule) {
      if (!_.has(this._rules, selector)) {
        return;
      }
      this._rules[selector] = _.without(this._rules[selector], rule);
    },
    selectors: function () {
      return _.keys(this._rules);
    },
    _evaluate: function (deferred) {
      this.trigger('evaluating', this.selectors());
      var self = this;
      var violations = {};

      _.each(this._rules, function (rules, selector) {
        violations[selector] = [];

        _.each(rules, function (rule) {
          var violation = rule(self._$el.find(selector));
          if (violation) {
            violations[selector].push(violation);
          }
        });

        if (violations[selector].length > 0) {
          self.trigger('validation-failed', selector, violations[selector]);
        }
      });

      var allViolations = _.values(violations);
      var hasViolations = _.flatten(allViolations).length > 0;

      if (!hasViolations) {
        deferred.resolve();
      } else {
        deferred.reject(violations);
      }

      this.trigger('evaluated');
    },
    evaluate: function () {
      var deferred = new $.Deferred();
      var asyncEvaluation = _.bind(this._evaluate, this, deferred);
      setTimeout(asyncEvaluation, 0);
      return deferred.promise();
    }
  };

  return function (container) {
    var instance = Object.create(new Events());
    instance._$el = $(container);
    instance._rules = {};
    return _.extend(instance, api);
  };
});