## The Bug

This repo demonstrates a minor bug with `rollup-plugin-esbuild` that sees it give a confusing error message in some circumstances when using `async/await` code.

### To Reproduce 

If you run `yarn run build` (after first running `yarn install` of course) in this repo you'll notice the following warning

```
(!) Error when using sourcemap for reporting an error: Can't resolve original location of error.
src/index.ts (21:45)
(!) `this` has been rewritten to `undefined`
https://rollupjs.org/guide/en/#error-this-is-undefined
src/index.ts
19:   });
20: };
21: export const myAsyncFunction = () => __async(this, null, function* () {
                                                 ^
22:   yield Promise.resolve("hello");
23: });
created dist/main.cjs, dist/main.mjs in 39ms
```

This doesn't cause any issues in terms of the generated code's functionality but it is confusing.

It doesn't seem to be an issue with `esbuild` itself since calling `esbuild` without rollup generates the following (run `yarn run esbuildOnly` to see for yourself):

```javascript
// ... the __async helper function definition will be here but removed for clarity

// src/index.ts
var myAsyncFunction = () => __async(void 0, null, function* () {
  yield Promise.resolve("hello");
});
export {
  myAsyncFunction
};
```

As you can see above `esbuild` seems to output `void 0` and not `this`. So the issue must be with `rollup-plugin-esbuild`



