'use strict';
var empty = require('./empty');
var contains = require('./contains');

/**
 * Gets the difference among collections
 * @param collections
 * @returns {Array}
 */
module.exports = function difference (collections) {
  collections = Array.prototype.slice.call(arguments, 0);

  if (empty(collections)) {
    return [];
  }

  if (collections.length === 1) {
    return [].concat(collections[0]);
  }

  var firstCollection = collections.shift();
  if (empty(firstCollection)) {
    return [];
  }

  var diffedCollection = [];

  var collectionIndex = 0,
    maxCollectionIndex = (collections.length - 1),
    isLastCollection = false,
    diffingCollection = null;

  var firstCollectionIndex = 0,
    maxFirstCollectionIndex = (firstCollection.length - 1),
    firstCollectionValue = null;

  while (firstCollectionIndex <= maxFirstCollectionIndex) {
    firstCollectionValue = firstCollection[firstCollectionIndex];
    collectionIndex = 0;
    while (collectionIndex <= maxCollectionIndex) {
      isLastCollection = (collectionIndex === maxCollectionIndex);
      diffingCollection = collections[collectionIndex];
      if (contains(diffingCollection, firstCollectionValue)) {
        break;
      }
      if (isLastCollection) {
        diffedCollection.push(firstCollectionValue);
      }
      collectionIndex += 1;
    }
    firstCollectionIndex += 1;
  }

  return diffedCollection;
};