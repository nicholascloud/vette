/*global define*/
define(['underscore', './validation-set'], function (_, ValidationSet) {
  'use strict';

  var api = {
    createSet: function (container) {
      return new ValidationSet(container);
    },
    required: function (fieldName, message) {
      fieldName = fieldName || 'field';
      message = message || (fieldName + ' must have a value');
      return function ($e) {
        if ($e.val().length === 0) {
          return message;
        }
      };
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
    numeric: function (fieldName, message) {
      fieldName = fieldName || 'field';
      message = message || (fieldName + ' must be numeric');
      return function ($e) {
        if (isNaN($e.val())) {
          return message;
        }
      };
    },
    numericRange: function (lower, upper, fieldName, message) {
      fieldName = fieldName || 'field';
      lower = Number(lower);
      upper = Number(upper);
      message = message || (fieldName + ' must be between ' + lower + ' and ' + upper);
      return function ($e) {
        var value = $e.val();
        if (isNaN(value)) {
          return message;
        }
        value = Number(value);
        if (value > upper || value < lower) {
          return message;
        }
      };
    },
    gt: function (number, fieldName, message) {
      fieldName = fieldName || 'field';
      number = Number(number);
      message = message || (fieldName + ' must be greater than ' + number);
      return function ($e) {
        var value = $e.val();
        if (isNaN(value)) {
          return message;
        }
        value = Number(value);
        if (value <= number) {
          return message;
        }
      };
    },
    gteq: function (number, fieldName, message) {
      fieldName = fieldName || 'field';
      number = Number(number);
      message = message || (fieldName + ' must be greater than or equal to ' + number);
      return function ($e) {
        var value = $e.val();
        if (isNaN(value)) {
          return message;
        }
        value = Number(value);
        if (value < number) {
          return message;
        }
      };
    },
    lt: function (number, fieldName, message) {
      fieldName = fieldName || 'field';
      number = Number(number);
      message = message || (fieldName + ' must be less than ' + number);
      return function ($e) {
        var value = $e.val();
        if (isNaN(value)) {
          return message;
        }
        value = Number(value);
        if (value >= number) {
          return message;
        }
      };
    },
    lteq: function (number, fieldName, message) {
      fieldName = fieldName || 'field';
      number = Number(number);
      message = message || (fieldName + ' must be less than or equal to ' + number);
      return function ($e) {
        var value = $e.val();
        if (isNaN(value)) {
          return message;
        }
        value = Number(value);
        if (value > number) {
          return message;
        }
      };
    },

    // composability

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
      return function ($e) {
        var value = getValue($e);
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
    compose: function (delimiter, rules) {
      var sliceAt = 1;
      if (_.isFunction(delimiter)) {
        sliceAt = 0;
        delimiter = '|';
      }
      rules = Array.prototype.slice.call(arguments, sliceAt);
      return function ($e) {
        var violations = [];
        _.each(rules, function (rule) {
          var violation = rule($e);
          if (violation) {
            violations.push(violation);
          }
        });
        if (violations.length) {
          return violations.join(delimiter);
        }
      };
    }
  };

  return Object.create(api);
});