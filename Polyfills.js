
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

const flattenArray = (array) => {
  return array.reduce((accumulator, item) => {
    return accumulator.concat(Array.isArray(item) ? flattenArray(item) : item);
  }, []);
};

const isObject = (object) => object && object.constructor && object.constructor.prototype && object.constructor.prototype.hasOwnProperty("isPrototypeOf");

const flattenObject = (object, path = []) => {
  return Object.keys(object).reduce((accumulator, key) =>{
    return Object.assign(accumulator,isObject(object[key]) ? flattenObject(object[key], path.concat(key)) : {  [path.concat(key).join('.')]: object[key] });
  }, {});
};

const deepClone = (inputObj) => {
  if (typeof inputObj !== "object") return inputObj;
  const copy = Array.isArray(inputObj) ? [] : {};
  Object.keys(inputObj).forEach((key) => {
    copy[key] = deepClone(inputObj[key]);
  });
  return copy;
};

function add(x){
  let sum = x;
  function fn(y){
    sum += y;
    return fn;
  }
  fn.valueOf = function(){
    return sum;
  };
  return fn;
}

console.log(+add(1)(2)(3)(4));


const findPath = (obj, value, path = []) => {
  const keyArray = Object.keys(obj);
  for(let i = 0; i < keyArray.length; i++){
    if(obj[keyArray[i]] === value){
      path.push(keyArray[i]);
      break;
    }else{
      if(isObject(obj[keyArray[i]])){
        path.push(keyArray[i]);
        findPath(obj[keyArray[i]], value, path);
      }else{
        path.pop();
      }
    }
  }
  return path.join('.');
};
let obj = {
  a: "hi",
  b: {
    c: "there",
    d: "hello",
  },
  e: {
    f: "hey"
  }
};
console.log(findPath(obj, 'hey')); // e.f
