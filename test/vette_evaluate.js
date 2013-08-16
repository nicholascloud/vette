/*global define, chai, setup, suite, test*/
define(['jquery', 'vette'], function ($, Vette) {
  var assert = chai.assert;
  var $doc = $('#vette');

  suite('Vette#evaluate()', function () {
    var $field;
    setup(function (done) {
      $doc.empty();
      $field = $('<input />');
      $field.attr('name', 'field');
      $doc.append($field);
      done();
    });

    test('promise fulfilled with no violations', function (done) {

      var executed = [];
      function fakeRule(/*$e, $root*/) {
        executed.push('fakeRule');
      }

      var vette = new Vette();
      vette.add('[name=field]', fakeRule);

      var evaluation = vette.evaluate($doc);
      evaluation.done(function () {
        assert.equal(executed.length, 1);
        assert.sameMembers(executed, ['fakeRule']);
        done();
      });
      evaluation.fail(function () {
        done('evaluation should have succeeded');
      });
    });

    test('promise rejected with violations', function (done) {

      var executed = [];
      function fakeRule(/*$e, $root*/) {
        executed.push('fakeRule');
        return 'error';
      }

      var vette = new Vette();
      vette.add('[name=field]', fakeRule);

      var evaluation = vette.evaluate($doc);
      evaluation.done(function () {
        done('evaluation should not have succeeded');
      });
      evaluation.fail(function () {
        assert.equal(executed.length, 1);
        assert.sameMembers(executed, ['fakeRule']);
        done();
      });
    });
  });
});