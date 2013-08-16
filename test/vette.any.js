/*global define, chai, setup, suite, test*/
define(['jquery', 'vette'], function ($, Vette) {
  var assert = chai.assert;
  var $doc = $('#vette');

  suite('Vette.any()', function () {
    var $field;
    setup(function (done) {
      $doc.empty();
      $field = $('<input />');
      done();
    });

    test('returns undefined if field value is an element in the collection', function (done) {
      $field.val('leo');
      var rule = Vette.any(['leo', 'mike', 'don', 'raph']);
      var actual = rule($field);
      assert.isUndefined(actual);
      done();
    });

    test('returns message if field value does not exist in the collection', function (done) {
      $field.val('casey');
      var expected = 'error';
      var rule = Vette.any(['leo', 'mike', 'don', 'raph'], expected);
      var actual = rule($field);
      assert.isString(actual);
      assert.equal(expected, actual);
      done();
    });
  });
});