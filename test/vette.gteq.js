/*global define, chai, setup, suite, test*/
define(['jquery', 'vette'], function ($, Vette) {
  var assert = chai.assert;
  var $doc = $('#vette');

  suite('.gteq()', function () {
    var $field;
    setup(function (done) {
      $doc.empty();
      $field = $('<input />');
      done();
    });

    test('should return undefined when value is greater than a given number', function (done) {
      $field.val(11);
      var rule = Vette.gteq(10);
      var actual = rule($field);
      assert.isUndefined(actual);
      done();
    });

    test('should return undefined when value is equal to a given number', function (done) {
      $field.val(10);
      var rule = Vette.gteq(10);
      var actual = rule($field);
      assert.isUndefined(actual);
      done();
    });

    test('should return a message when value is not greater than a given number', function (done) {
      $field.val(9);
      var expected = 'error';
      var rule = Vette.gteq(10, expected);
      var actual = rule($field)
      assert.isString(actual);
      assert.equal(expected, actual);
      done();
    });
  });

});