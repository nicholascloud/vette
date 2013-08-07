/*global define*/
define(['jquery', 'underscore', 'moment', 'events'], function ($, _, moment, Events) {
  'use strict';

  function compare(inclusive) {
    var api = Object.create({
      btw: function (a, low, high) {
        return this.gt(high, a) &&
          this.lt(low, a);
      }
    });
    if (inclusive) {
      api.gt = function (a, b) { return a >= b; };
      api.lt = function (a, b) { return a <= b; };
    } else {
      api.gt = function (a, b) { return a > b; };
      api.lt = function (a, b) { return a < b; };
    }
    return api;
  }

  var numericValidators = {
    numeric: function (fieldName, message) {
      fieldName = fieldName || 'field';
      message = message || (fieldName + ' must be numeric');
      return function ($e) {
        if (isNaN($e.val())) {
          return message;
        }
      };
    },
    range: function (lower, upper, inclusive, fieldName, message) {
      lower = Number(lower);
      upper = Number(upper);
      inclusive = inclusive || false;
      fieldName = fieldName || 'field';
      message = message || (fieldName + ' must be between ' + lower + ' and ' + upper);
      return function ($e) {
        var value = Number($e.val());
        if (!compare(inclusive).btw(value, lower, upper)) {
          return message;
        }
      };
    },
    gt: function (number, inclusive, fieldName, message) {
      number = Number(number);
      inclusive = inclusive || false;
      fieldName = fieldName || 'field';
      message = message || (fieldName + ' must be greater than ' + number);
      return function ($e) {
        var value = Number($e.val());
        if (!compare(inclusive).gt(value, number)) {
          return message;
        }
      };
    },
    gteq: function (number, fieldName, message) {
      number = Number(number);
      fieldName = fieldName || 'field';
      message = message || (fieldName + ' must be greater than or equal to ' + number);
      return this.gt(number, true, fieldName, message);
    },
    lt: function (number, inclusive, fieldName, message) {
      number = Number(number);
      inclusive = inclusive || false;
      fieldName = fieldName || 'field';
      message = message || (fieldName + ' must be less than ' + number);
      return function ($e) {
        var value = Number($e.val());
        if (!compare(inclusive).lt(value, number)) {
          return message;
        }
      };
    },
    lteq: function (number, fieldName, message) {
      number = Number(number);
      fieldName = fieldName || 'field';
      message = message || (fieldName + ' must be less than or equal to ' + number);
      return this.lt(number, true, fieldName, message);
    }
  };

  var dateValidators = {
    before: function (selector, inclusive, fieldName, message) {
      selector = selector || '';
      inclusive = inclusive || false;
      fieldName = fieldName || 'field';
      message = message || (fieldName + ' must occur before');
      return function ($e, $root) {
        var before = Date.parse($e.val());
        var after = Date.parse($root.find(selector).val());
        if (!compare(inclusive).lt(before, after)) {
          return message;
        }
      };
    },
    after: function (selector, inclusive, fieldName, message) {
      selector = selector || '';
      inclusive = inclusive || false;
      fieldName = fieldName || 'field';
      message = message || (fieldName + ' must occur after');
      return function ($e, $root) {
        var after = Date.parse($e.val());
        var before = Date.parse($root.find(selector).val());
        if (!compare(inclusive).gt(after, before)) {
          return message;
        }
      };
    }
  };

  var genericValidators = {
    required: function (fieldName, message) {
      fieldName = fieldName || 'field';
      message = message || (fieldName + ' must have a value');
      return this.minLength(1, fieldName, message);
    },
    match: function (regex, fieldName, message) {
      fieldName = fieldName || 'field';
      message = message || (fieldName + ' format is incorrect');
      return function ($e) {
        if (!regex.test($e.val())) {
          return message;
        }
      };
    },
    minLength: function (length, fieldName, message) {
      fieldName = fieldName || 'field';
      length = Number(length);
      message = message || (fieldName + ' has a minimum length of ' + length);
      return function ($e) {
        if ($e.val().length < length) {
          return message;
        }
      };
    },
    maxLength: function (length, fieldName, message) {
      fieldName = fieldName || 'field';
      length = Number(length);
      message = message || (fieldName + ' has a maximum length of ' + length);
      return function ($e) {
        if ($e.val().length > length) {
          return message;
        }
      };
    },
    any: function (options, fieldName, message) {
      fieldName = fieldName || 'field';
      message = message || (fieldName + ' is not a valid choice');
      options = options || [];
      return function ($e) {
        if (options.length === 0) {
          return message;
        }
        if (!_.contains(options, $e.val())) {
          return message;
        }
      };
    },
    same: function (selector, fieldName, message) {
      fieldName = fieldName || 'field';
      selector = selector || '';
      message = message || (fieldName + ' is not the same');
      return function ($e, $root) {
        if($e.val() !== $root.find(selector).val()) {
          return message;
        }
      };
    },

    /**
     * Allows you to provide a function [getValue] that will be responsible for
     * providing the actual data value to [rule], which is a validation rule.
     *
     * var set = new ValidationSet(this._$el);
     * var any = validators.any(['none', 'few', 'many']);
     * var accessor = validators.accessor(function ($e) {
     *   //for some reason the value is missing; default to 'none'
     *   return $el.val() ? $el.val() : 'none';
     * }, any);
     * set.add('[name=howMany]', accessor);
     *
     * @param {Function} getValue
     * @param {Function} rule
     * @returns {Function}
     */
    accessor: function (getValue, rule) {
      return function ($e, $root) {
        var value = getValue($e, $root);
        return rule({
          val: function () {
            return value;
          }
        });
      };
    },

    /**
     * Composes multiple rules to be evaluated as a unit.
     *
     * var set = new ValidationSet(this._$el);
     * var composed = validators.compose(
     *   validators.numeric(),
     *   validators.gteq(10),
     *   validators.lt(100)
     * );
     * set.add('[name=score]', composed);
     *
     * The validation result will be returned as a single string, delimited by
     * the pipe character (or whatever delimiter is passed as the first argument
     * to `compose()`).
     *
     * @param {String} [delimiter]
     * @param {...Function} rules
     * @returns {Function}
     */
    compose: function (rules) {
      rules = Array.prototype.slice.call(arguments, 0);
      return function ($e, $root) {
        var violations = [];
        _.each(rules, function (rule) {
          var violation = rule($e, $root);
          if (violation) {
            violations.push(violation);
          }
        });
        return violations;
      };
    },

    /**
     * Applies a precondition to the validation rule; if the precondition
     * returns `true`, the rule will execute. If the precondition returns
     * `false`, the rule will be be ignored.
     * @param {Function} predicate
     * @param {...Function} rules
     * @returns {Function}
     */
    precondition: function (predicate, rules) {
      rules = Array.prototype.slice.call(arguments, 1);
      rules = this.compose.apply(this, rules);
      return function ($e, $root) {
        if (predicate($e, $root)) {
          return rules($e, $root);
        }
      };
    }
  };

  var validators = _.extend(
    genericValidators,
    dateValidators,
    numericValidators
  );

  var vette = {
    /**
     * Add one or more rules for the selector
     * @param {String} selector
     * @param {...Function} rules
     */
    add: function (selector, rules) {
      rules = Array.prototype.slice.call(arguments, 1) || [];
      if (!_.has(this._rules, selector)) {
        this._rules[selector] = [];
      }
      this._rules[selector] = _.union(this._rules[selector], rules);
    },
    /**
     * Remove one or more rules for the selector
     * @param {String} selector
     * @param {...Function} rules
     */
    remove: function (selector, rules) {
      if (!_.has(this._rules, selector)) {
        return;
      }
      if (arguments.length === 1) {
        delete this._rules[selector];
        return;
      }
      rules = Array.prototype.slice.call(arguments, 1) || [];
      this._rules[selector] = _.difference(this._rules[selector], rules);
    },
    selectors: function () {
      return _.keys(this._rules);
    },
    _evaluate: function ($el, deferred) {
      this.trigger('evaluating', this.selectors());
      var self = this;
      /*
       * violations = {
       *   '[name=fullName]': ['field is required'], //1 violation
       *   '[name=phone]': [] //no violations
       * }
       */
      var violations = {};

      _.each(this._rules, function (rules, selector) {
        violations[selector] = [];

        _.each(rules, function (rule) {
          var violation = rule($el.find(selector), $el);
          if (violation) {
            violations[selector].push(violation);
          }
        });

        /*
         * Some rules, like "compose", return an array of
         * violations, so we need to flatten everything.
         */
        violations[selector] = _.flatten(violations[selector]);

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
    evaluate: function ($el) {
      var deferred = new $.Deferred();
      var asyncEvaluation = _.bind(this._evaluate, this, $el, deferred);
      setTimeout(asyncEvaluation, 0);
      return deferred.promise();
    }
  };

  function Vette() {
    var instance = Object.create(new Events());
    instance._rules = {};
    return _.extend(instance, vette);
  }

  return _.extend(Vette, validators);
});