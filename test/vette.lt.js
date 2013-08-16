/*global define, chai, setup, suite, test*/
define(['jquery', 'vette'], function ($, Vette) {
  var assert = chai.assert;
  var $doc = $('#vette');

  suite('Vette.lt()', function () {
    var $field;
    setup(function (done) {
      $doc.empty();
      $field = $('<input />');
      done();
    });

    suite('inclusive', function () {
      test('should return undefined when value is less than a given number', function (done) {
        $field.val(9);
        var rule = Vette.lt(10, true);
        var actual = rule($field);
        assert.isUndefined(actual);
        done();
      });

      test('should return undefined when value is equal to a given number', function (done) {
        $field.val(10);
        var rule = Vette.lt(10, true);
        var actual = rule($field);
        assert.isUndefined(actual);
        done();
      });

      test('should return a message when value is not less than a given number', function (done) {
        $field.val(11);
        var expected = 'error';
        var rule = Vette.lt(10, true, expected);
        var actual = rule($field)
        assert.isString(actual);
        assert.equal(expected, actual);
        done();
      });

    });

    suite('exclusive', function () {
      test('should return undefined when value is less than a given number', function (done) {
        $field.val(9);
        var rule = Vette.lt(10, false);
        var actual = rule($field);
        assert.isUndefined(actual);
        done();
      });

      test('should return a message when value is equal to a given number', function (done) {
        $field.val(10);
        var expected = 'error';
        var rule = Vette.lt(10, false, expected);
        var actual = rule($field)
        assert.isString(actual);
        assert.equal(expected, actual);
        done();
      });

      test('should return a message when value is greater than a given number', function (done) {
        $field.val(11);
        var expected = 'error';
        var rule = Vette.lt(10, false, expected);
        var actual = rule($field)
        assert.isString(actual);
        assert.equal(expected, actual);
        done();
      });
    });
  });

});