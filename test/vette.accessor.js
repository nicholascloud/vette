/*global define, chai, setup, suite, test*/
define(['jquery', 'underscore', 'vette'], function ($, _, Vette) {
  var assert = chai.assert;
  var $doc = $('#vette');

  suite('Vette.accessor()', function () {
    var $field;
    setup(function (done) {
      $doc.empty();
      $field = $('<input />');
      done();
    });

    var VALUE = 'actual';

    test('passes the correct value to the rule', function (done) {

      var executed = [];

      function getValue($e, $root) {
        executed.push('getValue');
        assert.equal($field, $e);
        assert.equal($doc, $root);
        return VALUE;
      }

      function fakeRule($e) {
        executed.push('fakeRule');
        assert.equal(VALUE, $e.val());
      }

      var rule = Vette.accessor(getValue, fakeRule);
      var actual = rule($field, $doc);
      assert.isUndefined(actual);
      assert.sameMembers(['getValue', 'fakeRule'], executed);
      done();
    });

    test('returns a message when the fule fails', function (done) {

      var executed = [];

      function getValue($e, $root) {
        executed.push('getValue');
        assert.equal($field, $e);
        assert.equal($doc, $root);
        return VALUE;
      }

      function fakeRule($e) {
        executed.push('fakeRule');
        assert.equal(VALUE, $e.val());
        return 'error';
      }

      var expected = 'error';
      var rule = Vette.accessor(getValue, fakeRule);
      var actual = rule($field, $doc);
      assert.isString(actual);
      assert.equal(expected, actual);
      assert.sameMembers(['getValue', 'fakeRule'], executed);
      done();
    });

  });
});