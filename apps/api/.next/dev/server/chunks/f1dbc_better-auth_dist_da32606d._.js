module.exports = [
"[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.CW6D9eSx.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "g",
    ()=>getDate
]);
const getDate = (span, unit = "ms")=>{
    return new Date(Date.now() + (unit === "sec" ? span * 1e3 : span));
};
;
}),
"[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.BKEtEpt0.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "s",
    ()=>safeJSONParse
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/env/index.mjs [app-route] (ecmascript)");
;
function safeJSONParse(data) {
    function reviver(_, value) {
        if (typeof value === "string") {
            const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;
            if (iso8601Regex.test(value)) {
                const date = new Date(value);
                if (!isNaN(date.getTime())) {
                    return date;
                }
            }
        }
        return value;
    }
    try {
        if (typeof data !== "string") {
            return data;
        }
        return JSON.parse(data, reviver);
    } catch (e) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error("Error parsing JSON", {
            error: e
        });
        return null;
    }
}
;
}),
"[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.DR3R5wdU.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "a",
    ()=>getBaseURL,
    "b",
    ()=>getHost,
    "c",
    ()=>getProtocol,
    "g",
    ()=>getOrigin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/env/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/error/index.mjs [app-route] (ecmascript)");
;
;
function checkHasPath(url) {
    try {
        const parsedUrl = new URL(url);
        const pathname = parsedUrl.pathname.replace(/\/+$/, "") || "/";
        return pathname !== "/";
    } catch (error) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BetterAuthError"](`Invalid base URL: ${url}. Please provide a valid base URL.`);
    }
}
function withPath(url, path = "/api/auth") {
    const hasPath = checkHasPath(url);
    if (hasPath) {
        return url;
    }
    const trimmedUrl = url.replace(/\/+$/, "");
    if (!path || path === "/") {
        return trimmedUrl;
    }
    path = path.startsWith("/") ? path : `/${path}`;
    return `${trimmedUrl}${path}`;
}
function getBaseURL(url, path, request, loadEnv) {
    if (url) {
        return withPath(url, path);
    }
    if (loadEnv !== false) {
        const fromEnv = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].BETTER_AUTH_URL || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].NEXT_PUBLIC_BETTER_AUTH_URL || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].PUBLIC_BETTER_AUTH_URL || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].NUXT_PUBLIC_BETTER_AUTH_URL || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].NUXT_PUBLIC_AUTH_URL || (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].BASE_URL !== "/" ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].BASE_URL : void 0);
        if (fromEnv) {
            return withPath(fromEnv, path);
        }
    }
    const fromRequest = request?.headers.get("x-forwarded-host");
    const fromRequestProto = request?.headers.get("x-forwarded-proto");
    if (fromRequest && fromRequestProto) {
        return withPath(`${fromRequestProto}://${fromRequest}`, path);
    }
    if (request) {
        const url2 = getOrigin(request.url);
        if (!url2) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BetterAuthError"]("Could not get origin from request. Please provide a valid base URL.");
        }
        return withPath(url2, path);
    }
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return void 0;
}
function getOrigin(url) {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.origin;
    } catch (error) {
        return null;
    }
}
function getProtocol(url) {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.protocol;
    } catch (error) {
        return null;
    }
}
function getHost(url) {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.host;
    } catch (error) {
        return null;
    }
}
;
}),
"[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.Ih8C76Vo.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "p",
    ()=>parseSetCookieHeader,
    "s",
    ()=>setCookieToHeader
]);
function parseSetCookieHeader(setCookie) {
    const cookies = /* @__PURE__ */ new Map();
    const cookieArray = setCookie.split(", ");
    cookieArray.forEach((cookieString)=>{
        const parts = cookieString.split(";").map((part)=>part.trim());
        const [nameValue, ...attributes] = parts;
        const [name, ...valueParts] = (nameValue || "").split("=");
        const value = valueParts.join("=");
        if (!name || value === void 0) {
            return;
        }
        const attrObj = {
            value
        };
        attributes.forEach((attribute)=>{
            const [attrName, ...attrValueParts] = attribute.split("=");
            const attrValue = attrValueParts.join("=");
            const normalizedAttrName = attrName.trim().toLowerCase();
            switch(normalizedAttrName){
                case "max-age":
                    attrObj["max-age"] = attrValue ? parseInt(attrValue.trim(), 10) : void 0;
                    break;
                case "expires":
                    attrObj.expires = attrValue ? new Date(attrValue.trim()) : void 0;
                    break;
                case "domain":
                    attrObj.domain = attrValue ? attrValue.trim() : void 0;
                    break;
                case "path":
                    attrObj.path = attrValue ? attrValue.trim() : void 0;
                    break;
                case "secure":
                    attrObj.secure = true;
                    break;
                case "httponly":
                    attrObj.httponly = true;
                    break;
                case "samesite":
                    attrObj.samesite = attrValue ? attrValue.trim().toLowerCase() : void 0;
                    break;
                default:
                    attrObj[normalizedAttrName] = attrValue ? attrValue.trim() : true;
                    break;
            }
        });
        cookies.set(name, attrObj);
    });
    return cookies;
}
function setCookieToHeader(headers) {
    return (context)=>{
        const setCookieHeader = context.response.headers.get("set-cookie");
        if (!setCookieHeader) {
            return;
        }
        const cookieMap = /* @__PURE__ */ new Map();
        const existingCookiesHeader = headers.get("cookie") || "";
        existingCookiesHeader.split(";").forEach((cookie)=>{
            const [name, ...rest] = cookie.trim().split("=");
            if (name && rest.length > 0) {
                cookieMap.set(name, rest.join("="));
            }
        });
        const setCookieHeaders = setCookieHeader.split(",");
        setCookieHeaders.forEach((header)=>{
            const cookies = parseSetCookieHeader(header);
            cookies.forEach((value, name)=>{
                cookieMap.set(name, value.value);
            });
        });
        const updatedCookies = Array.from(cookieMap.entries()).map(([name, value])=>`${name}=${value}`).join("; ");
        headers.set("cookie", updatedCookies);
    };
}
;
}),
"[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.D9_vQR83.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "a",
    ()=>setCookieCache,
    "b",
    ()=>getSessionCookie,
    "c",
    ()=>createCookieGetter,
    "d",
    ()=>deleteSessionCookie,
    "e",
    ()=>getCookieCache,
    "g",
    ()=>getCookies,
    "m",
    ()=>ms,
    "p",
    ()=>parseCookies,
    "s",
    ()=>setSessionCookie
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/error/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.CW6D9eSx.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/env/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/base64.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hmac$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/hmac.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BKEtEpt0$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.BKEtEpt0.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DR3R5wdU$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.DR3R5wdU.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$binary$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/binary.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Ih8C76Vo$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.Ih8C76Vo.mjs [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
//#region src/index.ts
const s = 1e3;
const m = s * 60;
const h = m * 60;
const d = h * 24;
const w = d * 7;
const y = d * 365.25;
const mo = y / 12;
function ms(value, options) {
    if (typeof value === "string") return parse(value);
    else if (typeof value === "number") return format(value);
    throw new Error(`Value provided to ms() must be a string or number. value=${JSON.stringify(value)}`);
}
/**
* Parse the given string and return milliseconds.
*
* @param str - A string to parse to milliseconds
* @returns The parsed value in milliseconds, or `NaN` if the string can't be
* parsed
*/ function parse(str) {
    if (typeof str !== "string" || str.length === 0 || str.length > 100) throw new Error(`Value provided to ms.parse() must be a string with length between 1 and 99. value=${JSON.stringify(str)}`);
    const match = /^(?<value>-?\d*\.?\d+) *(?<unit>milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|months?|mo|years?|yrs?|y)?$/i.exec(str);
    if (!match?.groups) return NaN;
    const { value, unit = "ms" } = match.groups;
    const n = parseFloat(value);
    const matchUnit = unit.toLowerCase();
    /* istanbul ignore next - istanbul doesn't understand, but thankfully the TypeScript the exhaustiveness check in the default case keeps us type safe here */ switch(matchUnit){
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
            return n * y;
        case "months":
        case "month":
        case "mo":
            return n * mo;
        case "weeks":
        case "week":
        case "w":
            return n * w;
        case "days":
        case "day":
        case "d":
            return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
            return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
            return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
            return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
            return n;
        default:
            throw new Error(`Unknown unit "${matchUnit}" provided to ms.parse(). value=${JSON.stringify(str)}`);
    }
}
/**
* Short format for `ms`.
*/ function fmtShort(ms$1) {
    const msAbs = Math.abs(ms$1);
    if (msAbs >= y) return `${Math.round(ms$1 / y)}y`;
    if (msAbs >= mo) return `${Math.round(ms$1 / mo)}mo`;
    if (msAbs >= w) return `${Math.round(ms$1 / w)}w`;
    if (msAbs >= d) return `${Math.round(ms$1 / d)}d`;
    if (msAbs >= h) return `${Math.round(ms$1 / h)}h`;
    if (msAbs >= m) return `${Math.round(ms$1 / m)}m`;
    if (msAbs >= s) return `${Math.round(ms$1 / s)}s`;
    return `${ms$1}ms`;
}
/**
* Format the given integer as a string.
*
* @param ms - milliseconds
* @param options - Options for the conversion
* @returns The formatted string
*/ function format(ms$1, options) {
    if (typeof ms$1 !== "number" || !Number.isFinite(ms$1)) throw new Error("Value provided to ms.format() must be of type number.");
    return fmtShort(ms$1);
}
function createCookieGetter(options) {
    const secure = options.advanced?.useSecureCookies !== void 0 ? options.advanced?.useSecureCookies : options.baseURL !== void 0 ? options.baseURL.startsWith("https://") ? true : false : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isProduction"];
    const secureCookiePrefix = secure ? "__Secure-" : "";
    const crossSubdomainEnabled = !!options.advanced?.crossSubDomainCookies?.enabled;
    const domain = crossSubdomainEnabled ? options.advanced?.crossSubDomainCookies?.domain || (options.baseURL ? new URL(options.baseURL).hostname : void 0) : void 0;
    if (crossSubdomainEnabled && !domain) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BetterAuthError"]("baseURL is required when crossSubdomainCookies are enabled");
    }
    function createCookie(cookieName, overrideAttributes = {}) {
        const prefix = options.advanced?.cookiePrefix || "better-auth";
        const name = options.advanced?.cookies?.[cookieName]?.name || `${prefix}.${cookieName}`;
        const attributes = options.advanced?.cookies?.[cookieName]?.attributes;
        return {
            name: `${secureCookiePrefix}${name}`,
            attributes: {
                secure: !!secureCookiePrefix,
                sameSite: "lax",
                path: "/",
                httpOnly: true,
                ...crossSubdomainEnabled ? {
                    domain
                } : {},
                ...options.advanced?.defaultCookieAttributes,
                ...overrideAttributes,
                ...attributes
            }
        };
    }
    return createCookie;
}
function getCookies(options) {
    const createCookie = createCookieGetter(options);
    const sessionMaxAge = options.session?.expiresIn || ms("7d") / 1e3;
    const sessionToken = createCookie("session_token", {
        maxAge: sessionMaxAge
    });
    const sessionData = createCookie("session_data", {
        maxAge: options.session?.cookieCache?.maxAge || 60 * 5
    });
    const dontRememberToken = createCookie("dont_remember");
    return {
        sessionToken: {
            name: sessionToken.name,
            options: sessionToken.attributes
        },
        /**
     * This cookie is used to store the session data in the cookie
     * This is useful for when you want to cache the session in the cookie
     */ sessionData: {
            name: sessionData.name,
            options: sessionData.attributes
        },
        dontRememberToken: {
            name: dontRememberToken.name,
            options: dontRememberToken.attributes
        }
    };
}
async function setCookieCache(ctx, session, dontRememberMe) {
    const shouldStoreSessionDataInCookie = ctx.context.options.session?.cookieCache?.enabled;
    if (shouldStoreSessionDataInCookie) {
        const filteredSession = Object.entries(session.session).reduce((acc, [key, value])=>{
            const fieldConfig = ctx.context.options.session?.additionalFields?.[key];
            if (!fieldConfig || fieldConfig.returned !== false) {
                acc[key] = value;
            }
            return acc;
        }, {});
        const sessionData = {
            session: filteredSession,
            user: session.user
        };
        const options = {
            ...ctx.context.authCookies.sessionData.options,
            maxAge: dontRememberMe ? void 0 : ctx.context.authCookies.sessionData.options.maxAge
        };
        const expiresAtDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])(options.maxAge || 60, "sec").getTime();
        const data = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["base64Url"].encode(JSON.stringify({
            session: sessionData,
            expiresAt: expiresAtDate,
            signature: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hmac$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createHMAC"])("SHA-256", "base64urlnopad").sign(ctx.context.secret, JSON.stringify({
                ...sessionData,
                expiresAt: expiresAtDate
            }))
        }), {
            padding: false
        });
        if (data.length > 4093) {
            ctx.context?.logger?.error(`Session data exceeds cookie size limit (${data.length} bytes > 4093 bytes). Consider reducing session data size or disabling cookie cache. Session will not be cached in cookie.`);
            return;
        }
        ctx.setCookie(ctx.context.authCookies.sessionData.name, data, options);
    }
}
async function setSessionCookie(ctx, session, dontRememberMe, overrides) {
    const dontRememberMeCookie = await ctx.getSignedCookie(ctx.context.authCookies.dontRememberToken.name, ctx.context.secret);
    dontRememberMe = dontRememberMe !== void 0 ? dontRememberMe : !!dontRememberMeCookie;
    const options = ctx.context.authCookies.sessionToken.options;
    const maxAge = dontRememberMe ? void 0 : ctx.context.sessionConfig.expiresIn;
    await ctx.setSignedCookie(ctx.context.authCookies.sessionToken.name, session.session.token, ctx.context.secret, {
        ...options,
        maxAge,
        ...overrides
    });
    if (dontRememberMe) {
        await ctx.setSignedCookie(ctx.context.authCookies.dontRememberToken.name, "true", ctx.context.secret, ctx.context.authCookies.dontRememberToken.options);
    }
    await setCookieCache(ctx, session, dontRememberMe);
    ctx.context.setNewSession(session);
    if (ctx.context.options.secondaryStorage) {
        await ctx.context.secondaryStorage?.set(session.session.token, JSON.stringify({
            user: session.user,
            session: session.session
        }), Math.floor((new Date(session.session.expiresAt).getTime() - Date.now()) / 1e3));
    }
}
function deleteSessionCookie(ctx, skipDontRememberMe) {
    ctx.setCookie(ctx.context.authCookies.sessionToken.name, "", {
        ...ctx.context.authCookies.sessionToken.options,
        maxAge: 0
    });
    ctx.setCookie(ctx.context.authCookies.sessionData.name, "", {
        ...ctx.context.authCookies.sessionData.options,
        maxAge: 0
    });
    if (!skipDontRememberMe) {
        ctx.setCookie(ctx.context.authCookies.dontRememberToken.name, "", {
            ...ctx.context.authCookies.dontRememberToken.options,
            maxAge: 0
        });
    }
}
function parseCookies(cookieHeader) {
    const cookies = cookieHeader.split("; ");
    const cookieMap = /* @__PURE__ */ new Map();
    cookies.forEach((cookie)=>{
        const [name, value] = cookie.split("=");
        cookieMap.set(name, value);
    });
    return cookieMap;
}
const getSessionCookie = (request, config)=>{
    if (config?.cookiePrefix) {
        if (config.cookieName) {
            config.cookiePrefix = `${config.cookiePrefix}-`;
        } else {
            config.cookiePrefix = `${config.cookiePrefix}.`;
        }
    }
    const headers = "headers" in request ? request.headers : request;
    const req = request instanceof Request ? request : void 0;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DR3R5wdU$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["a"])(req?.url, config?.path, req);
    const cookies = headers.get("cookie");
    if (!cookies) {
        return null;
    }
    const { cookieName = "session_token", cookiePrefix = "better-auth." } = config || {};
    const name = `${cookiePrefix}${cookieName}`;
    const secureCookieName = `__Secure-${name}`;
    const parsedCookie = parseCookies(cookies);
    const sessionToken = parsedCookie.get(name) || parsedCookie.get(secureCookieName);
    if (sessionToken) {
        return sessionToken;
    }
    return null;
};
const getCookieCache = async (request, config)=>{
    const headers = request instanceof Headers ? request : request.headers;
    const cookies = headers.get("cookie");
    if (!cookies) {
        return null;
    }
    const { cookieName = "session_data", cookiePrefix = "better-auth" } = config || {};
    const name = config?.isSecure !== void 0 ? config.isSecure ? `__Secure-${cookiePrefix}.${cookieName}` : `${cookiePrefix}.${cookieName}` : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isProduction"] ? `__Secure-${cookiePrefix}.${cookieName}` : `${cookiePrefix}.${cookieName}`;
    const parsedCookie = parseCookies(cookies);
    const sessionData = parsedCookie.get(name);
    if (sessionData) {
        const sessionDataPayload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BKEtEpt0$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["s"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$binary$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["binary"].decode(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["base64Url"].decode(sessionData)));
        if (!sessionDataPayload) {
            return null;
        }
        const secret = config?.secret || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].BETTER_AUTH_SECRET;
        if (!secret) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BetterAuthError"]("getCookieCache requires a secret to be provided. Either pass it as an option or set the BETTER_AUTH_SECRET environment variable");
        }
        const isValid = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hmac$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createHMAC"])("SHA-256", "base64urlnopad").verify(secret, JSON.stringify({
            ...sessionDataPayload.session,
            expiresAt: sessionDataPayload.expiresAt
        }), sessionDataPayload.signature);
        if (!isValid) {
            return null;
        }
        return sessionDataPayload.session;
    }
    return null;
};
;
}),
"[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.DEBtROF9.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "a",
    ()=>getSession,
    "b",
    ()=>revokeSessions,
    "c",
    ()=>revokeSession,
    "d",
    ()=>getSessionQuerySchema,
    "e",
    ()=>sensitiveSessionMiddleware,
    "f",
    ()=>freshSessionMiddleware,
    "g",
    ()=>getSessionFromCtx,
    "h",
    ()=>requestOnlySessionMiddleware,
    "l",
    ()=>listSessions,
    "r",
    ()=>revokeOtherSessions,
    "s",
    ()=>sessionMiddleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-call@1.0.19/node_modules/better-call/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/middleware/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.CW6D9eSx.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D9_vQR83$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.D9_vQR83.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@4.1.12/node_modules/zod/v4/classic/schemas.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@4.1.12/node_modules/zod/v4/classic/external.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BKEtEpt0$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.BKEtEpt0.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/error/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hmac$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/hmac.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/base64.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$binary$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/binary.mjs [app-route] (ecmascript)");
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
const getSessionQuerySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["optional"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
    /**
     * If cookie cache is enabled, it will disable the cache
     * and fetch the session from the database
     */ disableCookieCache: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["coerce"].boolean().meta({
        description: "Disable cookie cache and fetch session from database"
    }).optional(),
    disableRefresh: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["coerce"].boolean().meta({
        description: "Disable session refresh. Useful for checking session status, without updating the session"
    }).optional()
}));
const getSession = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthEndpoint"])("/get-session", {
        method: "GET",
        query: getSessionQuerySchema,
        requireHeaders: true,
        metadata: {
            openapi: {
                description: "Get the current session",
                responses: {
                    "200": {
                        description: "Success",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        session: {
                                            $ref: "#/components/schemas/Session"
                                        },
                                        user: {
                                            $ref: "#/components/schemas/User"
                                        }
                                    },
                                    required: [
                                        "session",
                                        "user"
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        }
    }, async (ctx)=>{
        try {
            const sessionCookieToken = await ctx.getSignedCookie(ctx.context.authCookies.sessionToken.name, ctx.context.secret);
            if (!sessionCookieToken) {
                return null;
            }
            const sessionDataCookie = ctx.getCookie(ctx.context.authCookies.sessionData.name);
            const sessionDataPayload = sessionDataCookie ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BKEtEpt0$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["s"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$binary$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["binary"].decode(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["base64Url"].decode(sessionDataCookie))) : null;
            if (sessionDataPayload) {
                const isValid = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hmac$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createHMAC"])("SHA-256", "base64urlnopad").verify(ctx.context.secret, JSON.stringify({
                    ...sessionDataPayload.session,
                    expiresAt: sessionDataPayload.expiresAt
                }), sessionDataPayload.signature);
                if (!isValid) {
                    const dataCookie = ctx.context.authCookies.sessionData.name;
                    ctx.setCookie(dataCookie, "", {
                        maxAge: 0
                    });
                    return ctx.json(null);
                }
            }
            const dontRememberMe = await ctx.getSignedCookie(ctx.context.authCookies.dontRememberToken.name, ctx.context.secret);
            if (sessionDataPayload?.session && ctx.context.options.session?.cookieCache?.enabled && !ctx.query?.disableCookieCache) {
                const session2 = sessionDataPayload.session;
                const hasExpired = sessionDataPayload.expiresAt < Date.now() || session2.session.expiresAt < /* @__PURE__ */ new Date();
                if (!hasExpired) {
                    ctx.context.session = session2;
                    return ctx.json(session2);
                } else {
                    const dataCookie = ctx.context.authCookies.sessionData.name;
                    ctx.setCookie(dataCookie, "", {
                        maxAge: 0
                    });
                }
            }
            const session = await ctx.context.internalAdapter.findSession(sessionCookieToken);
            ctx.context.session = session;
            if (!session || session.session.expiresAt < /* @__PURE__ */ new Date()) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D9_vQR83$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["d"])(ctx);
                if (session) {
                    await ctx.context.internalAdapter.deleteSession(session.session.token);
                }
                return ctx.json(null);
            }
            if (dontRememberMe || ctx.query?.disableRefresh) {
                return ctx.json(session);
            }
            const expiresIn = ctx.context.sessionConfig.expiresIn;
            const updateAge = ctx.context.sessionConfig.updateAge;
            const sessionIsDueToBeUpdatedDate = session.session.expiresAt.valueOf() - expiresIn * 1e3 + updateAge * 1e3;
            const shouldBeUpdated = sessionIsDueToBeUpdatedDate <= Date.now();
            if (shouldBeUpdated && (!ctx.query?.disableRefresh || !ctx.context.options.session?.disableSessionRefresh)) {
                const updatedSession = await ctx.context.internalAdapter.updateSession(session.session.token, {
                    expiresAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])(ctx.context.sessionConfig.expiresIn, "sec"),
                    updatedAt: /* @__PURE__ */ new Date()
                });
                if (!updatedSession) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D9_vQR83$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["d"])(ctx);
                    return ctx.json(null, {
                        status: 401
                    });
                }
                const maxAge = (updatedSession.expiresAt.valueOf() - Date.now()) / 1e3;
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D9_vQR83$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["s"])(ctx, {
                    session: updatedSession,
                    user: session.user
                }, false, {
                    maxAge
                });
                return ctx.json({
                    session: updatedSession,
                    user: session.user
                });
            }
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D9_vQR83$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["a"])(ctx, session, !!dontRememberMe);
            return ctx.json(session);
        } catch (error) {
            ctx.context.logger.error("INTERNAL_SERVER_ERROR", error);
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("INTERNAL_SERVER_ERROR", {
                message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].FAILED_TO_GET_SESSION
            });
        }
    });
const getSessionFromCtx = async (ctx, config)=>{
    if (ctx.context.session) {
        return ctx.context.session;
    }
    const session = await getSession()({
        ...ctx,
        asResponse: false,
        headers: ctx.headers,
        returnHeaders: false,
        query: {
            ...config,
            ...ctx.query
        }
    }).catch((e)=>{
        return null;
    });
    ctx.context.session = session;
    return session;
};
const sessionMiddleware = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthMiddleware"])(async (ctx)=>{
    const session = await getSessionFromCtx(ctx);
    if (!session?.session) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED");
    }
    return {
        session
    };
});
const sensitiveSessionMiddleware = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthMiddleware"])(async (ctx)=>{
    const session = await getSessionFromCtx(ctx, {
        disableCookieCache: true
    });
    if (!session?.session) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED");
    }
    return {
        session
    };
});
const requestOnlySessionMiddleware = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthMiddleware"])(async (ctx)=>{
    const session = await getSessionFromCtx(ctx);
    if (!session?.session && (ctx.request || ctx.headers)) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED");
    }
    return {
        session
    };
});
const freshSessionMiddleware = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthMiddleware"])(async (ctx)=>{
    const session = await getSessionFromCtx(ctx);
    if (!session?.session) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED");
    }
    if (ctx.context.sessionConfig.freshAge === 0) {
        return {
            session
        };
    }
    const freshAge = ctx.context.sessionConfig.freshAge;
    const lastUpdated = session.session.updatedAt?.valueOf() || session.session.createdAt.valueOf();
    const now = Date.now();
    const isFresh = now - lastUpdated < freshAge * 1e3;
    if (!isFresh) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("FORBIDDEN", {
            message: "Session is not fresh"
        });
    }
    return {
        session
    };
});
const listSessions = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthEndpoint"])("/list-sessions", {
        method: "GET",
        use: [
            sessionMiddleware
        ],
        requireHeaders: true,
        metadata: {
            openapi: {
                description: "List all active sessions for the user",
                responses: {
                    "200": {
                        description: "Success",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Session"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }, async (ctx)=>{
        try {
            const sessions = await ctx.context.internalAdapter.listSessions(ctx.context.session.user.id);
            const activeSessions = sessions.filter((session)=>{
                return session.expiresAt > /* @__PURE__ */ new Date();
            });
            return ctx.json(activeSessions);
        } catch (e) {
            ctx.context.logger.error(e);
            throw ctx.error("INTERNAL_SERVER_ERROR");
        }
    });
const revokeSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthEndpoint"])("/revoke-session", {
    method: "POST",
    body: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
        token: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "The token to revoke"
        })
    }),
    use: [
        sensitiveSessionMiddleware
    ],
    requireHeaders: true,
    metadata: {
        openapi: {
            description: "Revoke a single session",
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                token: {
                                    type: "string",
                                    description: "The token to revoke"
                                }
                            },
                            required: [
                                "token"
                            ]
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        description: "Indicates if the session was revoked successfully"
                                    }
                                },
                                required: [
                                    "status"
                                ]
                            }
                        }
                    }
                }
            }
        }
    }
}, async (ctx)=>{
    const token = ctx.body.token;
    const findSession = await ctx.context.internalAdapter.findSession(token);
    if (!findSession) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: "Session not found"
        });
    }
    if (findSession.session.userId !== ctx.context.session.user.id) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED");
    }
    try {
        await ctx.context.internalAdapter.deleteSession(token);
    } catch (error) {
        ctx.context.logger.error(error && typeof error === "object" && "name" in error ? error.name : "", error);
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("INTERNAL_SERVER_ERROR");
    }
    return ctx.json({
        status: true
    });
});
const revokeSessions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthEndpoint"])("/revoke-sessions", {
    method: "POST",
    use: [
        sensitiveSessionMiddleware
    ],
    requireHeaders: true,
    metadata: {
        openapi: {
            description: "Revoke all sessions for the user",
            responses: {
                "200": {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        description: "Indicates if all sessions were revoked successfully"
                                    }
                                },
                                required: [
                                    "status"
                                ]
                            }
                        }
                    }
                }
            }
        }
    }
}, async (ctx)=>{
    try {
        await ctx.context.internalAdapter.deleteSessions(ctx.context.session.user.id);
    } catch (error) {
        ctx.context.logger.error(error && typeof error === "object" && "name" in error ? error.name : "", error);
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("INTERNAL_SERVER_ERROR");
    }
    return ctx.json({
        status: true
    });
});
const revokeOtherSessions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthEndpoint"])("/revoke-other-sessions", {
    method: "POST",
    requireHeaders: true,
    use: [
        sensitiveSessionMiddleware
    ],
    metadata: {
        openapi: {
            description: "Revoke all other sessions for the user except the current one",
            responses: {
                "200": {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        description: "Indicates if all other sessions were revoked successfully"
                                    }
                                },
                                required: [
                                    "status"
                                ]
                            }
                        }
                    }
                }
            }
        }
    }
}, async (ctx)=>{
    const session = ctx.context.session;
    if (!session.user) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED");
    }
    const sessions = await ctx.context.internalAdapter.listSessions(session.user.id);
    const activeSessions = sessions.filter((session2)=>{
        return session2.expiresAt > /* @__PURE__ */ new Date();
    });
    const otherSessions = activeSessions.filter((session2)=>session2.token !== ctx.context.session.session.token);
    await Promise.all(otherSessions.map((session2)=>ctx.context.internalAdapter.deleteSession(session2.token)));
    return ctx.json({
        status: true
    });
});
;
}),
"[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.BUPPRXfK.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "g",
    ()=>generateId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$random$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/random.mjs [app-route] (ecmascript)");
;
const generateId = (size)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$random$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRandomStringGenerator"])("a-z", "A-Z", "0-9")(size || 32);
};
;
}),
"[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.B4Qoxdgc.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "g",
    ()=>generateRandomString
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$random$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/random.mjs [app-route] (ecmascript)");
;
const generateRandomString = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$random$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRandomStringGenerator"])("a-z", "0-9", "A-Z", "-_");
;
}),
"[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.Cwj9dt6i.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "a",
    ()=>parseAccountOutput,
    "b",
    ()=>parseSessionOutput,
    "c",
    ()=>parseInputData,
    "d",
    ()=>parseUserInput,
    "e",
    ()=>parseAdditionalUserInput,
    "f",
    ()=>parseAccountInput,
    "g",
    ()=>parseSessionInput,
    "m",
    ()=>mergeSchema,
    "p",
    ()=>parseUserOutput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-call@1.0.19/node_modules/better-call/dist/index.js [app-route] (ecmascript)");
;
const cache = /* @__PURE__ */ new WeakMap();
function parseOutputData(data, schema) {
    const fields = schema.fields;
    const parsedData = {};
    for(const key in data){
        const field = fields[key];
        if (!field) {
            parsedData[key] = data[key];
            continue;
        }
        if (field.returned === false) {
            continue;
        }
        parsedData[key] = data[key];
    }
    return parsedData;
}
function getAllFields(options, table) {
    if (!cache.has(options)) {
        cache.set(options, /* @__PURE__ */ new Map());
    }
    const tableCache = cache.get(options);
    if (tableCache.has(table)) {
        return tableCache.get(table);
    }
    let schema = {
        ...table === "user" ? options.user?.additionalFields : {},
        ...table === "session" ? options.session?.additionalFields : {}
    };
    for (const plugin of options.plugins || []){
        if (plugin.schema && plugin.schema[table]) {
            schema = {
                ...schema,
                ...plugin.schema[table].fields
            };
        }
    }
    cache.get(options).set(table, schema);
    return schema;
}
function parseUserOutput(options, user) {
    const schema = getAllFields(options, "user");
    return parseOutputData(user, {
        fields: schema
    });
}
function parseAccountOutput(options, account) {
    const schema = getAllFields(options, "account");
    return parseOutputData(account, {
        fields: schema
    });
}
function parseSessionOutput(options, session) {
    const schema = getAllFields(options, "session");
    return parseOutputData(session, {
        fields: schema
    });
}
function parseInputData(data, schema) {
    const action = schema.action || "create";
    const fields = schema.fields;
    const parsedData = Object.assign(/* @__PURE__ */ Object.create(null), null);
    for(const key in fields){
        if (key in data) {
            if (fields[key].input === false) {
                if (fields[key].defaultValue !== void 0) {
                    if (action !== "update") {
                        parsedData[key] = fields[key].defaultValue;
                        continue;
                    }
                }
                if (data[key]) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: `${key} is not allowed to be set`
                    });
                }
                continue;
            }
            if (fields[key].validator?.input && data[key] !== void 0) {
                parsedData[key] = fields[key].validator.input.parse(data[key]);
                continue;
            }
            if (fields[key].transform?.input && data[key] !== void 0) {
                parsedData[key] = fields[key].transform?.input(data[key]);
                continue;
            }
            parsedData[key] = data[key];
            continue;
        }
        if (fields[key].defaultValue !== void 0 && action === "create") {
            parsedData[key] = fields[key].defaultValue;
            continue;
        }
        if (fields[key].required && action === "create") {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                message: `${key} is required`
            });
        }
    }
    return parsedData;
}
function parseUserInput(options, user = {}, action) {
    const schema = getAllFields(options, "user");
    return parseInputData(user, {
        fields: schema,
        action
    });
}
function parseAdditionalUserInput(options, user) {
    const schema = getAllFields(options, "user");
    return parseInputData(user || {}, {
        fields: schema
    });
}
function parseAccountInput(options, account) {
    const schema = getAllFields(options, "account");
    return parseInputData(account, {
        fields: schema
    });
}
function parseSessionInput(options, session) {
    const schema = getAllFields(options, "session");
    return parseInputData(session, {
        fields: schema
    });
}
function mergeSchema(schema, newSchema) {
    if (!newSchema) {
        return schema;
    }
    for(const table in newSchema){
        const newModelName = newSchema[table]?.modelName;
        if (newModelName) {
            schema[table].modelName = newModelName;
        }
        for(const field in schema[table].fields){
            const newField = newSchema[table]?.fields?.[field];
            if (!newField) {
                continue;
            }
            schema[table].fields[field].fieldName = newField;
        }
    }
    return schema;
}
;
}),
"[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/crypto/index.mjs [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "compareHash",
    ()=>compareHash,
    "constantTimeEqual",
    ()=>constantTimeEqual,
    "hashPassword",
    ()=>hashPassword,
    "hashToBase64",
    ()=>hashToBase64,
    "signJWT",
    ()=>signJWT,
    "symmetricDecrypt",
    ()=>symmetricDecrypt,
    "symmetricEncrypt",
    ()=>symmetricEncrypt,
    "verifyPassword",
    ()=>verifyPassword
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/hash.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$noble$2b$ciphers$40$2$2e$0$2e$1$2f$node_modules$2f40$noble$2f$ciphers$2f$chacha$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@noble+ciphers@2.0.1/node_modules/@noble/ciphers/chacha.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$noble$2b$ciphers$40$2$2e$0$2e$1$2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@noble+ciphers@2.0.1/node_modules/@noble/ciphers/utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/base64.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$1$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.1.1/node_modules/jose/dist/webapi/jwt/sign.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$noble$2b$hashes$40$2$2e$0$2e$1$2f$node_modules$2f40$noble$2f$hashes$2f$scrypt$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@noble+hashes@2.0.1/node_modules/@noble/hashes/scrypt.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/hex.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$noble$2b$hashes$40$2$2e$0$2e$1$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@noble+hashes@2.0.1/node_modules/@noble/hashes/utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/error/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.B4Qoxdgc.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$random$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/random.mjs [app-route] (ecmascript)");
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
async function signJWT(payload, secret, expiresIn = 3600) {
    const jwt = await new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$1$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SignJWT"](payload).setProtectedHeader({
        alg: "HS256"
    }).setIssuedAt().setExpirationTime(Math.floor(Date.now() / 1e3) + expiresIn).sign(new TextEncoder().encode(secret));
    return jwt;
}
function constantTimeEqual(a, b) {
    const aBuffer = new Uint8Array(a);
    const bBuffer = new Uint8Array(b);
    let c = aBuffer.length ^ bBuffer.length;
    const length = Math.max(aBuffer.length, bBuffer.length);
    for(let i = 0; i < length; i++){
        c |= (i < aBuffer.length ? aBuffer[i] : 0) ^ (i < bBuffer.length ? bBuffer[i] : 0);
    }
    return c === 0;
}
async function hashToBase64(data) {
    const buffer = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createHash"])("SHA-256").digest(data);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["base64"].encode(buffer);
}
async function compareHash(data, hash) {
    const buffer = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createHash"])("SHA-256").digest(typeof data === "string" ? new TextEncoder().encode(data) : data);
    const hashBuffer = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["base64"].decode(hash);
    return constantTimeEqual(buffer, hashBuffer);
}
const config = {
    N: 16384,
    r: 16,
    p: 1,
    dkLen: 64
};
async function generateKey(password, salt) {
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$noble$2b$hashes$40$2$2e$0$2e$1$2f$node_modules$2f40$noble$2f$hashes$2f$scrypt$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["scryptAsync"])(password.normalize("NFKC"), salt, {
        N: config.N,
        p: config.p,
        r: config.r,
        dkLen: config.dkLen,
        maxmem: 128 * config.N * config.r * 2
    });
}
const hashPassword = async (password)=>{
    const salt = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hex"].encode(crypto.getRandomValues(new Uint8Array(16)));
    const key = await generateKey(password, salt);
    return `${salt}:${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hex"].encode(key)}`;
};
const verifyPassword = async ({ hash, password })=>{
    const [salt, key] = hash.split(":");
    if (!salt || !key) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BetterAuthError"]("Invalid password hash");
    }
    const targetKey = await generateKey(password, salt);
    return constantTimeEqual(targetKey, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$noble$2b$hashes$40$2$2e$0$2e$1$2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hexToBytes"])(key));
};
const symmetricEncrypt = async ({ key, data })=>{
    const keyAsBytes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createHash"])("SHA-256").digest(key);
    const dataAsBytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$noble$2b$ciphers$40$2$2e$0$2e$1$2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["utf8ToBytes"])(data);
    const chacha = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$noble$2b$ciphers$40$2$2e$0$2e$1$2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["managedNonce"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$noble$2b$ciphers$40$2$2e$0$2e$1$2f$node_modules$2f40$noble$2f$ciphers$2f$chacha$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["xchacha20poly1305"])(new Uint8Array(keyAsBytes));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$noble$2b$ciphers$40$2$2e$0$2e$1$2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bytesToHex"])(chacha.encrypt(dataAsBytes));
};
const symmetricDecrypt = async ({ key, data })=>{
    const keyAsBytes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createHash"])("SHA-256").digest(key);
    const dataAsBytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$noble$2b$ciphers$40$2$2e$0$2e$1$2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hexToBytes"])(data);
    const chacha = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$noble$2b$ciphers$40$2$2e$0$2e$1$2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["managedNonce"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$noble$2b$ciphers$40$2$2e$0$2e$1$2f$node_modules$2f40$noble$2f$ciphers$2f$chacha$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["xchacha20poly1305"])(new Uint8Array(keyAsBytes));
    return new TextDecoder().decode(chacha.decrypt(dataAsBytes));
};
;
}),
"[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.BX9UB8EP.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "A",
    ()=>changeEmail,
    "B",
    ()=>sendVerificationEmail,
    "C",
    ()=>verifyEmail,
    "D",
    ()=>resetPassword,
    "E",
    ()=>forgetPassword,
    "F",
    ()=>signInEmail,
    "G",
    ()=>signOut,
    "H",
    ()=>HIDE_METADATA,
    "I",
    ()=>callbackOAuth,
    "J",
    ()=>signInSocial,
    "K",
    ()=>sendVerificationEmailFn,
    "L",
    ()=>isSimpleRequest,
    "a",
    ()=>originCheckMiddleware,
    "b",
    ()=>ok,
    "c",
    ()=>createEmailVerificationToken,
    "d",
    ()=>decryptOAuthToken,
    "e",
    ()=>error,
    "f",
    ()=>accountInfo,
    "g",
    ()=>generateState,
    "h",
    ()=>handleOAuthUserInfo,
    "i",
    ()=>getAccessToken,
    "j",
    ()=>unlinkAccount,
    "k",
    ()=>deleteUserCallback,
    "l",
    ()=>listUserAccounts,
    "m",
    ()=>linkSocialAccount,
    "n",
    ()=>requestPasswordResetCallback,
    "o",
    ()=>originCheck,
    "p",
    ()=>parseState,
    "q",
    ()=>requestPasswordReset,
    "r",
    ()=>refreshToken,
    "s",
    ()=>setTokenUtil,
    "t",
    ()=>toAuthEndpoints,
    "u",
    ()=>updateUser,
    "v",
    ()=>forgetPasswordCallback,
    "w",
    ()=>wildcardMatch,
    "x",
    ()=>deleteUser,
    "y",
    ()=>setPassword,
    "z",
    ()=>changePassword
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@4.1.12/node_modules/zod/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@4.1.12/node_modules/zod/v4/classic/schemas.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@4.1.12/node_modules/zod/v4/classic/external.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D9_vQR83$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.D9_vQR83.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-call@1.0.19/node_modules/better-call/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/middleware/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$random$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/random.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/error/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/social-providers/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BKEtEpt0$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.BKEtEpt0.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DEBtROF9$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.DEBtROF9.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.CW6D9eSx.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BUPPRXfK$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.BUPPRXfK.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/hash.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/base64.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$1$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.1.1/node_modules/jose/dist/webapi/jwt/verify.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/hex.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.B4Qoxdgc.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Cwj9dt6i$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.Cwj9dt6i.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/env/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hmac$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/hmac.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$binary$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/binary.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/db/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/db/adapter/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$defu$40$6$2e$1$2e$4$2f$node_modules$2f$defu$2f$dist$2f$defu$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/defu@6.1.4/node_modules/defu/dist/defu.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/crypto/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DR3R5wdU$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.DR3R5wdU.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$1$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.1.1/node_modules/jose/dist/webapi/util/errors.js [app-route] (ecmascript)");
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
;
;
;
;
;
;
;
function escapeRegExpChar(char) {
    if (char === "-" || char === "^" || char === "$" || char === "+" || char === "." || char === "(" || char === ")" || char === "|" || char === "[" || char === "]" || char === "{" || char === "}" || char === "*" || char === "?" || char === "\\") {
        return `\\${char}`;
    } else {
        return char;
    }
}
function escapeRegExpString(str) {
    let result = "";
    for(let i = 0; i < str.length; i++){
        result += escapeRegExpChar(str[i]);
    }
    return result;
}
function transform(pattern, separator = true) {
    if (Array.isArray(pattern)) {
        let regExpPatterns = pattern.map((p)=>`^${transform(p, separator)}$`);
        return `(?:${regExpPatterns.join("|")})`;
    }
    let separatorSplitter = "";
    let separatorMatcher = "";
    let wildcard = ".";
    if (separator === true) {
        separatorSplitter = "/";
        separatorMatcher = "[/\\\\]";
        wildcard = "[^/\\\\]";
    } else if (separator) {
        separatorSplitter = separator;
        separatorMatcher = escapeRegExpString(separatorSplitter);
        if (separatorMatcher.length > 1) {
            separatorMatcher = `(?:${separatorMatcher})`;
            wildcard = `((?!${separatorMatcher}).)`;
        } else {
            wildcard = `[^${separatorMatcher}]`;
        }
    }
    let requiredSeparator = separator ? `${separatorMatcher}+?` : "";
    let optionalSeparator = separator ? `${separatorMatcher}*?` : "";
    let segments = separator ? pattern.split(separatorSplitter) : [
        pattern
    ];
    let result = "";
    for(let s = 0; s < segments.length; s++){
        let segment = segments[s];
        let nextSegment = segments[s + 1];
        let currentSeparator = "";
        if (!segment && s > 0) {
            continue;
        }
        if (separator) {
            if (s === segments.length - 1) {
                currentSeparator = optionalSeparator;
            } else if (nextSegment !== "**") {
                currentSeparator = requiredSeparator;
            } else {
                currentSeparator = "";
            }
        }
        if (separator && segment === "**") {
            if (currentSeparator) {
                result += s === 0 ? "" : currentSeparator;
                result += `(?:${wildcard}*?${currentSeparator})*?`;
            }
            continue;
        }
        for(let c = 0; c < segment.length; c++){
            let char = segment[c];
            if (char === "\\") {
                if (c < segment.length - 1) {
                    result += escapeRegExpChar(segment[c + 1]);
                    c++;
                }
            } else if (char === "?") {
                result += wildcard;
            } else if (char === "*") {
                result += `${wildcard}*?`;
            } else {
                result += escapeRegExpChar(char);
            }
        }
        result += currentSeparator;
    }
    return result;
}
function isMatch(regexp, sample) {
    if (typeof sample !== "string") {
        throw new TypeError(`Sample must be a string, but ${typeof sample} given`);
    }
    return regexp.test(sample);
}
function wildcardMatch(pattern, options) {
    if (typeof pattern !== "string" && !Array.isArray(pattern)) {
        throw new TypeError(`The first argument must be a single pattern string or an array of patterns, but ${typeof pattern} given`);
    }
    if (typeof options === "string" || typeof options === "boolean") {
        options = {
            separator: options
        };
    }
    if (arguments.length === 2 && !(typeof options === "undefined" || typeof options === "object" && options !== null && !Array.isArray(options))) {
        throw new TypeError(`The second argument must be an options object or a string/boolean separator, but ${typeof options} given`);
    }
    options = options || {};
    if (options.separator === "\\") {
        throw new Error("\\ is not a valid separator because it is used for escaping. Try setting the separator to `true` instead");
    }
    let regexpPattern = transform(pattern, options.separator);
    let regexp = new RegExp(`^${regexpPattern}$`, options.flags);
    let fn = isMatch.bind(null, regexp);
    fn.options = options;
    fn.pattern = pattern;
    fn.regexp = regexp;
    return fn;
}
const originCheckMiddleware = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthMiddleware"])(async (ctx)=>{
    if (ctx.request?.method !== "POST" || !ctx.request) {
        return;
    }
    const headers = ctx.request?.headers;
    const request = ctx.request;
    const { body, query, context } = ctx;
    if (isSimpleRequest(headers) && !ctx.context.skipCSRFCheck) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("FORBIDDEN", {
            message: "Invalid request"
        });
    }
    const originHeader = headers?.get("origin") || headers?.get("referer") || "";
    const callbackURL = body?.callbackURL || query?.callbackURL;
    const redirectURL = body?.redirectTo;
    const errorCallbackURL = body?.errorCallbackURL;
    const newUserCallbackURL = body?.newUserCallbackURL;
    const trustedOrigins = Array.isArray(context.options.trustedOrigins) ? context.trustedOrigins : [
        ...context.trustedOrigins,
        ...await context.options.trustedOrigins?.(request) || []
    ];
    const useCookies = headers?.has("cookie");
    const matchesPattern = (url, pattern)=>{
        if (url.startsWith("/")) {
            return false;
        }
        if (pattern.includes("*")) {
            if (pattern.includes("://")) {
                return wildcardMatch(pattern)((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DR3R5wdU$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])(url) || url);
            }
            const host = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DR3R5wdU$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["b"])(url);
            if (!host) {
                return false;
            }
            return wildcardMatch(pattern)(host);
        }
        const protocol = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DR3R5wdU$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["c"])(url);
        return protocol === "http:" || protocol === "https:" || !protocol ? pattern === (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DR3R5wdU$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])(url) : url.startsWith(pattern);
    };
    const validateURL = (url, label)=>{
        if (!url) {
            return;
        }
        const isTrustedOrigin = trustedOrigins.some((origin)=>matchesPattern(url, origin) || url?.startsWith("/") && label !== "origin" && /^\/(?!\/|\\|%2f|%5c)[\w\-.\+/@]*(?:\?[\w\-.\+/=&%@]*)?$/.test(url));
        if (!isTrustedOrigin) {
            ctx.context.logger.error(`Invalid ${label}: ${url}`);
            ctx.context.logger.info(`If it's a valid URL, please add ${url} to trustedOrigins in your auth config
`, `Current list of trustedOrigins: ${trustedOrigins}`);
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("FORBIDDEN", {
                message: `Invalid ${label}`
            });
        }
    };
    if (useCookies && !ctx.context.skipCSRFCheck && !ctx.context.skipOriginCheck) {
        if (!originHeader || originHeader === "null") {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("FORBIDDEN", {
                message: "Missing or null Origin"
            });
        }
        validateURL(originHeader, "origin");
    }
    callbackURL && validateURL(callbackURL, "callbackURL");
    redirectURL && validateURL(redirectURL, "redirectURL");
    errorCallbackURL && validateURL(errorCallbackURL, "errorCallbackURL");
    newUserCallbackURL && validateURL(newUserCallbackURL, "newUserCallbackURL");
});
const originCheck = (getValue)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthMiddleware"])(async (ctx)=>{
        if (!ctx.request) {
            return;
        }
        const { context } = ctx;
        const callbackURL = getValue(ctx);
        const trustedOrigins = Array.isArray(context.options.trustedOrigins) ? context.trustedOrigins : [
            ...context.trustedOrigins,
            ...await context.options.trustedOrigins?.(ctx.request) || []
        ];
        const matchesPattern = (url, pattern)=>{
            if (url.startsWith("/")) {
                return false;
            }
            if (pattern.includes("*")) {
                if (pattern.includes("://")) {
                    return wildcardMatch(pattern)((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DR3R5wdU$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])(url) || url);
                }
                const host = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DR3R5wdU$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["b"])(url);
                if (!host) {
                    return false;
                }
                return wildcardMatch(pattern)(host);
            }
            const protocol = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DR3R5wdU$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["c"])(url);
            return protocol === "http:" || protocol === "https:" || !protocol ? pattern === (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DR3R5wdU$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])(url) : url.startsWith(pattern);
        };
        const validateURL = (url, label)=>{
            if (!url) {
                return;
            }
            const isTrustedOrigin = trustedOrigins.some((origin)=>matchesPattern(url, origin) || url?.startsWith("/") && label !== "origin" && /^\/(?!\/|\\|%2f|%5c)[\w\-.\+/@]*(?:\?[\w\-.\+/=&%@]*)?$/.test(url));
            if (!isTrustedOrigin) {
                ctx.context.logger.error(`Invalid ${label}: ${url}`);
                ctx.context.logger.info(`If it's a valid URL, please add ${url} to trustedOrigins in your auth config
`, `Current list of trustedOrigins: ${trustedOrigins}`);
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("FORBIDDEN", {
                    message: `Invalid ${label}`
                });
            }
        };
        const callbacks = Array.isArray(callbackURL) ? callbackURL : [
            callbackURL
        ];
        for (const url of callbacks){
            validateURL(url, "callbackURL");
        }
    });
function isSimpleRequest(headers) {
    const SIMPLE_HEADERS = [
        "accept",
        "accept-language",
        "content-language",
        "content-type"
    ];
    const SIMPLE_CONTENT_TYPES = [
        "application/x-www-form-urlencoded",
        "multipart/form-data",
        "text/plain"
    ];
    for (const [key, value] of headers.entries()){
        if (!SIMPLE_HEADERS.includes(key.toLowerCase())) {
            return false;
        }
        if (key.toLowerCase() === "content-type" && !SIMPLE_CONTENT_TYPES.includes(value?.split(";")[0]?.trim()?.toLowerCase() || "")) {
            return false;
        }
    }
    return true;
}
async function createEmailVerificationToken(secret, email, updateTo, expiresIn = 3600) {
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["signJWT"])({
        email: email.toLowerCase(),
        updateTo
    }, secret, expiresIn);
    return token;
}
async function sendVerificationEmailFn(ctx, user) {
    if (!ctx.context.options.emailVerification?.sendVerificationEmail) {
        ctx.context.logger.error("Verification email isn't enabled.");
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: "Verification email isn't enabled"
        });
    }
    const token = await createEmailVerificationToken(ctx.context.secret, user.email, void 0, ctx.context.options.emailVerification?.expiresIn);
    const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${ctx.body.callbackURL || "/"}`;
    await ctx.context.options.emailVerification.sendVerificationEmail({
        user,
        url,
        token
    }, ctx.request);
}
const sendVerificationEmail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthEndpoint"])("/send-verification-email", {
    method: "POST",
    body: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
        email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["email"]().meta({
            description: "The email to send the verification email to"
        }),
        callbackURL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "The URL to use for email verification callback"
        }).optional()
    }),
    metadata: {
        openapi: {
            description: "Send a verification email to the user",
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                email: {
                                    type: "string",
                                    description: "The email to send the verification email to",
                                    example: "user@example.com"
                                },
                                callbackURL: {
                                    type: "string",
                                    description: "The URL to use for email verification callback",
                                    example: "https://example.com/callback",
                                    nullable: true
                                }
                            },
                            required: [
                                "email"
                            ]
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        description: "Indicates if the email was sent successfully",
                                        example: true
                                    }
                                }
                            }
                        }
                    }
                },
                "400": {
                    description: "Bad Request",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        description: "Error message",
                                        example: "Verification email isn't enabled"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}, async (ctx)=>{
    if (!ctx.context.options.emailVerification?.sendVerificationEmail) {
        ctx.context.logger.error("Verification email isn't enabled.");
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: "Verification email isn't enabled"
        });
    }
    const { email } = ctx.body;
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DEBtROF9$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])(ctx);
    if (!session) {
        const user = await ctx.context.internalAdapter.findUserByEmail(email);
        if (!user) {
            return ctx.json({
                status: true
            });
        }
        await sendVerificationEmailFn(ctx, user.user);
        return ctx.json({
            status: true
        });
    }
    if (session?.user.emailVerified) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: "You can only send a verification email to an unverified email"
        });
    }
    if (session?.user.email !== email) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: "You can only send a verification email to your own email"
        });
    }
    await sendVerificationEmailFn(ctx, session.user);
    return ctx.json({
        status: true
    });
});
const verifyEmail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthEndpoint"])("/verify-email", {
    method: "GET",
    query: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
        token: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "The token to verify the email"
        }),
        callbackURL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "The URL to redirect to after email verification"
        }).optional()
    }),
    use: [
        originCheck((ctx)=>ctx.query.callbackURL)
    ],
    metadata: {
        openapi: {
            description: "Verify the email of the user",
            parameters: [
                {
                    name: "token",
                    in: "query",
                    description: "The token to verify the email",
                    required: true,
                    schema: {
                        type: "string"
                    }
                },
                {
                    name: "callbackURL",
                    in: "query",
                    description: "The URL to redirect to after email verification",
                    required: false,
                    schema: {
                        type: "string"
                    }
                }
            ],
            responses: {
                "200": {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    user: {
                                        type: "object",
                                        properties: {
                                            id: {
                                                type: "string",
                                                description: "User ID"
                                            },
                                            email: {
                                                type: "string",
                                                description: "User email"
                                            },
                                            name: {
                                                type: "string",
                                                description: "User name"
                                            },
                                            image: {
                                                type: "string",
                                                description: "User image URL"
                                            },
                                            emailVerified: {
                                                type: "boolean",
                                                description: "Indicates if the user email is verified"
                                            },
                                            createdAt: {
                                                type: "string",
                                                description: "User creation date"
                                            },
                                            updatedAt: {
                                                type: "string",
                                                description: "User update date"
                                            }
                                        },
                                        required: [
                                            "id",
                                            "email",
                                            "name",
                                            "image",
                                            "emailVerified",
                                            "createdAt",
                                            "updatedAt"
                                        ]
                                    },
                                    status: {
                                        type: "boolean",
                                        description: "Indicates if the email was verified successfully"
                                    }
                                },
                                required: [
                                    "user",
                                    "status"
                                ]
                            }
                        }
                    }
                }
            }
        }
    }
}, async (ctx)=>{
    function redirectOnError(error) {
        if (ctx.query.callbackURL) {
            if (ctx.query.callbackURL.includes("?")) {
                throw ctx.redirect(`${ctx.query.callbackURL}&error=${error}`);
            }
            throw ctx.redirect(`${ctx.query.callbackURL}?error=${error}`);
        }
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
            message: error
        });
    }
    const { token } = ctx.query;
    let jwt;
    try {
        jwt = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$1$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jwtVerify"])(token, new TextEncoder().encode(ctx.context.secret), {
            algorithms: [
                "HS256"
            ]
        });
    } catch (e) {
        if (e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$1$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWTExpired"]) {
            return redirectOnError("token_expired");
        }
        return redirectOnError("invalid_token");
    }
    const schema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
        email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().email(),
        updateTo: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().optional()
    });
    const parsed = schema.parse(jwt.payload);
    const user = await ctx.context.internalAdapter.findUserByEmail(parsed.email);
    if (!user) {
        return redirectOnError("user_not_found");
    }
    if (parsed.updateTo) {
        const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DEBtROF9$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])(ctx);
        if (!session) {
            if (ctx.query.callbackURL) {
                throw ctx.redirect(`${ctx.query.callbackURL}?error=unauthorized`);
            }
            return redirectOnError("unauthorized");
        }
        if (session.user.email !== parsed.email) {
            if (ctx.query.callbackURL) {
                throw ctx.redirect(`${ctx.query.callbackURL}?error=unauthorized`);
            }
            return redirectOnError("unauthorized");
        }
        const updatedUser2 = await ctx.context.internalAdapter.updateUserByEmail(parsed.email, {
            email: parsed.updateTo,
            emailVerified: false
        }, ctx);
        const newToken = await createEmailVerificationToken(ctx.context.secret, parsed.updateTo);
        await ctx.context.options.emailVerification?.sendVerificationEmail?.({
            user: updatedUser2,
            url: `${ctx.context.baseURL}/verify-email?token=${newToken}&callbackURL=${ctx.query.callbackURL || "/"}`,
            token: newToken
        }, ctx.request);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D9_vQR83$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["s"])(ctx, {
            session: session.session,
            user: {
                ...session.user,
                email: parsed.updateTo,
                emailVerified: false
            }
        });
        if (ctx.query.callbackURL) {
            throw ctx.redirect(ctx.query.callbackURL);
        }
        return ctx.json({
            status: true,
            user: {
                id: updatedUser2.id,
                email: updatedUser2.email,
                name: updatedUser2.name,
                image: updatedUser2.image,
                emailVerified: updatedUser2.emailVerified,
                createdAt: updatedUser2.createdAt,
                updatedAt: updatedUser2.updatedAt
            }
        });
    }
    if (ctx.context.options.emailVerification?.onEmailVerification) {
        await ctx.context.options.emailVerification.onEmailVerification(user.user, ctx.request);
    }
    const updatedUser = await ctx.context.internalAdapter.updateUserByEmail(parsed.email, {
        emailVerified: true
    }, ctx);
    if (ctx.context.options.emailVerification?.afterEmailVerification) {
        await ctx.context.options.emailVerification.afterEmailVerification(updatedUser, ctx.request);
    }
    if (ctx.context.options.emailVerification?.autoSignInAfterVerification) {
        const currentSession = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DEBtROF9$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])(ctx);
        if (!currentSession || currentSession.user.email !== parsed.email) {
            const session = await ctx.context.internalAdapter.createSession(user.user.id, ctx);
            if (!session) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("INTERNAL_SERVER_ERROR", {
                    message: "Failed to create session"
                });
            }
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D9_vQR83$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["s"])(ctx, {
                session,
                user: {
                    ...user.user,
                    emailVerified: true
                }
            });
        } else {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D9_vQR83$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["s"])(ctx, {
                session: currentSession.session,
                user: {
                    ...currentSession.user,
                    emailVerified: true
                }
            });
        }
    }
    if (ctx.query.callbackURL) {
        throw ctx.redirect(ctx.query.callbackURL);
    }
    return ctx.json({
        status: true,
        user: null
    });
});
const HIDE_METADATA = {
    isAction: false
};
async function generateState(c, link) {
    const callbackURL = c.body?.callbackURL || c.context.options.baseURL;
    if (!callbackURL) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: "callbackURL is required"
        });
    }
    const codeVerifier = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])(128);
    const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])(32);
    const stateCookie = c.context.createAuthCookie("state", {
        maxAge: 5 * 60 * 1e3
    });
    await c.setSignedCookie(stateCookie.name, state, c.context.secret, stateCookie.attributes);
    const data = JSON.stringify({
        callbackURL,
        codeVerifier,
        errorURL: c.body?.errorCallbackURL,
        newUserURL: c.body?.newUserCallbackURL,
        link,
        /**
     * This is the actual expiry time of the state
     */ expiresAt: Date.now() + 10 * 60 * 1e3,
        requestSignUp: c.body?.requestSignUp
    });
    const expiresAt = /* @__PURE__ */ new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);
    const verification = await c.context.internalAdapter.createVerificationValue({
        value: data,
        identifier: state,
        expiresAt
    }, c);
    if (!verification) {
        c.context.logger.error("Unable to create verification. Make sure the database adapter is properly working and there is a verification table in the database");
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("INTERNAL_SERVER_ERROR", {
            message: "Unable to create verification"
        });
    }
    return {
        state: verification.identifier,
        codeVerifier
    };
}
async function parseState(c) {
    const state = c.query.state || c.body.state;
    const data = await c.context.internalAdapter.findVerificationValue(state);
    if (!data) {
        c.context.logger.error("State Mismatch. Verification not found", {
            state
        });
        const errorURL = c.context.options.onAPIError?.errorURL || `${c.context.baseURL}/error`;
        throw c.redirect(`${errorURL}?error=please_restart_the_process`);
    }
    const parsedData = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
        callbackURL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"](),
        codeVerifier: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"](),
        errorURL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().optional(),
        newUserURL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().optional(),
        expiresAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["number"](),
        link: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
            email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"](),
            userId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["coerce"].string()
        }).optional(),
        requestSignUp: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"]().optional()
    }).parse(JSON.parse(data.value));
    if (!parsedData.errorURL) {
        parsedData.errorURL = `${c.context.baseURL}/error`;
    }
    const stateCookie = c.context.createAuthCookie("state");
    const stateCookieValue = await c.getSignedCookie(stateCookie.name, c.context.secret);
    const skipStateCookieCheck = c.context.oauthConfig?.skipStateCookieCheck;
    if (!skipStateCookieCheck && (!stateCookieValue || stateCookieValue !== state)) {
        const errorURL = c.context.options.onAPIError?.errorURL || `${c.context.baseURL}/error`;
        throw c.redirect(`${errorURL}?error=state_mismatch`);
    }
    c.setCookie(stateCookie.name, "", {
        maxAge: 0
    });
    if (parsedData.expiresAt < Date.now()) {
        await c.context.internalAdapter.deleteVerificationValue(data.id);
        const errorURL = c.context.options.onAPIError?.errorURL || `${c.context.baseURL}/error`;
        throw c.redirect(`${errorURL}?error=please_restart_the_process`);
    }
    await c.context.internalAdapter.deleteVerificationValue(data.id);
    return parsedData;
}
function decryptOAuthToken(token, ctx) {
    if (!token) return token;
    if (ctx.options.account?.encryptOAuthTokens) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["symmetricDecrypt"])({
            key: ctx.secret,
            data: token
        });
    }
    return token;
}
function setTokenUtil(token, ctx) {
    if (ctx.options.account?.encryptOAuthTokens && token) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["symmetricEncrypt"])({
            key: ctx.secret,
            data: token
        });
    }
    return token;
}
async function handleOAuthUserInfo(c, { userInfo, account, callbackURL, disableSignUp, overrideUserInfo }) {
    const dbUser = await c.context.internalAdapter.findOAuthUser(userInfo.email.toLowerCase(), account.accountId, account.providerId).catch((e)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error("Better auth was unable to query your database.\nError: ", e);
        const errorURL = c.context.options.onAPIError?.errorURL || `${c.context.baseURL}/error`;
        throw c.redirect(`${errorURL}?error=internal_server_error`);
    });
    let user = dbUser?.user;
    let isRegister = !user;
    if (dbUser) {
        const hasBeenLinked = dbUser.accounts.find((a)=>a.providerId === account.providerId && a.accountId === account.accountId);
        if (!hasBeenLinked) {
            const trustedProviders = c.context.options.account?.accountLinking?.trustedProviders;
            const isTrustedProvider = trustedProviders?.includes(account.providerId);
            if (!isTrustedProvider && !userInfo.emailVerified || c.context.options.account?.accountLinking?.enabled === false) {
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDevelopment"])()) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].warn(`User already exist but account isn't linked to ${account.providerId}. To read more about how account linking works in Better Auth see https://www.better-auth.com/docs/concepts/users-accounts#account-linking.`);
                }
                return {
                    error: "account not linked",
                    data: null
                };
            }
            try {
                await c.context.internalAdapter.linkAccount({
                    providerId: account.providerId,
                    accountId: userInfo.id.toString(),
                    userId: dbUser.user.id,
                    accessToken: await setTokenUtil(account.accessToken, c.context),
                    refreshToken: await setTokenUtil(account.refreshToken, c.context),
                    idToken: account.idToken,
                    accessTokenExpiresAt: account.accessTokenExpiresAt,
                    refreshTokenExpiresAt: account.refreshTokenExpiresAt,
                    scope: account.scope
                }, c);
            } catch (e) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error("Unable to link account", e);
                return {
                    error: "unable to link account",
                    data: null
                };
            }
            if (userInfo.emailVerified && !dbUser.user.emailVerified && userInfo.email.toLowerCase() === dbUser.user.email) {
                await c.context.internalAdapter.updateUser(dbUser.user.id, {
                    emailVerified: true
                });
            }
        } else {
            if (c.context.options.account?.updateAccountOnSignIn !== false) {
                const updateData = Object.fromEntries(Object.entries({
                    idToken: account.idToken,
                    accessToken: await setTokenUtil(account.accessToken, c.context),
                    refreshToken: await setTokenUtil(account.refreshToken, c.context),
                    accessTokenExpiresAt: account.accessTokenExpiresAt,
                    refreshTokenExpiresAt: account.refreshTokenExpiresAt,
                    scope: account.scope
                }).filter(([_, value])=>value !== void 0));
                if (Object.keys(updateData).length > 0) {
                    await c.context.internalAdapter.updateAccount(hasBeenLinked.id, updateData, c);
                }
            }
            if (userInfo.emailVerified && !dbUser.user.emailVerified && userInfo.email.toLowerCase() === dbUser.user.email) {
                await c.context.internalAdapter.updateUser(dbUser.user.id, {
                    emailVerified: true
                });
            }
        }
        if (overrideUserInfo) {
            const { id: _, ...restUserInfo } = userInfo;
            await c.context.internalAdapter.updateUser(dbUser.user.id, {
                ...restUserInfo,
                email: userInfo.email.toLowerCase(),
                emailVerified: userInfo.email.toLowerCase() === dbUser.user.email ? dbUser.user.emailVerified || userInfo.emailVerified : userInfo.emailVerified
            });
        }
    } else {
        if (disableSignUp) {
            return {
                error: "signup disabled",
                data: null,
                isRegister: false
            };
        }
        try {
            const { id: _, ...restUserInfo } = userInfo;
            user = await c.context.internalAdapter.createOAuthUser({
                ...restUserInfo,
                email: userInfo.email.toLowerCase()
            }, {
                accessToken: await setTokenUtil(account.accessToken, c.context),
                refreshToken: await setTokenUtil(account.refreshToken, c.context),
                idToken: account.idToken,
                accessTokenExpiresAt: account.accessTokenExpiresAt,
                refreshTokenExpiresAt: account.refreshTokenExpiresAt,
                scope: account.scope,
                providerId: account.providerId,
                accountId: userInfo.id.toString()
            }, c).then((res)=>res?.user);
            if (!userInfo.emailVerified && user && c.context.options.emailVerification?.sendOnSignUp) {
                const token = await createEmailVerificationToken(c.context.secret, user.email, void 0, c.context.options.emailVerification?.expiresIn);
                const url = `${c.context.baseURL}/verify-email?token=${token}&callbackURL=${callbackURL}`;
                await c.context.options.emailVerification?.sendVerificationEmail?.({
                    user,
                    url,
                    token
                }, c.request);
            }
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error(e);
            if (e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]) {
                return {
                    error: e.message,
                    data: null,
                    isRegister: false
                };
            }
            return {
                error: "unable to create user",
                data: null,
                isRegister: false
            };
        }
    }
    if (!user) {
        return {
            error: "unable to create user",
            data: null,
            isRegister: false
        };
    }
    const session = await c.context.internalAdapter.createSession(user.id, c);
    if (!session) {
        return {
            error: "unable to create session",
            data: null,
            isRegister: false
        };
    }
    return {
        data: {
            session,
            user
        },
        error: null,
        isRegister
    };
}
const signInSocial = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthEndpoint"])("/sign-in/social", {
    method: "POST",
    body: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
        /**
       * Callback URL to redirect to after the user
       * has signed in.
       */ callbackURL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "Callback URL to redirect to after the user has signed in"
        }).optional(),
        /**
       * callback url to redirect if the user is newly registered.
       *
       * useful if you have different routes for existing users and new users
       */ newUserCallbackURL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().optional(),
        /**
       * Callback url to redirect to if an error happens
       *
       * If it's initiated from the client sdk this defaults to
       * the current url.
       */ errorCallbackURL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "Callback URL to redirect to if an error happens"
        }).optional(),
        /**
       * OAuth2 provider to use`
       */ provider: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SocialProviderListEnum"],
        /**
       * Disable automatic redirection to the provider
       *
       * This is useful if you want to handle the redirection
       * yourself like in a popup or a different tab.
       */ disableRedirect: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"]().meta({
            description: "Disable automatic redirection to the provider. Useful for handling the redirection yourself"
        }).optional(),
        /**
       * ID token from the provider
       *
       * This is used to sign in the user
       * if the user is already signed in with the
       * provider in the frontend.
       *
       * Only applicable if the provider supports
       * it. Currently only `apple` and `google` is
       * supported out of the box.
       */ idToken: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["optional"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
            /**
           * ID token from the provider
           */ token: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
                description: "ID token from the provider"
            }),
            /**
           * The nonce used to generate the token
           */ nonce: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
                description: "Nonce used to generate the token"
            }).optional(),
            /**
           * Access token from the provider
           */ accessToken: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
                description: "Access token from the provider"
            }).optional(),
            /**
           * Refresh token from the provider
           */ refreshToken: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
                description: "Refresh token from the provider"
            }).optional(),
            /**
           * Expiry date of the token
           */ expiresAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["number"]().meta({
                description: "Expiry date of the token"
            }).optional()
        })),
        scopes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["array"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]()).meta({
            description: "Array of scopes to request from the provider. This will override the default scopes passed."
        }).optional(),
        /**
       * Explicitly request sign-up
       *
       * Should be used to allow sign up when
       * disableImplicitSignUp for this provider is
       * true
       */ requestSignUp: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"]().meta({
            description: "Explicitly request sign-up. Useful when disableImplicitSignUp is true for this provider"
        }).optional(),
        /**
       * The login hint to use for the authorization code request
       */ loginHint: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "The login hint to use for the authorization code request"
        }).optional()
    }),
    metadata: {
        openapi: {
            description: "Sign in with a social provider",
            operationId: "socialSignIn",
            responses: {
                "200": {
                    description: "Success - Returns either session details or redirect URL",
                    content: {
                        "application/json": {
                            schema: {
                                // todo: we need support for multiple schema
                                type: "object",
                                description: "Session response when idToken is provided",
                                properties: {
                                    redirect: {
                                        type: "boolean",
                                        enum: [
                                            false
                                        ]
                                    },
                                    token: {
                                        type: "string",
                                        description: "Session token",
                                        url: {
                                            type: "null",
                                            nullable: true
                                        },
                                        user: {
                                            type: "object",
                                            properties: {
                                                id: {
                                                    type: "string"
                                                },
                                                email: {
                                                    type: "string"
                                                },
                                                name: {
                                                    type: "string",
                                                    nullable: true
                                                },
                                                image: {
                                                    type: "string",
                                                    nullable: true
                                                },
                                                emailVerified: {
                                                    type: "boolean"
                                                },
                                                createdAt: {
                                                    type: "string",
                                                    format: "date-time"
                                                },
                                                updatedAt: {
                                                    type: "string",
                                                    format: "date-time"
                                                }
                                            },
                                            required: [
                                                "id",
                                                "email",
                                                "emailVerified",
                                                "createdAt",
                                                "updatedAt"
                                            ]
                                        }
                                    }
                                },
                                required: [
                                    "redirect",
                                    "token",
                                    "user"
                                ]
                            }
                        }
                    }
                }
            }
        }
    }
}, async (c)=>{
    const provider = c.context.socialProviders.find((p)=>p.id === c.body.provider);
    if (!provider) {
        c.context.logger.error("Provider not found. Make sure to add the provider in your auth config", {
            provider: c.body.provider
        });
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("NOT_FOUND", {
            message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].PROVIDER_NOT_FOUND
        });
    }
    if (c.body.idToken) {
        if (!provider.verifyIdToken) {
            c.context.logger.error("Provider does not support id token verification", {
                provider: c.body.provider
            });
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("NOT_FOUND", {
                message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].ID_TOKEN_NOT_SUPPORTED
            });
        }
        const { token, nonce } = c.body.idToken;
        const valid = await provider.verifyIdToken(token, nonce);
        if (!valid) {
            c.context.logger.error("Invalid id token", {
                provider: c.body.provider
            });
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].INVALID_TOKEN
            });
        }
        const userInfo = await provider.getUserInfo({
            idToken: token,
            accessToken: c.body.idToken.accessToken,
            refreshToken: c.body.idToken.refreshToken
        });
        if (!userInfo || !userInfo?.user) {
            c.context.logger.error("Failed to get user info", {
                provider: c.body.provider
            });
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].FAILED_TO_GET_USER_INFO
            });
        }
        if (!userInfo.user.email) {
            c.context.logger.error("User email not found", {
                provider: c.body.provider
            });
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].USER_EMAIL_NOT_FOUND
            });
        }
        const data = await handleOAuthUserInfo(c, {
            userInfo: {
                ...userInfo.user,
                email: userInfo.user.email,
                id: String(userInfo.user.id),
                name: userInfo.user.name || "",
                image: userInfo.user.image,
                emailVerified: userInfo.user.emailVerified || false
            },
            account: {
                providerId: provider.id,
                accountId: String(userInfo.user.id),
                accessToken: c.body.idToken.accessToken
            },
            callbackURL: c.body.callbackURL,
            disableSignUp: provider.disableImplicitSignUp && !c.body.requestSignUp || provider.disableSignUp
        });
        if (data.error) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                message: data.error
            });
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D9_vQR83$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["s"])(c, data.data);
        return c.json({
            redirect: false,
            token: data.data.session.token,
            url: void 0,
            user: {
                id: data.data.user.id,
                email: data.data.user.email,
                name: data.data.user.name,
                image: data.data.user.image,
                emailVerified: data.data.user.emailVerified,
                createdAt: data.data.user.createdAt,
                updatedAt: data.data.user.updatedAt
            }
        });
    }
    const { codeVerifier, state } = await generateState(c);
    const url = await provider.createAuthorizationURL({
        state,
        codeVerifier,
        redirectURI: `${c.context.baseURL}/callback/${provider.id}`,
        scopes: c.body.scopes,
        loginHint: c.body.loginHint
    });
    return c.json({
        url: url.toString(),
        redirect: !c.body.disableRedirect
    });
});
const signInEmail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthEndpoint"])("/sign-in/email", {
    method: "POST",
    body: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
        /**
       * Email of the user
       */ email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "Email of the user"
        }),
        /**
       * Password of the user
       */ password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "Password of the user"
        }),
        /**
       * Callback URL to use as a redirect for email
       * verification and for possible redirects
       */ callbackURL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "Callback URL to use as a redirect for email verification"
        }).optional(),
        /**
       * If this is false, the session will not be remembered
       * @default true
       */ rememberMe: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"]().meta({
            description: "If this is false, the session will not be remembered. Default is `true`."
        }).default(true).optional()
    }),
    metadata: {
        openapi: {
            description: "Sign in with email and password",
            responses: {
                "200": {
                    description: "Success - Returns either session details or redirect URL",
                    content: {
                        "application/json": {
                            schema: {
                                // todo: we need support for multiple schema
                                type: "object",
                                description: "Session response when idToken is provided",
                                properties: {
                                    redirect: {
                                        type: "boolean",
                                        enum: [
                                            false
                                        ]
                                    },
                                    token: {
                                        type: "string",
                                        description: "Session token"
                                    },
                                    url: {
                                        type: "null",
                                        nullable: true
                                    },
                                    user: {
                                        type: "object",
                                        properties: {
                                            id: {
                                                type: "string"
                                            },
                                            email: {
                                                type: "string"
                                            },
                                            name: {
                                                type: "string",
                                                nullable: true
                                            },
                                            image: {
                                                type: "string",
                                                nullable: true
                                            },
                                            emailVerified: {
                                                type: "boolean"
                                            },
                                            createdAt: {
                                                type: "string",
                                                format: "date-time"
                                            },
                                            updatedAt: {
                                                type: "string",
                                                format: "date-time"
                                            }
                                        },
                                        required: [
                                            "id",
                                            "email",
                                            "emailVerified",
                                            "createdAt",
                                            "updatedAt"
                                        ]
                                    }
                                },
                                required: [
                                    "redirect",
                                    "token",
                                    "user"
                                ]
                            }
                        }
                    }
                }
            }
        }
    }
}, async (ctx)=>{
    if (!ctx.context.options?.emailAndPassword?.enabled) {
        ctx.context.logger.error("Email and password is not enabled. Make sure to enable it in the options on you `auth.ts` file. Check `https://better-auth.com/docs/authentication/email-password` for more!");
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: "Email and password is not enabled"
        });
    }
    const { email, password } = ctx.body;
    const isValidEmail = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().email().safeParse(email);
    if (!isValidEmail.success) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].INVALID_EMAIL
        });
    }
    const user = await ctx.context.internalAdapter.findUserByEmail(email, {
        includeAccounts: true
    });
    if (!user) {
        await ctx.context.password.hash(password);
        ctx.context.logger.error("User not found", {
            email
        });
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
            message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].INVALID_EMAIL_OR_PASSWORD
        });
    }
    const credentialAccount = user.accounts.find((a)=>a.providerId === "credential");
    if (!credentialAccount) {
        ctx.context.logger.error("Credential account not found", {
            email
        });
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
            message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].INVALID_EMAIL_OR_PASSWORD
        });
    }
    const currentPassword = credentialAccount?.password;
    if (!currentPassword) {
        ctx.context.logger.error("Password not found", {
            email
        });
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
            message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].INVALID_EMAIL_OR_PASSWORD
        });
    }
    const validPassword = await ctx.context.password.verify({
        hash: currentPassword,
        password
    });
    if (!validPassword) {
        ctx.context.logger.error("Invalid password");
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
            message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].INVALID_EMAIL_OR_PASSWORD
        });
    }
    if (ctx.context.options?.emailAndPassword?.requireEmailVerification && !user.user.emailVerified) {
        if (!ctx.context.options?.emailVerification?.sendVerificationEmail) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("FORBIDDEN", {
                message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].EMAIL_NOT_VERIFIED
            });
        }
        if (ctx.context.options?.emailVerification?.sendOnSignIn) {
            const token = await createEmailVerificationToken(ctx.context.secret, user.user.email, void 0, ctx.context.options.emailVerification?.expiresIn);
            const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${ctx.body.callbackURL || "/"}`;
            await ctx.context.options.emailVerification.sendVerificationEmail({
                user: user.user,
                url,
                token
            }, ctx.request);
        }
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("FORBIDDEN", {
            message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].EMAIL_NOT_VERIFIED
        });
    }
    const session = await ctx.context.internalAdapter.createSession(user.user.id, ctx, ctx.body.rememberMe === false);
    if (!session) {
        ctx.context.logger.error("Failed to create session");
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
            message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].FAILED_TO_CREATE_SESSION
        });
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D9_vQR83$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["s"])(ctx, {
        session,
        user: user.user
    }, ctx.body.rememberMe === false);
    return ctx.json({
        redirect: !!ctx.body.callbackURL,
        token: session.token,
        url: ctx.body.callbackURL,
        user: {
            id: user.user.id,
            email: user.user.email,
            name: user.user.name,
            image: user.user.image,
            emailVerified: user.user.emailVerified,
            createdAt: user.user.createdAt,
            updatedAt: user.user.updatedAt
        }
    });
});
const schema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
    code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().optional(),
    error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().optional(),
    device_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().optional(),
    error_description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().optional(),
    state: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().optional(),
    user: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().optional()
});
const callbackOAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthEndpoint"])("/callback/:id", {
    method: [
        "GET",
        "POST"
    ],
    body: schema.optional(),
    query: schema.optional(),
    metadata: HIDE_METADATA
}, async (c)=>{
    let queryOrBody;
    const defaultErrorURL = c.context.options.onAPIError?.errorURL || `${c.context.baseURL}/error`;
    try {
        if (c.method === "GET") {
            queryOrBody = schema.parse(c.query);
        } else if (c.method === "POST") {
            queryOrBody = schema.parse(c.body);
        } else {
            throw new Error("Unsupported method");
        }
    } catch (e) {
        c.context.logger.error("INVALID_CALLBACK_REQUEST", e);
        throw c.redirect(`${defaultErrorURL}?error=invalid_callback_request`);
    }
    const { code, error, state, error_description, device_id } = queryOrBody;
    if (!state) {
        c.context.logger.error("State not found", error);
        const sep = defaultErrorURL.includes("?") ? "&" : "?";
        const url = `${defaultErrorURL}${sep}state=state_not_found`;
        throw c.redirect(url);
    }
    const { codeVerifier, callbackURL, link, errorURL, newUserURL, requestSignUp } = await parseState(c);
    function redirectOnError(error2, description) {
        const baseURL = errorURL ?? defaultErrorURL;
        const params = new URLSearchParams({
            error: error2
        });
        if (description) params.set("error_description", description);
        const sep = baseURL.includes("?") ? "&" : "?";
        const url = `${baseURL}${sep}${params.toString()}`;
        throw c.redirect(url);
    }
    if (error) {
        redirectOnError(error, error_description);
    }
    if (!code) {
        c.context.logger.error("Code not found");
        throw redirectOnError("no_code");
    }
    const provider = c.context.socialProviders.find((p)=>p.id === c.params.id);
    if (!provider) {
        c.context.logger.error("Oauth provider with id", c.params.id, "not found");
        throw redirectOnError("oauth_provider_not_found");
    }
    let tokens;
    try {
        tokens = await provider.validateAuthorizationCode({
            code,
            codeVerifier,
            deviceId: device_id,
            redirectURI: `${c.context.baseURL}/callback/${provider.id}`
        });
    } catch (e) {
        c.context.logger.error("", e);
        throw redirectOnError("invalid_code");
    }
    const userInfo = await provider.getUserInfo({
        ...tokens,
        user: c.body?.user ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BKEtEpt0$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["s"])(c.body.user) : void 0
    }).then((res)=>res?.user);
    if (!userInfo) {
        c.context.logger.error("Unable to get user info");
        return redirectOnError("unable_to_get_user_info");
    }
    if (!callbackURL) {
        c.context.logger.error("No callback URL found");
        throw redirectOnError("no_callback_url");
    }
    if (link) {
        const trustedProviders = c.context.options.account?.accountLinking?.trustedProviders;
        const isTrustedProvider = trustedProviders?.includes(provider.id);
        if (!isTrustedProvider && !userInfo.emailVerified || c.context.options.account?.accountLinking?.enabled === false) {
            c.context.logger.error("Unable to link account - untrusted provider");
            return redirectOnError("unable_to_link_account");
        }
        if (userInfo.email !== link.email && c.context.options.account?.accountLinking?.allowDifferentEmails !== true) {
            return redirectOnError("email_doesn't_match");
        }
        const existingAccount = await c.context.internalAdapter.findAccount(String(userInfo.id));
        if (existingAccount) {
            if (existingAccount.userId.toString() !== link.userId.toString()) {
                return redirectOnError("account_already_linked_to_different_user");
            }
            const updateData = Object.fromEntries(Object.entries({
                accessToken: await setTokenUtil(tokens.accessToken, c.context),
                refreshToken: await setTokenUtil(tokens.refreshToken, c.context),
                idToken: tokens.idToken,
                accessTokenExpiresAt: tokens.accessTokenExpiresAt,
                refreshTokenExpiresAt: tokens.refreshTokenExpiresAt,
                scope: tokens.scopes?.join(",")
            }).filter(([_, value])=>value !== void 0));
            await c.context.internalAdapter.updateAccount(existingAccount.id, updateData);
        } else {
            const newAccount = await c.context.internalAdapter.createAccount({
                userId: link.userId,
                providerId: provider.id,
                accountId: String(userInfo.id),
                ...tokens,
                accessToken: await setTokenUtil(tokens.accessToken, c.context),
                refreshToken: await setTokenUtil(tokens.refreshToken, c.context),
                scope: tokens.scopes?.join(",")
            }, c);
            if (!newAccount) {
                return redirectOnError("unable_to_link_account");
            }
        }
        let toRedirectTo2;
        try {
            const url = callbackURL;
            toRedirectTo2 = url.toString();
        } catch  {
            toRedirectTo2 = callbackURL;
        }
        throw c.redirect(toRedirectTo2);
    }
    if (!userInfo.email) {
        c.context.logger.error("Provider did not return email. This could be due to misconfiguration in the provider settings.");
        return redirectOnError("email_not_found");
    }
    const result = await handleOAuthUserInfo(c, {
        userInfo: {
            ...userInfo,
            id: String(userInfo.id),
            email: userInfo.email,
            name: userInfo.name || userInfo.email
        },
        account: {
            providerId: provider.id,
            accountId: String(userInfo.id),
            ...tokens,
            scope: tokens.scopes?.join(",")
        },
        callbackURL,
        disableSignUp: provider.disableImplicitSignUp && !requestSignUp || provider.options?.disableSignUp,
        overrideUserInfo: provider.options?.overrideUserInfoOnSignIn
    });
    if (result.error) {
        c.context.logger.error(result.error.split(" ").join("_"));
        return redirectOnError(result.error.split(" ").join("_"));
    }
    const { session, user } = result.data;
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D9_vQR83$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["s"])(c, {
        session,
        user
    });
    let toRedirectTo;
    try {
        const url = result.isRegister ? newUserURL || callbackURL : callbackURL;
        toRedirectTo = url.toString();
    } catch  {
        toRedirectTo = result.isRegister ? newUserURL || callbackURL : callbackURL;
    }
    throw c.redirect(toRedirectTo);
});
const signOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthEndpoint"])("/sign-out", {
    method: "POST",
    requireHeaders: true,
    metadata: {
        openapi: {
            description: "Sign out the current user",
            responses: {
                "200": {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    success: {
                                        type: "boolean"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}, async (ctx)=>{
    const sessionCookieToken = await ctx.getSignedCookie(ctx.context.authCookies.sessionToken.name, ctx.context.secret);
    if (!sessionCookieToken) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D9_vQR83$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["d"])(ctx);
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].FAILED_TO_GET_SESSION
        });
    }
    await ctx.context.internalAdapter.deleteSession(sessionCookieToken);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D9_vQR83$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["d"])(ctx);
    return ctx.json({
        success: true
    });
});
function redirectError(ctx, callbackURL, query) {
    const url = callbackURL ? new URL(callbackURL, ctx.baseURL) : new URL(`${ctx.baseURL}/error`);
    if (query) Object.entries(query).forEach(([k, v])=>url.searchParams.set(k, v));
    return url.href;
}
function redirectCallback(ctx, callbackURL, query) {
    const url = new URL(callbackURL, ctx.baseURL);
    if (query) Object.entries(query).forEach(([k, v])=>url.searchParams.set(k, v));
    return url.href;
}
const requestPasswordReset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthEndpoint"])("/request-password-reset", {
    method: "POST",
    body: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
        /**
       * The email address of the user to send a password reset email to.
       */ email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["email"]().meta({
            description: "The email address of the user to send a password reset email to"
        }),
        /**
       * The URL to redirect the user to reset their password.
       * If the token isn't valid or expired, it'll be redirected with a query parameter `?
       * error=INVALID_TOKEN`. If the token is valid, it'll be redirected with a query parameter `?
       * token=VALID_TOKEN
       */ redirectTo: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "The URL to redirect the user to reset their password. If the token isn't valid or expired, it'll be redirected with a query parameter `?error=INVALID_TOKEN`. If the token is valid, it'll be redirected with a query parameter `?token=VALID_TOKEN"
        }).optional()
    }),
    metadata: {
        openapi: {
            description: "Send a password reset email to the user",
            responses: {
                "200": {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean"
                                    },
                                    message: {
                                        type: "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}, async (ctx)=>{
    if (!ctx.context.options.emailAndPassword?.sendResetPassword) {
        ctx.context.logger.error("Reset password isn't enabled.Please pass an emailAndPassword.sendResetPassword function in your auth config!");
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: "Reset password isn't enabled"
        });
    }
    const { email, redirectTo } = ctx.body;
    const user = await ctx.context.internalAdapter.findUserByEmail(email, {
        includeAccounts: true
    });
    if (!user) {
        ctx.context.logger.error("Reset Password: User not found", {
            email
        });
        return ctx.json({
            status: true,
            message: "If this email exists in our system, check your email for the reset link"
        });
    }
    const defaultExpiresIn = 60 * 60 * 1;
    const expiresAt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])(ctx.context.options.emailAndPassword.resetPasswordTokenExpiresIn || defaultExpiresIn, "sec");
    const verificationToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BUPPRXfK$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])(24);
    await ctx.context.internalAdapter.createVerificationValue({
        value: user.user.id,
        identifier: `reset-password:${verificationToken}`,
        expiresAt
    }, ctx);
    const callbackURL = redirectTo ? encodeURIComponent(redirectTo) : "";
    const url = `${ctx.context.baseURL}/reset-password/${verificationToken}?callbackURL=${callbackURL}`;
    await ctx.context.options.emailAndPassword.sendResetPassword({
        user: user.user,
        url,
        token: verificationToken
    }, ctx.request);
    return ctx.json({
        status: true,
        message: "If this email exists in our system, check your email for the reset link"
    });
});
const forgetPassword = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthEndpoint"])("/forget-password", {
    method: "POST",
    body: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
        /**
       * The email address of the user to send a password reset email to.
       */ email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().email().meta({
            description: "The email address of the user to send a password reset email to"
        }),
        /**
       * The URL to redirect the user to reset their password.
       * If the token isn't valid or expired, it'll be redirected with a query parameter `?
       * error=INVALID_TOKEN`. If the token is valid, it'll be redirected with a query parameter `?
       * token=VALID_TOKEN
       */ redirectTo: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "The URL to redirect the user to reset their password. If the token isn't valid or expired, it'll be redirected with a query parameter `?error=INVALID_TOKEN`. If the token is valid, it'll be redirected with a query parameter `?token=VALID_TOKEN"
        }).optional()
    }),
    metadata: {
        openapi: {
            description: "Send a password reset email to the user",
            responses: {
                "200": {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean"
                                    },
                                    message: {
                                        type: "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}, async (ctx)=>{
    if (!ctx.context.options.emailAndPassword?.sendResetPassword) {
        ctx.context.logger.error("Reset password isn't enabled.Please pass an emailAndPassword.sendResetPassword function in your auth config!");
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: "Reset password isn't enabled"
        });
    }
    const { email, redirectTo } = ctx.body;
    const user = await ctx.context.internalAdapter.findUserByEmail(email, {
        includeAccounts: true
    });
    if (!user) {
        ctx.context.logger.error("Reset Password: User not found", {
            email
        });
        return ctx.json({
            status: true,
            message: "If this email exists in our system, check your email for the reset link"
        });
    }
    const defaultExpiresIn = 60 * 60 * 1;
    const expiresAt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])(ctx.context.options.emailAndPassword.resetPasswordTokenExpiresIn || defaultExpiresIn, "sec");
    const verificationToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BUPPRXfK$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])(24);
    await ctx.context.internalAdapter.createVerificationValue({
        value: user.user.id,
        identifier: `reset-password:${verificationToken}`,
        expiresAt
    }, ctx);
    const callbackURL = redirectTo ? encodeURIComponent(redirectTo) : "";
    const url = `${ctx.context.baseURL}/reset-password/${verificationToken}?callbackURL=${callbackURL}`;
    await ctx.context.options.emailAndPassword.sendResetPassword({
        user: user.user,
        url,
        token: verificationToken
    }, ctx.request);
    return ctx.json({
        status: true
    });
});
const requestPasswordResetCallback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthEndpoint"])("/reset-password/:token", {
    method: "GET",
    query: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
        callbackURL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "The URL to redirect the user to reset their password"
        })
    }),
    use: [
        originCheck((ctx)=>ctx.query.callbackURL)
    ],
    metadata: {
        openapi: {
            description: "Redirects the user to the callback URL with the token",
            responses: {
                "200": {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    token: {
                                        type: "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}, async (ctx)=>{
    const { token } = ctx.params;
    const { callbackURL } = ctx.query;
    if (!token || !callbackURL) {
        throw ctx.redirect(redirectError(ctx.context, callbackURL, {
            error: "INVALID_TOKEN"
        }));
    }
    const verification = await ctx.context.internalAdapter.findVerificationValue(`reset-password:${token}`);
    if (!verification || verification.expiresAt < /* @__PURE__ */ new Date()) {
        throw ctx.redirect(redirectError(ctx.context, callbackURL, {
            error: "INVALID_TOKEN"
        }));
    }
    throw ctx.redirect(redirectCallback(ctx.context, callbackURL, {
        token
    }));
});
const forgetPasswordCallback = requestPasswordResetCallback;
const resetPassword = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthEndpoint"])("/reset-password", {
    method: "POST",
    query: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
        token: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().optional()
    }).optional(),
    body: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
        newPassword: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "The new password to set"
        }),
        token: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "The token to reset the password"
        }).optional()
    }),
    metadata: {
        openapi: {
            description: "Reset the password for a user",
            responses: {
                "200": {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}, async (ctx)=>{
    const token = ctx.body.token || ctx.query?.token;
    if (!token) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].INVALID_TOKEN
        });
    }
    const { newPassword } = ctx.body;
    const minLength = ctx.context.password?.config.minPasswordLength;
    const maxLength = ctx.context.password?.config.maxPasswordLength;
    if (newPassword.length < minLength) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].PASSWORD_TOO_SHORT
        });
    }
    if (newPassword.length > maxLength) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].PASSWORD_TOO_LONG
        });
    }
    const id = `reset-password:${token}`;
    const verification = await ctx.context.internalAdapter.findVerificationValue(id);
    if (!verification || verification.expiresAt < /* @__PURE__ */ new Date()) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].INVALID_TOKEN
        });
    }
    const userId = verification.value;
    const hashedPassword = await ctx.context.password.hash(newPassword);
    const accounts = await ctx.context.internalAdapter.findAccounts(userId);
    const account = accounts.find((ac)=>ac.providerId === "credential");
    if (!account) {
        await ctx.context.internalAdapter.createAccount({
            userId,
            providerId: "credential",
            password: hashedPassword,
            accountId: userId
        }, ctx);
    } else {
        await ctx.context.internalAdapter.updatePassword(userId, hashedPassword, ctx);
    }
    await ctx.context.internalAdapter.deleteVerificationValue(verification.id);
    if (ctx.context.options.emailAndPassword?.onPasswordReset) {
        const user = await ctx.context.internalAdapter.findUserById(userId);
        if (user) {
            await ctx.context.options.emailAndPassword.onPasswordReset({
                user
            }, ctx.request);
        }
    }
    if (ctx.context.options.emailAndPassword?.revokeSessionsOnPasswordReset) {
        await ctx.context.internalAdapter.deleteSessions(userId);
    }
    return ctx.json({
        status: true
    });
});
const updateUser = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthEndpoint"])("/update-user", {
        method: "POST",
        body: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["record"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "Field name must be a string"
        }), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["any"]()),
        use: [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DEBtROF9$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["s"]
        ],
        metadata: {
            $Infer: {
                body: {}
            },
            openapi: {
                description: "Update the current user",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: {
                                        type: "string",
                                        description: "The name of the user"
                                    },
                                    image: {
                                        type: "string",
                                        description: "The image of the user"
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "Success",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "boolean",
                                            description: "Indicates if the update was successful"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }, async (ctx)=>{
        const body = ctx.body;
        if (body.email) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].EMAIL_CAN_NOT_BE_UPDATED
            });
        }
        const { name, image, ...rest } = body;
        const session = ctx.context.session;
        const additionalFields = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Cwj9dt6i$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["d"])(ctx.context.options, rest, "update");
        if (image === void 0 && name === void 0 && Object.keys(additionalFields).length === 0) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                message: "No fields to update"
            });
        }
        const user = await ctx.context.internalAdapter.updateUser(session.user.id, {
            name,
            image,
            ...additionalFields
        }, ctx);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D9_vQR83$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["s"])(ctx, {
            session: session.session,
            user
        });
        return ctx.json({
            status: true
        });
    });
const changePassword = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthEndpoint"])("/change-password", {
    method: "POST",
    body: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
        /**
       * The new password to set
       */ newPassword: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "The new password to set"
        }),
        /**
       * The current password of the user
       */ currentPassword: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "The current password is required"
        }),
        /**
       * revoke all sessions that are not the
       * current one logged in by the user
       */ revokeOtherSessions: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"]().meta({
            description: "Must be a boolean value"
        }).optional()
    }),
    use: [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DEBtROF9$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["e"]
    ],
    metadata: {
        openapi: {
            description: "Change the password of the user",
            responses: {
                "200": {
                    description: "Password successfully changed",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    token: {
                                        type: "string",
                                        nullable: true,
                                        // Only present if revokeOtherSessions is true
                                        description: "New session token if other sessions were revoked"
                                    },
                                    user: {
                                        type: "object",
                                        properties: {
                                            id: {
                                                type: "string",
                                                description: "The unique identifier of the user"
                                            },
                                            email: {
                                                type: "string",
                                                format: "email",
                                                description: "The email address of the user"
                                            },
                                            name: {
                                                type: "string",
                                                description: "The name of the user"
                                            },
                                            image: {
                                                type: "string",
                                                format: "uri",
                                                nullable: true,
                                                description: "The profile image URL of the user"
                                            },
                                            emailVerified: {
                                                type: "boolean",
                                                description: "Whether the email has been verified"
                                            },
                                            createdAt: {
                                                type: "string",
                                                format: "date-time",
                                                description: "When the user was created"
                                            },
                                            updatedAt: {
                                                type: "string",
                                                format: "date-time",
                                                description: "When the user was last updated"
                                            }
                                        },
                                        required: [
                                            "id",
                                            "email",
                                            "name",
                                            "emailVerified",
                                            "createdAt",
                                            "updatedAt"
                                        ]
                                    }
                                },
                                required: [
                                    "user"
                                ]
                            }
                        }
                    }
                }
            }
        }
    }
}, async (ctx)=>{
    const { newPassword, currentPassword, revokeOtherSessions } = ctx.body;
    const session = ctx.context.session;
    const minPasswordLength = ctx.context.password.config.minPasswordLength;
    if (newPassword.length < minPasswordLength) {
        ctx.context.logger.error("Password is too short");
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].PASSWORD_TOO_SHORT
        });
    }
    const maxPasswordLength = ctx.context.password.config.maxPasswordLength;
    if (newPassword.length > maxPasswordLength) {
        ctx.context.logger.error("Password is too long");
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].PASSWORD_TOO_LONG
        });
    }
    const accounts = await ctx.context.internalAdapter.findAccounts(session.user.id);
    const account = accounts.find((account2)=>account2.providerId === "credential" && account2.password);
    if (!account || !account.password) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].CREDENTIAL_ACCOUNT_NOT_FOUND
        });
    }
    const passwordHash = await ctx.context.password.hash(newPassword);
    const verify = await ctx.context.password.verify({
        hash: account.password,
        password: currentPassword
    });
    if (!verify) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].INVALID_PASSWORD
        });
    }
    await ctx.context.internalAdapter.updateAccount(account.id, {
        password: passwordHash
    });
    let token = null;
    if (revokeOtherSessions) {
        await ctx.context.internalAdapter.deleteSessions(session.user.id);
        const newSession = await ctx.context.internalAdapter.createSession(session.user.id, ctx);
        if (!newSession) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("INTERNAL_SERVER_ERROR", {
                message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].FAILED_TO_GET_SESSION
            });
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D9_vQR83$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["s"])(ctx, {
            session: newSession,
            user: session.user
        });
        token = newSession.token;
    }
    return ctx.json({
        token,
        user: {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name,
            image: session.user.image,
            emailVerified: session.user.emailVerified,
            createdAt: session.user.createdAt,
            updatedAt: session.user.updatedAt
        }
    });
});
const setPassword = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthEndpoint"])("/set-password", {
    method: "POST",
    body: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
        /**
       * The new password to set
       */ newPassword: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "The new password to set is required"
        })
    }),
    metadata: {
        SERVER_ONLY: true
    },
    use: [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DEBtROF9$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["e"]
    ]
}, async (ctx)=>{
    const { newPassword } = ctx.body;
    const session = ctx.context.session;
    const minPasswordLength = ctx.context.password.config.minPasswordLength;
    if (newPassword.length < minPasswordLength) {
        ctx.context.logger.error("Password is too short");
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].PASSWORD_TOO_SHORT
        });
    }
    const maxPasswordLength = ctx.context.password.config.maxPasswordLength;
    if (newPassword.length > maxPasswordLength) {
        ctx.context.logger.error("Password is too long");
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].PASSWORD_TOO_LONG
        });
    }
    const accounts = await ctx.context.internalAdapter.findAccounts(session.user.id);
    const account = accounts.find((account2)=>account2.providerId === "credential" && account2.password);
    const passwordHash = await ctx.context.password.hash(newPassword);
    if (!account) {
        await ctx.context.internalAdapter.linkAccount({
            userId: session.user.id,
            providerId: "credential",
            accountId: session.user.id,
            password: passwordHash
        }, ctx);
        return ctx.json({
            status: true
        });
    }
    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
        message: "user already has a password"
    });
});
const deleteUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthEndpoint"])("/delete-user", {
    method: "POST",
    use: [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DEBtROF9$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["e"]
    ],
    body: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
        /**
       * The callback URL to redirect to after the user is deleted
       * this is only used on delete user callback
       */ callbackURL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "The callback URL to redirect to after the user is deleted"
        }).optional(),
        /**
       * The password of the user. If the password isn't provided, session freshness
       * will be checked.
       */ password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "The password of the user is required to delete the user"
        }).optional(),
        /**
       * The token to delete the user. If the token is provided, the user will be deleted
       */ token: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "The token to delete the user is required"
        }).optional()
    }),
    metadata: {
        openapi: {
            description: "Delete the user",
            responses: {
                "200": {
                    description: "User deletion processed successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    success: {
                                        type: "boolean",
                                        description: "Indicates if the operation was successful"
                                    },
                                    message: {
                                        type: "string",
                                        enum: [
                                            "User deleted",
                                            "Verification email sent"
                                        ],
                                        description: "Status message of the deletion process"
                                    }
                                },
                                required: [
                                    "success",
                                    "message"
                                ]
                            }
                        }
                    }
                }
            }
        }
    }
}, async (ctx)=>{
    if (!ctx.context.options.user?.deleteUser?.enabled) {
        ctx.context.logger.error("Delete user is disabled. Enable it in the options");
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("NOT_FOUND");
    }
    const session = ctx.context.session;
    if (ctx.body.password) {
        const accounts = await ctx.context.internalAdapter.findAccounts(session.user.id);
        const account = accounts.find((account2)=>account2.providerId === "credential" && account2.password);
        if (!account || !account.password) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].CREDENTIAL_ACCOUNT_NOT_FOUND
            });
        }
        const verify = await ctx.context.password.verify({
            hash: account.password,
            password: ctx.body.password
        });
        if (!verify) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].INVALID_PASSWORD
            });
        }
    }
    if (ctx.body.token) {
        await deleteUserCallback({
            ...ctx,
            query: {
                token: ctx.body.token
            }
        });
        return ctx.json({
            success: true,
            message: "User deleted"
        });
    }
    if (ctx.context.options.user.deleteUser?.sendDeleteAccountVerification) {
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])(32, "0-9", "a-z");
        await ctx.context.internalAdapter.createVerificationValue({
            value: session.user.id,
            identifier: `delete-account-${token}`,
            expiresAt: new Date(Date.now() + (ctx.context.options.user.deleteUser?.deleteTokenExpiresIn || 60 * 60 * 24) * 1e3)
        }, ctx);
        const url = `${ctx.context.baseURL}/delete-user/callback?token=${token}&callbackURL=${ctx.body.callbackURL || "/"}`;
        await ctx.context.options.user.deleteUser.sendDeleteAccountVerification({
            user: session.user,
            url,
            token
        }, ctx.request);
        return ctx.json({
            success: true,
            message: "Verification email sent"
        });
    }
    if (!ctx.body.password && ctx.context.sessionConfig.freshAge !== 0) {
        const currentAge = new Date(session.session.createdAt).getTime();
        const freshAge = ctx.context.sessionConfig.freshAge * 1e3;
        const now = Date.now();
        if (now - currentAge > freshAge * 1e3) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].SESSION_EXPIRED
            });
        }
    }
    const beforeDelete = ctx.context.options.user.deleteUser?.beforeDelete;
    if (beforeDelete) {
        await beforeDelete(session.user, ctx.request);
    }
    await ctx.context.internalAdapter.deleteUser(session.user.id);
    await ctx.context.internalAdapter.deleteSessions(session.user.id);
    await ctx.context.internalAdapter.deleteAccounts(session.user.id);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D9_vQR83$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["d"])(ctx);
    const afterDelete = ctx.context.options.user.deleteUser?.afterDelete;
    if (afterDelete) {
        await afterDelete(session.user, ctx.request);
    }
    return ctx.json({
        success: true,
        message: "User deleted"
    });
});
const deleteUserCallback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthEndpoint"])("/delete-user/callback", {
    method: "GET",
    query: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
        token: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "The token to verify the deletion request"
        }),
        callbackURL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "The URL to redirect to after deletion"
        }).optional()
    }),
    use: [
        originCheck((ctx)=>ctx.query.callbackURL)
    ],
    metadata: {
        openapi: {
            description: "Callback to complete user deletion with verification token",
            responses: {
                "200": {
                    description: "User successfully deleted",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    success: {
                                        type: "boolean",
                                        description: "Indicates if the deletion was successful"
                                    },
                                    message: {
                                        type: "string",
                                        enum: [
                                            "User deleted"
                                        ],
                                        description: "Confirmation message"
                                    }
                                },
                                required: [
                                    "success",
                                    "message"
                                ]
                            }
                        }
                    }
                }
            }
        }
    }
}, async (ctx)=>{
    if (!ctx.context.options.user?.deleteUser?.enabled) {
        ctx.context.logger.error("Delete user is disabled. Enable it in the options");
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("NOT_FOUND");
    }
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DEBtROF9$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])(ctx);
    if (!session) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("NOT_FOUND", {
            message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].FAILED_TO_GET_USER_INFO
        });
    }
    const token = await ctx.context.internalAdapter.findVerificationValue(`delete-account-${ctx.query.token}`);
    if (!token || token.expiresAt < /* @__PURE__ */ new Date()) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("NOT_FOUND", {
            message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].INVALID_TOKEN
        });
    }
    if (token.value !== session.user.id) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("NOT_FOUND", {
            message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].INVALID_TOKEN
        });
    }
    const beforeDelete = ctx.context.options.user.deleteUser?.beforeDelete;
    if (beforeDelete) {
        await beforeDelete(session.user, ctx.request);
    }
    await ctx.context.internalAdapter.deleteUser(session.user.id);
    await ctx.context.internalAdapter.deleteSessions(session.user.id);
    await ctx.context.internalAdapter.deleteAccounts(session.user.id);
    await ctx.context.internalAdapter.deleteVerificationValue(token.id);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D9_vQR83$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["d"])(ctx);
    const afterDelete = ctx.context.options.user.deleteUser?.afterDelete;
    if (afterDelete) {
        await afterDelete(session.user, ctx.request);
    }
    if (ctx.query.callbackURL) {
        throw ctx.redirect(ctx.query.callbackURL || "/");
    }
    return ctx.json({
        success: true,
        message: "User deleted"
    });
});
const changeEmail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthEndpoint"])("/change-email", {
    method: "POST",
    body: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
        newEmail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["email"]().meta({
            description: "The new email address to set must be a valid email address"
        }),
        callbackURL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "The URL to redirect to after email verification"
        }).optional()
    }),
    use: [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DEBtROF9$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["e"]
    ],
    metadata: {
        openapi: {
            responses: {
                "200": {
                    description: "Email change request processed successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        description: "Indicates if the request was successful"
                                    },
                                    message: {
                                        type: "string",
                                        enum: [
                                            "Email updated",
                                            "Verification email sent"
                                        ],
                                        description: "Status message of the email change process",
                                        nullable: true
                                    }
                                },
                                required: [
                                    "status"
                                ]
                            }
                        }
                    }
                },
                "422": {
                    description: "Unprocessable Entity. Email already exists",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}, async (ctx)=>{
    if (!ctx.context.options.user?.changeEmail?.enabled) {
        ctx.context.logger.error("Change email is disabled.");
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: "Change email is disabled"
        });
    }
    const newEmail = ctx.body.newEmail.toLowerCase();
    if (newEmail === ctx.context.session.user.email) {
        ctx.context.logger.error("Email is the same");
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: "Email is the same"
        });
    }
    const existingUser = await ctx.context.internalAdapter.findUserByEmail(newEmail);
    if (existingUser) {
        ctx.context.logger.error("Email already exists");
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: "Couldn't update your email"
        });
    }
    if (ctx.context.session.user.emailVerified !== true) {
        const existing = await ctx.context.internalAdapter.findUserByEmail(newEmail);
        if (existing) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("UNPROCESSABLE_ENTITY", {
                message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL
            });
        }
        await ctx.context.internalAdapter.updateUserByEmail(ctx.context.session.user.email, {
            email: newEmail
        }, ctx);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D9_vQR83$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["s"])(ctx, {
            session: ctx.context.session.session,
            user: {
                ...ctx.context.session.user,
                email: newEmail
            }
        });
        if (ctx.context.options.emailVerification?.sendVerificationEmail) {
            const token2 = await createEmailVerificationToken(ctx.context.secret, newEmail, void 0, ctx.context.options.emailVerification?.expiresIn);
            const url2 = `${ctx.context.baseURL}/verify-email?token=${token2}&callbackURL=${ctx.body.callbackURL || "/"}`;
            await ctx.context.options.emailVerification.sendVerificationEmail({
                user: {
                    ...ctx.context.session.user,
                    email: newEmail
                },
                url: url2,
                token: token2
            }, ctx.request);
        }
        return ctx.json({
            status: true
        });
    }
    if (!ctx.context.options.user.changeEmail.sendChangeEmailVerification) {
        ctx.context.logger.error("Verification email isn't enabled.");
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: "Verification email isn't enabled"
        });
    }
    const token = await createEmailVerificationToken(ctx.context.secret, ctx.context.session.user.email, newEmail, ctx.context.options.emailVerification?.expiresIn);
    const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${ctx.body.callbackURL || "/"}`;
    await ctx.context.options.user.changeEmail.sendChangeEmailVerification({
        user: ctx.context.session.user,
        newEmail,
        url,
        token
    }, ctx.request);
    return ctx.json({
        status: true
    });
});
function sanitize(input) {
    return input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
const html = (errorCode = "Unknown")=>`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Authentication Error</title>
    <style>
        :root {
            --bg-color: #f8f9fa;
            --text-color: #212529;
            --accent-color: #000000;
            --error-color: #dc3545;
            --border-color: #e9ecef;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            line-height: 1.5;
        }
        .error-container {
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            padding: 2.5rem;
            text-align: center;
            max-width: 90%;
            width: 400px;
        }
        h1 {
            color: var(--error-color);
            font-size: 1.75rem;
            margin-bottom: 1rem;
            font-weight: 600;
        }
        p {
            margin-bottom: 1.5rem;
            color: #495057;
        }
        .btn {
            background-color: var(--accent-color);
            color: #ffffff;
            text-decoration: none;
            padding: 0.75rem 1.5rem;
            border-radius: 6px;
            transition: all 0.3s ease;
            display: inline-block;
            font-weight: 500;
            border: 2px solid var(--accent-color);
        }
        .btn:hover {
            background-color: #131721;
        }
        .error-code {
            font-size: 0.875rem;
            color: #6c757d;
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid var(--border-color);
        }
        .icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>
    <div class="error-container">
        <div class="icon">\u26A0\uFE0F</div>
        <h1>Better Auth Error</h1>
        <p>We encountered an issue while processing your request. Please try again or contact the application owner if the problem persists.</p>
        <a href="/" id="returnLink" class="btn">Return to Application</a>
        <div class="error-code">Error Code: <span id="errorCode">${sanitize(errorCode)}</span></div>
    </div>
</body>
</html>`;
const error = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthEndpoint"])("/error", {
    method: "GET",
    metadata: {
        ...HIDE_METADATA,
        openapi: {
            description: "Displays an error page",
            responses: {
                "200": {
                    description: "Success",
                    content: {
                        "text/html": {
                            schema: {
                                type: "string",
                                description: "The HTML content of the error page"
                            }
                        }
                    }
                }
            }
        }
    }
}, async (c)=>{
    const query = new URL(c.request?.url || "").searchParams.get("error") || "Unknown";
    return new Response(html(query), {
        headers: {
            "Content-Type": "text/html"
        }
    });
});
const ok = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthEndpoint"])("/ok", {
    method: "GET",
    metadata: {
        ...HIDE_METADATA,
        openapi: {
            description: "Check if the API is working",
            responses: {
                "200": {
                    description: "API is working",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    ok: {
                                        type: "boolean",
                                        description: "Indicates if the API is working"
                                    }
                                },
                                required: [
                                    "ok"
                                ]
                            }
                        }
                    }
                }
            }
        }
    }
}, async (ctx)=>{
    return ctx.json({
        ok: true
    });
});
const listUserAccounts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthEndpoint"])("/list-accounts", {
    method: "GET",
    use: [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DEBtROF9$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["s"]
    ],
    metadata: {
        openapi: {
            description: "List all accounts linked to the user",
            responses: {
                "200": {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        id: {
                                            type: "string"
                                        },
                                        providerId: {
                                            type: "string"
                                        },
                                        createdAt: {
                                            type: "string",
                                            format: "date-time"
                                        },
                                        updatedAt: {
                                            type: "string",
                                            format: "date-time"
                                        },
                                        accountId: {
                                            type: "string"
                                        },
                                        scopes: {
                                            type: "array",
                                            items: {
                                                type: "string"
                                            }
                                        }
                                    },
                                    required: [
                                        "id",
                                        "providerId",
                                        "createdAt",
                                        "updatedAt",
                                        "accountId",
                                        "scopes"
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}, async (c)=>{
    const session = c.context.session;
    const accounts = await c.context.internalAdapter.findAccounts(session.user.id);
    return c.json(accounts.map((a)=>({
            id: a.id,
            providerId: a.providerId,
            createdAt: a.createdAt,
            updatedAt: a.updatedAt,
            accountId: a.accountId,
            scopes: a.scope?.split(",") || []
        })));
});
const linkSocialAccount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthEndpoint"])("/link-social", {
    method: "POST",
    requireHeaders: true,
    body: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
        /**
       * Callback URL to redirect to after the user has signed in.
       */ callbackURL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "The URL to redirect to after the user has signed in"
        }).optional(),
        /**
       * OAuth2 provider to use
       */ provider: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SocialProviderListEnum"],
        /**
       * ID Token for direct authentication without redirect
       */ idToken: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
            token: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"](),
            nonce: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().optional(),
            accessToken: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().optional(),
            refreshToken: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().optional(),
            scopes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["array"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]()).optional()
        }).optional(),
        /**
       * Whether to allow sign up for new users
       */ requestSignUp: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"]().optional(),
        /**
       * Additional scopes to request when linking the account.
       * This is useful for requesting additional permissions when
       * linking a social account compared to the initial authentication.
       */ scopes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["array"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]()).meta({
            description: "Additional scopes to request from the provider"
        }).optional(),
        /**
       * The URL to redirect to if there is an error during the link process.
       */ errorCallbackURL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "The URL to redirect to if there is an error during the link process"
        }).optional(),
        /**
       * Disable automatic redirection to the provider
       *
       * This is useful if you want to handle the redirection
       * yourself like in a popup or a different tab.
       */ disableRedirect: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"]().meta({
            description: "Disable automatic redirection to the provider. Useful for handling the redirection yourself"
        }).optional()
    }),
    use: [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DEBtROF9$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["s"]
    ],
    metadata: {
        openapi: {
            description: "Link a social account to the user",
            responses: {
                "200": {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    url: {
                                        type: "string",
                                        description: "The authorization URL to redirect the user to"
                                    },
                                    redirect: {
                                        type: "boolean",
                                        description: "Indicates if the user should be redirected to the authorization URL"
                                    },
                                    status: {
                                        type: "boolean"
                                    }
                                },
                                required: [
                                    "redirect"
                                ]
                            }
                        }
                    }
                }
            }
        }
    }
}, async (c)=>{
    const session = c.context.session;
    const provider = c.context.socialProviders.find((p)=>p.id === c.body.provider);
    if (!provider) {
        c.context.logger.error("Provider not found. Make sure to add the provider in your auth config", {
            provider: c.body.provider
        });
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("NOT_FOUND", {
            message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].PROVIDER_NOT_FOUND
        });
    }
    if (c.body.idToken) {
        if (!provider.verifyIdToken) {
            c.context.logger.error("Provider does not support id token verification", {
                provider: c.body.provider
            });
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("NOT_FOUND", {
                message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].ID_TOKEN_NOT_SUPPORTED
            });
        }
        const { token, nonce } = c.body.idToken;
        const valid = await provider.verifyIdToken(token, nonce);
        if (!valid) {
            c.context.logger.error("Invalid id token", {
                provider: c.body.provider
            });
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].INVALID_TOKEN
            });
        }
        const linkingUserInfo = await provider.getUserInfo({
            idToken: token,
            accessToken: c.body.idToken.accessToken,
            refreshToken: c.body.idToken.refreshToken
        });
        if (!linkingUserInfo || !linkingUserInfo?.user) {
            c.context.logger.error("Failed to get user info", {
                provider: c.body.provider
            });
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].FAILED_TO_GET_USER_INFO
            });
        }
        const linkingUserId = String(linkingUserInfo.user.id);
        if (!linkingUserInfo.user.email) {
            c.context.logger.error("User email not found", {
                provider: c.body.provider
            });
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].USER_EMAIL_NOT_FOUND
            });
        }
        const existingAccounts = await c.context.internalAdapter.findAccounts(session.user.id);
        const hasBeenLinked = existingAccounts.find((a)=>a.providerId === provider.id && a.accountId === linkingUserId);
        if (hasBeenLinked) {
            return c.json({
                url: "",
                // this is for type inference
                status: true,
                redirect: false
            });
        }
        const trustedProviders = c.context.options.account?.accountLinking?.trustedProviders;
        const isTrustedProvider = trustedProviders?.includes(provider.id);
        if (!isTrustedProvider && !linkingUserInfo.user.emailVerified || c.context.options.account?.accountLinking?.enabled === false) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                message: "Account not linked - linking not allowed"
            });
        }
        if (linkingUserInfo.user.email !== session.user.email && c.context.options.account?.accountLinking?.allowDifferentEmails !== true) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                message: "Account not linked - different emails not allowed"
            });
        }
        try {
            await c.context.internalAdapter.createAccount({
                userId: session.user.id,
                providerId: provider.id,
                accountId: linkingUserId,
                accessToken: c.body.idToken.accessToken,
                idToken: token,
                refreshToken: c.body.idToken.refreshToken,
                scope: c.body.idToken.scopes?.join(",")
            }, c);
        } catch (e) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("EXPECTATION_FAILED", {
                message: "Account not linked - unable to create account"
            });
        }
        if (c.context.options.account?.accountLinking?.updateUserInfoOnLink === true) {
            try {
                await c.context.internalAdapter.updateUser(session.user.id, {
                    name: linkingUserInfo.user?.name,
                    image: linkingUserInfo.user?.image
                });
            } catch (e) {
                console.warn("Could not update user - " + e.toString());
            }
        }
        return c.json({
            url: "",
            // this is for type inference
            status: true,
            redirect: false
        });
    }
    const state = await generateState(c, {
        userId: session.user.id,
        email: session.user.email
    });
    const url = await provider.createAuthorizationURL({
        state: state.state,
        codeVerifier: state.codeVerifier,
        redirectURI: `${c.context.baseURL}/callback/${provider.id}`,
        scopes: c.body.scopes
    });
    return c.json({
        url: url.toString(),
        redirect: !c.body.disableRedirect
    });
});
const unlinkAccount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthEndpoint"])("/unlink-account", {
    method: "POST",
    body: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
        providerId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"](),
        accountId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().optional()
    }),
    use: [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DEBtROF9$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["f"]
    ],
    metadata: {
        openapi: {
            description: "Unlink an account",
            responses: {
                "200": {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}, async (ctx)=>{
    const { providerId, accountId } = ctx.body;
    const accounts = await ctx.context.internalAdapter.findAccounts(ctx.context.session.user.id);
    if (accounts.length === 1 && !ctx.context.options.account?.accountLinking?.allowUnlinkingAll) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].FAILED_TO_UNLINK_LAST_ACCOUNT
        });
    }
    const accountExist = accounts.find((account)=>accountId ? account.accountId === accountId && account.providerId === providerId : account.providerId === providerId);
    if (!accountExist) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].ACCOUNT_NOT_FOUND
        });
    }
    await ctx.context.internalAdapter.deleteAccount(accountExist.id);
    return ctx.json({
        status: true
    });
});
const getAccessToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthEndpoint"])("/get-access-token", {
    method: "POST",
    body: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
        providerId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "The provider ID for the OAuth provider"
        }),
        accountId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "The account ID associated with the refresh token"
        }).optional(),
        userId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "The user ID associated with the account"
        }).optional()
    }),
    metadata: {
        openapi: {
            description: "Get a valid access token, doing a refresh if needed",
            responses: {
                200: {
                    description: "A Valid access token",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    tokenType: {
                                        type: "string"
                                    },
                                    idToken: {
                                        type: "string"
                                    },
                                    accessToken: {
                                        type: "string"
                                    },
                                    refreshToken: {
                                        type: "string"
                                    },
                                    accessTokenExpiresAt: {
                                        type: "string",
                                        format: "date-time"
                                    },
                                    refreshTokenExpiresAt: {
                                        type: "string",
                                        format: "date-time"
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Invalid refresh token or provider configuration"
                }
            }
        }
    }
}, async (ctx)=>{
    const { providerId, accountId, userId } = ctx.body;
    const req = ctx.request;
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DEBtROF9$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])(ctx);
    if (req && !session) {
        throw ctx.error("UNAUTHORIZED");
    }
    let resolvedUserId = session?.user?.id || userId;
    if (!resolvedUserId) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: `Either userId or session is required`
        });
    }
    if (!ctx.context.socialProviders.find((p)=>p.id === providerId)) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: `Provider ${providerId} is not supported.`
        });
    }
    const accounts = await ctx.context.internalAdapter.findAccounts(resolvedUserId);
    const account = accounts.find((acc)=>accountId ? acc.id === accountId && acc.providerId === providerId : acc.providerId === providerId);
    if (!account) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: "Account not found"
        });
    }
    const provider = ctx.context.socialProviders.find((p)=>p.id === providerId);
    if (!provider) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: `Provider ${providerId} not found.`
        });
    }
    try {
        let newTokens = null;
        const accessTokenExpired = account.accessTokenExpiresAt && new Date(account.accessTokenExpiresAt).getTime() - Date.now() < 5e3;
        if (account.refreshToken && accessTokenExpired && provider.refreshAccessToken) {
            newTokens = await provider.refreshAccessToken(account.refreshToken);
            await ctx.context.internalAdapter.updateAccount(account.id, {
                accessToken: await setTokenUtil(newTokens.accessToken, ctx.context),
                accessTokenExpiresAt: newTokens.accessTokenExpiresAt,
                refreshToken: await setTokenUtil(newTokens.refreshToken, ctx.context),
                refreshTokenExpiresAt: newTokens.refreshTokenExpiresAt
            });
        }
        const tokens = {
            accessToken: await decryptOAuthToken(newTokens?.accessToken ?? account.accessToken ?? "", ctx.context),
            accessTokenExpiresAt: newTokens?.accessTokenExpiresAt ?? account.accessTokenExpiresAt ?? void 0,
            scopes: account.scope?.split(",") ?? [],
            idToken: newTokens?.idToken ?? account.idToken ?? void 0
        };
        return ctx.json(tokens);
    } catch (error) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: "Failed to get a valid access token",
            cause: error
        });
    }
});
const refreshToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthEndpoint"])("/refresh-token", {
    method: "POST",
    body: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
        providerId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "The provider ID for the OAuth provider"
        }),
        accountId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "The account ID associated with the refresh token"
        }).optional(),
        userId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "The user ID associated with the account"
        }).optional()
    }),
    metadata: {
        openapi: {
            description: "Refresh the access token using a refresh token",
            responses: {
                200: {
                    description: "Access token refreshed successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    tokenType: {
                                        type: "string"
                                    },
                                    idToken: {
                                        type: "string"
                                    },
                                    accessToken: {
                                        type: "string"
                                    },
                                    refreshToken: {
                                        type: "string"
                                    },
                                    accessTokenExpiresAt: {
                                        type: "string",
                                        format: "date-time"
                                    },
                                    refreshTokenExpiresAt: {
                                        type: "string",
                                        format: "date-time"
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Invalid refresh token or provider configuration"
                }
            }
        }
    }
}, async (ctx)=>{
    const { providerId, accountId, userId } = ctx.body;
    const req = ctx.request;
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DEBtROF9$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])(ctx);
    if (req && !session) {
        throw ctx.error("UNAUTHORIZED");
    }
    let resolvedUserId = session?.user?.id || userId;
    if (!resolvedUserId) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: `Either userId or session is required`
        });
    }
    const accounts = await ctx.context.internalAdapter.findAccounts(resolvedUserId);
    const account = accounts.find((acc)=>accountId ? acc.id === accountId && acc.providerId === providerId : acc.providerId === providerId);
    if (!account) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: "Account not found"
        });
    }
    const provider = ctx.context.socialProviders.find((p)=>p.id === providerId);
    if (!provider) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: `Provider ${providerId} not found.`
        });
    }
    if (!provider.refreshAccessToken) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: `Provider ${providerId} does not support token refreshing.`
        });
    }
    try {
        const tokens = await provider.refreshAccessToken(account.refreshToken);
        await ctx.context.internalAdapter.updateAccount(account.id, {
            accessToken: await setTokenUtil(tokens.accessToken, ctx.context),
            refreshToken: await setTokenUtil(tokens.refreshToken, ctx.context),
            accessTokenExpiresAt: tokens.accessTokenExpiresAt,
            refreshTokenExpiresAt: tokens.refreshTokenExpiresAt
        });
        return ctx.json(tokens);
    } catch (error) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: "Failed to refresh access token",
            cause: error
        });
    }
});
const accountInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthEndpoint"])("/account-info", {
    method: "POST",
    use: [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DEBtROF9$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["s"]
    ],
    metadata: {
        openapi: {
            description: "Get the account info provided by the provider",
            responses: {
                "200": {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    user: {
                                        type: "object",
                                        properties: {
                                            id: {
                                                type: "string"
                                            },
                                            name: {
                                                type: "string"
                                            },
                                            email: {
                                                type: "string"
                                            },
                                            image: {
                                                type: "string"
                                            },
                                            emailVerified: {
                                                type: "boolean"
                                            }
                                        },
                                        required: [
                                            "id",
                                            "emailVerified"
                                        ]
                                    },
                                    data: {
                                        type: "object",
                                        properties: {},
                                        additionalProperties: true
                                    }
                                },
                                required: [
                                    "user",
                                    "data"
                                ],
                                additionalProperties: false
                            }
                        }
                    }
                }
            }
        }
    },
    body: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
        accountId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().meta({
            description: "The provider given account id for which to get the account info"
        })
    })
}, async (ctx)=>{
    const account = await ctx.context.internalAdapter.findAccount(ctx.body.accountId);
    if (!account || account.userId !== ctx.context.session.user.id) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: "Account not found"
        });
    }
    const provider = ctx.context.socialProviders.find((p)=>p.id === account.providerId);
    if (!provider) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("INTERNAL_SERVER_ERROR", {
            message: `Provider account provider is ${account.providerId} but it is not configured`
        });
    }
    const tokens = await getAccessToken({
        ...ctx,
        body: {
            accountId: account.id,
            providerId: account.providerId
        },
        returnHeaders: false
    });
    if (!tokens.accessToken) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: "Access token not found"
        });
    }
    const info = await provider.getUserInfo({
        ...tokens,
        accessToken: tokens.accessToken
    });
    return ctx.json(info);
});
const defuReplaceArrays = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$defu$40$6$2e$1$2e$4$2f$node_modules$2f$defu$2f$dist$2f$defu$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createDefu"])((obj, key, value)=>{
    if (Array.isArray(obj[key]) && Array.isArray(value)) {
        obj[key] = value;
        return true;
    }
});
function toAuthEndpoints(endpoints, ctx) {
    const api = {};
    for (const [key, endpoint] of Object.entries(endpoints)){
        api[key] = async (context)=>{
            const authContext = await ctx;
            let internalContext = {
                ...context,
                context: {
                    ...authContext,
                    returned: void 0,
                    responseHeaders: void 0,
                    session: null
                },
                path: endpoint.path,
                headers: context?.headers ? new Headers(context?.headers) : void 0
            };
            const { beforeHooks, afterHooks } = getHooks(authContext);
            const before = await runBeforeHooks(internalContext, beforeHooks);
            if ("context" in before && before.context && typeof before.context === "object") {
                const { headers, ...rest } = before.context;
                if (headers) {
                    headers.forEach((value, key2)=>{
                        internalContext.headers.set(key2, value);
                    });
                }
                internalContext = defuReplaceArrays(rest, internalContext);
            } else if (before) {
                return context?.asResponse ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toResponse"])(before, {
                    headers: context?.headers
                }) : context?.returnHeaders ? {
                    headers: context?.headers,
                    response: before
                } : before;
            }
            internalContext.asResponse = false;
            internalContext.returnHeaders = true;
            const result = await endpoint(internalContext).catch((e)=>{
                if (e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]) {
                    return {
                        response: e,
                        headers: e.headers ? new Headers(e.headers) : null
                    };
                }
                throw e;
            });
            if (result && result instanceof Response) {
                return result;
            }
            internalContext.context.returned = result.response;
            internalContext.context.responseHeaders = result.headers;
            const after = await runAfterHooks(internalContext, afterHooks);
            if (after.response) {
                result.response = after.response;
            }
            if (result.response instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"] && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["shouldPublishLog"])(authContext.logger.level, "debug")) {
                result.response.stack = result.response.errorStack;
            }
            if (result.response instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"] && !context?.asResponse) {
                throw result.response;
            }
            const response = context?.asResponse ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toResponse"])(result.response, {
                headers: result.headers
            }) : context?.returnHeaders ? {
                headers: result.headers,
                response: result.response
            } : result.response;
            return response;
        };
        api[key].path = endpoint.path;
        api[key].options = endpoint.options;
    }
    return api;
}
async function runBeforeHooks(context, hooks) {
    let modifiedContext = {};
    for (const hook of hooks){
        if (hook.matcher(context)) {
            const result = await hook.handler({
                ...context,
                returnHeaders: false
            }).catch((e)=>{
                if (e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"] && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["shouldPublishLog"])(context.context.logger.level, "debug")) {
                    e.stack = e.errorStack;
                }
                throw e;
            });
            if (result && typeof result === "object") {
                if ("context" in result && typeof result.context === "object") {
                    const { headers, ...rest } = result.context;
                    if (headers instanceof Headers) {
                        if (modifiedContext.headers) {
                            headers.forEach((value, key)=>{
                                modifiedContext.headers?.set(key, value);
                            });
                        } else {
                            modifiedContext.headers = headers;
                        }
                    }
                    modifiedContext = defuReplaceArrays(rest, modifiedContext);
                    continue;
                }
                return result;
            }
        }
    }
    return {
        context: modifiedContext
    };
}
async function runAfterHooks(context, hooks) {
    for (const hook of hooks){
        if (hook.matcher(context)) {
            const result = await hook.handler(context).catch((e)=>{
                if (e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]) {
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["shouldPublishLog"])(context.context.logger.level, "debug")) {
                        e.stack = e.errorStack;
                    }
                    return {
                        response: e,
                        headers: e.headers ? new Headers(e.headers) : null
                    };
                }
                throw e;
            });
            if (result.headers) {
                result.headers.forEach((value, key)=>{
                    if (!context.context.responseHeaders) {
                        context.context.responseHeaders = new Headers({
                            [key]: value
                        });
                    } else {
                        if (key.toLowerCase() === "set-cookie") {
                            context.context.responseHeaders.append(key, value);
                        } else {
                            context.context.responseHeaders.set(key, value);
                        }
                    }
                });
            }
            if (result.response) {
                context.context.returned = result.response;
            }
        }
    }
    return {
        response: context.context.returned,
        headers: context.context.responseHeaders
    };
}
function getHooks(authContext) {
    const plugins = authContext.options.plugins || [];
    const beforeHooks = [];
    const afterHooks = [];
    if (authContext.options.hooks?.before) {
        beforeHooks.push({
            matcher: ()=>true,
            handler: authContext.options.hooks.before
        });
    }
    if (authContext.options.hooks?.after) {
        afterHooks.push({
            matcher: ()=>true,
            handler: authContext.options.hooks.after
        });
    }
    const pluginBeforeHooks = plugins.map((plugin)=>{
        if (plugin.hooks?.before) {
            return plugin.hooks.before;
        }
    }).filter((plugin)=>plugin !== void 0).flat();
    const pluginAfterHooks = plugins.map((plugin)=>{
        if (plugin.hooks?.after) {
            return plugin.hooks.after;
        }
    }).filter((plugin)=>plugin !== void 0).flat();
    pluginBeforeHooks.length && beforeHooks.push(...pluginBeforeHooks);
    pluginAfterHooks.length && afterHooks.push(...pluginAfterHooks);
    return {
        beforeHooks,
        afterHooks
    };
}
;
}),
"[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.ClH5r3NH.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "g",
    ()=>getIp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/env/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@4.1.12/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z>");
;
;
function getIp(req, options) {
    if (options.advanced?.ipAddress?.disableIpTracking) {
        return null;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTest"])()) {
        return "127.0.0.1";
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDevelopment"])()) {
        return "127.0.0.1";
    }
    const headers = "headers" in req ? req.headers : req;
    const defaultHeaders = [
        "x-forwarded-for"
    ];
    const ipHeaders = options.advanced?.ipAddress?.ipAddressHeaders || defaultHeaders;
    for (const key of ipHeaders){
        const value = "get" in headers ? headers.get(key) : headers[key];
        if (typeof value === "string") {
            const ip = value.split(",")[0].trim();
            if (isValidIP(ip)) {
                return ip;
            }
        }
    }
    return null;
}
function isValidIP(ip) {
    const ipv4 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ipv4().safeParse(ip);
    if (ipv4.success) {
        return true;
    }
    const ipv6 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ipv6().safeParse(ip);
    if (ipv6.success) {
        return true;
    }
    return false;
}
;
}),
"[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/api/index.mjs [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkEndpointConflicts",
    ()=>checkEndpointConflicts,
    "getEndpoints",
    ()=>getEndpoints,
    "router",
    ()=>router,
    "signUpEmail",
    ()=>signUpEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-call@1.0.19/node_modules/better-call/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BX9UB8EP$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.BX9UB8EP.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DEBtROF9$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.DEBtROF9.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@4.1.12/node_modules/zod/v4/classic/schemas.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/middleware/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D9_vQR83$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.D9_vQR83.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/error/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/env/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/db/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Cwj9dt6i$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.Cwj9dt6i.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$random$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/random.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/hash.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/base64.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/hex.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.B4Qoxdgc.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/db/adapter/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BKEtEpt0$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.BKEtEpt0.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$ClH5r3NH$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.ClH5r3NH.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/social-providers/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.CW6D9eSx.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BUPPRXfK$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.BUPPRXfK.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hmac$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/hmac.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$binary$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/binary.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$defu$40$6$2e$1$2e$4$2f$node_modules$2f$defu$2f$dist$2f$defu$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/defu@6.1.4/node_modules/defu/dist/defu.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/crypto/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DR3R5wdU$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.DR3R5wdU.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Ih8C76Vo$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.Ih8C76Vo.mjs [app-route] (ecmascript)");
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
const signUpEmail = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthEndpoint"])("/sign-up/email", {
        method: "POST",
        body: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["record"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"](), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["any"]()),
        metadata: {
            $Infer: {
                body: {}
            },
            openapi: {
                description: "Sign up a user using email and password",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: {
                                        type: "string",
                                        description: "The name of the user"
                                    },
                                    email: {
                                        type: "string",
                                        description: "The email of the user"
                                    },
                                    password: {
                                        type: "string",
                                        description: "The password of the user"
                                    },
                                    image: {
                                        type: "string",
                                        description: "The profile image URL of the user"
                                    },
                                    callbackURL: {
                                        type: "string",
                                        description: "The URL to use for email verification callback"
                                    },
                                    rememberMe: {
                                        type: "boolean",
                                        description: "If this is false, the session will not be remembered. Default is `true`."
                                    }
                                },
                                required: [
                                    "name",
                                    "email",
                                    "password"
                                ]
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "Successfully created user",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        token: {
                                            type: "string",
                                            nullable: true,
                                            description: "Authentication token for the session"
                                        },
                                        user: {
                                            type: "object",
                                            properties: {
                                                id: {
                                                    type: "string",
                                                    description: "The unique identifier of the user"
                                                },
                                                email: {
                                                    type: "string",
                                                    format: "email",
                                                    description: "The email address of the user"
                                                },
                                                name: {
                                                    type: "string",
                                                    description: "The name of the user"
                                                },
                                                image: {
                                                    type: "string",
                                                    format: "uri",
                                                    nullable: true,
                                                    description: "The profile image URL of the user"
                                                },
                                                emailVerified: {
                                                    type: "boolean",
                                                    description: "Whether the email has been verified"
                                                },
                                                createdAt: {
                                                    type: "string",
                                                    format: "date-time",
                                                    description: "When the user was created"
                                                },
                                                updatedAt: {
                                                    type: "string",
                                                    format: "date-time",
                                                    description: "When the user was last updated"
                                                }
                                            },
                                            required: [
                                                "id",
                                                "email",
                                                "name",
                                                "emailVerified",
                                                "createdAt",
                                                "updatedAt"
                                            ]
                                        }
                                    },
                                    required: [
                                        "user"
                                    ]
                                }
                            }
                        }
                    },
                    "422": {
                        description: "Unprocessable Entity. User already exists or failed to create user.",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }, async (ctx)=>{
        if (!ctx.context.options.emailAndPassword?.enabled || ctx.context.options.emailAndPassword?.disableSignUp) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                message: "Email and password sign up is not enabled"
            });
        }
        const body = ctx.body;
        const { name, email, password, image, callbackURL, rememberMe, ...rest } = body;
        const isValidEmail = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["email"]().safeParse(email);
        if (!isValidEmail.success) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].INVALID_EMAIL
            });
        }
        const minPasswordLength = ctx.context.password.config.minPasswordLength;
        if (password.length < minPasswordLength) {
            ctx.context.logger.error("Password is too short");
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].PASSWORD_TOO_SHORT
            });
        }
        const maxPasswordLength = ctx.context.password.config.maxPasswordLength;
        if (password.length > maxPasswordLength) {
            ctx.context.logger.error("Password is too long");
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].PASSWORD_TOO_LONG
            });
        }
        const dbUser = await ctx.context.internalAdapter.findUserByEmail(email);
        if (dbUser?.user) {
            ctx.context.logger.info(`Sign-up attempt for existing email: ${email}`);
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("UNPROCESSABLE_ENTITY", {
                message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL
            });
        }
        const hash = await ctx.context.password.hash(password);
        let createdUser;
        try {
            const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Cwj9dt6i$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["d"])(ctx.context.options, rest, "create");
            createdUser = await ctx.context.internalAdapter.createUser({
                email: email.toLowerCase(),
                name,
                image,
                ...data,
                emailVerified: false
            }, ctx);
            if (!createdUser) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                    message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].FAILED_TO_CREATE_USER
                });
            }
        } catch (e) {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDevelopment"])()) {
                ctx.context.logger.error("Failed to create user", e);
            }
            if (e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]) {
                throw e;
            }
            ctx.context.logger?.error("Failed to create user", e);
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("UNPROCESSABLE_ENTITY", {
                message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].FAILED_TO_CREATE_USER,
                details: e
            });
        }
        if (!createdUser) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("UNPROCESSABLE_ENTITY", {
                message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].FAILED_TO_CREATE_USER
            });
        }
        await ctx.context.internalAdapter.linkAccount({
            userId: createdUser.id,
            providerId: "credential",
            accountId: createdUser.id,
            password: hash
        }, ctx);
        if (ctx.context.options.emailVerification?.sendOnSignUp || ctx.context.options.emailAndPassword.requireEmailVerification) {
            const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BX9UB8EP$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["c"])(ctx.context.secret, createdUser.email, void 0, ctx.context.options.emailVerification?.expiresIn);
            const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${body.callbackURL || "/"}`;
            const args = ctx.request ? [
                {
                    user: createdUser,
                    url,
                    token
                },
                ctx.request
            ] : [
                {
                    user: createdUser,
                    url,
                    token
                }
            ];
            await ctx.context.options.emailVerification?.sendVerificationEmail?.(...args);
        }
        if (ctx.context.options.emailAndPassword.autoSignIn === false || ctx.context.options.emailAndPassword.requireEmailVerification) {
            return ctx.json({
                token: null,
                user: {
                    id: createdUser.id,
                    email: createdUser.email,
                    name: createdUser.name,
                    image: createdUser.image,
                    emailVerified: createdUser.emailVerified,
                    createdAt: createdUser.createdAt,
                    updatedAt: createdUser.updatedAt
                }
            });
        }
        const session = await ctx.context.internalAdapter.createSession(createdUser.id, ctx, rememberMe === false);
        if (!session) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"].FAILED_TO_CREATE_SESSION
            });
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D9_vQR83$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["s"])(ctx, {
            session,
            user: createdUser
        }, rememberMe === false);
        return ctx.json({
            token: session.token,
            user: {
                id: createdUser.id,
                email: createdUser.email,
                name: createdUser.name,
                image: createdUser.image,
                emailVerified: createdUser.emailVerified,
                createdAt: createdUser.createdAt,
                updatedAt: createdUser.updatedAt
            }
        });
    });
function shouldRateLimit(max, window, rateLimitData) {
    const now = Date.now();
    const windowInMs = window * 1e3;
    const timeSinceLastRequest = now - rateLimitData.lastRequest;
    return timeSinceLastRequest < windowInMs && rateLimitData.count >= max;
}
function rateLimitResponse(retryAfter) {
    return new Response(JSON.stringify({
        message: "Too many requests. Please try again later."
    }), {
        status: 429,
        statusText: "Too Many Requests",
        headers: {
            "X-Retry-After": retryAfter.toString()
        }
    });
}
function getRetryAfter(lastRequest, window) {
    const now = Date.now();
    const windowInMs = window * 1e3;
    return Math.ceil((lastRequest + windowInMs - now) / 1e3);
}
function createDBStorage(ctx) {
    const model = "rateLimit";
    const db = ctx.adapter;
    return {
        get: async (key)=>{
            const res = await db.findMany({
                model,
                where: [
                    {
                        field: "key",
                        value: key
                    }
                ]
            });
            const data = res[0];
            if (typeof data?.lastRequest === "bigint") {
                data.lastRequest = Number(data.lastRequest);
            }
            return data;
        },
        set: async (key, value, _update)=>{
            try {
                if (_update) {
                    await db.updateMany({
                        model,
                        where: [
                            {
                                field: "key",
                                value: key
                            }
                        ],
                        update: {
                            count: value.count,
                            lastRequest: value.lastRequest
                        }
                    });
                } else {
                    await db.create({
                        model,
                        data: {
                            key,
                            count: value.count,
                            lastRequest: value.lastRequest
                        }
                    });
                }
            } catch (e) {
                ctx.logger.error("Error setting rate limit", e);
            }
        }
    };
}
const memory = /* @__PURE__ */ new Map();
function getRateLimitStorage(ctx, rateLimitSettings) {
    if (ctx.options.rateLimit?.customStorage) {
        return ctx.options.rateLimit.customStorage;
    }
    const storage = ctx.rateLimit.storage;
    if (storage === "secondary-storage") {
        return {
            get: async (key)=>{
                const data = await ctx.options.secondaryStorage?.get(key);
                return data ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BKEtEpt0$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["s"])(data) : void 0;
            },
            set: async (key, value, _update)=>{
                const ttl = rateLimitSettings?.window ?? ctx.options.rateLimit?.window ?? 10;
                await ctx.options.secondaryStorage?.set?.(key, JSON.stringify(value), ttl);
            }
        };
    } else if (storage === "memory") {
        return {
            async get (key) {
                return memory.get(key);
            },
            async set (key, value, _update) {
                memory.set(key, value);
            }
        };
    }
    return createDBStorage(ctx);
}
async function onRequestRateLimit(req, ctx) {
    if (!ctx.rateLimit.enabled) {
        return;
    }
    const path = new URL(req.url).pathname.replace(ctx.options.basePath || "/api/auth", "");
    let window = ctx.rateLimit.window;
    let max = ctx.rateLimit.max;
    const ip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$ClH5r3NH$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])(req, ctx.options);
    if (!ip) {
        return;
    }
    const key = ip + path;
    const specialRules = getDefaultSpecialRules();
    const specialRule = specialRules.find((rule)=>rule.pathMatcher(path));
    if (specialRule) {
        window = specialRule.window;
        max = specialRule.max;
    }
    for (const plugin of ctx.options.plugins || []){
        if (plugin.rateLimit) {
            const matchedRule = plugin.rateLimit.find((rule)=>rule.pathMatcher(path));
            if (matchedRule) {
                window = matchedRule.window;
                max = matchedRule.max;
                break;
            }
        }
    }
    if (ctx.rateLimit.customRules) {
        const _path = Object.keys(ctx.rateLimit.customRules).find((p)=>{
            if (p.includes("*")) {
                const isMatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BX9UB8EP$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["w"])(p)(path);
                return isMatch;
            }
            return p === path;
        });
        if (_path) {
            const customRule = ctx.rateLimit.customRules[_path];
            const resolved = typeof customRule === "function" ? await customRule(req) : customRule;
            if (resolved) {
                window = resolved.window;
                max = resolved.max;
            }
            if (resolved === false) {
                return;
            }
        }
    }
    const storage = getRateLimitStorage(ctx, {
        window
    });
    const data = await storage.get(key);
    const now = Date.now();
    if (!data) {
        await storage.set(key, {
            key,
            count: 1,
            lastRequest: now
        });
    } else {
        const timeSinceLastRequest = now - data.lastRequest;
        if (shouldRateLimit(max, window, data)) {
            const retryAfter = getRetryAfter(data.lastRequest, window);
            return rateLimitResponse(retryAfter);
        } else if (timeSinceLastRequest > window * 1e3) {
            await storage.set(key, {
                ...data,
                count: 1,
                lastRequest: now
            }, true);
        } else {
            await storage.set(key, {
                ...data,
                count: data.count + 1,
                lastRequest: now
            }, true);
        }
    }
}
function getDefaultSpecialRules() {
    const specialRules = [
        {
            pathMatcher (path) {
                return path.startsWith("/sign-in") || path.startsWith("/sign-up") || path.startsWith("/change-password") || path.startsWith("/change-email");
            },
            window: 10,
            max: 3
        }
    ];
    return specialRules;
}
function checkEndpointConflicts(options, logger2) {
    const endpointRegistry = /* @__PURE__ */ new Map();
    options.plugins?.forEach((plugin)=>{
        if (plugin.endpoints) {
            for (const [key, endpoint] of Object.entries(plugin.endpoints)){
                if (endpoint && "path" in endpoint) {
                    const path = endpoint.path;
                    let methods = [];
                    if (endpoint.options && "method" in endpoint.options) {
                        if (Array.isArray(endpoint.options.method)) {
                            methods = endpoint.options.method;
                        } else if (typeof endpoint.options.method === "string") {
                            methods = [
                                endpoint.options.method
                            ];
                        }
                    }
                    if (methods.length === 0) {
                        methods = [
                            "*"
                        ];
                    }
                    if (!endpointRegistry.has(path)) {
                        endpointRegistry.set(path, []);
                    }
                    endpointRegistry.get(path).push({
                        pluginId: plugin.id,
                        endpointKey: key,
                        methods
                    });
                }
            }
        }
    });
    const conflicts = [];
    for (const [path, entries] of endpointRegistry.entries()){
        if (entries.length > 1) {
            const methodMap = /* @__PURE__ */ new Map();
            let hasConflict = false;
            for (const entry of entries){
                for (const method of entry.methods){
                    if (!methodMap.has(method)) {
                        methodMap.set(method, []);
                    }
                    methodMap.get(method).push(entry.pluginId);
                    if (methodMap.get(method).length > 1) {
                        hasConflict = true;
                    }
                    if (method === "*" && entries.length > 1) {
                        hasConflict = true;
                    } else if (method !== "*" && methodMap.has("*")) {
                        hasConflict = true;
                    }
                }
            }
            if (hasConflict) {
                const uniquePlugins = [
                    ...new Set(entries.map((e)=>e.pluginId))
                ];
                const conflictingMethods = [];
                for (const [method, plugins] of methodMap.entries()){
                    if (plugins.length > 1 || method === "*" && entries.length > 1 || method !== "*" && methodMap.has("*")) {
                        conflictingMethods.push(method);
                    }
                }
                conflicts.push({
                    path,
                    plugins: uniquePlugins,
                    conflictingMethods
                });
            }
        }
    }
    if (conflicts.length > 0) {
        const conflictMessages = conflicts.map((conflict)=>`  - "${conflict.path}" [${conflict.conflictingMethods.join(", ")}] used by plugins: ${conflict.plugins.join(", ")}`).join("\n");
        logger2.error(`Endpoint path conflicts detected! Multiple plugins are trying to use the same endpoint paths with conflicting HTTP methods:
${conflictMessages}

To resolve this, you can:
	1. Use only one of the conflicting plugins
	2. Configure the plugins to use different paths (if supported)
	3. Ensure plugins use different HTTP methods for the same path
`);
    }
}
function getEndpoints(ctx, options) {
    const pluginEndpoints = options.plugins?.reduce((acc, plugin)=>{
        return {
            ...acc,
            ...plugin.endpoints
        };
    }, {}) ?? {};
    const middlewares = options.plugins?.map((plugin)=>plugin.middlewares?.map((m)=>{
            const middleware = async (context)=>{
                const authContext = await ctx;
                return m.middleware({
                    ...context,
                    context: {
                        ...authContext,
                        ...context.context
                    }
                });
            };
            middleware.options = m.middleware.options;
            return {
                path: m.path,
                middleware
            };
        })).filter((plugin)=>plugin !== void 0).flat() || [];
    const baseEndpoints = {
        signInSocial: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BX9UB8EP$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["J"],
        callbackOAuth: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BX9UB8EP$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["I"],
        getSession: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DEBtROF9$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["a"])(),
        signOut: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BX9UB8EP$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["G"],
        signUpEmail: signUpEmail(),
        signInEmail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BX9UB8EP$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["F"],
        forgetPassword: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BX9UB8EP$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["E"],
        resetPassword: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BX9UB8EP$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["D"],
        verifyEmail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BX9UB8EP$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["C"],
        sendVerificationEmail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BX9UB8EP$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["B"],
        changeEmail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BX9UB8EP$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["A"],
        changePassword: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BX9UB8EP$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"],
        setPassword: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BX9UB8EP$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["y"],
        updateUser: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BX9UB8EP$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["u"])(),
        deleteUser: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BX9UB8EP$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["x"],
        forgetPasswordCallback: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BX9UB8EP$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"],
        requestPasswordReset: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BX9UB8EP$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["q"],
        requestPasswordResetCallback: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BX9UB8EP$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["n"],
        listSessions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DEBtROF9$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["l"])(),
        revokeSession: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DEBtROF9$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["c"],
        revokeSessions: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DEBtROF9$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["b"],
        revokeOtherSessions: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DEBtROF9$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["r"],
        linkSocialAccount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BX9UB8EP$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["m"],
        listUserAccounts: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BX9UB8EP$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["l"],
        deleteUserCallback: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BX9UB8EP$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["k"],
        unlinkAccount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BX9UB8EP$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["j"],
        refreshToken: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BX9UB8EP$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["r"],
        getAccessToken: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BX9UB8EP$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["i"],
        accountInfo: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BX9UB8EP$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["f"]
    };
    const endpoints = {
        ...baseEndpoints,
        ...pluginEndpoints,
        ok: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BX9UB8EP$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["b"],
        error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BX9UB8EP$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["e"]
    };
    const api = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BX9UB8EP$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["t"])(endpoints, ctx);
    return {
        api,
        middlewares
    };
}
const router = (ctx, options)=>{
    const { api, middlewares } = getEndpoints(ctx, options);
    const basePath = new URL(ctx.baseURL).pathname;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRouter"])(api, {
        routerContext: ctx,
        openapi: {
            disabled: true
        },
        basePath,
        routerMiddleware: [
            {
                path: "/**",
                middleware: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BX9UB8EP$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["a"]
            },
            ...middlewares
        ],
        async onRequest (req) {
            const disabledPaths = ctx.options.disabledPaths || [];
            const path = new URL(req.url).pathname.replace(basePath, "");
            if (disabledPaths.includes(path)) {
                return new Response("Not Found", {
                    status: 404
                });
            }
            for (const plugin of ctx.options.plugins || []){
                if (plugin.onRequest) {
                    const response = await plugin.onRequest(req, ctx);
                    if (response && "response" in response) {
                        return response.response;
                    }
                    if (response && "request" in response) {
                        const rateLimitResponse = await onRequestRateLimit(response.request, ctx);
                        if (rateLimitResponse) {
                            return rateLimitResponse;
                        }
                        return response.request;
                    }
                }
            }
            return onRequestRateLimit(req, ctx);
        },
        async onResponse (res) {
            for (const plugin of ctx.options.plugins || []){
                if (plugin.onResponse) {
                    const response = await plugin.onResponse(res, ctx);
                    if (response) {
                        return response.response;
                    }
                }
            }
            return res;
        },
        onError (e) {
            if (e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"] && e.status === "FOUND") {
                return;
            }
            if (options.onAPIError?.throw) {
                throw e;
            }
            if (options.onAPIError?.onError) {
                options.onAPIError.onError(e, ctx);
                return;
            }
            const optLogLevel = options.logger?.level;
            const log = optLogLevel === "error" || optLogLevel === "warn" || optLogLevel === "debug" ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"] : void 0;
            if (options.logger?.disabled !== true) {
                if (e && typeof e === "object" && "message" in e && typeof e.message === "string") {
                    if (e.message.includes("no column") || e.message.includes("column") || e.message.includes("relation") || e.message.includes("table") || e.message.includes("does not exist")) {
                        ctx.logger?.error(e.message);
                        return;
                    }
                }
                if (e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]) {
                    if (e.status === "INTERNAL_SERVER_ERROR") {
                        ctx.logger.error(e.status, e);
                    }
                    log?.error(e.message);
                } else {
                    ctx.logger?.error(e && typeof e === "object" && "name" in e ? e.name : "", e);
                }
            }
        }
    });
};
;
}),
"[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.pQjeRkzN.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "g",
    ()=>getAuthTables
]);
const getAuthTables = (options)=>{
    const pluginSchema = (options.plugins ?? []).reduce((acc, plugin)=>{
        const schema = plugin.schema;
        if (!schema) return acc;
        for (const [key, value] of Object.entries(schema)){
            acc[key] = {
                fields: {
                    ...acc[key]?.fields,
                    ...value.fields
                },
                modelName: value.modelName || key
            };
        }
        return acc;
    }, {});
    const shouldAddRateLimitTable = options.rateLimit?.storage === "database";
    const rateLimitTable = {
        rateLimit: {
            modelName: options.rateLimit?.modelName || "rateLimit",
            fields: {
                key: {
                    type: "string",
                    fieldName: options.rateLimit?.fields?.key || "key"
                },
                count: {
                    type: "number",
                    fieldName: options.rateLimit?.fields?.count || "count"
                },
                lastRequest: {
                    type: "number",
                    bigint: true,
                    fieldName: options.rateLimit?.fields?.lastRequest || "lastRequest"
                }
            }
        }
    };
    const { user, session, account, ...pluginTables } = pluginSchema;
    const sessionTable = {
        session: {
            modelName: options.session?.modelName || "session",
            fields: {
                expiresAt: {
                    type: "date",
                    required: true,
                    fieldName: options.session?.fields?.expiresAt || "expiresAt"
                },
                token: {
                    type: "string",
                    required: true,
                    fieldName: options.session?.fields?.token || "token",
                    unique: true
                },
                createdAt: {
                    type: "date",
                    required: true,
                    fieldName: options.session?.fields?.createdAt || "createdAt",
                    defaultValue: ()=>/* @__PURE__ */ new Date()
                },
                updatedAt: {
                    type: "date",
                    required: true,
                    fieldName: options.session?.fields?.updatedAt || "updatedAt",
                    onUpdate: ()=>/* @__PURE__ */ new Date()
                },
                ipAddress: {
                    type: "string",
                    required: false,
                    fieldName: options.session?.fields?.ipAddress || "ipAddress"
                },
                userAgent: {
                    type: "string",
                    required: false,
                    fieldName: options.session?.fields?.userAgent || "userAgent"
                },
                userId: {
                    type: "string",
                    fieldName: options.session?.fields?.userId || "userId",
                    references: {
                        model: options.user?.modelName || "user",
                        field: "id",
                        onDelete: "cascade"
                    },
                    required: true
                },
                ...session?.fields,
                ...options.session?.additionalFields
            },
            order: 2
        }
    };
    return {
        user: {
            modelName: options.user?.modelName || "user",
            fields: {
                name: {
                    type: "string",
                    required: true,
                    fieldName: options.user?.fields?.name || "name",
                    sortable: true
                },
                email: {
                    type: "string",
                    unique: true,
                    required: true,
                    fieldName: options.user?.fields?.email || "email",
                    sortable: true
                },
                emailVerified: {
                    type: "boolean",
                    defaultValue: false,
                    required: true,
                    fieldName: options.user?.fields?.emailVerified || "emailVerified",
                    input: false
                },
                image: {
                    type: "string",
                    required: false,
                    fieldName: options.user?.fields?.image || "image"
                },
                createdAt: {
                    type: "date",
                    defaultValue: ()=>/* @__PURE__ */ new Date(),
                    required: true,
                    fieldName: options.user?.fields?.createdAt || "createdAt"
                },
                updatedAt: {
                    type: "date",
                    defaultValue: ()=>/* @__PURE__ */ new Date(),
                    onUpdate: ()=>/* @__PURE__ */ new Date(),
                    required: true,
                    fieldName: options.user?.fields?.updatedAt || "updatedAt"
                },
                ...user?.fields,
                ...options.user?.additionalFields
            },
            order: 1
        },
        //only add session table if it's not stored in secondary storage
        ...!options.secondaryStorage || options.session?.storeSessionInDatabase ? sessionTable : {},
        account: {
            modelName: options.account?.modelName || "account",
            fields: {
                accountId: {
                    type: "string",
                    required: true,
                    fieldName: options.account?.fields?.accountId || "accountId"
                },
                providerId: {
                    type: "string",
                    required: true,
                    fieldName: options.account?.fields?.providerId || "providerId"
                },
                userId: {
                    type: "string",
                    references: {
                        model: options.user?.modelName || "user",
                        field: "id",
                        onDelete: "cascade"
                    },
                    required: true,
                    fieldName: options.account?.fields?.userId || "userId"
                },
                accessToken: {
                    type: "string",
                    required: false,
                    fieldName: options.account?.fields?.accessToken || "accessToken"
                },
                refreshToken: {
                    type: "string",
                    required: false,
                    fieldName: options.account?.fields?.refreshToken || "refreshToken"
                },
                idToken: {
                    type: "string",
                    required: false,
                    fieldName: options.account?.fields?.idToken || "idToken"
                },
                accessTokenExpiresAt: {
                    type: "date",
                    required: false,
                    fieldName: options.account?.fields?.accessTokenExpiresAt || "accessTokenExpiresAt"
                },
                refreshTokenExpiresAt: {
                    type: "date",
                    required: false,
                    fieldName: options.account?.fields?.refreshTokenExpiresAt || "refreshTokenExpiresAt"
                },
                scope: {
                    type: "string",
                    required: false,
                    fieldName: options.account?.fields?.scope || "scope"
                },
                password: {
                    type: "string",
                    required: false,
                    fieldName: options.account?.fields?.password || "password"
                },
                createdAt: {
                    type: "date",
                    required: true,
                    fieldName: options.account?.fields?.createdAt || "createdAt",
                    defaultValue: ()=>/* @__PURE__ */ new Date()
                },
                updatedAt: {
                    type: "date",
                    required: true,
                    fieldName: options.account?.fields?.updatedAt || "updatedAt",
                    onUpdate: ()=>/* @__PURE__ */ new Date()
                },
                ...account?.fields,
                ...options.account?.additionalFields
            },
            order: 3
        },
        verification: {
            modelName: options.verification?.modelName || "verification",
            fields: {
                identifier: {
                    type: "string",
                    required: true,
                    fieldName: options.verification?.fields?.identifier || "identifier"
                },
                value: {
                    type: "string",
                    required: true,
                    fieldName: options.verification?.fields?.value || "value"
                },
                expiresAt: {
                    type: "date",
                    required: true,
                    fieldName: options.verification?.fields?.expiresAt || "expiresAt"
                },
                createdAt: {
                    type: "date",
                    required: true,
                    defaultValue: ()=>/* @__PURE__ */ new Date(),
                    fieldName: options.verification?.fields?.createdAt || "createdAt"
                },
                updatedAt: {
                    type: "date",
                    required: true,
                    defaultValue: ()=>/* @__PURE__ */ new Date(),
                    onUpdate: ()=>/* @__PURE__ */ new Date(),
                    fieldName: options.verification?.fields?.updatedAt || "updatedAt"
                }
            },
            order: 4
        },
        ...pluginTables,
        ...shouldAddRateLimitTable ? rateLimitTable : {}
    };
};
;
}),
"[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.EBxKeVNZ.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "c",
    ()=>createAdapterFactory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BKEtEpt0$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.BKEtEpt0.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$pQjeRkzN$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.pQjeRkzN.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BUPPRXfK$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.BUPPRXfK.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-call@1.0.19/node_modules/better-call/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/hash.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/base64.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/hex.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/error/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.B4Qoxdgc.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/env/index.mjs [app-route] (ecmascript)");
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
function withApplyDefault(value, field, action) {
    if (action === "update") {
        if (value === void 0 && field.onUpdate !== void 0) {
            if (typeof field.onUpdate === "function") {
                return field.onUpdate();
            }
            return field.onUpdate;
        }
        return value;
    }
    if (value === void 0 || value === null) {
        if (field.defaultValue !== void 0) {
            if (typeof field.defaultValue === "function") {
                return field.defaultValue();
            }
            return field.defaultValue;
        }
    }
    return value;
}
let debugLogs = [];
let transactionId = -1;
const createAsIsTransaction = (adapter)=>(fn)=>fn(adapter);
const createAdapterFactory = ({ adapter: customAdapter, config: cfg })=>(options)=>{
        const uniqueAdapterFactoryInstanceId = Math.random().toString(36).substring(2, 15);
        const config = {
            ...cfg,
            supportsBooleans: cfg.supportsBooleans ?? true,
            supportsDates: cfg.supportsDates ?? true,
            supportsJSON: cfg.supportsJSON ?? false,
            adapterName: cfg.adapterName ?? cfg.adapterId,
            supportsNumericIds: cfg.supportsNumericIds ?? true,
            transaction: cfg.transaction ?? false,
            disableTransformInput: cfg.disableTransformInput ?? false,
            disableTransformOutput: cfg.disableTransformOutput ?? false
        };
        if (options.advanced?.database?.useNumberId === true && config.supportsNumericIds === false) {
            throw new Error(`[${config.adapterName}] Your database or database adapter does not support numeric ids. Please disable "useNumberId" in your config.`);
        }
        const schema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$pQjeRkzN$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])(options);
        const getDefaultFieldName = ({ field, model: unsafe_model })=>{
            if (field === "id" || field === "_id") {
                return "id";
            }
            const model = getDefaultModelName(unsafe_model);
            let f = schema[model]?.fields[field];
            if (!f) {
                const result = Object.entries(schema[model].fields).find(([_, f2])=>f2.fieldName === field);
                if (result) {
                    f = result[1];
                    field = result[0];
                }
            }
            if (!f) {
                debugLog(`Field ${field} not found in model ${model}`);
                debugLog(`Schema:`, schema);
                throw new Error(`Field ${field} not found in model ${model}`);
            }
            return field;
        };
        const getDefaultModelName = (model)=>{
            if (config.usePlural && model.charAt(model.length - 1) === "s") {
                let pluralessModel = model.slice(0, -1);
                let m2 = schema[pluralessModel] ? pluralessModel : void 0;
                if (!m2) {
                    m2 = Object.entries(schema).find(([_, f])=>f.modelName === pluralessModel)?.[0];
                }
                if (m2) {
                    return m2;
                }
            }
            let m = schema[model] ? model : void 0;
            if (!m) {
                m = Object.entries(schema).find(([_, f])=>f.modelName === model)?.[0];
            }
            if (!m) {
                debugLog(`Model "${model}" not found in schema`);
                debugLog(`Schema:`, schema);
                throw new Error(`Model "${model}" not found in schema`);
            }
            return m;
        };
        const getModelName = (model)=>{
            const defaultModelKey = getDefaultModelName(model);
            const usePlural = config && config.usePlural;
            const useCustomModelName = schema && schema[defaultModelKey] && schema[defaultModelKey].modelName !== model;
            if (useCustomModelName) {
                return usePlural ? `${schema[defaultModelKey].modelName}s` : schema[defaultModelKey].modelName;
            }
            return usePlural ? `${model}s` : model;
        };
        function getFieldName({ model: model_name, field: field_name }) {
            const model = getDefaultModelName(model_name);
            const field = getDefaultFieldName({
                model,
                field: field_name
            });
            return schema[model]?.fields[field]?.fieldName || field;
        }
        const debugLog = (...args)=>{
            if (config.debugLogs === true || typeof config.debugLogs === "object") {
                if (typeof config.debugLogs === "object" && "isRunningAdapterTests" in config.debugLogs) {
                    if (config.debugLogs.isRunningAdapterTests) {
                        args.shift();
                        debugLogs.push({
                            instance: uniqueAdapterFactoryInstanceId,
                            args
                        });
                    }
                    return;
                }
                if (typeof config.debugLogs === "object" && config.debugLogs.logCondition && !config.debugLogs.logCondition?.()) {
                    return;
                }
                if (typeof args[0] === "object" && "method" in args[0]) {
                    const method = args.shift().method;
                    if (typeof config.debugLogs === "object") {
                        if (method === "create" && !config.debugLogs.create) {
                            return;
                        } else if (method === "update" && !config.debugLogs.update) {
                            return;
                        } else if (method === "updateMany" && !config.debugLogs.updateMany) {
                            return;
                        } else if (method === "findOne" && !config.debugLogs.findOne) {
                            return;
                        } else if (method === "findMany" && !config.debugLogs.findMany) {
                            return;
                        } else if (method === "delete" && !config.debugLogs.delete) {
                            return;
                        } else if (method === "deleteMany" && !config.debugLogs.deleteMany) {
                            return;
                        } else if (method === "count" && !config.debugLogs.count) {
                            return;
                        }
                    }
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(`[${config.adapterName}]`, ...args);
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(`[${config.adapterName}]`, ...args);
                }
            }
        };
        const idField = ({ customModelName, forceAllowId })=>{
            const shouldGenerateId = !config.disableIdGeneration && !options.advanced?.database?.useNumberId && !forceAllowId;
            const model = getDefaultModelName(customModelName ?? "id");
            return {
                type: options.advanced?.database?.useNumberId ? "number" : "string",
                required: shouldGenerateId ? true : false,
                ...shouldGenerateId ? {
                    defaultValue () {
                        if (config.disableIdGeneration) return void 0;
                        const useNumberId = options.advanced?.database?.useNumberId;
                        let generateId$1 = options.advanced?.database?.generateId;
                        if (options.advanced?.generateId !== void 0) {
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].warn("Your Better Auth config includes advanced.generateId which is deprecated. Please use advanced.database.generateId instead. This will be removed in future releases.");
                            generateId$1 = options.advanced?.generateId;
                        }
                        if (generateId$1 === false || useNumberId) return void 0;
                        if (generateId$1) {
                            return generateId$1({
                                model
                            });
                        }
                        if (config.customIdGenerator) {
                            return config.customIdGenerator({
                                model
                            });
                        }
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BUPPRXfK$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])();
                    }
                } : {}
            };
        };
        const getFieldAttributes = ({ model, field })=>{
            const defaultModelName = getDefaultModelName(model);
            const defaultFieldName = getDefaultFieldName({
                field,
                model: defaultModelName
            });
            const fields = schema[defaultModelName].fields;
            fields.id = idField({
                customModelName: defaultModelName
            });
            return fields[defaultFieldName];
        };
        const transformInput = async (data, defaultModelName, action, forceAllowId)=>{
            const transformedData = {};
            const fields = schema[defaultModelName].fields;
            const newMappedKeys = config.mapKeysTransformInput ?? {};
            if (!config.disableIdGeneration && !options.advanced?.database?.useNumberId) {
                fields.id = idField({
                    customModelName: defaultModelName,
                    forceAllowId: forceAllowId && "id" in data
                });
            }
            for(const field in fields){
                const value = data[field];
                const fieldAttributes = fields[field];
                let newFieldName = newMappedKeys[field] || fields[field].fieldName || field;
                if (value === void 0 && (fieldAttributes.defaultValue === void 0 && !fieldAttributes.transform?.input && !(action === "update" && fieldAttributes.onUpdate) || action === "update" && !fieldAttributes.onUpdate)) {
                    continue;
                }
                let newValue = withApplyDefault(value, fieldAttributes, action);
                if (fieldAttributes.transform?.input) {
                    newValue = await fieldAttributes.transform.input(newValue);
                }
                if (fieldAttributes.references?.field === "id" && options.advanced?.database?.useNumberId) {
                    if (Array.isArray(newValue)) {
                        newValue = newValue.map((x)=>x !== null ? Number(x) : null);
                    } else {
                        newValue = newValue !== null ? Number(newValue) : null;
                    }
                } else if (config.supportsJSON === false && typeof newValue === "object" && fieldAttributes.type === "json") {
                    newValue = JSON.stringify(newValue);
                } else if (config.supportsDates === false && newValue instanceof Date && fieldAttributes.type === "date") {
                    newValue = newValue.toISOString();
                } else if (config.supportsBooleans === false && typeof newValue === "boolean") {
                    newValue = newValue ? 1 : 0;
                }
                if (config.customTransformInput) {
                    newValue = config.customTransformInput({
                        data: newValue,
                        action,
                        field: newFieldName,
                        fieldAttributes,
                        model: defaultModelName,
                        schema,
                        options
                    });
                }
                if (newValue !== void 0) {
                    transformedData[newFieldName] = newValue;
                }
            }
            return transformedData;
        };
        const transformOutput = async (data, unsafe_model, select = [])=>{
            if (!data) return null;
            const newMappedKeys = config.mapKeysTransformOutput ?? {};
            const transformedData = {};
            const tableSchema = schema[unsafe_model].fields;
            const idKey = Object.entries(newMappedKeys).find(([_, v])=>v === "id")?.[0];
            tableSchema[idKey ?? "id"] = {
                type: options.advanced?.database?.useNumberId ? "number" : "string"
            };
            for(const key in tableSchema){
                if (select.length && !select.includes(key)) {
                    continue;
                }
                const field = tableSchema[key];
                if (field) {
                    const originalKey = field.fieldName || key;
                    let newValue = data[Object.entries(newMappedKeys).find(([_, v])=>v === originalKey)?.[0] || originalKey];
                    if (field.transform?.output) {
                        newValue = await field.transform.output(newValue);
                    }
                    let newFieldName = newMappedKeys[key] || key;
                    if (originalKey === "id" || field.references?.field === "id") {
                        if (typeof newValue !== "undefined" && newValue !== null) newValue = String(newValue);
                    } else if (config.supportsJSON === false && typeof newValue === "string" && field.type === "json") {
                        newValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BKEtEpt0$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["s"])(newValue);
                    } else if (config.supportsDates === false && typeof newValue === "string" && field.type === "date") {
                        newValue = new Date(newValue);
                    } else if (config.supportsBooleans === false && typeof newValue === "number" && field.type === "boolean") {
                        newValue = newValue === 1;
                    }
                    if (config.customTransformOutput) {
                        newValue = config.customTransformOutput({
                            data: newValue,
                            field: newFieldName,
                            fieldAttributes: field,
                            select,
                            model: unsafe_model,
                            schema,
                            options
                        });
                    }
                    transformedData[newFieldName] = newValue;
                }
            }
            return transformedData;
        };
        const transformWhereClause = ({ model, where })=>{
            if (!where) return void 0;
            const newMappedKeys = config.mapKeysTransformInput ?? {};
            return where.map((w)=>{
                const { field: unsafe_field, value, operator = "eq", connector = "AND" } = w;
                if (operator === "in") {
                    if (!Array.isArray(value)) {
                        throw new Error("Value must be an array");
                    }
                }
                const defaultModelName = getDefaultModelName(model);
                const defaultFieldName = getDefaultFieldName({
                    field: unsafe_field,
                    model
                });
                const fieldName = newMappedKeys[defaultFieldName] || getFieldName({
                    field: defaultFieldName,
                    model: defaultModelName
                });
                const fieldAttr = getFieldAttributes({
                    field: defaultFieldName,
                    model: defaultModelName
                });
                if (defaultFieldName === "id" || fieldAttr.references?.field === "id") {
                    if (options.advanced?.database?.useNumberId) {
                        if (Array.isArray(value)) {
                            return {
                                operator,
                                connector,
                                field: fieldName,
                                value: value.map(Number)
                            };
                        }
                        return {
                            operator,
                            connector,
                            field: fieldName,
                            value: Number(value)
                        };
                    }
                }
                return {
                    operator,
                    connector,
                    field: fieldName,
                    value
                };
            });
        };
        const adapterInstance = customAdapter({
            options,
            schema,
            debugLog,
            getFieldName,
            getModelName,
            getDefaultModelName,
            getDefaultFieldName,
            getFieldAttributes,
            transformInput,
            transformOutput,
            transformWhereClause
        });
        let lazyLoadTransaction = null;
        const adapter = {
            transaction: async (cb)=>{
                if (!lazyLoadTransaction) {
                    if (!config.transaction) {
                        if (typeof config.debugLogs === "object" && "isRunningAdapterTests" in config.debugLogs && config.debugLogs.isRunningAdapterTests) ;
                        else {
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].warn(`[${config.adapterName}] - Transactions are not supported. Executing operations sequentially.`);
                        }
                        lazyLoadTransaction = createAsIsTransaction(adapter);
                    } else {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].debug(`[${config.adapterName}] - Using provided transaction implementation.`);
                        lazyLoadTransaction = config.transaction;
                    }
                }
                return lazyLoadTransaction(cb);
            },
            create: async ({ data: unsafeData, model: unsafeModel, select, forceAllowId = false })=>{
                transactionId++;
                let thisTransactionId = transactionId;
                const model = getModelName(unsafeModel);
                unsafeModel = getDefaultModelName(unsafeModel);
                if ("id" in unsafeData && !forceAllowId) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].warn(`[${config.adapterName}] - You are trying to create a record with an id. This is not allowed as we handle id generation for you, unless you pass in the \`forceAllowId\` parameter. The id will be ignored.`);
                    const err = new Error();
                    const stack = err.stack?.split("\n").filter((_, i)=>i !== 1).join("\n").replace("Error:", "Create method with `id` being called at:");
                    console.log(stack);
                    unsafeData.id = void 0;
                }
                debugLog({
                    method: "create"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(1, 4)}`, `${formatMethod("create")} ${formatAction("Unsafe Input")}:`, {
                    model,
                    data: unsafeData
                });
                let data = unsafeData;
                if (!config.disableTransformInput) {
                    data = await transformInput(unsafeData, unsafeModel, "create", forceAllowId);
                }
                debugLog({
                    method: "create"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(2, 4)}`, `${formatMethod("create")} ${formatAction("Parsed Input")}:`, {
                    model,
                    data
                });
                const res = await adapterInstance.create({
                    data,
                    model
                });
                debugLog({
                    method: "create"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(3, 4)}`, `${formatMethod("create")} ${formatAction("DB Result")}:`, {
                    model,
                    res
                });
                let transformed = res;
                if (!config.disableTransformOutput) {
                    transformed = await transformOutput(res, unsafeModel, select);
                }
                debugLog({
                    method: "create"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(4, 4)}`, `${formatMethod("create")} ${formatAction("Parsed Result")}:`, {
                    model,
                    data: transformed
                });
                return transformed;
            },
            update: async ({ model: unsafeModel, where: unsafeWhere, update: unsafeData })=>{
                transactionId++;
                let thisTransactionId = transactionId;
                unsafeModel = getDefaultModelName(unsafeModel);
                const model = getModelName(unsafeModel);
                const where = transformWhereClause({
                    model: unsafeModel,
                    where: unsafeWhere
                });
                debugLog({
                    method: "update"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(1, 4)}`, `${formatMethod("update")} ${formatAction("Unsafe Input")}:`, {
                    model,
                    data: unsafeData
                });
                let data = unsafeData;
                if (!config.disableTransformInput) {
                    data = await transformInput(unsafeData, unsafeModel, "update");
                }
                debugLog({
                    method: "update"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(2, 4)}`, `${formatMethod("update")} ${formatAction("Parsed Input")}:`, {
                    model,
                    data
                });
                const res = await adapterInstance.update({
                    model,
                    where,
                    update: data
                });
                debugLog({
                    method: "update"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(3, 4)}`, `${formatMethod("update")} ${formatAction("DB Result")}:`, {
                    model,
                    data: res
                });
                let transformed = res;
                if (!config.disableTransformOutput) {
                    transformed = await transformOutput(res, unsafeModel);
                }
                debugLog({
                    method: "update"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(4, 4)}`, `${formatMethod("update")} ${formatAction("Parsed Result")}:`, {
                    model,
                    data: transformed
                });
                return transformed;
            },
            updateMany: async ({ model: unsafeModel, where: unsafeWhere, update: unsafeData })=>{
                transactionId++;
                let thisTransactionId = transactionId;
                const model = getModelName(unsafeModel);
                const where = transformWhereClause({
                    model: unsafeModel,
                    where: unsafeWhere
                });
                unsafeModel = getDefaultModelName(unsafeModel);
                debugLog({
                    method: "updateMany"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(1, 4)}`, `${formatMethod("updateMany")} ${formatAction("Unsafe Input")}:`, {
                    model,
                    data: unsafeData
                });
                let data = unsafeData;
                if (!config.disableTransformInput) {
                    data = await transformInput(unsafeData, unsafeModel, "update");
                }
                debugLog({
                    method: "updateMany"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(2, 4)}`, `${formatMethod("updateMany")} ${formatAction("Parsed Input")}:`, {
                    model,
                    data
                });
                const updatedCount = await adapterInstance.updateMany({
                    model,
                    where,
                    update: data
                });
                debugLog({
                    method: "updateMany"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(3, 4)}`, `${formatMethod("updateMany")} ${formatAction("DB Result")}:`, {
                    model,
                    data: updatedCount
                });
                debugLog({
                    method: "updateMany"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(4, 4)}`, `${formatMethod("updateMany")} ${formatAction("Parsed Result")}:`, {
                    model,
                    data: updatedCount
                });
                return updatedCount;
            },
            findOne: async ({ model: unsafeModel, where: unsafeWhere, select })=>{
                transactionId++;
                let thisTransactionId = transactionId;
                const model = getModelName(unsafeModel);
                const where = transformWhereClause({
                    model: unsafeModel,
                    where: unsafeWhere
                });
                unsafeModel = getDefaultModelName(unsafeModel);
                debugLog({
                    method: "findOne"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(1, 3)}`, `${formatMethod("findOne")}:`, {
                    model,
                    where,
                    select
                });
                const res = await adapterInstance.findOne({
                    model,
                    where,
                    select
                });
                debugLog({
                    method: "findOne"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(2, 3)}`, `${formatMethod("findOne")} ${formatAction("DB Result")}:`, {
                    model,
                    data: res
                });
                let transformed = res;
                if (!config.disableTransformOutput) {
                    transformed = await transformOutput(res, unsafeModel, select);
                }
                debugLog({
                    method: "findOne"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(3, 3)}`, `${formatMethod("findOne")} ${formatAction("Parsed Result")}:`, {
                    model,
                    data: transformed
                });
                return transformed;
            },
            findMany: async ({ model: unsafeModel, where: unsafeWhere, limit: unsafeLimit, sortBy, offset })=>{
                transactionId++;
                let thisTransactionId = transactionId;
                const limit = unsafeLimit ?? options.advanced?.database?.defaultFindManyLimit ?? 100;
                const model = getModelName(unsafeModel);
                const where = transformWhereClause({
                    model: unsafeModel,
                    where: unsafeWhere
                });
                unsafeModel = getDefaultModelName(unsafeModel);
                debugLog({
                    method: "findMany"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(1, 3)}`, `${formatMethod("findMany")}:`, {
                    model,
                    where,
                    limit,
                    sortBy,
                    offset
                });
                const res = await adapterInstance.findMany({
                    model,
                    where,
                    limit,
                    sortBy,
                    offset
                });
                debugLog({
                    method: "findMany"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(2, 3)}`, `${formatMethod("findMany")} ${formatAction("DB Result")}:`, {
                    model,
                    data: res
                });
                let transformed = res;
                if (!config.disableTransformOutput) {
                    transformed = await Promise.all(res.map(async (r)=>await transformOutput(r, unsafeModel)));
                }
                debugLog({
                    method: "findMany"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(3, 3)}`, `${formatMethod("findMany")} ${formatAction("Parsed Result")}:`, {
                    model,
                    data: transformed
                });
                return transformed;
            },
            delete: async ({ model: unsafeModel, where: unsafeWhere })=>{
                transactionId++;
                let thisTransactionId = transactionId;
                const model = getModelName(unsafeModel);
                const where = transformWhereClause({
                    model: unsafeModel,
                    where: unsafeWhere
                });
                unsafeModel = getDefaultModelName(unsafeModel);
                debugLog({
                    method: "delete"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(1, 2)}`, `${formatMethod("delete")}:`, {
                    model,
                    where
                });
                await adapterInstance.delete({
                    model,
                    where
                });
                debugLog({
                    method: "delete"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(2, 2)}`, `${formatMethod("delete")} ${formatAction("DB Result")}:`, {
                    model
                });
            },
            deleteMany: async ({ model: unsafeModel, where: unsafeWhere })=>{
                transactionId++;
                let thisTransactionId = transactionId;
                const model = getModelName(unsafeModel);
                const where = transformWhereClause({
                    model: unsafeModel,
                    where: unsafeWhere
                });
                unsafeModel = getDefaultModelName(unsafeModel);
                debugLog({
                    method: "deleteMany"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(1, 2)}`, `${formatMethod("deleteMany")} ${formatAction("DeleteMany")}:`, {
                    model,
                    where
                });
                const res = await adapterInstance.deleteMany({
                    model,
                    where
                });
                debugLog({
                    method: "deleteMany"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(2, 2)}`, `${formatMethod("deleteMany")} ${formatAction("DB Result")}:`, {
                    model,
                    data: res
                });
                return res;
            },
            count: async ({ model: unsafeModel, where: unsafeWhere })=>{
                transactionId++;
                let thisTransactionId = transactionId;
                const model = getModelName(unsafeModel);
                const where = transformWhereClause({
                    model: unsafeModel,
                    where: unsafeWhere
                });
                unsafeModel = getDefaultModelName(unsafeModel);
                debugLog({
                    method: "count"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(1, 2)}`, `${formatMethod("count")}:`, {
                    model,
                    where
                });
                const res = await adapterInstance.count({
                    model,
                    where
                });
                debugLog({
                    method: "count"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(2, 2)}`, `${formatMethod("count")}:`, {
                    model,
                    data: res
                });
                return res;
            },
            createSchema: adapterInstance.createSchema ? async (_, file)=>{
                const tables = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$pQjeRkzN$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])(options);
                if (options.secondaryStorage && !options.session?.storeSessionInDatabase) {
                    delete tables.session;
                }
                if (options.rateLimit && options.rateLimit.storage === "database" && // rate-limit will default to enabled in production,
                // and given storage is database, it will try to use the rate-limit table,
                // so we should make sure to generate rate-limit table schema
                (typeof options.rateLimit.enabled === "undefined" || // and of course if they forcefully set to true, then they want rate-limit,
                // thus we should also generate rate-limit table schema
                options.rateLimit.enabled === true)) {
                    tables.ratelimit = {
                        modelName: options.rateLimit.modelName ?? "ratelimit",
                        fields: {
                            key: {
                                type: "string",
                                unique: true,
                                required: true,
                                fieldName: options.rateLimit.fields?.key ?? "key"
                            },
                            count: {
                                type: "number",
                                required: true,
                                fieldName: options.rateLimit.fields?.count ?? "count"
                            },
                            lastRequest: {
                                type: "number",
                                required: true,
                                bigint: true,
                                defaultValue: ()=>Date.now(),
                                fieldName: options.rateLimit.fields?.lastRequest ?? "lastRequest"
                            }
                        }
                    };
                }
                return adapterInstance.createSchema({
                    file,
                    tables
                });
            } : void 0,
            options: {
                adapterConfig: config,
                ...adapterInstance.options ?? {}
            },
            id: config.adapterId,
            // Secretly export values ONLY if this adapter has enabled adapter-test-debug-logs.
            // This would then be used during our adapter-tests to help print debug logs if a test fails.
            //@ts-expect-error - ^^
            ...config.debugLogs?.isRunningAdapterTests ? {
                adapterTestDebugLogs: {
                    resetDebugLogs () {
                        debugLogs = debugLogs.filter((log)=>log.instance !== uniqueAdapterFactoryInstanceId);
                    },
                    printDebugLogs () {
                        const separator = `\u2500`.repeat(80);
                        const logs = debugLogs.filter((log2)=>log2.instance === uniqueAdapterFactoryInstanceId);
                        if (logs.length === 0) {
                            return;
                        }
                        let log = logs.reverse().map((log2)=>{
                            log2.args[0] = `
${log2.args[0]}`;
                            return [
                                ...log2.args,
                                "\n"
                            ];
                        }).reduce((prev, curr)=>{
                            return [
                                ...curr,
                                ...prev
                            ];
                        }, [
                            `
${separator}`
                        ]);
                        console.log(...log);
                    }
                }
            } : {}
        };
        return adapter;
    };
function formatTransactionId(transactionId2) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getColorDepth"])() < 8) {
        return `#${transactionId2}`;
    }
    return `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TTY_COLORS"].fg.magenta}#${transactionId2}${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TTY_COLORS"].reset}`;
}
function formatStep(step, total) {
    return `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TTY_COLORS"].bg.black}${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TTY_COLORS"].fg.yellow}[${step}/${total}]${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TTY_COLORS"].reset}`;
}
function formatMethod(method) {
    return `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TTY_COLORS"].bright}${method}${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TTY_COLORS"].reset}`;
}
function formatAction(action) {
    return `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TTY_COLORS"].dim}(${action})${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TTY_COLORS"].reset}`;
}
;
}),
"[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.CBTS2OzX.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "c",
    ()=>createKyselyAdapter,
    "g",
    ()=>getKyselyDatabaseType,
    "k",
    ()=>kyselyAdapter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$sqlite$2f$sqlite$2d$dialect$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/sqlite/sqlite-dialect.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$mysql$2f$mysql$2d$dialect$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/mysql/mysql-dialect.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$postgres$2f$postgres$2d$dialect$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/postgres/postgres-dialect.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$mssql$2f$mssql$2d$dialect$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/dialect/mssql/mssql-dialect.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$kysely$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/kysely.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$EBxKeVNZ$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.EBxKeVNZ.mjs [app-route] (ecmascript)");
;
;
function getKyselyDatabaseType(db) {
    if (!db) {
        return null;
    }
    if ("dialect" in db) {
        return getKyselyDatabaseType(db.dialect);
    }
    if ("createDriver" in db) {
        if (db instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$sqlite$2f$sqlite$2d$dialect$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SqliteDialect"]) {
            return "sqlite";
        }
        if (db instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$mysql$2f$mysql$2d$dialect$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MysqlDialect"]) {
            return "mysql";
        }
        if (db instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$postgres$2f$postgres$2d$dialect$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PostgresDialect"]) {
            return "postgres";
        }
        if (db instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$mssql$2f$mssql$2d$dialect$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MssqlDialect"]) {
            return "mssql";
        }
    }
    if ("aggregate" in db) {
        return "sqlite";
    }
    if ("getConnection" in db) {
        return "mysql";
    }
    if ("connect" in db) {
        return "postgres";
    }
    if ("fileControl" in db) {
        return "sqlite";
    }
    if ("open" in db && "close" in db && "prepare" in db) {
        return "sqlite";
    }
    return null;
}
const createKyselyAdapter = async (config)=>{
    const db = config.database;
    if (!db) {
        return {
            kysely: null,
            databaseType: null,
            transaction: void 0
        };
    }
    if ("db" in db) {
        return {
            kysely: db.db,
            databaseType: db.type,
            transaction: db.transaction
        };
    }
    if ("dialect" in db) {
        return {
            kysely: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$kysely$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Kysely"]({
                dialect: db.dialect
            }),
            databaseType: db.type,
            transaction: db.transaction
        };
    }
    let dialect = void 0;
    const databaseType = getKyselyDatabaseType(db);
    if ("createDriver" in db) {
        dialect = db;
    }
    if ("aggregate" in db && !("createSession" in db)) {
        dialect = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$sqlite$2f$sqlite$2d$dialect$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SqliteDialect"]({
            database: db
        });
    }
    if ("getConnection" in db) {
        dialect = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$mysql$2f$mysql$2d$dialect$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MysqlDialect"](db);
    }
    if ("connect" in db) {
        dialect = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$postgres$2f$postgres$2d$dialect$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PostgresDialect"]({
            pool: db
        });
    }
    if ("fileControl" in db) {
        const { BunSqliteDialect } = await __turbopack_context__.A("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/chunks/bun-sqlite-dialect.mjs [app-route] (ecmascript, async loader)");
        dialect = new BunSqliteDialect({
            database: db
        });
    }
    if ("createSession" in db && ("TURBOPACK compile-time value", "undefined") === "undefined") {
        let DatabaseSync = void 0;
        try {
            let nodeSqlite = "node:sqlite";
            ({ DatabaseSync } = await import(/* @vite-ignore */ /* webpackIgnore: true */ nodeSqlite));
        } catch (error) {
            if (error !== null && typeof error === "object" && "code" in error && error.code !== "ERR_UNKNOWN_BUILTIN_MODULE") {
                throw error;
            }
        }
        if (DatabaseSync && db instanceof DatabaseSync) {
            const { NodeSqliteDialect } = await __turbopack_context__.A("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/chunks/node-sqlite-dialect.mjs [app-route] (ecmascript, async loader)");
            dialect = new NodeSqliteDialect({
                database: db
            });
        }
    }
    return {
        kysely: dialect ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$kysely$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Kysely"]({
            dialect
        }) : null,
        databaseType,
        transaction: void 0
    };
};
const kyselyAdapter = (db, config)=>{
    let lazyOptions = null;
    const createCustomAdapter = (db2)=>{
        return ({ getFieldName, schema, getDefaultModelName })=>{
            const withReturning = async (values, builder, model, where)=>{
                let res;
                if (config?.type === "mysql") {
                    await builder.execute();
                    const field = values.id ? "id" : where.length > 0 && where[0]?.field ? where[0].field : "id";
                    if (!values.id && where.length === 0) {
                        res = await db2.selectFrom(model).selectAll().orderBy(getFieldName({
                            model,
                            field
                        }), "desc").limit(1).executeTakeFirst();
                        return res;
                    }
                    const value = values[field] || where[0]?.value;
                    res = await db2.selectFrom(model).selectAll().orderBy(getFieldName({
                        model,
                        field
                    }), "desc").where(getFieldName({
                        model,
                        field
                    }), "=", value).limit(1).executeTakeFirst();
                    return res;
                }
                if (config?.type === "mssql") {
                    res = await builder.outputAll("inserted").executeTakeFirst();
                    return res;
                }
                res = await builder.returningAll().executeTakeFirst();
                return res;
            };
            function transformValueToDB(value, model, field) {
                if (field === "id") {
                    return value;
                }
                const { type = "sqlite" } = config || {};
                let f = schema[model]?.fields[field];
                if (!f) {
                    f = Object.values(schema).find((f2)=>f2.modelName === model);
                }
                if (f.type === "boolean" && (type === "sqlite" || type === "mssql") && value !== null && value !== void 0) {
                    return value ? 1 : 0;
                }
                if (f.type === "date" && value && value instanceof Date) {
                    if (type === "sqlite") return value.toISOString();
                    return value;
                }
                return value;
            }
            function transformValueFromDB(value) {
                function transformObject(obj) {
                    for(const key in obj){
                        if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
                        const field = obj[key];
                        if (field instanceof Date && config?.type === "mysql") ;
                        else if (typeof field === "object" && field !== null) {
                            transformObject(field);
                        }
                    }
                }
                if (Array.isArray(value)) {
                    for(let i = 0; i < value.length; i++){
                        const item = value[i];
                        if (typeof item === "object" && item !== null) {
                            transformObject(item);
                        }
                    }
                } else if (typeof value === "object" && value !== null) {
                    transformObject(value);
                }
                return value;
            }
            function convertWhereClause(model, w) {
                if (!w) return {
                    and: null,
                    or: null
                };
                const conditions = {
                    and: [],
                    or: []
                };
                w.forEach((condition)=>{
                    let { field: _field, value, operator = "=", connector = "AND" } = condition;
                    const field = getFieldName({
                        model,
                        field: _field
                    });
                    value = transformValueToDB(value, model, _field);
                    const expr = (eb)=>{
                        if (operator.toLowerCase() === "in") {
                            return eb(field, "in", Array.isArray(value) ? value : [
                                value
                            ]);
                        }
                        if (operator.toLowerCase() === "not_in") {
                            return eb(field, "not in", Array.isArray(value) ? value : [
                                value
                            ]);
                        }
                        if (operator === "contains") {
                            return eb(field, "like", `%${value}%`);
                        }
                        if (operator === "starts_with") {
                            return eb(field, "like", `${value}%`);
                        }
                        if (operator === "ends_with") {
                            return eb(field, "like", `%${value}`);
                        }
                        if (operator === "eq") {
                            return eb(field, "=", value);
                        }
                        if (operator === "ne") {
                            return eb(field, "<>", value);
                        }
                        if (operator === "gt") {
                            return eb(field, ">", value);
                        }
                        if (operator === "gte") {
                            return eb(field, ">=", value);
                        }
                        if (operator === "lt") {
                            return eb(field, "<", value);
                        }
                        if (operator === "lte") {
                            return eb(field, "<=", value);
                        }
                        return eb(field, operator, value);
                    };
                    if (connector === "OR") {
                        conditions.or.push(expr);
                    } else {
                        conditions.and.push(expr);
                    }
                });
                return {
                    and: conditions.and.length ? conditions.and : null,
                    or: conditions.or.length ? conditions.or : null
                };
            }
            return {
                async create ({ data, model }) {
                    const builder = db2.insertInto(model).values(data);
                    const returned = await withReturning(data, builder, model, []);
                    return transformValueFromDB(returned);
                },
                async findOne ({ model, where, select }) {
                    const { and, or } = convertWhereClause(model, where);
                    let query = db2.selectFrom(model).selectAll();
                    if (and) {
                        query = query.where((eb)=>eb.and(and.map((expr)=>expr(eb))));
                    }
                    if (or) {
                        query = query.where((eb)=>eb.or(or.map((expr)=>expr(eb))));
                    }
                    const res = await query.executeTakeFirst();
                    if (!res) return null;
                    return transformValueFromDB(res);
                },
                async findMany ({ model, where, limit, offset, sortBy }) {
                    const { and, or } = convertWhereClause(model, where);
                    let query = db2.selectFrom(model);
                    if (and) {
                        query = query.where((eb)=>eb.and(and.map((expr)=>expr(eb))));
                    }
                    if (or) {
                        query = query.where((eb)=>eb.or(or.map((expr)=>expr(eb))));
                    }
                    if (config?.type === "mssql") {
                        if (!offset) {
                            query = query.top(limit || 100);
                        }
                    } else {
                        query = query.limit(limit || 100);
                    }
                    if (sortBy) {
                        query = query.orderBy(getFieldName({
                            model,
                            field: sortBy.field
                        }), sortBy.direction);
                    }
                    if (offset) {
                        if (config?.type === "mssql") {
                            if (!sortBy) {
                                query = query.orderBy(getFieldName({
                                    model,
                                    field: "id"
                                }));
                            }
                            query = query.offset(offset).fetch(limit || 100);
                        } else {
                            query = query.offset(offset);
                        }
                    }
                    const res = await query.selectAll().execute();
                    if (!res) return [];
                    return transformValueFromDB(res);
                },
                async update ({ model, where, update: values }) {
                    const { and, or } = convertWhereClause(model, where);
                    let query = db2.updateTable(model).set(values);
                    if (and) {
                        query = query.where((eb)=>eb.and(and.map((expr)=>expr(eb))));
                    }
                    if (or) {
                        query = query.where((eb)=>eb.or(or.map((expr)=>expr(eb))));
                    }
                    return transformValueFromDB(await withReturning(values, query, model, where));
                },
                async updateMany ({ model, where, update: values }) {
                    const { and, or } = convertWhereClause(model, where);
                    let query = db2.updateTable(model).set(values);
                    if (and) {
                        query = query.where((eb)=>eb.and(and.map((expr)=>expr(eb))));
                    }
                    if (or) {
                        query = query.where((eb)=>eb.or(or.map((expr)=>expr(eb))));
                    }
                    const res = await query.execute();
                    return res.length;
                },
                async count ({ model, where }) {
                    const { and, or } = convertWhereClause(model, where);
                    let query = db2.selectFrom(model).select(db2.fn.count("id").as("count"));
                    if (and) {
                        query = query.where((eb)=>eb.and(and.map((expr)=>expr(eb))));
                    }
                    if (or) {
                        query = query.where((eb)=>eb.or(or.map((expr)=>expr(eb))));
                    }
                    const res = await query.execute();
                    if (typeof res[0].count === "number") {
                        return res[0].count;
                    }
                    if (typeof res[0].count === "bigint") {
                        return Number(res[0].count);
                    }
                    return parseInt(res[0].count);
                },
                async delete ({ model, where }) {
                    const { and, or } = convertWhereClause(model, where);
                    let query = db2.deleteFrom(model);
                    if (and) {
                        query = query.where((eb)=>eb.and(and.map((expr)=>expr(eb))));
                    }
                    if (or) {
                        query = query.where((eb)=>eb.or(or.map((expr)=>expr(eb))));
                    }
                    await query.execute();
                },
                async deleteMany ({ model, where }) {
                    const { and, or } = convertWhereClause(model, where);
                    let query = db2.deleteFrom(model);
                    if (and) {
                        query = query.where((eb)=>eb.and(and.map((expr)=>expr(eb))));
                    }
                    if (or) {
                        query = query.where((eb)=>eb.or(or.map((expr)=>expr(eb))));
                    }
                    return (await query.execute()).length;
                },
                options: config
            };
        };
    };
    let adapterOptions = null;
    adapterOptions = {
        config: {
            adapterId: "kysely",
            adapterName: "Kysely Adapter",
            usePlural: config?.usePlural,
            debugLogs: config?.debugLogs,
            supportsBooleans: config?.type === "sqlite" || config?.type === "mssql" || config?.type === "mysql" || !config?.type ? false : true,
            supportsDates: config?.type === "sqlite" || config?.type === "mssql" || !config?.type ? false : true,
            supportsJSON: false,
            transaction: config?.transaction ?? false ? (cb)=>db.transaction().execute((trx)=>{
                    const adapter2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$EBxKeVNZ$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["c"])({
                        config: adapterOptions.config,
                        adapter: createCustomAdapter(trx)
                    })(lazyOptions);
                    return cb(adapter2);
                }) : false
        },
        adapter: createCustomAdapter(db)
    };
    const adapter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$EBxKeVNZ$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["c"])(adapterOptions);
    return (options)=>{
        lazyOptions = options;
        return adapter(options);
    };
};
;
}),
"[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.BNpIwq4C.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "m",
    ()=>memoryAdapter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/env/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$EBxKeVNZ$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.EBxKeVNZ.mjs [app-route] (ecmascript)");
;
;
const memoryAdapter = (db, config)=>{
    let lazyOptions = null;
    let adapterCreator = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$EBxKeVNZ$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["c"])({
        config: {
            adapterId: "memory",
            adapterName: "Memory Adapter",
            usePlural: false,
            debugLogs: config?.debugLogs || false,
            customTransformInput (props) {
                if (props.options.advanced?.database?.useNumberId && props.field === "id" && props.action === "create") {
                    return db[props.model].length + 1;
                }
                return props.data;
            },
            transaction: async (cb)=>{
                let clone = structuredClone(db);
                try {
                    const r = await cb(adapterCreator(lazyOptions));
                    return r;
                } catch (error) {
                    Object.keys(db).forEach((key)=>{
                        db[key] = clone[key];
                    });
                    throw error;
                }
            }
        },
        adapter: ({ getFieldName, options, debugLog })=>{
            function convertWhereClause(where, model) {
                const table = db[model];
                if (!table) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error(`[MemoryAdapter] Model ${model} not found in the DB`, Object.keys(db));
                    throw new Error(`Model ${model} not found`);
                }
                const evalClause = (record, clause)=>{
                    const { field, value, operator } = clause;
                    switch(operator){
                        case "in":
                            if (!Array.isArray(value)) {
                                throw new Error("Value must be an array");
                            }
                            return value.includes(record[field]);
                        case "not_in":
                            if (!Array.isArray(value)) {
                                throw new Error("Value must be an array");
                            }
                            return !value.includes(record[field]);
                        case "contains":
                            return record[field].includes(value);
                        case "starts_with":
                            return record[field].startsWith(value);
                        case "ends_with":
                            return record[field].endsWith(value);
                        case "ne":
                            return record[field] !== value;
                        case "gt":
                            return value != null && Boolean(record[field] > value);
                        case "gte":
                            return value != null && Boolean(record[field] >= value);
                        case "lt":
                            return value != null && Boolean(record[field] < value);
                        case "lte":
                            return value != null && Boolean(record[field] <= value);
                        default:
                            return record[field] === value;
                    }
                };
                return table.filter((record)=>{
                    if (!where.length || where.length === 0) {
                        return true;
                    }
                    let result = evalClause(record, where[0]);
                    for (const clause of where){
                        const clauseResult = evalClause(record, clause);
                        if (clause.connector === "OR") {
                            result = result || clauseResult;
                        } else {
                            result = result && clauseResult;
                        }
                    }
                    return result;
                });
            }
            return {
                create: async ({ model, data })=>{
                    if (options.advanced?.database?.useNumberId) {
                        data.id = db[model].length + 1;
                    }
                    if (!db[model]) {
                        db[model] = [];
                    }
                    db[model].push(data);
                    return data;
                },
                findOne: async ({ model, where })=>{
                    const res = convertWhereClause(where, model);
                    const record = res[0] || null;
                    return record;
                },
                findMany: async ({ model, where, sortBy, limit, offset })=>{
                    let table = db[model];
                    if (where) {
                        table = convertWhereClause(where, model);
                    }
                    if (sortBy) {
                        table = table.sort((a, b)=>{
                            const field = getFieldName({
                                model,
                                field: sortBy.field
                            });
                            const aValue = a[field];
                            const bValue = b[field];
                            let comparison = 0;
                            if (aValue == null && bValue == null) {
                                comparison = 0;
                            } else if (aValue == null) {
                                comparison = -1;
                            } else if (bValue == null) {
                                comparison = 1;
                            } else if (typeof aValue === "string" && typeof bValue === "string") {
                                comparison = aValue.localeCompare(bValue);
                            } else if (aValue instanceof Date && bValue instanceof Date) {
                                comparison = aValue.getTime() - bValue.getTime();
                            } else if (typeof aValue === "number" && typeof bValue === "number") {
                                comparison = aValue - bValue;
                            } else if (typeof aValue === "boolean" && typeof bValue === "boolean") {
                                comparison = aValue === bValue ? 0 : aValue ? 1 : -1;
                            } else {
                                comparison = String(aValue).localeCompare(String(bValue));
                            }
                            return sortBy.direction === "asc" ? comparison : -comparison;
                        });
                    }
                    if (offset !== void 0) {
                        table = table.slice(offset);
                    }
                    if (limit !== void 0) {
                        table = table.slice(0, limit);
                    }
                    return table || [];
                },
                count: async ({ model, where })=>{
                    if (where) {
                        const filteredRecords = convertWhereClause(where, model);
                        return filteredRecords.length;
                    }
                    return db[model].length;
                },
                update: async ({ model, where, update })=>{
                    const res = convertWhereClause(where, model);
                    res.forEach((record)=>{
                        Object.assign(record, update);
                    });
                    return res[0] || null;
                },
                delete: async ({ model, where })=>{
                    const table = db[model];
                    const res = convertWhereClause(where, model);
                    db[model] = table.filter((record)=>!res.includes(record));
                },
                deleteMany: async ({ model, where })=>{
                    const table = db[model];
                    const res = convertWhereClause(where, model);
                    let count = 0;
                    db[model] = table.filter((record)=>{
                        if (res.includes(record)) {
                            count++;
                            return false;
                        }
                        return !res.includes(record);
                    });
                    return count;
                },
                updateMany ({ model, where, update }) {
                    const res = convertWhereClause(where, model);
                    res.forEach((record)=>{
                        Object.assign(record, update);
                    });
                    return res[0] || null;
                }
            };
        }
    });
    return (options)=>{
        lazyOptions = options;
        return adapterCreator(options);
    };
};
;
}),
"[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.BG42OQGC.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "a",
    ()=>getAdapter,
    "b",
    ()=>convertToDB,
    "c",
    ()=>createInternalAdapter,
    "d",
    ()=>convertFromDB,
    "e",
    ()=>getMigrations,
    "f",
    ()=>getSchema,
    "g",
    ()=>getWithHooks,
    "m",
    ()=>matchType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.CW6D9eSx.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Cwj9dt6i$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.Cwj9dt6i.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$ClH5r3NH$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.ClH5r3NH.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BKEtEpt0$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.BKEtEpt0.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BUPPRXfK$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.BUPPRXfK.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-call@1.0.19/node_modules/better-call/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/hash.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/base64.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/hex.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/error/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.B4Qoxdgc.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/db/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/env/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$random$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/random.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$pQjeRkzN$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.pQjeRkzN.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CBTS2OzX$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.CBTS2OzX.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/db/adapter/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BNpIwq4C$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.BNpIwq4C.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/raw-builder/sql.js [app-route] (ecmascript)");
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
;
function getWithHooks(adapter, ctx) {
    const hooks = ctx.hooks;
    async function createWithHooks(data, model, customCreateFn, context, trxAdapter) {
        let actualData = data;
        for (const hook of hooks || []){
            const toRun = hook[model]?.create?.before;
            if (toRun) {
                const result = await toRun(actualData, context);
                if (result === false) {
                    return null;
                }
                const isObject = typeof result === "object" && "data" in result;
                if (isObject) {
                    actualData = {
                        ...actualData,
                        ...result.data
                    };
                }
            }
        }
        const customCreated = customCreateFn ? await customCreateFn.fn(actualData) : null;
        const created = !customCreateFn || customCreateFn.executeMainFn ? await (trxAdapter || adapter).create({
            model,
            data: actualData,
            forceAllowId: true
        }) : customCreated;
        for (const hook of hooks || []){
            const toRun = hook[model]?.create?.after;
            if (toRun) {
                await toRun(created, context);
            }
        }
        return created;
    }
    async function updateWithHooks(data, where, model, customUpdateFn, context, trxAdapter) {
        let actualData = data;
        for (const hook of hooks || []){
            const toRun = hook[model]?.update?.before;
            if (toRun) {
                const result = await toRun(data, context);
                if (result === false) {
                    return null;
                }
                const isObject = typeof result === "object";
                actualData = isObject ? result.data : result;
            }
        }
        const customUpdated = customUpdateFn ? await customUpdateFn.fn(actualData) : null;
        const updated = !customUpdateFn || customUpdateFn.executeMainFn ? await (trxAdapter || adapter).update({
            model,
            update: actualData,
            where
        }) : customUpdated;
        for (const hook of hooks || []){
            const toRun = hook[model]?.update?.after;
            if (toRun) {
                await toRun(updated, context);
            }
        }
        return updated;
    }
    async function updateManyWithHooks(data, where, model, customUpdateFn, context, trxAdapter) {
        let actualData = data;
        for (const hook of hooks || []){
            const toRun = hook[model]?.update?.before;
            if (toRun) {
                const result = await toRun(data, context);
                if (result === false) {
                    return null;
                }
                const isObject = typeof result === "object";
                actualData = isObject ? result.data : result;
            }
        }
        const customUpdated = customUpdateFn ? await customUpdateFn.fn(actualData) : null;
        const updated = !customUpdateFn || customUpdateFn.executeMainFn ? await (trxAdapter || adapter).updateMany({
            model,
            update: actualData,
            where
        }) : customUpdated;
        for (const hook of hooks || []){
            const toRun = hook[model]?.update?.after;
            if (toRun) {
                await toRun(updated, context);
            }
        }
        return updated;
    }
    return {
        createWithHooks,
        updateWithHooks,
        updateManyWithHooks
    };
}
const createInternalAdapter = (adapter, ctx)=>{
    const logger = ctx.logger;
    const options = ctx.options;
    const secondaryStorage = options.secondaryStorage;
    const sessionExpiration = options.session?.expiresIn || 60 * 60 * 24 * 7;
    const { createWithHooks, updateWithHooks, updateManyWithHooks } = getWithHooks(adapter, ctx);
    async function refreshUserSessions(user) {
        if (!secondaryStorage) return;
        const listRaw = await secondaryStorage.get(`active-sessions-${user.id}`);
        if (!listRaw) return;
        const now = Date.now();
        const list = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BKEtEpt0$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["s"])(listRaw) || [];
        const validSessions = list.filter((s)=>s.expiresAt > now);
        await Promise.all(validSessions.map(async ({ token })=>{
            const cached = await secondaryStorage.get(token);
            if (!cached) return;
            const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BKEtEpt0$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["s"])(cached);
            if (!parsed) return;
            const sessionTTL = Math.max(Math.floor(new Date(parsed.session.expiresAt).getTime() - now) / 1e3, 0);
            await secondaryStorage.set(token, JSON.stringify({
                session: parsed.session,
                user
            }), Math.floor(sessionTTL));
        }));
    }
    return {
        createOAuthUser: async (user, account, context)=>{
            return adapter.transaction(async (trxAdapter)=>{
                const createdUser = await createWithHooks({
                    // todo: we should remove auto setting createdAt and updatedAt in the next major release, since the db generators already handle that
                    createdAt: /* @__PURE__ */ new Date(),
                    updatedAt: /* @__PURE__ */ new Date(),
                    ...user
                }, "user", void 0, context, trxAdapter);
                const createdAccount = await createWithHooks({
                    ...account,
                    userId: createdUser.id,
                    // todo: we should remove auto setting createdAt and updatedAt in the next major release, since the db generators already handle that
                    createdAt: /* @__PURE__ */ new Date(),
                    updatedAt: /* @__PURE__ */ new Date()
                }, "account", void 0, context, trxAdapter);
                return {
                    user: createdUser,
                    account: createdAccount
                };
            });
        },
        createUser: async (user, context, trxAdapter)=>{
            const createdUser = await createWithHooks({
                // todo: we should remove auto setting createdAt and updatedAt in the next major release, since the db generators already handle that
                createdAt: /* @__PURE__ */ new Date(),
                updatedAt: /* @__PURE__ */ new Date(),
                ...user,
                email: user.email?.toLowerCase()
            }, "user", void 0, context, trxAdapter);
            return createdUser;
        },
        createAccount: async (account, context, trxAdapter)=>{
            const createdAccount = await createWithHooks({
                // todo: we should remove auto setting createdAt and updatedAt in the next major release, since the db generators already handle that
                createdAt: /* @__PURE__ */ new Date(),
                updatedAt: /* @__PURE__ */ new Date(),
                ...account
            }, "account", void 0, context, trxAdapter);
            return createdAccount;
        },
        listSessions: async (userId, trxAdapter)=>{
            if (secondaryStorage) {
                const currentList = await secondaryStorage.get(`active-sessions-${userId}`);
                if (!currentList) return [];
                const list = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BKEtEpt0$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["s"])(currentList) || [];
                const now = Date.now();
                const validSessions = list.filter((s)=>s.expiresAt > now);
                const sessions2 = [];
                for (const session of validSessions){
                    const sessionStringified = await secondaryStorage.get(session.token);
                    if (sessionStringified) {
                        const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BKEtEpt0$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["s"])(sessionStringified);
                        if (!s) return [];
                        const parsedSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Cwj9dt6i$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["b"])(ctx.options, {
                            ...s.session,
                            expiresAt: new Date(s.session.expiresAt)
                        });
                        sessions2.push(parsedSession);
                    }
                }
                return sessions2;
            }
            const sessions = await (trxAdapter || adapter).findMany({
                model: "session",
                where: [
                    {
                        field: "userId",
                        value: userId
                    }
                ]
            });
            return sessions;
        },
        listUsers: async (limit, offset, sortBy, where, trxAdapter)=>{
            const users = await (trxAdapter || adapter).findMany({
                model: "user",
                limit,
                offset,
                sortBy,
                where
            });
            return users;
        },
        countTotalUsers: async (where, trxAdapter)=>{
            const total = await (trxAdapter || adapter).count({
                model: "user",
                where
            });
            if (typeof total === "string") {
                return parseInt(total);
            }
            return total;
        },
        deleteUser: async (userId, trxAdapter)=>{
            if (secondaryStorage) {
                await secondaryStorage.delete(`active-sessions-${userId}`);
            }
            if (!secondaryStorage || options.session?.storeSessionInDatabase) {
                await (trxAdapter || adapter).deleteMany({
                    model: "session",
                    where: [
                        {
                            field: "userId",
                            value: userId
                        }
                    ]
                });
            }
            await (trxAdapter || adapter).deleteMany({
                model: "account",
                where: [
                    {
                        field: "userId",
                        value: userId
                    }
                ]
            });
            await (trxAdapter || adapter).delete({
                model: "user",
                where: [
                    {
                        field: "id",
                        value: userId
                    }
                ]
            });
        },
        createSession: async (userId, ctx2, dontRememberMe, override, overrideAll, trxAdapter)=>{
            const headers = ctx2.headers || ctx2.request?.headers;
            const { id: _, ...rest } = override || {};
            const data = {
                ipAddress: ctx2.request || ctx2.headers ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$ClH5r3NH$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])(ctx2.request || ctx2.headers, ctx2.context.options) || "" : "",
                userAgent: headers?.get("user-agent") || "",
                ...rest,
                /**
         * If the user doesn't want to be remembered
         * set the session to expire in 1 day.
         * The cookie will be set to expire at the end of the session
         */ expiresAt: dontRememberMe ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])(60 * 60 * 24, "sec") : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])(sessionExpiration, "sec"),
                userId,
                token: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BUPPRXfK$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])(32),
                // todo: we should remove auto setting createdAt and updatedAt in the next major release, since the db generators already handle that
                createdAt: /* @__PURE__ */ new Date(),
                updatedAt: /* @__PURE__ */ new Date(),
                ...overrideAll ? rest : {}
            };
            const res = await createWithHooks(data, "session", secondaryStorage ? {
                fn: async (sessionData)=>{
                    const currentList = await secondaryStorage.get(`active-sessions-${userId}`);
                    let list = [];
                    const now = Date.now();
                    if (currentList) {
                        list = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BKEtEpt0$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["s"])(currentList) || [];
                        list = list.filter((session)=>session.expiresAt > now);
                    }
                    const sorted = list.sort((a, b)=>a.expiresAt - b.expiresAt);
                    let furthestSessionExp = sorted.at(-1)?.expiresAt;
                    sorted.push({
                        token: data.token,
                        expiresAt: data.expiresAt.getTime()
                    });
                    if (!furthestSessionExp || furthestSessionExp < data.expiresAt.getTime()) {
                        furthestSessionExp = data.expiresAt.getTime();
                    }
                    const furthestSessionTTL = Math.max(Math.floor((furthestSessionExp - now) / 1e3), 0);
                    if (furthestSessionTTL > 0) {
                        await secondaryStorage.set(`active-sessions-${userId}`, JSON.stringify(sorted), furthestSessionTTL);
                    }
                    const user = await adapter.findOne({
                        model: "user",
                        where: [
                            {
                                field: "id",
                                value: userId
                            }
                        ]
                    });
                    const sessionTTL = Math.max(Math.floor((data.expiresAt.getTime() - now) / 1e3), 0);
                    if (sessionTTL > 0) {
                        await secondaryStorage.set(data.token, JSON.stringify({
                            session: sessionData,
                            user
                        }), sessionTTL);
                    }
                    return sessionData;
                },
                executeMainFn: options.session?.storeSessionInDatabase
            } : void 0, ctx2, trxAdapter);
            return res;
        },
        findSession: async (token, trxAdapter)=>{
            if (secondaryStorage) {
                const sessionStringified = await secondaryStorage.get(token);
                if (!sessionStringified && !options.session?.storeSessionInDatabase) {
                    return null;
                }
                if (sessionStringified) {
                    const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BKEtEpt0$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["s"])(sessionStringified);
                    if (!s) return null;
                    const parsedSession2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Cwj9dt6i$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["b"])(ctx.options, {
                        ...s.session,
                        expiresAt: new Date(s.session.expiresAt),
                        createdAt: new Date(s.session.createdAt),
                        updatedAt: new Date(s.session.updatedAt)
                    });
                    const parsedUser2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Cwj9dt6i$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["p"])(ctx.options, {
                        ...s.user,
                        createdAt: new Date(s.user.createdAt),
                        updatedAt: new Date(s.user.updatedAt)
                    });
                    return {
                        session: parsedSession2,
                        user: parsedUser2
                    };
                }
            }
            const session = await (trxAdapter || adapter).findOne({
                model: "session",
                where: [
                    {
                        value: token,
                        field: "token"
                    }
                ]
            });
            if (!session) {
                return null;
            }
            const user = await (trxAdapter || adapter).findOne({
                model: "user",
                where: [
                    {
                        value: session.userId,
                        field: "id"
                    }
                ]
            });
            if (!user) {
                return null;
            }
            const parsedSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Cwj9dt6i$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["b"])(ctx.options, session);
            const parsedUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Cwj9dt6i$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["p"])(ctx.options, user);
            return {
                session: parsedSession,
                user: parsedUser
            };
        },
        findSessions: async (sessionTokens, trxAdapter)=>{
            if (secondaryStorage) {
                const sessions2 = [];
                for (const sessionToken of sessionTokens){
                    const sessionStringified = await secondaryStorage.get(sessionToken);
                    if (sessionStringified) {
                        const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BKEtEpt0$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["s"])(sessionStringified);
                        if (!s) return [];
                        const session = {
                            session: {
                                ...s.session,
                                expiresAt: new Date(s.session.expiresAt)
                            },
                            user: {
                                ...s.user,
                                createdAt: new Date(s.user.createdAt),
                                updatedAt: new Date(s.user.updatedAt)
                            }
                        };
                        sessions2.push(session);
                    }
                }
                return sessions2;
            }
            const sessions = await (trxAdapter || adapter).findMany({
                model: "session",
                where: [
                    {
                        field: "token",
                        value: sessionTokens,
                        operator: "in"
                    }
                ]
            });
            const userIds = sessions.map((session)=>{
                return session.userId;
            });
            if (!userIds.length) return [];
            const users = await (trxAdapter || adapter).findMany({
                model: "user",
                where: [
                    {
                        field: "id",
                        value: userIds,
                        operator: "in"
                    }
                ]
            });
            return sessions.map((session)=>{
                const user = users.find((u)=>u.id === session.userId);
                if (!user) return null;
                return {
                    session,
                    user
                };
            });
        },
        updateSession: async (sessionToken, session, context, trxAdapter)=>{
            const updatedSession = await updateWithHooks(session, [
                {
                    field: "token",
                    value: sessionToken
                }
            ], "session", secondaryStorage ? {
                async fn (data) {
                    const currentSession = await secondaryStorage.get(sessionToken);
                    let updatedSession2 = null;
                    if (currentSession) {
                        const parsedSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BKEtEpt0$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["s"])(currentSession);
                        if (!parsedSession) return null;
                        updatedSession2 = {
                            ...parsedSession.session,
                            ...data
                        };
                        return updatedSession2;
                    } else {
                        return null;
                    }
                },
                executeMainFn: options.session?.storeSessionInDatabase
            } : void 0, context, trxAdapter);
            return updatedSession;
        },
        deleteSession: async (token, trxAdapter)=>{
            if (secondaryStorage) {
                const data = await secondaryStorage.get(token);
                if (data) {
                    const { session } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BKEtEpt0$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["s"])(data) ?? {};
                    if (!session) {
                        logger.error("Session not found in secondary storage");
                        return;
                    }
                    const userId = session.userId;
                    const currentList = await secondaryStorage.get(`active-sessions-${userId}`);
                    if (currentList) {
                        let list = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BKEtEpt0$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["s"])(currentList) || [];
                        const now = Date.now();
                        const filtered = list.filter((session2)=>session2.expiresAt > now && session2.token !== token);
                        const sorted = filtered.sort((a, b)=>a.expiresAt - b.expiresAt);
                        const furthestSessionExp = sorted.at(-1)?.expiresAt;
                        if (filtered.length > 0 && furthestSessionExp && furthestSessionExp > Date.now()) {
                            await secondaryStorage.set(`active-sessions-${userId}`, JSON.stringify(filtered), Math.floor((furthestSessionExp - now) / 1e3));
                        } else {
                            await secondaryStorage.delete(`active-sessions-${userId}`);
                        }
                    } else {
                        logger.error("Active sessions list not found in secondary storage");
                    }
                }
                await secondaryStorage.delete(token);
                if (!options.session?.storeSessionInDatabase || ctx.options.session?.preserveSessionInDatabase) {
                    return;
                }
            }
            await (trxAdapter || adapter).delete({
                model: "session",
                where: [
                    {
                        field: "token",
                        value: token
                    }
                ]
            });
        },
        deleteAccounts: async (userId, trxAdapter)=>{
            await (trxAdapter || adapter).deleteMany({
                model: "account",
                where: [
                    {
                        field: "userId",
                        value: userId
                    }
                ]
            });
        },
        deleteAccount: async (accountId, trxAdapter)=>{
            await (trxAdapter || adapter).delete({
                model: "account",
                where: [
                    {
                        field: "id",
                        value: accountId
                    }
                ]
            });
        },
        deleteSessions: async (userIdOrSessionTokens, trxAdapter)=>{
            if (secondaryStorage) {
                if (typeof userIdOrSessionTokens === "string") {
                    const activeSession = await secondaryStorage.get(`active-sessions-${userIdOrSessionTokens}`);
                    const sessions = activeSession ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BKEtEpt0$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["s"])(activeSession) : [];
                    if (!sessions) return;
                    for (const session of sessions){
                        await secondaryStorage.delete(session.token);
                    }
                } else {
                    for (const sessionToken of userIdOrSessionTokens){
                        const session = await secondaryStorage.get(sessionToken);
                        if (session) {
                            await secondaryStorage.delete(sessionToken);
                        }
                    }
                }
                if (!options.session?.storeSessionInDatabase || ctx.options.session?.preserveSessionInDatabase) {
                    return;
                }
            }
            await (trxAdapter || adapter).deleteMany({
                model: "session",
                where: [
                    {
                        field: Array.isArray(userIdOrSessionTokens) ? "token" : "userId",
                        value: userIdOrSessionTokens,
                        operator: Array.isArray(userIdOrSessionTokens) ? "in" : void 0
                    }
                ]
            });
        },
        findOAuthUser: async (email, accountId, providerId, trxAdapter)=>{
            const account = await (trxAdapter || adapter).findMany({
                model: "account",
                where: [
                    {
                        value: accountId,
                        field: "accountId"
                    }
                ]
            }).then((accounts)=>{
                return accounts.find((a)=>a.providerId === providerId);
            });
            if (account) {
                const user = await (trxAdapter || adapter).findOne({
                    model: "user",
                    where: [
                        {
                            value: account.userId,
                            field: "id"
                        }
                    ]
                });
                if (user) {
                    return {
                        user,
                        accounts: [
                            account
                        ]
                    };
                } else {
                    const user2 = await (trxAdapter || adapter).findOne({
                        model: "user",
                        where: [
                            {
                                value: email.toLowerCase(),
                                field: "email"
                            }
                        ]
                    });
                    if (user2) {
                        return {
                            user: user2,
                            accounts: [
                                account
                            ]
                        };
                    }
                    return null;
                }
            } else {
                const user = await (trxAdapter || adapter).findOne({
                    model: "user",
                    where: [
                        {
                            value: email.toLowerCase(),
                            field: "email"
                        }
                    ]
                });
                if (user) {
                    const accounts = await (trxAdapter || adapter).findMany({
                        model: "account",
                        where: [
                            {
                                value: user.id,
                                field: "userId"
                            }
                        ]
                    });
                    return {
                        user,
                        accounts: accounts || []
                    };
                } else {
                    return null;
                }
            }
        },
        findUserByEmail: async (email, options2, trxAdapter)=>{
            const user = await (trxAdapter || adapter).findOne({
                model: "user",
                where: [
                    {
                        value: email.toLowerCase(),
                        field: "email"
                    }
                ]
            });
            if (!user) return null;
            if (options2?.includeAccounts) {
                const accounts = await (trxAdapter || adapter).findMany({
                    model: "account",
                    where: [
                        {
                            value: user.id,
                            field: "userId"
                        }
                    ]
                });
                return {
                    user,
                    accounts
                };
            }
            return {
                user,
                accounts: []
            };
        },
        findUserById: async (userId, trxAdapter)=>{
            const user = await (trxAdapter || adapter).findOne({
                model: "user",
                where: [
                    {
                        field: "id",
                        value: userId
                    }
                ]
            });
            return user;
        },
        linkAccount: async (account, context, trxAdapter)=>{
            const _account = await createWithHooks({
                // todo: we should remove auto setting createdAt and updatedAt in the next major release, since the db generators already handle that
                createdAt: /* @__PURE__ */ new Date(),
                updatedAt: /* @__PURE__ */ new Date(),
                ...account
            }, "account", void 0, context, trxAdapter);
            return _account;
        },
        updateUser: async (userId, data, context, trxAdapter)=>{
            const user = await updateWithHooks(data, [
                {
                    field: "id",
                    value: userId
                }
            ], "user", void 0, context, trxAdapter);
            await refreshUserSessions(user);
            await refreshUserSessions(user);
            return user;
        },
        updateUserByEmail: async (email, data, context, trxAdapter)=>{
            const user = await updateWithHooks(data, [
                {
                    field: "email",
                    value: email.toLowerCase()
                }
            ], "user", void 0, context, trxAdapter);
            await refreshUserSessions(user);
            await refreshUserSessions(user);
            return user;
        },
        updatePassword: async (userId, password, context, trxAdapter)=>{
            await updateManyWithHooks({
                password
            }, [
                {
                    field: "userId",
                    value: userId
                },
                {
                    field: "providerId",
                    value: "credential"
                }
            ], "account", void 0, context, trxAdapter);
        },
        findAccounts: async (userId, trxAdapter)=>{
            const accounts = await (trxAdapter || adapter).findMany({
                model: "account",
                where: [
                    {
                        field: "userId",
                        value: userId
                    }
                ]
            });
            return accounts;
        },
        findAccount: async (accountId, trxAdapter)=>{
            const account = await (trxAdapter || adapter).findOne({
                model: "account",
                where: [
                    {
                        field: "accountId",
                        value: accountId
                    }
                ]
            });
            return account;
        },
        findAccountByProviderId: async (accountId, providerId, trxAdapter)=>{
            const account = await (trxAdapter || adapter).findOne({
                model: "account",
                where: [
                    {
                        field: "accountId",
                        value: accountId
                    },
                    {
                        field: "providerId",
                        value: providerId
                    }
                ]
            });
            return account;
        },
        findAccountByUserId: async (userId, trxAdapter)=>{
            const account = await (trxAdapter || adapter).findMany({
                model: "account",
                where: [
                    {
                        field: "userId",
                        value: userId
                    }
                ]
            });
            return account;
        },
        updateAccount: async (id, data, context, trxAdapter)=>{
            const account = await updateWithHooks(data, [
                {
                    field: "id",
                    value: id
                }
            ], "account", void 0, context, trxAdapter);
            return account;
        },
        createVerificationValue: async (data, context, trxAdapter)=>{
            const verification = await createWithHooks({
                // todo: we should remove auto setting createdAt and updatedAt in the next major release, since the db generators already handle that
                createdAt: /* @__PURE__ */ new Date(),
                updatedAt: /* @__PURE__ */ new Date(),
                ...data
            }, "verification", void 0, context, trxAdapter);
            return verification;
        },
        findVerificationValue: async (identifier, trxAdapter)=>{
            const verification = await (trxAdapter || adapter).findMany({
                model: "verification",
                where: [
                    {
                        field: "identifier",
                        value: identifier
                    }
                ],
                sortBy: {
                    field: "createdAt",
                    direction: "desc"
                },
                limit: 1
            });
            if (!options.verification?.disableCleanup) {
                await (trxAdapter || adapter).deleteMany({
                    model: "verification",
                    where: [
                        {
                            field: "expiresAt",
                            value: /* @__PURE__ */ new Date(),
                            operator: "lt"
                        }
                    ]
                });
            }
            const lastVerification = verification[0];
            return lastVerification;
        },
        deleteVerificationValue: async (id, trxAdapter)=>{
            await (trxAdapter || adapter).delete({
                model: "verification",
                where: [
                    {
                        field: "id",
                        value: id
                    }
                ]
            });
        },
        deleteVerificationByIdentifier: async (identifier, trxAdapter)=>{
            await (trxAdapter || adapter).delete({
                model: "verification",
                where: [
                    {
                        field: "identifier",
                        value: identifier
                    }
                ]
            });
        },
        updateVerificationValue: async (id, data, context, trxAdapter)=>{
            const verification = await updateWithHooks(data, [
                {
                    field: "id",
                    value: id
                }
            ], "verification", void 0, context, trxAdapter);
            return verification;
        }
    };
};
async function getAdapter(options) {
    if (!options.database) {
        const tables = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$pQjeRkzN$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])(options);
        const memoryDB = Object.keys(tables).reduce((acc, key)=>{
            acc[key] = [];
            return acc;
        }, {});
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].warn("No database configuration provided. Using memory adapter in development");
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BNpIwq4C$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["m"])(memoryDB)(options);
    }
    if (typeof options.database === "function") {
        return options.database(options);
    }
    const { kysely, databaseType, transaction } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CBTS2OzX$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["c"])(options);
    if (!kysely) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BetterAuthError"]("Failed to initialize database adapter");
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CBTS2OzX$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["k"])(kysely, {
        type: databaseType || "sqlite",
        debugLogs: "debugLogs" in options.database ? options.database.debugLogs : false,
        transaction
    })(options);
}
function convertToDB(fields, values) {
    let result = values.id ? {
        id: values.id
    } : {};
    for(const key in fields){
        const field = fields[key];
        const value = values[key];
        if (value === void 0) {
            continue;
        }
        result[field.fieldName || key] = value;
    }
    return result;
}
function convertFromDB(fields, values) {
    if (!values) {
        return null;
    }
    let result = {
        id: values.id
    };
    for (const [key, value] of Object.entries(fields)){
        result[key] = values[value.fieldName || key];
    }
    return result;
}
function getSchema(config) {
    const tables = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$pQjeRkzN$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])(config);
    let schema = {};
    for(const key in tables){
        const table = tables[key];
        const fields = table.fields;
        let actualFields = {};
        Object.entries(fields).forEach(([key2, field])=>{
            actualFields[field.fieldName || key2] = field;
            if (field.references) {
                const refTable = tables[field.references.model];
                if (refTable) {
                    actualFields[field.fieldName || key2].references = {
                        ...field.references,
                        model: refTable.modelName,
                        field: field.references.field
                    };
                }
            }
        });
        if (schema[table.modelName]) {
            schema[table.modelName].fields = {
                ...schema[table.modelName].fields,
                ...actualFields
            };
            continue;
        }
        schema[table.modelName] = {
            fields: actualFields,
            order: table.order || Infinity
        };
    }
    return schema;
}
const postgresMap = {
    string: [
        "character varying",
        "varchar",
        "text"
    ],
    number: [
        "int4",
        "integer",
        "bigint",
        "smallint",
        "numeric",
        "real",
        "double precision"
    ],
    boolean: [
        "bool",
        "boolean"
    ],
    date: [
        "timestamptz",
        "timestamp",
        "date"
    ],
    json: [
        "json",
        "jsonb"
    ]
};
const mysqlMap = {
    string: [
        "varchar",
        "text"
    ],
    number: [
        "integer",
        "int",
        "bigint",
        "smallint",
        "decimal",
        "float",
        "double"
    ],
    boolean: [
        "boolean",
        "tinyint"
    ],
    date: [
        "timestamp",
        "datetime",
        "date"
    ],
    json: [
        "json"
    ]
};
const sqliteMap = {
    string: [
        "TEXT"
    ],
    number: [
        "INTEGER",
        "REAL"
    ],
    boolean: [
        "INTEGER",
        "BOOLEAN"
    ],
    // 0 or 1
    date: [
        "DATE",
        "INTEGER"
    ],
    json: [
        "TEXT"
    ]
};
const mssqlMap = {
    string: [
        "varchar",
        "nvarchar"
    ],
    number: [
        "int",
        "bigint",
        "smallint",
        "decimal",
        "float",
        "double"
    ],
    boolean: [
        "bit",
        "smallint"
    ],
    date: [
        "datetime2",
        "date",
        "datetime"
    ],
    json: [
        "varchar",
        "nvarchar"
    ]
};
const map = {
    postgres: postgresMap,
    mysql: mysqlMap,
    sqlite: sqliteMap,
    mssql: mssqlMap
};
function matchType(columnDataType, fieldType, dbType) {
    function normalize(type) {
        return type.toLowerCase().split("(")[0].trim();
    }
    if (fieldType === "string[]" || fieldType === "number[]") {
        return columnDataType.toLowerCase().includes("json");
    }
    const types = map[dbType];
    const expected = Array.isArray(fieldType) ? types["string"].map((t)=>t.toLowerCase()) : types[fieldType].map((t)=>t.toLowerCase());
    return expected.includes(normalize(columnDataType));
}
async function getPostgresSchema(db) {
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`SHOW search_path`.execute(db);
        if (result.rows[0]?.search_path) {
            const schemas = result.rows[0].search_path.split(",").map((s)=>s.trim()).map((s)=>s.replace(/^["']|["']$/g, "")).filter((s)=>!s.startsWith("$"));
            return schemas[0] || "public";
        }
    } catch (error) {}
    return "public";
}
async function getMigrations(config) {
    const betterAuthSchema = getSchema(config);
    const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])(config.logger);
    let { kysely: db, databaseType: dbType } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CBTS2OzX$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["c"])(config);
    if (!dbType) {
        logger.warn("Could not determine database type, defaulting to sqlite. Please provide a type in the database options to avoid this.");
        dbType = "sqlite";
    }
    if (!db) {
        logger.error("Only kysely adapter is supported for migrations. You can use `generate` command to generate the schema, if you're using a different adapter.");
        process.exit(1);
    }
    let currentSchema = "public";
    if (dbType === "postgres") {
        currentSchema = await getPostgresSchema(db);
        logger.debug(`PostgreSQL migration: Using schema '${currentSchema}' (from search_path)`);
        try {
            const schemaCheck = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`
				SELECT schema_name 
				FROM information_schema.schemata 
				WHERE schema_name = ${currentSchema}
			`.execute(db);
            if (!schemaCheck.rows[0]) {
                logger.warn(`Schema '${currentSchema}' does not exist. Tables will be inspected from available schemas. Consider creating the schema first or checking your database configuration.`);
            }
        } catch (error) {
            logger.debug(`Could not verify schema existence: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    const allTableMetadata = await db.introspection.getTables();
    let tableMetadata = allTableMetadata;
    if (dbType === "postgres") {
        try {
            const tablesInSchema = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`
				SELECT table_name 
				FROM information_schema.tables 
				WHERE table_schema = ${currentSchema}
				AND table_type = 'BASE TABLE'
			`.execute(db);
            const tableNamesInSchema = new Set(tablesInSchema.rows.map((row)=>row.table_name));
            tableMetadata = allTableMetadata.filter((table)=>table.schema === currentSchema && tableNamesInSchema.has(table.name));
            logger.debug(`Found ${tableMetadata.length} table(s) in schema '${currentSchema}': ${tableMetadata.map((t)=>t.name).join(", ") || "(none)"}`);
        } catch (error) {
            logger.warn(`Could not filter tables by schema. Using all discovered tables. Error: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    const toBeCreated = [];
    const toBeAdded = [];
    for (const [key, value] of Object.entries(betterAuthSchema)){
        const table = tableMetadata.find((t)=>t.name === key);
        if (!table) {
            const tIndex = toBeCreated.findIndex((t)=>t.table === key);
            const tableData = {
                table: key,
                fields: value.fields,
                order: value.order || Infinity
            };
            const insertIndex = toBeCreated.findIndex((t)=>(t.order || Infinity) > tableData.order);
            if (insertIndex === -1) {
                if (tIndex === -1) {
                    toBeCreated.push(tableData);
                } else {
                    toBeCreated[tIndex].fields = {
                        ...toBeCreated[tIndex].fields,
                        ...value.fields
                    };
                }
            } else {
                toBeCreated.splice(insertIndex, 0, tableData);
            }
            continue;
        }
        let toBeAddedFields = {};
        for (const [fieldName, field] of Object.entries(value.fields)){
            const column = table.columns.find((c)=>c.name === fieldName);
            if (!column) {
                toBeAddedFields[fieldName] = field;
                continue;
            }
            if (matchType(column.dataType, field.type, dbType)) {
                continue;
            } else {
                logger.warn(`Field ${fieldName} in table ${key} has a different type in the database. Expected ${field.type} but got ${column.dataType}.`);
            }
        }
        if (Object.keys(toBeAddedFields).length > 0) {
            toBeAdded.push({
                table: key,
                fields: toBeAddedFields,
                order: value.order || Infinity
            });
        }
    }
    const migrations = [];
    function getType(field, fieldName) {
        const type = field.type;
        const typeMap = {
            string: {
                sqlite: "text",
                postgres: "text",
                mysql: field.unique ? "varchar(255)" : field.references ? "varchar(36)" : "text",
                mssql: field.unique || field.sortable ? "varchar(255)" : field.references ? "varchar(36)" : // mssql deprecated `text`, and the alternative is `varchar(max)`.
                // Kysely type interface doesn't support `text`, so we set this to `varchar(8000)` as
                // that's the max length for `varchar`
                "varchar(8000)"
            },
            boolean: {
                sqlite: "integer",
                postgres: "boolean",
                mysql: "boolean",
                mssql: "smallint"
            },
            number: {
                sqlite: field.bigint ? "bigint" : "integer",
                postgres: field.bigint ? "bigint" : "integer",
                mysql: field.bigint ? "bigint" : "integer",
                mssql: field.bigint ? "bigint" : "integer"
            },
            date: {
                sqlite: "date",
                postgres: "timestamptz",
                mysql: "timestamp(3)",
                mssql: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`datetime2(3)`
            },
            json: {
                sqlite: "text",
                postgres: "jsonb",
                mysql: "json",
                mssql: "varchar(8000)"
            },
            id: {
                postgres: config.advanced?.database?.useNumberId ? "serial" : "text",
                mysql: config.advanced?.database?.useNumberId ? "integer" : "varchar(36)",
                mssql: config.advanced?.database?.useNumberId ? "integer" : "varchar(36)",
                sqlite: config.advanced?.database?.useNumberId ? "integer" : "text"
            },
            foreignKeyId: {
                postgres: config.advanced?.database?.useNumberId ? "integer" : "text",
                mysql: config.advanced?.database?.useNumberId ? "integer" : "varchar(36)",
                mssql: config.advanced?.database?.useNumberId ? "integer" : "varchar(36)",
                sqlite: config.advanced?.database?.useNumberId ? "integer" : "text"
            }
        };
        if (fieldName === "id" || field.references?.field === "id") {
            if (fieldName === "id") {
                return typeMap.id[dbType];
            }
            return typeMap.foreignKeyId[dbType];
        }
        if (dbType === "sqlite" && (type === "string[]" || type === "number[]")) {
            return "text";
        }
        if (type === "string[]" || type === "number[]") {
            return "jsonb";
        }
        if (Array.isArray(type)) {
            return "text";
        }
        return typeMap[type][dbType || "sqlite"];
    }
    if (toBeAdded.length) {
        for (const table of toBeAdded){
            for (const [fieldName, field] of Object.entries(table.fields)){
                const type = getType(field, fieldName);
                const exec = db.schema.alterTable(table.table).addColumn(fieldName, type, (col)=>{
                    col = field.required !== false ? col.notNull() : col;
                    if (field.references) {
                        col = col.references(`${field.references.model}.${field.references.field}`).onDelete(field.references.onDelete || "cascade");
                    }
                    if (field.unique) {
                        col = col.unique();
                    }
                    if (field.type === "date" && typeof field.defaultValue === "function" && (dbType === "postgres" || dbType === "mysql" || dbType === "mssql")) {
                        if (dbType === "mysql") {
                            col = col.defaultTo(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`CURRENT_TIMESTAMP(3)`);
                        } else {
                            col = col.defaultTo(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`CURRENT_TIMESTAMP`);
                        }
                    }
                    return col;
                });
                migrations.push(exec);
            }
        }
    }
    if (toBeCreated.length) {
        for (const table of toBeCreated){
            let dbT = db.schema.createTable(table.table).addColumn("id", config.advanced?.database?.useNumberId ? dbType === "postgres" ? "serial" : "integer" : dbType === "mysql" || dbType === "mssql" ? "varchar(36)" : "text", (col)=>{
                if (config.advanced?.database?.useNumberId) {
                    if (dbType === "postgres" || dbType === "sqlite") {
                        return col.primaryKey().notNull();
                    } else if (dbType === "mssql") {
                        return col.identity().primaryKey().notNull();
                    }
                    return col.autoIncrement().primaryKey().notNull();
                }
                return col.primaryKey().notNull();
            });
            for (const [fieldName, field] of Object.entries(table.fields)){
                const type = getType(field, fieldName);
                dbT = dbT.addColumn(fieldName, type, (col)=>{
                    col = field.required !== false ? col.notNull() : col;
                    if (field.references) {
                        col = col.references(`${field.references.model}.${field.references.field}`).onDelete(field.references.onDelete || "cascade");
                    }
                    if (field.unique) {
                        col = col.unique();
                    }
                    if (field.type === "date" && typeof field.defaultValue === "function" && (dbType === "postgres" || dbType === "mysql" || dbType === "mssql")) {
                        if (dbType === "mysql") {
                            col = col.defaultTo(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`CURRENT_TIMESTAMP(3)`);
                        } else {
                            col = col.defaultTo(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`CURRENT_TIMESTAMP`);
                        }
                    }
                    return col;
                });
            }
            migrations.push(dbT);
        }
    }
    async function runMigrations() {
        for (const migration of migrations){
            await migration.execute();
        }
    }
    async function compileMigrations() {
        const compiled = migrations.map((m)=>m.compile().sql);
        return compiled.join(";\n\n") + ";";
    }
    return {
        toBeCreated,
        toBeAdded,
        runMigrations,
        compileMigrations
    };
}
;
}),
"[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.YwDQhoPc.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "c",
    ()=>checkPassword,
    "v",
    ()=>validatePassword
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-call@1.0.19/node_modules/better-call/dist/index.js [app-route] (ecmascript)");
;
async function validatePassword(ctx, data) {
    const accounts = await ctx.context.internalAdapter.findAccounts(data.userId);
    const credentialAccount = accounts?.find((account)=>account.providerId === "credential");
    const currentPassword = credentialAccount?.password;
    if (!credentialAccount || !currentPassword) {
        return false;
    }
    const compare = await ctx.context.password.verify({
        hash: currentPassword,
        password: data.password
    });
    return compare;
}
async function checkPassword(userId, c) {
    const accounts = await c.context.internalAdapter.findAccounts(userId);
    const credentialAccount = accounts?.find((account)=>account.providerId === "credential");
    const currentPassword = credentialAccount?.password;
    if (!credentialAccount || !currentPassword || !c.body.password) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: "No password credential found"
        });
    }
    const compare = await c.context.password.verify({
        hash: currentPassword,
        password: c.body.password
    });
    if (!compare) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: "Invalid password"
        });
    }
    return true;
}
;
}),
"[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.CDx1PoNO.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "b",
    ()=>betterAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$api$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/api/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$defu$40$6$2e$1$2e$4$2f$node_modules$2f$defu$2f$dist$2f$defu$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/defu@6.1.4/node_modules/defu/dist/defu.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/crypto/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/db/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BG42OQGC$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.BG42OQGC.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$pQjeRkzN$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.pQjeRkzN.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-call@1.0.19/node_modules/better-call/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D9_vQR83$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.D9_vQR83.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/env/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/social-providers/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BUPPRXfK$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.BUPPRXfK.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/hash.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/base64.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.B4Qoxdgc.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$YwDQhoPc$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.YwDQhoPc.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DR3R5wdU$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.DR3R5wdU.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/error/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$telemetry$40$1$2e$3$2e$34_better$2d$call$40$1$2e$0$2e$19_jose$40$6$2e$1$2e$1_kysely$40$0$2e$28$2e$8_nanostores$40$1$2e$0$2e$1$2f$node_modules$2f40$better$2d$auth$2f$telemetry$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+telemetry@1.3.34_better-call@1.0.19_jose@6.1.1_kysely@0.28.8_nanostores@1.0.1/node_modules/@better-auth/telemetry/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/db/adapter/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CBTS2OzX$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.CBTS2OzX.mjs [app-route] (ecmascript)");
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
const DEFAULT_SECRET = "better-auth-secret-123456789";
function isPromise(obj) {
    return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
}
const init = async (options)=>{
    const adapter = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BG42OQGC$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["a"])(options);
    const plugins = options.plugins || [];
    const internalPlugins = getInternalPlugins(options);
    const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])(options.logger);
    const baseURL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DR3R5wdU$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["a"])(options.baseURL, options.basePath);
    const secret = options.secret || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].BETTER_AUTH_SECRET || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].AUTH_SECRET || DEFAULT_SECRET;
    if (secret === DEFAULT_SECRET) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isProduction"]) {
            logger.error("You are using the default secret. Please set `BETTER_AUTH_SECRET` in your environment variables or pass `secret` in your auth config.");
        }
    }
    options = {
        ...options,
        secret,
        baseURL: baseURL ? new URL(baseURL).origin : "",
        basePath: options.basePath || "/api/auth",
        plugins: plugins.concat(internalPlugins)
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$api$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["checkEndpointConflicts"])(options, logger);
    const cookies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D9_vQR83$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])(options);
    const tables = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$pQjeRkzN$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])(options);
    const providers = Object.entries(options.socialProviders || {}).map(([key, config])=>{
        if (config == null) {
            return null;
        }
        if (config.enabled === false) {
            return null;
        }
        if (!config.clientId) {
            logger.warn(`Social provider ${key} is missing clientId or clientSecret`);
        }
        const provider = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["socialProviders"][key](config);
        provider.disableImplicitSignUp = config.disableImplicitSignUp;
        return provider;
    }).filter((x)=>x !== null);
    const generateIdFunc = ({ model, size })=>{
        if (typeof options.advanced?.generateId === "function") {
            return options.advanced.generateId({
                model,
                size
            });
        }
        if (typeof options?.advanced?.database?.generateId === "function") {
            return options.advanced.database.generateId({
                model,
                size
            });
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BUPPRXfK$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])(size);
    };
    const { publish } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$telemetry$40$1$2e$3$2e$34_better$2d$call$40$1$2e$0$2e$19_jose$40$6$2e$1$2e$1_kysely$40$0$2e$28$2e$8_nanostores$40$1$2e$0$2e$1$2f$node_modules$2f40$better$2d$auth$2f$telemetry$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createTelemetry"])(options, {
        adapter: adapter.id,
        database: typeof options.database === "function" ? "adapter" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CBTS2OzX$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])(options.database) || "unknown"
    });
    let ctx = {
        appName: options.appName || "Better Auth",
        socialProviders: providers,
        options,
        tables,
        trustedOrigins: getTrustedOrigins(options),
        baseURL: baseURL || "",
        sessionConfig: {
            updateAge: options.session?.updateAge !== void 0 ? options.session.updateAge : 24 * 60 * 60,
            // 24 hours
            expiresIn: options.session?.expiresIn || 60 * 60 * 24 * 7,
            // 7 days
            freshAge: options.session?.freshAge === void 0 ? 60 * 60 * 24 : options.session.freshAge
        },
        secret,
        rateLimit: {
            ...options.rateLimit,
            enabled: options.rateLimit?.enabled ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isProduction"],
            window: options.rateLimit?.window || 10,
            max: options.rateLimit?.max || 100,
            storage: options.rateLimit?.storage || (options.secondaryStorage ? "secondary-storage" : "memory")
        },
        authCookies: cookies,
        logger,
        generateId: generateIdFunc,
        session: null,
        secondaryStorage: options.secondaryStorage,
        password: {
            hash: options.emailAndPassword?.password?.hash || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hashPassword"],
            verify: options.emailAndPassword?.password?.verify || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["verifyPassword"],
            config: {
                minPasswordLength: options.emailAndPassword?.minPasswordLength || 8,
                maxPasswordLength: options.emailAndPassword?.maxPasswordLength || 128
            },
            checkPassword: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$YwDQhoPc$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["c"]
        },
        setNewSession (session) {
            this.newSession = session;
        },
        newSession: null,
        adapter,
        internalAdapter: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BG42OQGC$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["c"])(adapter, {
            options,
            logger,
            hooks: options.databaseHooks ? [
                options.databaseHooks
            ] : []
        }),
        createAuthCookie: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D9_vQR83$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["c"])(options),
        async runMigrations () {
            if (!options.database || "updateMany" in options.database) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BetterAuthError"]("Database is not provided or it's an adapter. Migrations are only supported with a database instance.");
            }
            const { runMigrations } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BG42OQGC$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["e"])(options);
            await runMigrations();
        },
        publishTelemetry: publish,
        skipCSRFCheck: !!options.advanced?.disableCSRFCheck,
        skipOriginCheck: options.advanced?.disableOriginCheck !== void 0 ? options.advanced.disableOriginCheck : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTest"])() ? true : false
    };
    const initOrPromise = runPluginInit(ctx);
    let context;
    if (isPromise(initOrPromise)) {
        ({ context } = await initOrPromise);
    } else {
        ({ context } = initOrPromise);
    }
    return context;
};
async function runPluginInit(ctx) {
    let options = ctx.options;
    const plugins = options.plugins || [];
    let context = ctx;
    const dbHooks = [];
    for (const plugin of plugins){
        if (plugin.init) {
            let initPromise = plugin.init(context);
            let result;
            if (isPromise(initPromise)) {
                result = await initPromise;
            } else {
                result = initPromise;
            }
            if (typeof result === "object") {
                if (result.options) {
                    const { databaseHooks, ...restOpts } = result.options;
                    if (databaseHooks) {
                        dbHooks.push(databaseHooks);
                    }
                    options = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$defu$40$6$2e$1$2e$4$2f$node_modules$2f$defu$2f$dist$2f$defu$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defu"])(options, restOpts);
                }
                if (result.context) {
                    context = {
                        ...context,
                        ...result.context
                    };
                }
            }
        }
    }
    dbHooks.push(options.databaseHooks);
    context.internalAdapter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BG42OQGC$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["c"])(ctx.adapter, {
        options,
        logger: ctx.logger,
        hooks: dbHooks.filter((u)=>u !== void 0),
        generateId: ctx.generateId
    });
    context.options = options;
    return {
        context
    };
}
function getInternalPlugins(options) {
    const plugins = [];
    if (options.advanced?.crossSubDomainCookies?.enabled) ;
    return plugins;
}
function getTrustedOrigins(options) {
    const baseURL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DR3R5wdU$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["a"])(options.baseURL, options.basePath);
    if (!baseURL) {
        return [];
    }
    const trustedOrigins = [
        new URL(baseURL).origin
    ];
    if (options.trustedOrigins && Array.isArray(options.trustedOrigins)) {
        trustedOrigins.push(...options.trustedOrigins);
    }
    const envTrustedOrigins = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].BETTER_AUTH_TRUSTED_ORIGINS;
    if (envTrustedOrigins) {
        trustedOrigins.push(...envTrustedOrigins.split(","));
    }
    if (trustedOrigins.filter((x)=>!x).length) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BetterAuthError"]("A provided trusted origin is invalid, make sure your trusted origins list is properly defined.");
    }
    return trustedOrigins;
}
const betterAuth = (options)=>{
    const authContext = init(options);
    const { api } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$api$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getEndpoints"])(authContext, options);
    const errorCodes = options.plugins?.reduce((acc, plugin)=>{
        if (plugin.$ERROR_CODES) {
            return {
                ...acc,
                ...plugin.$ERROR_CODES
            };
        }
        return acc;
    }, {});
    return {
        handler: async (request)=>{
            const ctx = await authContext;
            const basePath = ctx.options.basePath || "/api/auth";
            if (!ctx.options.baseURL) {
                const baseURL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DR3R5wdU$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["a"])(void 0, basePath, request);
                if (baseURL) {
                    ctx.baseURL = baseURL;
                    ctx.options.baseURL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DR3R5wdU$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["g"])(ctx.baseURL) || void 0;
                } else {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BetterAuthError"]("Could not get base URL from request. Please provide a valid base URL.");
                }
            }
            ctx.trustedOrigins = [
                ...options.trustedOrigins ? Array.isArray(options.trustedOrigins) ? options.trustedOrigins : await options.trustedOrigins(request) : [],
                ctx.options.baseURL
            ];
            const { handler } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$api$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["router"])(ctx, options);
            return handler(request);
        },
        api,
        options,
        $context: authContext,
        $Infer: {},
        $ERROR_CODES: {
            ...errorCodes,
            ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BASE_ERROR_CODES"]
        }
    };
};
;
}),
"[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.D-2CmEwz.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "c",
    ()=>capitalizeFirstLetter
]);
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
;
}),
"[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/index.mjs [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/env/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/oauth2/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/error/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$utils$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/utils/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CDx1PoNO$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.CDx1PoNO.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D$2d$2CmEwz$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.D-2CmEwz.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BX9UB8EP$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.BX9UB8EP.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BUPPRXfK$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.BUPPRXfK.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$telemetry$40$1$2e$3$2e$34_better$2d$call$40$1$2e$0$2e$19_jose$40$6$2e$1$2e$1_kysely$40$0$2e$28$2e$8_nanostores$40$1$2e$0$2e$1$2f$node_modules$2f40$better$2d$auth$2f$telemetry$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+telemetry@1.3.34_better-call@1.0.19_jose@6.1.1_kysely@0.28.8_nanostores@1.0.1/node_modules/@better-auth/telemetry/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-call@1.0.19/node_modules/better-call/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DEBtROF9$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.DEBtROF9.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/middleware/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/base64.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hmac$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/hmac.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$binary$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/binary.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/db/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/db/adapter/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$api$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/api/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D9_vQR83$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.D9_vQR83.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.CW6D9eSx.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BKEtEpt0$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.BKEtEpt0.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DR3R5wdU$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.DR3R5wdU.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Ih8C76Vo$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.Ih8C76Vo.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Cwj9dt6i$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.Cwj9dt6i.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$random$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/random.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/hash.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/hex.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.B4Qoxdgc.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$ClH5r3NH$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.ClH5r3NH.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$defu$40$6$2e$1$2e$4$2f$node_modules$2f$defu$2f$dist$2f$defu$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/defu@6.1.4/node_modules/defu/dist/defu.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/crypto/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BG42OQGC$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.BG42OQGC.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$pQjeRkzN$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.pQjeRkzN.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CBTS2OzX$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.CBTS2OzX.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$EBxKeVNZ$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.EBxKeVNZ.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BNpIwq4C$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.BNpIwq4C.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/social-providers/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$YwDQhoPc$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.YwDQhoPc.mjs [app-route] (ecmascript)");
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
}),
"[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.CDx1PoNO.mjs [app-route] (ecmascript) <export b as betterAuth>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "betterAuth",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CDx1PoNO$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["b"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CDx1PoNO$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.CDx1PoNO.mjs [app-route] (ecmascript)");
}),
"[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/adapters/index.mjs [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAdapter",
    ()=>createAdapter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$EBxKeVNZ$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.EBxKeVNZ.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/db/adapter/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BKEtEpt0$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.BKEtEpt0.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/env/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$pQjeRkzN$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.pQjeRkzN.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BUPPRXfK$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.BUPPRXfK.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$random$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/random.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-call@1.0.19/node_modules/better-call/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/hash.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/base64.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/hex.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/error/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.B4Qoxdgc.mjs [app-route] (ecmascript)");
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
const createAdapter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$EBxKeVNZ$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["c"];
;
}),
"[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/adapters/prisma-adapter/index.mjs [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prismaAdapter",
    ()=>prismaAdapter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$adapters$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/adapters/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/error/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$EBxKeVNZ$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.EBxKeVNZ.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/db/adapter/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BKEtEpt0$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.BKEtEpt0.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/env/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$pQjeRkzN$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.pQjeRkzN.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$BUPPRXfK$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.BUPPRXfK.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$random$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/random.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-call@1.0.19/node_modules/better-call/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/hash.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/base64.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/hex.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.B4Qoxdgc.mjs [app-route] (ecmascript)");
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
const prismaAdapter = (prisma, config)=>{
    let lazyOptions = null;
    const createCustomAdapter = (prisma2)=>({ getFieldName })=>{
            const db = prisma2;
            const convertSelect = (select, model)=>{
                if (!select || !model) return void 0;
                return select.reduce((prev, cur)=>{
                    return {
                        ...prev,
                        [getFieldName({
                            model,
                            field: cur
                        })]: true
                    };
                }, {});
            };
            function operatorToPrismaOperator(operator) {
                switch(operator){
                    case "starts_with":
                        return "startsWith";
                    case "ends_with":
                        return "endsWith";
                    case "ne":
                        return "not";
                    case "not_in":
                        return "notIn";
                    default:
                        return operator;
                }
            }
            const convertWhereClause = (model, where)=>{
                if (!where || !where.length) return {};
                if (where.length === 1) {
                    const w = where[0];
                    if (!w) {
                        return;
                    }
                    return {
                        [getFieldName({
                            model,
                            field: w.field
                        })]: w.operator === "eq" || !w.operator ? w.value : {
                            [operatorToPrismaOperator(w.operator)]: w.value
                        }
                    };
                }
                const and = where.filter((w)=>w.connector === "AND" || !w.connector);
                const or = where.filter((w)=>w.connector === "OR");
                const andClause = and.map((w)=>{
                    return {
                        [getFieldName({
                            model,
                            field: w.field
                        })]: w.operator === "eq" || !w.operator ? w.value : {
                            [operatorToPrismaOperator(w.operator)]: w.value
                        }
                    };
                });
                const orClause = or.map((w)=>{
                    return {
                        [getFieldName({
                            model,
                            field: w.field
                        })]: w.operator === "eq" || !w.operator ? w.value : {
                            [operatorToPrismaOperator(w.operator)]: w.value
                        }
                    };
                });
                return {
                    ...andClause.length ? {
                        AND: andClause
                    } : {},
                    ...orClause.length ? {
                        OR: orClause
                    } : {}
                };
            };
            return {
                async create ({ model, data: values, select }) {
                    if (!db[model]) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BetterAuthError"](`Model ${model} does not exist in the database. If you haven't generated the Prisma client, you need to run 'npx prisma generate'`);
                    }
                    return await db[model].create({
                        data: values,
                        select: convertSelect(select, model)
                    });
                },
                async findOne ({ model, where, select }) {
                    const whereClause = convertWhereClause(model, where);
                    if (!db[model]) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BetterAuthError"](`Model ${model} does not exist in the database. If you haven't generated the Prisma client, you need to run 'npx prisma generate'`);
                    }
                    return await db[model].findFirst({
                        where: whereClause,
                        select: convertSelect(select, model)
                    });
                },
                async findMany ({ model, where, limit, offset, sortBy }) {
                    const whereClause = convertWhereClause(model, where);
                    if (!db[model]) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BetterAuthError"](`Model ${model} does not exist in the database. If you haven't generated the Prisma client, you need to run 'npx prisma generate'`);
                    }
                    return await db[model].findMany({
                        where: whereClause,
                        take: limit || 100,
                        skip: offset || 0,
                        ...sortBy?.field ? {
                            orderBy: {
                                [getFieldName({
                                    model,
                                    field: sortBy.field
                                })]: sortBy.direction === "desc" ? "desc" : "asc"
                            }
                        } : {}
                    });
                },
                async count ({ model, where }) {
                    const whereClause = convertWhereClause(model, where);
                    if (!db[model]) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BetterAuthError"](`Model ${model} does not exist in the database. If you haven't generated the Prisma client, you need to run 'npx prisma generate'`);
                    }
                    return await db[model].count({
                        where: whereClause
                    });
                },
                async update ({ model, where, update }) {
                    if (!db[model]) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BetterAuthError"](`Model ${model} does not exist in the database. If you haven't generated the Prisma client, you need to run 'npx prisma generate'`);
                    }
                    const whereClause = convertWhereClause(model, where);
                    return await db[model].update({
                        where: whereClause,
                        data: update
                    });
                },
                async updateMany ({ model, where, update }) {
                    const whereClause = convertWhereClause(model, where);
                    const result = await db[model].updateMany({
                        where: whereClause,
                        data: update
                    });
                    return result ? result.count : 0;
                },
                async delete ({ model, where }) {
                    const whereClause = convertWhereClause(model, where);
                    try {
                        await db[model].delete({
                            where: whereClause
                        });
                    } catch (e) {}
                },
                async deleteMany ({ model, where }) {
                    const whereClause = convertWhereClause(model, where);
                    const result = await db[model].deleteMany({
                        where: whereClause
                    });
                    return result ? result.count : 0;
                },
                options: config
            };
        };
    let adapterOptions = null;
    adapterOptions = {
        config: {
            adapterId: "prisma",
            adapterName: "Prisma Adapter",
            usePlural: config.usePlural ?? false,
            debugLogs: config.debugLogs ?? false,
            transaction: config.transaction ?? false ? (cb)=>prisma.$transaction((tx)=>{
                    const adapter2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$EBxKeVNZ$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["c"])({
                        config: adapterOptions.config,
                        adapter: createCustomAdapter(tx)
                    })(lazyOptions);
                    return cb(adapter2);
                }) : false
        },
        adapter: createCustomAdapter(prisma)
    };
    const adapter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$EBxKeVNZ$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["c"])(adapterOptions);
    return (options)=>{
        lazyOptions = options;
        return adapter(options);
    };
};
;
}),
"[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/integrations/next-js.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "nextCookies",
    ()=>nextCookies,
    "toNextJsHandler",
    ()=>toNextJsHandler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/error/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/env/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/base64.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hmac$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/hmac.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$binary$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/binary.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Ih8C76Vo$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-auth@1.3.34_next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react_5afb6ef69e06c74a63b12c65790f55ce/node_modules/better-auth/dist/shared/better-auth.Ih8C76Vo.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/middleware/index.mjs [app-route] (ecmascript)");
;
;
;
;
;
;
;
function toNextJsHandler(auth) {
    const handler = async (request)=>{
        return "handler" in auth ? auth.handler(request) : auth(request);
    };
    return {
        GET: handler,
        POST: handler
    };
}
const nextCookies = ()=>{
    return {
        id: "next-cookies",
        hooks: {
            after: [
                {
                    matcher (ctx) {
                        return true;
                    },
                    handler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$middleware$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthMiddleware"])(async (ctx)=>{
                        const returned = ctx.context.responseHeaders;
                        if ("_flag" in ctx && ctx._flag === "router") {
                            return;
                        }
                        if (returned instanceof Headers) {
                            const setCookies = returned?.get("set-cookie");
                            if (!setCookies) return;
                            const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$auth$40$1$2e$3$2e$34_next$40$16$2e$0$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react_5afb6ef69e06c74a63b12c65790f55ce$2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Ih8C76Vo$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["p"])(setCookies);
                            const { cookies } = await __turbopack_context__.A("[project]/node_modules/.pnpm/next@16.0.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/headers.js [app-route] (ecmascript, async loader)");
                            let cookieHelper;
                            try {
                                cookieHelper = await cookies();
                            } catch (error) {
                                if (error instanceof Error && error.message.startsWith("`cookies` was called outside a request scope.")) {
                                    return;
                                }
                                throw error;
                            }
                            parsed.forEach((value, key)=>{
                                if (!key) return;
                                const opts = {
                                    sameSite: value.samesite,
                                    secure: value.secure,
                                    maxAge: value["max-age"],
                                    httpOnly: value.httponly,
                                    domain: value.domain,
                                    path: value.path
                                };
                                try {
                                    cookieHelper.set(key, decodeURIComponent(value.value), opts);
                                } catch (e) {}
                            });
                            return;
                        }
                    })
                }
            ]
        }
    };
};
;
}),
];

//# sourceMappingURL=f1dbc_better-auth_dist_da32606d._.js.map