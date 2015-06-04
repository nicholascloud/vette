'use strict';
module.exports = {
  //numeric validators
  numeric: require('./numeric'),
  range: require('./range'),
  gt: require('./gt'),
  gteq: require('./gteq'),
  lt: require('./lt'),
  lteq: require('./lteq'),

  // boolean validators
  bool: require('./bool'),

  // date validators
  before: require('./before'),
  after: require('./after'),

  // email validators
  email: require('./email'),

  // generic
  required: require('./required'),
  match: require('./match'),
  minLength: require('./min-length'),
  maxLength: require('./max-length'),
  any: require('./any'),
  same: require('./same'),
  different: require('./different'),

  // advanced
  accessor: require('./accessor'),
  compose: require('./compose'),
  precondition: require('./precondition')
};