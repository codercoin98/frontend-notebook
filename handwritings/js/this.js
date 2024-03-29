// The apply/call/bond methods are used to change the function execution context.

// Implement of function apply method.
Function.prototype._apply_ = function (context = window, args) {
  if (typeof this !== "function") {
    throw new Error("Type Error");
  }
  // Sets the called method to a property of the context object
  const fn = Symbol("fn");
  context[fn] = this;
  // execute the called method, delete added property and return result
  const res = context[fn](...args);
  delete context[fn];
  return res;
};
// Implement of function call method.
Function.prototype._call_ = function (context, ...args) {
  if (typeof this !== "function") {
    throw new Error("Type Error");
  }
  // Sets the called method to a property of the context object
  const fn = Symbol("fn");
  context[fn] = this;
  // execute the called method, delete added property and return result
  const res = context[fn](...args);
  delete context[fn];
  return res;
};
// Implement of function bond method.
Function.prototype._bind_ = function (context, ...args) {
  if (typeof this !== "function") {
    throw new Error("Type Error");
  }
  // cache this
  const fn = this;
  return function F() {
    return fn._apply_(this instanceof F ? new fn(...arguments) : context, [
      ...args,
      ...arguments,
    ]);
  };
};

// test example

function log(a, b) {
  console.log(`name: ${this.name} , age: ${this.age} , num is :${a + b}`);
}
const person = {
  name: "leon",
  age: 24,
};
log._apply_(person, [1, 2]);
log._call_(person, 1, 2);
const newLog_2 = log._bind_(person);
newLog_2(1, 2);
