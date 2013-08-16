/*global define, chai, setup, suite, test*/
define(['events'], function (Events) {
  var assert = chai.assert;

  suite('Events#off()', function () {
    setup(function (done) {
      done();
    });

    test('removes a callback from the instance', function (done) {
      var events = new Events();
      var callback = function () {};
      events.on('foo', callback);
      assert.lengthOf(events._handlers, 1);
      events.off('foo', callback);
      assert.lengthOf(events._handlers, 0);
      done();
    });

    test('removes all callbacks registered for an event form the instance', function (done) {
      var events = new Events();
      events.on('foo', function () {});
      events.on('foo', function () {});
      events.on('bar', function () {});
      events.on('bar', function () {});
      assert.lengthOf(events._handlers, 4);
      events.off('foo');
      assert.lengthOf(events._handlers, 2);
      done();
    });

    test('removes only callbacks registered with a specific context from the instance', function (done) {
      var context = {};
      var events = new Events();
      var callback = function () {};
      events.on('foo', callback, context);
      events.on('foo', callback);
      assert.lengthOf(events._handlers, 2);
      events.off('foo', callback, context);
      assert.lengthOf(events._handlers, 1);
      done();
    });

    test('removes all callbacks', function (done) {
      var context = {};
      var events = new Events();
      var callback = function () {};
      events.on('foo', callback, context);
      events.on('foo', callback);
      assert.lengthOf(events._handlers, 2);
      events.off();
      assert.lengthOf(events._handlers, 0);
      done();
    });
  });
});