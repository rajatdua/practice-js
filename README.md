## Notes

### New Keyword

Four things happen when you use the "new" keyword, A brand new empty object is created out of thin air.

- That new object is linked to a different object.
- That new object gets bound as a "this" keyword for the purposes of the function call.
- If that function doesn't return anything, it will implicitly return "this".
- The "New" keyword makes it a constructor call, it's nothing like how you know "new" keyword works like in other languages.

#### Priority Precedence

1. Was the function called with the "new"?
2.  Was the function called with "call" or "apply" specifying an explicit this?
3.  Was the function called via a containing/owning object (context)?
4.  DEFAULT: global object (except strict mode)

The "new" keyword also overrides the hard binding mechanism. So, if there is a 5th rule called "hard-binding" it will be on the 2nd priority precedence.


### Scope

```js
var foo = 'bar';
function bar() {
  var foo = 'baz';
}
function baz(foo){
  foo = 'bam'; // line 8
  bam = 'yay';
}
```

If there was var foo written on line 8 instead of just foo. The argument name of the function baz will declare before on than it's was defined implicitly as var foo. So, line 8 which states var foo again will ignore the declaration part and will override the value of the argument if any was passed in the function with the RHS reference on line 8 which is "bam".


### Four rules of this keyword

1. If new keyword is used.
2. Explicit binding with call or apply
3. Implicit binding when you know your containing object
4. Default 


### Exercises

1. Calendar
2. Calculator
3. ToolTip
4. Http
5. InfiniteScroll
