'use strict';
module.exports = {
  // numeric validators
  numeric: require('./numeric'),
  range: require('./range'),
  gt: require('./gt'),
  gteq: require('./gteq'),
  lt: require('./lt'),
  lteq: require('./lteq'),

  // collection validators
  nodupe: require('./nodupe'),
  hasOne: require('./has-one'),
  hasAny: require('./has-any'),
  hasAll: require('./has-all'),
  hasNone: require('./has-none'),

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
  each: require('./each'),

  // advanced
  accessor: require('./accessor'),
  compose: require('./compose'),
  precondition: require('./precondition')
};