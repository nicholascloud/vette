# Client validation library

### Use

Set up a validation set for a given jQuery scope.

```javascript
var $form = $('form');
var vetteSet = vette.createSet($form);
// or, `vette.createSet('form')`
```

Add validators.

```javascript
// selectors are scoped to $form
vetteSet.add('[name=email]', vette.required());
vetteSet.add('[name=password]', vette.required());
vetteSet.add('[name=password]', vette.minLength(8));
```

Set up handlers.

```javascript
vetteSet.on('evaluating', function () {
  /*
   * Occurs before fields are validated. Useful
   * for resetting form state, hiding previous error
   * messages, etc.
   */
  $form.find('.invalid').removeClass('invalid');
  $form.find('.error-message').hide();
});

vetteSet.on('validation-failed', function (selector, violations) {
  /*
   * Occurs when validation fails for a given field (selector).
   * All violations will be in the `violations` array. If you
   * want to display the *first* violation that occured, just
   * grab the first element of the array.
   */
  var firstViolation = violations[0];
  $form.find(selector)
    .addClass('invalid')
    .siblings('.error-message')
    .text(firstViolation)
    .show();
});
```

On submit, evaluate fields.

```javascript
$form.on('submit', function (e) {
  e.preventDefault();
  var evaluation = vetteSet.evaluate();
  evaluation.done(function () {
    // submit $form.serialize()
  });
});
```

### Advanced usage

Create a custom "accessor" to fetch the value of a field.

```javascript
function defaultLevelValue($e) {
  // generate the value for [name=level]
  var value = Number($e.val());
  return isNaN(value) ? 'none' : value;
}

vetteSet.add('[name=level]', vette.accessor(
  defaultLevelValue,
  vette.any(['none', 10, 15, 20])
));
```

### TODO

1. Configure validation rules declaratively
2. Auto-wire handlers
3. Backbone.js integration