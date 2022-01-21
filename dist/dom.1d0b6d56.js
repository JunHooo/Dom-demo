// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"dom.js":[function(require,module,exports) {
window.dom = {
  create: function create(string) {
    var div = document.createElement('template'); //  div.innerHTML = string

    div.innerHTML = string.trim(); //去掉string里面的空格

    return div.content.firstChild;
  },
  after: function after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling); //node.insertBefore(newNode, referenceNode)
    //newNode 用于插入的节点;referenceNode newNode 将要插在这个节点之前
  },
  before: function before(node2, node) {
    node.parentNode.insertBefore(node2, node);
  },
  append: function append(parent, child) {
    parent.appendChild(child);
  },
  wrap: function wrap(child, parent) {
    dom.before(parent, child); //个人理解这一步的作用在于将创建的parent放到页面中,并指定了放置的位置

    parent.appendChild(child); //appendChild会自动将插入的元素移出原来的位置
  },
  remove: function remove(node) {
    // node.remove()
    node.parentNode.removeChild(node);
  },
  empty: function empty(node) {
    // for (let i = 0; i < node.children.length; i++) {
    //     node.children[i].remove()
    // } 
    //这个方法不对，是因为node.children.length是不断变化的
    while (node.firstChild) {
      node.firstChild.remove();
    } //当节点的第一个子元素存在时，移除第一个子元素

  },
  attr: function attr(node, key, value) {
    //arguments.length表明参数个数
    if (arguments.length === 3) {
      node.setAttribute(key, value);
    } else if (arguments.length === 2) {
      node.getAttribute(key);
      console.log(node.getAttribute(key));
    }
  },
  text: function text(node, string) {
    //注意如果改变的节点里面还有子节点，那么这些节点会因为被新的文本内容取代而消失
    if ('innerText' in node) {
      if (arguments.length === 2) {
        node.innerText = string;
      } else if (arguments.length === 1) {
        console.log(node.innerText);
      }
    } else {
      if (arguments.length === 2) {
        node.textContent = string;
      } else if (arguments.length === 1) {
        console.log(node.textContent);
      }
    }
  },
  html: function html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      console.log(node.innerHTML);
    }
  },
  style: function style(node, string) {
    //这里可以做很多优化，但是我累了
    node.style = string;
  },
  class: {
    add: function add(node, name) {
      node.classList.add(name);
    },
    remove: function remove(node, name) {
      //不知道为什么remove之后还有class存在，只是后面没有赋值
      node.classList.remove(name);
    },
    has: function has(node, name) {
      //晕，写了半天有固定的API,这就是读书少的后果
      // return node.classList.contains(name)
      if (node.classList.length !== 0) {
        for (var _i = 0; _i < node.classList.length; _i++) {
          if (name === node.classList[_i]) {
            console.log("存在该属性");
          } else if (node.classList.length == c) {
            console.log("不存在该属性");
          }
        }
      } else {
        console.log("不存在该属性");
      }
    }
  },
  on: function on(node, EvenName, fn) {
    node.addEventListener(EvenName, fn);
  },
  off: function off(node, EvenName, fn) {
    node.removeEventListener(EvenName, fn);
  },
  find: function find(selector, scope) {
    console.log((scope || document).querySelectorAll(selector));
  },
  parent: function parent(node) {
    return node.parentNode;
  },
  children: function children(node) {
    return node.children;
  },
  siblings: function siblings(node) {
    //为什么老师的方法如此简洁
    // siblings(node){
    //     return Array.from(node.parentNode.children)
    //     .filter(n=>n!==node)
    //   },
    var s = node.parentNode.children;
    var list = [];
    var n = 0;

    for (var _i2 = 0; _i2 < s.length; _i2++) {
      if (node !== s[_i2]) {
        list.push(s[_i2]);
        console.log(list[n]);
        n++;
      }
    }
  },
  next: function next(node) {
    var x = node.nextSibling;

    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }

    return x; //头脑过于简单才写出下面的代码
    // node.nextSibling
  },
  previous: function previous(node) {
    var x = node.previousSibling;

    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }

    return x; //同上
    //node.previousSibling
  },
  each: function each(nodeList, fn) {
    for (var _i3 = 0; _i3 < nodeList.length; _i3++) {
      fn.call(null, nodeList[_i3]);
    }
  },
  index: function index(node) {
    var list = dom.children(node.parentNode);

    for (var _i4 = 0; _i4 < list.length; _i4++) {
      if (list[_i4] === node) {
        break;
      }
    }

    return i;
  }
};
},{}],"D:/nodejs/node_global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59395" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["D:/nodejs/node_global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","dom.js"], null)
//# sourceMappingURL=/dom.1d0b6d56.js.map