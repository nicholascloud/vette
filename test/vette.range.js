/*global define, chai, setup, suite, test*/
define(['jquery', 'vette'], function ($, Vette) {
  var assert = chai.assert;
  var $doc = $('#vette');

  suite('Vette.range()', function () {
    var $field;
    setup(function (done) {
      $doc.empty();
      $field = $('<input />');
      done();
    });

    suite('inclusive', function () {
      test('should return undefined when field value is within numeric range', function (done) {
        $field.val(5);
        var rule = Vette.range(1, 10, true);
        var actual = rule($field);
        assert.isUndefined(actual);
        done();
      });

      test('should return undefined when field is equal to upper boundary', function (done) {
        $field.val(10);
        var rule = Vette.range(1, 10, true);
        var actual = rule($field);
        assert.isUndefined(actual);
        done();
      });

      test('should return undefined when field is equal to lower boundary', function (done) {
        $field.val(1);
        var rule = Vette.range(1, 10, true);
        var actual = rule($field);
        assert.isUndefined(actual);
        done();
      });

      test('should return message when field value is greater than upper boundary', function (done) {
        $field.val(11);
        var expected = 'error';
        var rule = Vette.range(1, 10, true, expected);
        var actual = rule($field);
        assert.isString(expected);
        assert.equal(expected, actual);
        done();
      });

      test('should return message when field value is less than lower boundary', function (done) {
        $field.val(0);
        var expected = 'error';
        var rule = Vette.range(1, 10, true, expected);
        var actual = rule($field);
        assert.isString(expected);
        assert.equal(expected, actual);
        done();
      });
    });

    suite('exclusive', function () {
      test('should return undefined when field value is within numeric range', function (done) {
        $field.val(5);
        var rule = Vette.range(1, 10, false);
        var actual = rule($field);
        assert.isUndefined(actual);
        done();
      });

      test('should return message when field is equal to upper boundary', function (done) {
        $field.val(10);
        var expected = 'error';
        var rule = Vette.range(1, 10, false, expected);
        var actual = rule($field);
        assert.isString(actual);
        assert.equal(expected, actual);
        done();
      });

      test('should return message when field is equal to lower boundary', function (done) {
        $field.val(1);
        var expected = 'error';
        var rule = Vette.range(1, 10, false, expected);
        var actual = rule($field);
        assert.isString(actual);
        assert.equal(expected, actual);
        done();
      });

      test('should return message when field value is greater than upper boundary', function (done) {
        $field.val(11);
        var expected = 'error';
        var rule = Vette.range(1, 10, false, expected);
        var actual = rule($field);
        assert.isString(expected);
        assert.equal(expected, actual);
        done();
      });

      test('should return message when field value is less than lower boundary', function (done) {
        $field.val(0);
        var expected = 'error';
        var rule = Vette.range(1, 10, false, expected);
        var actual = rule($field);
        assert.isString(expected);
        assert.equal(expected, actual);
        done();
      });
    });
  });

});