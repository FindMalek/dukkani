module.exports = [
"[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/env/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ENV",
    ()=>ENV,
    "TTY_COLORS",
    ()=>TTY_COLORS,
    "createLogger",
    ()=>createLogger,
    "env",
    ()=>env,
    "getBooleanEnvVar",
    ()=>getBooleanEnvVar,
    "getColorDepth",
    ()=>getColorDepth,
    "getEnvVar",
    ()=>getEnvVar,
    "isDevelopment",
    ()=>isDevelopment,
    "isProduction",
    ()=>isProduction,
    "isTest",
    ()=>isTest,
    "levels",
    ()=>levels,
    "logger",
    ()=>logger,
    "nodeENV",
    ()=>nodeENV,
    "shouldPublishLog",
    ()=>shouldPublishLog
]);
const _envShim = /* @__PURE__ */ Object.create(null);
const _getEnv = (useShim)=>globalThis.process?.env || //@ts-expect-error
    globalThis.Deno?.env.toObject() || //@ts-expect-error
    globalThis.__env__ || (useShim ? _envShim : globalThis);
const env = new Proxy(_envShim, {
    get (_, prop) {
        const env2 = _getEnv();
        return env2[prop] ?? _envShim[prop];
    },
    has (_, prop) {
        const env2 = _getEnv();
        return prop in env2 || prop in _envShim;
    },
    set (_, prop, value) {
        const env2 = _getEnv(true);
        env2[prop] = value;
        return true;
    },
    deleteProperty (_, prop) {
        if (!prop) {
            return false;
        }
        const env2 = _getEnv(true);
        delete env2[prop];
        return true;
    },
    ownKeys () {
        const env2 = _getEnv(true);
        return Object.keys(env2);
    }
});
function toBoolean(val) {
    return val ? val !== "false" : false;
}
const nodeENV = typeof process !== "undefined" && process.env && ("TURBOPACK compile-time value", "development") || "";
const isProduction = nodeENV === "production";
const isDevelopment = ()=>nodeENV === "dev" || nodeENV === "development";
const isTest = ()=>nodeENV === "test" || toBoolean(env.TEST);
function getEnvVar(key, fallback) {
    if (typeof process !== "undefined" && process.env) {
        return process.env[key] ?? fallback;
    }
    if (typeof Deno !== "undefined") {
        return Deno.env.get(key) ?? fallback;
    }
    if (typeof Bun !== "undefined") {
        return Bun.env[key] ?? fallback;
    }
    return fallback;
}
function getBooleanEnvVar(key, fallback = true) {
    const value = getEnvVar(key);
    if (!value) return fallback;
    return value !== "0" && value.toLowerCase() !== "false" && value !== "";
}
const ENV = Object.freeze({
    get BETTER_AUTH_SECRET () {
        return getEnvVar("BETTER_AUTH_SECRET");
    },
    get AUTH_SECRET () {
        return getEnvVar("AUTH_SECRET");
    },
    get BETTER_AUTH_TELEMETRY () {
        return getEnvVar("BETTER_AUTH_TELEMETRY");
    },
    get BETTER_AUTH_TELEMETRY_ID () {
        return getEnvVar("BETTER_AUTH_TELEMETRY_ID");
    },
    get NODE_ENV () {
        return getEnvVar("NODE_ENV", "development");
    },
    get PACKAGE_VERSION () {
        return getEnvVar("PACKAGE_VERSION", "0.0.0");
    },
    get BETTER_AUTH_TELEMETRY_ENDPOINT () {
        return getEnvVar("BETTER_AUTH_TELEMETRY_ENDPOINT", "https://telemetry.better-auth.com/v1/track");
    }
});
const COLORS_2 = 1;
const COLORS_16 = 4;
const COLORS_256 = 8;
const COLORS_16m = 24;
const TERM_ENVS = {
    eterm: COLORS_16,
    cons25: COLORS_16,
    console: COLORS_16,
    cygwin: COLORS_16,
    dtterm: COLORS_16,
    gnome: COLORS_16,
    hurd: COLORS_16,
    jfbterm: COLORS_16,
    konsole: COLORS_16,
    kterm: COLORS_16,
    mlterm: COLORS_16,
    mosh: COLORS_16m,
    putty: COLORS_16,
    st: COLORS_16,
    // http://lists.schmorp.de/pipermail/rxvt-unicode/2016q2/002261.html
    "rxvt-unicode-24bit": COLORS_16m,
    // https://bugs.launchpad.net/terminator/+bug/1030562
    terminator: COLORS_16m,
    "xterm-kitty": COLORS_16m
};
const CI_ENVS_MAP = new Map(Object.entries({
    APPVEYOR: COLORS_256,
    BUILDKITE: COLORS_256,
    CIRCLECI: COLORS_16m,
    DRONE: COLORS_256,
    GITEA_ACTIONS: COLORS_16m,
    GITHUB_ACTIONS: COLORS_16m,
    GITLAB_CI: COLORS_256,
    TRAVIS: COLORS_256
}));
const TERM_ENVS_REG_EXP = [
    /ansi/,
    /color/,
    /linux/,
    /direct/,
    /^con[0-9]*x[0-9]/,
    /^rxvt/,
    /^screen/,
    /^xterm/,
    /^vt100/,
    /^vt220/
];
function getColorDepth() {
    if (getEnvVar("FORCE_COLOR") !== void 0) {
        switch(getEnvVar("FORCE_COLOR")){
            case "":
            case "1":
            case "true":
                return COLORS_16;
            case "2":
                return COLORS_256;
            case "3":
                return COLORS_16m;
            default:
                return COLORS_2;
        }
    }
    if (getEnvVar("NODE_DISABLE_COLORS") !== void 0 && getEnvVar("NODE_DISABLE_COLORS") !== "" || // See https://no-color.org/
    getEnvVar("NO_COLOR") !== void 0 && getEnvVar("NO_COLOR") !== "" || // The "dumb" special terminal, as defined by terminfo, doesn't support
    // ANSI color control codes.
    // See https://invisible-island.net/ncurses/terminfo.ti.html#toc-_Specials
    getEnvVar("TERM") === "dumb") {
        return COLORS_2;
    }
    if (getEnvVar("TMUX")) {
        return COLORS_16m;
    }
    if ("TF_BUILD" in env && "AGENT_NAME" in env) {
        return COLORS_16;
    }
    if ("CI" in env) {
        for (const { 0: envName, 1: colors } of CI_ENVS_MAP){
            if (envName in env) {
                return colors;
            }
        }
        if (getEnvVar("CI_NAME") === "codeship") {
            return COLORS_256;
        }
        return COLORS_2;
    }
    if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.exec(getEnvVar("TEAMCITY_VERSION")) !== null ? COLORS_16 : COLORS_2;
    }
    switch(getEnvVar("TERM_PROGRAM")){
        case "iTerm.app":
            if (!getEnvVar("TERM_PROGRAM_VERSION") || /^[0-2]\./.exec(getEnvVar("TERM_PROGRAM_VERSION")) !== null) {
                return COLORS_256;
            }
            return COLORS_16m;
        case "HyperTerm":
        case "MacTerm":
            return COLORS_16m;
        case "Apple_Terminal":
            return COLORS_256;
    }
    if (getEnvVar("COLORTERM") === "truecolor" || getEnvVar("COLORTERM") === "24bit") {
        return COLORS_16m;
    }
    if (getEnvVar("TERM")) {
        if (/truecolor/.exec(getEnvVar("TERM")) !== null) {
            return COLORS_16m;
        }
        if (/^xterm-256/.exec(getEnvVar("TERM")) !== null) {
            return COLORS_256;
        }
        const termEnv = getEnvVar("TERM").toLowerCase();
        if (TERM_ENVS[termEnv]) {
            return TERM_ENVS[termEnv];
        }
        if (TERM_ENVS_REG_EXP.some((term)=>term.exec(termEnv) !== null)) {
            return COLORS_16;
        }
    }
    if (getEnvVar("COLORTERM")) {
        return COLORS_16;
    }
    return COLORS_2;
}
const TTY_COLORS = {
    reset: "\x1B[0m",
    bright: "\x1B[1m",
    dim: "\x1B[2m",
    undim: "\x1B[22m",
    underscore: "\x1B[4m",
    blink: "\x1B[5m",
    reverse: "\x1B[7m",
    hidden: "\x1B[8m",
    fg: {
        black: "\x1B[30m",
        red: "\x1B[31m",
        green: "\x1B[32m",
        yellow: "\x1B[33m",
        blue: "\x1B[34m",
        magenta: "\x1B[35m",
        cyan: "\x1B[36m",
        white: "\x1B[37m"
    },
    bg: {
        black: "\x1B[40m",
        red: "\x1B[41m",
        green: "\x1B[42m",
        yellow: "\x1B[43m",
        blue: "\x1B[44m",
        magenta: "\x1B[45m",
        cyan: "\x1B[46m",
        white: "\x1B[47m"
    }
};
const levels = [
    "info",
    "success",
    "warn",
    "error",
    "debug"
];
function shouldPublishLog(currentLogLevel, logLevel) {
    return levels.indexOf(logLevel) <= levels.indexOf(currentLogLevel);
}
const levelColors = {
    info: TTY_COLORS.fg.blue,
    success: TTY_COLORS.fg.green,
    warn: TTY_COLORS.fg.yellow,
    error: TTY_COLORS.fg.red,
    debug: TTY_COLORS.fg.magenta
};
const formatMessage = (level, message, colorsEnabled)=>{
    const timestamp = /* @__PURE__ */ new Date().toISOString();
    if (colorsEnabled) {
        return `${TTY_COLORS.dim}${timestamp}${TTY_COLORS.reset} ${levelColors[level]}${level.toUpperCase()}${TTY_COLORS.reset} ${TTY_COLORS.bright}[Better Auth]:${TTY_COLORS.reset} ${message}`;
    }
    return `${timestamp} ${level.toUpperCase()} [Better Auth]: ${message}`;
};
const createLogger = (options)=>{
    const enabled = options?.disabled !== true;
    const logLevel = options?.level ?? "error";
    const isDisableColorsSpecified = options?.disableColors !== void 0;
    const colorsEnabled = isDisableColorsSpecified ? !options.disableColors : getColorDepth() !== 1;
    const LogFunc = (level, message, args = [])=>{
        if (!enabled || !shouldPublishLog(logLevel, level)) {
            return;
        }
        const formattedMessage = formatMessage(level, message, colorsEnabled);
        if (!options || typeof options.log !== "function") {
            if (level === "error") {
                console.error(formattedMessage, ...args);
            } else if (level === "warn") {
                console.warn(formattedMessage, ...args);
            } else {
                console.log(formattedMessage, ...args);
            }
            return;
        }
        options.log(level === "success" ? "info" : level, message, ...args);
    };
    const logger2 = Object.fromEntries(levels.map((level)=>[
            level,
            (...[message, ...args])=>LogFunc(level, message, args)
        ]));
    return {
        ...logger2,
        get level () {
            return logLevel;
        }
    };
};
const logger = createLogger();
;
}),
"[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
}),
"[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/oauth2/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clientCredentialsToken",
    ()=>clientCredentialsToken,
    "createAuthorizationCodeRequest",
    ()=>createAuthorizationCodeRequest,
    "createAuthorizationURL",
    ()=>createAuthorizationURL,
    "createClientCredentialsTokenRequest",
    ()=>createClientCredentialsTokenRequest,
    "createRefreshAccessTokenRequest",
    ()=>createRefreshAccessTokenRequest,
    "generateCodeChallenge",
    ()=>generateCodeChallenge,
    "getOAuth2Tokens",
    ()=>getOAuth2Tokens,
    "refreshAccessToken",
    ()=>refreshAccessToken,
    "validateAuthorizationCode",
    ()=>validateAuthorizationCode,
    "validateToken",
    ()=>validateToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/base64.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-fetch+fetch@1.1.18/node_modules/@better-fetch/fetch/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$1$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.1.1/node_modules/jose/dist/webapi/jwt/verify.js [app-route] (ecmascript)");
;
;
;
function getOAuth2Tokens(data) {
    const getDate = (seconds)=>{
        const now = /* @__PURE__ */ new Date();
        return new Date(now.getTime() + seconds * 1e3);
    };
    return {
        tokenType: data.token_type,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        accessTokenExpiresAt: data.expires_in ? getDate(data.expires_in) : void 0,
        refreshTokenExpiresAt: data.refresh_token_expires_in ? getDate(data.refresh_token_expires_in) : void 0,
        scopes: data?.scope ? typeof data.scope === "string" ? data.scope.split(" ") : data.scope : [],
        idToken: data.id_token
    };
}
async function generateCodeChallenge(codeVerifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["base64Url"].encode(new Uint8Array(hash), {
        padding: false
    });
}
async function createAuthorizationURL({ id, options, authorizationEndpoint, state, codeVerifier, scopes, claims, redirectURI, duration, prompt, accessType, responseType, display, loginHint, hd, responseMode, additionalParams, scopeJoiner }) {
    const url = new URL(authorizationEndpoint);
    url.searchParams.set("response_type", responseType || "code");
    const primaryClientId = Array.isArray(options.clientId) ? options.clientId[0] : options.clientId;
    url.searchParams.set("client_id", primaryClientId);
    url.searchParams.set("state", state);
    url.searchParams.set("scope", scopes.join(scopeJoiner || " "));
    url.searchParams.set("redirect_uri", options.redirectURI || redirectURI);
    duration && url.searchParams.set("duration", duration);
    display && url.searchParams.set("display", display);
    loginHint && url.searchParams.set("login_hint", loginHint);
    prompt && url.searchParams.set("prompt", prompt);
    hd && url.searchParams.set("hd", hd);
    accessType && url.searchParams.set("access_type", accessType);
    responseMode && url.searchParams.set("response_mode", responseMode);
    if (codeVerifier) {
        const codeChallenge = await generateCodeChallenge(codeVerifier);
        url.searchParams.set("code_challenge_method", "S256");
        url.searchParams.set("code_challenge", codeChallenge);
    }
    if (claims) {
        const claimsObj = claims.reduce((acc, claim)=>{
            acc[claim] = null;
            return acc;
        }, {});
        url.searchParams.set("claims", JSON.stringify({
            id_token: {
                email: null,
                email_verified: null,
                ...claimsObj
            }
        }));
    }
    if (additionalParams) {
        Object.entries(additionalParams).forEach(([key, value])=>{
            url.searchParams.set(key, value);
        });
    }
    return url;
}
function createAuthorizationCodeRequest({ code, codeVerifier, redirectURI, options, authentication, deviceId, headers, additionalParams = {}, resource }) {
    const body = new URLSearchParams();
    const requestHeaders = {
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json",
        "user-agent": "better-auth",
        ...headers
    };
    body.set("grant_type", "authorization_code");
    body.set("code", code);
    codeVerifier && body.set("code_verifier", codeVerifier);
    options.clientKey && body.set("client_key", options.clientKey);
    deviceId && body.set("device_id", deviceId);
    body.set("redirect_uri", options.redirectURI || redirectURI);
    if (resource) {
        if (typeof resource === "string") {
            body.append("resource", resource);
        } else {
            for (const _resource of resource){
                body.append("resource", _resource);
            }
        }
    }
    if (authentication === "basic") {
        const primaryClientId = Array.isArray(options.clientId) ? options.clientId[0] : options.clientId;
        const encodedCredentials = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["base64"].encode(`${primaryClientId}:${options.clientSecret ?? ""}`);
        requestHeaders["authorization"] = `Basic ${encodedCredentials}`;
    } else {
        const primaryClientId = Array.isArray(options.clientId) ? options.clientId[0] : options.clientId;
        body.set("client_id", primaryClientId);
        if (options.clientSecret) {
            body.set("client_secret", options.clientSecret);
        }
    }
    for (const [key, value] of Object.entries(additionalParams)){
        if (!body.has(key)) body.append(key, value);
    }
    return {
        body,
        headers: requestHeaders
    };
}
async function validateAuthorizationCode({ code, codeVerifier, redirectURI, options, tokenEndpoint, authentication, deviceId, headers, additionalParams = {}, resource }) {
    const { body, headers: requestHeaders } = createAuthorizationCodeRequest({
        code,
        codeVerifier,
        redirectURI,
        options,
        authentication,
        deviceId,
        headers,
        additionalParams,
        resource
    });
    const { data, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])(tokenEndpoint, {
        method: "POST",
        body,
        headers: requestHeaders
    });
    if (error) {
        throw error;
    }
    const tokens = getOAuth2Tokens(data);
    return tokens;
}
async function validateToken(token, jwksEndpoint) {
    const { data, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])(jwksEndpoint, {
        method: "GET",
        headers: {
            accept: "application/json",
            "user-agent": "better-auth"
        }
    });
    if (error) {
        throw error;
    }
    const keys = data["keys"];
    const header = JSON.parse(atob(token.split(".")[0]));
    const key = keys.find((key2)=>key2.kid === header.kid);
    if (!key) {
        throw new Error("Key not found");
    }
    const verified = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$1$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jwtVerify"])(token, key);
    return verified;
}
function createRefreshAccessTokenRequest({ refreshToken, options, authentication, extraParams, resource }) {
    const body = new URLSearchParams();
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json"
    };
    body.set("grant_type", "refresh_token");
    body.set("refresh_token", refreshToken);
    if (authentication === "basic") {
        const primaryClientId = Array.isArray(options.clientId) ? options.clientId[0] : options.clientId;
        if (primaryClientId) {
            headers["authorization"] = "Basic " + __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["base64"].encode(`${primaryClientId}:${options.clientSecret ?? ""}`);
        } else {
            headers["authorization"] = "Basic " + __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["base64"].encode(`:${options.clientSecret ?? ""}`);
        }
    } else {
        const primaryClientId = Array.isArray(options.clientId) ? options.clientId[0] : options.clientId;
        body.set("client_id", primaryClientId);
        if (options.clientSecret) {
            body.set("client_secret", options.clientSecret);
        }
    }
    if (resource) {
        if (typeof resource === "string") {
            body.append("resource", resource);
        } else {
            for (const _resource of resource){
                body.append("resource", _resource);
            }
        }
    }
    if (extraParams) {
        for (const [key, value] of Object.entries(extraParams)){
            body.set(key, value);
        }
    }
    return {
        body,
        headers
    };
}
async function refreshAccessToken({ refreshToken, options, tokenEndpoint, authentication, extraParams }) {
    const { body, headers } = createRefreshAccessTokenRequest({
        refreshToken,
        options,
        authentication,
        extraParams
    });
    const { data, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])(tokenEndpoint, {
        method: "POST",
        body,
        headers
    });
    if (error) {
        throw error;
    }
    const tokens = {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        tokenType: data.token_type,
        scopes: data.scope?.split(" "),
        idToken: data.id_token
    };
    if (data.expires_in) {
        const now = /* @__PURE__ */ new Date();
        tokens.accessTokenExpiresAt = new Date(now.getTime() + data.expires_in * 1e3);
    }
    return tokens;
}
function createClientCredentialsTokenRequest({ options, scope, authentication, resource }) {
    const body = new URLSearchParams();
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json"
    };
    body.set("grant_type", "client_credentials");
    scope && body.set("scope", scope);
    if (resource) {
        if (typeof resource === "string") {
            body.append("resource", resource);
        } else {
            for (const _resource of resource){
                body.append("resource", _resource);
            }
        }
    }
    if (authentication === "basic") {
        const primaryClientId = Array.isArray(options.clientId) ? options.clientId[0] : options.clientId;
        const encodedCredentials = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["base64Url"].encode(`${primaryClientId}:${options.clientSecret}`);
        headers["authorization"] = `Basic ${encodedCredentials}`;
    } else {
        const primaryClientId = Array.isArray(options.clientId) ? options.clientId[0] : options.clientId;
        body.set("client_id", primaryClientId);
        body.set("client_secret", options.clientSecret);
    }
    return {
        body,
        headers
    };
}
async function clientCredentialsToken({ options, tokenEndpoint, scope, authentication, resource }) {
    const { body, headers } = createClientCredentialsTokenRequest({
        options,
        scope,
        authentication,
        resource
    });
    const { data, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])(tokenEndpoint, {
        method: "POST",
        body,
        headers
    });
    if (error) {
        throw error;
    }
    const tokens = {
        accessToken: data.access_token,
        tokenType: data.token_type,
        scopes: data.scope?.split(" ")
    };
    if (data.expires_in) {
        const now = /* @__PURE__ */ new Date();
        tokens.accessTokenExpiresAt = new Date(now.getTime() + data.expires_in * 1e3);
    }
    return tokens;
}
;
}),
"[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/utils/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defineErrorCodes",
    ()=>defineErrorCodes
]);
function defineErrorCodes(codes) {
    return codes;
}
;
}),
"[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/error/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BASE_ERROR_CODES",
    ()=>BASE_ERROR_CODES,
    "BetterAuthError",
    ()=>BetterAuthError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$utils$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/utils/index.mjs [app-route] (ecmascript)");
;
const BASE_ERROR_CODES = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$utils$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defineErrorCodes"])({
    USER_NOT_FOUND: "User not found",
    FAILED_TO_CREATE_USER: "Failed to create user",
    FAILED_TO_CREATE_SESSION: "Failed to create session",
    FAILED_TO_UPDATE_USER: "Failed to update user",
    FAILED_TO_GET_SESSION: "Failed to get session",
    INVALID_PASSWORD: "Invalid password",
    INVALID_EMAIL: "Invalid email",
    INVALID_EMAIL_OR_PASSWORD: "Invalid email or password",
    SOCIAL_ACCOUNT_ALREADY_LINKED: "Social account already linked",
    PROVIDER_NOT_FOUND: "Provider not found",
    INVALID_TOKEN: "Invalid token",
    ID_TOKEN_NOT_SUPPORTED: "id_token not supported",
    FAILED_TO_GET_USER_INFO: "Failed to get user info",
    USER_EMAIL_NOT_FOUND: "User email not found",
    EMAIL_NOT_VERIFIED: "Email not verified",
    PASSWORD_TOO_SHORT: "Password too short",
    PASSWORD_TOO_LONG: "Password too long",
    USER_ALREADY_EXISTS: "User already exists.",
    USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "User already exists. Use another email.",
    EMAIL_CAN_NOT_BE_UPDATED: "Email can not be updated",
    CREDENTIAL_ACCOUNT_NOT_FOUND: "Credential account not found",
    SESSION_EXPIRED: "Session expired. Re-authenticate to perform this action.",
    FAILED_TO_UNLINK_LAST_ACCOUNT: "You can't unlink your last account",
    ACCOUNT_NOT_FOUND: "Account not found",
    USER_ALREADY_HAS_PASSWORD: "User already has a password. Provide that to delete the account."
});
class BetterAuthError extends Error {
    constructor(message, cause){
        super(message);
        this.name = "BetterAuthError";
        this.message = message;
        this.cause = cause;
        this.stack = "";
    }
}
;
}),
"[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/middleware/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAuthEndpoint",
    ()=>createAuthEndpoint,
    "createAuthMiddleware",
    ()=>createAuthMiddleware,
    "optionsMiddleware",
    ()=>optionsMiddleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-call@1.0.19/node_modules/better-call/dist/index.js [app-route] (ecmascript)");
;
const optionsMiddleware = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createMiddleware"])(async ()=>{
    return {};
});
const createAuthMiddleware = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createMiddleware"].create({
    use: [
        optionsMiddleware,
        /**
     * Only use for post hooks
     */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createMiddleware"])(async ()=>{
            return {};
        })
    ]
});
const createAuthEndpoint = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createEndpoint"].create({
    use: [
        optionsMiddleware
    ]
});
;
}),
"[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/social-providers/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SocialProviderListEnum",
    ()=>SocialProviderListEnum,
    "apple",
    ()=>apple,
    "atlassian",
    ()=>atlassian,
    "cognito",
    ()=>cognito,
    "discord",
    ()=>discord,
    "dropbox",
    ()=>dropbox,
    "facebook",
    ()=>facebook,
    "figma",
    ()=>figma,
    "getApplePublicKey",
    ()=>getApplePublicKey,
    "getCognitoPublicKey",
    ()=>getCognitoPublicKey,
    "github",
    ()=>github,
    "gitlab",
    ()=>gitlab,
    "google",
    ()=>google,
    "huggingface",
    ()=>huggingface,
    "kakao",
    ()=>kakao,
    "kick",
    ()=>kick,
    "line",
    ()=>line,
    "linear",
    ()=>linear,
    "linkedin",
    ()=>linkedin,
    "microsoft",
    ()=>microsoft,
    "naver",
    ()=>naver,
    "notion",
    ()=>notion,
    "paypal",
    ()=>paypal,
    "reddit",
    ()=>reddit,
    "roblox",
    ()=>roblox,
    "salesforce",
    ()=>salesforce,
    "slack",
    ()=>slack,
    "socialProviderList",
    ()=>socialProviderList,
    "socialProviders",
    ()=>socialProviders,
    "spotify",
    ()=>spotify,
    "tiktok",
    ()=>tiktok,
    "twitch",
    ()=>twitch,
    "twitter",
    ()=>twitter,
    "vk",
    ()=>vk,
    "zoom",
    ()=>zoom
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@4.1.12/node_modules/zod/v4/classic/schemas.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-fetch+fetch@1.1.18/node_modules/@better-fetch/fetch/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/better-call@1.0.19/node_modules/better-call/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$1$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.1.1/node_modules/jose/dist/webapi/util/decode_jwt.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$1$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_protected_header$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.1.1/node_modules/jose/dist/webapi/util/decode_protected_header.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$1$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.1.1/node_modules/jose/dist/webapi/jwt/verify.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$1$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$key$2f$import$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.1.1/node_modules/jose/dist/webapi/key/import.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$1$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwks$2f$remote$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.1.1/node_modules/jose/dist/webapi/jwks/remote.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/oauth2/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/error/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/env/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+utils@0.3.0/node_modules/@better-auth/utils/dist/base64.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$utils$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/utils/index.mjs [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
const apple = (options)=>{
    const tokenEndpoint = "https://appleid.apple.com/auth/token";
    return {
        id: "apple",
        name: "Apple",
        async createAuthorizationURL ({ state, scopes, redirectURI }) {
            const _scope = options.disableDefaultScope ? [] : [
                "email",
                "name"
            ];
            options.scope && _scope.push(...options.scope);
            scopes && _scope.push(...scopes);
            const url = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "apple",
                options,
                authorizationEndpoint: "https://appleid.apple.com/auth/authorize",
                scopes: _scope,
                state,
                redirectURI,
                responseMode: "form_post",
                responseType: "code id_token"
            });
            return url;
        },
        validateAuthorizationCode: async ({ code, codeVerifier, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                codeVerifier,
                redirectURI,
                options,
                tokenEndpoint
            });
        },
        async verifyIdToken (token, nonce) {
            if (options.disableIdTokenSignIn) {
                return false;
            }
            if (options.verifyIdToken) {
                return options.verifyIdToken(token, nonce);
            }
            const decodedHeader = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$1$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_protected_header$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodeProtectedHeader"])(token);
            const { kid, alg: jwtAlg } = decodedHeader;
            if (!kid || !jwtAlg) return false;
            const publicKey = await getApplePublicKey(kid);
            const { payload: jwtClaims } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$1$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jwtVerify"])(token, publicKey, {
                algorithms: [
                    jwtAlg
                ],
                issuer: "https://appleid.apple.com",
                audience: options.audience && options.audience.length ? options.audience : options.appBundleIdentifier ? options.appBundleIdentifier : options.clientId,
                maxTokenAge: "1h"
            });
            [
                "email_verified",
                "is_private_email"
            ].forEach((field)=>{
                if (jwtClaims[field] !== void 0) {
                    jwtClaims[field] = Boolean(jwtClaims[field]);
                }
            });
            if (nonce && jwtClaims.nonce !== nonce) {
                return false;
            }
            return !!jwtClaims;
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint: "https://appleid.apple.com/auth/token"
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) {
                return options.getUserInfo(token);
            }
            if (!token.idToken) {
                return null;
            }
            const profile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$1$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodeJwt"])(token.idToken);
            if (!profile) {
                return null;
            }
            const name = token.user ? `${token.user.name?.firstName} ${token.user.name?.lastName}` : profile.name || profile.email;
            const emailVerified = typeof profile.email_verified === "boolean" ? profile.email_verified : profile.email_verified === "true";
            const enrichedProfile = {
                ...profile,
                name
            };
            const userMap = await options.mapProfileToUser?.(enrichedProfile);
            return {
                user: {
                    id: profile.sub,
                    name: enrichedProfile.name,
                    emailVerified,
                    email: profile.email,
                    ...userMap
                },
                data: enrichedProfile
            };
        },
        options
    };
};
const getApplePublicKey = async (kid)=>{
    const APPLE_BASE_URL = "https://appleid.apple.com";
    const JWKS_APPLE_URI = "/auth/keys";
    const { data } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])(`${APPLE_BASE_URL}${JWKS_APPLE_URI}`);
    if (!data?.keys) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: "Keys not found"
        });
    }
    const jwk = data.keys.find((key)=>key.kid === kid);
    if (!jwk) {
        throw new Error(`JWK with kid ${kid} not found`);
    }
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$1$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$key$2f$import$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["importJWK"])(jwk, jwk.alg);
};
const atlassian = (options)=>{
    return {
        id: "atlassian",
        name: "Atlassian",
        async createAuthorizationURL ({ state, scopes, codeVerifier, redirectURI }) {
            if (!options.clientId || !options.clientSecret) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error("Client Id and Secret are required for Atlassian");
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BetterAuthError"]("CLIENT_ID_AND_SECRET_REQUIRED");
            }
            if (!codeVerifier) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BetterAuthError"]("codeVerifier is required for Atlassian");
            }
            const _scopes = options.disableDefaultScope ? [] : [
                "read:jira-user",
                "offline_access"
            ];
            options.scope && _scopes.push(...options.scope);
            scopes && _scopes.push(...scopes);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "atlassian",
                options,
                authorizationEndpoint: "https://auth.atlassian.com/authorize",
                scopes: _scopes,
                state,
                codeVerifier,
                redirectURI,
                additionalParams: {
                    audience: "api.atlassian.com"
                },
                prompt: options.prompt
            });
        },
        validateAuthorizationCode: async ({ code, codeVerifier, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                codeVerifier,
                redirectURI,
                options,
                tokenEndpoint: "https://auth.atlassian.com/oauth/token"
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint: "https://auth.atlassian.com/oauth/token"
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) {
                return options.getUserInfo(token);
            }
            if (!token.accessToken) {
                return null;
            }
            try {
                const { data: profile } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])("https://api.atlassian.com/me", {
                    headers: {
                        Authorization: `Bearer ${token.accessToken}`
                    }
                });
                if (!profile) return null;
                const userMap = await options.mapProfileToUser?.(profile);
                return {
                    user: {
                        id: profile.account_id,
                        name: profile.name,
                        email: profile.email,
                        image: profile.picture,
                        emailVerified: false,
                        ...userMap
                    },
                    data: profile
                };
            } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error("Failed to fetch user info from Figma:", error);
                return null;
            }
        },
        options
    };
};
const cognito = (options)=>{
    if (!options.domain || !options.region || !options.userPoolId) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error("Domain, region and userPoolId are required for Amazon Cognito. Make sure to provide them in the options.");
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BetterAuthError"]("DOMAIN_AND_REGION_REQUIRED");
    }
    const cleanDomain = options.domain.replace(/^https?:\/\//, "");
    const authorizationEndpoint = `https://${cleanDomain}/oauth2/authorize`;
    const tokenEndpoint = `https://${cleanDomain}/oauth2/token`;
    const userInfoEndpoint = `https://${cleanDomain}/oauth2/userinfo`;
    return {
        id: "cognito",
        name: "Cognito",
        async createAuthorizationURL ({ state, scopes, codeVerifier, redirectURI }) {
            if (!options.clientId) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error("ClientId is required for Amazon Cognito. Make sure to provide them in the options.");
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BetterAuthError"]("CLIENT_ID_AND_SECRET_REQUIRED");
            }
            if (options.requireClientSecret && !options.clientSecret) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error("Client Secret is required when requireClientSecret is true. Make sure to provide it in the options.");
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BetterAuthError"]("CLIENT_SECRET_REQUIRED");
            }
            const _scopes = options.disableDefaultScope ? [] : [
                "openid",
                "profile",
                "email"
            ];
            options.scope && _scopes.push(...options.scope);
            scopes && _scopes.push(...scopes);
            const url = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "cognito",
                options: {
                    ...options
                },
                authorizationEndpoint,
                scopes: _scopes,
                state,
                codeVerifier,
                redirectURI,
                prompt: options.prompt
            });
            return url;
        },
        validateAuthorizationCode: async ({ code, codeVerifier, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                codeVerifier,
                redirectURI,
                options,
                tokenEndpoint
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint
            });
        },
        async verifyIdToken (token, nonce) {
            if (options.disableIdTokenSignIn) {
                return false;
            }
            if (options.verifyIdToken) {
                return options.verifyIdToken(token, nonce);
            }
            try {
                const decodedHeader = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$1$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_protected_header$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodeProtectedHeader"])(token);
                const { kid, alg: jwtAlg } = decodedHeader;
                if (!kid || !jwtAlg) return false;
                const publicKey = await getCognitoPublicKey(kid, options.region, options.userPoolId);
                const expectedIssuer = `https://cognito-idp.${options.region}.amazonaws.com/${options.userPoolId}`;
                const { payload: jwtClaims } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$1$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jwtVerify"])(token, publicKey, {
                    algorithms: [
                        jwtAlg
                    ],
                    issuer: expectedIssuer,
                    audience: options.clientId,
                    maxTokenAge: "1h"
                });
                if (nonce && jwtClaims.nonce !== nonce) {
                    return false;
                }
                return true;
            } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error("Failed to verify ID token:", error);
                return false;
            }
        },
        async getUserInfo (token) {
            if (options.getUserInfo) {
                return options.getUserInfo(token);
            }
            if (token.idToken) {
                try {
                    const profile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$1$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodeJwt"])(token.idToken);
                    if (!profile) {
                        return null;
                    }
                    const name = profile.name || profile.given_name || profile.username || profile.email;
                    const enrichedProfile = {
                        ...profile,
                        name
                    };
                    const userMap = await options.mapProfileToUser?.(enrichedProfile);
                    return {
                        user: {
                            id: profile.sub,
                            name: enrichedProfile.name,
                            email: profile.email,
                            image: profile.picture,
                            emailVerified: profile.email_verified,
                            ...userMap
                        },
                        data: enrichedProfile
                    };
                } catch (error) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error("Failed to decode ID token:", error);
                }
            }
            if (token.accessToken) {
                try {
                    const { data: userInfo } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])(userInfoEndpoint, {
                        headers: {
                            Authorization: `Bearer ${token.accessToken}`
                        }
                    });
                    if (userInfo) {
                        const userMap = await options.mapProfileToUser?.(userInfo);
                        return {
                            user: {
                                id: userInfo.sub,
                                name: userInfo.name || userInfo.given_name || userInfo.username,
                                email: userInfo.email,
                                image: userInfo.picture,
                                emailVerified: userInfo.email_verified,
                                ...userMap
                            },
                            data: userInfo
                        };
                    }
                } catch (error) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error("Failed to fetch user info from Cognito:", error);
                }
            }
            return null;
        },
        options
    };
};
const getCognitoPublicKey = async (kid, region, userPoolId)=>{
    const COGNITO_JWKS_URI = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`;
    try {
        const { data } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])(COGNITO_JWKS_URI);
        if (!data?.keys) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$better$2d$call$40$1$2e$0$2e$19$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                message: "Keys not found"
            });
        }
        const jwk = data.keys.find((key)=>key.kid === kid);
        if (!jwk) {
            throw new Error(`JWK with kid ${kid} not found`);
        }
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$1$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$key$2f$import$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["importJWK"])(jwk, jwk.alg);
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error("Failed to fetch Cognito public key:", error);
        throw error;
    }
};
const discord = (options)=>{
    return {
        id: "discord",
        name: "Discord",
        createAuthorizationURL ({ state, scopes, redirectURI }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "identify",
                "email"
            ];
            scopes && _scopes.push(...scopes);
            options.scope && _scopes.push(...options.scope);
            const hasBotScope = _scopes.includes("bot");
            const permissionsParam = hasBotScope && options.permissions !== void 0 ? `&permissions=${options.permissions}` : "";
            return new URL(`https://discord.com/api/oauth2/authorize?scope=${_scopes.join("+")}&response_type=code&client_id=${options.clientId}&redirect_uri=${encodeURIComponent(options.redirectURI || redirectURI)}&state=${state}&prompt=${options.prompt || "none"}${permissionsParam}`);
        },
        validateAuthorizationCode: async ({ code, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                redirectURI,
                options,
                tokenEndpoint: "https://discord.com/api/oauth2/token"
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint: "https://discord.com/api/oauth2/token"
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) {
                return options.getUserInfo(token);
            }
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])("https://discord.com/api/users/@me", {
                headers: {
                    authorization: `Bearer ${token.accessToken}`
                }
            });
            if (error) {
                return null;
            }
            if (profile.avatar === null) {
                const defaultAvatarNumber = profile.discriminator === "0" ? Number(BigInt(profile.id) >> BigInt(22)) % 6 : parseInt(profile.discriminator) % 5;
                profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
            } else {
                const format = profile.avatar.startsWith("a_") ? "gif" : "png";
                profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
            }
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile.id,
                    name: profile.global_name || profile.username || "",
                    email: profile.email,
                    emailVerified: profile.verified,
                    image: profile.image_url,
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
const facebook = (options)=>{
    return {
        id: "facebook",
        name: "Facebook",
        async createAuthorizationURL ({ state, scopes, redirectURI, loginHint }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "email",
                "public_profile"
            ];
            options.scope && _scopes.push(...options.scope);
            scopes && _scopes.push(...scopes);
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "facebook",
                options,
                authorizationEndpoint: "https://www.facebook.com/v21.0/dialog/oauth",
                scopes: _scopes,
                state,
                redirectURI,
                loginHint,
                additionalParams: options.configId ? {
                    config_id: options.configId
                } : {}
            });
        },
        validateAuthorizationCode: async ({ code, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                redirectURI,
                options,
                tokenEndpoint: "https://graph.facebook.com/oauth/access_token"
            });
        },
        async verifyIdToken (token, nonce) {
            if (options.disableIdTokenSignIn) {
                return false;
            }
            if (options.verifyIdToken) {
                return options.verifyIdToken(token, nonce);
            }
            if (token.split(".").length === 3) {
                try {
                    const { payload: jwtClaims } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$1$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jwtVerify"])(token, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$1$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwks$2f$remote$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRemoteJWKSet"])(// https://developers.facebook.com/docs/facebook-login/limited-login/token/#jwks
                    new URL("https://limited.facebook.com/.well-known/oauth/openid/jwks/")), {
                        algorithms: [
                            "RS256"
                        ],
                        audience: options.clientId,
                        issuer: "https://www.facebook.com"
                    });
                    if (nonce && jwtClaims.nonce !== nonce) {
                        return false;
                    }
                    return !!jwtClaims;
                } catch (error) {
                    return false;
                }
            }
            return true;
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint: "https://graph.facebook.com/v18.0/oauth/access_token"
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) {
                return options.getUserInfo(token);
            }
            if (token.idToken && token.idToken.split(".").length === 3) {
                const profile2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$1$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodeJwt"])(token.idToken);
                const user = {
                    id: profile2.sub,
                    name: profile2.name,
                    email: profile2.email,
                    picture: {
                        data: {
                            url: profile2.picture,
                            height: 100,
                            width: 100,
                            is_silhouette: false
                        }
                    }
                };
                const userMap2 = await options.mapProfileToUser?.({
                    ...user,
                    email_verified: true
                });
                return {
                    user: {
                        ...user,
                        emailVerified: true,
                        ...userMap2
                    },
                    data: profile2
                };
            }
            const fields = [
                "id",
                "name",
                "email",
                "picture",
                ...options?.fields || []
            ];
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])("https://graph.facebook.com/me?fields=" + fields.join(","), {
                auth: {
                    type: "Bearer",
                    token: token.accessToken
                }
            });
            if (error) {
                return null;
            }
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile.id,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture.data.url,
                    emailVerified: profile.email_verified,
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
const figma = (options)=>{
    return {
        id: "figma",
        name: "Figma",
        async createAuthorizationURL ({ state, scopes, codeVerifier, redirectURI }) {
            if (!options.clientId || !options.clientSecret) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error("Client Id and Client Secret are required for Figma. Make sure to provide them in the options.");
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BetterAuthError"]("CLIENT_ID_AND_SECRET_REQUIRED");
            }
            if (!codeVerifier) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BetterAuthError"]("codeVerifier is required for Figma");
            }
            const _scopes = options.disableDefaultScope ? [] : [
                "file_read"
            ];
            options.scope && _scopes.push(...options.scope);
            scopes && _scopes.push(...scopes);
            const url = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "figma",
                options,
                authorizationEndpoint: "https://www.figma.com/oauth",
                scopes: _scopes,
                state,
                codeVerifier,
                redirectURI
            });
            return url;
        },
        validateAuthorizationCode: async ({ code, codeVerifier, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                codeVerifier,
                redirectURI,
                options,
                tokenEndpoint: "https://www.figma.com/api/oauth/token"
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint: "https://www.figma.com/api/oauth/token"
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) {
                return options.getUserInfo(token);
            }
            try {
                const { data: profile } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])("https://api.figma.com/v1/me", {
                    headers: {
                        Authorization: `Bearer ${token.accessToken}`
                    }
                });
                if (!profile) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error("Failed to fetch user from Figma");
                    return null;
                }
                const userMap = await options.mapProfileToUser?.(profile);
                return {
                    user: {
                        id: profile.id,
                        name: profile.handle,
                        email: profile.email,
                        image: profile.img_url,
                        emailVerified: !!profile.email,
                        ...userMap
                    },
                    data: profile
                };
            } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error("Failed to fetch user info from Figma:", error);
                return null;
            }
        },
        options
    };
};
const github = (options)=>{
    const tokenEndpoint = "https://github.com/login/oauth/access_token";
    return {
        id: "github",
        name: "GitHub",
        createAuthorizationURL ({ state, scopes, loginHint, redirectURI }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "read:user",
                "user:email"
            ];
            options.scope && _scopes.push(...options.scope);
            scopes && _scopes.push(...scopes);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "github",
                options,
                authorizationEndpoint: "https://github.com/login/oauth/authorize",
                scopes: _scopes,
                state,
                redirectURI,
                loginHint,
                prompt: options.prompt
            });
        },
        validateAuthorizationCode: async ({ code, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                redirectURI,
                options,
                tokenEndpoint
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint: "https://github.com/login/oauth/access_token"
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) {
                return options.getUserInfo(token);
            }
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])("https://api.github.com/user", {
                headers: {
                    "User-Agent": "better-auth",
                    authorization: `Bearer ${token.accessToken}`
                }
            });
            if (error) {
                return null;
            }
            const { data: emails } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])("https://api.github.com/user/emails", {
                headers: {
                    Authorization: `Bearer ${token.accessToken}`,
                    "User-Agent": "better-auth"
                }
            });
            if (!profile.email && emails) {
                profile.email = (emails.find((e)=>e.primary) ?? emails[0])?.email;
            }
            const emailVerified = emails?.find((e)=>e.email === profile.email)?.verified ?? false;
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile.id,
                    name: profile.name || profile.login,
                    email: profile.email,
                    image: profile.avatar_url,
                    emailVerified,
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
const google = (options)=>{
    return {
        id: "google",
        name: "Google",
        async createAuthorizationURL ({ state, scopes, codeVerifier, redirectURI, loginHint, display }) {
            if (!options.clientId || !options.clientSecret) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error("Client Id and Client Secret is required for Google. Make sure to provide them in the options.");
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BetterAuthError"]("CLIENT_ID_AND_SECRET_REQUIRED");
            }
            if (!codeVerifier) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BetterAuthError"]("codeVerifier is required for Google");
            }
            const _scopes = options.disableDefaultScope ? [] : [
                "email",
                "profile",
                "openid"
            ];
            options.scope && _scopes.push(...options.scope);
            scopes && _scopes.push(...scopes);
            const url = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "google",
                options,
                authorizationEndpoint: "https://accounts.google.com/o/oauth2/auth",
                scopes: _scopes,
                state,
                codeVerifier,
                redirectURI,
                prompt: options.prompt,
                accessType: options.accessType,
                display: display || options.display,
                loginHint,
                hd: options.hd,
                additionalParams: {
                    include_granted_scopes: "true"
                }
            });
            return url;
        },
        validateAuthorizationCode: async ({ code, codeVerifier, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                codeVerifier,
                redirectURI,
                options,
                tokenEndpoint: "https://oauth2.googleapis.com/token"
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint: "https://www.googleapis.com/oauth2/v4/token"
            });
        },
        async verifyIdToken (token, nonce) {
            if (options.disableIdTokenSignIn) {
                return false;
            }
            if (options.verifyIdToken) {
                return options.verifyIdToken(token, nonce);
            }
            const googlePublicKeyUrl = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`;
            const { data: tokenInfo } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])(googlePublicKeyUrl);
            if (!tokenInfo) {
                return false;
            }
            const isValid = tokenInfo.aud === options.clientId && (tokenInfo.iss === "https://accounts.google.com" || tokenInfo.iss === "accounts.google.com");
            return isValid;
        },
        async getUserInfo (token) {
            if (options.getUserInfo) {
                return options.getUserInfo(token);
            }
            if (!token.idToken) {
                return null;
            }
            const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$1$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodeJwt"])(token.idToken);
            const userMap = await options.mapProfileToUser?.(user);
            return {
                user: {
                    id: user.sub,
                    name: user.name,
                    email: user.email,
                    image: user.picture,
                    emailVerified: user.email_verified,
                    ...userMap
                },
                data: user
            };
        },
        options
    };
};
const kick = (options)=>{
    return {
        id: "kick",
        name: "Kick",
        createAuthorizationURL ({ state, scopes, redirectURI, codeVerifier }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "user:read"
            ];
            options.scope && _scopes.push(...options.scope);
            scopes && _scopes.push(...scopes);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "kick",
                redirectURI,
                options,
                authorizationEndpoint: "https://id.kick.com/oauth/authorize",
                scopes: _scopes,
                codeVerifier,
                state
            });
        },
        async validateAuthorizationCode ({ code, redirectURI, codeVerifier }) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                redirectURI,
                options,
                tokenEndpoint: "https://id.kick.com/oauth/token",
                codeVerifier
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) {
                return options.getUserInfo(token);
            }
            const { data, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])("https://api.kick.com/public/v1/users", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token.accessToken}`
                }
            });
            if (error) {
                return null;
            }
            const profile = data.data[0];
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile.user_id,
                    name: profile.name,
                    email: profile.email,
                    image: profile.profile_picture,
                    emailVerified: true,
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
const huggingface = (options)=>{
    return {
        id: "huggingface",
        name: "Hugging Face",
        createAuthorizationURL ({ state, scopes, codeVerifier, redirectURI }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "openid",
                "profile",
                "email"
            ];
            options.scope && _scopes.push(...options.scope);
            scopes && _scopes.push(...scopes);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "huggingface",
                options,
                authorizationEndpoint: "https://huggingface.co/oauth/authorize",
                scopes: _scopes,
                state,
                codeVerifier,
                redirectURI
            });
        },
        validateAuthorizationCode: async ({ code, codeVerifier, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                codeVerifier,
                redirectURI,
                options,
                tokenEndpoint: "https://huggingface.co/oauth/token"
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint: "https://huggingface.co/oauth/token"
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) {
                return options.getUserInfo(token);
            }
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])("https://huggingface.co/oauth/userinfo", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token.accessToken}`
                }
            });
            if (error) {
                return null;
            }
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile.sub,
                    name: profile.name || profile.preferred_username,
                    email: profile.email,
                    image: profile.picture,
                    emailVerified: profile.email_verified ?? false,
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
const microsoft = (options)=>{
    const tenant = options.tenantId || "common";
    const authority = options.authority || "https://login.microsoftonline.com";
    const authorizationEndpoint = `${authority}/${tenant}/oauth2/v2.0/authorize`;
    const tokenEndpoint = `${authority}/${tenant}/oauth2/v2.0/token`;
    return {
        id: "microsoft",
        name: "Microsoft EntraID",
        createAuthorizationURL (data) {
            const scopes = options.disableDefaultScope ? [] : [
                "openid",
                "profile",
                "email",
                "User.Read",
                "offline_access"
            ];
            options.scope && scopes.push(...options.scope);
            data.scopes && scopes.push(...data.scopes);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "microsoft",
                options,
                authorizationEndpoint,
                state: data.state,
                codeVerifier: data.codeVerifier,
                scopes,
                redirectURI: data.redirectURI,
                prompt: options.prompt,
                loginHint: data.loginHint
            });
        },
        validateAuthorizationCode ({ code, codeVerifier, redirectURI }) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                codeVerifier,
                redirectURI,
                options,
                tokenEndpoint
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) {
                return options.getUserInfo(token);
            }
            if (!token.idToken) {
                return null;
            }
            const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$1$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodeJwt"])(token.idToken);
            const profilePhotoSize = options.profilePhotoSize || 48;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])(`https://graph.microsoft.com/v1.0/me/photos/${profilePhotoSize}x${profilePhotoSize}/$value`, {
                headers: {
                    Authorization: `Bearer ${token.accessToken}`
                },
                async onResponse (context) {
                    if (options.disableProfilePhoto || !context.response.ok) {
                        return;
                    }
                    try {
                        const response = context.response.clone();
                        const pictureBuffer = await response.arrayBuffer();
                        const pictureBase64 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["base64"].encode(pictureBuffer);
                        user.picture = `data:image/jpeg;base64, ${pictureBase64}`;
                    } catch (e) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error(e && typeof e === "object" && "name" in e ? e.name : "", e);
                    }
                }
            });
            const userMap = await options.mapProfileToUser?.(user);
            return {
                user: {
                    id: user.sub,
                    name: user.name,
                    email: user.email,
                    image: user.picture,
                    emailVerified: true,
                    ...userMap
                },
                data: user
            };
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            const scopes = options.disableDefaultScope ? [] : [
                "openid",
                "profile",
                "email",
                "User.Read",
                "offline_access"
            ];
            options.scope && scopes.push(...options.scope);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientSecret: options.clientSecret
                },
                extraParams: {
                    scope: scopes.join(" ")
                },
                tokenEndpoint
            });
        },
        options
    };
};
const slack = (options)=>{
    return {
        id: "slack",
        name: "Slack",
        createAuthorizationURL ({ state, scopes, redirectURI }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "openid",
                "profile",
                "email"
            ];
            scopes && _scopes.push(...scopes);
            options.scope && _scopes.push(...options.scope);
            const url = new URL("https://slack.com/openid/connect/authorize");
            url.searchParams.set("scope", _scopes.join(" "));
            url.searchParams.set("response_type", "code");
            url.searchParams.set("client_id", options.clientId);
            url.searchParams.set("redirect_uri", options.redirectURI || redirectURI);
            url.searchParams.set("state", state);
            return url;
        },
        validateAuthorizationCode: async ({ code, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                redirectURI,
                options,
                tokenEndpoint: "https://slack.com/api/openid.connect.token"
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint: "https://slack.com/api/openid.connect.token"
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) {
                return options.getUserInfo(token);
            }
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])("https://slack.com/api/openid.connect.userInfo", {
                headers: {
                    authorization: `Bearer ${token.accessToken}`
                }
            });
            if (error) {
                return null;
            }
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile["https://slack.com/user_id"],
                    name: profile.name || "",
                    email: profile.email,
                    emailVerified: profile.email_verified,
                    image: profile.picture || profile["https://slack.com/user_image_512"],
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
const notion = (options)=>{
    const tokenEndpoint = "https://api.notion.com/v1/oauth/token";
    return {
        id: "notion",
        name: "Notion",
        createAuthorizationURL ({ state, scopes, loginHint, redirectURI }) {
            const _scopes = options.disableDefaultScope ? [] : [];
            options.scope && _scopes.push(...options.scope);
            scopes && _scopes.push(...scopes);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "notion",
                options,
                authorizationEndpoint: "https://api.notion.com/v1/oauth/authorize",
                scopes: _scopes,
                state,
                redirectURI,
                loginHint,
                additionalParams: {
                    owner: "user"
                }
            });
        },
        validateAuthorizationCode: async ({ code, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                redirectURI,
                options,
                tokenEndpoint,
                authentication: "basic"
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) {
                return options.getUserInfo(token);
            }
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])("https://api.notion.com/v1/users/me", {
                headers: {
                    Authorization: `Bearer ${token.accessToken}`,
                    "Notion-Version": "2022-06-28"
                }
            });
            if (error || !profile) {
                return null;
            }
            const userProfile = profile.bot?.owner?.user;
            if (!userProfile) {
                return null;
            }
            const userMap = await options.mapProfileToUser?.(userProfile);
            return {
                user: {
                    id: userProfile.id,
                    name: userProfile.name || "Notion User",
                    email: userProfile.person?.email || null,
                    image: userProfile.avatar_url,
                    emailVerified: !!userProfile.person?.email,
                    ...userMap
                },
                data: userProfile
            };
        },
        options
    };
};
const spotify = (options)=>{
    return {
        id: "spotify",
        name: "Spotify",
        createAuthorizationURL ({ state, scopes, codeVerifier, redirectURI }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "user-read-email"
            ];
            options.scope && _scopes.push(...options.scope);
            scopes && _scopes.push(...scopes);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "spotify",
                options,
                authorizationEndpoint: "https://accounts.spotify.com/authorize",
                scopes: _scopes,
                state,
                codeVerifier,
                redirectURI
            });
        },
        validateAuthorizationCode: async ({ code, codeVerifier, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                codeVerifier,
                redirectURI,
                options,
                tokenEndpoint: "https://accounts.spotify.com/api/token"
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint: "https://accounts.spotify.com/api/token"
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) {
                return options.getUserInfo(token);
            }
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])("https://api.spotify.com/v1/me", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token.accessToken}`
                }
            });
            if (error) {
                return null;
            }
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile.id,
                    name: profile.display_name,
                    email: profile.email,
                    image: profile.images[0]?.url,
                    emailVerified: false,
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
const twitch = (options)=>{
    return {
        id: "twitch",
        name: "Twitch",
        createAuthorizationURL ({ state, scopes, redirectURI }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "user:read:email",
                "openid"
            ];
            options.scope && _scopes.push(...options.scope);
            scopes && _scopes.push(...scopes);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "twitch",
                redirectURI,
                options,
                authorizationEndpoint: "https://id.twitch.tv/oauth2/authorize",
                scopes: _scopes,
                state,
                claims: options.claims || [
                    "email",
                    "email_verified",
                    "preferred_username",
                    "picture"
                ]
            });
        },
        validateAuthorizationCode: async ({ code, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                redirectURI,
                options,
                tokenEndpoint: "https://id.twitch.tv/oauth2/token"
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint: "https://id.twitch.tv/oauth2/token"
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) {
                return options.getUserInfo(token);
            }
            const idToken = token.idToken;
            if (!idToken) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error("No idToken found in token");
                return null;
            }
            const profile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$1$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodeJwt"])(idToken);
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile.sub,
                    name: profile.preferred_username,
                    email: profile.email,
                    image: profile.picture,
                    emailVerified: profile.email_verified,
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
const twitter = (options)=>{
    return {
        id: "twitter",
        name: "Twitter",
        createAuthorizationURL (data) {
            const _scopes = options.disableDefaultScope ? [] : [
                "users.read",
                "tweet.read",
                "offline.access",
                "users.email"
            ];
            options.scope && _scopes.push(...options.scope);
            data.scopes && _scopes.push(...data.scopes);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "twitter",
                options,
                authorizationEndpoint: "https://x.com/i/oauth2/authorize",
                scopes: _scopes,
                state: data.state,
                codeVerifier: data.codeVerifier,
                redirectURI: data.redirectURI
            });
        },
        validateAuthorizationCode: async ({ code, codeVerifier, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                codeVerifier,
                authentication: "basic",
                redirectURI,
                options,
                tokenEndpoint: "https://api.x.com/2/oauth2/token"
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                authentication: "basic",
                tokenEndpoint: "https://api.x.com/2/oauth2/token"
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) {
                return options.getUserInfo(token);
            }
            const { data: profile, error: profileError } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])("https://api.x.com/2/users/me?user.fields=profile_image_url", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token.accessToken}`
                }
            });
            if (profileError) {
                return null;
            }
            const { data: emailData, error: emailError } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])("https://api.x.com/2/users/me?user.fields=confirmed_email", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token.accessToken}`
                }
            });
            let emailVerified = false;
            if (!emailError && emailData?.data?.confirmed_email) {
                profile.data.email = emailData.data.confirmed_email;
                emailVerified = true;
            }
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile.data.id,
                    name: profile.data.name,
                    email: profile.data.email || profile.data.username || null,
                    image: profile.data.profile_image_url,
                    emailVerified,
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
const dropbox = (options)=>{
    const tokenEndpoint = "https://api.dropboxapi.com/oauth2/token";
    return {
        id: "dropbox",
        name: "Dropbox",
        createAuthorizationURL: async ({ state, scopes, codeVerifier, redirectURI })=>{
            const _scopes = options.disableDefaultScope ? [] : [
                "account_info.read"
            ];
            options.scope && _scopes.push(...options.scope);
            scopes && _scopes.push(...scopes);
            const additionalParams = {};
            if (options.accessType) {
                additionalParams.token_access_type = options.accessType;
            }
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "dropbox",
                options,
                authorizationEndpoint: "https://www.dropbox.com/oauth2/authorize",
                scopes: _scopes,
                state,
                redirectURI,
                codeVerifier,
                additionalParams
            });
        },
        validateAuthorizationCode: async ({ code, codeVerifier, redirectURI })=>{
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                codeVerifier,
                redirectURI,
                options,
                tokenEndpoint
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint: "https://api.dropbox.com/oauth2/token"
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) {
                return options.getUserInfo(token);
            }
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])("https://api.dropboxapi.com/2/users/get_current_account", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token.accessToken}`
                }
            });
            if (error) {
                return null;
            }
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile.account_id,
                    name: profile.name?.display_name,
                    email: profile.email,
                    emailVerified: profile.email_verified || false,
                    image: profile.profile_photo_url,
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
const linear = (options)=>{
    const tokenEndpoint = "https://api.linear.app/oauth/token";
    return {
        id: "linear",
        name: "Linear",
        createAuthorizationURL ({ state, scopes, loginHint, redirectURI }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "read"
            ];
            options.scope && _scopes.push(...options.scope);
            scopes && _scopes.push(...scopes);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "linear",
                options,
                authorizationEndpoint: "https://linear.app/oauth/authorize",
                scopes: _scopes,
                state,
                redirectURI,
                loginHint
            });
        },
        validateAuthorizationCode: async ({ code, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                redirectURI,
                options,
                tokenEndpoint
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) {
                return options.getUserInfo(token);
            }
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])("https://api.linear.app/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token.accessToken}`
                },
                body: JSON.stringify({
                    query: `
							query {
								viewer {
									id
									name
									email
									avatarUrl
									active
									createdAt
									updatedAt
								}
							}
						`
                })
            });
            if (error || !profile?.data?.viewer) {
                return null;
            }
            const userData = profile.data.viewer;
            const userMap = await options.mapProfileToUser?.(userData);
            return {
                user: {
                    id: profile.data.viewer.id,
                    name: profile.data.viewer.name,
                    email: profile.data.viewer.email,
                    image: profile.data.viewer.avatarUrl,
                    emailVerified: true,
                    ...userMap
                },
                data: userData
            };
        },
        options
    };
};
const linkedin = (options)=>{
    const authorizationEndpoint = "https://www.linkedin.com/oauth/v2/authorization";
    const tokenEndpoint = "https://www.linkedin.com/oauth/v2/accessToken";
    return {
        id: "linkedin",
        name: "Linkedin",
        createAuthorizationURL: async ({ state, scopes, redirectURI, loginHint })=>{
            const _scopes = options.disableDefaultScope ? [] : [
                "profile",
                "email",
                "openid"
            ];
            options.scope && _scopes.push(...options.scope);
            scopes && _scopes.push(...scopes);
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "linkedin",
                options,
                authorizationEndpoint,
                scopes: _scopes,
                state,
                loginHint,
                redirectURI
            });
        },
        validateAuthorizationCode: async ({ code, redirectURI })=>{
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                redirectURI,
                options,
                tokenEndpoint
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) {
                return options.getUserInfo(token);
            }
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])("https://api.linkedin.com/v2/userinfo", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token.accessToken}`
                }
            });
            if (error) {
                return null;
            }
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    emailVerified: profile.email_verified || false,
                    image: profile.picture,
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
const cleanDoubleSlashes = (input = "")=>{
    return input.split("://").map((str)=>str.replace(/\/{2,}/g, "/")).join("://");
};
const issuerToEndpoints = (issuer)=>{
    let baseUrl = issuer || "https://gitlab.com";
    return {
        authorizationEndpoint: cleanDoubleSlashes(`${baseUrl}/oauth/authorize`),
        tokenEndpoint: cleanDoubleSlashes(`${baseUrl}/oauth/token`),
        userinfoEndpoint: cleanDoubleSlashes(`${baseUrl}/api/v4/user`)
    };
};
const gitlab = (options)=>{
    const { authorizationEndpoint, tokenEndpoint, userinfoEndpoint } = issuerToEndpoints(options.issuer);
    const issuerId = "gitlab";
    const issuerName = "Gitlab";
    return {
        id: issuerId,
        name: issuerName,
        createAuthorizationURL: async ({ state, scopes, codeVerifier, loginHint, redirectURI })=>{
            const _scopes = options.disableDefaultScope ? [] : [
                "read_user"
            ];
            options.scope && _scopes.push(...options.scope);
            scopes && _scopes.push(...scopes);
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: issuerId,
                options,
                authorizationEndpoint,
                scopes: _scopes,
                state,
                redirectURI,
                codeVerifier,
                loginHint
            });
        },
        validateAuthorizationCode: async ({ code, redirectURI, codeVerifier })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                redirectURI,
                options,
                codeVerifier,
                tokenEndpoint
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) {
                return options.getUserInfo(token);
            }
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])(userinfoEndpoint, {
                headers: {
                    authorization: `Bearer ${token.accessToken}`
                }
            });
            if (error || profile.state !== "active" || profile.locked) {
                return null;
            }
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile.id,
                    name: profile.name ?? profile.username,
                    email: profile.email,
                    image: profile.avatar_url,
                    emailVerified: true,
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
const tiktok = (options)=>{
    return {
        id: "tiktok",
        name: "TikTok",
        createAuthorizationURL ({ state, scopes, redirectURI }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "user.info.profile"
            ];
            options.scope && _scopes.push(...options.scope);
            scopes && _scopes.push(...scopes);
            return new URL(`https://www.tiktok.com/v2/auth/authorize?scope=${_scopes.join(",")}&response_type=code&client_key=${options.clientKey}&redirect_uri=${encodeURIComponent(options.redirectURI || redirectURI)}&state=${state}`);
        },
        validateAuthorizationCode: async ({ code, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                redirectURI: options.redirectURI || redirectURI,
                options: {
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint: "https://open.tiktokapis.com/v2/oauth/token/"
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientSecret: options.clientSecret
                },
                tokenEndpoint: "https://open.tiktokapis.com/v2/oauth/token/",
                authentication: "post",
                extraParams: {
                    client_key: options.clientKey
                }
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) {
                return options.getUserInfo(token);
            }
            const fields = [
                "open_id",
                "avatar_large_url",
                "display_name",
                "username"
            ];
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])(`https://open.tiktokapis.com/v2/user/info/?fields=${fields.join(",")}`, {
                headers: {
                    authorization: `Bearer ${token.accessToken}`
                }
            });
            if (error) {
                return null;
            }
            return {
                user: {
                    email: profile.data.user.email || profile.data.user.username,
                    id: profile.data.user.open_id,
                    name: profile.data.user.display_name || profile.data.user.username,
                    image: profile.data.user.avatar_large_url,
                    /** @note Tiktok does not provide emailVerified or even email*/ emailVerified: profile.data.user.email ? true : false
                },
                data: profile
            };
        },
        options
    };
};
const reddit = (options)=>{
    return {
        id: "reddit",
        name: "Reddit",
        createAuthorizationURL ({ state, scopes, redirectURI }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "identity"
            ];
            options.scope && _scopes.push(...options.scope);
            scopes && _scopes.push(...scopes);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "reddit",
                options,
                authorizationEndpoint: "https://www.reddit.com/api/v1/authorize",
                scopes: _scopes,
                state,
                redirectURI,
                duration: options.duration
            });
        },
        validateAuthorizationCode: async ({ code, redirectURI })=>{
            const body = new URLSearchParams({
                grant_type: "authorization_code",
                code,
                redirect_uri: options.redirectURI || redirectURI
            });
            const headers = {
                "content-type": "application/x-www-form-urlencoded",
                accept: "text/plain",
                "user-agent": "better-auth",
                Authorization: `Basic ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["base64"].encode(`${options.clientId}:${options.clientSecret}`)}`
            };
            const { data, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])("https://www.reddit.com/api/v1/access_token", {
                method: "POST",
                headers,
                body: body.toString()
            });
            if (error) {
                throw error;
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getOAuth2Tokens"])(data);
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                authentication: "basic",
                tokenEndpoint: "https://www.reddit.com/api/v1/access_token"
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) {
                return options.getUserInfo(token);
            }
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])("https://oauth.reddit.com/api/v1/me", {
                headers: {
                    Authorization: `Bearer ${token.accessToken}`,
                    "User-Agent": "better-auth"
                }
            });
            if (error) {
                return null;
            }
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile.id,
                    name: profile.name,
                    email: profile.oauth_client_id,
                    emailVerified: profile.has_verified_email,
                    image: profile.icon_img?.split("?")[0],
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
const roblox = (options)=>{
    return {
        id: "roblox",
        name: "Roblox",
        createAuthorizationURL ({ state, scopes, redirectURI }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "openid",
                "profile"
            ];
            options.scope && _scopes.push(...options.scope);
            scopes && _scopes.push(...scopes);
            return new URL(`https://apis.roblox.com/oauth/v1/authorize?scope=${_scopes.join("+")}&response_type=code&client_id=${options.clientId}&redirect_uri=${encodeURIComponent(options.redirectURI || redirectURI)}&state=${state}&prompt=${options.prompt || "select_account consent"}`);
        },
        validateAuthorizationCode: async ({ code, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                redirectURI: options.redirectURI || redirectURI,
                options,
                tokenEndpoint: "https://apis.roblox.com/oauth/v1/token",
                authentication: "post"
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint: "https://apis.roblox.com/oauth/v1/token"
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) {
                return options.getUserInfo(token);
            }
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])("https://apis.roblox.com/oauth/v1/userinfo", {
                headers: {
                    authorization: `Bearer ${token.accessToken}`
                }
            });
            if (error) {
                return null;
            }
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile.sub,
                    name: profile.nickname || profile.preferred_username || "",
                    image: profile.picture,
                    email: profile.preferred_username || null,
                    // Roblox does not provide email
                    emailVerified: true,
                    ...userMap
                },
                data: {
                    ...profile
                }
            };
        },
        options
    };
};
const salesforce = (options)=>{
    const environment = options.environment ?? "production";
    const isSandbox = environment === "sandbox";
    const authorizationEndpoint = options.loginUrl ? `https://${options.loginUrl}/services/oauth2/authorize` : isSandbox ? "https://test.salesforce.com/services/oauth2/authorize" : "https://login.salesforce.com/services/oauth2/authorize";
    const tokenEndpoint = options.loginUrl ? `https://${options.loginUrl}/services/oauth2/token` : isSandbox ? "https://test.salesforce.com/services/oauth2/token" : "https://login.salesforce.com/services/oauth2/token";
    const userInfoEndpoint = options.loginUrl ? `https://${options.loginUrl}/services/oauth2/userinfo` : isSandbox ? "https://test.salesforce.com/services/oauth2/userinfo" : "https://login.salesforce.com/services/oauth2/userinfo";
    return {
        id: "salesforce",
        name: "Salesforce",
        async createAuthorizationURL ({ state, scopes, codeVerifier, redirectURI }) {
            if (!options.clientId || !options.clientSecret) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error("Client Id and Client Secret are required for Salesforce. Make sure to provide them in the options.");
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BetterAuthError"]("CLIENT_ID_AND_SECRET_REQUIRED");
            }
            if (!codeVerifier) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BetterAuthError"]("codeVerifier is required for Salesforce");
            }
            const _scopes = options.disableDefaultScope ? [] : [
                "openid",
                "email",
                "profile"
            ];
            options.scope && _scopes.push(...options.scope);
            scopes && _scopes.push(...scopes);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "salesforce",
                options,
                authorizationEndpoint,
                scopes: _scopes,
                state,
                codeVerifier,
                redirectURI: options.redirectURI || redirectURI
            });
        },
        validateAuthorizationCode: async ({ code, codeVerifier, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                codeVerifier,
                redirectURI: options.redirectURI || redirectURI,
                options,
                tokenEndpoint
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) {
                return options.getUserInfo(token);
            }
            try {
                const { data: user } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])(userInfoEndpoint, {
                    headers: {
                        Authorization: `Bearer ${token.accessToken}`
                    }
                });
                if (!user) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error("Failed to fetch user info from Salesforce");
                    return null;
                }
                const userMap = await options.mapProfileToUser?.(user);
                return {
                    user: {
                        id: user.user_id,
                        name: user.name,
                        email: user.email,
                        image: user.photos?.picture || user.photos?.thumbnail,
                        emailVerified: user.email_verified ?? false,
                        ...userMap
                    },
                    data: user
                };
            } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error("Failed to fetch user info from Salesforce:", error);
                return null;
            }
        },
        options
    };
};
const vk = (options)=>{
    return {
        id: "vk",
        name: "VK",
        async createAuthorizationURL ({ state, scopes, codeVerifier, redirectURI }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "email",
                "phone"
            ];
            options.scope && _scopes.push(...options.scope);
            scopes && _scopes.push(...scopes);
            const authorizationEndpoint = "https://id.vk.com/authorize";
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "vk",
                options,
                authorizationEndpoint,
                scopes: _scopes,
                state,
                redirectURI,
                codeVerifier
            });
        },
        validateAuthorizationCode: async ({ code, codeVerifier, redirectURI, deviceId })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                codeVerifier,
                redirectURI: options.redirectURI || redirectURI,
                options,
                deviceId,
                tokenEndpoint: "https://id.vk.com/oauth2/auth"
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint: "https://id.vk.com/oauth2/auth"
            });
        },
        async getUserInfo (data) {
            if (options.getUserInfo) {
                return options.getUserInfo(data);
            }
            if (!data.accessToken) {
                return null;
            }
            const formBody = new URLSearchParams({
                access_token: data.accessToken,
                client_id: options.clientId
            }).toString();
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])("https://id.vk.com/oauth2/user_info", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: formBody
            });
            if (error) {
                return null;
            }
            if (!profile.user.email) {
                return null;
            }
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile.user.user_id,
                    first_name: profile.user.first_name,
                    last_name: profile.user.last_name,
                    email: profile.user.email,
                    image: profile.user.avatar,
                    /** @note VK does not provide emailVerified*/ emailVerified: !!profile.user.email,
                    birthday: profile.user.birthday,
                    sex: profile.user.sex,
                    name: `${profile.user.first_name} ${profile.user.last_name}`,
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
const zoom = (userOptions)=>{
    const options = {
        pkce: true,
        ...userOptions
    };
    return {
        id: "zoom",
        name: "Zoom",
        createAuthorizationURL: async ({ state, redirectURI, codeVerifier })=>{
            const params = new URLSearchParams({
                response_type: "code",
                redirect_uri: options.redirectURI ? options.redirectURI : redirectURI,
                client_id: options.clientId,
                state
            });
            if (options.pkce) {
                const codeChallenge = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateCodeChallenge"])(codeVerifier);
                params.set("code_challenge_method", "S256");
                params.set("code_challenge", codeChallenge);
            }
            const url = new URL("https://zoom.us/oauth/authorize");
            url.search = params.toString();
            return url;
        },
        validateAuthorizationCode: async ({ code, redirectURI, codeVerifier })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                redirectURI: options.redirectURI || redirectURI,
                codeVerifier,
                options,
                tokenEndpoint: "https://zoom.us/oauth/token",
                authentication: "post"
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) {
                return options.getUserInfo(token);
            }
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])("https://api.zoom.us/v2/users/me", {
                headers: {
                    authorization: `Bearer ${token.accessToken}`
                }
            });
            if (error) {
                return null;
            }
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile.id,
                    name: profile.display_name,
                    image: profile.pic_url,
                    email: profile.email,
                    emailVerified: Boolean(profile.verified),
                    ...userMap
                },
                data: {
                    ...profile
                }
            };
        }
    };
};
const kakao = (options)=>{
    return {
        id: "kakao",
        name: "Kakao",
        createAuthorizationURL ({ state, scopes, redirectURI }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "account_email",
                "profile_image",
                "profile_nickname"
            ];
            options.scope && _scopes.push(...options.scope);
            scopes && _scopes.push(...scopes);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "kakao",
                options,
                authorizationEndpoint: "https://kauth.kakao.com/oauth/authorize",
                scopes: _scopes,
                state,
                redirectURI
            });
        },
        validateAuthorizationCode: async ({ code, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                redirectURI,
                options,
                tokenEndpoint: "https://kauth.kakao.com/oauth/token"
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint: "https://kauth.kakao.com/oauth/token"
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) {
                return options.getUserInfo(token);
            }
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])("https://kapi.kakao.com/v2/user/me", {
                headers: {
                    Authorization: `Bearer ${token.accessToken}`
                }
            });
            if (error || !profile) {
                return null;
            }
            const userMap = await options.mapProfileToUser?.(profile);
            const account = profile.kakao_account || {};
            const kakaoProfile = account.profile || {};
            const user = {
                id: String(profile.id),
                name: kakaoProfile.nickname || account.name || void 0,
                email: account.email,
                image: kakaoProfile.profile_image_url || kakaoProfile.thumbnail_image_url,
                emailVerified: !!account.is_email_valid && !!account.is_email_verified,
                ...userMap
            };
            return {
                user,
                data: profile
            };
        },
        options
    };
};
const naver = (options)=>{
    return {
        id: "naver",
        name: "Naver",
        createAuthorizationURL ({ state, scopes, redirectURI }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "profile",
                "email"
            ];
            options.scope && _scopes.push(...options.scope);
            scopes && _scopes.push(...scopes);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "naver",
                options,
                authorizationEndpoint: "https://nid.naver.com/oauth2.0/authorize",
                scopes: _scopes,
                state,
                redirectURI
            });
        },
        validateAuthorizationCode: async ({ code, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                redirectURI,
                options,
                tokenEndpoint: "https://nid.naver.com/oauth2.0/token"
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint: "https://nid.naver.com/oauth2.0/token"
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) {
                return options.getUserInfo(token);
            }
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])("https://openapi.naver.com/v1/nid/me", {
                headers: {
                    Authorization: `Bearer ${token.accessToken}`
                }
            });
            if (error || !profile || profile.resultcode !== "00") {
                return null;
            }
            const userMap = await options.mapProfileToUser?.(profile);
            const res = profile.response || {};
            const user = {
                id: res.id,
                name: res.name || res.nickname,
                email: res.email,
                image: res.profile_image,
                emailVerified: false,
                ...userMap
            };
            return {
                user,
                data: profile
            };
        },
        options
    };
};
const line = (options)=>{
    const authorizationEndpoint = "https://access.line.me/oauth2/v2.1/authorize";
    const tokenEndpoint = "https://api.line.me/oauth2/v2.1/token";
    const userInfoEndpoint = "https://api.line.me/oauth2/v2.1/userinfo";
    const verifyIdTokenEndpoint = "https://api.line.me/oauth2/v2.1/verify";
    return {
        id: "line",
        name: "LINE",
        async createAuthorizationURL ({ state, scopes, codeVerifier, redirectURI, loginHint }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "openid",
                "profile",
                "email"
            ];
            options.scope && _scopes.push(...options.scope);
            scopes && _scopes.push(...scopes);
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "line",
                options,
                authorizationEndpoint,
                scopes: _scopes,
                state,
                codeVerifier,
                redirectURI,
                loginHint
            });
        },
        validateAuthorizationCode: async ({ code, codeVerifier, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                codeVerifier,
                redirectURI,
                options,
                tokenEndpoint
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint
            });
        },
        async verifyIdToken (token, nonce) {
            if (options.disableIdTokenSignIn) {
                return false;
            }
            if (options.verifyIdToken) {
                return options.verifyIdToken(token, nonce);
            }
            const body = new URLSearchParams();
            body.set("id_token", token);
            body.set("client_id", options.clientId);
            if (nonce) body.set("nonce", nonce);
            const { data, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])(verifyIdTokenEndpoint, {
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                body
            });
            if (error || !data) {
                return false;
            }
            if (data.aud !== options.clientId) return false;
            if (nonce && data.nonce && data.nonce !== nonce) return false;
            return true;
        },
        async getUserInfo (token) {
            if (options.getUserInfo) {
                return options.getUserInfo(token);
            }
            let profile = null;
            if (token.idToken) {
                try {
                    profile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$1$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodeJwt"])(token.idToken);
                } catch  {}
            }
            if (!profile) {
                const { data } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])(userInfoEndpoint, {
                    headers: {
                        authorization: `Bearer ${token.accessToken}`
                    }
                });
                profile = data || null;
            }
            if (!profile) return null;
            const userMap = await options.mapProfileToUser?.(profile);
            const id = profile.sub || profile.userId;
            const name = profile.name || profile.displayName;
            const image = profile.picture || profile.pictureUrl || void 0;
            const email = profile.email;
            return {
                user: {
                    id,
                    name,
                    email,
                    image,
                    // LINE does not expose email verification status in ID token/userinfo
                    emailVerified: false,
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
const paypal = (options)=>{
    const environment = options.environment || "sandbox";
    const isSandbox = environment === "sandbox";
    const authorizationEndpoint = isSandbox ? "https://www.sandbox.paypal.com/signin/authorize" : "https://www.paypal.com/signin/authorize";
    const tokenEndpoint = isSandbox ? "https://api-m.sandbox.paypal.com/v1/oauth2/token" : "https://api-m.paypal.com/v1/oauth2/token";
    const userInfoEndpoint = isSandbox ? "https://api-m.sandbox.paypal.com/v1/identity/oauth2/userinfo" : "https://api-m.paypal.com/v1/identity/oauth2/userinfo";
    return {
        id: "paypal",
        name: "PayPal",
        async createAuthorizationURL ({ state, codeVerifier, redirectURI }) {
            if (!options.clientId || !options.clientSecret) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error("Client Id and Client Secret is required for PayPal. Make sure to provide them in the options.");
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BetterAuthError"]("CLIENT_ID_AND_SECRET_REQUIRED");
            }
            const _scopes = [];
            const url = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "paypal",
                options,
                authorizationEndpoint,
                scopes: _scopes,
                state,
                codeVerifier,
                redirectURI,
                prompt: options.prompt
            });
            return url;
        },
        validateAuthorizationCode: async ({ code, redirectURI })=>{
            const credentials = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["base64"].encode(`${options.clientId}:${options.clientSecret}`);
            try {
                const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])(tokenEndpoint, {
                    method: "POST",
                    headers: {
                        Authorization: `Basic ${credentials}`,
                        Accept: "application/json",
                        "Accept-Language": "en_US",
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: new URLSearchParams({
                        grant_type: "authorization_code",
                        code,
                        redirect_uri: redirectURI
                    }).toString()
                });
                if (!response.data) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BetterAuthError"]("FAILED_TO_GET_ACCESS_TOKEN");
                }
                const data = response.data;
                const result = {
                    accessToken: data.access_token,
                    refreshToken: data.refresh_token,
                    accessTokenExpiresAt: data.expires_in ? new Date(Date.now() + data.expires_in * 1e3) : void 0,
                    idToken: data.id_token
                };
                return result;
            } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error("PayPal token exchange failed:", error);
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BetterAuthError"]("FAILED_TO_GET_ACCESS_TOKEN");
            }
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            const credentials = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$utils$40$0$2e$3$2e$0$2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["base64"].encode(`${options.clientId}:${options.clientSecret}`);
            try {
                const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])(tokenEndpoint, {
                    method: "POST",
                    headers: {
                        Authorization: `Basic ${credentials}`,
                        Accept: "application/json",
                        "Accept-Language": "en_US",
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: new URLSearchParams({
                        grant_type: "refresh_token",
                        refresh_token: refreshToken
                    }).toString()
                });
                if (!response.data) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BetterAuthError"]("FAILED_TO_REFRESH_ACCESS_TOKEN");
                }
                const data = response.data;
                return {
                    accessToken: data.access_token,
                    refreshToken: data.refresh_token,
                    accessTokenExpiresAt: data.expires_in ? new Date(Date.now() + data.expires_in * 1e3) : void 0
                };
            } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error("PayPal token refresh failed:", error);
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BetterAuthError"]("FAILED_TO_REFRESH_ACCESS_TOKEN");
            }
        },
        async verifyIdToken (token, nonce) {
            if (options.disableIdTokenSignIn) {
                return false;
            }
            if (options.verifyIdToken) {
                return options.verifyIdToken(token, nonce);
            }
            try {
                const payload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$1$2e$1$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodeJwt"])(token);
                return !!payload.sub;
            } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error("Failed to verify PayPal ID token:", error);
                return false;
            }
        },
        async getUserInfo (token) {
            if (options.getUserInfo) {
                return options.getUserInfo(token);
            }
            if (!token.accessToken) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error("Access token is required to fetch PayPal user info");
                return null;
            }
            try {
                const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18$2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterFetch"])(`${userInfoEndpoint}?schema=paypalv1.1`, {
                    headers: {
                        Authorization: `Bearer ${token.accessToken}`,
                        Accept: "application/json"
                    }
                });
                if (!response.data) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error("Failed to fetch user info from PayPal");
                    return null;
                }
                const userInfo = response.data;
                const userMap = await options.mapProfileToUser?.(userInfo);
                const result = {
                    user: {
                        id: userInfo.user_id,
                        name: userInfo.name,
                        email: userInfo.email,
                        image: userInfo.picture,
                        emailVerified: userInfo.email_verified,
                        ...userMap
                    },
                    data: userInfo
                };
                return result;
            } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$better$2d$auth$2b$core$40$1$2e$3$2e$34_$40$better$2d$auth$2b$utils$40$0$2e$3$2e$0_$40$better$2d$fetch$2b$fetch$40$1$2e$1$2e$18_better$2d$cal_db66b900b6db39bb30fb7f6255297d28$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error("Failed to fetch user info from PayPal:", error);
                return null;
            }
        },
        options
    };
};
const socialProviders = {
    apple,
    atlassian,
    cognito,
    discord,
    facebook,
    figma,
    github,
    microsoft,
    google,
    huggingface,
    slack,
    spotify,
    twitch,
    twitter,
    dropbox,
    kick,
    linear,
    linkedin,
    gitlab,
    tiktok,
    reddit,
    roblox,
    salesforce,
    vk,
    zoom,
    notion,
    kakao,
    naver,
    line,
    paypal
};
const socialProviderList = Object.keys(socialProviders);
const SocialProviderListEnum = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["enum"](socialProviderList).or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]());
;
}),
"[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/db/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "accountSchema",
    ()=>accountSchema,
    "coreSchema",
    ()=>coreSchema,
    "rateLimitSchema",
    ()=>rateLimitSchema,
    "sessionSchema",
    ()=>sessionSchema,
    "userSchema",
    ()=>userSchema,
    "verificationSchema",
    ()=>verificationSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@4.1.12/node_modules/zod/v4/classic/schemas.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@4.1.12/node_modules/zod/v4/classic/external.js [app-route] (ecmascript)");
;
const coreSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"](),
    createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["date"]().default(()=>/* @__PURE__ */ new Date()),
    updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["date"]().default(()=>/* @__PURE__ */ new Date())
});
const userSchema = coreSchema.extend({
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().transform((val)=>val.toLowerCase()),
    emailVerified: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"]().default(false),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"](),
    image: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().nullish()
});
const accountSchema = coreSchema.extend({
    providerId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"](),
    accountId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"](),
    userId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["coerce"].string(),
    accessToken: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().nullish(),
    refreshToken: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().nullish(),
    idToken: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().nullish(),
    /**
   * Access token expires at
   */ accessTokenExpiresAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["date"]().nullish(),
    /**
   * Refresh token expires at
   */ refreshTokenExpiresAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["date"]().nullish(),
    /**
   * The scopes that the user has authorized
   */ scope: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().nullish(),
    /**
   * Password is only stored in the credential provider
   */ password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().nullish()
});
const sessionSchema = coreSchema.extend({
    userId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["coerce"].string(),
    expiresAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["date"](),
    token: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"](),
    ipAddress: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().nullish(),
    userAgent: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]().nullish()
});
const verificationSchema = coreSchema.extend({
    value: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"](),
    expiresAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["date"](),
    identifier: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"]()
});
const rateLimitSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"]({
    /**
   * The key to use for rate limiting
   */ key: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"](),
    /**
   * The number of requests made
   */ count: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["number"](),
    /**
   * The last request time in milliseconds
   */ lastRequest: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["number"]()
});
;
}),
"[project]/node_modules/.pnpm/@better-auth+core@1.3.34_@better-auth+utils@0.3.0_@better-fetch+fetch@1.1.18_better-cal_db66b900b6db39bb30fb7f6255297d28/node_modules/@better-auth/core/dist/db/adapter/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
}),
];

//# sourceMappingURL=b7729_%40better-auth_core_dist_d431acfc._.js.map