#!/usr/bin/env ./node_modules/.bin/babel-node
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _T;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var thread = exports.thread = function thread(operator, arg) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var threadFirst = void 0;
  switch (operator) {
    case "->>":
      threadFirst = false;
      break;
    case "->":
      threadFirst = true;
      break;
    default:
      throw new Error("Operator not supported");
      break;
  }
  return args.reduce(function (lastReturnValue, nextFns) {
    if (Array.isArray(nextFns)) {
      var _nextFns = _toArray(nextFns),
          firstFn = _nextFns[0],
          rest = _nextFns.slice(1);

      return threadFirst ? firstFn.apply(undefined, [lastReturnValue].concat(_toConsumableArray(rest))) : firstFn.apply(undefined, [].concat(_toConsumableArray(rest), [lastReturnValue]));
    } else {
      return nextFns.call(undefined, lastReturnValue);
    }
  }, arg);
};

var threadFirst = exports.threadFirst = function threadFirst() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return thread.apply(undefined, ['->'].concat(args));
};
var threadLast = exports.threadLast = function threadLast() {
  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return thread.apply(undefined, ['->>'].concat(args));
};
var T = exports.T = (_T = {}, _defineProperty(_T, '->', threadFirst), _defineProperty(_T, '->>', threadLast), _T);