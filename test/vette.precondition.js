/*global define, chai, setup, suite, test*/
define(['jquery', 'vette'], function ($, Vette) {
  var assert = chai.assert;
  var $doc = $('#vette');

  suite('Vette.precondition()', function () {
    var $field;
    setup(function (done) {
      $doc.empty();
      $field = $('<input />');
      done();
    });

    test('executes rules if precondition is true', function (done) {
      var executed = [];

      function precondition($e, $root) {
        assert.equal($field, $e);
        assert.equal($doc, $root);
        executed.push('precondition');
        return true;
      }

      function fakeRule1($e, $root) {
        assert.equal($field, $e);
        assert.equal($doc, $root);
        executed.push('rule1');
      }

      function fakeRule2($e, $root) {
        assert.equal($field, $e);
        assert.equal($doc, $root);
        executed.push('rule2');
      }

      var rule = Vette.precondition(precondition, fakeRule1, fakeRule2);
      var actual = rule($field, $doc);
      assert.isUndefined(actual);
      assert.sameMembers(['precondition', 'rule1', 'rule2'], executed);
      done();
    });

    test('skips rules if precondition is false', function (done) {
      var executed = [];

      function precondition($e, $root) {
        assert.equal($field, $e);
        assert.equal($doc, $root);
        executed.push('precondition');
        return false;
      }

      function fakeRule1($e, $root) {
        assert.ok(false, 'fake rule 1 should not be executed');
      }

      function fakeRule2($e, $root) {
        assert.ok(false, 'fake rule 2 should not be executed');
      }

      var rule = Vette.precondition(precondition, fakeRule1, fakeRule2);
      var actual = rule($field, $doc);
      assert.isUndefined(actual);
      assert.sameMembers(['precondition'], executed);
      done();
    });

    test('returns messages if rules fail', function (done) {
      var executed = [];

      function precondition($e, $root) {
        assert.equal($field, $e);
        assert.equal($doc, $root);
        executed.push('precondition');
        return true;
      }

      function fakeRule1($e, $root) {
        assert.equal($field, $e);
        assert.equal($doc, $root);
        executed.push('rule1');
        return 'error1';
      }

      function fakeRule2($e, $root) {
        assert.equal($field, $e);
        assert.equal($doc, $root);
        executed.push('rule1');
        return 'error2';
      }

      var rule = Vette.precondition(precondition, fakeRule1, fakeRule2);
      var actual = rule($field, $doc);
      assert.isArray(actual);
      assert.sameMembers(['error1', 'error2'], actual);
      assert.sameMembers(['precondition', 'rule1'], executed);
      done();
    });
  });
});