/*global define, chai, setup, suite, test*/
define(['jquery', 'vette'], function ($, Vette) {
  var assert = chai.assert;
  var $doc = $('#vette');

  suite('.after()', function () {
    var $beforeField, $afterField;
    setup(function (done) {
      $doc.empty();
      $beforeField = $('<input />');
      $beforeField.attr('name', 'before');
      $afterField = $beforeField.clone();
      $afterField.attr('name', 'after');
      $doc.append($beforeField);
      $doc.append($afterField);
      done();
    });

    suite('inclusive', function () {
      test('should return undefined when date is after', function (done) {
        $beforeField.val('2013-11-15');
        $afterField.val('2013-11-16');
        var rule = Vette.after('[name=before]', true);
        var actual = rule($afterField, $doc);
        assert.isUndefined(actual);
        done();
      });

      test('should return undefined when date is equal', function (done) {
        $beforeField.val('2013-11-15');
        $afterField.val('2013-11-15');
        var rule = Vette.after('[name=before]', true);
        var actual = rule($afterField, $doc);
        assert.isUndefined(actual);
        done();
      });

      test('should return message when date is before', function (done) {
        $beforeField.val('2013-11-17');
        $afterField.val('2013-11-16');
        var expected = 'error';
        var rule = Vette.after('[name=before]', true, expected);
        var actual = rule($afterField, $doc);
        assert.isString(actual);
        assert.equal(expected, actual);
        done();
      });
    });

    suite('exclusive', function () {
      test('should return undefined when date is after', function (done) {
        $beforeField.val('2013-11-15');
        $afterField.val('2013-11-16');
        var rule = Vette.after('[name=before]', false);
        var actual = rule($afterField, $doc);
        assert.isUndefined(actual);
        done();
      });

      test('should return message when date is equal', function (done) {
        $beforeField.val('2013-11-15');
        $afterField.val('2013-11-15');
        var expected = 'error';
        var rule = Vette.after('[name=before]', false, expected);
        var actual = rule($afterField, $doc);
        assert.isString(actual);
        assert.equal(expected, actual);
        done();
      });

      test('should return message when date is after', function (done) {
        $beforeField.val('2013-11-17');
        $afterField.val('2013-11-16');
        var expected = 'error';
        var rule = Vette.after('[name=before]', false, expected);
        var actual = rule($afterField, $doc);
        assert.isString(actual);
        assert.equal(expected, actual);
        done();
      });
    });

  });
});