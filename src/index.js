#!/usr/bin/env ./node_modules/.bin/babel-node

export const thread = (operator, arg, ...args) => {
  let threadFirst;
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
  return args.reduce((lastReturnValue, nextFns) => {
    if (Array.isArray(nextFns)) {
      const [firstFn, ...rest] = nextFns;
      return threadFirst
        ? firstFn.apply(this, [lastReturnValue, ...rest])
        : firstFn.apply(this, [...rest, lastReturnValue]);
    } else {
      return nextFns.call(this, lastReturnValue);
    }
  }, arg);
};

export const threadFirst = (...args) => thread('->', ...args)
export const threadLast = (...args) => thread('->>', ...args)
export const T = {
    ['->'] : threadFirst,
    ['->>'] : threadLast
}
