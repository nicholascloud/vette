'use strict';
module.exports = function each (collection, iteratee) {
  if (collection.length === 0) {
    return;
  }
  var index = 0,
    maxIndex = collection.length - 1;
  while (index <= maxIndex) {
    iteratee(collection[index], index, collection);
    index += 1;
  }
};