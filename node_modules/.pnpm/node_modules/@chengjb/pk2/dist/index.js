(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["web-see"] = {}));
})(this, (function (exports) { 'use strict';

  function test1() {
      console.log("i am pk1-test1");
      console.log("i am pk1-test1");
  }

  function test2() {
      test1();
      console.log("i am pk2-test2");
      console.log("pk2-test2");
  }

  exports.test2 = test2;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.js.map
