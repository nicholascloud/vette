/*global define*/
define(['underscore'], function (_) {
  'use strict';

  var DEFAULT_CONTEXT = {};

  function invoke(args, async, handler) {
    if (async) {
      return setTimeout(function () {
        handler.callback.apply(handler.context, args);
      }, 0);
    }
    handler.callback.apply(handler.context, args);
  }

  var api = {
    _filterHandlers: function (event, callback, context) {
      var criteria = {
        event: event
      };
      if (_.isFunction(callback)) {
        criteria.callback = callback;
      }
      if (context) {
        criteria.context = context;
      }
      return _.where(this._handlers, criteria);
    },
    _trigger: function (event, args, async) {
      var handlers = this._filterHandlers(event);
      if (handlers.length === 0) {
        return;
      }
      var invocation = _.bind(invoke, null, args, async);
      _.each(handlers, invocation);
    },
    on: function (event, callback, context) {
      context = context || DEFAULT_CONTEXT;
      var handlers = this._filterHandlers(event, callback, context);
      if (handlers.length > 0) {
        return;
      }
      this._handlers.push({
        event: event,
        callback: callback,
        context: context
      });
    },
    off: function (event, callback, context) {
      if (arguments.length === 0) {
        return this.clear();
      }
      context = context || DEFAULT_CONTEXT;
      var handlers = this._filterHandlers(event, callback, context);
      if (handlers.length === 0) {
        return;
      }
      this._handlers = _.without(this._handlers, handlers);
    },
    clear: function () {
      this._handlers = [];
    },
    trigger: function (event/*, ...args*/) {
      if (this._alwaysTriggerAsync) {
        return this.triggerAsync.apply(this, arguments);
      }
      var args = Array.prototype.slice.call(arguments, 1);
      this._trigger.call(this, event, args, false);
    },
    triggerAsync: function (event/*, ...args*/) {
      var args = Array.prototype.slice.call(arguments, 1);
      this._trigger.call(this, event, args, true);
    }
  };

  return function (alwaysTriggerAsync) {
    alwaysTriggerAsync = alwaysTriggerAsync || false;
    var instance = Object.create(api);
    instance._handlers = [];
    instance._alwaysTriggerAsync = alwaysTriggerAsync;
    return instance;
  };
});