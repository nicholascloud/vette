/*global define, chai, setup, suite, test*/
define(['jquery', 'vette'], function ($, Vette) {
  var assert = chai.assert;
  var $doc = $('#vette');

  suite('Vette.compose()', function () {
    var $field;
    setup(function (done) {
      $doc.empty();
      $field = $('<input />');
      done();
    });

    test('collects and executes all rules', function (done) {

      var executed = [];

      function rule1($e, $root) {
        assert.equal($field, $e);
        assert.equal($doc, $root);
        executed.push('rule1');
      }

      function rule2($e, $root) {
        assert.equal($field, $e);
        assert.equal($doc, $root);
        executed.push('rule2');
      }

      function rule3($e, $root) {
        assert.equal($field, $e);
        assert.equal($doc, $root);
        executed.push('rule3');
      }

      var rule = Vette.compose(rule1, rule2, rule3);
      var actual = rule($field, $doc);
      assert.isUndefined(actual);
      assert.sameMembers(['rule1', 'rule2', 'rule3'], executed);
      done();
    });

    test('aggregates messages from all rules', function (done) {

      var executed = [];

      function rule1($e, $root) {
        assert.equal($field, $e);
        assert.equal($doc, $root);
        executed.push('rule1');
        return 'violation1';
      }

      function rule2($e, $root) {
        assert.equal($field, $e);
        assert.equal($doc, $root);
        executed.push('rule2');
        return 'violation2';
      }

      function rule3($e, $root) {
        assert.equal($field, $e);
        assert.equal($doc, $root);
        executed.push('rule3');
        return 'violation3';
      }

      var rule = Vette.compose(rule1, rule2, rule3);
      var actual = rule($field, $doc);
      assert.isArray(actual);
      assert.sameMembers(['violation1', 'violation2', 'violation3'], actual);
      assert.sameMembers(['rule1', 'rule2', 'rule3'], executed);
      done();
    });

  });
});