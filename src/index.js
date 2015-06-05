'use strict';
var _ = require('lodash');
var Q = require('q');
var EventEmitter = require('eventemitter3');

var each = require('./each');
var flatten = require('./flatten');
var keys = require('./keys');
var values = require('./values');
var extend = require('./extend');

var adapters = require('./adapters');
var validators = require('./validators');

var vette = {
  /**
   * Add one or more rules for the selector
   * @param {String} selector
   * @param {...Function} rules
   */
  add: function (selector, rules) {
    rules = Array.prototype.slice.call(arguments, 1) || [];
    if (!this.rules.hasOwnProperty(selector)) {
      this.rules[selector] = [];
    }
    this.rules[selector] = this.rules[selector].concat(rules);
  },

  /**
   * Remove one or more rules for the selector
   * @param {String} selector
   * @param {...Function} rules
   */
  remove: function (selector, rules) {
    if (!this.rules.hasOwnProperty(selector)) {
      return;
    }
    if (arguments.length === 1) {
      delete this.rules[selector];
      return;
    }
    rules = Array.prototype.slice.call(arguments, 1) || [];
    this.rules[selector] = _.difference(this.rules[selector], rules);
    if (this.rules[selector].length === 0) {
      delete this.rules.selector;
    }
  },

  selectors: function () {
    return keys(this.rules);
  },

  _evaluate: function (adapter, deferred) {
    this.emit('evaluating', this.selectors());
    var self = this;
    /*
     * violations = {
     *   '[name=fullName]': ['field is required'], //1 violation
     *   '[name=phone]': [] //no violations
     * }
     */
    var violations = {};

    each(this.rules, function (rules, selector) {
      violations[selector] = [];

      each(rules, function (rule) {
        var violation = rule(adapter.find(selector), adapter);
        if (violation) {
          violations[selector].push(violation);
        }
      });

      /*
       * Some rules, like "compose", return an array of
       * violations, so we need to flatten everything.
       */
      violations[selector] = flatten(violations[selector]);

      if (violations[selector].length > 0) {
        self.emit('validation-failed', selector, violations[selector]);
      }
    });

    var allViolations = values(violations);
    var hasViolations = flatten(allViolations).length > 0;

    if (!hasViolations) {
      deferred.resolve();
    } else {
      deferred.reject(violations);
    }

    this.emit('evaluated');
  },

  evaluate: function (target) {
    var self = this;
    var deferred = Q.defer();
    setTimeout(function () {
      self._evaluate(self.adapter(target), deferred);
    }, 0);
    return deferred.promise;
  }
};

function Vette(adapterName) {
  if (!adapters.hasOwnProperty(adapterName || '')) {
    adapterName = 'hash';
  }
  var instance = Object.create(new EventEmitter());
  instance.adapter = adapters[adapterName];
  instance.rules = {};
  return extend(instance, vette);
}

module.exports = extend(Vette, validators);