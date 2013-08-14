# Client validation library

### Use

Set up a set up validation rules by instantiating Vette.

```javascript
define(['vette'], function (Vette) {

  var ruleset = new Vette();
  // ...

});
```

Add validators.

```javascript
ruleset.add('[name=email]', Vette.required());
ruleset.add('[name=password]', Vette.required());
ruleset.add('[name=password]', Vette.minLength(10));

// or

ruleset.add('[name=password]', Vette.required(), Vette.minLength(10);
```

Set up handlers for Vette events:

- `evaluating`: occurs before validation begins
- `evaluated`: occurs after validation finishes
- `validation-failed`: occurs when a specific rule generates a violation

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

ruleset.on('evaluated', function () {
  /*
   * Validation is complete.
   */
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

Invoke validation when the user performs an action, like submitting a form.

```javascript
var $form = $('form#myFields');

$form.on('submit', function (e) {
  e.preventDefault();
  /*
   * `evaluate()` returns a promise that will be fulfilled if all
   * validation rules pass.
   */
  var evaluation = ruleset.evaluate($form);
  evaluation.done(function () {
    // submit the form
  });
  evaluation.fail(function (allViolations) {
    // show all violations in a big message
  });
});
```

### Available rules

#### Generic rules

- required
- match(regex)
- minLength(length)
- maxLength(length)
- any(options)
- same(selector)

#### Numeric rules

- numeric()
- range(lower, upper)
- gt(number)
- lt(number)
- gteq(number)
- lteq(number)

#### Date rules

- before(selector, inclusive)
- after(selector, inclusive)

#### Advanced rules

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

Compose several rules that can be reused together.

```javascript
var composed = validators.compose(
  validators.numeric(),
  validators.gteq(10),
  validators.lt(100)
);
set.add('[name=team1-score]', composed);
set.add('[name=team2-score]', composed);
```

### TODO

1. Configure validation rules declaratively
2. Auto-wire handlers
3. Backbone.js integration