'use strict';

module.exports = function isNumber(target) {
  return (typeof target === 'number') &&
      !isNaN(target);
};