/*global define, chai, setup, suite, test*/
define(['events'], function (Events) {
  var assert = chai.assert;

  suite('Events.ctor()', function () {
    setup(function (done) {
      done();
    });

    test('trigger() is invoked normally by default', function (done) {
      var events = new Events();
      events.trigger = function () {
        done();
      };
      events.trigger('foo');
    });

    test('trigger() is invoked normally when specified', function (done) {
      var events = new Events(false);
      events.trigger = function () {
        done();
      };
      events.trigger('foo');
    });

    test('trigger() forwards calls to triggerAsync()', function (done) {
      var events = new Events(true);
      events.triggerAsync = function () {
        done();
      };
      events.trigger('foo');
    });

  });
});