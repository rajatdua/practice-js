
Function.prototype.myBind = (ctx) => {
  const fn = this;
  return function(){
    fn.call(ctx);
  }
};

Function.prototype.myBindRobust = (ctx, ...args) => {
  const fn = this;
  return function(...args1){
    fn.apply(ctx, [...args, ...args1]);
  }
};

Array.prototype.myMap = function(fn){
  let result = [];
  for(let i = 0; i < this.length; i++){
    result.push(fn(this[i], i, this))
  }
  return result;
};

Array.prototype.myFilter = function(fn, ctx){
  let result = [];
  for(let i = 0; i < this.length; i++){
    if(fn.call(ctx, this[i], i, this)) result.push(this[i])
  }
  return result;
};

Array.prototype.myReduce = function(fn, init){
  let accumulator = init === undefined ? undefined : init;
  for(let i = 0; i < this.length; i++){
    if(accumulator!==undefined){
      accumulator = fn.call(undefined, accumulator, this[i], i, this)
    }else{
      accumulator = this[i];
    }
  }
  return accumulator;
};
/* UTILITY */

function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };
}
const debounce = (fn, delay) => {
  let lastDebounce;
  return function(){
    const context = this;
    const args = arguments;
    clearTimeout(lastDebounce);
    lastDebounce = setTimeout(() => { fn.apply(context, args); }, delay)
  }
};


const throttle = (fn, delay) => {
  let flag = false;
  return function(){
    if(flag){
      fn.apply(this, arguments);
    }
    setTimeout(() => { flag = true; }, delay);
  }
};

const throttleRobust = (fn, delay) => {
  let didLastFunctionRun, lastFunction;
  return function(){
    const context = this;
    const args = arguments;
    if(!didLastFunctionRun){
      fn.apply(context, args);
      didLastFunctionRun = Date.now();
    }else{
      clearTimeout(lastFunction);
      lastFunction = setTimeout(() => {
        if(Date.now() - didLastFunctionRun >= delay){
          fn.apply(context, args);
          didLastFunctionRun = Date.now();
        }
      }, delay - (Date.now() - didLastFunctionRun));
    }
  }
};

// const compose = (...fns) => x => fns.reduceRight(((y, fn) => fn(y)), x);
// const pipe = (...fns) => x => fns.reduce(((y, fn) => fn(y)), x);
const compose = (...fn) => {
  return (x) => {
    return fn.reduceRight(function (y, fn) {
      return fn(y);
    }, x);
  };
};
