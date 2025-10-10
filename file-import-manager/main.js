"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/tslib/tslib.es6.mjs
var tslib_es6_exports = {};
__export(tslib_es6_exports, {
  __addDisposableResource: () => __addDisposableResource,
  __assign: () => __assign,
  __asyncDelegator: () => __asyncDelegator,
  __asyncGenerator: () => __asyncGenerator,
  __asyncValues: () => __asyncValues,
  __await: () => __await,
  __awaiter: () => __awaiter,
  __classPrivateFieldGet: () => __classPrivateFieldGet,
  __classPrivateFieldIn: () => __classPrivateFieldIn,
  __classPrivateFieldSet: () => __classPrivateFieldSet,
  __createBinding: () => __createBinding,
  __decorate: () => __decorate,
  __disposeResources: () => __disposeResources,
  __esDecorate: () => __esDecorate,
  __exportStar: () => __exportStar,
  __extends: () => __extends,
  __generator: () => __generator,
  __importDefault: () => __importDefault,
  __importStar: () => __importStar,
  __makeTemplateObject: () => __makeTemplateObject,
  __metadata: () => __metadata,
  __param: () => __param,
  __propKey: () => __propKey,
  __read: () => __read,
  __rest: () => __rest,
  __rewriteRelativeImportExtension: () => __rewriteRelativeImportExtension,
  __runInitializers: () => __runInitializers,
  __setFunctionName: () => __setFunctionName,
  __spread: () => __spread,
  __spreadArray: () => __spreadArray,
  __spreadArrays: () => __spreadArrays,
  __values: () => __values,
  default: () => tslib_es6_default
});
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function")
      throw new TypeError("Function expected");
    return f;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context = {};
    for (var p in contextIn)
      context[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access)
      context.access[p] = contextIn.access[p];
    context.addInitializer = function(f) {
      if (done)
        throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0)
        continue;
      if (result === null || typeof result !== "object")
        throw new TypeError("Object expected");
      if (_ = accept(result.get))
        descriptor.get = _;
      if (_ = accept(result.set))
        descriptor.set = _;
      if (_ = accept(result.init))
        initializers.unshift(_);
    } else if (_ = accept(result)) {
      if (kind === "field")
        initializers.unshift(_);
      else
        descriptor[key] = _;
    }
  }
  if (target)
    Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
}
function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
}
function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
}
function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol")
    name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f)
      throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _)
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          return t;
        if (y = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __exportStar(m, o) {
  for (var p in m)
    if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
      __createBinding(o, m, p);
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m)
    return m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function() {
        if (o && i >= o.length)
          o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
}
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
    ar = ar.concat(__read(arguments[i]));
  return ar;
}
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++)
    s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
      r[k] = a[j];
  return r;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function awaitReturn(f) {
    return function(v) {
      return Promise.resolve(v).then(f, reject);
    };
  }
  function verb(n, f) {
    if (g[n]) {
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
      if (f)
        i[n] = f(i[n]);
    }
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length)
      resume(q[0][0], q[0][1]);
  }
}
function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function(e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function() {
    return this;
  }, i;
  function verb(n, f) {
    i[n] = o[n] ? function(v) {
      return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v;
    } : f;
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
function __importStar(mod) {
  if (mod && mod.__esModule)
    return mod;
  var result = {};
  if (mod != null) {
    for (var k = ownKeys(mod), i = 0; i < k.length; i++)
      if (k[i] !== "default")
        __createBinding(result, mod, k[i]);
  }
  __setModuleDefault(result, mod);
  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : { default: mod };
}
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function")
    throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}
function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function")
      throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose)
        throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose)
        throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async)
        inner = dispose;
    }
    if (typeof dispose !== "function")
      throw new TypeError("Object not disposable.");
    if (inner)
      dispose = function() {
        try {
          inner.call(this);
        } catch (e) {
          return Promise.reject(e);
        }
      };
    env.stack.push({ value, dispose, async });
  } else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}
function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  var r, s = 0;
  function next() {
    while (r = env.stack.pop()) {
      try {
        if (!r.async && s === 1)
          return s = 0, env.stack.push(r), Promise.resolve().then(next);
        if (r.dispose) {
          var result = r.dispose.call(r.value);
          if (r.async)
            return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
        } else
          s |= 1;
      } catch (e) {
        fail(e);
      }
    }
    if (s === 1)
      return env.hasError ? Promise.reject(env.error) : Promise.resolve();
    if (env.hasError)
      throw env.error;
  }
  return next();
}
function __rewriteRelativeImportExtension(path2, preserveJsx) {
  if (typeof path2 === "string" && /^\.\.?\//.test(path2)) {
    return path2.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(m, tsx, d, ext, cm) {
      return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : d + ext + "." + cm.toLowerCase() + "js";
    });
  }
  return path2;
}
var extendStatics, __assign, __createBinding, __setModuleDefault, ownKeys, _SuppressedError, tslib_es6_default;
var init_tslib_es6 = __esm({
  "node_modules/tslib/tslib.es6.mjs"() {
    extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    __assign = function() {
      __assign = Object.assign || function __assign2(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    __createBinding = Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    };
    __setModuleDefault = Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    };
    ownKeys = function(o) {
      ownKeys = Object.getOwnPropertyNames || function(o2) {
        var ar = [];
        for (var k in o2)
          if (Object.prototype.hasOwnProperty.call(o2, k))
            ar[ar.length] = k;
        return ar;
      };
      return ownKeys(o);
    };
    _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
      var e = new Error(message);
      return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };
    tslib_es6_default = {
      __extends,
      __assign,
      __rest,
      __decorate,
      __param,
      __esDecorate,
      __runInitializers,
      __propKey,
      __setFunctionName,
      __metadata,
      __awaiter,
      __generator,
      __createBinding,
      __exportStar,
      __values,
      __read,
      __spread,
      __spreadArrays,
      __spreadArray,
      __await,
      __asyncGenerator,
      __asyncDelegator,
      __asyncValues,
      __makeTemplateObject,
      __importStar,
      __importDefault,
      __classPrivateFieldGet,
      __classPrivateFieldSet,
      __classPrivateFieldIn,
      __addDisposableResource,
      __disposeResources,
      __rewriteRelativeImportExtension
    };
  }
});

// dist/main.js
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
var path = require("path");
var obsidian_1 = require("obsidian");
var DEFAULT_SETTINGS = {
  defaultFolder: "./imports",
  fileCategories: [
    {
      id: "images",
      name: "\u56FE\u7247\u6587\u4EF6",
      extensions: [".jpg", ".jpeg", ".png", ".gif", ".svg"],
      folderPath: "./images"
    },
    {
      id: "audio",
      name: "\u97F3\u9891\u6587\u4EF6",
      extensions: [".mp3", ".wav"],
      folderPath: "./audio"
    },
    {
      id: "video",
      name: "\u89C6\u9891\u6587\u4EF6",
      extensions: [".mp4", ".mov"],
      folderPath: "./video"
    },
    {
      id: "pdf",
      name: "PDF\u6587\u6863",
      extensions: [".pdf"],
      folderPath: "./documents"
    }
  ],
  enabled: true,
  // 重命名功能默认设置
  renameEnabled: true,
  namePattern: "\u9644\u4EF6-${DATE}",
  duplicateNumberPosition: "suffix",
  duplicateNumberSeparator: " ",
  // 调试模式默认关闭
  debugMode: false
};
var FileImportManager = class extends obsidian_1.Plugin {
  constructor() {
    super(...arguments);
    this.dragOverThrottleTimeout = null;
  }
  onload() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      yield this.loadSettings();
      this.addSettingTab(new FileImportManagerSettingTab(this.app, this));
      this.addCommand({
        id: "toggle-file-import-manager",
        name: "\u5207\u6362\u6587\u4EF6\u5BFC\u5165\u7BA1\u7406\u5668",
        callback: () => {
          this.settings.enabled = !this.settings.enabled;
          this.saveSettings();
          this.updateDragDropHandler();
        }
      });
      this.updateDragDropHandler();
      console.log("\u6587\u4EF6\u5BFC\u5165\u7BA1\u7406\u5668\u5DF2\u52A0\u8F7D");
    });
  }
  onunload() {
    console.log("\u6587\u4EF6\u5BFC\u5165\u7BA1\u7406\u5668\u5DF2\u5378\u8F7D");
  }
  loadSettings() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
    });
  }
  // 检查元素是否在Obsidian窗口内
  isElementInObsidianWindow(element) {
    if (!element || !document.body.contains(element)) {
      return false;
    }
    const validDropRegions = [
      ".workspace",
      ".editor-container",
      ".file-explorer",
      ".sidebar",
      ".markdown-preview-view",
      ".canvas-container"
      // Canvas视图
    ];
    let currentElement = element;
    while (currentElement && currentElement !== document.body) {
      for (const selector of validDropRegions) {
        if (currentElement.matches(selector)) {
          return true;
        }
      }
      currentElement = currentElement.parentElement;
    }
    const excludedRegions = [
      ".modal-container",
      ".dropdown",
      ".context-menu",
      ".toast-notification",
      ".search-result-container"
      // 搜索结果
    ];
    for (const selector of excludedRegions) {
      const excludedElement = element.closest(selector);
      if (excludedElement) {
        return false;
      }
    }
    return true;
  }
  saveSettings() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      yield this.saveData(this.settings);
    });
  }
  // 更新拖放处理函数
  updateDragDropHandler() {
    if (this.settings.enabled) {
      this.checkVersionCompatibility();
      this.checkPluginConflicts();
      const throttledDragOver = this.throttle((evt) => this.handleDragOver(evt), 100);
      const handleDrop = (evt) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
          yield this.handleDrop(evt);
        } catch (error) {
          console.error("\u62D6\u653E\u5904\u7406\u5931\u8D25:", error);
          new obsidian_1.Notice("\u6587\u4EF6\u5BFC\u5165\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");
        }
      });
      const handlePaste = (evt) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
          yield this.handlePaste(evt);
        } catch (error) {
          console.error("\u7C98\u8D34\u5904\u7406\u5931\u8D25:", error);
          new obsidian_1.Notice("\u7C98\u8D34\u6587\u4EF6\u5BFC\u5165\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");
        }
      });
      this.registerDomEvent(document, "dragover", throttledDragOver, true);
      this.registerDomEvent(document, "drop", handleDrop, true);
      this.registerDomEvent(document, "paste", handlePaste, true);
      this.registerDomEvent(document, "dragenter", throttledDragOver, true);
      this.registerDomEvent(document, "dragleave", throttledDragOver, true);
    }
  }
  // 处理粘贴事件
  handlePaste(evt) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      if (!evt)
        return;
      try {
        if (!evt.clipboardData || !evt.clipboardData.files || evt.clipboardData.files.length === 0) {
          return;
        }
        const target = evt.target;
        if (!target || !this.isElementInObsidianWindow(target)) {
          return;
        }
        const files = Array.from(evt.clipboardData.files);
        const hasMdFiles = files.some((file) => file.name.toLowerCase().endsWith(".md"));
        if (hasMdFiles) {
          return;
        }
        evt.preventDefault();
        evt.stopPropagation();
        if (typeof evt.defaultPrevented !== "boolean") {
          Object.defineProperty(evt, "defaultPrevented", {
            get: function() {
              return true;
            }
          });
        } else {
          if (evt._prevented !== true) {
            evt._prevented = true;
          }
        }
        const importedFiles = [];
        const failedFiles = [];
        const concurrencyLimit = 5;
        const filePromises = [];
        const fileQueue = Array.from(evt.clipboardData.files);
        while (fileQueue.length > 0) {
          const batch = fileQueue.splice(0, concurrencyLimit);
          const batchPromises = batch.map((file) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
              const importedFilePath = yield this.handleExternalFile(file);
              importedFiles.push(importedFilePath);
            } catch (error) {
              console.error("\u5BFC\u5165\u6587\u4EF6\u9519\u8BEF:", error);
              failedFiles.push(file.name);
            }
          }));
          yield Promise.all(batchPromises);
        }
        const activeLeaf = this.app.workspace.activeLeaf;
        if (activeLeaf) {
          const activeView = activeLeaf.view;
          if ("editor" in activeView) {
            const editor = activeView.editor;
            if (editor) {
              const linksText = importedFiles.map((filePath) => {
                const fileName = path.basename(filePath);
                return `[[${filePath}|${fileName}]]`;
              }).join(" ");
              editor.replaceSelection(linksText);
              new obsidian_1.Notice(`\u5DF2\u5728\u7F16\u8F91\u5668\u4E2D\u63D2\u5165 ${importedFiles.length} \u4E2A\u94FE\u63A5`);
            }
          }
        }
        if (importedFiles.length > 0) {
          new obsidian_1.Notice(`\u6210\u529F\u5BFC\u5165 ${importedFiles.length} \u4E2A\u6587\u4EF6`);
        }
        if (failedFiles.length > 0) {
          new obsidian_1.Notice(`\u5BFC\u5165\u5931\u8D25 ${failedFiles.length} \u4E2A\u6587\u4EF6: ${failedFiles.join(", ")}`);
        }
      } catch (error) {
        console.error("\u7C98\u8D34\u5904\u7406\u51FA\u9519:", error);
        new obsidian_1.Notice("\u5904\u7406\u7C98\u8D34\u6587\u4EF6\u65F6\u53D1\u751F\u9519\u8BEF");
      }
    });
  }
  // 检查Obsidian版本兼容性
  checkVersionCompatibility() {
    try {
      const appVersion = this.app.appVersion;
      if (!appVersion) {
        console.warn("\u6587\u4EF6\u5BFC\u5165\u7BA1\u7406\u5668: \u65E0\u6CD5\u83B7\u53D6Obsidian\u7248\u672C\u4FE1\u606F\uFF0C\u8DF3\u8FC7\u7248\u672C\u68C0\u67E5");
        return;
      }
      const [major, minor] = appVersion.split(".").map(Number);
      const minMajor = 1;
      const minMinor = 0;
      if (major < minMajor || major === minMajor && minor < minMinor) {
        console.warn(`\u6587\u4EF6\u5BFC\u5165\u7BA1\u7406\u5668: \u5F53\u524DObsidian\u7248\u672C(${appVersion})\u4F4E\u4E8E\u63A8\u8350\u7248\u672C(${minMajor}.${minMinor}+)`);
        if (this.settings.debugMode) {
          new obsidian_1.Notice(`\u6587\u4EF6\u5BFC\u5165\u7BA1\u7406\u5668: \u60A8\u7684Obsidian\u7248\u672C(${appVersion})\u53EF\u80FD\u4E0D\u5B8C\u5168\u517C\u5BB9\uFF0C\u5EFA\u8BAE\u66F4\u65B0\u5230${minMajor}.${minMinor}\u6216\u66F4\u9AD8\u7248\u672C\u3002`);
        }
      }
    } catch (error) {
      console.error("\u65E0\u6CD5\u68C0\u67E5Obsidian\u7248\u672C:", error);
    }
  }
  // 检查插件冲突
  checkPluginConflicts() {
    try {
      const conflictingPlugins = [
        "obsidian-image-toolkit",
        "obsidian-enhanced-attachments",
        "obsidian-file-explorer-extended"
      ];
      const enabledPlugins = this.app.plugins.enabledPlugins;
      if (enabledPlugins && typeof enabledPlugins.has === "function") {
        const activeConflicts = [];
        for (const pluginId of conflictingPlugins) {
          if (enabledPlugins.has(pluginId)) {
            activeConflicts.push(pluginId);
          }
        }
        if (activeConflicts.length > 0) {
          console.warn(`\u6587\u4EF6\u5BFC\u5165\u7BA1\u7406\u5668: \u68C0\u6D4B\u5230\u53EF\u80FD\u7684\u63D2\u4EF6\u51B2\u7A81: ${activeConflicts.join(", ")}`);
          if (this.settings.debugMode) {
            new obsidian_1.Notice(`\u6587\u4EF6\u5BFC\u5165\u7BA1\u7406\u5668: \u68C0\u6D4B\u5230\u53EF\u80FD\u4E0E\u4EE5\u4E0B\u63D2\u4EF6\u51B2\u7A81: ${activeConflicts.join(", ")}. \u53EF\u80FD\u4F1A\u5F71\u54CD\u62D6\u653E\u529F\u80FD\u3002`);
          }
        }
      }
    } catch (error) {
      console.error("\u65E0\u6CD5\u68C0\u67E5\u63D2\u4EF6\u51B2\u7A81:", error);
    }
  }
  // 节流函数 - 限制函数的执行频率
  throttle(func, limit) {
    let inThrottle = false;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  // 处理拖动经过事件
  handleDragOver(evt) {
    if (!evt)
      return;
    try {
      const target = evt.target;
      if (target && this.isElementInObsidianWindow(target)) {
        if (evt.dataTransfer) {
          evt.dataTransfer.dropEffect = "copy";
        }
      }
    } catch (error) {
      console.error("\u62D6\u52A8\u5904\u7406\u9519\u8BEF:", error);
    }
  }
  // 处理放置事件
  handleDrop(evt) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      if (!evt)
        return;
      try {
        if (!evt.dataTransfer || !evt.dataTransfer.files || evt.dataTransfer.files.length === 0) {
          return;
        }
        const target = evt.target;
        if (!target || !this.isElementInObsidianWindow(target)) {
          return;
        }
        const files = Array.from(evt.dataTransfer.files);
        const hasMdFiles = files.some((file) => file.name.toLowerCase().endsWith(".md"));
        if (hasMdFiles) {
          return;
        }
        evt.preventDefault();
        evt.stopPropagation();
        try {
          Object.defineProperty(evt, "defaultPrevented", {
            get: () => true
          });
        } catch (definePropertyError) {
          console.warn("\u65E0\u6CD5\u5B9A\u4E49defaultPrevented\u5C5E\u6027:", definePropertyError);
        }
        if (evt.dataTransfer) {
          evt.dataTransfer.dropEffect = "none";
        }
        const importedFiles = [];
        const failedFiles = [];
        const concurrencyLimit = 5;
        const filePromises = [];
        const fileQueue = Array.from(evt.dataTransfer.files);
        while (fileQueue.length > 0) {
          const batch = fileQueue.splice(0, concurrencyLimit);
          const batchPromises = batch.map((file) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
              const importedFilePath = yield this.handleExternalFile(file);
              importedFiles.push(importedFilePath);
            } catch (error) {
              console.error("\u5BFC\u5165\u6587\u4EF6\u9519\u8BEF:", error);
              failedFiles.push(file.name);
            }
          }));
          yield Promise.all(batchPromises);
        }
        const activeLeaf = this.app.workspace.activeLeaf;
        if (activeLeaf) {
          const activeView = activeLeaf.view;
          if ("editor" in activeView) {
            const editor = activeView.editor;
            if (editor) {
              const linksText = importedFiles.map((filePath) => {
                const fileName = path.basename(filePath);
                return `[[${filePath}|${fileName}]]`;
              }).join(" ");
              editor.replaceSelection(linksText);
              new obsidian_1.Notice(`\u5DF2\u5728\u7F16\u8F91\u5668\u4E2D\u63D2\u5165 ${importedFiles.length} \u4E2A\u94FE\u63A5`);
            }
          }
        }
        if (importedFiles.length > 0) {
          new obsidian_1.Notice(`\u6210\u529F\u5BFC\u5165 ${importedFiles.length} \u4E2A\u6587\u4EF6`);
        }
        if (failedFiles.length > 0) {
          new obsidian_1.Notice(`\u5BFC\u5165\u5931\u8D25 ${failedFiles.length} \u4E2A\u6587\u4EF6: ${failedFiles.join(", ")}`);
        }
        setTimeout(() => {
          const dragLeaveEvent = new DragEvent("dragleave", {
            bubbles: true,
            cancelable: true,
            dataTransfer: evt.dataTransfer
          });
          document.dispatchEvent(dragLeaveEvent);
        }, 0);
      } catch (error) {
        console.error("\u62D6\u653E\u5904\u7406\u51FA\u9519:", error);
        new obsidian_1.Notice("\u5904\u7406\u62D6\u653E\u6587\u4EF6\u65F6\u53D1\u751F\u9519\u8BEF");
      }
    });
  }
  // 检查元素是否属于 Obsidian 窗口
  isObsidianWindow(element) {
    return element.closest(".workspace") !== null;
  }
  // 根据文件扩展名获取目标文件夹
  getTargetFolder(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    for (const category of this.settings.fileCategories) {
      if (category.extensions.includes(ext)) {
        return category.folderPath;
      }
    }
    return this.settings.defaultFolder;
  }
  // 处理外部文件
  handleExternalFile(file) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      try {
        const extension = path.extname(file.name).toLowerCase();
        const baseName = path.basename(file.name, extension);
        let targetFolderPath = this.getTargetFolder(file.name);
        targetFolderPath = (0, obsidian_1.normalizePath)(targetFolderPath);
        yield this.ensureFolderExists(targetFolderPath);
        const arrayBuffer = yield this.readFileAsArrayBuffer(file);
        const buffer = Buffer.from(arrayBuffer);
        const activeFile = this.app.workspace.getActiveFile();
        let newFileName = file.name;
        if (this.settings.renameEnabled) {
          newFileName = this.generateNewName(baseName, extension, activeFile);
        }
        const targetFilePath = (0, obsidian_1.normalizePath)(path.join(targetFolderPath, newFileName));
        let finalFilePath = this.deduplicateNewName(targetFilePath, targetFolderPath);
        let counter = 1;
        while (yield this.app.vault.adapter.exists(finalFilePath)) {
          finalFilePath = this.deduplicateNewName(targetFilePath, targetFolderPath, counter);
          counter++;
          if (counter > 1e3) {
            throw new Error("\u68C0\u6D4B\u5230\u53EF\u80FD\u7684\u65E0\u9650\u5FAA\u73AF\uFF0C\u5DF2\u8FBE\u5230\u6700\u5927\u91CD\u8BD5\u6B21\u6570");
          }
        }
        try {
          const adapter = this.app.vault.adapter;
          yield adapter.writeBinary(finalFilePath, buffer);
        } catch (adapterError) {
          console.error("\u6587\u4EF6\u7CFB\u7EDF\u9002\u914D\u5668\u9519\u8BEF:", adapterError);
          yield this.app.vault.adapter.writeBinary(finalFilePath, buffer);
        }
        console.log(`\u6587\u4EF6\u5BFC\u5165\u6210\u529F: ${file.name} -> ${finalFilePath}`);
        return finalFilePath;
      } catch (error) {
        console.error("\u5904\u7406\u5916\u90E8\u6587\u4EF6\u9519\u8BEF:", error);
        throw error;
      }
    });
  }
  // 替换日期变量，支持Moment.js格式
  replaceDateVar(template) {
    let processedTemplate = template;
    const dateFormatRegex = /\$\{DATE:([^}]*)\}/g;
    let match;
    while ((match = dateFormatRegex.exec(template)) !== null) {
      const format = match[1] || "YYYY-MM-DD";
      const formattedDate = (0, obsidian_1.moment)().format(format);
      processedTemplate = processedTemplate.replace(match[0], formattedDate);
    }
    const now = (0, obsidian_1.moment)();
    const fullDateTime = now.format("YYYY-MM-DD_HH-mm-ss");
    const date = now.format("YYYY-MM-DD");
    const year = now.format("YYYY");
    const month = now.format("MM");
    const day = now.format("DD");
    const time = now.format("HH-mm-ss");
    return processedTemplate.replace(/\$\{FULL_DATE_TIME\}/g, fullDateTime).replace(/\$\{DATE\}/g, date).replace(/\$\{YEAR\}/g, year).replace(/\$\{MONTH\}/g, month).replace(/\$\{DAY\}/g, day).replace(/\$\{TIME\}/g, time);
  }
  // 获取当前活动文件的一级标题（使用metadataCache）
  getFirstHeading(activeFile) {
    try {
      if (!this.app.vault.getAbstractFileByPath(activeFile.path)) {
        return "";
      }
      const cache = this.app.metadataCache.getFileCache(activeFile);
      if ((cache === null || cache === void 0 ? void 0 : cache.headings) && cache.headings.length > 0) {
        const level1Heading = cache.headings.find((heading) => heading.level === 1);
        if (level1Heading && level1Heading.heading) {
          return level1Heading.heading.trim();
        }
      }
    } catch (error) {
      console.error("\u83B7\u53D6\u4E00\u7EA7\u6807\u9898\u65F6\u51FA\u9519:", error);
    }
    return "";
  }
  // 从frontmatter中获取imageNameKey
  getImageNameKeyFromFrontmatter(activeFile) {
    var _a;
    try {
      if (!this.app.vault.getAbstractFileByPath(activeFile.path)) {
        return "";
      }
      const frontmatter = (_a = this.app.metadataCache.getFileCache(activeFile)) === null || _a === void 0 ? void 0 : _a.frontmatter;
      if (frontmatter && frontmatter.imageNameKey) {
        return String(frontmatter.imageNameKey);
      }
    } catch (error) {
      console.error("\u4ECEfrontmatter\u83B7\u53D6imageNameKey\u65F6\u51FA\u9519:", error);
    }
    return "";
  }
  // 生成新文件名（添加当前活动文件上下文参数）
  generateNewName(originalName, extension, activeFile) {
    if (!this.settings.renameEnabled) {
      return originalName + extension;
    }
    let newName = this.replaceDateVar(this.settings.namePattern);
    newName = newName.replace(/\$\{ORIGINAL_NAME\}/g, originalName);
    if (activeFile) {
      const fileNameWithoutExt = path.basename(activeFile.name, path.extname(activeFile.name));
      newName = newName.replace(/\$\{fileName\}/g, fileNameWithoutExt);
      const dirName = activeFile.parent.path;
      newName = newName.replace(/\$\{dirName\}/g, dirName);
      const firstHeading = this.getFirstHeading(activeFile);
      if (firstHeading) {
        newName = newName.replace(/\$\{firstHeading\}/g, firstHeading);
      }
      const imageNameKey = this.getImageNameKeyFromFrontmatter(activeFile);
      if (imageNameKey) {
        newName = newName.replace(/\$\{imageNameKey\}/g, imageNameKey);
      }
    }
    newName = this.sanitizeFileName(newName);
    return newName + extension;
  }
  // 处理重复文件名
  deduplicateNewName(filePath, folderPath, counter = 0) {
    if (counter === 0) {
      return filePath;
    }
    const baseName = path.basename(filePath, path.extname(filePath));
    const extension = path.extname(filePath);
    let newName;
    if (this.settings.duplicateNumberPosition === "prefix") {
      newName = `${counter}${this.settings.duplicateNumberSeparator}${baseName}`;
    } else {
      newName = `${baseName}${this.settings.duplicateNumberSeparator}(${counter})`;
    }
    return (0, obsidian_1.normalizePath)(path.join(folderPath, newName + extension));
  }
  // 清理文件名中的无效字符
  sanitizeFileName(name) {
    const invalidChars = /[\\/:*?"<>|]/g;
    return name.replace(invalidChars, "_");
  }
  // 确保文件夹存在
  ensureFolderExists(folderPath) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      try {
        const normalizedPath = (0, obsidian_1.normalizePath)(folderPath);
        const exists = yield this.app.vault.adapter.exists(normalizedPath);
        if (!exists) {
          yield this.app.vault.createFolder(normalizedPath);
          console.log(`\u5DF2\u521B\u5EFA\u6587\u4EF6\u5939: ${normalizedPath}`);
        }
        const finalExists = yield this.app.vault.adapter.exists(normalizedPath);
        if (!finalExists) {
          throw new Error(`\u6587\u4EF6\u5939\u521B\u5EFA\u5931\u8D25: ${normalizedPath}`);
        }
      } catch (error) {
        console.error("\u786E\u4FDD\u6587\u4EF6\u5939\u5B58\u5728\u65F6\u51FA\u9519:", error);
        throw error;
      }
    });
  }
  // 搜索匹配的文件夹
  searchFolders(query) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      if (!query || typeof query !== "string")
        return [];
      try {
        const allItems = this.app.vault.getAllLoadedFiles();
        const folders = allItems.filter((item) => item instanceof obsidian_1.TFolder).map((folder) => folder.path).filter((folder) => folder.toLowerCase().includes(query.toLowerCase())).slice(0, 10);
        return folders;
      } catch (error) {
        console.error("\u641C\u7D22\u6587\u4EF6\u5939\u65F6\u51FA\u9519:", error);
        try {
          const allFiles = yield this.app.vault.adapter.list("");
          const folders = allFiles.folders.filter((folder) => folder.toLowerCase().includes(query.toLowerCase()));
          return folders.slice(0, 10);
        } catch (fallbackError) {
          console.error("\u641C\u7D22\u6587\u4EF6\u5939\uFF08\u964D\u7EA7\u65B9\u6CD5\uFF09\u65F6\u51FA\u9519:", fallbackError);
          return [];
        }
      }
    });
  }
  // 读取文件为 ArrayBuffer
  readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }
};
exports.default = FileImportManager;
var FolderSelectModal = class extends obsidian_1.Modal {
  constructor(app, setting, onChange) {
    super(app);
    this.onConfirm = () => {
    };
    this.selectedFolder = ".";
    this.setting = setting;
    this.onChange = onChange;
  }
  onOpen() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      const { contentEl } = this;
      contentEl.createEl("h2", { text: "\u9009\u62E9\u5BFC\u5165\u6587\u4EF6\u5939" });
      const folderList = contentEl.createEl("select");
      folderList.style.width = "100%";
      folderList.style.marginBottom = "20px";
      const folders = [];
      const allItems = this.app.vault.getAllLoadedFiles();
      const seenFolders = /* @__PURE__ */ new Set();
      folders.push({ path: ".", name: "\u6839\u76EE\u5F55" });
      for (const item of allItems) {
        if (item instanceof obsidian_1.TFolder) {
          if (!seenFolders.has(item.path) && item.path !== ".") {
            seenFolders.add(item.path);
            folders.push({ path: item.path, name: item.path.replace(/\//g, " > ") });
          }
        } else if (item instanceof obsidian_1.TFile) {
          const folderPath = item.parent.path;
          if (!seenFolders.has(folderPath) && folderPath !== ".") {
            seenFolders.add(folderPath);
            folders.push({ path: folderPath, name: folderPath.replace(/\//g, " > ") });
          }
        }
      }
      for (const folder of folders) {
        const option = document.createElement("option");
        option.value = folder.path;
        option.textContent = folder.name;
        folderList.appendChild(option);
      }
      folderList.addEventListener("change", (evt) => {
        this.selectedFolder = evt.target.value;
      });
      const buttonContainer = contentEl.createDiv();
      buttonContainer.style.display = "flex";
      buttonContainer.style.justifyContent = "flex-end";
      buttonContainer.style.gap = "10px";
      const cancelButton = buttonContainer.createEl("button");
      cancelButton.textContent = "\u53D6\u6D88";
      cancelButton.addEventListener("click", () => this.close());
      const confirmButton = buttonContainer.createEl("button");
      confirmButton.textContent = "\u9009\u62E9";
      confirmButton.addEventListener("click", () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const textInput = this.setting.controlEl.querySelector('input[type="text"]');
        if (textInput) {
          let formattedPath = this.selectedFolder;
          if (formattedPath !== ".") {
            formattedPath = `./${formattedPath}`;
          }
          textInput.value = formattedPath;
          yield this.onChange(formattedPath);
        }
        this.close();
      }));
    });
  }
  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
};
var FileImportManagerSettingTab = class extends obsidian_1.PluginSettingTab {
  // 导出配置功能
  exportConfig() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      try {
        const configStr = JSON.stringify(this.plugin.settings, null, 2);
        const blob = new Blob([configStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `file-import-manager-config-${(0, obsidian_1.moment)().format("YYYY-MM-DD_HH-mm-ss")}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        new obsidian_1.Notice("\u914D\u7F6E\u5BFC\u51FA\u6210\u529F\uFF01");
      } catch (error) {
        console.error("\u5BFC\u51FA\u914D\u7F6E\u5931\u8D25:", error);
        new obsidian_1.Notice("\u914D\u7F6E\u5BFC\u51FA\u5931\u8D25\uFF0C\u8BF7\u67E5\u770B\u63A7\u5236\u53F0");
      }
    });
  }
  // 导入配置功能
  importConfig() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
      try {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json";
        input.onchange = (event) => tslib_1.__awaiter(this, void 0, void 0, function* () {
          var _a;
          const file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
          if (!file)
            return;
          try {
            const content = yield new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = (e) => {
                var _a2;
                return resolve((_a2 = e.target) === null || _a2 === void 0 ? void 0 : _a2.result);
              };
              reader.onerror = reject;
              reader.readAsText(file);
            });
            const importedSettings = JSON.parse(content);
            if (!importedSettings || typeof importedSettings !== "object") {
              throw new Error("\u65E0\u6548\u7684\u914D\u7F6E\u6587\u4EF6\u683C\u5F0F");
            }
            this.plugin.settings = Object.assign(Object.assign({}, this.plugin.settings), importedSettings);
            yield this.plugin.saveSettings();
            this.display();
            this.plugin.updateDragDropHandler();
            new obsidian_1.Notice("\u914D\u7F6E\u5BFC\u5165\u6210\u529F\uFF01");
          } catch (error) {
            console.error("\u5BFC\u5165\u914D\u7F6E\u5931\u8D25:", error);
            new obsidian_1.Notice("\u914D\u7F6E\u5BFC\u5165\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u6587\u4EF6\u683C\u5F0F");
          }
        });
        input.click();
      } catch (error) {
        console.error("\u6253\u5F00\u6587\u4EF6\u9009\u62E9\u5668\u5931\u8D25:", error);
        new obsidian_1.Notice("\u6253\u5F00\u6587\u4EF6\u9009\u62E9\u5668\u5931\u8D25");
      }
    });
  }
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    const isPluginEnabled = this.plugin.settings.enabled;
    containerEl.empty();
    const title = containerEl.createEl("h1", { text: "\u6587\u4EF6\u5BFC\u5165\u7BA1\u7406\u5668\u8BBE\u7F6E" });
    title.style.fontWeight = "bold";
    title.style.marginBottom = "20px";
    const configButtonsContainer = containerEl.createDiv();
    configButtonsContainer.style.display = "flex";
    configButtonsContainer.style.justifyContent = "flex-end";
    configButtonsContainer.style.marginBottom = "20px";
    configButtonsContainer.style.gap = "10px";
    const exportButton = configButtonsContainer.createEl("button", {
      text: "\u5BFC\u51FA\u914D\u7F6E"
    });
    exportButton.addClass("mod-cta");
    exportButton.onclick = this.exportConfig.bind(this);
    const importButton = configButtonsContainer.createEl("button", {
      text: "\u5BFC\u5165\u914D\u7F6E"
    });
    importButton.onclick = this.importConfig.bind(this);
    const separatorTop = containerEl.createDiv();
    separatorTop.style.height = "2px";
    separatorTop.style.backgroundColor = "var(--background-modifier-border)";
    separatorTop.style.margin = "20px 0";
    separatorTop.style.borderRadius = "1px";
    const renameSettingsContainer = containerEl.createDiv("rename-settings");
    renameSettingsContainer.createEl("h3", { text: "\u6587\u4EF6\u91CD\u547D\u540D\u8BBE\u7F6E" });
    renameSettingsContainer.createEl("p", { text: "\u914D\u7F6E\u5BFC\u5165\u6587\u4EF6\u65F6\u7684\u91CD\u547D\u540D\u89C4\u5219" });
    new obsidian_1.Setting(renameSettingsContainer).setName("\u542F\u7528\u6587\u4EF6\u91CD\u547D\u540D").setDesc("\u5BFC\u5165\u6587\u4EF6\u65F6\u662F\u5426\u81EA\u52A8\u91CD\u547D\u540D").addToggle((toggle) => toggle.setValue(this.plugin.settings.renameEnabled).onChange((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
      this.plugin.settings.renameEnabled = value;
      yield this.plugin.saveSettings();
    })));
    new obsidian_1.Setting(renameSettingsContainer).setName("\u6587\u4EF6\u540D\u6A21\u5F0F").setDesc("\u81EA\u5B9A\u4E49\u6587\u4EF6\u540D\u683C\u5F0F\uFF0C\u652F\u6301 ${DATE}, ${FULL_DATE_TIME}, ${YEAR}, ${MONTH}, ${DAY}, ${TIME}, ${ORIGINAL_NAME} \u53D8\u91CF").addText((text) => text.setValue(this.plugin.settings.namePattern).setPlaceholder("\u9644\u4EF6-${DATE}").onChange((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
      this.plugin.settings.namePattern = value;
      yield this.plugin.saveSettings();
    })));
    new obsidian_1.Setting(renameSettingsContainer).setName("\u91CD\u590D\u6570\u5B57\u4F4D\u7F6E").setDesc("\u5F53\u6587\u4EF6\u540D\u91CD\u590D\u65F6\uFF0C\u6570\u5B57\u5E8F\u53F7\u7684\u4F4D\u7F6E").addDropdown((dropdown) => dropdown.addOption("prefix", "\u524D\u7F00").addOption("suffix", "\u540E\u7F00").setValue(this.plugin.settings.duplicateNumberPosition).onChange((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
      this.plugin.settings.duplicateNumberPosition = value;
      yield this.plugin.saveSettings();
    })));
    new obsidian_1.Setting(renameSettingsContainer).setName("\u91CD\u590D\u6570\u5B57\u5206\u9694\u7B26").setDesc("\u6570\u5B57\u5E8F\u53F7\u4E0E\u6587\u4EF6\u540D\u4E4B\u95F4\u7684\u5206\u9694\u7B26").addText((text) => text.setValue(this.plugin.settings.duplicateNumberSeparator).setPlaceholder("\u7A7A\u683C").onChange((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
      this.plugin.settings.duplicateNumberSeparator = value;
      yield this.plugin.saveSettings();
    })));
    const templateHelp = renameSettingsContainer.createDiv();
    templateHelp.style.marginTop = "10px";
    templateHelp.style.padding = "10px";
    templateHelp.style.backgroundColor = "var(--background-secondary-alt)";
    templateHelp.style.borderRadius = "4px";
    templateHelp.createEl("strong", { text: "\u53EF\u7528\u53D8\u91CF\u8BF4\u660E:" });
    const templateList = templateHelp.createEl("ul");
    templateList.style.marginTop = "5px";
    templateList.style.marginLeft = "20px";
    templateList.createEl("li", { text: "${DATE}: \u65E5\u671F (YYYY-MM-DD)" });
    templateList.createEl("li", { text: "${DATE:format}: \u81EA\u5B9A\u4E49\u683C\u5F0F\u65E5\u671F (\u4F7F\u7528Moment.js\u683C\u5F0F)" });
    templateList.createEl("li", { text: "${FULL_DATE_TIME}: \u5B8C\u6574\u65E5\u671F\u65F6\u95F4 (YYYY-MM-DD_HH-mm-ss)" });
    templateList.createEl("li", { text: "${YEAR}: \u5E74\u4EFD (YYYY)" });
    templateList.createEl("li", { text: "${MONTH}: \u6708\u4EFD (MM)" });
    templateList.createEl("li", { text: "${DAY}: \u65E5\u671F (DD)" });
    templateList.createEl("li", { text: "${TIME}: \u65F6\u95F4 (HH-mm-ss)" });
    templateList.createEl("li", { text: "${ORIGINAL_NAME}: \u539F\u59CB\u6587\u4EF6\u540D\uFF08\u4E0D\u542B\u6269\u5C55\u540D\uFF09" });
    templateList.createEl("li", { text: "${fileName}: \u5F53\u524D\u6D3B\u52A8\u6587\u4EF6\u7684\u540D\u79F0\uFF08\u4E0D\u542B.md\u6269\u5C55\u540D\uFF09" });
    templateList.createEl("li", { text: "${imageNameKey}: \u4ECE\u5F53\u524D\u6587\u4EF6frontmatter\u4E2D\u8BFB\u53D6\u7684\u81EA\u5B9A\u4E49\u952E\u503C" });
    templateList.createEl("li", { text: "${dirName}: \u5F53\u524D\u6D3B\u52A8\u6587\u4EF6\u6240\u5728\u76EE\u5F55\u540D" });
    templateList.createEl("li", { text: "${firstHeading}: \u5F53\u524D\u6D3B\u52A8\u6587\u4EF6\u7684\u4E00\u7EA7\u6807\u9898" });
    const thickSeparator = containerEl.createDiv();
    thickSeparator.style.height = "3px";
    thickSeparator.style.backgroundColor = "var(--background-modifier-border)";
    thickSeparator.style.margin = "20px 0";
    thickSeparator.style.borderRadius = "1.5px";
    thickSeparator.style.opacity = "0.8";
    const categoriesContainer = containerEl.createDiv("file-categories");
    categoriesContainer.createEl("h3", { text: "\u6587\u4EF6\u7C7B\u522B\u8BBE\u7F6E" });
    const defaultFolderSetting = new obsidian_1.Setting(categoriesContainer).setName("\u9ED8\u8BA4\u5BFC\u5165\u6587\u4EF6\u5939").setDesc("\u5F53\u6587\u4EF6\u7C7B\u578B\u6CA1\u6709\u7279\u5B9A\u7C7B\u522B\u65F6\u4F7F\u7528\u7684\u6587\u4EF6\u5939");
    this.addFolderSearchInput(defaultFolderSetting, this.plugin.settings.defaultFolder, (value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
      this.plugin.settings.defaultFolder = value;
      yield this.plugin.saveSettings();
    }));
    const thinSeparator = categoriesContainer.createDiv();
    thinSeparator.style.height = "1px";
    thinSeparator.style.backgroundColor = "var(--background-modifier-border)";
    thinSeparator.style.margin = "12px 0";
    thinSeparator.style.borderRadius = "0.5px";
    thinSeparator.style.opacity = "0.6";
    categoriesContainer.createEl("p", { text: "\u4E3A\u4E0D\u540C\u7C7B\u522B\u7684\u6587\u4EF6\u6307\u5B9A\u7279\u5B9A\u7684\u5BFC\u5165\u6587\u4EF6\u5939" });
    for (const category of this.plugin.settings.fileCategories) {
      const categoryContainer = categoriesContainer.createDiv("file-category-item");
      categoryContainer.style.marginBottom = "16px";
      categoryContainer.style.padding = "12px";
      categoryContainer.style.border = "1px solid var(--background-modifier-border)";
      categoryContainer.style.borderRadius = "4px";
      categoryContainer.style.backgroundColor = "var(--background-secondary)";
      categoryContainer.createEl("h4", {
        text: category.name,
        cls: "setting-item-name"
      });
      const extensionsContainer = categoryContainer.createDiv({
        cls: "setting-item-description"
      });
      extensionsContainer.createSpan({ text: "\u6269\u5C55\u540D: " });
      const extensionsList = extensionsContainer.createDiv();
      extensionsList.style.display = "flex";
      extensionsList.style.flexWrap = "wrap";
      extensionsList.style.gap = "6px";
      const defaultExtensions = {
        "images": [".jpg", ".jpeg", ".png", ".gif", ".svg"],
        "audio": [".mp3", ".wav"],
        "video": [".mp4", ".mov"],
        "pdf": [".pdf"]
      };
      const isExtensionDeletable = (ext) => {
        if (["images", "audio", "video", "pdf"].includes(category.id)) {
          const defaults = defaultExtensions[category.id] || [];
          return !defaults.includes(ext);
        }
        return true;
      };
      category.extensions.forEach((ext, index) => {
        const extContainer = extensionsList.createDiv();
        extContainer.style.display = "flex";
        extContainer.style.alignItems = "center";
        extContainer.style.gap = "4px";
        extContainer.createSpan({ text: ext });
        if (isExtensionDeletable(ext)) {
          const deleteButton = extContainer.createEl("button", {
            text: "\xD7",
            cls: "mod-cta mod-small",
            attr: { "aria-label": `\u5220\u9664\u6269\u5C55\u540D ${ext}` }
          });
          deleteButton.style.padding = "0 4px";
          deleteButton.style.minWidth = "auto";
          deleteButton.style.backgroundColor = "var(--background-modifier-error)";
          deleteButton.addEventListener("click", () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const confirmModal = new obsidian_1.Modal(this.app);
            confirmModal.titleEl.setText(`\u786E\u8BA4\u5220\u9664\u6269\u5C55\u540D`);
            confirmModal.contentEl.createEl("p", {
              text: `\u786E\u5B9A\u8981\u5220\u9664\u6269\u5C55\u540D ${ext} \u5417\uFF1F`
            });
            const buttonContainer = confirmModal.contentEl.createDiv();
            buttonContainer.style.display = "flex";
            buttonContainer.style.justifyContent = "flex-end";
            buttonContainer.style.gap = "8px";
            buttonContainer.style.marginTop = "16px";
            const cancelBtn = buttonContainer.createEl("button", { text: "\u53D6\u6D88" });
            cancelBtn.style.padding = "4px 8px";
            cancelBtn.addEventListener("click", () => confirmModal.close());
            const confirmBtn = buttonContainer.createEl("button", { text: "\u5220\u9664" });
            confirmBtn.style.padding = "4px 8px";
            confirmBtn.style.backgroundColor = "var(--background-modifier-error)";
            confirmBtn.style.color = "var(--text-on-accent)";
            confirmBtn.addEventListener("click", () => tslib_1.__awaiter(this, void 0, void 0, function* () {
              category.extensions = category.extensions.filter((e) => e !== ext);
              yield this.plugin.saveSettings();
              this.display();
              confirmModal.close();
              new obsidian_1.Notice(`\u5DF2\u5220\u9664\u6269\u5C55\u540D ${ext}`);
            }));
            confirmModal.open();
          }));
        }
        if (index < category.extensions.length - 1) {
          extensionsList.createSpan({ text: "," });
        }
      });
      if (["images", "audio", "video", "pdf"].includes(category.id)) {
        const addExtButton = extensionsContainer.createEl("button", {
          text: "\u6DFB\u52A0\u6269\u5C55\u540D",
          cls: "mod-cta mod-small"
        });
        addExtButton.style.marginLeft = "12px";
        addExtButton.style.padding = "2px 8px";
        addExtButton.addEventListener("click", () => {
          const modal = new obsidian_1.Modal(this.app);
          modal.titleEl.setText(`\u4E3A ${category.name} \u6DFB\u52A0\u6269\u5C55\u540D`);
          const inputContainer = modal.contentEl.createDiv();
          inputContainer.style.display = "flex";
          inputContainer.style.flexDirection = "column";
          inputContainer.style.gap = "12px";
          inputContainer.createEl("label", { text: "\u8BF7\u8F93\u5165\u65B0\u7684\u6587\u4EF6\u6269\u5C55\u540D\uFF08\u4EE5.\u5F00\u5934\uFF09:" });
          const extInput = inputContainer.createEl("input", {
            type: "text",
            placeholder: "\u4F8B\u5982\uFF1A.webp,.tiff"
          });
          extInput.style.padding = "8px";
          extInput.style.borderRadius = "4px";
          extInput.style.border = "1px solid var(--background-modifier-border)";
          const buttonContainer = modal.contentEl.createDiv();
          buttonContainer.style.display = "flex";
          buttonContainer.style.justifyContent = "flex-end";
          buttonContainer.style.gap = "8px";
          buttonContainer.style.marginTop = "16px";
          const cancelButton = buttonContainer.createEl("button", { text: "\u53D6\u6D88" });
          cancelButton.style.padding = "8px 16px";
          cancelButton.addEventListener("click", () => modal.close());
          const confirmButton = buttonContainer.createEl("button", { text: "\u786E\u8BA4" });
          confirmButton.style.padding = "8px 16px";
          confirmButton.style.backgroundColor = "var(--interactive-accent)";
          confirmButton.style.color = "var(--text-on-accent)";
          confirmButton.style.borderRadius = "4px";
          confirmButton.addEventListener("click", () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const extStr = extInput.value.trim();
            if (!extStr) {
              new obsidian_1.Notice("\u8BF7\u8F93\u5165\u6587\u4EF6\u6269\u5C55\u540D");
              return;
            }
            const newExtensions = extStr.split(",").map((ext) => ext.trim()).filter((ext) => ext.startsWith("."));
            if (newExtensions.length === 0) {
              new obsidian_1.Notice("\u8BF7\u8F93\u5165\u6709\u6548\u7684\u6587\u4EF6\u6269\u5C55\u540D\uFF08\u4EE5.\u5F00\u5934\uFF09");
              return;
            }
            const existingExtensions = new Set(category.extensions);
            const uniqueNewExtensions = newExtensions.filter((ext) => !existingExtensions.has(ext));
            if (uniqueNewExtensions.length === 0) {
              new obsidian_1.Notice("\u6240\u6709\u6269\u5C55\u540D\u90FD\u5DF2\u5B58\u5728");
              return;
            }
            category.extensions = [...category.extensions, ...uniqueNewExtensions];
            yield this.plugin.saveSettings();
            this.display();
            modal.close();
            new obsidian_1.Notice(`\u5DF2\u6210\u529F\u6DFB\u52A0 ${uniqueNewExtensions.length} \u4E2A\u6269\u5C55\u540D`);
          }));
          modal.open();
        });
      }
      const folderSetting = new obsidian_1.Setting(categoryContainer).setName("\u5BFC\u5165\u6587\u4EF6\u5939").setDesc(`\u8BBE\u7F6E ${category.name} \u7684\u5BFC\u5165\u4F4D\u7F6E`);
      this.addFolderSearchInput(folderSetting, category.folderPath, (newPath) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        category.folderPath = newPath;
        yield this.plugin.saveSettings();
      }));
      if (!["images", "audio", "video", "pdf"].includes(category.id)) {
        const actionContainer = categoryContainer.createDiv({
          cls: "setting-item-control"
        });
        actionContainer.createEl("button", {
          text: "\u5220\u9664",
          cls: "mod-cta mod-warning",
          attr: {
            "aria-label": `\u5220\u9664 ${category.name} \u7C7B\u522B`
          }
        }).addEventListener("click", () => tslib_1.__awaiter(this, void 0, void 0, function* () {
          this.plugin.settings.fileCategories = this.plugin.settings.fileCategories.filter((c) => c.id !== category.id);
          yield this.plugin.saveSettings();
          this.display();
        }));
      }
    }
    const addCategorySetting = new obsidian_1.Setting(containerEl).addButton((button) => button.setButtonText("\u6DFB\u52A0\u81EA\u5B9A\u4E49\u6587\u4EF6\u7C7B\u522B").onClick(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
      const modal = new obsidian_1.Modal(this.app);
      modal.titleEl.setText("\u6DFB\u52A0\u81EA\u5B9A\u4E49\u6587\u4EF6\u7C7B\u522B");
      const formContainer = modal.contentEl.createDiv();
      formContainer.style.display = "flex";
      formContainer.style.flexDirection = "column";
      formContainer.style.gap = "12px";
      formContainer.createEl("label", { text: "\u7C7B\u522B\u540D\u79F0:" });
      const nameInput = formContainer.createEl("input", {
        type: "text",
        placeholder: "\u4F8B\u5982\uFF1A\u6587\u6863\u6587\u4EF6"
      });
      nameInput.style.padding = "8px";
      nameInput.style.borderRadius = "4px";
      nameInput.style.border = "1px solid var(--background-modifier-border)";
      formContainer.createEl("label", { text: "\u6587\u4EF6\u6269\u5C55\u540D\uFF08\u7528\u9017\u53F7\u5206\u9694\uFF09:" });
      const extensionsInput = formContainer.createEl("input", {
        type: "text",
        placeholder: "\u4F8B\u5982\uFF1A.doc,.docx,.txt"
      });
      extensionsInput.style.padding = "8px";
      extensionsInput.style.borderRadius = "4px";
      extensionsInput.style.border = "1px solid var(--background-modifier-border)";
      formContainer.createEl("label", { text: "\u76EE\u6807\u6587\u4EF6\u5939\u8DEF\u5F84:" });
      const folderInput = formContainer.createEl("input", {
        type: "text",
        placeholder: "\u4F8B\u5982\uFF1A./documents"
      });
      folderInput.style.padding = "8px";
      folderInput.style.borderRadius = "4px";
      folderInput.style.border = "1px solid var(--background-modifier-border)";
      const buttonContainer = modal.contentEl.createDiv();
      buttonContainer.style.display = "flex";
      buttonContainer.style.justifyContent = "flex-end";
      buttonContainer.style.gap = "8px";
      buttonContainer.style.marginTop = "16px";
      const cancelButton = buttonContainer.createEl("button", { text: "\u53D6\u6D88" });
      cancelButton.style.padding = "8px 16px";
      cancelButton.addEventListener("click", () => {
        modal.close();
      });
      const confirmButton = buttonContainer.createEl("button", { text: "\u786E\u8BA4" });
      confirmButton.style.padding = "8px 16px";
      confirmButton.style.backgroundColor = "var(--interactive-accent)";
      confirmButton.style.color = "var(--text-on-accent)";
      confirmButton.style.borderRadius = "4px";
      confirmButton.addEventListener("click", () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const name = nameInput.value.trim();
        if (!name) {
          new obsidian_1.Notice("\u8BF7\u8F93\u5165\u7C7B\u522B\u540D\u79F0");
          return;
        }
        const extensionsStr = extensionsInput.value.trim();
        if (!extensionsStr) {
          new obsidian_1.Notice("\u8BF7\u8F93\u5165\u6587\u4EF6\u6269\u5C55\u540D");
          return;
        }
        const extensions = extensionsStr.split(",").map((ext) => ext.trim()).filter((ext) => ext.startsWith("."));
        if (extensions.length === 0) {
          new obsidian_1.Notice("\u8BF7\u8F93\u5165\u6709\u6548\u7684\u6587\u4EF6\u6269\u5C55\u540D\uFF08\u4EE5.\u5F00\u5934\uFF09");
          return;
        }
        const folder = folderInput.value.trim();
        if (!folder) {
          new obsidian_1.Notice("\u8BF7\u8F93\u5165\u76EE\u6807\u6587\u4EF6\u5939\u8DEF\u5F84");
          return;
        }
        const id = "custom_" + Date.now();
        this.plugin.settings.fileCategories.push({
          id,
          name,
          extensions,
          folderPath: folder
        });
        yield this.plugin.saveSettings();
        this.display();
        modal.close();
      }));
      modal.open();
    })));
    if (isPluginEnabled) {
      const addCategoryButton = addCategorySetting.settingEl.querySelector("button.mod-cta");
      if (addCategoryButton) {
        addCategoryButton.disabled = true;
        addCategoryButton.style.opacity = "0.5";
      }
    }
  }
  // 添加使用Obsidian内部文件夹选择器的输入框
  addFolderSearchInput(setting, initialValue, onChange) {
    setting.addText((text) => {
      text.setValue(initialValue).setPlaceholder("./imports").onChange((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield onChange(value);
      }));
    }).addDropdown((dropdown) => tslib_1.__awaiter(this, void 0, void 0, function* () {
      const folders = [];
      const allItems = this.app.vault.getAllLoadedFiles();
      const seenFolders = /* @__PURE__ */ new Set();
      folders.push({ path: ".", name: "\u6839\u76EE\u5F55" });
      for (const item of allItems) {
        if (item instanceof obsidian_1.TFolder) {
          if (!seenFolders.has(item.path) && item.path !== ".") {
            seenFolders.add(item.path);
            folders.push({ path: item.path, name: item.path.replace(/\//g, " > ") });
          }
        } else if (item instanceof obsidian_1.TFile) {
          const folderPath = item.parent.path;
          if (!seenFolders.has(folderPath) && folderPath !== ".") {
            seenFolders.add(folderPath);
            folders.push({ path: folderPath, name: folderPath.replace(/\//g, " > ") });
          }
        }
      }
      for (const folder of folders) {
        dropdown.addOption(folder.path, folder.name);
      }
      const matchingFolder = folders.find((f) => f.path === initialValue.replace("./", ""));
      if (matchingFolder) {
        dropdown.setValue(matchingFolder.path);
      }
      dropdown.onChange((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        let formattedPath = value;
        if (formattedPath !== ".") {
          formattedPath = `./${formattedPath}`;
        }
        const textInput = setting.controlEl.querySelector('input[type="text"]');
        if (textInput) {
          textInput.value = formattedPath;
        }
        yield onChange(formattedPath);
      }));
    }));
    return setting;
  }
};
