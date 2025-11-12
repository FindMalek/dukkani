module.exports = [
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./object-utils.d.ts" />
__turbopack_context__.s([
    "asArray",
    ()=>asArray,
    "asReadonlyArray",
    ()=>asReadonlyArray,
    "compare",
    ()=>compare,
    "freeze",
    ()=>freeze,
    "getLast",
    ()=>getLast,
    "isArrayBufferOrView",
    ()=>isArrayBufferOrView,
    "isBigInt",
    ()=>isBigInt,
    "isBoolean",
    ()=>isBoolean,
    "isBuffer",
    ()=>isBuffer,
    "isDate",
    ()=>isDate,
    "isEmpty",
    ()=>isEmpty,
    "isFunction",
    ()=>isFunction,
    "isNull",
    ()=>isNull,
    "isNumber",
    ()=>isNumber,
    "isObject",
    ()=>isObject,
    "isPlainObject",
    ()=>isPlainObject,
    "isReadonlyArray",
    ()=>isReadonlyArray,
    "isString",
    ()=>isString,
    "isUndefined",
    ()=>isUndefined,
    "noop",
    ()=>noop
]);
function isEmpty(obj) {
    if (Array.isArray(obj) || isString(obj) || isBuffer(obj)) {
        return obj.length === 0;
    } else if (obj) {
        return Object.keys(obj).length === 0;
    }
    return false;
}
function isUndefined(obj) {
    return typeof obj === 'undefined' || obj === undefined;
}
function isString(obj) {
    return typeof obj === 'string';
}
function isNumber(obj) {
    return typeof obj === 'number';
}
function isBoolean(obj) {
    return typeof obj === 'boolean';
}
function isNull(obj) {
    return obj === null;
}
function isDate(obj) {
    return obj instanceof Date;
}
function isBigInt(obj) {
    return typeof obj === 'bigint';
}
function isBuffer(obj) {
    return typeof Buffer !== 'undefined' && Buffer.isBuffer(obj);
}
function isFunction(obj) {
    return typeof obj === 'function';
}
function isObject(obj) {
    return typeof obj === 'object' && obj !== null;
}
function isArrayBufferOrView(obj) {
    return obj instanceof ArrayBuffer || ArrayBuffer.isView(obj);
}
function isPlainObject(obj) {
    if (!isObject(obj) || getTag(obj) !== '[object Object]') {
        return false;
    }
    if (Object.getPrototypeOf(obj) === null) {
        return true;
    }
    let proto = obj;
    while(Object.getPrototypeOf(proto) !== null){
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(obj) === proto;
}
function getLast(arr) {
    return arr[arr.length - 1];
}
function freeze(obj) {
    return Object.freeze(obj);
}
function asArray(arg) {
    if (isReadonlyArray(arg)) {
        return arg;
    } else {
        return [
            arg
        ];
    }
}
function asReadonlyArray(arg) {
    if (isReadonlyArray(arg)) {
        return arg;
    } else {
        return freeze([
            arg
        ]);
    }
}
function isReadonlyArray(arg) {
    return Array.isArray(arg);
}
function noop(obj) {
    return obj;
}
function compare(obj1, obj2) {
    if (isReadonlyArray(obj1) && isReadonlyArray(obj2)) {
        return compareArrays(obj1, obj2);
    } else if (isObject(obj1) && isObject(obj2)) {
        return compareObjects(obj1, obj2);
    }
    return obj1 === obj2;
}
function compareArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for(let i = 0; i < arr1.length; ++i){
        if (!compare(arr1[i], arr2[i])) {
            return false;
        }
    }
    return true;
}
function compareObjects(obj1, obj2) {
    if (isBuffer(obj1) && isBuffer(obj2)) {
        return compareBuffers(obj1, obj2);
    } else if (isDate(obj1) && isDate(obj2)) {
        return compareDates(obj1, obj2);
    }
    return compareGenericObjects(obj1, obj2);
}
function compareBuffers(buf1, buf2) {
    return Buffer.compare(buf1, buf2) === 0;
}
function compareDates(date1, date2) {
    return date1.getTime() === date2.getTime();
}
function compareGenericObjects(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (const key of keys1){
        if (!compare(obj1[key], obj2[key])) {
            return false;
        }
    }
    return true;
}
const toString = Object.prototype.toString;
function getTag(value) {
    if (value == null) {
        return value === undefined ? '[object Undefined]' : '[object Null]';
    }
    return toString.call(value);
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/random-string.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./random-string.d.ts" />
__turbopack_context__.s([
    "randomString",
    ()=>randomString
]);
const CHARS = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9'
];
function randomString(length) {
    let chars = '';
    for(let i = 0; i < length; ++i){
        chars += randomChar();
    }
    return chars;
}
function randomChar() {
    return CHARS[~~(Math.random() * CHARS.length)];
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/query-id.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./query-id.d.ts" />
__turbopack_context__.s([
    "createQueryId",
    ()=>createQueryId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$random$2d$string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/random-string.js [app-route] (ecmascript)");
;
function createQueryId() {
    return new LazyQueryId();
}
class LazyQueryId {
    #queryId;
    get queryId() {
        if (this.#queryId === undefined) {
            this.#queryId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$random$2d$string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["randomString"])(8);
        }
        return this.#queryId;
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/log-once.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./log-once.d.ts" />
__turbopack_context__.s([
    "logOnce",
    ()=>logOnce
]);
const LOGGED_MESSAGES = new Set();
function logOnce(message) {
    if (LOGGED_MESSAGES.has(message)) {
        return;
    }
    LOGGED_MESSAGES.add(message);
    console.log(message);
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/require-all-props.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./require-all-props.d.ts" />
/**
 * Helper function to check listed properties according to given type. Check if all properties has been used when object is initialised.
 *
 * Example use:
 *
 * ```ts
 * type SomeType = { propA: string; propB?: number; }
 *
 * // propB has to be mentioned even it is optional. It still should be initialized with undefined.
 * const a: SomeType = requireAllProps<SomeType>({ propA: "value A", propB: undefined });
 *
 * // checked type is implicit for variable.
 * const b = requireAllProps<SomeType>({ propA: "value A", propB: undefined });
 * ```
 *
 * Wrong use of this helper:
 *
 * 1. Omit checked type - all checked properties will be expect as of type never
 *
 * ```ts
 * type SomeType = { propA: string; propB?: number; }
 * // const z: SomeType = requireAllProps({ propC: "no type will work" }); // Property 'propA' is missing in type '{ propC: string; }' but required in type 'SomeType'.
 * ```
 *
 * 2. Apply to spreaded object - there is no way how to check in compile time if spreaded object contains all properties
 *
 * ```ts
 * type SomeType = { propA: string; propB?: number; }
 * const y: SomeType = { propA: "" }; // valid object according to SomeType declaration
 * // const x = requireAllProps<SomeType>({ ...y }); // Argument of type '{ propA: string; propB?: number; }' is not assignable to parameter of type 'AllProps<SomeType>'.
 * ```
 *
 * @param obj object to check if all properties has been used
 * @returns untouched obj parameter is returned
 */ __turbopack_context__.s([
    "requireAllProps",
    ()=>requireAllProps
]);
function requireAllProps(obj) {
    return obj;
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/deferred.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./deferred.d.ts" />
__turbopack_context__.s([
    "Deferred",
    ()=>Deferred
]);
class Deferred {
    #promise;
    #resolve;
    #reject;
    constructor(){
        this.#promise = new Promise((resolve, reject)=>{
            this.#reject = reject;
            this.#resolve = resolve;
        });
    }
    get promise() {
        return this.#promise;
    }
    resolve = (value)=>{
        if (this.#resolve) {
            this.#resolve(value);
        }
    };
    reject = (reason)=>{
        if (this.#reject) {
            this.#reject(reason);
        }
    };
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/provide-controlled-connection.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./provide-controlled-connection.d.ts" />
__turbopack_context__.s([
    "provideControlledConnection",
    ()=>provideControlledConnection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$deferred$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/deferred.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
;
;
async function provideControlledConnection(connectionProvider) {
    const connectionDefer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$deferred$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Deferred"]();
    const connectionReleaseDefer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$deferred$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Deferred"]();
    connectionProvider.provideConnection(async (connection)=>{
        connectionDefer.resolve(connection);
        return await connectionReleaseDefer.promise;
    }).catch((ex)=>connectionDefer.reject(ex));
    // Create composite of the connection and the release method instead of
    // modifying the connection or creating a new nesting `DatabaseConnection`.
    // This way we don't accidentally override any methods of 3rd party
    // connections and don't return wrapped connections to drivers that
    // expect a certain specific connection class.
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])({
        connection: await connectionDefer.promise,
        release: connectionReleaseDefer.resolve
    });
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/stack-trace-utils.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./stack-trace-utils.d.ts" />
__turbopack_context__.s([
    "extendStackTrace",
    ()=>extendStackTrace
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
;
function extendStackTrace(err, stackError) {
    if (isStackHolder(err) && stackError.stack) {
        // Remove the first line that just says `Error`.
        const stackExtension = stackError.stack.split('\n').slice(1).join('\n');
        err.stack += `\n${stackExtension}`;
        return err;
    }
    return err;
}
function isStackHolder(obj) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isObject"])(obj) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isString"])(obj.stack);
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/performance-now.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./performance-now.d.ts" />
__turbopack_context__.s([
    "performanceNow",
    ()=>performanceNow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
;
function performanceNow() {
    if (typeof performance !== 'undefined' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isFunction"])(performance.now)) {
        return performance.now();
    } else {
        return Date.now();
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/log.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./log.d.ts" />
__turbopack_context__.s([
    "LOG_LEVELS",
    ()=>LOG_LEVELS,
    "Log",
    ()=>Log
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
;
const LOG_LEVELS = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])([
    'query',
    'error'
]);
class Log {
    #levels;
    #logger;
    constructor(config){
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isFunction"])(config)) {
            this.#logger = config;
            this.#levels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])({
                query: true,
                error: true
            });
        } else {
            this.#logger = defaultLogger;
            this.#levels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])({
                query: config.includes('query'),
                error: config.includes('error')
            });
        }
    }
    isLevelEnabled(level) {
        return this.#levels[level];
    }
    async query(getEvent) {
        if (this.#levels.query) {
            await this.#logger(getEvent());
        }
    }
    async error(getEvent) {
        if (this.#levels.error) {
            await this.#logger(getEvent());
        }
    }
}
function defaultLogger(event) {
    if (event.level === 'query') {
        const prefix = `kysely:query:${event.isStream ? 'stream:' : ''}`;
        console.log(`${prefix} ${event.query.sql}`);
        console.log(`${prefix} duration: ${event.queryDurationMillis.toFixed(1)}ms`);
    } else if (event.level === 'error') {
        if (event.error instanceof Error) {
            console.error(`kysely:error: ${event.error.stack ?? event.error.message}`);
        } else {
            console.error(`kysely:error: ${JSON.stringify({
                error: event.error,
                query: event.query.sql,
                queryDurationMillis: event.queryDurationMillis
            })}`);
        }
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/compilable.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./compilable.d.ts" />
__turbopack_context__.s([
    "isCompilable",
    ()=>isCompilable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
;
function isCompilable(value) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isObject"])(value) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isFunction"])(value.compile);
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-compiler/compiled-query.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./compiled-query.d.ts" />
__turbopack_context__.s([
    "CompiledQuery",
    ()=>CompiledQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$raw$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/raw-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/query-id.js [app-route] (ecmascript)");
;
;
;
const CompiledQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])({
    raw (sql, parameters = []) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])({
            sql,
            query: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$raw$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RawNode"].createWithSql(sql),
            parameters: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(parameters),
            queryId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])()
        });
    }
});
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-compiler/default-query-compiler.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./default-query-compiler.d.ts" />
__turbopack_context__.s([
    "DefaultQueryCompiler",
    ()=>DefaultQueryCompiler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/create-table-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$insert$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/insert-query-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$operation$2d$node$2d$visitor$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/operation-node-visitor.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$operator$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/operator-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$parens$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/parens-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$raw$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/raw-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$view$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/create-view-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$set$2d$operation$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/set-operation-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$when$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/when-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$log$2d$once$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/log-once.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
const LIT_WRAP_REGEX = /'/g;
class DefaultQueryCompiler extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$operation$2d$node$2d$visitor$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OperationNodeVisitor"] {
    #sql = '';
    #parameters = [];
    get numParameters() {
        return this.#parameters.length;
    }
    compileQuery(node, queryId) {
        this.#sql = '';
        this.#parameters = [];
        this.nodeStack.splice(0, this.nodeStack.length);
        this.visitNode(node);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])({
            query: node,
            queryId,
            sql: this.getSql(),
            parameters: [
                ...this.#parameters
            ]
        });
    }
    getSql() {
        return this.#sql;
    }
    visitSelectQuery(node) {
        const wrapInParens = this.parentNode !== undefined && !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$parens$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ParensNode"].is(this.parentNode) && !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$insert$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InsertQueryNode"].is(this.parentNode) && !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateTableNode"].is(this.parentNode) && !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$view$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateViewNode"].is(this.parentNode) && !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$set$2d$operation$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SetOperationNode"].is(this.parentNode);
        if (this.parentNode === undefined && node.explain) {
            this.visitNode(node.explain);
            this.append(' ');
        }
        if (wrapInParens) {
            this.append('(');
        }
        if (node.with) {
            this.visitNode(node.with);
            this.append(' ');
        }
        this.append('select');
        if (node.distinctOn) {
            this.append(' ');
            this.compileDistinctOn(node.distinctOn);
        }
        if (node.frontModifiers?.length) {
            this.append(' ');
            this.compileList(node.frontModifiers, ' ');
        }
        if (node.top) {
            this.append(' ');
            this.visitNode(node.top);
        }
        if (node.selections) {
            this.append(' ');
            this.compileList(node.selections);
        }
        if (node.from) {
            this.append(' ');
            this.visitNode(node.from);
        }
        if (node.joins) {
            this.append(' ');
            this.compileList(node.joins, ' ');
        }
        if (node.where) {
            this.append(' ');
            this.visitNode(node.where);
        }
        if (node.groupBy) {
            this.append(' ');
            this.visitNode(node.groupBy);
        }
        if (node.having) {
            this.append(' ');
            this.visitNode(node.having);
        }
        if (node.setOperations) {
            this.append(' ');
            this.compileList(node.setOperations, ' ');
        }
        if (node.orderBy) {
            this.append(' ');
            this.visitNode(node.orderBy);
        }
        if (node.limit) {
            this.append(' ');
            this.visitNode(node.limit);
        }
        if (node.offset) {
            this.append(' ');
            this.visitNode(node.offset);
        }
        if (node.fetch) {
            this.append(' ');
            this.visitNode(node.fetch);
        }
        if (node.endModifiers?.length) {
            this.append(' ');
            this.compileList(this.sortSelectModifiers([
                ...node.endModifiers
            ]), ' ');
        }
        if (wrapInParens) {
            this.append(')');
        }
    }
    visitFrom(node) {
        this.append('from ');
        this.compileList(node.froms);
    }
    visitSelection(node) {
        this.visitNode(node.selection);
    }
    visitColumn(node) {
        this.visitNode(node.column);
    }
    compileDistinctOn(expressions) {
        this.append('distinct on (');
        this.compileList(expressions);
        this.append(')');
    }
    compileList(nodes, separator = ', ') {
        const lastIndex = nodes.length - 1;
        for(let i = 0; i <= lastIndex; i++){
            this.visitNode(nodes[i]);
            if (i < lastIndex) {
                this.append(separator);
            }
        }
    }
    visitWhere(node) {
        this.append('where ');
        this.visitNode(node.where);
    }
    visitHaving(node) {
        this.append('having ');
        this.visitNode(node.having);
    }
    visitInsertQuery(node) {
        const wrapInParens = this.parentNode !== undefined && !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$parens$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ParensNode"].is(this.parentNode) && !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$raw$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RawNode"].is(this.parentNode) && !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$when$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WhenNode"].is(this.parentNode);
        if (this.parentNode === undefined && node.explain) {
            this.visitNode(node.explain);
            this.append(' ');
        }
        if (wrapInParens) {
            this.append('(');
        }
        if (node.with) {
            this.visitNode(node.with);
            this.append(' ');
        }
        this.append(node.replace ? 'replace' : 'insert');
        // TODO: remove in 0.29.
        if (node.ignore) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$log$2d$once$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logOnce"])('`InsertQueryNode.ignore` is deprecated. Use `InsertQueryNode.orAction` instead.');
            this.append(' ignore');
        }
        if (node.orAction) {
            this.append(' ');
            this.visitNode(node.orAction);
        }
        if (node.top) {
            this.append(' ');
            this.visitNode(node.top);
        }
        if (node.into) {
            this.append(' into ');
            this.visitNode(node.into);
        }
        if (node.columns) {
            this.append(' (');
            this.compileList(node.columns);
            this.append(')');
        }
        if (node.output) {
            this.append(' ');
            this.visitNode(node.output);
        }
        if (node.values) {
            this.append(' ');
            this.visitNode(node.values);
        }
        if (node.defaultValues) {
            this.append(' ');
            this.append('default values');
        }
        if (node.onConflict) {
            this.append(' ');
            this.visitNode(node.onConflict);
        }
        if (node.onDuplicateKey) {
            this.append(' ');
            this.visitNode(node.onDuplicateKey);
        }
        if (node.returning) {
            this.append(' ');
            this.visitNode(node.returning);
        }
        if (wrapInParens) {
            this.append(')');
        }
        if (node.endModifiers?.length) {
            this.append(' ');
            this.compileList(node.endModifiers, ' ');
        }
    }
    visitValues(node) {
        this.append('values ');
        this.compileList(node.values);
    }
    visitDeleteQuery(node) {
        const wrapInParens = this.parentNode !== undefined && !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$parens$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ParensNode"].is(this.parentNode) && !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$raw$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RawNode"].is(this.parentNode);
        if (this.parentNode === undefined && node.explain) {
            this.visitNode(node.explain);
            this.append(' ');
        }
        if (wrapInParens) {
            this.append('(');
        }
        if (node.with) {
            this.visitNode(node.with);
            this.append(' ');
        }
        this.append('delete ');
        if (node.top) {
            this.visitNode(node.top);
            this.append(' ');
        }
        this.visitNode(node.from);
        if (node.output) {
            this.append(' ');
            this.visitNode(node.output);
        }
        if (node.using) {
            this.append(' ');
            this.visitNode(node.using);
        }
        if (node.joins) {
            this.append(' ');
            this.compileList(node.joins, ' ');
        }
        if (node.where) {
            this.append(' ');
            this.visitNode(node.where);
        }
        if (node.orderBy) {
            this.append(' ');
            this.visitNode(node.orderBy);
        }
        if (node.limit) {
            this.append(' ');
            this.visitNode(node.limit);
        }
        if (node.returning) {
            this.append(' ');
            this.visitNode(node.returning);
        }
        if (wrapInParens) {
            this.append(')');
        }
        if (node.endModifiers?.length) {
            this.append(' ');
            this.compileList(node.endModifiers, ' ');
        }
    }
    visitReturning(node) {
        this.append('returning ');
        this.compileList(node.selections);
    }
    visitAlias(node) {
        this.visitNode(node.node);
        this.append(' as ');
        this.visitNode(node.alias);
    }
    visitReference(node) {
        if (node.table) {
            this.visitNode(node.table);
            this.append('.');
        }
        this.visitNode(node.column);
    }
    visitSelectAll(_) {
        this.append('*');
    }
    visitIdentifier(node) {
        this.append(this.getLeftIdentifierWrapper());
        this.compileUnwrappedIdentifier(node);
        this.append(this.getRightIdentifierWrapper());
    }
    compileUnwrappedIdentifier(node) {
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isString"])(node.name)) {
            throw new Error('a non-string identifier was passed to compileUnwrappedIdentifier.');
        }
        this.append(this.sanitizeIdentifier(node.name));
    }
    visitAnd(node) {
        this.visitNode(node.left);
        this.append(' and ');
        this.visitNode(node.right);
    }
    visitOr(node) {
        this.visitNode(node.left);
        this.append(' or ');
        this.visitNode(node.right);
    }
    visitValue(node) {
        if (node.immediate) {
            this.appendImmediateValue(node.value);
        } else {
            this.appendValue(node.value);
        }
    }
    visitValueList(node) {
        this.append('(');
        this.compileList(node.values);
        this.append(')');
    }
    visitTuple(node) {
        this.append('(');
        this.compileList(node.values);
        this.append(')');
    }
    visitPrimitiveValueList(node) {
        this.append('(');
        const { values } = node;
        for(let i = 0; i < values.length; ++i){
            this.appendValue(values[i]);
            if (i !== values.length - 1) {
                this.append(', ');
            }
        }
        this.append(')');
    }
    visitParens(node) {
        this.append('(');
        this.visitNode(node.node);
        this.append(')');
    }
    visitJoin(node) {
        this.append(JOIN_TYPE_SQL[node.joinType]);
        this.append(' ');
        this.visitNode(node.table);
        if (node.on) {
            this.append(' ');
            this.visitNode(node.on);
        }
    }
    visitOn(node) {
        this.append('on ');
        this.visitNode(node.on);
    }
    visitRaw(node) {
        const { sqlFragments, parameters: params } = node;
        for(let i = 0; i < sqlFragments.length; ++i){
            this.append(sqlFragments[i]);
            if (params.length > i) {
                this.visitNode(params[i]);
            }
        }
    }
    visitOperator(node) {
        this.append(node.operator);
    }
    visitTable(node) {
        this.visitNode(node.table);
    }
    visitSchemableIdentifier(node) {
        if (node.schema) {
            this.visitNode(node.schema);
            this.append('.');
        }
        this.visitNode(node.identifier);
    }
    visitCreateTable(node) {
        this.append('create ');
        if (node.frontModifiers && node.frontModifiers.length > 0) {
            this.compileList(node.frontModifiers, ' ');
            this.append(' ');
        }
        if (node.temporary) {
            this.append('temporary ');
        }
        this.append('table ');
        if (node.ifNotExists) {
            this.append('if not exists ');
        }
        this.visitNode(node.table);
        if (node.selectQuery) {
            this.append(' as ');
            this.visitNode(node.selectQuery);
        } else {
            this.append(' (');
            this.compileList([
                ...node.columns,
                ...node.constraints ?? []
            ]);
            this.append(')');
            if (node.onCommit) {
                this.append(' on commit ');
                this.append(node.onCommit);
            }
            if (node.endModifiers && node.endModifiers.length > 0) {
                this.append(' ');
                this.compileList(node.endModifiers, ' ');
            }
        }
    }
    visitColumnDefinition(node) {
        if (node.ifNotExists) {
            this.append('if not exists ');
        }
        this.visitNode(node.column);
        this.append(' ');
        this.visitNode(node.dataType);
        if (node.unsigned) {
            this.append(' unsigned');
        }
        if (node.frontModifiers && node.frontModifiers.length > 0) {
            this.append(' ');
            this.compileList(node.frontModifiers, ' ');
        }
        if (node.generated) {
            this.append(' ');
            this.visitNode(node.generated);
        }
        if (node.identity) {
            this.append(' identity');
        }
        if (node.defaultTo) {
            this.append(' ');
            this.visitNode(node.defaultTo);
        }
        if (node.notNull) {
            this.append(' not null');
        }
        if (node.unique) {
            this.append(' unique');
        }
        if (node.nullsNotDistinct) {
            this.append(' nulls not distinct');
        }
        if (node.primaryKey) {
            this.append(' primary key');
        }
        if (node.autoIncrement) {
            this.append(' ');
            this.append(this.getAutoIncrement());
        }
        if (node.references) {
            this.append(' ');
            this.visitNode(node.references);
        }
        if (node.check) {
            this.append(' ');
            this.visitNode(node.check);
        }
        if (node.endModifiers && node.endModifiers.length > 0) {
            this.append(' ');
            this.compileList(node.endModifiers, ' ');
        }
    }
    getAutoIncrement() {
        return 'auto_increment';
    }
    visitReferences(node) {
        this.append('references ');
        this.visitNode(node.table);
        this.append(' (');
        this.compileList(node.columns);
        this.append(')');
        if (node.onDelete) {
            this.append(' on delete ');
            this.append(node.onDelete);
        }
        if (node.onUpdate) {
            this.append(' on update ');
            this.append(node.onUpdate);
        }
    }
    visitDropTable(node) {
        this.append('drop table ');
        if (node.ifExists) {
            this.append('if exists ');
        }
        this.visitNode(node.table);
        if (node.cascade) {
            this.append(' cascade');
        }
    }
    visitDataType(node) {
        this.append(node.dataType);
    }
    visitOrderBy(node) {
        this.append('order by ');
        this.compileList(node.items);
    }
    visitOrderByItem(node) {
        this.visitNode(node.orderBy);
        if (node.collation) {
            this.append(' ');
            this.visitNode(node.collation);
        }
        if (node.direction) {
            this.append(' ');
            this.visitNode(node.direction);
        }
        if (node.nulls) {
            this.append(' nulls ');
            this.append(node.nulls);
        }
    }
    visitGroupBy(node) {
        this.append('group by ');
        this.compileList(node.items);
    }
    visitGroupByItem(node) {
        this.visitNode(node.groupBy);
    }
    visitUpdateQuery(node) {
        const wrapInParens = this.parentNode !== undefined && !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$parens$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ParensNode"].is(this.parentNode) && !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$raw$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RawNode"].is(this.parentNode) && !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$when$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WhenNode"].is(this.parentNode);
        if (this.parentNode === undefined && node.explain) {
            this.visitNode(node.explain);
            this.append(' ');
        }
        if (wrapInParens) {
            this.append('(');
        }
        if (node.with) {
            this.visitNode(node.with);
            this.append(' ');
        }
        this.append('update ');
        if (node.top) {
            this.visitNode(node.top);
            this.append(' ');
        }
        if (node.table) {
            this.visitNode(node.table);
            this.append(' ');
        }
        this.append('set ');
        if (node.updates) {
            this.compileList(node.updates);
        }
        if (node.output) {
            this.append(' ');
            this.visitNode(node.output);
        }
        if (node.from) {
            this.append(' ');
            this.visitNode(node.from);
        }
        if (node.joins) {
            if (!node.from) {
                throw new Error("Joins in an update query are only supported as a part of a PostgreSQL 'update set from join' query. If you want to create a MySQL 'update join set' query, see https://kysely.dev/docs/examples/update/my-sql-joins");
            }
            this.append(' ');
            this.compileList(node.joins, ' ');
        }
        if (node.where) {
            this.append(' ');
            this.visitNode(node.where);
        }
        if (node.orderBy) {
            this.append(' ');
            this.visitNode(node.orderBy);
        }
        if (node.limit) {
            this.append(' ');
            this.visitNode(node.limit);
        }
        if (node.returning) {
            this.append(' ');
            this.visitNode(node.returning);
        }
        if (wrapInParens) {
            this.append(')');
        }
        if (node.endModifiers?.length) {
            this.append(' ');
            this.compileList(node.endModifiers, ' ');
        }
    }
    visitColumnUpdate(node) {
        this.visitNode(node.column);
        this.append(' = ');
        this.visitNode(node.value);
    }
    visitLimit(node) {
        this.append('limit ');
        this.visitNode(node.limit);
    }
    visitOffset(node) {
        this.append('offset ');
        this.visitNode(node.offset);
    }
    visitOnConflict(node) {
        this.append('on conflict');
        if (node.columns) {
            this.append(' (');
            this.compileList(node.columns);
            this.append(')');
        } else if (node.constraint) {
            this.append(' on constraint ');
            this.visitNode(node.constraint);
        } else if (node.indexExpression) {
            this.append(' (');
            this.visitNode(node.indexExpression);
            this.append(')');
        }
        if (node.indexWhere) {
            this.append(' ');
            this.visitNode(node.indexWhere);
        }
        if (node.doNothing === true) {
            this.append(' do nothing');
        } else if (node.updates) {
            this.append(' do update set ');
            this.compileList(node.updates);
            if (node.updateWhere) {
                this.append(' ');
                this.visitNode(node.updateWhere);
            }
        }
    }
    visitOnDuplicateKey(node) {
        this.append('on duplicate key update ');
        this.compileList(node.updates);
    }
    visitCreateIndex(node) {
        this.append('create ');
        if (node.unique) {
            this.append('unique ');
        }
        this.append('index ');
        if (node.ifNotExists) {
            this.append('if not exists ');
        }
        this.visitNode(node.name);
        if (node.table) {
            this.append(' on ');
            this.visitNode(node.table);
        }
        if (node.using) {
            this.append(' using ');
            this.visitNode(node.using);
        }
        if (node.columns) {
            this.append(' (');
            this.compileList(node.columns);
            this.append(')');
        }
        if (node.nullsNotDistinct) {
            this.append(' nulls not distinct');
        }
        if (node.where) {
            this.append(' ');
            this.visitNode(node.where);
        }
    }
    visitDropIndex(node) {
        this.append('drop index ');
        if (node.ifExists) {
            this.append('if exists ');
        }
        this.visitNode(node.name);
        if (node.table) {
            this.append(' on ');
            this.visitNode(node.table);
        }
        if (node.cascade) {
            this.append(' cascade');
        }
    }
    visitCreateSchema(node) {
        this.append('create schema ');
        if (node.ifNotExists) {
            this.append('if not exists ');
        }
        this.visitNode(node.schema);
    }
    visitDropSchema(node) {
        this.append('drop schema ');
        if (node.ifExists) {
            this.append('if exists ');
        }
        this.visitNode(node.schema);
        if (node.cascade) {
            this.append(' cascade');
        }
    }
    visitPrimaryKeyConstraint(node) {
        if (node.name) {
            this.append('constraint ');
            this.visitNode(node.name);
            this.append(' ');
        }
        this.append('primary key (');
        this.compileList(node.columns);
        this.append(')');
        this.buildDeferrable(node);
    }
    buildDeferrable(node) {
        if (node.deferrable !== undefined) {
            if (node.deferrable) {
                this.append(' deferrable');
            } else {
                this.append(' not deferrable');
            }
        }
        if (node.initiallyDeferred !== undefined) {
            if (node.initiallyDeferred) {
                this.append(' initially deferred');
            } else {
                this.append(' initially immediate');
            }
        }
    }
    visitUniqueConstraint(node) {
        if (node.name) {
            this.append('constraint ');
            this.visitNode(node.name);
            this.append(' ');
        }
        this.append('unique');
        if (node.nullsNotDistinct) {
            this.append(' nulls not distinct');
        }
        this.append(' (');
        this.compileList(node.columns);
        this.append(')');
        this.buildDeferrable(node);
    }
    visitCheckConstraint(node) {
        if (node.name) {
            this.append('constraint ');
            this.visitNode(node.name);
            this.append(' ');
        }
        this.append('check (');
        this.visitNode(node.expression);
        this.append(')');
    }
    visitForeignKeyConstraint(node) {
        if (node.name) {
            this.append('constraint ');
            this.visitNode(node.name);
            this.append(' ');
        }
        this.append('foreign key (');
        this.compileList(node.columns);
        this.append(') ');
        this.visitNode(node.references);
        if (node.onDelete) {
            this.append(' on delete ');
            this.append(node.onDelete);
        }
        if (node.onUpdate) {
            this.append(' on update ');
            this.append(node.onUpdate);
        }
        this.buildDeferrable(node);
    }
    visitList(node) {
        this.compileList(node.items);
    }
    visitWith(node) {
        this.append('with ');
        if (node.recursive) {
            this.append('recursive ');
        }
        this.compileList(node.expressions);
    }
    visitCommonTableExpression(node) {
        this.visitNode(node.name);
        this.append(' as ');
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isBoolean"])(node.materialized)) {
            if (!node.materialized) {
                this.append('not ');
            }
            this.append('materialized ');
        }
        this.visitNode(node.expression);
    }
    visitCommonTableExpressionName(node) {
        this.visitNode(node.table);
        if (node.columns) {
            this.append('(');
            this.compileList(node.columns);
            this.append(')');
        }
    }
    visitAlterTable(node) {
        this.append('alter table ');
        this.visitNode(node.table);
        this.append(' ');
        if (node.renameTo) {
            this.append('rename to ');
            this.visitNode(node.renameTo);
        }
        if (node.setSchema) {
            this.append('set schema ');
            this.visitNode(node.setSchema);
        }
        if (node.addConstraint) {
            this.visitNode(node.addConstraint);
        }
        if (node.dropConstraint) {
            this.visitNode(node.dropConstraint);
        }
        if (node.renameConstraint) {
            this.visitNode(node.renameConstraint);
        }
        if (node.columnAlterations) {
            this.compileColumnAlterations(node.columnAlterations);
        }
        if (node.addIndex) {
            this.visitNode(node.addIndex);
        }
        if (node.dropIndex) {
            this.visitNode(node.dropIndex);
        }
    }
    visitAddColumn(node) {
        this.append('add column ');
        this.visitNode(node.column);
    }
    visitRenameColumn(node) {
        this.append('rename column ');
        this.visitNode(node.column);
        this.append(' to ');
        this.visitNode(node.renameTo);
    }
    visitDropColumn(node) {
        this.append('drop column ');
        this.visitNode(node.column);
    }
    visitAlterColumn(node) {
        this.append('alter column ');
        this.visitNode(node.column);
        this.append(' ');
        if (node.dataType) {
            if (this.announcesNewColumnDataType()) {
                this.append('type ');
            }
            this.visitNode(node.dataType);
            if (node.dataTypeExpression) {
                this.append('using ');
                this.visitNode(node.dataTypeExpression);
            }
        }
        if (node.setDefault) {
            this.append('set default ');
            this.visitNode(node.setDefault);
        }
        if (node.dropDefault) {
            this.append('drop default');
        }
        if (node.setNotNull) {
            this.append('set not null');
        }
        if (node.dropNotNull) {
            this.append('drop not null');
        }
    }
    visitModifyColumn(node) {
        this.append('modify column ');
        this.visitNode(node.column);
    }
    visitAddConstraint(node) {
        this.append('add ');
        this.visitNode(node.constraint);
    }
    visitDropConstraint(node) {
        this.append('drop constraint ');
        if (node.ifExists) {
            this.append('if exists ');
        }
        this.visitNode(node.constraintName);
        if (node.modifier === 'cascade') {
            this.append(' cascade');
        } else if (node.modifier === 'restrict') {
            this.append(' restrict');
        }
    }
    visitRenameConstraint(node) {
        this.append('rename constraint ');
        this.visitNode(node.oldName);
        this.append(' to ');
        this.visitNode(node.newName);
    }
    visitSetOperation(node) {
        this.append(node.operator);
        this.append(' ');
        if (node.all) {
            this.append('all ');
        }
        this.visitNode(node.expression);
    }
    visitCreateView(node) {
        this.append('create ');
        if (node.orReplace) {
            this.append('or replace ');
        }
        if (node.materialized) {
            this.append('materialized ');
        }
        if (node.temporary) {
            this.append('temporary ');
        }
        this.append('view ');
        if (node.ifNotExists) {
            this.append('if not exists ');
        }
        this.visitNode(node.name);
        this.append(' ');
        if (node.columns) {
            this.append('(');
            this.compileList(node.columns);
            this.append(') ');
        }
        if (node.as) {
            this.append('as ');
            this.visitNode(node.as);
        }
    }
    visitRefreshMaterializedView(node) {
        this.append('refresh materialized view ');
        if (node.concurrently) {
            this.append('concurrently ');
        }
        this.visitNode(node.name);
        if (node.withNoData) {
            this.append(' with no data');
        } else {
            this.append(' with data');
        }
    }
    visitDropView(node) {
        this.append('drop ');
        if (node.materialized) {
            this.append('materialized ');
        }
        this.append('view ');
        if (node.ifExists) {
            this.append('if exists ');
        }
        this.visitNode(node.name);
        if (node.cascade) {
            this.append(' cascade');
        }
    }
    visitGenerated(node) {
        this.append('generated ');
        if (node.always) {
            this.append('always ');
        }
        if (node.byDefault) {
            this.append('by default ');
        }
        this.append('as ');
        if (node.identity) {
            this.append('identity');
        }
        if (node.expression) {
            this.append('(');
            this.visitNode(node.expression);
            this.append(')');
        }
        if (node.stored) {
            this.append(' stored');
        }
    }
    visitDefaultValue(node) {
        this.append('default ');
        this.visitNode(node.defaultValue);
    }
    visitSelectModifier(node) {
        if (node.rawModifier) {
            this.visitNode(node.rawModifier);
        } else {
            this.append(SELECT_MODIFIER_SQL[node.modifier]);
        }
        if (node.of) {
            this.append(' of ');
            this.compileList(node.of, ', ');
        }
    }
    visitCreateType(node) {
        this.append('create type ');
        this.visitNode(node.name);
        if (node.enum) {
            this.append(' as enum ');
            this.visitNode(node.enum);
        }
    }
    visitDropType(node) {
        this.append('drop type ');
        if (node.ifExists) {
            this.append('if exists ');
        }
        this.visitNode(node.name);
    }
    visitExplain(node) {
        this.append('explain');
        if (node.options || node.format) {
            this.append(' ');
            this.append(this.getLeftExplainOptionsWrapper());
            if (node.options) {
                this.visitNode(node.options);
                if (node.format) {
                    this.append(this.getExplainOptionsDelimiter());
                }
            }
            if (node.format) {
                this.append('format');
                this.append(this.getExplainOptionAssignment());
                this.append(node.format);
            }
            this.append(this.getRightExplainOptionsWrapper());
        }
    }
    visitDefaultInsertValue(_) {
        this.append('default');
    }
    visitAggregateFunction(node) {
        this.append(node.func);
        this.append('(');
        if (node.distinct) {
            this.append('distinct ');
        }
        this.compileList(node.aggregated);
        if (node.orderBy) {
            this.append(' ');
            this.visitNode(node.orderBy);
        }
        this.append(')');
        if (node.withinGroup) {
            this.append(' within group (');
            this.visitNode(node.withinGroup);
            this.append(')');
        }
        if (node.filter) {
            this.append(' filter(');
            this.visitNode(node.filter);
            this.append(')');
        }
        if (node.over) {
            this.append(' ');
            this.visitNode(node.over);
        }
    }
    visitOver(node) {
        this.append('over(');
        if (node.partitionBy) {
            this.visitNode(node.partitionBy);
            if (node.orderBy) {
                this.append(' ');
            }
        }
        if (node.orderBy) {
            this.visitNode(node.orderBy);
        }
        this.append(')');
    }
    visitPartitionBy(node) {
        this.append('partition by ');
        this.compileList(node.items);
    }
    visitPartitionByItem(node) {
        this.visitNode(node.partitionBy);
    }
    visitBinaryOperation(node) {
        this.visitNode(node.leftOperand);
        this.append(' ');
        this.visitNode(node.operator);
        this.append(' ');
        this.visitNode(node.rightOperand);
    }
    visitUnaryOperation(node) {
        this.visitNode(node.operator);
        if (!this.isMinusOperator(node.operator)) {
            this.append(' ');
        }
        this.visitNode(node.operand);
    }
    isMinusOperator(node) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$operator$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OperatorNode"].is(node) && node.operator === '-';
    }
    visitUsing(node) {
        this.append('using ');
        this.compileList(node.tables);
    }
    visitFunction(node) {
        this.append(node.func);
        this.append('(');
        this.compileList(node.arguments);
        this.append(')');
    }
    visitCase(node) {
        this.append('case');
        if (node.value) {
            this.append(' ');
            this.visitNode(node.value);
        }
        if (node.when) {
            this.append(' ');
            this.compileList(node.when, ' ');
        }
        if (node.else) {
            this.append(' else ');
            this.visitNode(node.else);
        }
        this.append(' end');
        if (node.isStatement) {
            this.append(' case');
        }
    }
    visitWhen(node) {
        this.append('when ');
        this.visitNode(node.condition);
        if (node.result) {
            this.append(' then ');
            this.visitNode(node.result);
        }
    }
    visitJSONReference(node) {
        this.visitNode(node.reference);
        this.visitNode(node.traversal);
    }
    visitJSONPath(node) {
        if (node.inOperator) {
            this.visitNode(node.inOperator);
        }
        this.append("'$");
        for (const pathLeg of node.pathLegs){
            this.visitNode(pathLeg);
        }
        this.append("'");
    }
    visitJSONPathLeg(node) {
        const isArrayLocation = node.type === 'ArrayLocation';
        this.append(isArrayLocation ? '[' : '.');
        this.append(String(node.value));
        if (isArrayLocation) {
            this.append(']');
        }
    }
    visitJSONOperatorChain(node) {
        for(let i = 0, len = node.values.length; i < len; i++){
            if (i === len - 1) {
                this.visitNode(node.operator);
            } else {
                this.append('->');
            }
            this.visitNode(node.values[i]);
        }
    }
    visitMergeQuery(node) {
        if (node.with) {
            this.visitNode(node.with);
            this.append(' ');
        }
        this.append('merge ');
        if (node.top) {
            this.visitNode(node.top);
            this.append(' ');
        }
        this.append('into ');
        this.visitNode(node.into);
        if (node.using) {
            this.append(' ');
            this.visitNode(node.using);
        }
        if (node.whens) {
            this.append(' ');
            this.compileList(node.whens, ' ');
        }
        if (node.returning) {
            this.append(' ');
            this.visitNode(node.returning);
        }
        if (node.output) {
            this.append(' ');
            this.visitNode(node.output);
        }
        if (node.endModifiers?.length) {
            this.append(' ');
            this.compileList(node.endModifiers, ' ');
        }
    }
    visitMatched(node) {
        if (node.not) {
            this.append('not ');
        }
        this.append('matched');
        if (node.bySource) {
            this.append(' by source');
        }
    }
    visitAddIndex(node) {
        this.append('add ');
        if (node.unique) {
            this.append('unique ');
        }
        this.append('index ');
        this.visitNode(node.name);
        if (node.columns) {
            this.append(' (');
            this.compileList(node.columns);
            this.append(')');
        }
        if (node.using) {
            this.append(' using ');
            this.visitNode(node.using);
        }
    }
    visitCast(node) {
        this.append('cast(');
        this.visitNode(node.expression);
        this.append(' as ');
        this.visitNode(node.dataType);
        this.append(')');
    }
    visitFetch(node) {
        this.append('fetch next ');
        this.visitNode(node.rowCount);
        this.append(` rows ${node.modifier}`);
    }
    visitOutput(node) {
        this.append('output ');
        this.compileList(node.selections);
    }
    visitTop(node) {
        this.append(`top(${node.expression})`);
        if (node.modifiers) {
            this.append(` ${node.modifiers}`);
        }
    }
    visitOrAction(node) {
        this.append(node.action);
    }
    visitCollate(node) {
        this.append('collate ');
        this.visitNode(node.collation);
    }
    append(str) {
        this.#sql += str;
    }
    appendValue(parameter) {
        this.addParameter(parameter);
        this.append(this.getCurrentParameterPlaceholder());
    }
    getLeftIdentifierWrapper() {
        return '"';
    }
    getRightIdentifierWrapper() {
        return '"';
    }
    getCurrentParameterPlaceholder() {
        return '$' + this.numParameters;
    }
    getLeftExplainOptionsWrapper() {
        return '(';
    }
    getExplainOptionAssignment() {
        return ' ';
    }
    getExplainOptionsDelimiter() {
        return ', ';
    }
    getRightExplainOptionsWrapper() {
        return ')';
    }
    sanitizeIdentifier(identifier) {
        const leftWrap = this.getLeftIdentifierWrapper();
        const rightWrap = this.getRightIdentifierWrapper();
        let sanitized = '';
        for (const c of identifier){
            sanitized += c;
            if (c === leftWrap) {
                sanitized += leftWrap;
            } else if (c === rightWrap) {
                sanitized += rightWrap;
            }
        }
        return sanitized;
    }
    sanitizeStringLiteral(value) {
        return value.replace(LIT_WRAP_REGEX, "''");
    }
    addParameter(parameter) {
        this.#parameters.push(parameter);
    }
    appendImmediateValue(value) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isString"])(value)) {
            this.appendStringLiteral(value);
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isNumber"])(value) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isBoolean"])(value) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isBigInt"])(value)) {
            this.append(value.toString());
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isNull"])(value)) {
            this.append('null');
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDate"])(value)) {
            this.appendImmediateValue(value.toISOString());
        } else {
            throw new Error(`invalid immediate value ${value}`);
        }
    }
    appendStringLiteral(value) {
        this.append("'");
        this.append(this.sanitizeStringLiteral(value));
        this.append("'");
    }
    sortSelectModifiers(arr) {
        arr.sort((left, right)=>left.modifier && right.modifier ? SELECT_MODIFIER_PRIORITY[left.modifier] - SELECT_MODIFIER_PRIORITY[right.modifier] : 1);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(arr);
    }
    compileColumnAlterations(columnAlterations) {
        this.compileList(columnAlterations);
    }
    /**
     * controls whether the dialect adds a "type" keyword before a column's new data
     * type in an ALTER TABLE statement.
     */ announcesNewColumnDataType() {
        return true;
    }
}
const SELECT_MODIFIER_SQL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])({
    ForKeyShare: 'for key share',
    ForNoKeyUpdate: 'for no key update',
    ForUpdate: 'for update',
    ForShare: 'for share',
    NoWait: 'nowait',
    SkipLocked: 'skip locked',
    Distinct: 'distinct'
});
const SELECT_MODIFIER_PRIORITY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])({
    ForKeyShare: 1,
    ForNoKeyUpdate: 1,
    ForUpdate: 1,
    ForShare: 1,
    NoWait: 2,
    SkipLocked: 2,
    Distinct: 0
});
const JOIN_TYPE_SQL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])({
    InnerJoin: 'inner join',
    LeftJoin: 'left join',
    RightJoin: 'right join',
    FullJoin: 'full join',
    CrossJoin: 'cross join',
    LateralInnerJoin: 'inner join lateral',
    LateralLeftJoin: 'left join lateral',
    LateralCrossJoin: 'cross join lateral',
    OuterApply: 'outer apply',
    CrossApply: 'cross apply',
    Using: 'using'
});
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/sqlite/sqlite-driver.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./sqlite-driver.d.ts" />
__turbopack_context__.s([
    "SqliteDriver",
    ()=>SqliteDriver
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/select-query-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$savepoint$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/savepoint-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$compiler$2f$compiled$2d$query$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-compiler/compiled-query.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/query-id.js [app-route] (ecmascript)");
;
;
;
;
;
class SqliteDriver {
    #config;
    #connectionMutex = new ConnectionMutex();
    #db;
    #connection;
    constructor(config){
        this.#config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])({
            ...config
        });
    }
    async init() {
        this.#db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isFunction"])(this.#config.database) ? await this.#config.database() : this.#config.database;
        this.#connection = new SqliteConnection(this.#db);
        if (this.#config.onCreateConnection) {
            await this.#config.onCreateConnection(this.#connection);
        }
    }
    async acquireConnection() {
        // SQLite only has one single connection. We use a mutex here to wait
        // until the single connection has been released.
        await this.#connectionMutex.lock();
        return this.#connection;
    }
    async beginTransaction(connection) {
        await connection.executeQuery(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$compiler$2f$compiled$2d$query$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CompiledQuery"].raw('begin'));
    }
    async commitTransaction(connection) {
        await connection.executeQuery(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$compiler$2f$compiled$2d$query$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CompiledQuery"].raw('commit'));
    }
    async rollbackTransaction(connection) {
        await connection.executeQuery(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$compiler$2f$compiled$2d$query$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CompiledQuery"].raw('rollback'));
    }
    async savepoint(connection, savepointName, compileQuery) {
        await connection.executeQuery(compileQuery((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$savepoint$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSavepointCommand"])('savepoint', savepointName), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])()));
    }
    async rollbackToSavepoint(connection, savepointName, compileQuery) {
        await connection.executeQuery(compileQuery((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$savepoint$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSavepointCommand"])('rollback to', savepointName), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])()));
    }
    async releaseSavepoint(connection, savepointName, compileQuery) {
        await connection.executeQuery(compileQuery((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$savepoint$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSavepointCommand"])('release', savepointName), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])()));
    }
    async releaseConnection() {
        this.#connectionMutex.unlock();
    }
    async destroy() {
        this.#db?.close();
    }
}
class SqliteConnection {
    #db;
    constructor(db){
        this.#db = db;
    }
    executeQuery(compiledQuery) {
        const { sql, parameters } = compiledQuery;
        const stmt = this.#db.prepare(sql);
        if (stmt.reader) {
            return Promise.resolve({
                rows: stmt.all(parameters)
            });
        }
        const { changes, lastInsertRowid } = stmt.run(parameters);
        return Promise.resolve({
            numAffectedRows: changes !== undefined && changes !== null ? BigInt(changes) : undefined,
            insertId: lastInsertRowid !== undefined && lastInsertRowid !== null ? BigInt(lastInsertRowid) : undefined,
            rows: []
        });
    }
    async *streamQuery(compiledQuery, _chunkSize) {
        const { sql, parameters, query } = compiledQuery;
        const stmt = this.#db.prepare(sql);
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectQueryNode"].is(query)) {
            const iter = stmt.iterate(parameters);
            for (const row of iter){
                yield {
                    rows: [
                        row
                    ]
                };
            }
        } else {
            throw new Error('Sqlite driver only supports streaming of select queries');
        }
    }
}
class ConnectionMutex {
    #promise;
    #resolve;
    async lock() {
        while(this.#promise){
            await this.#promise;
        }
        this.#promise = new Promise((resolve)=>{
            this.#resolve = resolve;
        });
    }
    unlock() {
        const resolve = this.#resolve;
        this.#promise = undefined;
        this.#resolve = undefined;
        resolve?.();
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/sqlite/sqlite-query-compiler.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./sqlite-query-compiler.d.ts" />
__turbopack_context__.s([
    "SqliteQueryCompiler",
    ()=>SqliteQueryCompiler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$compiler$2f$default$2d$query$2d$compiler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-compiler/default-query-compiler.js [app-route] (ecmascript)");
;
const ID_WRAP_REGEX = /"/g;
class SqliteQueryCompiler extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$compiler$2f$default$2d$query$2d$compiler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DefaultQueryCompiler"] {
    visitOrAction(node) {
        this.append('or ');
        this.append(node.action);
    }
    getCurrentParameterPlaceholder() {
        return '?';
    }
    getLeftExplainOptionsWrapper() {
        return '';
    }
    getRightExplainOptionsWrapper() {
        return '';
    }
    getLeftIdentifierWrapper() {
        return '"';
    }
    getRightIdentifierWrapper() {
        return '"';
    }
    getAutoIncrement() {
        return 'autoincrement';
    }
    sanitizeIdentifier(identifier) {
        return identifier.replace(ID_WRAP_REGEX, '""');
    }
    visitDefaultInsertValue(_) {
        // sqlite doesn't support the `default` keyword in inserts.
        this.append('null');
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/sqlite/sqlite-introspector.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./sqlite-introspector.d.ts" />
__turbopack_context__.s([
    "SqliteIntrospector",
    ()=>SqliteIntrospector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$migration$2f$migrator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/migration/migrator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/raw-builder/sql.js [app-route] (ecmascript)");
;
;
class SqliteIntrospector {
    #db;
    constructor(db){
        this.#db = db;
    }
    async getSchemas() {
        // Sqlite doesn't support schemas.
        return [];
    }
    async getTables(options = {
        withInternalKyselyTables: false
    }) {
        return await this.#getTableMetadata(options);
    }
    async getMetadata(options) {
        return {
            tables: await this.getTables(options)
        };
    }
    #tablesQuery(qb, options) {
        let tablesQuery = qb.selectFrom('sqlite_master').where('type', 'in', [
            'table',
            'view'
        ]).where('name', 'not like', 'sqlite_%').select([
            'name',
            'sql',
            'type'
        ]).orderBy('name');
        if (!options.withInternalKyselyTables) {
            tablesQuery = tablesQuery.where('name', '!=', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$migration$2f$migrator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_MIGRATION_TABLE"]).where('name', '!=', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$migration$2f$migrator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_MIGRATION_LOCK_TABLE"]);
        }
        return tablesQuery;
    }
    async #getTableMetadata(options) {
        const tablesResult = await this.#tablesQuery(this.#db, options).execute();
        const tableMetadata = await this.#db.with('table_list', (qb)=>this.#tablesQuery(qb, options)).selectFrom([
            'table_list as tl',
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`pragma_table_info(tl.name)`.as('p')
        ]).select([
            'tl.name as table',
            'p.cid',
            'p.name',
            'p.type',
            'p.notnull',
            'p.dflt_value',
            'p.pk'
        ]).orderBy('tl.name').orderBy('p.cid').execute();
        const columnsByTable = {};
        for (const row of tableMetadata){
            columnsByTable[row.table] ??= [];
            columnsByTable[row.table].push(row);
        }
        return tablesResult.map(({ name, sql, type })=>{
            // // Try to find the name of the column that has `autoincrement` 🤦
            let autoIncrementCol = sql?.split(/[\(\),]/)?.find((it)=>it.toLowerCase().includes('autoincrement'))?.trimStart()?.split(/\s+/)?.[0]?.replace(/["`]/g, '');
            const columns = columnsByTable[name] ?? [];
            // Otherwise, check for an INTEGER PRIMARY KEY
            // https://www.sqlite.org/autoinc.html
            if (!autoIncrementCol) {
                const pkCols = columns.filter((r)=>r.pk > 0);
                if (pkCols.length === 1 && pkCols[0].type.toLowerCase() === 'integer') {
                    autoIncrementCol = pkCols[0].name;
                }
            }
            return {
                name: name,
                isView: type === 'view',
                columns: columns.map((col)=>({
                        name: col.name,
                        dataType: col.type,
                        isNullable: !col.notnull,
                        isAutoIncrementing: col.name === autoIncrementCol,
                        hasDefaultValue: col.dflt_value != null,
                        comment: undefined
                    }))
            };
        });
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/dialect-adapter-base.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./dialect-adapter-base.d.ts" />
/**
 * A basic implementation of `DialectAdapter` with sensible default values.
 * Third-party dialects can extend this instead of implementing the `DialectAdapter`
 * interface from scratch. That way all new settings will get default values when
 * they are added and there will be less breaking changes.
 */ __turbopack_context__.s([
    "DialectAdapterBase",
    ()=>DialectAdapterBase
]);
class DialectAdapterBase {
    get supportsCreateIfNotExists() {
        return true;
    }
    get supportsTransactionalDdl() {
        return false;
    }
    get supportsReturning() {
        return false;
    }
    get supportsOutput() {
        return false;
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/sqlite/sqlite-adapter.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./sqlite-adapter.d.ts" />
__turbopack_context__.s([
    "SqliteAdapter",
    ()=>SqliteAdapter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$dialect$2d$adapter$2d$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/dialect-adapter-base.js [app-route] (ecmascript)");
;
class SqliteAdapter extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$dialect$2d$adapter$2d$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DialectAdapterBase"] {
    get supportsTransactionalDdl() {
        return false;
    }
    get supportsReturning() {
        return true;
    }
    async acquireMigrationLock(_db, _opt) {
    // SQLite only has one connection that's reserved by the migration system
    // for the whole time between acquireMigrationLock and releaseMigrationLock.
    // We don't need to do anything here.
    }
    async releaseMigrationLock(_db, _opt) {
    // SQLite only has one connection that's reserved by the migration system
    // for the whole time between acquireMigrationLock and releaseMigrationLock.
    // We don't need to do anything here.
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/sqlite/sqlite-dialect.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./sqlite-dialect.d.ts" />
__turbopack_context__.s([
    "SqliteDialect",
    ()=>SqliteDialect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$sqlite$2f$sqlite$2d$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/sqlite/sqlite-driver.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$sqlite$2f$sqlite$2d$query$2d$compiler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/sqlite/sqlite-query-compiler.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$sqlite$2f$sqlite$2d$introspector$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/sqlite/sqlite-introspector.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$sqlite$2f$sqlite$2d$adapter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/sqlite/sqlite-adapter.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
;
;
;
;
;
class SqliteDialect {
    #config;
    constructor(config){
        this.#config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])({
            ...config
        });
    }
    createDriver() {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$sqlite$2f$sqlite$2d$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SqliteDriver"](this.#config);
    }
    createQueryCompiler() {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$sqlite$2f$sqlite$2d$query$2d$compiler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SqliteQueryCompiler"]();
    }
    createAdapter() {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$sqlite$2f$sqlite$2d$adapter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SqliteAdapter"]();
    }
    createIntrospector(db) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$sqlite$2f$sqlite$2d$introspector$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SqliteIntrospector"](db);
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/mysql/mysql-driver.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./mysql-driver.d.ts" />
__turbopack_context__.s([
    "MysqlDriver",
    ()=>MysqlDriver
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$savepoint$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/savepoint-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$compiler$2f$compiled$2d$query$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-compiler/compiled-query.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/query-id.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$stack$2d$trace$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/stack-trace-utils.js [app-route] (ecmascript)");
;
;
;
;
;
const PRIVATE_RELEASE_METHOD = Symbol();
class MysqlDriver {
    #config;
    #connections = new WeakMap();
    #pool;
    constructor(configOrPool){
        this.#config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])({
            ...configOrPool
        });
    }
    async init() {
        this.#pool = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isFunction"])(this.#config.pool) ? await this.#config.pool() : this.#config.pool;
    }
    async acquireConnection() {
        const rawConnection = await this.#acquireConnection();
        let connection = this.#connections.get(rawConnection);
        if (!connection) {
            connection = new MysqlConnection(rawConnection);
            this.#connections.set(rawConnection, connection);
            // The driver must take care of calling `onCreateConnection` when a new
            // connection is created. The `mysql2` module doesn't provide an async hook
            // for the connection creation. We need to call the method explicitly.
            if (this.#config?.onCreateConnection) {
                await this.#config.onCreateConnection(connection);
            }
        }
        if (this.#config?.onReserveConnection) {
            await this.#config.onReserveConnection(connection);
        }
        return connection;
    }
    async #acquireConnection() {
        return new Promise((resolve, reject)=>{
            this.#pool.getConnection(async (err, rawConnection)=>{
                if (err) {
                    reject(err);
                } else {
                    resolve(rawConnection);
                }
            });
        });
    }
    async beginTransaction(connection, settings) {
        if (settings.isolationLevel || settings.accessMode) {
            const parts = [];
            if (settings.isolationLevel) {
                parts.push(`isolation level ${settings.isolationLevel}`);
            }
            if (settings.accessMode) {
                parts.push(settings.accessMode);
            }
            const sql = `set transaction ${parts.join(', ')}`;
            // On MySQL this sets the isolation level of the next transaction.
            await connection.executeQuery(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$compiler$2f$compiled$2d$query$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CompiledQuery"].raw(sql));
        }
        await connection.executeQuery(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$compiler$2f$compiled$2d$query$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CompiledQuery"].raw('begin'));
    }
    async commitTransaction(connection) {
        await connection.executeQuery(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$compiler$2f$compiled$2d$query$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CompiledQuery"].raw('commit'));
    }
    async rollbackTransaction(connection) {
        await connection.executeQuery(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$compiler$2f$compiled$2d$query$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CompiledQuery"].raw('rollback'));
    }
    async savepoint(connection, savepointName, compileQuery) {
        await connection.executeQuery(compileQuery((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$savepoint$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSavepointCommand"])('savepoint', savepointName), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])()));
    }
    async rollbackToSavepoint(connection, savepointName, compileQuery) {
        await connection.executeQuery(compileQuery((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$savepoint$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSavepointCommand"])('rollback to', savepointName), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])()));
    }
    async releaseSavepoint(connection, savepointName, compileQuery) {
        await connection.executeQuery(compileQuery((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$savepoint$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSavepointCommand"])('release savepoint', savepointName), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])()));
    }
    async releaseConnection(connection) {
        connection[PRIVATE_RELEASE_METHOD]();
    }
    async destroy() {
        return new Promise((resolve, reject)=>{
            this.#pool.end((err)=>{
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}
function isOkPacket(obj) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isObject"])(obj) && 'insertId' in obj && 'affectedRows' in obj;
}
class MysqlConnection {
    #rawConnection;
    constructor(rawConnection){
        this.#rawConnection = rawConnection;
    }
    async executeQuery(compiledQuery) {
        try {
            const result = await this.#executeQuery(compiledQuery);
            if (isOkPacket(result)) {
                const { insertId, affectedRows, changedRows } = result;
                return {
                    insertId: insertId !== undefined && insertId !== null && insertId.toString() !== '0' ? BigInt(insertId) : undefined,
                    numAffectedRows: affectedRows !== undefined && affectedRows !== null ? BigInt(affectedRows) : undefined,
                    numChangedRows: changedRows !== undefined && changedRows !== null ? BigInt(changedRows) : undefined,
                    rows: []
                };
            } else if (Array.isArray(result)) {
                return {
                    rows: result
                };
            }
            return {
                rows: []
            };
        } catch (err) {
            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$stack$2d$trace$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extendStackTrace"])(err, new Error());
        }
    }
    #executeQuery(compiledQuery) {
        return new Promise((resolve, reject)=>{
            this.#rawConnection.query(compiledQuery.sql, compiledQuery.parameters, (err, result)=>{
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    async *streamQuery(compiledQuery, _chunkSize) {
        const stream = this.#rawConnection.query(compiledQuery.sql, compiledQuery.parameters).stream({
            objectMode: true
        });
        try {
            for await (const row of stream){
                yield {
                    rows: [
                        row
                    ]
                };
            }
        } catch (ex) {
            if (ex && typeof ex === 'object' && 'code' in ex && // @ts-ignore
            ex.code === 'ERR_STREAM_PREMATURE_CLOSE') {
                // Most likely because of https://github.com/mysqljs/mysql/blob/master/lib/protocol/sequences/Query.js#L220
                return;
            }
            throw ex;
        }
    }
    [PRIVATE_RELEASE_METHOD]() {
        this.#rawConnection.release();
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/mysql/mysql-query-compiler.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./mysql-query-compiler.d.ts" />
__turbopack_context__.s([
    "MysqlQueryCompiler",
    ()=>MysqlQueryCompiler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$compiler$2f$default$2d$query$2d$compiler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-compiler/default-query-compiler.js [app-route] (ecmascript)");
;
const ID_WRAP_REGEX = /`/g;
class MysqlQueryCompiler extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$compiler$2f$default$2d$query$2d$compiler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DefaultQueryCompiler"] {
    getCurrentParameterPlaceholder() {
        return '?';
    }
    getLeftExplainOptionsWrapper() {
        return '';
    }
    getExplainOptionAssignment() {
        return '=';
    }
    getExplainOptionsDelimiter() {
        return ' ';
    }
    getRightExplainOptionsWrapper() {
        return '';
    }
    getLeftIdentifierWrapper() {
        return '`';
    }
    getRightIdentifierWrapper() {
        return '`';
    }
    sanitizeIdentifier(identifier) {
        return identifier.replace(ID_WRAP_REGEX, '``');
    }
    visitCreateIndex(node) {
        this.append('create ');
        if (node.unique) {
            this.append('unique ');
        }
        this.append('index ');
        if (node.ifNotExists) {
            this.append('if not exists ');
        }
        this.visitNode(node.name);
        if (node.using) {
            this.append(' using ');
            this.visitNode(node.using);
        }
        if (node.table) {
            this.append(' on ');
            this.visitNode(node.table);
        }
        if (node.columns) {
            this.append(' (');
            this.compileList(node.columns);
            this.append(')');
        }
        if (node.where) {
            this.append(' ');
            this.visitNode(node.where);
        }
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/mysql/mysql-introspector.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./mysql-introspector.d.ts" />
__turbopack_context__.s([
    "MysqlIntrospector",
    ()=>MysqlIntrospector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$migration$2f$migrator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/migration/migrator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/raw-builder/sql.js [app-route] (ecmascript)");
;
;
;
class MysqlIntrospector {
    #db;
    constructor(db){
        this.#db = db;
    }
    async getSchemas() {
        let rawSchemas = await this.#db.selectFrom('information_schema.schemata').select('schema_name').$castTo().execute();
        return rawSchemas.map((it)=>({
                name: it.SCHEMA_NAME
            }));
    }
    async getTables(options = {
        withInternalKyselyTables: false
    }) {
        let query = this.#db.selectFrom('information_schema.columns as columns').innerJoin('information_schema.tables as tables', (b)=>b.onRef('columns.TABLE_CATALOG', '=', 'tables.TABLE_CATALOG').onRef('columns.TABLE_SCHEMA', '=', 'tables.TABLE_SCHEMA').onRef('columns.TABLE_NAME', '=', 'tables.TABLE_NAME')).select([
            'columns.COLUMN_NAME',
            'columns.COLUMN_DEFAULT',
            'columns.TABLE_NAME',
            'columns.TABLE_SCHEMA',
            'tables.TABLE_TYPE',
            'columns.IS_NULLABLE',
            'columns.DATA_TYPE',
            'columns.EXTRA',
            'columns.COLUMN_COMMENT'
        ]).where('columns.TABLE_SCHEMA', '=', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`database()`).orderBy('columns.TABLE_NAME').orderBy('columns.ORDINAL_POSITION').$castTo();
        if (!options.withInternalKyselyTables) {
            query = query.where('columns.TABLE_NAME', '!=', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$migration$2f$migrator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_MIGRATION_TABLE"]).where('columns.TABLE_NAME', '!=', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$migration$2f$migrator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_MIGRATION_LOCK_TABLE"]);
        }
        const rawColumns = await query.execute();
        return this.#parseTableMetadata(rawColumns);
    }
    async getMetadata(options) {
        return {
            tables: await this.getTables(options)
        };
    }
    #parseTableMetadata(columns) {
        return columns.reduce((tables, it)=>{
            let table = tables.find((tbl)=>tbl.name === it.TABLE_NAME);
            if (!table) {
                table = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])({
                    name: it.TABLE_NAME,
                    isView: it.TABLE_TYPE === 'VIEW',
                    schema: it.TABLE_SCHEMA,
                    columns: []
                });
                tables.push(table);
            }
            table.columns.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])({
                name: it.COLUMN_NAME,
                dataType: it.DATA_TYPE,
                isNullable: it.IS_NULLABLE === 'YES',
                isAutoIncrementing: it.EXTRA.toLowerCase().includes('auto_increment'),
                hasDefaultValue: it.COLUMN_DEFAULT !== null,
                comment: it.COLUMN_COMMENT === '' ? undefined : it.COLUMN_COMMENT
            }));
            return tables;
        }, []);
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/mysql/mysql-adapter.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./mysql-adapter.d.ts" />
__turbopack_context__.s([
    "MysqlAdapter",
    ()=>MysqlAdapter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/raw-builder/sql.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$dialect$2d$adapter$2d$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/dialect-adapter-base.js [app-route] (ecmascript)");
;
;
const LOCK_ID = 'ea586330-2c93-47c8-908d-981d9d270f9d';
const LOCK_TIMEOUT_SECONDS = 60 * 60;
class MysqlAdapter extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$dialect$2d$adapter$2d$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DialectAdapterBase"] {
    get supportsTransactionalDdl() {
        return false;
    }
    get supportsReturning() {
        return false;
    }
    async acquireMigrationLock(db, _opt) {
        // Kysely uses a single connection to run the migrations. Because of that, we
        // can take a lock using `get_lock`. Locks acquired using `get_lock` get
        // released when the connection is destroyed (session ends) or when the lock
        // is released using `release_lock`. This way we know that the lock is either
        // released by us after successfull or failed migrations OR it's released by
        // MySQL if the process gets killed for some reason.
        await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`select get_lock(${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"].lit(LOCK_ID)}, ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"].lit(LOCK_TIMEOUT_SECONDS)})`.execute(db);
    }
    async releaseMigrationLock(db, _opt) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`select release_lock(${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"].lit(LOCK_ID)})`.execute(db);
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/mysql/mysql-dialect.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./mysql-dialect.d.ts" />
__turbopack_context__.s([
    "MysqlDialect",
    ()=>MysqlDialect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$mysql$2f$mysql$2d$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/mysql/mysql-driver.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$mysql$2f$mysql$2d$query$2d$compiler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/mysql/mysql-query-compiler.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$mysql$2f$mysql$2d$introspector$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/mysql/mysql-introspector.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$mysql$2f$mysql$2d$adapter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/mysql/mysql-adapter.js [app-route] (ecmascript)");
;
;
;
;
class MysqlDialect {
    #config;
    constructor(config){
        this.#config = config;
    }
    createDriver() {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$mysql$2f$mysql$2d$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MysqlDriver"](this.#config);
    }
    createQueryCompiler() {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$mysql$2f$mysql$2d$query$2d$compiler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MysqlQueryCompiler"]();
    }
    createAdapter() {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$mysql$2f$mysql$2d$adapter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MysqlAdapter"]();
    }
    createIntrospector(db) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$mysql$2f$mysql$2d$introspector$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MysqlIntrospector"](db);
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/postgres/postgres-driver.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./postgres-driver.d.ts" />
__turbopack_context__.s([
    "PostgresDriver",
    ()=>PostgresDriver
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$savepoint$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/savepoint-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$compiler$2f$compiled$2d$query$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-compiler/compiled-query.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/query-id.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$stack$2d$trace$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/stack-trace-utils.js [app-route] (ecmascript)");
;
;
;
;
;
const PRIVATE_RELEASE_METHOD = Symbol();
class PostgresDriver {
    #config;
    #connections = new WeakMap();
    #pool;
    constructor(config){
        this.#config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])({
            ...config
        });
    }
    async init() {
        this.#pool = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isFunction"])(this.#config.pool) ? await this.#config.pool() : this.#config.pool;
    }
    async acquireConnection() {
        const client = await this.#pool.connect();
        let connection = this.#connections.get(client);
        if (!connection) {
            connection = new PostgresConnection(client, {
                cursor: this.#config.cursor ?? null
            });
            this.#connections.set(client, connection);
            // The driver must take care of calling `onCreateConnection` when a new
            // connection is created. The `pg` module doesn't provide an async hook
            // for the connection creation. We need to call the method explicitly.
            if (this.#config.onCreateConnection) {
                await this.#config.onCreateConnection(connection);
            }
        }
        if (this.#config.onReserveConnection) {
            await this.#config.onReserveConnection(connection);
        }
        return connection;
    }
    async beginTransaction(connection, settings) {
        if (settings.isolationLevel || settings.accessMode) {
            let sql = 'start transaction';
            if (settings.isolationLevel) {
                sql += ` isolation level ${settings.isolationLevel}`;
            }
            if (settings.accessMode) {
                sql += ` ${settings.accessMode}`;
            }
            await connection.executeQuery(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$compiler$2f$compiled$2d$query$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CompiledQuery"].raw(sql));
        } else {
            await connection.executeQuery(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$compiler$2f$compiled$2d$query$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CompiledQuery"].raw('begin'));
        }
    }
    async commitTransaction(connection) {
        await connection.executeQuery(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$compiler$2f$compiled$2d$query$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CompiledQuery"].raw('commit'));
    }
    async rollbackTransaction(connection) {
        await connection.executeQuery(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$compiler$2f$compiled$2d$query$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CompiledQuery"].raw('rollback'));
    }
    async savepoint(connection, savepointName, compileQuery) {
        await connection.executeQuery(compileQuery((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$savepoint$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSavepointCommand"])('savepoint', savepointName), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])()));
    }
    async rollbackToSavepoint(connection, savepointName, compileQuery) {
        await connection.executeQuery(compileQuery((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$savepoint$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSavepointCommand"])('rollback to', savepointName), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])()));
    }
    async releaseSavepoint(connection, savepointName, compileQuery) {
        await connection.executeQuery(compileQuery((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$savepoint$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSavepointCommand"])('release', savepointName), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])()));
    }
    async releaseConnection(connection) {
        connection[PRIVATE_RELEASE_METHOD]();
    }
    async destroy() {
        if (this.#pool) {
            const pool = this.#pool;
            this.#pool = undefined;
            await pool.end();
        }
    }
}
class PostgresConnection {
    #client;
    #options;
    constructor(client, options){
        this.#client = client;
        this.#options = options;
    }
    async executeQuery(compiledQuery) {
        try {
            const { command, rowCount, rows } = await this.#client.query(compiledQuery.sql, [
                ...compiledQuery.parameters
            ]);
            return {
                numAffectedRows: command === 'INSERT' || command === 'UPDATE' || command === 'DELETE' || command === 'MERGE' ? BigInt(rowCount) : undefined,
                rows: rows ?? []
            };
        } catch (err) {
            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$stack$2d$trace$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extendStackTrace"])(err, new Error());
        }
    }
    async *streamQuery(compiledQuery, chunkSize) {
        if (!this.#options.cursor) {
            throw new Error("'cursor' is not present in your postgres dialect config. It's required to make streaming work in postgres.");
        }
        if (!Number.isInteger(chunkSize) || chunkSize <= 0) {
            throw new Error('chunkSize must be a positive integer');
        }
        const cursor = this.#client.query(new this.#options.cursor(compiledQuery.sql, compiledQuery.parameters.slice()));
        try {
            while(true){
                const rows = await cursor.read(chunkSize);
                if (rows.length === 0) {
                    break;
                }
                yield {
                    rows
                };
            }
        } finally{
            await cursor.close();
        }
    }
    [PRIVATE_RELEASE_METHOD]() {
        this.#client.release();
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/postgres/postgres-introspector.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./postgres-introspector.d.ts" />
__turbopack_context__.s([
    "PostgresIntrospector",
    ()=>PostgresIntrospector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$migration$2f$migrator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/migration/migrator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/raw-builder/sql.js [app-route] (ecmascript)");
;
;
;
class PostgresIntrospector {
    #db;
    constructor(db){
        this.#db = db;
    }
    async getSchemas() {
        let rawSchemas = await this.#db.selectFrom('pg_catalog.pg_namespace').select('nspname').$castTo().execute();
        return rawSchemas.map((it)=>({
                name: it.nspname
            }));
    }
    async getTables(options = {
        withInternalKyselyTables: false
    }) {
        let query = this.#db// column
        .selectFrom('pg_catalog.pg_attribute as a')// table
        .innerJoin('pg_catalog.pg_class as c', 'a.attrelid', 'c.oid')// table schema
        .innerJoin('pg_catalog.pg_namespace as ns', 'c.relnamespace', 'ns.oid')// column data type
        .innerJoin('pg_catalog.pg_type as typ', 'a.atttypid', 'typ.oid')// column data type schema
        .innerJoin('pg_catalog.pg_namespace as dtns', 'typ.typnamespace', 'dtns.oid').select([
            'a.attname as column',
            'a.attnotnull as not_null',
            'a.atthasdef as has_default',
            'c.relname as table',
            'c.relkind as table_type',
            'ns.nspname as schema',
            'typ.typname as type',
            'dtns.nspname as type_schema',
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`col_description(a.attrelid, a.attnum)`.as('column_description'),
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`pg_get_serial_sequence(quote_ident(ns.nspname) || '.' || quote_ident(c.relname), a.attname)`.as('auto_incrementing')
        ]).where('c.relkind', 'in', [
            'r' /*regular table*/ ,
            'v' /*view*/ ,
            'p' /*partitioned table*/ 
        ]).where('ns.nspname', '!~', '^pg_').where('ns.nspname', '!=', 'information_schema')// Filter out internal cockroachdb schema
        .where('ns.nspname', '!=', 'crdb_internal')// Only schemas where we are allowed access
        .where(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`has_schema_privilege(ns.nspname, 'USAGE')`)// No system columns
        .where('a.attnum', '>=', 0).where('a.attisdropped', '!=', true).orderBy('ns.nspname').orderBy('c.relname').orderBy('a.attnum').$castTo();
        if (!options.withInternalKyselyTables) {
            query = query.where('c.relname', '!=', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$migration$2f$migrator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_MIGRATION_TABLE"]).where('c.relname', '!=', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$migration$2f$migrator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_MIGRATION_LOCK_TABLE"]);
        }
        const rawColumns = await query.execute();
        return this.#parseTableMetadata(rawColumns);
    }
    async getMetadata(options) {
        return {
            tables: await this.getTables(options)
        };
    }
    #parseTableMetadata(columns) {
        return columns.reduce((tables, it)=>{
            let table = tables.find((tbl)=>tbl.name === it.table && tbl.schema === it.schema);
            if (!table) {
                table = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])({
                    name: it.table,
                    isView: it.table_type === 'v',
                    schema: it.schema,
                    columns: []
                });
                tables.push(table);
            }
            table.columns.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])({
                name: it.column,
                dataType: it.type,
                dataTypeSchema: it.type_schema,
                isNullable: !it.not_null,
                isAutoIncrementing: it.auto_incrementing !== null,
                hasDefaultValue: it.has_default,
                comment: it.column_description ?? undefined
            }));
            return tables;
        }, []);
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/postgres/postgres-query-compiler.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./postgres-query-compiler.d.ts" />
__turbopack_context__.s([
    "PostgresQueryCompiler",
    ()=>PostgresQueryCompiler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$compiler$2f$default$2d$query$2d$compiler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-compiler/default-query-compiler.js [app-route] (ecmascript)");
;
const ID_WRAP_REGEX = /"/g;
class PostgresQueryCompiler extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$compiler$2f$default$2d$query$2d$compiler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DefaultQueryCompiler"] {
    sanitizeIdentifier(identifier) {
        return identifier.replace(ID_WRAP_REGEX, '""');
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/postgres/postgres-adapter.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./postgres-adapter.d.ts" />
__turbopack_context__.s([
    "PostgresAdapter",
    ()=>PostgresAdapter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/raw-builder/sql.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$dialect$2d$adapter$2d$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/dialect-adapter-base.js [app-route] (ecmascript)");
;
;
// Random id for our transaction lock.
const LOCK_ID = BigInt('3853314791062309107');
class PostgresAdapter extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$dialect$2d$adapter$2d$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DialectAdapterBase"] {
    get supportsTransactionalDdl() {
        return true;
    }
    get supportsReturning() {
        return true;
    }
    async acquireMigrationLock(db, _opt) {
        // Acquire a transaction level advisory lock.
        await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`select pg_advisory_xact_lock(${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"].lit(LOCK_ID)})`.execute(db);
    }
    async releaseMigrationLock(_db, _opt) {
    // Nothing to do here. `pg_advisory_xact_lock` is automatically released at the
    // end of the transaction and since `supportsTransactionalDdl` true, we know
    // the `db` instance passed to acquireMigrationLock is actually a transaction.
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/postgres/postgres-dialect.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./postgres-dialect.d.ts" />
__turbopack_context__.s([
    "PostgresDialect",
    ()=>PostgresDialect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$postgres$2f$postgres$2d$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/postgres/postgres-driver.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$postgres$2f$postgres$2d$introspector$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/postgres/postgres-introspector.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$postgres$2f$postgres$2d$query$2d$compiler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/postgres/postgres-query-compiler.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$postgres$2f$postgres$2d$adapter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/postgres/postgres-adapter.js [app-route] (ecmascript)");
;
;
;
;
class PostgresDialect {
    #config;
    constructor(config){
        this.#config = config;
    }
    createDriver() {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$postgres$2f$postgres$2d$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PostgresDriver"](this.#config);
    }
    createQueryCompiler() {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$postgres$2f$postgres$2d$query$2d$compiler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PostgresQueryCompiler"]();
    }
    createAdapter() {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$postgres$2f$postgres$2d$adapter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PostgresAdapter"]();
    }
    createIntrospector(db) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$postgres$2f$postgres$2d$introspector$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PostgresIntrospector"](db);
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/mssql/mssql-adapter.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./mssql-adapter.d.ts" />
__turbopack_context__.s([
    "MssqlAdapter",
    ()=>MssqlAdapter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$migration$2f$migrator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/migration/migrator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/raw-builder/sql.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$dialect$2d$adapter$2d$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/dialect-adapter-base.js [app-route] (ecmascript)");
;
;
;
class MssqlAdapter extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$dialect$2d$adapter$2d$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DialectAdapterBase"] {
    get supportsCreateIfNotExists() {
        return false;
    }
    get supportsTransactionalDdl() {
        return true;
    }
    get supportsOutput() {
        return true;
    }
    async acquireMigrationLock(db) {
        // Acquire a transaction-level exclusive lock on the migrations table.
        // https://learn.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/sp-getapplock-transact-sql?view=sql-server-ver16
        await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`exec sp_getapplock @DbPrincipal = ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"].lit('dbo')}, @Resource = ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"].lit(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$migration$2f$migrator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_MIGRATION_TABLE"])}, @LockMode = ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"].lit('Exclusive')}`.execute(db);
    }
    async releaseMigrationLock() {
    // Nothing to do here. `sp_getapplock` is automatically released at the
    // end of the transaction and since `supportsTransactionalDdl` true, we know
    // the `db` instance passed to acquireMigrationLock is actually a transaction.
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/mssql/mssql-driver.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./mssql-driver.d.ts" />
__turbopack_context__.s([
    "MssqlDriver",
    ()=>MssqlDriver
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$compiler$2f$compiled$2d$query$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-compiler/compiled-query.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$stack$2d$trace$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/stack-trace-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$random$2d$string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/random-string.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$deferred$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/deferred.js [app-route] (ecmascript)");
;
;
;
;
;
const PRIVATE_RESET_METHOD = Symbol();
const PRIVATE_DESTROY_METHOD = Symbol();
const PRIVATE_VALIDATE_METHOD = Symbol();
class MssqlDriver {
    #config;
    #pool;
    constructor(config){
        this.#config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])({
            ...config
        });
        const { tarn, tedious, validateConnections } = this.#config;
        const { validateConnections: deprecatedValidateConnections, ...poolOptions } = tarn.options;
        this.#pool = new tarn.Pool({
            ...poolOptions,
            create: async ()=>{
                const connection = await tedious.connectionFactory();
                return await new MssqlConnection(connection, tedious).connect();
            },
            destroy: async (connection)=>{
                await connection[PRIVATE_DESTROY_METHOD]();
            },
            // @ts-ignore `tarn` accepts a function that returns a promise here, but
            // the types are not aligned and it type errors.
            validate: validateConnections === false || deprecatedValidateConnections === false ? undefined : (connection)=>connection[PRIVATE_VALIDATE_METHOD]()
        });
    }
    async init() {
    // noop
    }
    async acquireConnection() {
        return await this.#pool.acquire().promise;
    }
    async beginTransaction(connection, settings) {
        await connection.beginTransaction(settings);
    }
    async commitTransaction(connection) {
        await connection.commitTransaction();
    }
    async rollbackTransaction(connection) {
        await connection.rollbackTransaction();
    }
    async savepoint(connection, savepointName) {
        await connection.savepoint(savepointName);
    }
    async rollbackToSavepoint(connection, savepointName) {
        await connection.rollbackTransaction(savepointName);
    }
    async releaseConnection(connection) {
        if (this.#config.resetConnectionsOnRelease || this.#config.tedious.resetConnectionOnRelease) {
            await connection[PRIVATE_RESET_METHOD]();
        }
        this.#pool.release(connection);
    }
    async destroy() {
        await this.#pool.destroy();
    }
}
class MssqlConnection {
    #connection;
    #hasSocketError;
    #tedious;
    constructor(connection, tedious){
        this.#connection = connection;
        this.#hasSocketError = false;
        this.#tedious = tedious;
    }
    async beginTransaction(settings) {
        const { isolationLevel } = settings;
        await new Promise((resolve, reject)=>this.#connection.beginTransaction((error)=>{
                if (error) reject(error);
                else resolve(undefined);
            }, isolationLevel ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$random$2d$string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["randomString"])(8) : undefined, isolationLevel ? this.#getTediousIsolationLevel(isolationLevel) : undefined));
    }
    async commitTransaction() {
        await new Promise((resolve, reject)=>this.#connection.commitTransaction((error)=>{
                if (error) reject(error);
                else resolve(undefined);
            }));
    }
    async connect() {
        const { promise: waitForConnected, reject, resolve } = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$deferred$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Deferred"]();
        this.#connection.connect((error)=>{
            if (error) {
                return reject(error);
            }
            resolve();
        });
        this.#connection.on('error', (error)=>{
            if (error instanceof Error && 'code' in error && error.code === 'ESOCKET') {
                this.#hasSocketError = true;
            }
            console.error(error);
            reject(error);
        });
        function endListener() {
            reject(new Error('The connection ended without ever completing the connection'));
        }
        this.#connection.once('end', endListener);
        await waitForConnected;
        this.#connection.off('end', endListener);
        return this;
    }
    async executeQuery(compiledQuery) {
        try {
            const deferred = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$deferred$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Deferred"]();
            const request = new MssqlRequest({
                compiledQuery,
                tedious: this.#tedious,
                onDone: deferred
            });
            this.#connection.execSql(request.request);
            const { rowCount, rows } = await deferred.promise;
            return {
                numAffectedRows: rowCount !== undefined ? BigInt(rowCount) : undefined,
                rows
            };
        } catch (err) {
            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$stack$2d$trace$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extendStackTrace"])(err, new Error());
        }
    }
    async rollbackTransaction(savepointName) {
        await new Promise((resolve, reject)=>this.#connection.rollbackTransaction((error)=>{
                if (error) reject(error);
                else resolve(undefined);
            }, savepointName));
    }
    async savepoint(savepointName) {
        await new Promise((resolve, reject)=>this.#connection.saveTransaction((error)=>{
                if (error) reject(error);
                else resolve(undefined);
            }, savepointName));
    }
    async *streamQuery(compiledQuery, chunkSize) {
        if (!Number.isInteger(chunkSize) || chunkSize <= 0) {
            throw new Error('chunkSize must be a positive integer');
        }
        const request = new MssqlRequest({
            compiledQuery,
            streamChunkSize: chunkSize,
            tedious: this.#tedious
        });
        this.#connection.execSql(request.request);
        try {
            while(true){
                const rows = await request.readChunk();
                if (rows.length === 0) {
                    break;
                }
                yield {
                    rows
                };
                if (rows.length < chunkSize) {
                    break;
                }
            }
        } finally{
            await this.#cancelRequest(request);
        }
    }
    #getTediousIsolationLevel(isolationLevel) {
        const { ISOLATION_LEVEL } = this.#tedious;
        const mapper = {
            'read committed': ISOLATION_LEVEL.READ_COMMITTED,
            'read uncommitted': ISOLATION_LEVEL.READ_UNCOMMITTED,
            'repeatable read': ISOLATION_LEVEL.REPEATABLE_READ,
            serializable: ISOLATION_LEVEL.SERIALIZABLE,
            snapshot: ISOLATION_LEVEL.SNAPSHOT
        };
        const tediousIsolationLevel = mapper[isolationLevel];
        if (tediousIsolationLevel === undefined) {
            throw new Error(`Unknown isolation level: ${isolationLevel}`);
        }
        return tediousIsolationLevel;
    }
    #cancelRequest(request) {
        return new Promise((resolve)=>{
            request.request.once('requestCompleted', resolve);
            const wasCanceled = this.#connection.cancel();
            if (!wasCanceled) {
                request.request.off('requestCompleted', resolve);
                resolve();
            }
        });
    }
    [PRIVATE_DESTROY_METHOD]() {
        if ('closed' in this.#connection && this.#connection.closed) {
            return Promise.resolve();
        }
        return new Promise((resolve)=>{
            this.#connection.once('end', resolve);
            this.#connection.close();
        });
    }
    async [PRIVATE_RESET_METHOD]() {
        await new Promise((resolve, reject)=>{
            this.#connection.reset((error)=>{
                if (error) {
                    return reject(error);
                }
                resolve();
            });
        });
    }
    async [PRIVATE_VALIDATE_METHOD]() {
        if (this.#hasSocketError || this.#isConnectionClosed()) {
            return false;
        }
        try {
            const deferred = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$deferred$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Deferred"]();
            const request = new MssqlRequest({
                compiledQuery: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$compiler$2f$compiled$2d$query$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CompiledQuery"].raw('select 1'),
                onDone: deferred,
                tedious: this.#tedious
            });
            this.#connection.execSql(request.request);
            await deferred.promise;
            return true;
        } catch  {
            return false;
        }
    }
    #isConnectionClosed() {
        return 'closed' in this.#connection && Boolean(this.#connection.closed);
    }
}
class MssqlRequest {
    #request;
    #rows;
    #streamChunkSize;
    #subscribers;
    #tedious;
    #rowCount;
    constructor(props){
        const { compiledQuery, onDone, streamChunkSize, tedious } = props;
        this.#rows = [];
        this.#streamChunkSize = streamChunkSize;
        this.#subscribers = {};
        this.#tedious = tedious;
        if (onDone) {
            const subscriptionKey = 'onDone';
            this.#subscribers[subscriptionKey] = (event, error)=>{
                if (event === 'chunkReady') {
                    return;
                }
                delete this.#subscribers[subscriptionKey];
                if (event === 'error') {
                    return onDone.reject(error);
                }
                onDone.resolve({
                    rowCount: this.#rowCount,
                    rows: this.#rows
                });
            };
        }
        this.#request = new this.#tedious.Request(compiledQuery.sql, (err, rowCount)=>{
            if (err) {
                return Object.values(this.#subscribers).forEach((subscriber)=>subscriber('error', err instanceof AggregateError ? err.errors : err));
            }
            this.#rowCount = rowCount;
        });
        this.#addParametersToRequest(compiledQuery.parameters);
        this.#attachListeners();
    }
    get request() {
        return this.#request;
    }
    readChunk() {
        const subscriptionKey = this.readChunk.name;
        return new Promise((resolve, reject)=>{
            this.#subscribers[subscriptionKey] = (event, error)=>{
                delete this.#subscribers[subscriptionKey];
                if (event === 'error') {
                    return reject(error);
                }
                resolve(this.#rows.splice(0, this.#streamChunkSize));
            };
            this.#request.resume();
        });
    }
    #addParametersToRequest(parameters) {
        for(let i = 0; i < parameters.length; i++){
            const parameter = parameters[i];
            this.#request.addParameter(String(i + 1), this.#getTediousDataType(parameter), parameter);
        }
    }
    #attachListeners() {
        const pauseAndEmitChunkReady = this.#streamChunkSize ? ()=>{
            if (this.#streamChunkSize <= this.#rows.length) {
                this.#request.pause();
                Object.values(this.#subscribers).forEach((subscriber)=>subscriber('chunkReady'));
            }
        } : ()=>{};
        const rowListener = (columns)=>{
            const row = {};
            for (const column of columns){
                row[column.metadata.colName] = column.value;
            }
            this.#rows.push(row);
            pauseAndEmitChunkReady();
        };
        this.#request.on('row', rowListener);
        this.#request.once('requestCompleted', ()=>{
            Object.values(this.#subscribers).forEach((subscriber)=>subscriber('completed'));
            this.#request.off('row', rowListener);
        });
    }
    #getTediousDataType(value) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isNull"])(value) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isUndefined"])(value) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isString"])(value)) {
            return this.#tedious.TYPES.NVarChar;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isBigInt"])(value) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isNumber"])(value) && value % 1 === 0) {
            if (value < -2147483648 || value > 2147483647) {
                return this.#tedious.TYPES.BigInt;
            } else {
                return this.#tedious.TYPES.Int;
            }
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isNumber"])(value)) {
            return this.#tedious.TYPES.Float;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isBoolean"])(value)) {
            return this.#tedious.TYPES.Bit;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDate"])(value)) {
            return this.#tedious.TYPES.DateTime;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isBuffer"])(value)) {
            return this.#tedious.TYPES.VarBinary;
        }
        return this.#tedious.TYPES.NVarChar;
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/mssql/mssql-introspector.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./mssql-introspector.d.ts" />
__turbopack_context__.s([
    "MssqlIntrospector",
    ()=>MssqlIntrospector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$migration$2f$migrator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/migration/migrator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
;
;
class MssqlIntrospector {
    #db;
    constructor(db){
        this.#db = db;
    }
    async getSchemas() {
        return await this.#db.selectFrom('sys.schemas').select('name').execute();
    }
    async getTables(options = {
        withInternalKyselyTables: false
    }) {
        const rawColumns = await this.#db.selectFrom('sys.tables as tables').leftJoin('sys.schemas as table_schemas', 'table_schemas.schema_id', 'tables.schema_id').innerJoin('sys.columns as columns', 'columns.object_id', 'tables.object_id').innerJoin('sys.types as types', 'types.user_type_id', 'columns.user_type_id').leftJoin('sys.schemas as type_schemas', 'type_schemas.schema_id', 'types.schema_id').leftJoin('sys.extended_properties as comments', (join)=>join.onRef('comments.major_id', '=', 'tables.object_id').onRef('comments.minor_id', '=', 'columns.column_id').on('comments.name', '=', 'MS_Description')).$if(!options.withInternalKyselyTables, (qb)=>qb.where('tables.name', '!=', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$migration$2f$migrator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_MIGRATION_TABLE"]).where('tables.name', '!=', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$migration$2f$migrator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_MIGRATION_LOCK_TABLE"])).select([
            'tables.name as table_name',
            (eb)=>eb.ref('tables.type').$castTo().as('table_type'),
            'table_schemas.name as table_schema_name',
            'columns.default_object_id as column_default_object_id',
            'columns.generated_always_type_desc as column_generated_always_type',
            'columns.is_computed as column_is_computed',
            'columns.is_identity as column_is_identity',
            'columns.is_nullable as column_is_nullable',
            'columns.is_rowguidcol as column_is_rowguidcol',
            'columns.name as column_name',
            'types.is_nullable as type_is_nullable',
            'types.name as type_name',
            'type_schemas.name as type_schema_name',
            'comments.value as column_comment'
        ]).unionAll(this.#db.selectFrom('sys.views as views').leftJoin('sys.schemas as view_schemas', 'view_schemas.schema_id', 'views.schema_id').innerJoin('sys.columns as columns', 'columns.object_id', 'views.object_id').innerJoin('sys.types as types', 'types.user_type_id', 'columns.user_type_id').leftJoin('sys.schemas as type_schemas', 'type_schemas.schema_id', 'types.schema_id').leftJoin('sys.extended_properties as comments', (join)=>join.onRef('comments.major_id', '=', 'views.object_id').onRef('comments.minor_id', '=', 'columns.column_id').on('comments.name', '=', 'MS_Description')).select([
            'views.name as table_name',
            'views.type as table_type',
            'view_schemas.name as table_schema_name',
            'columns.default_object_id as column_default_object_id',
            'columns.generated_always_type_desc as column_generated_always_type',
            'columns.is_computed as column_is_computed',
            'columns.is_identity as column_is_identity',
            'columns.is_nullable as column_is_nullable',
            'columns.is_rowguidcol as column_is_rowguidcol',
            'columns.name as column_name',
            'types.is_nullable as type_is_nullable',
            'types.name as type_name',
            'type_schemas.name as type_schema_name',
            'comments.value as column_comment'
        ])).orderBy('table_schema_name').orderBy('table_name').orderBy('column_name').execute();
        const tableDictionary = {};
        for (const rawColumn of rawColumns){
            const key = `${rawColumn.table_schema_name}.${rawColumn.table_name}`;
            const table = tableDictionary[key] = tableDictionary[key] || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])({
                columns: [],
                isView: rawColumn.table_type === 'V ',
                name: rawColumn.table_name,
                schema: rawColumn.table_schema_name ?? undefined
            });
            table.columns.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])({
                dataType: rawColumn.type_name,
                dataTypeSchema: rawColumn.type_schema_name ?? undefined,
                hasDefaultValue: rawColumn.column_default_object_id > 0 || rawColumn.column_generated_always_type !== 'NOT_APPLICABLE' || rawColumn.column_is_identity || rawColumn.column_is_computed || rawColumn.column_is_rowguidcol,
                isAutoIncrementing: rawColumn.column_is_identity,
                isNullable: rawColumn.column_is_nullable && rawColumn.type_is_nullable,
                name: rawColumn.column_name,
                comment: rawColumn.column_comment ?? undefined
            }));
        }
        return Object.values(tableDictionary);
    }
    async getMetadata(options) {
        return {
            tables: await this.getTables(options)
        };
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/mssql/mssql-query-compiler.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./mssql-query-compiler.d.ts" />
__turbopack_context__.s([
    "MssqlQueryCompiler",
    ()=>MssqlQueryCompiler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$compiler$2f$default$2d$query$2d$compiler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-compiler/default-query-compiler.js [app-route] (ecmascript)");
;
const COLLATION_CHAR_REGEX = /^[a-z0-9_]$/i;
class MssqlQueryCompiler extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$compiler$2f$default$2d$query$2d$compiler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DefaultQueryCompiler"] {
    getCurrentParameterPlaceholder() {
        return `@${this.numParameters}`;
    }
    visitOffset(node) {
        super.visitOffset(node);
        this.append(' rows');
    }
    // mssql allows multi-column alterations in a single statement,
    // but you can only use the command keyword/s once.
    // it also doesn't support multiple kinds of commands in the same
    // alter table statement, but we compile that anyway for the sake
    // of WYSIWYG.
    compileColumnAlterations(columnAlterations) {
        const nodesByKind = {};
        for (const columnAlteration of columnAlterations){
            if (!nodesByKind[columnAlteration.kind]) {
                nodesByKind[columnAlteration.kind] = [];
            }
            nodesByKind[columnAlteration.kind].push(columnAlteration);
        }
        let first = true;
        if (nodesByKind.AddColumnNode) {
            this.append('add ');
            this.compileList(nodesByKind.AddColumnNode);
            first = false;
        }
        // multiple of these are not really supported by mssql,
        // but for the sake of WYSIWYG.
        if (nodesByKind.AlterColumnNode) {
            if (!first) this.append(', ');
            this.compileList(nodesByKind.AlterColumnNode);
        }
        if (nodesByKind.DropColumnNode) {
            if (!first) this.append(', ');
            this.append('drop column ');
            this.compileList(nodesByKind.DropColumnNode);
        }
        // not really supported by mssql, but for the sake of WYSIWYG.
        if (nodesByKind.ModifyColumnNode) {
            if (!first) this.append(', ');
            this.compileList(nodesByKind.ModifyColumnNode);
        }
        // not really supported by mssql, but for the sake of WYSIWYG.
        if (nodesByKind.RenameColumnNode) {
            if (!first) this.append(', ');
            this.compileList(nodesByKind.RenameColumnNode);
        }
    }
    visitAddColumn(node) {
        this.visitNode(node.column);
    }
    visitDropColumn(node) {
        this.visitNode(node.column);
    }
    visitMergeQuery(node) {
        super.visitMergeQuery(node);
        this.append(';');
    }
    visitCollate(node) {
        this.append('collate ');
        const { name } = node.collation;
        for (const char of name){
            if (!COLLATION_CHAR_REGEX.test(char)) {
                throw new Error(`Invalid collation: ${name}`);
            }
        }
        this.append(name);
    }
    announcesNewColumnDataType() {
        return false;
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/mssql/mssql-dialect.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./mssql-dialect.d.ts" />
__turbopack_context__.s([
    "MssqlDialect",
    ()=>MssqlDialect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$mssql$2f$mssql$2d$adapter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/mssql/mssql-adapter.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$mssql$2f$mssql$2d$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/mssql/mssql-driver.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$mssql$2f$mssql$2d$introspector$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/mssql/mssql-introspector.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$mssql$2f$mssql$2d$query$2d$compiler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/mssql/mssql-query-compiler.js [app-route] (ecmascript)");
;
;
;
;
class MssqlDialect {
    #config;
    constructor(config){
        this.#config = config;
    }
    createDriver() {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$mssql$2f$mssql$2d$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MssqlDriver"](this.#config);
    }
    createQueryCompiler() {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$mssql$2f$mssql$2d$query$2d$compiler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MssqlQueryCompiler"]();
    }
    createAdapter() {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$mssql$2f$mssql$2d$adapter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MssqlAdapter"]();
    }
    createIntrospector(db) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$mssql$2f$mssql$2d$introspector$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MssqlIntrospector"](db);
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/plugin/noop-plugin.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./noop-plugin.d.ts" />
__turbopack_context__.s([
    "NoopPlugin",
    ()=>NoopPlugin
]);
class NoopPlugin {
    transformQuery(args) {
        return args.node;
    }
    async transformResult(args) {
        return args.result;
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/plugin/with-schema/with-schema-transformer.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./with-schema-transformer.d.ts" />
__turbopack_context__.s([
    "WithSchemaTransformer",
    ()=>WithSchemaTransformer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alias$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/alias-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$identifier$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/identifier-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$join$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/join-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$list$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/list-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$operation$2d$node$2d$transformer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/operation-node-transformer.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$schemable$2d$identifier$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/schemable-identifier-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/table-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
// This object exist only so that we get a type error when a new RootOperationNode
// is added. If you get a type error here, make sure to add the new root node and
// handle it correctly in the transformer.
//
// DO NOT REFACTOR THIS EVEN IF IT SEEMS USELESS TO YOU!
const ROOT_OPERATION_NODES = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])({
    AlterTableNode: true,
    CreateIndexNode: true,
    CreateSchemaNode: true,
    CreateTableNode: true,
    CreateTypeNode: true,
    CreateViewNode: true,
    RefreshMaterializedViewNode: true,
    DeleteQueryNode: true,
    DropIndexNode: true,
    DropSchemaNode: true,
    DropTableNode: true,
    DropTypeNode: true,
    DropViewNode: true,
    InsertQueryNode: true,
    RawNode: true,
    SelectQueryNode: true,
    UpdateQueryNode: true,
    MergeQueryNode: true
});
const SCHEMALESS_FUNCTIONS = {
    json_agg: true,
    to_json: true
};
class WithSchemaTransformer extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$operation$2d$node$2d$transformer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OperationNodeTransformer"] {
    #schema;
    #schemableIds = new Set();
    #ctes = new Set();
    constructor(schema){
        super();
        this.#schema = schema;
    }
    transformNodeImpl(node, queryId) {
        if (!this.#isRootOperationNode(node)) {
            return super.transformNodeImpl(node, queryId);
        }
        const ctes = this.#collectCTEs(node);
        for (const cte of ctes){
            this.#ctes.add(cte);
        }
        const tables = this.#collectSchemableIds(node);
        for (const table of tables){
            this.#schemableIds.add(table);
        }
        const transformed = super.transformNodeImpl(node, queryId);
        for (const table of tables){
            this.#schemableIds.delete(table);
        }
        for (const cte of ctes){
            this.#ctes.delete(cte);
        }
        return transformed;
    }
    transformSchemableIdentifier(node, queryId) {
        const transformed = super.transformSchemableIdentifier(node, queryId);
        if (transformed.schema || !this.#schemableIds.has(node.identifier.name)) {
            return transformed;
        }
        return {
            ...transformed,
            schema: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$identifier$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IdentifierNode"].create(this.#schema)
        };
    }
    transformReferences(node, queryId) {
        const transformed = super.transformReferences(node, queryId);
        if (transformed.table.table.schema) {
            return transformed;
        }
        return {
            ...transformed,
            table: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TableNode"].createWithSchema(this.#schema, transformed.table.table.identifier.name)
        };
    }
    transformAggregateFunction(node, queryId) {
        return {
            ...super.transformAggregateFunction({
                ...node,
                aggregated: []
            }, queryId),
            aggregated: this.#transformTableArgsWithoutSchemas(node, queryId, 'aggregated')
        };
    }
    transformFunction(node, queryId) {
        return {
            ...super.transformFunction({
                ...node,
                arguments: []
            }, queryId),
            arguments: this.#transformTableArgsWithoutSchemas(node, queryId, 'arguments')
        };
    }
    #transformTableArgsWithoutSchemas(node, queryId, argsKey) {
        return SCHEMALESS_FUNCTIONS[node.func] ? node[argsKey].map((arg)=>!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TableNode"].is(arg) || arg.table.schema ? this.transformNode(arg, queryId) : {
                ...arg,
                table: this.transformIdentifier(arg.table.identifier, queryId)
            }) : this.transformNodeList(node[argsKey], queryId);
    }
    #isRootOperationNode(node) {
        return node.kind in ROOT_OPERATION_NODES;
    }
    #collectSchemableIds(node) {
        const schemableIds = new Set();
        if ('name' in node && node.name && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$schemable$2d$identifier$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SchemableIdentifierNode"].is(node.name)) {
            this.#collectSchemableId(node.name, schemableIds);
        }
        if ('from' in node && node.from) {
            for (const from of node.from.froms){
                this.#collectSchemableIdsFromTableExpr(from, schemableIds);
            }
        }
        if ('into' in node && node.into) {
            this.#collectSchemableIdsFromTableExpr(node.into, schemableIds);
        }
        if ('table' in node && node.table) {
            this.#collectSchemableIdsFromTableExpr(node.table, schemableIds);
        }
        if ('joins' in node && node.joins) {
            for (const join of node.joins){
                this.#collectSchemableIdsFromTableExpr(join.table, schemableIds);
            }
        }
        if ('using' in node && node.using) {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$join$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JoinNode"].is(node.using)) {
                this.#collectSchemableIdsFromTableExpr(node.using.table, schemableIds);
            } else {
                this.#collectSchemableIdsFromTableExpr(node.using, schemableIds);
            }
        }
        return schemableIds;
    }
    #collectCTEs(node) {
        const ctes = new Set();
        if ('with' in node && node.with) {
            this.#collectCTEIds(node.with, ctes);
        }
        return ctes;
    }
    #collectSchemableIdsFromTableExpr(node, schemableIds) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TableNode"].is(node)) {
            this.#collectSchemableId(node.table, schemableIds);
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alias$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AliasNode"].is(node) && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TableNode"].is(node.node)) {
            this.#collectSchemableId(node.node.table, schemableIds);
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$list$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ListNode"].is(node)) {
            for (const table of node.items){
                this.#collectSchemableIdsFromTableExpr(table, schemableIds);
            }
        }
    }
    #collectSchemableId(node, schemableIds) {
        const id = node.identifier.name;
        if (!this.#schemableIds.has(id) && !this.#ctes.has(id)) {
            schemableIds.add(id);
        }
    }
    #collectCTEIds(node, ctes) {
        for (const expr of node.expressions){
            const cteId = expr.name.table.table.identifier.name;
            if (!this.#ctes.has(cteId)) {
                ctes.add(cteId);
            }
        }
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/plugin/with-schema/with-schema-plugin.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./with-schema-plugin.d.ts" />
__turbopack_context__.s([
    "WithSchemaPlugin",
    ()=>WithSchemaPlugin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$plugin$2f$with$2d$schema$2f$with$2d$schema$2d$transformer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/plugin/with-schema/with-schema-transformer.js [app-route] (ecmascript)");
;
class WithSchemaPlugin {
    #transformer;
    constructor(schema){
        this.#transformer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$plugin$2f$with$2d$schema$2f$with$2d$schema$2d$transformer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WithSchemaTransformer"](schema);
    }
    transformQuery(args) {
        return this.#transformer.transformNode(args.node, args.queryId);
    }
    async transformResult(args) {
        return args.result;
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/plugin/immediate-value/immediate-value-transformer.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./immediate-value-transformer.d.ts" />
__turbopack_context__.s([
    "ImmediateValueTransformer",
    ()=>ImmediateValueTransformer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$operation$2d$node$2d$transformer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/operation-node-transformer.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$value$2d$list$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/value-list-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$value$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/value-node.js [app-route] (ecmascript)");
;
;
;
class ImmediateValueTransformer extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$operation$2d$node$2d$transformer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OperationNodeTransformer"] {
    transformPrimitiveValueList(node) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$value$2d$list$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ValueListNode"].create(node.values.map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$value$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ValueNode"].createImmediate));
    }
    transformValue(node) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$value$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ValueNode"].createImmediate(node.value);
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/plugin/immediate-value/immediate-value-plugin.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./immediate-value-plugin.d.ts" />
__turbopack_context__.s([
    "ImmediateValuePlugin",
    ()=>ImmediateValuePlugin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$plugin$2f$immediate$2d$value$2f$immediate$2d$value$2d$transformer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/plugin/immediate-value/immediate-value-transformer.js [app-route] (ecmascript)");
;
class ImmediateValuePlugin {
    #transformer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$plugin$2f$immediate$2d$value$2f$immediate$2d$value$2d$transformer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ImmediateValueTransformer"]();
    transformQuery(args) {
        return this.#transformer.transformNode(args.node, args.queryId);
    }
    transformResult(args) {
        return Promise.resolve(args.result);
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/migration/migrator.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./migrator.d.ts" />
__turbopack_context__.s([
    "DEFAULT_ALLOW_UNORDERED_MIGRATIONS",
    ()=>DEFAULT_ALLOW_UNORDERED_MIGRATIONS,
    "DEFAULT_MIGRATION_LOCK_TABLE",
    ()=>DEFAULT_MIGRATION_LOCK_TABLE,
    "DEFAULT_MIGRATION_TABLE",
    ()=>DEFAULT_MIGRATION_TABLE,
    "MIGRATION_LOCK_ID",
    ()=>MIGRATION_LOCK_ID,
    "Migrator",
    ()=>Migrator,
    "NO_MIGRATIONS",
    ()=>NO_MIGRATIONS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$plugin$2f$noop$2d$plugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/plugin/noop-plugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$plugin$2f$with$2d$schema$2f$with$2d$schema$2d$plugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/plugin/with-schema/with-schema-plugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
;
;
;
const DEFAULT_MIGRATION_TABLE = 'kysely_migration';
const DEFAULT_MIGRATION_LOCK_TABLE = 'kysely_migration_lock';
const DEFAULT_ALLOW_UNORDERED_MIGRATIONS = false;
const MIGRATION_LOCK_ID = 'migration_lock';
const NO_MIGRATIONS = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])({
    __noMigrations__: true
});
class Migrator {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    /**
     * Returns a {@link MigrationInfo} object for each migration.
     *
     * The returned array is sorted by migration name.
     */ async getMigrations() {
        const executedMigrations = await this.#doesTableExists(this.#migrationTable) ? await this.#props.db.withPlugin(this.#schemaPlugin).selectFrom(this.#migrationTable).select([
            'name',
            'timestamp'
        ]).$narrowType().execute() : [];
        const migrations = await this.#resolveMigrations();
        return migrations.map(({ name, ...migration })=>{
            const executed = executedMigrations.find((it)=>it.name === name);
            return {
                name,
                migration,
                executedAt: executed ? new Date(executed.timestamp) : undefined
            };
        });
    }
    /**
     * Runs all migrations that have not yet been run.
     *
     * This method returns a {@link MigrationResultSet} instance and _never_ throws.
     * {@link MigrationResultSet.error} holds the error if something went wrong.
     * {@link MigrationResultSet.results} contains information about which migrations
     * were executed and which failed. See the examples below.
     *
     * This method goes through all possible migrations provided by the provider and runs the
     * ones whose names come alphabetically after the last migration that has been run. If the
     * list of executed migrations doesn't match the beginning of the list of possible migrations
     * an error is returned.
     *
     * ### Examples
     *
     * ```ts
     * import { promises as fs } from 'node:fs'
     * import path from 'node:path'
     * import * as Sqlite from 'better-sqlite3'
     * import { FileMigrationProvider, Migrator } from 'kysely'
     *
     * const migrator = new Migrator({
     *   db,
     *   provider: new FileMigrationProvider({
     *     fs,
     *     migrationFolder: 'some/path/to/migrations',
     *     path,
     *   })
     * })
     *
     * const { error, results } = await migrator.migrateToLatest()
     *
     * results?.forEach((it) => {
     *   if (it.status === 'Success') {
     *     console.log(`migration "${it.migrationName}" was executed successfully`)
     *   } else if (it.status === 'Error') {
     *     console.error(`failed to execute migration "${it.migrationName}"`)
     *   }
     * })
     *
     * if (error) {
     *   console.error('failed to run `migrateToLatest`')
     *   console.error(error)
     * }
     * ```
     */ async migrateToLatest() {
        return this.#migrate(()=>({
                direction: 'Up',
                step: Infinity
            }));
    }
    /**
     * Migrate up/down to a specific migration.
     *
     * This method returns a {@link MigrationResultSet} instance and _never_ throws.
     * {@link MigrationResultSet.error} holds the error if something went wrong.
     * {@link MigrationResultSet.results} contains information about which migrations
     * were executed and which failed.
     *
     * ### Examples
     *
     * ```ts
     * import { promises as fs } from 'node:fs'
     * import path from 'node:path'
     * import { FileMigrationProvider, Migrator } from 'kysely'
     *
     * const migrator = new Migrator({
     *   db,
     *   provider: new FileMigrationProvider({
     *     fs,
     *     // Path to the folder that contains all your migrations.
     *     migrationFolder: 'some/path/to/migrations',
     *     path,
     *   })
     * })
     *
     * await migrator.migrateTo('some_migration')
     * ```
     *
     * If you specify the name of the first migration, this method migrates
     * down to the first migration, but doesn't run the `down` method of
     * the first migration. In case you want to migrate all the way down,
     * you can use a special constant `NO_MIGRATIONS`:
     *
     * ```ts
     * import { promises as fs } from 'node:fs'
     * import path from 'node:path'
     * import { FileMigrationProvider, Migrator, NO_MIGRATIONS } from 'kysely'
     *
     * const migrator = new Migrator({
     *   db,
     *   provider: new FileMigrationProvider({
     *     fs,
     *     // Path to the folder that contains all your migrations.
     *     migrationFolder: 'some/path/to/migrations',
     *     path,
     *   })
     * })
     *
     * await migrator.migrateTo(NO_MIGRATIONS)
     * ```
     */ async migrateTo(targetMigrationName) {
        return this.#migrate(({ migrations, executedMigrations, pendingMigrations })=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isObject"])(targetMigrationName) && targetMigrationName.__noMigrations__ === true) {
                return {
                    direction: 'Down',
                    step: Infinity
                };
            }
            if (!migrations.find((m)=>m.name === targetMigrationName)) {
                throw new Error(`migration "${targetMigrationName}" doesn't exist`);
            }
            const executedIndex = executedMigrations.indexOf(targetMigrationName);
            const pendingIndex = pendingMigrations.findIndex((m)=>m.name === targetMigrationName);
            if (executedIndex !== -1) {
                return {
                    direction: 'Down',
                    step: executedMigrations.length - executedIndex - 1
                };
            } else if (pendingIndex !== -1) {
                return {
                    direction: 'Up',
                    step: pendingIndex + 1
                };
            } else {
                throw new Error(`migration "${targetMigrationName}" isn't executed or pending`);
            }
        });
    }
    /**
     * Migrate one step up.
     *
     * This method returns a {@link MigrationResultSet} instance and _never_ throws.
     * {@link MigrationResultSet.error} holds the error if something went wrong.
     * {@link MigrationResultSet.results} contains information about which migrations
     * were executed and which failed.
     *
     * ### Examples
     *
     * ```ts
     * import { promises as fs } from 'node:fs'
     * import path from 'node:path'
     * import { FileMigrationProvider, Migrator } from 'kysely'
     *
     * const migrator = new Migrator({
     *   db,
     *   provider: new FileMigrationProvider({
     *     fs,
     *     // Path to the folder that contains all your migrations.
     *     migrationFolder: 'some/path/to/migrations',
     *     path,
     *   })
     * })
     *
     * await migrator.migrateUp()
     * ```
     */ async migrateUp() {
        return this.#migrate(()=>({
                direction: 'Up',
                step: 1
            }));
    }
    /**
     * Migrate one step down.
     *
     * This method returns a {@link MigrationResultSet} instance and _never_ throws.
     * {@link MigrationResultSet.error} holds the error if something went wrong.
     * {@link MigrationResultSet.results} contains information about which migrations
     * were executed and which failed.
     *
     * ### Examples
     *
     * ```ts
     * import { promises as fs } from 'node:fs'
     * import path from 'node:path'
     * import { FileMigrationProvider, Migrator } from 'kysely'
     *
     * const migrator = new Migrator({
     *   db,
     *   provider: new FileMigrationProvider({
     *     fs,
     *     // Path to the folder that contains all your migrations.
     *     migrationFolder: 'some/path/to/migrations',
     *     path,
     *   })
     * })
     *
     * await migrator.migrateDown()
     * ```
     */ async migrateDown() {
        return this.#migrate(()=>({
                direction: 'Down',
                step: 1
            }));
    }
    async #migrate(getMigrationDirectionAndStep) {
        try {
            await this.#ensureMigrationTablesExists();
            return await this.#runMigrations(getMigrationDirectionAndStep);
        } catch (error) {
            if (error instanceof MigrationResultSetError) {
                return error.resultSet;
            }
            return {
                error
            };
        }
    }
    get #migrationTableSchema() {
        return this.#props.migrationTableSchema;
    }
    get #migrationTable() {
        return this.#props.migrationTableName ?? DEFAULT_MIGRATION_TABLE;
    }
    get #migrationLockTable() {
        return this.#props.migrationLockTableName ?? DEFAULT_MIGRATION_LOCK_TABLE;
    }
    get #allowUnorderedMigrations() {
        return this.#props.allowUnorderedMigrations ?? DEFAULT_ALLOW_UNORDERED_MIGRATIONS;
    }
    get #schemaPlugin() {
        if (this.#migrationTableSchema) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$plugin$2f$with$2d$schema$2f$with$2d$schema$2d$plugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WithSchemaPlugin"](this.#migrationTableSchema);
        }
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$plugin$2f$noop$2d$plugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NoopPlugin"]();
    }
    async #ensureMigrationTablesExists() {
        await this.#ensureMigrationTableSchemaExists();
        await this.#ensureMigrationTableExists();
        await this.#ensureMigrationLockTableExists();
        await this.#ensureLockRowExists();
    }
    async #ensureMigrationTableSchemaExists() {
        if (!this.#migrationTableSchema) {
            // Use default schema. Nothing to do.
            return;
        }
        if (!await this.#doesSchemaExists()) {
            try {
                await this.#createIfNotExists(this.#props.db.schema.createSchema(this.#migrationTableSchema));
            } catch (error) {
                // At least on PostgreSQL, `if not exists` doesn't guarantee the `create schema`
                // query doesn't throw if the schema already exits. That's why we check if
                // the schema exist here and ignore the error if it does.
                if (!await this.#doesSchemaExists()) {
                    throw error;
                }
            }
        }
    }
    async #ensureMigrationTableExists() {
        if (!await this.#doesTableExists(this.#migrationTable)) {
            try {
                if (this.#migrationTableSchema) {
                    await this.#createIfNotExists(this.#props.db.schema.createSchema(this.#migrationTableSchema));
                }
                await this.#createIfNotExists(this.#props.db.schema.withPlugin(this.#schemaPlugin).createTable(this.#migrationTable).addColumn('name', 'varchar(255)', (col)=>col.notNull().primaryKey())// The migration run time as ISO string. This is not a real date type as we
                // can't know which data type is supported by all future dialects.
                .addColumn('timestamp', 'varchar(255)', (col)=>col.notNull()));
            } catch (error) {
                // At least on PostgreSQL, `if not exists` doesn't guarantee the `create table`
                // query doesn't throw if the table already exits. That's why we check if
                // the table exist here and ignore the error if it does.
                if (!await this.#doesTableExists(this.#migrationTable)) {
                    throw error;
                }
            }
        }
    }
    async #ensureMigrationLockTableExists() {
        if (!await this.#doesTableExists(this.#migrationLockTable)) {
            try {
                await this.#createIfNotExists(this.#props.db.schema.withPlugin(this.#schemaPlugin).createTable(this.#migrationLockTable).addColumn('id', 'varchar(255)', (col)=>col.notNull().primaryKey()).addColumn('is_locked', 'integer', (col)=>col.notNull().defaultTo(0)));
            } catch (error) {
                // At least on PostgreSQL, `if not exists` doesn't guarantee the `create table`
                // query doesn't throw if the table already exits. That's why we check if
                // the table exist here and ignore the error if it does.
                if (!await this.#doesTableExists(this.#migrationLockTable)) {
                    throw error;
                }
            }
        }
    }
    async #ensureLockRowExists() {
        if (!await this.#doesLockRowExists()) {
            try {
                await this.#props.db.withPlugin(this.#schemaPlugin).insertInto(this.#migrationLockTable).values({
                    id: MIGRATION_LOCK_ID,
                    is_locked: 0
                }).execute();
            } catch (error) {
                if (!await this.#doesLockRowExists()) {
                    throw error;
                }
            }
        }
    }
    async #doesSchemaExists() {
        const schemas = await this.#props.db.introspection.getSchemas();
        return schemas.some((it)=>it.name === this.#migrationTableSchema);
    }
    async #doesTableExists(tableName) {
        const schema = this.#migrationTableSchema;
        const tables = await this.#props.db.introspection.getTables({
            withInternalKyselyTables: true
        });
        return tables.some((it)=>it.name === tableName && (!schema || it.schema === schema));
    }
    async #doesLockRowExists() {
        const lockRow = await this.#props.db.withPlugin(this.#schemaPlugin).selectFrom(this.#migrationLockTable).where('id', '=', MIGRATION_LOCK_ID).select('id').executeTakeFirst();
        return !!lockRow;
    }
    async #runMigrations(getMigrationDirectionAndStep) {
        const adapter = this.#props.db.getExecutor().adapter;
        const lockOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])({
            lockTable: this.#props.migrationLockTableName ?? DEFAULT_MIGRATION_LOCK_TABLE,
            lockRowId: MIGRATION_LOCK_ID,
            lockTableSchema: this.#props.migrationTableSchema
        });
        const run = async (db)=>{
            try {
                await adapter.acquireMigrationLock(db, lockOptions);
                const state = await this.#getState(db);
                if (state.migrations.length === 0) {
                    return {
                        results: []
                    };
                }
                const { direction, step } = getMigrationDirectionAndStep(state);
                if (step <= 0) {
                    return {
                        results: []
                    };
                }
                if (direction === 'Down') {
                    return await this.#migrateDown(db, state, step);
                } else if (direction === 'Up') {
                    return await this.#migrateUp(db, state, step);
                }
                return {
                    results: []
                };
            } finally{
                await adapter.releaseMigrationLock(db, lockOptions);
            }
        };
        if (adapter.supportsTransactionalDdl && !this.#props.disableTransactions) {
            return this.#props.db.transaction().execute(run);
        } else {
            return this.#props.db.connection().execute(run);
        }
    }
    async #getState(db) {
        const migrations = await this.#resolveMigrations();
        const executedMigrations = await this.#getExecutedMigrations(db);
        this.#ensureNoMissingMigrations(migrations, executedMigrations);
        if (!this.#allowUnorderedMigrations) {
            this.#ensureMigrationsInOrder(migrations, executedMigrations);
        }
        const pendingMigrations = this.#getPendingMigrations(migrations, executedMigrations);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])({
            migrations,
            executedMigrations,
            lastMigration: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLast"])(executedMigrations),
            pendingMigrations
        });
    }
    #getPendingMigrations(migrations, executedMigrations) {
        return migrations.filter((migration)=>{
            return !executedMigrations.includes(migration.name);
        });
    }
    async #resolveMigrations() {
        const allMigrations = await this.#props.provider.getMigrations();
        return Object.keys(allMigrations).sort().map((name)=>({
                ...allMigrations[name],
                name
            }));
    }
    async #getExecutedMigrations(db) {
        const executedMigrations = await db.withPlugin(this.#schemaPlugin).selectFrom(this.#migrationTable).select([
            'name',
            'timestamp'
        ]).$narrowType().execute();
        const nameComparator = this.#props.nameComparator || ((a, b)=>a.localeCompare(b));
        return executedMigrations// https://github.com/kysely-org/kysely/issues/843
        .sort((a, b)=>{
            if (a.timestamp === b.timestamp) {
                return nameComparator(a.name, b.name);
            }
            return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        }).map((it)=>it.name);
    }
    #ensureNoMissingMigrations(migrations, executedMigrations) {
        // Ensure all executed migrations exist in the `migrations` list.
        for (const executed of executedMigrations){
            if (!migrations.some((it)=>it.name === executed)) {
                throw new Error(`corrupted migrations: previously executed migration ${executed} is missing`);
            }
        }
    }
    #ensureMigrationsInOrder(migrations, executedMigrations) {
        // Ensure the executed migrations are the first ones in the migration list.
        for(let i = 0; i < executedMigrations.length; ++i){
            if (migrations[i].name !== executedMigrations[i]) {
                throw new Error(`corrupted migrations: expected previously executed migration ${executedMigrations[i]} to be at index ${i} but ${migrations[i].name} was found in its place. New migrations must always have a name that comes alphabetically after the last executed migration.`);
            }
        }
    }
    async #migrateDown(db, state, step) {
        const migrationsToRollback = state.executedMigrations.slice().reverse().slice(0, step).map((name)=>{
            return state.migrations.find((it)=>it.name === name);
        });
        const results = migrationsToRollback.map((migration)=>{
            return {
                migrationName: migration.name,
                direction: 'Down',
                status: 'NotExecuted'
            };
        });
        for(let i = 0; i < results.length; ++i){
            const migration = migrationsToRollback[i];
            try {
                if (migration.down) {
                    await migration.down(db);
                    await db.withPlugin(this.#schemaPlugin).deleteFrom(this.#migrationTable).where('name', '=', migration.name).execute();
                    results[i] = {
                        migrationName: migration.name,
                        direction: 'Down',
                        status: 'Success'
                    };
                }
            } catch (error) {
                results[i] = {
                    migrationName: migration.name,
                    direction: 'Down',
                    status: 'Error'
                };
                throw new MigrationResultSetError({
                    error,
                    results
                });
            }
        }
        return {
            results
        };
    }
    async #migrateUp(db, state, step) {
        const migrationsToRun = state.pendingMigrations.slice(0, step);
        const results = migrationsToRun.map((migration)=>{
            return {
                migrationName: migration.name,
                direction: 'Up',
                status: 'NotExecuted'
            };
        });
        for(let i = 0; i < results.length; i++){
            const migration = state.pendingMigrations[i];
            try {
                await migration.up(db);
                await db.withPlugin(this.#schemaPlugin).insertInto(this.#migrationTable).values({
                    name: migration.name,
                    timestamp: new Date().toISOString()
                }).execute();
                results[i] = {
                    migrationName: migration.name,
                    direction: 'Up',
                    status: 'Success'
                };
            } catch (error) {
                results[i] = {
                    migrationName: migration.name,
                    direction: 'Up',
                    status: 'Error'
                };
                throw new MigrationResultSetError({
                    error,
                    results
                });
            }
        }
        return {
            results
        };
    }
    async #createIfNotExists(qb) {
        if (this.#props.db.getExecutor().adapter.supportsCreateIfNotExists) {
            qb = qb.ifNotExists();
        }
        await qb.execute();
    }
}
class MigrationResultSetError extends Error {
    #resultSet;
    constructor(result){
        super();
        this.#resultSet = result;
    }
    get resultSet() {
        return this.#resultSet;
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/expression/expression.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./expression.d.ts" />
__turbopack_context__.s([
    "isAliasedExpression",
    ()=>isAliasedExpression,
    "isExpression",
    ()=>isExpression
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$operation$2d$node$2d$source$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/operation-node-source.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
;
;
function isExpression(obj) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isObject"])(obj) && 'expressionType' in obj && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$operation$2d$node$2d$source$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isOperationNodeSource"])(obj);
}
function isAliasedExpression(obj) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isObject"])(obj) && 'expression' in obj && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isString"])(obj.alias) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$operation$2d$node$2d$source$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isOperationNodeSource"])(obj);
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/expression/expression-wrapper.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./expression-wrapper.d.ts" />
__turbopack_context__.s([
    "AliasedExpressionWrapper",
    ()=>AliasedExpressionWrapper,
    "AndWrapper",
    ()=>AndWrapper,
    "ExpressionWrapper",
    ()=>ExpressionWrapper,
    "OrWrapper",
    ()=>OrWrapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alias$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/alias-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$and$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/and-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$identifier$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/identifier-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$operation$2d$node$2d$source$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/operation-node-source.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$or$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/or-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$parens$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/parens-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/binary-operation-parser.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
class ExpressionWrapper {
    #node;
    constructor(node){
        this.#node = node;
    }
    /** @private */ get expressionType() {
        return undefined;
    }
    as(alias) {
        return new AliasedExpressionWrapper(this, alias);
    }
    or(...args) {
        return new OrWrapper(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$or$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OrNode"].create(this.#node, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseValueBinaryOperationOrExpression"])(args)));
    }
    and(...args) {
        return new AndWrapper(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$and$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AndNode"].create(this.#node, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseValueBinaryOperationOrExpression"])(args)));
    }
    /**
     * Change the output type of the expression.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `ExpressionWrapper` with a new output type.
     */ $castTo() {
        return new ExpressionWrapper(this.#node);
    }
    /**
     * Omit null from the expression's type.
     *
     * This function can be useful in cases where you know an expression can't be
     * null, but Kysely is unable to infer it.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of `this` with a new output type.
     */ $notNull() {
        return new ExpressionWrapper(this.#node);
    }
    toOperationNode() {
        return this.#node;
    }
}
class AliasedExpressionWrapper {
    #expr;
    #alias;
    constructor(expr, alias){
        this.#expr = expr;
        this.#alias = alias;
    }
    /** @private */ get expression() {
        return this.#expr;
    }
    /** @private */ get alias() {
        return this.#alias;
    }
    toOperationNode() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alias$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AliasNode"].create(this.#expr.toOperationNode(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$operation$2d$node$2d$source$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isOperationNodeSource"])(this.#alias) ? this.#alias.toOperationNode() : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$identifier$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IdentifierNode"].create(this.#alias));
    }
}
class OrWrapper {
    #node;
    constructor(node){
        this.#node = node;
    }
    /** @private */ get expressionType() {
        return undefined;
    }
    as(alias) {
        return new AliasedExpressionWrapper(this, alias);
    }
    or(...args) {
        return new OrWrapper(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$or$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OrNode"].create(this.#node, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseValueBinaryOperationOrExpression"])(args)));
    }
    /**
     * Change the output type of the expression.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `OrWrapper` with a new output type.
     */ $castTo() {
        return new OrWrapper(this.#node);
    }
    toOperationNode() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$parens$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ParensNode"].create(this.#node);
    }
}
class AndWrapper {
    #node;
    constructor(node){
        this.#node = node;
    }
    /** @private */ get expressionType() {
        return undefined;
    }
    as(alias) {
        return new AliasedExpressionWrapper(this, alias);
    }
    and(...args) {
        return new AndWrapper(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$and$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AndNode"].create(this.#node, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseValueBinaryOperationOrExpression"])(args)));
    }
    /**
     * Change the output type of the expression.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `AndWrapper` with a new output type.
     */ $castTo() {
        return new AndWrapper(this.#node);
    }
    toOperationNode() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$parens$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ParensNode"].create(this.#node);
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/expression/expression-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./expression-builder.d.ts" />
__turbopack_context__.s([
    "createExpressionBuilder",
    ()=>createExpressionBuilder,
    "expressionBuilder",
    ()=>expressionBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$select$2d$query$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/select-query-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/select-query-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/table-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$plugin$2f$with$2d$schema$2f$with$2d$schema$2d$plugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/plugin/with-schema/with-schema-plugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/query-id.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$function$2d$module$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/function-module.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$reference$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/reference-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/binary-operation-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$parens$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/parens-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$expression$2f$expression$2d$wrapper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/expression/expression-wrapper.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$operator$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/operator-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$unary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/unary-operation-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$value$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/value-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$executor$2f$noop$2d$query$2d$executor$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-executor/noop-query-executor.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$case$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/case-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$case$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/case-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$json$2d$path$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/json-path-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$binary$2d$operation$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/binary-operation-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$and$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/and-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$tuple$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/tuple-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$json$2d$path$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/json-path-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$data$2d$type$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/data-type-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$cast$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/cast-node.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function createExpressionBuilder(executor = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$executor$2f$noop$2d$query$2d$executor$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NOOP_QUERY_EXECUTOR"]) {
    function binary(lhs, op, rhs) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$expression$2f$expression$2d$wrapper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExpressionWrapper"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseValueBinaryOperation"])(lhs, op, rhs));
    }
    function unary(op, expr) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$expression$2f$expression$2d$wrapper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExpressionWrapper"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$unary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseUnaryOperation"])(op, expr));
    }
    const eb = Object.assign(binary, {
        fn: undefined,
        eb: undefined,
        selectFrom (table) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$select$2d$query$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createSelectQueryBuilder"])({
                queryId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])(),
                executor,
                queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectQueryNode"].createFrom((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseTableExpressionOrList"])(table))
            });
        },
        case (reference) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$case$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CaseBuilder"]({
                node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$case$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CaseNode"].create((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isUndefined"])(reference) ? undefined : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$reference$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseReferenceExpression"])(reference))
            });
        },
        ref (reference, op) {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isUndefined"])(op)) {
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$expression$2f$expression$2d$wrapper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExpressionWrapper"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$reference$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseStringReference"])(reference));
            }
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$json$2d$path$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JSONPathBuilder"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$reference$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseJSONReference"])(reference, op));
        },
        jsonPath () {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$json$2d$path$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JSONPathBuilder"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$json$2d$path$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JSONPathNode"].create());
        },
        table (table) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$expression$2f$expression$2d$wrapper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExpressionWrapper"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseTable"])(table));
        },
        val (value) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$expression$2f$expression$2d$wrapper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExpressionWrapper"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$value$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseValueExpression"])(value));
        },
        refTuple (...values) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$expression$2f$expression$2d$wrapper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExpressionWrapper"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$tuple$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TupleNode"].create(values.map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$reference$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseReferenceExpression"])));
        },
        tuple (...values) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$expression$2f$expression$2d$wrapper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExpressionWrapper"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$tuple$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TupleNode"].create(values.map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$value$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseValueExpression"])));
        },
        lit (value) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$expression$2f$expression$2d$wrapper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExpressionWrapper"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$value$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSafeImmediateValue"])(value));
        },
        unary,
        not (expr) {
            return unary('not', expr);
        },
        exists (expr) {
            return unary('exists', expr);
        },
        neg (expr) {
            return unary('-', expr);
        },
        between (expr, start, end) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$expression$2f$expression$2d$wrapper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExpressionWrapper"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$binary$2d$operation$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BinaryOperationNode"].create((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$reference$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseReferenceExpression"])(expr), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$operator$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OperatorNode"].create('between'), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$and$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AndNode"].create((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$value$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseValueExpression"])(start), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$value$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseValueExpression"])(end))));
        },
        betweenSymmetric (expr, start, end) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$expression$2f$expression$2d$wrapper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExpressionWrapper"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$binary$2d$operation$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BinaryOperationNode"].create((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$reference$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseReferenceExpression"])(expr), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$operator$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OperatorNode"].create('between symmetric'), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$and$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AndNode"].create((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$value$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseValueExpression"])(start), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$value$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseValueExpression"])(end))));
        },
        and (exprs) {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isReadonlyArray"])(exprs)) {
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$expression$2f$expression$2d$wrapper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExpressionWrapper"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseFilterList"])(exprs, 'and'));
            }
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$expression$2f$expression$2d$wrapper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExpressionWrapper"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseFilterObject"])(exprs, 'and'));
        },
        or (exprs) {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isReadonlyArray"])(exprs)) {
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$expression$2f$expression$2d$wrapper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExpressionWrapper"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseFilterList"])(exprs, 'or'));
            }
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$expression$2f$expression$2d$wrapper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExpressionWrapper"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseFilterObject"])(exprs, 'or'));
        },
        parens (...args) {
            const node = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseValueBinaryOperationOrExpression"])(args);
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$parens$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ParensNode"].is(node)) {
                // No double wrapping.
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$expression$2f$expression$2d$wrapper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExpressionWrapper"](node);
            } else {
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$expression$2f$expression$2d$wrapper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExpressionWrapper"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$parens$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ParensNode"].create(node));
            }
        },
        cast (expr, dataType) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$expression$2f$expression$2d$wrapper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExpressionWrapper"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$cast$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CastNode"].create((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$reference$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseReferenceExpression"])(expr), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$data$2d$type$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDataTypeExpression"])(dataType)));
        },
        withSchema (schema) {
            return createExpressionBuilder(executor.withPluginAtFront(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$plugin$2f$with$2d$schema$2f$with$2d$schema$2d$plugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WithSchemaPlugin"](schema)));
        }
    });
    eb.fn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$function$2d$module$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createFunctionModule"])();
    eb.eb = eb;
    return eb;
}
function expressionBuilder(_) {
    return createExpressionBuilder();
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dynamic/dynamic-reference-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./dynamic-reference-builder.d.ts" />
__turbopack_context__.s([
    "DynamicReferenceBuilder",
    ()=>DynamicReferenceBuilder,
    "isDynamicReferenceBuilder",
    ()=>isDynamicReferenceBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$operation$2d$node$2d$source$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/operation-node-source.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$reference$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/reference-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
;
;
;
class DynamicReferenceBuilder {
    #dynamicReference;
    get dynamicReference() {
        return this.#dynamicReference;
    }
    /**
     * @private
     *
     * This needs to be here just so that the typings work. Without this
     * the generated .d.ts file contains no reference to the type param R
     * which causes this type to be equal to DynamicReferenceBuilder with
     * any R.
     */ get refType() {
        return undefined;
    }
    constructor(reference){
        this.#dynamicReference = reference;
    }
    toOperationNode() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$reference$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSimpleReferenceExpression"])(this.#dynamicReference);
    }
}
function isDynamicReferenceBuilder(obj) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isObject"])(obj) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$operation$2d$node$2d$source$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isOperationNodeSource"])(obj) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isString"])(obj.dynamicReference);
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dynamic/dynamic-table-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./dynamic-table-builder.d.ts" />
__turbopack_context__.s([
    "AliasedDynamicTableBuilder",
    ()=>AliasedDynamicTableBuilder,
    "DynamicTableBuilder",
    ()=>DynamicTableBuilder,
    "isAliasedDynamicTableBuilder",
    ()=>isAliasedDynamicTableBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alias$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/alias-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$identifier$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/identifier-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$operation$2d$node$2d$source$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/operation-node-source.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/table-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
;
;
;
;
;
class DynamicTableBuilder {
    #table;
    get table() {
        return this.#table;
    }
    constructor(table){
        this.#table = table;
    }
    as(alias) {
        return new AliasedDynamicTableBuilder(this.#table, alias);
    }
}
class AliasedDynamicTableBuilder {
    #table;
    #alias;
    get table() {
        return this.#table;
    }
    get alias() {
        return this.#alias;
    }
    constructor(table, alias){
        this.#table = table;
        this.#alias = alias;
    }
    toOperationNode() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alias$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AliasNode"].create((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseTable"])(this.#table), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$identifier$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IdentifierNode"].create(this.#alias));
    }
}
function isAliasedDynamicTableBuilder(obj) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isObject"])(obj) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$operation$2d$node$2d$source$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isOperationNodeSource"])(obj) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isString"])(obj.table) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isString"])(obj.alias);
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dynamic/dynamic.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./dynamic.d.ts" />
__turbopack_context__.s([
    "DynamicModule",
    ()=>DynamicModule
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dynamic$2f$dynamic$2d$reference$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dynamic/dynamic-reference-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dynamic$2f$dynamic$2d$table$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dynamic/dynamic-table-builder.js [app-route] (ecmascript)");
;
;
class DynamicModule {
    /**
     * Creates a dynamic reference to a column that is not know at compile time.
     *
     * Kysely is built in a way that by default you can't refer to tables or columns
     * that are not actually visible in the current query and context. This is all
     * done by TypeScript at compile time, which means that you need to know the
     * columns and tables at compile time. This is not always the case of course.
     *
     * This method is meant to be used in those cases where the column names
     * come from the user input or are not otherwise known at compile time.
     *
     * WARNING! Unlike values, column names are not escaped by the database engine
     * or Kysely and if you pass in unchecked column names using this method, you
     * create an SQL injection vulnerability. Always __always__ validate the user
     * input before passing it to this method.
     *
     * There are couple of examples below for some use cases, but you can pass
     * `ref` to other methods as well. If the types allow you to pass a `ref`
     * value to some place, it should work.
     *
     * ### Examples
     *
     * Filter by a column not know at compile time:
     *
     * ```ts
     * async function someQuery(filterColumn: string, filterValue: string) {
     *   const { ref } = db.dynamic
     *
     *   return await db
     *     .selectFrom('person')
     *     .selectAll()
     *     .where(ref(filterColumn), '=', filterValue)
     *     .execute()
     * }
     *
     * someQuery('first_name', 'Arnold')
     * someQuery('person.last_name', 'Aniston')
     * ```
     *
     * Order by a column not know at compile time:
     *
     * ```ts
     * async function someQuery(orderBy: string) {
     *   const { ref } = db.dynamic
     *
     *   return await db
     *     .selectFrom('person')
     *     .select('person.first_name as fn')
     *     .orderBy(ref(orderBy))
     *     .execute()
     * }
     *
     * someQuery('fn')
     * ```
     *
     * In this example we add selections dynamically:
     *
     * ```ts
     * const { ref } = db.dynamic
     *
     * // Some column name provided by the user. Value not known at compile time.
     * const columnFromUserInput: PossibleColumns = 'birthdate';
     *
     * // A type that lists all possible values `columnFromUserInput` can have.
     * // You can use `keyof Person` if any column of an interface is allowed.
     * type PossibleColumns = 'last_name' | 'first_name' | 'birthdate'
     *
     * const [person] = await db.selectFrom('person')
     *   .select([
     *     ref<PossibleColumns>(columnFromUserInput),
     *     'id'
     *   ])
     *   .execute()
     *
     * // The resulting type contains all `PossibleColumns` as optional fields
     * // because we cannot know which field was actually selected before
     * // running the code.
     * const lastName: string | null | undefined = person?.last_name
     * const firstName: string | undefined = person?.first_name
     * const birthDate: Date | null | undefined = person?.birthdate
     *
     * // The result type also contains the compile time selection `id`.
     * person?.id
     * ```
     */ ref(reference) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dynamic$2f$dynamic$2d$reference$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DynamicReferenceBuilder"](reference);
    }
    /**
     * Creates a table reference to a table that's not fully known at compile time.
     *
     * The type `T` is allowed to be a union of multiple tables.
     *
     * <!-- siteExample("select", "Generic find query", 130) -->
     *
     * A generic type-safe helper function for finding a row by a column value:
     *
     * ```ts
     * import { SelectType } from 'kysely'
     * import { Database } from 'type-editor'
     *
     * async function getRowByColumn<
     *   T extends keyof Database,
     *   C extends keyof Database[T] & string,
     *   V extends SelectType<Database[T][C]>,
     * >(t: T, c: C, v: V) {
     *   // We need to use the dynamic module since the table name
     *   // is not known at compile time.
     *   const { table, ref } = db.dynamic
     *
     *   return await db
     *     .selectFrom(table(t).as('t'))
     *     .selectAll()
     *     .where(ref(c), '=', v)
     *     .orderBy('t.id')
     *     .executeTakeFirstOrThrow()
     * }
     *
     * const person = await getRowByColumn('person', 'first_name', 'Arnold')
     * ```
     */ table(table) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dynamic$2f$dynamic$2d$table$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DynamicTableBuilder"](table);
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-executor/query-executor-base.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./query-executor-base.d.ts" />
__turbopack_context__.s([
    "QueryExecutorBase",
    ()=>QueryExecutorBase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$provide$2d$controlled$2d$connection$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/provide-controlled-connection.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$log$2d$once$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/log-once.js [app-route] (ecmascript)");
;
;
;
const NO_PLUGINS = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])([]);
class QueryExecutorBase {
    #plugins;
    constructor(plugins = NO_PLUGINS){
        this.#plugins = plugins;
    }
    get plugins() {
        return this.#plugins;
    }
    transformQuery(node, queryId) {
        for (const plugin of this.#plugins){
            const transformedNode = plugin.transformQuery({
                node,
                queryId
            });
            // We need to do a runtime check here. There is no good way
            // to write types that enforce this constraint.
            if (transformedNode.kind === node.kind) {
                node = transformedNode;
            } else {
                throw new Error([
                    `KyselyPlugin.transformQuery must return a node`,
                    `of the same kind that was given to it.`,
                    `The plugin was given a ${node.kind}`,
                    `but it returned a ${transformedNode.kind}`
                ].join(' '));
            }
        }
        return node;
    }
    async executeQuery(compiledQuery) {
        return await this.provideConnection(async (connection)=>{
            const result = await connection.executeQuery(compiledQuery);
            if ('numUpdatedOrDeletedRows' in result) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$log$2d$once$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logOnce"])('kysely:warning: outdated driver/plugin detected! `QueryResult.numUpdatedOrDeletedRows` has been replaced with `QueryResult.numAffectedRows`.');
            }
            return await this.#transformResult(result, compiledQuery.queryId);
        });
    }
    async *stream(compiledQuery, chunkSize) {
        const { connection, release } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$provide$2d$controlled$2d$connection$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["provideControlledConnection"])(this);
        try {
            for await (const result of connection.streamQuery(compiledQuery, chunkSize)){
                yield await this.#transformResult(result, compiledQuery.queryId);
            }
        } finally{
            release();
        }
    }
    async #transformResult(result, queryId) {
        for (const plugin of this.#plugins){
            result = await plugin.transformResult({
                result,
                queryId
            });
        }
        return result;
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-executor/noop-query-executor.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./noop-query-executor.d.ts" />
__turbopack_context__.s([
    "NOOP_QUERY_EXECUTOR",
    ()=>NOOP_QUERY_EXECUTOR,
    "NoopQueryExecutor",
    ()=>NoopQueryExecutor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$executor$2f$query$2d$executor$2d$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-executor/query-executor-base.js [app-route] (ecmascript)");
;
class NoopQueryExecutor extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$executor$2f$query$2d$executor$2d$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryExecutorBase"] {
    get adapter() {
        throw new Error('this query cannot be compiled to SQL');
    }
    compileQuery() {
        throw new Error('this query cannot be compiled to SQL');
    }
    provideConnection() {
        throw new Error('this query cannot be executed');
    }
    withConnectionProvider() {
        throw new Error('this query cannot have a connection provider');
    }
    withPlugin(plugin) {
        return new NoopQueryExecutor([
            ...this.plugins,
            plugin
        ]);
    }
    withPlugins(plugins) {
        return new NoopQueryExecutor([
            ...this.plugins,
            ...plugins
        ]);
    }
    withPluginAtFront(plugin) {
        return new NoopQueryExecutor([
            plugin,
            ...this.plugins
        ]);
    }
    withoutPlugins() {
        return new NoopQueryExecutor([]);
    }
}
const NOOP_QUERY_EXECUTOR = new NoopQueryExecutor();
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-executor/default-query-executor.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./default-query-executor.d.ts" />
__turbopack_context__.s([
    "DefaultQueryExecutor",
    ()=>DefaultQueryExecutor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$executor$2f$query$2d$executor$2d$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-executor/query-executor-base.js [app-route] (ecmascript)");
;
class DefaultQueryExecutor extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$executor$2f$query$2d$executor$2d$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryExecutorBase"] {
    #compiler;
    #adapter;
    #connectionProvider;
    constructor(compiler, adapter, connectionProvider, plugins = []){
        super(plugins);
        this.#compiler = compiler;
        this.#adapter = adapter;
        this.#connectionProvider = connectionProvider;
    }
    get adapter() {
        return this.#adapter;
    }
    compileQuery(node, queryId) {
        return this.#compiler.compileQuery(node, queryId);
    }
    provideConnection(consumer) {
        return this.#connectionProvider.provideConnection(consumer);
    }
    withPlugins(plugins) {
        return new DefaultQueryExecutor(this.#compiler, this.#adapter, this.#connectionProvider, [
            ...this.plugins,
            ...plugins
        ]);
    }
    withPlugin(plugin) {
        return new DefaultQueryExecutor(this.#compiler, this.#adapter, this.#connectionProvider, [
            ...this.plugins,
            plugin
        ]);
    }
    withPluginAtFront(plugin) {
        return new DefaultQueryExecutor(this.#compiler, this.#adapter, this.#connectionProvider, [
            plugin,
            ...this.plugins
        ]);
    }
    withConnectionProvider(connectionProvider) {
        return new DefaultQueryExecutor(this.#compiler, this.#adapter, connectionProvider, [
            ...this.plugins
        ]);
    }
    withoutPlugins() {
        return new DefaultQueryExecutor(this.#compiler, this.#adapter, this.#connectionProvider, []);
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-creator.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./query-creator.d.ts" />
__turbopack_context__.s([
    "QueryCreator",
    ()=>QueryCreator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$select$2d$query$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/select-query-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$insert$2d$query$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/insert-query-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$delete$2d$query$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/delete-query-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$update$2d$query$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/update-query-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$delete$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/delete-query-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$insert$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/insert-query-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/select-query-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$update$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/update-query-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/table-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$with$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/with-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$with$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/with-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/query-id.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$plugin$2f$with$2d$schema$2f$with$2d$schema$2d$plugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/plugin/with-schema/with-schema-plugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$select$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/select-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$merge$2d$query$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/merge-query-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$merge$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/merge-query-node.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
class QueryCreator {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    /**
     * Creates a `select` query builder for the given table or tables.
     *
     * The tables passed to this method are built as the query's `from` clause.
     *
     * ### Examples
     *
     * Create a select query for one table:
     *
     * ```ts
     * db.selectFrom('person').selectAll()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * ```
     *
     * Create a select query for one table with an alias:
     *
     * ```ts
     * const persons = await db.selectFrom('person as p')
     *   .select(['p.id', 'first_name'])
     *   .execute()
     *
     * console.log(persons[0].id)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "p"."id", "first_name" from "person" as "p"
     * ```
     *
     * Create a select query from a subquery:
     *
     * ```ts
     * const persons = await db.selectFrom(
     *     (eb) => eb.selectFrom('person').select('person.id as identifier').as('p')
     *   )
     *   .select('p.identifier')
     *   .execute()
     *
     * console.log(persons[0].identifier)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "p"."identifier",
     * from (
     *   select "person"."id" as "identifier" from "person"
     * ) as p
     * ```
     *
     * Create a select query from raw sql:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const items = await db
     *   .selectFrom(sql<{ one: number }>`(select 1 as one)`.as('q'))
     *   .select('q.one')
     *   .execute()
     *
     * console.log(items[0].one)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "q"."one",
     * from (
     *   select 1 as one
     * ) as q
     * ```
     *
     * When you use the `sql` tag you need to also provide the result type of the
     * raw snippet / query so that Kysely can figure out what columns are
     * available for the rest of the query.
     *
     * The `selectFrom` method also accepts an array for multiple tables. All
     * the above examples can also be used in an array.
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const items = await db.selectFrom([
     *     'person as p',
     *     db.selectFrom('pet').select('pet.species').as('a'),
     *     sql<{ one: number }>`(select 1 as one)`.as('q')
     *   ])
     *   .select(['p.id', 'a.species', 'q.one'])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "p".id, "a"."species", "q"."one"
     * from
     *   "person" as "p",
     *   (select "pet"."species" from "pet") as a,
     *   (select 1 as one) as "q"
     * ```
     */ selectFrom(from) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$select$2d$query$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createSelectQueryBuilder"])({
            queryId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])(),
            executor: this.#props.executor,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectQueryNode"].createFrom((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseTableExpressionOrList"])(from), this.#props.withNode)
        });
    }
    selectNoFrom(selection) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$select$2d$query$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createSelectQueryBuilder"])({
            queryId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])(),
            executor: this.#props.executor,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectQueryNode"].cloneWithSelections(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectQueryNode"].create(this.#props.withNode), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$select$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSelectArg"])(selection))
        });
    }
    /**
     * Creates an insert query.
     *
     * The return value of this query is an instance of {@link InsertResult}. {@link InsertResult}
     * has the {@link InsertResult.insertId | insertId} field that holds the auto incremented id of
     * the inserted row if the db returned one.
     *
     * See the {@link InsertQueryBuilder.values | values} method for more info and examples. Also see
     * the {@link ReturningInterface.returning | returning} method for a way to return columns
     * on supported databases like PostgreSQL.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .executeTakeFirst()
     *
     * console.log(result.insertId)
     * ```
     *
     * Some databases like PostgreSQL support the `returning` method:
     *
     * ```ts
     * const { id } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning('id')
     *   .executeTakeFirstOrThrow()
     * ```
     */ insertInto(table) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$insert$2d$query$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InsertQueryBuilder"]({
            queryId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])(),
            executor: this.#props.executor,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$insert$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InsertQueryNode"].create((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseTable"])(table), this.#props.withNode)
        });
    }
    /**
     * Creates a "replace into" query.
     *
     * This is only supported by some dialects like MySQL or SQLite.
     *
     * Similar to MySQL's {@link InsertQueryBuilder.onDuplicateKeyUpdate} that deletes
     * and inserts values on collision instead of updating existing rows.
     *
     * An alias of SQLite's {@link InsertQueryBuilder.orReplace}.
     *
     * The return value of this query is an instance of {@link InsertResult}. {@link InsertResult}
     * has the {@link InsertResult.insertId | insertId} field that holds the auto incremented id of
     * the inserted row if the db returned one.
     *
     * See the {@link InsertQueryBuilder.values | values} method for more info and examples.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .replaceInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .executeTakeFirstOrThrow()
     *
     * console.log(result.insertId)
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * replace into `person` (`first_name`, `last_name`) values (?, ?)
     * ```
     */ replaceInto(table) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$insert$2d$query$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InsertQueryBuilder"]({
            queryId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])(),
            executor: this.#props.executor,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$insert$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InsertQueryNode"].create((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseTable"])(table), this.#props.withNode, true)
        });
    }
    /**
     * Creates a delete query.
     *
     * See the {@link DeleteQueryBuilder.where} method for examples on how to specify
     * a where clause for the delete operation.
     *
     * The return value of the query is an instance of {@link DeleteResult}.
     *
     * ### Examples
     *
     * <!-- siteExample("delete", "Single row", 10) -->
     *
     * Delete a single row:
     *
     * ```ts
     * const result = await db
     *   .deleteFrom('person')
     *   .where('person.id', '=', 1)
     *   .executeTakeFirst()
     *
     * console.log(result.numDeletedRows)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * delete from "person" where "person"."id" = $1
     * ```
     *
     * Some databases such as MySQL support deleting from multiple tables:
     *
     * ```ts
     * const result = await db
     *   .deleteFrom(['person', 'pet'])
     *   .using('person')
     *   .innerJoin('pet', 'pet.owner_id', 'person.id')
     *   .where('person.id', '=', 1)
     *   .executeTakeFirst()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * delete from `person`, `pet`
     * using `person`
     * inner join `pet` on `pet`.`owner_id` = `person`.`id`
     * where `person`.`id` = ?
     * ```
     */ deleteFrom(from) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$delete$2d$query$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DeleteQueryBuilder"]({
            queryId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])(),
            executor: this.#props.executor,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$delete$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DeleteQueryNode"].create((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseTableExpressionOrList"])(from), this.#props.withNode)
        });
    }
    /**
     * Creates an update query.
     *
     * See the {@link UpdateQueryBuilder.where} method for examples on how to specify
     * a where clause for the update operation.
     *
     * See the {@link UpdateQueryBuilder.set} method for examples on how to
     * specify the updates.
     *
     * The return value of the query is an {@link UpdateResult}.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .updateTable('person')
     *   .set({ first_name: 'Jennifer' })
     *   .where('person.id', '=', 1)
     *   .executeTakeFirst()
     *
     * console.log(result.numUpdatedRows)
     * ```
     */ updateTable(tables) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$update$2d$query$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UpdateQueryBuilder"]({
            queryId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])(),
            executor: this.#props.executor,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$update$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UpdateQueryNode"].create((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseTableExpressionOrList"])(tables), this.#props.withNode)
        });
    }
    /**
     * Creates a merge query.
     *
     * The return value of the query is a {@link MergeResult}.
     *
     * See the {@link MergeQueryBuilder.using} method for examples on how to specify
     * the other table.
     *
     * ### Examples
     *
     * <!-- siteExample("merge", "Source row existence", 10) -->
     *
     * Update a target column based on the existence of a source row:
     *
     * ```ts
     * const result = await db
     *   .mergeInto('person as target')
     *   .using('pet as source', 'source.owner_id', 'target.id')
     *   .whenMatchedAnd('target.has_pets', '!=', 'Y')
     *   .thenUpdateSet({ has_pets: 'Y' })
     *   .whenNotMatchedBySourceAnd('target.has_pets', '=', 'Y')
     *   .thenUpdateSet({ has_pets: 'N' })
     *   .executeTakeFirstOrThrow()
     *
     * console.log(result.numChangedRows)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet"
     * on "pet"."owner_id" = "person"."id"
     * when matched and "has_pets" != $1
     * then update set "has_pets" = $2
     * when not matched by source and "has_pets" = $3
     * then update set "has_pets" = $4
     * ```
     *
     * <!-- siteExample("merge", "Temporary changes table", 20) -->
     *
     * Merge new entries from a temporary changes table:
     *
     * ```ts
     * const result = await db
     *   .mergeInto('wine as target')
     *   .using(
     *     'wine_stock_change as source',
     *     'source.wine_name',
     *     'target.name',
     *   )
     *   .whenNotMatchedAnd('source.stock_delta', '>', 0)
     *   .thenInsertValues(({ ref }) => ({
     *     name: ref('source.wine_name'),
     *     stock: ref('source.stock_delta'),
     *   }))
     *   .whenMatchedAnd(
     *     (eb) => eb('target.stock', '+', eb.ref('source.stock_delta')),
     *     '>',
     *     0,
     *   )
     *   .thenUpdateSet('stock', (eb) =>
     *     eb('target.stock', '+', eb.ref('source.stock_delta')),
     *   )
     *   .whenMatched()
     *   .thenDelete()
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "wine" as "target"
     * using "wine_stock_change" as "source"
     * on "source"."wine_name" = "target"."name"
     * when not matched and "source"."stock_delta" > $1
     * then insert ("name", "stock") values ("source"."wine_name", "source"."stock_delta")
     * when matched and "target"."stock" + "source"."stock_delta" > $2
     * then update set "stock" = "target"."stock" + "source"."stock_delta"
     * when matched
     * then delete
     * ```
     */ mergeInto(targetTable) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$merge$2d$query$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MergeQueryBuilder"]({
            queryId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])(),
            executor: this.#props.executor,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$merge$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MergeQueryNode"].create((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseAliasedTable"])(targetTable), this.#props.withNode)
        });
    }
    /**
     * Creates a `with` query (Common Table Expression).
     *
     * ### Examples
     *
     * <!-- siteExample("cte", "Simple selects", 10) -->
     *
     * Common table expressions (CTE) are a great way to modularize complex queries.
     * Essentially they allow you to run multiple separate queries within a
     * single roundtrip to the DB.
     *
     * Since CTEs are a part of the main query, query optimizers inside DB
     * engines are able to optimize the overall query. For example, postgres
     * is able to inline the CTEs inside the using queries if it decides it's
     * faster.
     *
     * ```ts
     * const result = await db
     *   // Create a CTE called `jennifers` that selects all
     *   // persons named 'Jennifer'.
     *   .with('jennifers', (db) => db
     *     .selectFrom('person')
     *     .where('first_name', '=', 'Jennifer')
     *     .select(['id', 'age'])
     *   )
     *   // Select all rows from the `jennifers` CTE and
     *   // further filter it.
     *   .with('adult_jennifers', (db) => db
     *     .selectFrom('jennifers')
     *     .where('age', '>', 18)
     *     .select(['id', 'age'])
     *   )
     *   // Finally select all adult jennifers that are
     *   // also younger than 60.
     *   .selectFrom('adult_jennifers')
     *   .where('age', '<', 60)
     *   .selectAll()
     *   .execute()
     * ```
     *
     * <!-- siteExample("cte", "Inserts, updates and deletions", 20) -->
     *
     * Some databases like postgres also allow you to run other queries than selects
     * in CTEs. On these databases CTEs are extremely powerful:
     *
     * ```ts
     * const result = await db
     *   .with('new_person', (db) => db
     *     .insertInto('person')
     *     .values({
     *       first_name: 'Jennifer',
     *       age: 35,
     *     })
     *     .returning('id')
     *   )
     *   .with('new_pet', (db) => db
     *     .insertInto('pet')
     *     .values({
     *       name: 'Doggo',
     *       species: 'dog',
     *       is_favorite: true,
     *       // Use the id of the person we just inserted.
     *       owner_id: db
     *         .selectFrom('new_person')
     *         .select('id')
     *     })
     *     .returning('id')
     *   )
     *   .selectFrom(['new_person', 'new_pet'])
     *   .select([
     *     'new_person.id as person_id',
     *     'new_pet.id as pet_id'
     *   ])
     *   .execute()
     * ```
     *
     * The CTE name can optionally specify column names in addition to
     * a name. In that case Kysely requires the expression to retun
     * rows with the same columns.
     *
     * ```ts
     * await db
     *   .with('jennifers(id, age)', (db) => db
     *     .selectFrom('person')
     *     .where('first_name', '=', 'Jennifer')
     *     // This is ok since we return columns with the same
     *     // names as specified by `jennifers(id, age)`.
     *     .select(['id', 'age'])
     *   )
     *   .selectFrom('jennifers')
     *   .selectAll()
     *   .execute()
     * ```
     *
     * The first argument can also be a callback. The callback is passed
     * a `CTEBuilder` instance that can be used to configure the CTE:
     *
     * ```ts
     * await db
     *   .with(
     *     (cte) => cte('jennifers').materialized(),
     *     (db) => db
     *       .selectFrom('person')
     *       .where('first_name', '=', 'Jennifer')
     *       .select(['id', 'age'])
     *   )
     *   .selectFrom('jennifers')
     *   .selectAll()
     *   .execute()
     * ```
     */ with(nameOrBuilder, expression) {
        const cte = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$with$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseCommonTableExpression"])(nameOrBuilder, expression);
        return new QueryCreator({
            ...this.#props,
            withNode: this.#props.withNode ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$with$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WithNode"].cloneWithExpression(this.#props.withNode, cte) : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$with$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WithNode"].create(cte)
        });
    }
    /**
     * Creates a recursive `with` query (Common Table Expression).
     *
     * Note that recursiveness is a property of the whole `with` statement.
     * You cannot have recursive and non-recursive CTEs in a same `with` statement.
     * Therefore the recursiveness is determined by the **first** `with` or
     * `withRecusive` call you make.
     *
     * See the {@link with} method for examples and more documentation.
     */ withRecursive(nameOrBuilder, expression) {
        const cte = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$with$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseCommonTableExpression"])(nameOrBuilder, expression);
        return new QueryCreator({
            ...this.#props,
            withNode: this.#props.withNode ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$with$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WithNode"].cloneWithExpression(this.#props.withNode, cte) : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$with$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WithNode"].create(cte, {
                recursive: true
            })
        });
    }
    /**
     * Returns a copy of this query creator instance with the given plugin installed.
     */ withPlugin(plugin) {
        return new QueryCreator({
            ...this.#props,
            executor: this.#props.executor.withPlugin(plugin)
        });
    }
    /**
     * Returns a copy of this query creator instance without any plugins.
     */ withoutPlugins() {
        return new QueryCreator({
            ...this.#props,
            executor: this.#props.executor.withoutPlugins()
        });
    }
    /**
     * Sets the schema to be used for all table references that don't explicitly
     * specify a schema.
     *
     * This only affects the query created through the builder returned from
     * this method and doesn't modify the `db` instance.
     *
     * See [this recipe](https://github.com/kysely-org/kysely/blob/master/site/docs/recipes/0007-schemas.md)
     * for a more detailed explanation.
     *
     * ### Examples
     *
     * ```
     * await db
     *   .withSchema('mammals')
     *   .selectFrom('pet')
     *   .selectAll()
     *   .innerJoin('public.person', 'public.person.id', 'pet.owner_id')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "mammals"."pet"
     * inner join "public"."person"
     * on "public"."person"."id" = "mammals"."pet"."owner_id"
     * ```
     *
     * `withSchema` is smart enough to not add schema for aliases,
     * common table expressions or other places where the schema
     * doesn't belong to:
     *
     * ```
     * await db
     *   .withSchema('mammals')
     *   .selectFrom('pet as p')
     *   .select('p.name')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "p"."name" from "mammals"."pet" as "p"
     * ```
     */ withSchema(schema) {
        return new QueryCreator({
            ...this.#props,
            executor: this.#props.executor.withPluginAtFront(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$plugin$2f$with$2d$schema$2f$with$2d$schema$2d$plugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WithSchemaPlugin"](schema))
        });
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/raw-builder/raw-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./raw-builder.d.ts" />
__turbopack_context__.s([
    "createRawBuilder",
    ()=>createRawBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alias$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/alias-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$executor$2f$noop$2d$query$2d$executor$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-executor/noop-query-executor.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$identifier$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/identifier-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$operation$2d$node$2d$source$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/operation-node-source.js [app-route] (ecmascript)");
;
;
;
;
;
class RawBuilderImpl {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    get expressionType() {
        return undefined;
    }
    get isRawBuilder() {
        return true;
    }
    as(alias) {
        return new AliasedRawBuilderImpl(this, alias);
    }
    $castTo() {
        return new RawBuilderImpl({
            ...this.#props
        });
    }
    $notNull() {
        return new RawBuilderImpl(this.#props);
    }
    withPlugin(plugin) {
        return new RawBuilderImpl({
            ...this.#props,
            plugins: this.#props.plugins !== undefined ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])([
                ...this.#props.plugins,
                plugin
            ]) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])([
                plugin
            ])
        });
    }
    toOperationNode() {
        return this.#toOperationNode(this.#getExecutor());
    }
    compile(executorProvider) {
        return this.#compile(this.#getExecutor(executorProvider));
    }
    async execute(executorProvider) {
        const executor = this.#getExecutor(executorProvider);
        return executor.executeQuery(this.#compile(executor));
    }
    #getExecutor(executorProvider) {
        const executor = executorProvider !== undefined ? executorProvider.getExecutor() : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$executor$2f$noop$2d$query$2d$executor$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NOOP_QUERY_EXECUTOR"];
        return this.#props.plugins !== undefined ? executor.withPlugins(this.#props.plugins) : executor;
    }
    #toOperationNode(executor) {
        return executor.transformQuery(this.#props.rawNode, this.#props.queryId);
    }
    #compile(executor) {
        return executor.compileQuery(this.#toOperationNode(executor), this.#props.queryId);
    }
}
function createRawBuilder(props) {
    return new RawBuilderImpl(props);
}
class AliasedRawBuilderImpl {
    #rawBuilder;
    #alias;
    constructor(rawBuilder, alias){
        this.#rawBuilder = rawBuilder;
        this.#alias = alias;
    }
    get expression() {
        return this.#rawBuilder;
    }
    get alias() {
        return this.#alias;
    }
    get rawBuilder() {
        return this.#rawBuilder;
    }
    toOperationNode() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alias$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AliasNode"].create(this.#rawBuilder.toOperationNode(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$operation$2d$node$2d$source$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isOperationNodeSource"])(this.#alias) ? this.#alias.toOperationNode() : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$identifier$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IdentifierNode"].create(this.#alias));
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/raw-builder/sql.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./sql.d.ts" />
__turbopack_context__.s([
    "sql",
    ()=>sql
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$identifier$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/identifier-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$operation$2d$node$2d$source$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/operation-node-source.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$raw$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/raw-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$value$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/value-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$reference$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/reference-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/table-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$value$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/value-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/query-id.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$raw$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/raw-builder/raw-builder.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
const sql = Object.assign((sqlFragments, ...parameters)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$raw$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRawBuilder"])({
        queryId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])(),
        rawNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$raw$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RawNode"].create(sqlFragments, parameters?.map(parseParameter) ?? [])
    });
}, {
    ref (columnReference) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$raw$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRawBuilder"])({
            queryId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])(),
            rawNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$raw$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RawNode"].createWithChild((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$reference$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseStringReference"])(columnReference))
        });
    },
    val (value) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$raw$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRawBuilder"])({
            queryId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])(),
            rawNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$raw$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RawNode"].createWithChild((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$value$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseValueExpression"])(value))
        });
    },
    value (value) {
        return this.val(value);
    },
    table (tableReference) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$raw$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRawBuilder"])({
            queryId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])(),
            rawNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$raw$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RawNode"].createWithChild((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseTable"])(tableReference))
        });
    },
    id (...ids) {
        const fragments = new Array(ids.length + 1).fill('.');
        fragments[0] = '';
        fragments[fragments.length - 1] = '';
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$raw$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRawBuilder"])({
            queryId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])(),
            rawNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$raw$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RawNode"].create(fragments, ids.map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$identifier$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IdentifierNode"].create))
        });
    },
    lit (value) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$raw$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRawBuilder"])({
            queryId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])(),
            rawNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$raw$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RawNode"].createWithChild(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$value$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ValueNode"].createImmediate(value))
        });
    },
    literal (value) {
        return this.lit(value);
    },
    raw (sql) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$raw$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRawBuilder"])({
            queryId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])(),
            rawNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$raw$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RawNode"].createWithSql(sql)
        });
    },
    join (array, separator = sql`, `) {
        const nodes = new Array(Math.max(2 * array.length - 1, 0));
        const sep = separator.toOperationNode();
        for(let i = 0; i < array.length; ++i){
            nodes[2 * i] = parseParameter(array[i]);
            if (i !== array.length - 1) {
                nodes[2 * i + 1] = sep;
            }
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$raw$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRawBuilder"])({
            queryId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])(),
            rawNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$raw$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RawNode"].createWithChildren(nodes)
        });
    }
});
function parseParameter(param) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$operation$2d$node$2d$source$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isOperationNodeSource"])(param)) {
        return param.toOperationNode();
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$value$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseValueExpression"])(param);
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/driver/default-connection-provider.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./default-connection-provider.d.ts" />
__turbopack_context__.s([
    "DefaultConnectionProvider",
    ()=>DefaultConnectionProvider
]);
class DefaultConnectionProvider {
    #driver;
    constructor(driver){
        this.#driver = driver;
    }
    async provideConnection(consumer) {
        const connection = await this.#driver.acquireConnection();
        try {
            return await consumer(connection);
        } finally{
            await this.#driver.releaseConnection(connection);
        }
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/driver/runtime-driver.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./runtime-driver.d.ts" />
__turbopack_context__.s([
    "RuntimeDriver",
    ()=>RuntimeDriver
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$performance$2d$now$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/performance-now.js [app-route] (ecmascript)");
;
class RuntimeDriver {
    #driver;
    #log;
    #initPromise;
    #initDone;
    #destroyPromise;
    #connections = new WeakSet();
    constructor(driver, log){
        this.#initDone = false;
        this.#driver = driver;
        this.#log = log;
    }
    async init() {
        if (this.#destroyPromise) {
            throw new Error('driver has already been destroyed');
        }
        if (!this.#initPromise) {
            this.#initPromise = this.#driver.init().then(()=>{
                this.#initDone = true;
            }).catch((err)=>{
                this.#initPromise = undefined;
                return Promise.reject(err);
            });
        }
        await this.#initPromise;
    }
    async acquireConnection() {
        if (this.#destroyPromise) {
            throw new Error('driver has already been destroyed');
        }
        if (!this.#initDone) {
            await this.init();
        }
        const connection = await this.#driver.acquireConnection();
        if (!this.#connections.has(connection)) {
            if (this.#needsLogging()) {
                this.#addLogging(connection);
            }
            this.#connections.add(connection);
        }
        return connection;
    }
    async releaseConnection(connection) {
        await this.#driver.releaseConnection(connection);
    }
    beginTransaction(connection, settings) {
        return this.#driver.beginTransaction(connection, settings);
    }
    commitTransaction(connection) {
        return this.#driver.commitTransaction(connection);
    }
    rollbackTransaction(connection) {
        return this.#driver.rollbackTransaction(connection);
    }
    savepoint(connection, savepointName, compileQuery) {
        if (this.#driver.savepoint) {
            return this.#driver.savepoint(connection, savepointName, compileQuery);
        }
        throw new Error('The `savepoint` method is not supported by this driver');
    }
    rollbackToSavepoint(connection, savepointName, compileQuery) {
        if (this.#driver.rollbackToSavepoint) {
            return this.#driver.rollbackToSavepoint(connection, savepointName, compileQuery);
        }
        throw new Error('The `rollbackToSavepoint` method is not supported by this driver');
    }
    releaseSavepoint(connection, savepointName, compileQuery) {
        if (this.#driver.releaseSavepoint) {
            return this.#driver.releaseSavepoint(connection, savepointName, compileQuery);
        }
        throw new Error('The `releaseSavepoint` method is not supported by this driver');
    }
    async destroy() {
        if (!this.#initPromise) {
            return;
        }
        await this.#initPromise;
        if (!this.#destroyPromise) {
            this.#destroyPromise = this.#driver.destroy().catch((err)=>{
                this.#destroyPromise = undefined;
                return Promise.reject(err);
            });
        }
        await this.#destroyPromise;
    }
    #needsLogging() {
        return this.#log.isLevelEnabled('query') || this.#log.isLevelEnabled('error');
    }
    // This method monkey patches the database connection's executeQuery method
    // by adding logging code around it. Monkey patching is not pretty, but it's
    // the best option in this case.
    #addLogging(connection) {
        const executeQuery = connection.executeQuery;
        const streamQuery = connection.streamQuery;
        const dis = this;
        connection.executeQuery = async (compiledQuery)=>{
            let caughtError;
            const startTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$performance$2d$now$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["performanceNow"])();
            try {
                return await executeQuery.call(connection, compiledQuery);
            } catch (error) {
                caughtError = error;
                await dis.#logError(error, compiledQuery, startTime);
                throw error;
            } finally{
                if (!caughtError) {
                    await dis.#logQuery(compiledQuery, startTime);
                }
            }
        };
        connection.streamQuery = async function*(compiledQuery, chunkSize) {
            let caughtError;
            const startTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$performance$2d$now$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["performanceNow"])();
            try {
                for await (const result of streamQuery.call(connection, compiledQuery, chunkSize)){
                    yield result;
                }
            } catch (error) {
                caughtError = error;
                await dis.#logError(error, compiledQuery, startTime);
                throw error;
            } finally{
                if (!caughtError) {
                    await dis.#logQuery(compiledQuery, startTime, true);
                }
            }
        };
    }
    async #logError(error, compiledQuery, startTime) {
        await this.#log.error(()=>({
                level: 'error',
                error,
                query: compiledQuery,
                queryDurationMillis: this.#calculateDurationMillis(startTime)
            }));
    }
    async #logQuery(compiledQuery, startTime, isStream = false) {
        await this.#log.query(()=>({
                level: 'query',
                isStream,
                query: compiledQuery,
                queryDurationMillis: this.#calculateDurationMillis(startTime)
            }));
    }
    #calculateDurationMillis(startTime) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$performance$2d$now$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["performanceNow"])() - startTime;
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/driver/single-connection-provider.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./single-connection-provider.d.ts" />
__turbopack_context__.s([
    "SingleConnectionProvider",
    ()=>SingleConnectionProvider
]);
const ignoreError = ()=>{};
class SingleConnectionProvider {
    #connection;
    #runningPromise;
    constructor(connection){
        this.#connection = connection;
    }
    async provideConnection(consumer) {
        while(this.#runningPromise){
            await this.#runningPromise.catch(ignoreError);
        }
        // `#runningPromise` must be set to undefined before it's
        // resolved or rejected. Otherwise the while loop above
        // will misbehave.
        this.#runningPromise = this.#run(consumer).finally(()=>{
            this.#runningPromise = undefined;
        });
        return this.#runningPromise;
    }
    // Run the runner in an async function to make sure it doesn't
    // throw synchronous errors.
    async #run(runner) {
        return await runner(this.#connection);
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/driver/driver.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./driver.d.ts" />
__turbopack_context__.s([
    "TRANSACTION_ACCESS_MODES",
    ()=>TRANSACTION_ACCESS_MODES,
    "TRANSACTION_ISOLATION_LEVELS",
    ()=>TRANSACTION_ISOLATION_LEVELS,
    "validateTransactionSettings",
    ()=>validateTransactionSettings
]);
const TRANSACTION_ACCESS_MODES = [
    'read only',
    'read write'
];
const TRANSACTION_ISOLATION_LEVELS = [
    'read uncommitted',
    'read committed',
    'repeatable read',
    'serializable',
    'snapshot'
];
function validateTransactionSettings(settings) {
    if (settings.accessMode && !TRANSACTION_ACCESS_MODES.includes(settings.accessMode)) {
        throw new Error(`invalid transaction access mode ${settings.accessMode}`);
    }
    if (settings.isolationLevel && !TRANSACTION_ISOLATION_LEVELS.includes(settings.isolationLevel)) {
        throw new Error(`invalid transaction isolation level ${settings.isolationLevel}`);
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/kysely.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./kysely.d.ts" />
__turbopack_context__.s([
    "Command",
    ()=>Command,
    "ConnectionBuilder",
    ()=>ConnectionBuilder,
    "ControlledTransaction",
    ()=>ControlledTransaction,
    "ControlledTransactionBuilder",
    ()=>ControlledTransactionBuilder,
    "Kysely",
    ()=>Kysely,
    "Transaction",
    ()=>Transaction,
    "TransactionBuilder",
    ()=>TransactionBuilder,
    "isKyselyProps",
    ()=>isKyselyProps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$schema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/schema.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dynamic$2f$dynamic$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dynamic/dynamic.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$driver$2f$default$2d$connection$2d$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/driver/default-connection-provider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$creator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-creator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$executor$2f$default$2d$query$2d$executor$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-executor/default-query-executor.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$driver$2f$runtime$2d$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/driver/runtime-driver.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$driver$2f$single$2d$connection$2d$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/driver/single-connection-provider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$driver$2f$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/driver/driver.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$function$2d$module$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/function-module.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$log$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/log.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/query-id.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$compilable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/compilable.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$case$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/case-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$case$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/case-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$expression$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/expression-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$plugin$2f$with$2d$schema$2f$with$2d$schema$2d$plugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/plugin/with-schema/with-schema-plugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$provide$2d$controlled$2d$connection$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/provide-controlled-connection.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$log$2d$once$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/log-once.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
// @ts-ignore
Symbol.asyncDispose ??= Symbol('Symbol.asyncDispose');
class Kysely extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$creator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryCreator"] {
    #props;
    constructor(args){
        let superProps;
        let props;
        if (isKyselyProps(args)) {
            superProps = {
                executor: args.executor
            };
            props = {
                ...args
            };
        } else {
            const dialect = args.dialect;
            const driver = dialect.createDriver();
            const compiler = dialect.createQueryCompiler();
            const adapter = dialect.createAdapter();
            const log = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$log$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Log"](args.log ?? []);
            const runtimeDriver = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$driver$2f$runtime$2d$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RuntimeDriver"](driver, log);
            const connectionProvider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$driver$2f$default$2d$connection$2d$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DefaultConnectionProvider"](runtimeDriver);
            const executor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$executor$2f$default$2d$query$2d$executor$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DefaultQueryExecutor"](compiler, adapter, connectionProvider, args.plugins ?? []);
            superProps = {
                executor
            };
            props = {
                config: args,
                executor,
                dialect,
                driver: runtimeDriver
            };
        }
        super(superProps);
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    /**
     * Returns the {@link SchemaModule} module for building database schema.
     */ get schema() {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$schema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SchemaModule"](this.#props.executor);
    }
    /**
     * Returns a the {@link DynamicModule} module.
     *
     * The {@link DynamicModule} module can be used to bypass strict typing and
     * passing in dynamic values for the queries.
     */ get dynamic() {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dynamic$2f$dynamic$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DynamicModule"]();
    }
    /**
     * Returns a {@link DatabaseIntrospector | database introspector}.
     */ get introspection() {
        return this.#props.dialect.createIntrospector(this.withoutPlugins());
    }
    case(value) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$case$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CaseBuilder"]({
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$case$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CaseNode"].create((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isUndefined"])(value) ? undefined : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$expression$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseExpression"])(value))
        });
    }
    /**
     * Returns a {@link FunctionModule} that can be used to write somewhat type-safe function
     * calls.
     *
     * ```ts
     * const { count } = db.fn
     *
     * await db.selectFrom('person')
     *   .innerJoin('pet', 'pet.owner_id', 'person.id')
     *   .select([
     *     'id',
     *     count('pet.id').as('person_count'),
     *   ])
     *   .groupBy('person.id')
     *   .having(count('pet.id'), '>', 10)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."id", count("pet"."id") as "person_count"
     * from "person"
     * inner join "pet" on "pet"."owner_id" = "person"."id"
     * group by "person"."id"
     * having count("pet"."id") > $1
     * ```
     *
     * Why "somewhat" type-safe? Because the function calls are not bound to the
     * current query context. They allow you to reference columns and tables that
     * are not in the current query. E.g. remove the `innerJoin` from the previous
     * query and TypeScript won't even complain.
     *
     * If you want to make the function calls fully type-safe, you can use the
     * {@link ExpressionBuilder.fn} getter for a query context-aware, stricter {@link FunctionModule}.
     *
     * ```ts
     * await db.selectFrom('person')
     *   .innerJoin('pet', 'pet.owner_id', 'person.id')
     *   .select((eb) => [
     *     'person.id',
     *     eb.fn.count('pet.id').as('pet_count')
     *   ])
     *   .groupBy('person.id')
     *   .having((eb) => eb.fn.count('pet.id'), '>', 10)
     *   .execute()
     * ```
     */ get fn() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$function$2d$module$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createFunctionModule"])();
    }
    /**
     * Creates a {@link TransactionBuilder} that can be used to run queries inside a transaction.
     *
     * The returned {@link TransactionBuilder} can be used to configure the transaction. The
     * {@link TransactionBuilder.execute} method can then be called to run the transaction.
     * {@link TransactionBuilder.execute} takes a function that is run inside the
     * transaction. If the function throws an exception,
     * 1. the exception is caught,
     * 2. the transaction is rolled back, and
     * 3. the exception is thrown again.
     * Otherwise the transaction is committed.
     *
     * The callback function passed to the {@link TransactionBuilder.execute | execute}
     * method gets the transaction object as its only argument. The transaction is
     * of type {@link Transaction} which inherits {@link Kysely}. Any query
     * started through the transaction object is executed inside the transaction.
     *
     * To run a controlled transaction, allowing you to commit and rollback manually,
     * use {@link startTransaction} instead.
     *
     * ### Examples
     *
     * <!-- siteExample("transactions", "Simple transaction", 10) -->
     *
     * This example inserts two rows in a transaction. If an exception is thrown inside
     * the callback passed to the `execute` method,
     * 1. the exception is caught,
     * 2. the transaction is rolled back, and
     * 3. the exception is thrown again.
     * Otherwise the transaction is committed.
     *
     * ```ts
     * const catto = await db.transaction().execute(async (trx) => {
     *   const jennifer = await trx.insertInto('person')
     *     .values({
     *       first_name: 'Jennifer',
     *       last_name: 'Aniston',
     *       age: 40,
     *     })
     *     .returning('id')
     *     .executeTakeFirstOrThrow()
     *
     *   return await trx.insertInto('pet')
     *     .values({
     *       owner_id: jennifer.id,
     *       name: 'Catto',
     *       species: 'cat',
     *       is_favorite: false,
     *     })
     *     .returningAll()
     *     .executeTakeFirst()
     * })
     * ```
     *
     * Setting the isolation level:
     *
     * ```ts
     * import type { Kysely } from 'kysely'
     *
     * await db
     *   .transaction()
     *   .setIsolationLevel('serializable')
     *   .execute(async (trx) => {
     *     await doStuff(trx)
     *   })
     *
     * async function doStuff(kysely: typeof db) {
     *   // ...
     * }
     * ```
     */ transaction() {
        return new TransactionBuilder({
            ...this.#props
        });
    }
    /**
     * Creates a {@link ControlledTransactionBuilder} that can be used to run queries inside a controlled transaction.
     *
     * The returned {@link ControlledTransactionBuilder} can be used to configure the transaction.
     * The {@link ControlledTransactionBuilder.execute} method can then be called
     * to start the transaction and return a {@link ControlledTransaction}.
     *
     * A {@link ControlledTransaction} allows you to commit and rollback manually,
     * execute savepoint commands. It extends {@link Transaction} which extends {@link Kysely},
     * so you can run queries inside the transaction. Once the transaction is committed,
     * or rolled back, it can't be used anymore - all queries will throw an error.
     * This is to prevent accidentally running queries outside the transaction - where
     * atomicity is not guaranteed anymore.
     *
     * ### Examples
     *
     * <!-- siteExample("transactions", "Controlled transaction", 11) -->
     *
     * A controlled transaction allows you to commit and rollback manually, execute
     * savepoint commands, and queries in general.
     *
     * In this example we start a transaction, use it to insert two rows and then commit
     * the transaction. If an error is thrown, we catch it and rollback the transaction.
     *
     * ```ts
     * const trx = await db.startTransaction().execute()
     *
     * try {
     *   const jennifer = await trx.insertInto('person')
     *     .values({
     *       first_name: 'Jennifer',
     *       last_name: 'Aniston',
     *       age: 40,
     *     })
     *     .returning('id')
     *     .executeTakeFirstOrThrow()
     *
     *   const catto = await trx.insertInto('pet')
     *     .values({
     *       owner_id: jennifer.id,
     *       name: 'Catto',
     *       species: 'cat',
     *       is_favorite: false,
     *     })
     *     .returningAll()
     *     .executeTakeFirstOrThrow()
     *
     *   await trx.commit().execute()
     *
     *   // ...
     * } catch (error) {
     *   await trx.rollback().execute()
     * }
     * ```
     *
     * <!-- siteExample("transactions", "Controlled transaction /w savepoints", 12) -->
     *
     * A controlled transaction allows you to commit and rollback manually, execute
     * savepoint commands, and queries in general.
     *
     * In this example we start a transaction, insert a person, create a savepoint,
     * try inserting a toy and a pet, and if an error is thrown, we rollback to the
     * savepoint. Eventually we release the savepoint, insert an audit record and
     * commit the transaction. If an error is thrown, we catch it and rollback the
     * transaction.
     *
     * ```ts
     * const trx = await db.startTransaction().execute()
     *
     * try {
     *   const jennifer = await trx
     *     .insertInto('person')
     *     .values({
     *       first_name: 'Jennifer',
     *       last_name: 'Aniston',
     *       age: 40,
     *     })
     *     .returning('id')
     *     .executeTakeFirstOrThrow()
     *
     *   const trxAfterJennifer = await trx.savepoint('after_jennifer').execute()
     *
     *   try {
     *     const catto = await trxAfterJennifer
     *       .insertInto('pet')
     *       .values({
     *         owner_id: jennifer.id,
     *         name: 'Catto',
     *         species: 'cat',
     *       })
     *       .returning('id')
     *       .executeTakeFirstOrThrow()
     *
     *     await trxAfterJennifer
     *       .insertInto('toy')
     *       .values({ name: 'Bone', price: 1.99, pet_id: catto.id })
     *       .execute()
     *   } catch (error) {
     *     await trxAfterJennifer.rollbackToSavepoint('after_jennifer').execute()
     *   }
     *
     *   await trxAfterJennifer.releaseSavepoint('after_jennifer').execute()
     *
     *   await trx.insertInto('audit').values({ action: 'added Jennifer' }).execute()
     *
     *   await trx.commit().execute()
     * } catch (error) {
     *   await trx.rollback().execute()
     * }
     * ```
     */ startTransaction() {
        return new ControlledTransactionBuilder({
            ...this.#props
        });
    }
    /**
     * Provides a kysely instance bound to a single database connection.
     *
     * ### Examples
     *
     * ```ts
     * await db
     *   .connection()
     *   .execute(async (db) => {
     *     // `db` is an instance of `Kysely` that's bound to a single
     *     // database connection. All queries executed through `db` use
     *     // the same connection.
     *     await doStuff(db)
     *   })
     *
     * async function doStuff(kysely: typeof db) {
     *   // ...
     * }
     * ```
     */ connection() {
        return new ConnectionBuilder({
            ...this.#props
        });
    }
    /**
     * Returns a copy of this Kysely instance with the given plugin installed.
     */ withPlugin(plugin) {
        return new Kysely({
            ...this.#props,
            executor: this.#props.executor.withPlugin(plugin)
        });
    }
    /**
     * Returns a copy of this Kysely instance without any plugins.
     */ withoutPlugins() {
        return new Kysely({
            ...this.#props,
            executor: this.#props.executor.withoutPlugins()
        });
    }
    /**
     * @override
     */ withSchema(schema) {
        return new Kysely({
            ...this.#props,
            executor: this.#props.executor.withPluginAtFront(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$plugin$2f$with$2d$schema$2f$with$2d$schema$2d$plugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WithSchemaPlugin"](schema))
        });
    }
    /**
     * Returns a copy of this Kysely instance with tables added to its
     * database type.
     *
     * This method only modifies the types and doesn't affect any of the
     * executed queries in any way.
     *
     * ### Examples
     *
     * The following example adds and uses a temporary table:
     *
     * ```ts
     * await db.schema
     *   .createTable('temp_table')
     *   .temporary()
     *   .addColumn('some_column', 'integer')
     *   .execute()
     *
     * const tempDb = db.withTables<{
     *   temp_table: {
     *     some_column: number
     *   }
     * }>()
     *
     * await tempDb
     *   .insertInto('temp_table')
     *   .values({ some_column: 100 })
     *   .execute()
     * ```
     */ withTables() {
        return new Kysely({
            ...this.#props
        });
    }
    /**
     * Releases all resources and disconnects from the database.
     *
     * You need to call this when you are done using the `Kysely` instance.
     */ async destroy() {
        await this.#props.driver.destroy();
    }
    /**
     * Returns true if this `Kysely` instance is a transaction.
     *
     * You can also use `db instanceof Transaction`.
     */ get isTransaction() {
        return false;
    }
    /**
     * @internal
     * @private
     */ getExecutor() {
        return this.#props.executor;
    }
    /**
     * Executes a given compiled query or query builder.
     *
     * See {@link https://github.com/kysely-org/kysely/blob/master/site/docs/recipes/0004-splitting-query-building-and-execution.md#execute-compiled-queries splitting build, compile and execute code recipe} for more information.
     */ executeQuery(query, // TODO: remove this in the future. deprecated in  0.28.x
    queryId) {
        if (queryId !== undefined) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$log$2d$once$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logOnce"])('Passing `queryId` in `db.executeQuery` is deprecated and will result in a compile-time error in the future.');
        }
        const compiledQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$compilable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isCompilable"])(query) ? query.compile() : query;
        return this.getExecutor().executeQuery(compiledQuery);
    }
    async [Symbol.asyncDispose]() {
        await this.destroy();
    }
}
class Transaction extends Kysely {
    #props;
    constructor(props){
        super(props);
        this.#props = props;
    }
    // The return type is `true` instead of `boolean` to make Kysely<DB>
    // unassignable to Transaction<DB> while allowing assignment the
    // other way around.
    get isTransaction() {
        return true;
    }
    transaction() {
        throw new Error('calling the transaction method for a Transaction is not supported');
    }
    connection() {
        throw new Error('calling the connection method for a Transaction is not supported');
    }
    async destroy() {
        throw new Error('calling the destroy method for a Transaction is not supported');
    }
    withPlugin(plugin) {
        return new Transaction({
            ...this.#props,
            executor: this.#props.executor.withPlugin(plugin)
        });
    }
    withoutPlugins() {
        return new Transaction({
            ...this.#props,
            executor: this.#props.executor.withoutPlugins()
        });
    }
    withSchema(schema) {
        return new Transaction({
            ...this.#props,
            executor: this.#props.executor.withPluginAtFront(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$plugin$2f$with$2d$schema$2f$with$2d$schema$2d$plugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WithSchemaPlugin"](schema))
        });
    }
    withTables() {
        return new Transaction({
            ...this.#props
        });
    }
}
function isKyselyProps(obj) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isObject"])(obj) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isObject"])(obj.config) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isObject"])(obj.driver) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isObject"])(obj.executor) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isObject"])(obj.dialect);
}
class ConnectionBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    async execute(callback) {
        return this.#props.executor.provideConnection(async (connection)=>{
            const executor = this.#props.executor.withConnectionProvider(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$driver$2f$single$2d$connection$2d$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SingleConnectionProvider"](connection));
            const db = new Kysely({
                ...this.#props,
                executor
            });
            return await callback(db);
        });
    }
}
class TransactionBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    setAccessMode(accessMode) {
        return new TransactionBuilder({
            ...this.#props,
            accessMode
        });
    }
    setIsolationLevel(isolationLevel) {
        return new TransactionBuilder({
            ...this.#props,
            isolationLevel
        });
    }
    async execute(callback) {
        const { isolationLevel, accessMode, ...kyselyProps } = this.#props;
        const settings = {
            isolationLevel,
            accessMode
        };
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$driver$2f$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateTransactionSettings"])(settings);
        return this.#props.executor.provideConnection(async (connection)=>{
            const executor = this.#props.executor.withConnectionProvider(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$driver$2f$single$2d$connection$2d$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SingleConnectionProvider"](connection));
            const transaction = new Transaction({
                ...kyselyProps,
                executor
            });
            let transactionBegun = false;
            try {
                await this.#props.driver.beginTransaction(connection, settings);
                transactionBegun = true;
                const result = await callback(transaction);
                await this.#props.driver.commitTransaction(connection);
                return result;
            } catch (error) {
                if (transactionBegun) {
                    await this.#props.driver.rollbackTransaction(connection);
                }
                throw error;
            }
        });
    }
}
class ControlledTransactionBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    setAccessMode(accessMode) {
        return new ControlledTransactionBuilder({
            ...this.#props,
            accessMode
        });
    }
    setIsolationLevel(isolationLevel) {
        return new ControlledTransactionBuilder({
            ...this.#props,
            isolationLevel
        });
    }
    async execute() {
        const { isolationLevel, accessMode, ...props } = this.#props;
        const settings = {
            isolationLevel,
            accessMode
        };
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$driver$2f$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateTransactionSettings"])(settings);
        const connection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$provide$2d$controlled$2d$connection$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["provideControlledConnection"])(this.#props.executor);
        await this.#props.driver.beginTransaction(connection.connection, settings);
        return new ControlledTransaction({
            ...props,
            connection,
            executor: this.#props.executor.withConnectionProvider(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$driver$2f$single$2d$connection$2d$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SingleConnectionProvider"](connection.connection))
        });
    }
}
class ControlledTransaction extends Transaction {
    #props;
    #compileQuery;
    #state;
    constructor(props){
        const state = {
            isCommitted: false,
            isRolledBack: false
        };
        props = {
            ...props,
            executor: new NotCommittedOrRolledBackAssertingExecutor(props.executor, state)
        };
        const { connection, ...transactionProps } = props;
        super(transactionProps);
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
        this.#state = state;
        const queryId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])();
        this.#compileQuery = (node)=>props.executor.compileQuery(node, queryId);
    }
    get isCommitted() {
        return this.#state.isCommitted;
    }
    get isRolledBack() {
        return this.#state.isRolledBack;
    }
    /**
     * Commits the transaction.
     *
     * See {@link rollback}.
     *
     * ### Examples
     *
     * ```ts
     * import type { Kysely } from 'kysely'
     * import type { Database } from 'type-editor' // imaginary module
     *
     * const trx = await db.startTransaction().execute()
     *
     * try {
     *   await doSomething(trx)
     *
     *   await trx.commit().execute()
     * } catch (error) {
     *   await trx.rollback().execute()
     * }
     *
     * async function doSomething(kysely: Kysely<Database>) {}
     * ```
     */ commit() {
        assertNotCommittedOrRolledBack(this.#state);
        return new Command(async ()=>{
            await this.#props.driver.commitTransaction(this.#props.connection.connection);
            this.#state.isCommitted = true;
            this.#props.connection.release();
        });
    }
    /**
     * Rolls back the transaction.
     *
     * See {@link commit} and {@link rollbackToSavepoint}.
     *
     * ### Examples
     *
     * ```ts
     * import type { Kysely } from 'kysely'
     * import type { Database } from 'type-editor' // imaginary module
     *
     * const trx = await db.startTransaction().execute()
     *
     * try {
     *   await doSomething(trx)
     *
     *   await trx.commit().execute()
     * } catch (error) {
     *   await trx.rollback().execute()
     * }
     *
     * async function doSomething(kysely: Kysely<Database>) {}
     * ```
     */ rollback() {
        assertNotCommittedOrRolledBack(this.#state);
        return new Command(async ()=>{
            await this.#props.driver.rollbackTransaction(this.#props.connection.connection);
            this.#state.isRolledBack = true;
            this.#props.connection.release();
        });
    }
    /**
     * Creates a savepoint with a given name.
     *
     * See {@link rollbackToSavepoint} and {@link releaseSavepoint}.
     *
     * For a type-safe experience, you should use the returned instance from now on.
     *
     * ### Examples
     *
     * ```ts
     * import type { Kysely } from 'kysely'
     * import type { Database } from 'type-editor' // imaginary module
     *
     * const trx = await db.startTransaction().execute()
     *
     * await insertJennifer(trx)
     *
     * const trxAfterJennifer = await trx.savepoint('after_jennifer').execute()
     *
     * try {
     *   await doSomething(trxAfterJennifer)
     * } catch (error) {
     *   await trxAfterJennifer.rollbackToSavepoint('after_jennifer').execute()
     * }
     *
     * async function insertJennifer(kysely: Kysely<Database>) {}
     * async function doSomething(kysely: Kysely<Database>) {}
     * ```
     */ savepoint(savepointName) {
        assertNotCommittedOrRolledBack(this.#state);
        return new Command(async ()=>{
            await this.#props.driver.savepoint?.(this.#props.connection.connection, savepointName, this.#compileQuery);
            return new ControlledTransaction({
                ...this.#props
            });
        });
    }
    /**
     * Rolls back to a savepoint with a given name.
     *
     * See {@link savepoint} and {@link releaseSavepoint}.
     *
     * You must use the same instance returned by {@link savepoint}, or
     * escape the type-check by using `as any`.
     *
     * ### Examples
     *
     * ```ts
     * import type { Kysely } from 'kysely'
     * import type { Database } from 'type-editor' // imaginary module
     *
     * const trx = await db.startTransaction().execute()
     *
     * await insertJennifer(trx)
     *
     * const trxAfterJennifer = await trx.savepoint('after_jennifer').execute()
     *
     * try {
     *   await doSomething(trxAfterJennifer)
     * } catch (error) {
     *   await trxAfterJennifer.rollbackToSavepoint('after_jennifer').execute()
     * }
     *
     * async function insertJennifer(kysely: Kysely<Database>) {}
     * async function doSomething(kysely: Kysely<Database>) {}
     * ```
     */ rollbackToSavepoint(savepointName) {
        assertNotCommittedOrRolledBack(this.#state);
        return new Command(async ()=>{
            await this.#props.driver.rollbackToSavepoint?.(this.#props.connection.connection, savepointName, this.#compileQuery);
            return new ControlledTransaction({
                ...this.#props
            });
        });
    }
    /**
     * Releases a savepoint with a given name.
     *
     * See {@link savepoint} and {@link rollbackToSavepoint}.
     *
     * You must use the same instance returned by {@link savepoint}, or
     * escape the type-check by using `as any`.
     *
     * ### Examples
     *
     * ```ts
     * import type { Kysely } from 'kysely'
     * import type { Database } from 'type-editor' // imaginary module
     *
     * const trx = await db.startTransaction().execute()
     *
     * await insertJennifer(trx)
     *
     * const trxAfterJennifer = await trx.savepoint('after_jennifer').execute()
     *
     * try {
     *   await doSomething(trxAfterJennifer)
     * } catch (error) {
     *   await trxAfterJennifer.rollbackToSavepoint('after_jennifer').execute()
     * }
     *
     * await trxAfterJennifer.releaseSavepoint('after_jennifer').execute()
     *
     * await doSomethingElse(trx)
     *
     * async function insertJennifer(kysely: Kysely<Database>) {}
     * async function doSomething(kysely: Kysely<Database>) {}
     * async function doSomethingElse(kysely: Kysely<Database>) {}
     * ```
     */ releaseSavepoint(savepointName) {
        assertNotCommittedOrRolledBack(this.#state);
        return new Command(async ()=>{
            await this.#props.driver.releaseSavepoint?.(this.#props.connection.connection, savepointName, this.#compileQuery);
            return new ControlledTransaction({
                ...this.#props
            });
        });
    }
    withPlugin(plugin) {
        return new ControlledTransaction({
            ...this.#props,
            executor: this.#props.executor.withPlugin(plugin)
        });
    }
    withoutPlugins() {
        return new ControlledTransaction({
            ...this.#props,
            executor: this.#props.executor.withoutPlugins()
        });
    }
    withSchema(schema) {
        return new ControlledTransaction({
            ...this.#props,
            executor: this.#props.executor.withPluginAtFront(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$plugin$2f$with$2d$schema$2f$with$2d$schema$2d$plugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WithSchemaPlugin"](schema))
        });
    }
    withTables() {
        return new ControlledTransaction({
            ...this.#props
        });
    }
}
class Command {
    #cb;
    constructor(cb){
        this.#cb = cb;
    }
    /**
     * Executes the command.
     */ async execute() {
        return await this.#cb();
    }
}
function assertNotCommittedOrRolledBack(state) {
    if (state.isCommitted) {
        throw new Error('Transaction is already committed');
    }
    if (state.isRolledBack) {
        throw new Error('Transaction is already rolled back');
    }
}
/**
 * An executor wrapper that asserts that the transaction state is not committed
 * or rolled back when a query is executed.
 *
 * @internal
 */ class NotCommittedOrRolledBackAssertingExecutor {
    #executor;
    #state;
    constructor(executor, state){
        if (executor instanceof NotCommittedOrRolledBackAssertingExecutor) {
            this.#executor = executor.#executor;
        } else {
            this.#executor = executor;
        }
        this.#state = state;
    }
    get adapter() {
        return this.#executor.adapter;
    }
    get plugins() {
        return this.#executor.plugins;
    }
    transformQuery(node, queryId) {
        return this.#executor.transformQuery(node, queryId);
    }
    compileQuery(node, queryId) {
        return this.#executor.compileQuery(node, queryId);
    }
    provideConnection(consumer) {
        return this.#executor.provideConnection(consumer);
    }
    executeQuery(compiledQuery) {
        assertNotCommittedOrRolledBack(this.#state);
        return this.#executor.executeQuery(compiledQuery);
    }
    stream(compiledQuery, chunkSize) {
        assertNotCommittedOrRolledBack(this.#state);
        return this.#executor.stream(compiledQuery, chunkSize);
    }
    withConnectionProvider(connectionProvider) {
        return new NotCommittedOrRolledBackAssertingExecutor(this.#executor.withConnectionProvider(connectionProvider), this.#state);
    }
    withPlugin(plugin) {
        return new NotCommittedOrRolledBackAssertingExecutor(this.#executor.withPlugin(plugin), this.#state);
    }
    withPlugins(plugins) {
        return new NotCommittedOrRolledBackAssertingExecutor(this.#executor.withPlugins(plugins), this.#state);
    }
    withPluginAtFront(plugin) {
        return new NotCommittedOrRolledBackAssertingExecutor(this.#executor.withPluginAtFront(plugin), this.#state);
    }
    withoutPlugins() {
        return new NotCommittedOrRolledBackAssertingExecutor(this.#executor.withoutPlugins(), this.#state);
    }
}
}),
];

//# sourceMappingURL=9cfc5_kysely_dist_esm_6b8d66d3._.js.map