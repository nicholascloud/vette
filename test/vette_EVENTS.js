/*global define, chai, setup, suite, test*/
define(['jquery', 'vette'], function ($, Vette) {
  var assert = chai.assert;
  var $doc = $('#vette');

  suite('events', function () {
    var $field;
    setup(function (done) {
      $doc.empty();
      $field = $('<input />');
      $field.attr('name', 'field');
      $doc.append($field);
      done();
    });

    suite('^evaluating', function () {

      test('occurs before any validation rules have been processed', function (done) {
        var executed = [];

        function fakeRule1() {
          executed.push('fakeRule1');
        }

        function fakeRule2() {
          executed.push('fakeRule2');
        }

        var vette = new Vette();
        vette.on('evaluating', function () {
          executed.push('evaluating');
        });
        vette.add('[name=field]', fakeRule1, fakeRule2);

        var evaluation = vette.evaluate($doc);
        evaluation.done(function () {
          assert.isArray(executed);
          assert.lengthOf(executed, 3);
          assert.sameMembers(executed, ['evaluating', 'fakeRule1', 'fakeRule2']);
          assert.equal(executed[0], 'evaluating');
          done();
        });
        evaluation.fail(function () {
          done('evaluation should have succeeded');
        });

      });
    });

    suite('^evaluated', function () {

      test('occurs after all validation rules have been processed and the promise has been resolved or rejected', function (done) {
        var executed = [];

        function fakeRule1() {
          executed.push('fakeRule1');
        }

        function fakeRule2() {
          executed.push('fakeRule2');
        }

        var vette = new Vette();
        vette.on('evaluated', function () {
          assert.isArray(executed);
          assert.lengthOf(executed, 2);
          assert.sameMembers(executed, ['fakeRule1', 'fakeRule2']);
          done();
        });
        vette.add('[name=field]', fakeRule1, fakeRule2);

        var evaluation = vette.evaluate($doc);
        evaluation.fail(function () {
          done('evaluation should have succeeded');
        });

      });
    });

    suite('^validation-failed', function () {

      test('occurs when a validation rule fails', function (done) {

        var executed = [];

        function fakeRule1() {
          executed.push('fakeRule1');
          return 'fakeRule1-error';
        }

        function fakeRule2() {
          executed.push('fakeRule2');
          return 'fakeRule2-error';
        }

        var vette = new Vette();
        vette.on('validation-failed', function (selector, violations) {
          assert.equal(selector, '[name=field]');
          assert.isArray(violations);
          assert.lengthOf(violations, 2);
          assert.sameMembers(violations, ['fakeRule1-error', 'fakeRule2-error']);
          done();
        });
        vette.add('[name=field]', fakeRule1, fakeRule2);

        var evaluation = vette.evaluate($doc);
        evaluation.done(function () {
          done('evaluation should have failed');
        });

      });

      test('occurs for each selector when rules fail', function (done) {

        $field.attr('name', 'field1');
        var $field2 = $field.clone();
        $field2.attr('name', 'field2');
        $doc.append($field2);

        function fakeRule1() {
          return 'fakeRule1-error';
        }

        function fakeRule2() {
          return 'fakeRule2-error';
        }

        var expected = {
          '[name=field1]': ['fakeRule1-error'],
          '[name=field2]': ['fakeRule2-error']
        };

        var actual = [];

        var vette = new Vette();
        vette.on('validation-failed', function (selector, violations) {
          var expectedSelectors = _.keys(expected);
          assert.include(expectedSelectors, selector);
          assert.isArray(violations);
          assert.sameMembers(violations, expected[selector]);
          actual.push(selector);
        });
        vette.add('[name=field1]', fakeRule1);
        vette.add('[name=field2]', fakeRule2);

        var evaluation = vette.evaluate($doc);
        evaluation.done(function () {
          done('evaluation should have failed');
        });
        evaluation.fail(function () {
          assert.sameMembers(actual, _.keys(expected));
          done();
        });

      });
    });

  });
});