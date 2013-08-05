# Client validation library

### Use

Set up a set up vaidation rules by instantiating Vette.

```javascript
var ruleset = new Vette();
```

Add validators.

```javascript
ruleset.add('[name=email]', Vette.required());
ruleset.add('[name=password]', Vette.required());
ruleset.add('[name=password]', Vette.minLength(8));
```

Set up handlers.

```javascript
ruleset.on('evaluating', function () {
  /*
   * Occurs before fields are validated. Useful
   * for resetting form state, hiding previous error
   * messages, etc.
   */
  $form.find('.invalid').removeClass('invalid');
  $form.find('.error-message').hide();
});

ruleset.on('validation-failed', function (selector, violations) {
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
var $form = $('form#myFields');
$form.on('submit', function (e) {
  e.preventDefault();
  var evaluation = ruleset.evaluate($form);
  evaluation.done(function () {
    // submit the form
  });
});
```

### Advanced usage

Create a custom "accessor" to fetch the value of a field, provide intelligent defaults, etc.

```javascript
function defaultLevelValue($e) {
  // generate the value for [name=level]
  var value = Number($e.val());
  return isNaN(value) ? 'none' : value;
}

ruleset.add('[name=level]', Vette.accessor(
  defaultLevelValue,
  Vette.any(['none', 10, 15, 20])
));
```

Determine if a rule should even be evaluated by using a precondition. Useful if fields may or may not be present in your form at any given time.

```javascript
function isFieldPresent($e) {
  return $e.length > 0;
}

ruleset.add('[name=password]', Vette.precondition(
  isFieldPresent,
  Vette.minLength(10) //only executes if isFieldPresent() returns true
));
```

### TODO

1. Configure validation rules declaratively
2. Auto-wire handlers
3. Backbone.js integration