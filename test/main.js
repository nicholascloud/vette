/*global requirejs, require, mocha*/
requirejs.config({
  paths: {
    'jquery': '../bower_components/jquery/jquery',
    'underscore': '../bower_components/underscore/underscore',
    'moment': '../bower_components/moment/moment',
    'events': '../events',
    'vette': '../vette'
  },
  shim: {
    'jquery': {
      exports: '$'
    },
    'underscore': {
      exports: '_'
    },
    'moment': {
      exports: 'moment'
    }
  }
});

require([
  // Vette functions
  './vette.numeric',
  './vette.range',
  './vette.gt',
  './vette.gteq',
  './vette.lt',
  './vette.lteq',
  './vette.before',
  './vette.after',
  './vette.required',
  './vette.match',
  './vette.minLength',
  './vette.maxLength',
  './vette.any',
  './vette.same',
  './vette.different',
  './vette.accessor',
  './vette.compose',
  './vette.precondition',
  // Vette instance methods
  './vette_add',
  './vette_remove',
  './vette_selectors',
  './vette_evaluate',
  // Vette events
  './vette_events'
], function () {
  'use strict';
  mocha.checkLeaks();
  mocha.run();
});