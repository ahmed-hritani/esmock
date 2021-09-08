esmock
======
[![npm version](https://badge.fury.io/js/esmock.svg)](https://badge.fury.io/js/esmock) [![Build Status](https://github.com/iambumblehead/esmock/workflows/nodejs-ci/badge.svg)][2]


**esmock _must_ be used with node's experimental --loader**
``` json
{
  "name": "give-esmock-a-star",
  "type": "module",
  "scripts": {
    "test-ava": "ava --node-arguments=\"--loader=esmock\"",
    "test-mocha": "mocha --loader=esmock --no-warnings"
  }
}
```


**Use it** `await esmock('./to/module.js', childmocks, globalmocks)`
``` javascript
import test from 'ava';
import esmock from 'esmock';

test('should mock modules and local files at same time', async t => {
  const main = await esmock('../src/main.js', {
    stringifierpackage : o => JSON.stringify(o),
    '../src/hello.js' : {
      default : () => 'world'
    },
    '../src/util.js' : {
      exportedFunction : () => 'foobar'
    }
  });

  t.is(main(), JSON.stringify({ test : 'world foobar' }));
});

test('should do global instance mocks —third parameter', async t => {
  const { getFile } = await esmock('../src/main.js', {}, {
    fs : {
      readFileSync : () => {
        return 'anywhere the instance uses fs readFileSync';
      }
    }
  });

  t.is(getFile(), 'anywhere the instance uses fs readFileSync');
});
```


### changelog

 * 0.4.0 _Sep.07.2021_
   * do not runtime error when returuning type '[object Module]' default
 * 0.3.9 _May.05.2021_
   * small change to README
   * added a test, update gitlab action to use node 16.x
 * 0.3.8 _Apr.21.2021_
   * small change to README
 * 0.3.7 _Apr.20.2021_
   * add test, throw error if mocked module path is not found
 * 0.3.6 _Apr.19.2021_
   * throw error if mocked module path is not found
 * 0.3.5 _Apr.18.2021_
   * added gitlab actions npm test: node 12.x, 14.x and 15.x
 * 0.3.3 _Apr.13.2021_
   * added keywords to package.json, use github action to npm publish
 * 0.3.1 _Apr.12.2021_
   * simplify README
 * 0.3.0 _Apr.10.2021_
   * adds support for mocking modules 'globally' for the instance
 * 0.2.0 _Apr.10.2021_
   * adds support for mocking core modules such as fs and path
 * 0.1.0 _Apr.10.2021_
   * adds support for native esm modules


[0]: http://www.bumblehead.com "bumblehead"
[1]: https://github.com/iambumblehead/esmock/workflows/nodejs-ci/badge.svg "nodejs-ci pipeline"
[2]: https://github.com/iambumblehead/esmock "esmock"
