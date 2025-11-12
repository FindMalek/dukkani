module.exports = [
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/join-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./join-builder.d.ts" />
__turbopack_context__.s([
    "JoinBuilder",
    ()=>JoinBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$join$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/join-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$raw$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/raw-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/binary-operation-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
;
;
;
;
class JoinBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    on(...args) {
        return new JoinBuilder({
            ...this.#props,
            joinNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$join$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JoinNode"].cloneWithOn(this.#props.joinNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseValueBinaryOperationOrExpression"])(args))
        });
    }
    /**
     * Just like {@link WhereInterface.whereRef} but adds an item to the join's
     * `on` clause instead.
     *
     * See {@link WhereInterface.whereRef} for documentation and examples.
     */ onRef(lhs, op, rhs) {
        return new JoinBuilder({
            ...this.#props,
            joinNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$join$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JoinNode"].cloneWithOn(this.#props.joinNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseReferentialBinaryOperation"])(lhs, op, rhs))
        });
    }
    /**
     * Adds `on true`.
     */ onTrue() {
        return new JoinBuilder({
            ...this.#props,
            joinNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$join$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JoinNode"].cloneWithOn(this.#props.joinNode, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$raw$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RawNode"].createWithSql('true'))
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */ $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.joinNode;
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/order-by-item-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./order-by-item-builder.d.ts" />
__turbopack_context__.s([
    "OrderByItemBuilder",
    ()=>OrderByItemBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$collate$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/collate-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$order$2d$by$2d$item$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/order-by-item-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$raw$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/raw-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
;
;
;
;
class OrderByItemBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    /**
     * Adds `desc` to the `order by` item.
     *
     * See {@link asc} for the opposite.
     */ desc() {
        return new OrderByItemBuilder({
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$order$2d$by$2d$item$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OrderByItemNode"].cloneWith(this.#props.node, {
                direction: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$raw$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RawNode"].createWithSql('desc')
            })
        });
    }
    /**
     * Adds `asc` to the `order by` item.
     *
     * See {@link desc} for the opposite.
     */ asc() {
        return new OrderByItemBuilder({
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$order$2d$by$2d$item$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OrderByItemNode"].cloneWith(this.#props.node, {
                direction: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$raw$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RawNode"].createWithSql('asc')
            })
        });
    }
    /**
     * Adds `nulls last` to the `order by` item.
     *
     * This is only supported by some dialects like PostgreSQL and SQLite.
     *
     * See {@link nullsFirst} for the opposite.
     */ nullsLast() {
        return new OrderByItemBuilder({
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$order$2d$by$2d$item$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OrderByItemNode"].cloneWith(this.#props.node, {
                nulls: 'last'
            })
        });
    }
    /**
     * Adds `nulls first` to the `order by` item.
     *
     * This is only supported by some dialects like PostgreSQL and SQLite.
     *
     * See {@link nullsLast} for the opposite.
     */ nullsFirst() {
        return new OrderByItemBuilder({
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$order$2d$by$2d$item$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OrderByItemNode"].cloneWith(this.#props.node, {
                nulls: 'first'
            })
        });
    }
    /**
     * Adds `collate <collationName>` to the `order by` item.
     */ collate(collation) {
        return new OrderByItemBuilder({
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$order$2d$by$2d$item$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OrderByItemNode"].cloneWith(this.#props.node, {
                collation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$collate$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CollateNode"].create(collation)
            })
        });
    }
    toOperationNode() {
        return this.#props.node;
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/over-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./over-builder.d.ts" />
__turbopack_context__.s([
    "OverBuilder",
    ()=>OverBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$over$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/over-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/query-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$order$2d$by$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/order-by-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$partition$2d$by$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/partition-by-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
;
;
;
;
;
class OverBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    orderBy(...args) {
        return new OverBuilder({
            overNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$over$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OverNode"].cloneWithOrderByItems(this.#props.overNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$order$2d$by$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseOrderBy"])(args))
        });
    }
    clearOrderBy() {
        return new OverBuilder({
            overNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithoutOrderBy(this.#props.overNode)
        });
    }
    partitionBy(partitionBy) {
        return new OverBuilder({
            overNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$over$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OverNode"].cloneWithPartitionByItems(this.#props.overNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$partition$2d$by$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parsePartitionBy"])(partitionBy))
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */ $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.overNode;
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/insert-result.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./insert-result.d.ts" />
/**
 * The result of an insert query.
 *
 * If the table has an auto incrementing primary key {@link insertId} will hold
 * the generated id on dialects that support it. For example PostgreSQL doesn't
 * return the id by default and {@link insertId} is undefined. On PostgreSQL you
 * need to use {@link ReturningInterface.returning} or {@link ReturningInterface.returningAll}
 * to get out the inserted id.
 *
 * {@link numInsertedOrUpdatedRows} holds the number of (actually) inserted rows.
 * On MySQL, updated rows are counted twice when using `on duplicate key update`.
 *
 * ### Examples
 *
 * ```ts
 * import type { NewPerson } from 'type-editor' // imaginary module
 *
 * async function insertPerson(person: NewPerson) {
 *   const result = await db
 *     .insertInto('person')
 *     .values(person)
 *     .executeTakeFirstOrThrow()
 *
 *   console.log(result.insertId) // relevant on MySQL
 *   console.log(result.numInsertedOrUpdatedRows) // always relevant
 * }
 * ```
 */ __turbopack_context__.s([
    "InsertResult",
    ()=>InsertResult
]);
class InsertResult {
    /**
     * The auto incrementing primary key of the inserted row.
     *
     * This property can be undefined when the query contains an `on conflict`
     * clause that makes the query succeed even when nothing gets inserted.
     *
     * This property is always undefined on dialects like PostgreSQL that
     * don't return the inserted id by default. On those dialects you need
     * to use the {@link ReturningInterface.returning | returning} method.
     */ insertId;
    /**
     * Affected rows count.
     */ numInsertedOrUpdatedRows;
    constructor(insertId, numInsertedOrUpdatedRows){
        this.insertId = insertId;
        this.numInsertedOrUpdatedRows = numInsertedOrUpdatedRows;
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/no-result-error.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./no-result-error.d.ts" />
__turbopack_context__.s([
    "NoResultError",
    ()=>NoResultError,
    "isNoResultErrorConstructor",
    ()=>isNoResultErrorConstructor
]);
class NoResultError extends Error {
    /**
     * The operation node tree of the query that was executed.
     */ node;
    constructor(node){
        super('no result');
        this.node = node;
    }
}
function isNoResultErrorConstructor(fn) {
    return Object.prototype.hasOwnProperty.call(fn, 'prototype');
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/on-conflict-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./on-conflict-builder.d.ts" />
__turbopack_context__.s([
    "OnConflictBuilder",
    ()=>OnConflictBuilder,
    "OnConflictDoNothingBuilder",
    ()=>OnConflictDoNothingBuilder,
    "OnConflictUpdateBuilder",
    ()=>OnConflictUpdateBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/column-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$identifier$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/identifier-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$on$2d$conflict$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/on-conflict-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/binary-operation-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$update$2d$set$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/update-set-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
;
;
;
;
;
;
class OnConflictBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    /**
     * Specify a single column as the conflict target.
     *
     * Also see the {@link columns}, {@link constraint} and {@link expression}
     * methods for alternative ways to specify the conflict target.
     */ column(column) {
        const columnNode = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnNode"].create(column);
        return new OnConflictBuilder({
            ...this.#props,
            onConflictNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$on$2d$conflict$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OnConflictNode"].cloneWith(this.#props.onConflictNode, {
                columns: this.#props.onConflictNode.columns ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])([
                    ...this.#props.onConflictNode.columns,
                    columnNode
                ]) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])([
                    columnNode
                ])
            })
        });
    }
    /**
     * Specify a list of columns as the conflict target.
     *
     * Also see the {@link column}, {@link constraint} and {@link expression}
     * methods for alternative ways to specify the conflict target.
     */ columns(columns) {
        const columnNodes = columns.map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnNode"].create);
        return new OnConflictBuilder({
            ...this.#props,
            onConflictNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$on$2d$conflict$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OnConflictNode"].cloneWith(this.#props.onConflictNode, {
                columns: this.#props.onConflictNode.columns ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])([
                    ...this.#props.onConflictNode.columns,
                    ...columnNodes
                ]) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(columnNodes)
            })
        });
    }
    /**
     * Specify a specific constraint by name as the conflict target.
     *
     * Also see the {@link column}, {@link columns} and {@link expression}
     * methods for alternative ways to specify the conflict target.
     */ constraint(constraintName) {
        return new OnConflictBuilder({
            ...this.#props,
            onConflictNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$on$2d$conflict$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OnConflictNode"].cloneWith(this.#props.onConflictNode, {
                constraint: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$identifier$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IdentifierNode"].create(constraintName)
            })
        });
    }
    /**
     * Specify an expression as the conflict target.
     *
     * This can be used if the unique index is an expression index.
     *
     * Also see the {@link column}, {@link columns} and {@link constraint}
     * methods for alternative ways to specify the conflict target.
     */ expression(expression) {
        return new OnConflictBuilder({
            ...this.#props,
            onConflictNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$on$2d$conflict$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OnConflictNode"].cloneWith(this.#props.onConflictNode, {
                indexExpression: expression.toOperationNode()
            })
        });
    }
    where(...args) {
        return new OnConflictBuilder({
            ...this.#props,
            onConflictNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$on$2d$conflict$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OnConflictNode"].cloneWithIndexWhere(this.#props.onConflictNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseValueBinaryOperationOrExpression"])(args))
        });
    }
    whereRef(lhs, op, rhs) {
        return new OnConflictBuilder({
            ...this.#props,
            onConflictNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$on$2d$conflict$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OnConflictNode"].cloneWithIndexWhere(this.#props.onConflictNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseReferentialBinaryOperation"])(lhs, op, rhs))
        });
    }
    clearWhere() {
        return new OnConflictBuilder({
            ...this.#props,
            onConflictNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$on$2d$conflict$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OnConflictNode"].cloneWithoutIndexWhere(this.#props.onConflictNode)
        });
    }
    /**
     * Adds the "do nothing" conflict action.
     *
     * ### Examples
     *
     * ```ts
     * const id = 1
     * const first_name = 'John'
     *
     * await db
     *   .insertInto('person')
     *   .values({ first_name, id })
     *   .onConflict((oc) => oc
     *     .column('id')
     *     .doNothing()
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "id")
     * values ($1, $2)
     * on conflict ("id") do nothing
     * ```
     */ doNothing() {
        return new OnConflictDoNothingBuilder({
            ...this.#props,
            onConflictNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$on$2d$conflict$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OnConflictNode"].cloneWith(this.#props.onConflictNode, {
                doNothing: true
            })
        });
    }
    /**
     * Adds the "do update set" conflict action.
     *
     * ### Examples
     *
     * ```ts
     * const id = 1
     * const first_name = 'John'
     *
     * await db
     *   .insertInto('person')
     *   .values({ first_name, id })
     *   .onConflict((oc) => oc
     *     .column('id')
     *     .doUpdateSet({ first_name })
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "id")
     * values ($1, $2)
     * on conflict ("id")
     * do update set "first_name" = $3
     * ```
     *
     * In the next example we use the `ref` method to reference
     * columns of the virtual table `excluded` in a type-safe way
     * to create an upsert operation:
     *
     * ```ts
     * import type { NewPerson } from 'type-editor' // imaginary module
     *
     * async function upsertPerson(person: NewPerson): Promise<void> {
     *   await db.insertInto('person')
     *     .values(person)
     *     .onConflict((oc) => oc
     *       .column('id')
     *       .doUpdateSet((eb) => ({
     *         first_name: eb.ref('excluded.first_name'),
     *         last_name: eb.ref('excluded.last_name')
     *       })
     *     )
     *   )
     *   .execute()
     * }
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name")
     * values ($1, $2)
     * on conflict ("id")
     * do update set
     *  "first_name" = excluded."first_name",
     *  "last_name" = excluded."last_name"
     * ```
     */ doUpdateSet(update) {
        return new OnConflictUpdateBuilder({
            ...this.#props,
            onConflictNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$on$2d$conflict$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OnConflictNode"].cloneWith(this.#props.onConflictNode, {
                updates: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$update$2d$set$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseUpdateObjectExpression"])(update)
            })
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */ $call(func) {
        return func(this);
    }
}
class OnConflictDoNothingBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    toOperationNode() {
        return this.#props.onConflictNode;
    }
}
class OnConflictUpdateBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    where(...args) {
        return new OnConflictUpdateBuilder({
            ...this.#props,
            onConflictNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$on$2d$conflict$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OnConflictNode"].cloneWithUpdateWhere(this.#props.onConflictNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseValueBinaryOperationOrExpression"])(args))
        });
    }
    /**
     * Specify a where condition for the update operation.
     *
     * See {@link WhereInterface.whereRef} for more info.
     */ whereRef(lhs, op, rhs) {
        return new OnConflictUpdateBuilder({
            ...this.#props,
            onConflictNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$on$2d$conflict$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OnConflictNode"].cloneWithUpdateWhere(this.#props.onConflictNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseReferentialBinaryOperation"])(lhs, op, rhs))
        });
    }
    clearWhere() {
        return new OnConflictUpdateBuilder({
            ...this.#props,
            onConflictNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$on$2d$conflict$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OnConflictNode"].cloneWithoutUpdateWhere(this.#props.onConflictNode)
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */ $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.onConflictNode;
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/insert-query-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./insert-query-builder.d.ts" />
__turbopack_context__.s([
    "InsertQueryBuilder",
    ()=>InsertQueryBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$select$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/select-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$insert$2d$values$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/insert-values-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$insert$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/insert-query-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/query-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$update$2d$set$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/update-set-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$on$2d$duplicate$2d$key$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/on-duplicate-key-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$insert$2d$result$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/insert-result.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$no$2d$result$2d$error$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/no-result-error.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$expression$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/expression-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/column-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$on$2d$conflict$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/on-conflict-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$on$2d$conflict$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/on-conflict-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$top$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/top-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$or$2d$action$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/or-action-node.js [app-route] (ecmascript)");
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
class InsertQueryBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    /**
     * Sets the values to insert for an {@link Kysely.insertInto | insert} query.
     *
     * This method takes an object whose keys are column names and values are
     * values to insert. In addition to the column's type, the values can be
     * raw {@link sql} snippets or select queries.
     *
     * You must provide all fields you haven't explicitly marked as nullable
     * or optional using {@link Generated} or {@link ColumnType}.
     *
     * The return value of an `insert` query is an instance of {@link InsertResult}. The
     * {@link InsertResult.insertId | insertId} field holds the auto incremented primary
     * key if the database returned one.
     *
     * On PostgreSQL and some other dialects, you need to call `returning` to get
     * something out of the query.
     *
     * Also see the {@link expression} method for inserting the result of a select
     * query or any other expression.
     *
     * ### Examples
     *
     * <!-- siteExample("insert", "Single row", 10) -->
     *
     * Insert a single row:
     *
     * ```ts
     * const result = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston',
     *     age: 40
     *   })
     *   .executeTakeFirst()
     *
     * // `insertId` is only available on dialects that
     * // automatically return the id of the inserted row
     * // such as MySQL and SQLite. On PostgreSQL, for example,
     * // you need to add a `returning` clause to the query to
     * // get anything out. See the "returning data" example.
     * console.log(result.insertId)
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * insert into `person` (`first_name`, `last_name`, `age`) values (?, ?, ?)
     * ```
     *
     * <!-- siteExample("insert", "Multiple rows", 20) -->
     *
     * On dialects that support it (for example PostgreSQL) you can insert multiple
     * rows by providing an array. Note that the return value is once again very
     * dialect-specific. Some databases may only return the id of the *last* inserted
     * row and some return nothing at all unless you call `returning`.
     *
     * ```ts
     * await db
     *   .insertInto('person')
     *   .values([{
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston',
     *     age: 40,
     *   }, {
     *     first_name: 'Arnold',
     *     last_name: 'Schwarzenegger',
     *     age: 70,
     *   }])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name", "age") values (($1, $2, $3), ($4, $5, $6))
     * ```
     *
     * <!-- siteExample("insert", "Returning data", 30) -->
     *
     * On supported dialects like PostgreSQL you need to chain `returning` to the query to get
     * the inserted row's columns (or any other expression) as the return value. `returning`
     * works just like `select`. Refer to `select` method's examples and documentation for
     * more info.
     *
     * ```ts
     * const result = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston',
     *     age: 40,
     *   })
     *   .returning(['id', 'first_name as name'])
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name", "age") values ($1, $2, $3) returning "id", "first_name" as "name"
     * ```
     *
     * <!-- siteExample("insert", "Complex values", 40) -->
     *
     * In addition to primitives, the values can also be arbitrary expressions.
     * You can build the expressions by using a callback and calling the methods
     * on the expression builder passed to it:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const ani = "Ani"
     * const ston = "ston"
     *
     * const result = await db
     *   .insertInto('person')
     *   .values(({ ref, selectFrom, fn }) => ({
     *     first_name: 'Jennifer',
     *     last_name: sql<string>`concat(${ani}, ${ston})`,
     *     middle_name: ref('first_name'),
     *     age: selectFrom('person')
     *       .select(fn.avg<number>('age').as('avg_age')),
     *   }))
     *   .executeTakeFirst()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" (
     *   "first_name",
     *   "last_name",
     *   "middle_name",
     *   "age"
     * )
     * values (
     *   $1,
     *   concat($2, $3),
     *   "first_name",
     *   (select avg("age") as "avg_age" from "person")
     * )
     * ```
     *
     * You can also use the callback version of subqueries or raw expressions:
     *
     * ```ts
     * await db.with('jennifer', (db) => db
     *   .selectFrom('person')
     *   .where('first_name', '=', 'Jennifer')
     *   .select(['id', 'first_name', 'gender'])
     *   .limit(1)
     * ).insertInto('pet').values((eb) => ({
     *   owner_id: eb.selectFrom('jennifer').select('id'),
     *   name: eb.selectFrom('jennifer').select('first_name'),
     *   species: 'cat',
     * }))
     * .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * with "jennifer" as (
     *   select "id", "first_name", "gender"
     *   from "person"
     *   where "first_name" = $1
     *   limit $2
     * )
     * insert into "pet" ("owner_id", "name", "species")
     * values (
     *  (select "id" from "jennifer"),
     *  (select "first_name" from "jennifer"),
     *  $3
     * )
     * ```
     */ values(insert) {
        const [columns, values] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$insert$2d$values$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseInsertExpression"])(insert);
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$insert$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InsertQueryNode"].cloneWith(this.#props.queryNode, {
                columns,
                values
            })
        });
    }
    /**
     * Sets the columns to insert.
     *
     * The {@link values} method sets both the columns and the values and this method
     * is not needed. But if you are using the {@link expression} method, you can use
     * this method to set the columns to insert.
     *
     * ### Examples
     *
     * ```ts
     * await db.insertInto('person')
     *   .columns(['first_name'])
     *   .expression((eb) => eb.selectFrom('pet').select('pet.name'))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name")
     * select "pet"."name" from "pet"
     * ```
     */ columns(columns) {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$insert$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InsertQueryNode"].cloneWith(this.#props.queryNode, {
                columns: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(columns.map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnNode"].create))
            })
        });
    }
    /**
     * Insert an arbitrary expression. For example the result of a select query.
     *
     * ### Examples
     *
     * <!-- siteExample("insert", "Insert subquery", 50) -->
     *
     * You can create an `INSERT INTO SELECT FROM` query using the `expression` method.
     * This API doesn't follow our WYSIWYG principles and might be a bit difficult to
     * remember. The reasons for this design stem from implementation difficulties.
     *
     * ```ts
     * const result = await db.insertInto('person')
     *   .columns(['first_name', 'last_name', 'age'])
     *   .expression((eb) => eb
     *     .selectFrom('pet')
     *     .select((eb) => [
     *       'pet.name',
     *       eb.val('Petson').as('last_name'),
     *       eb.lit(7).as('age'),
     *     ])
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name", "age")
     * select "pet"."name", $1 as "last_name", 7 as "age from "pet"
     * ```
     */ expression(expression) {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$insert$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InsertQueryNode"].cloneWith(this.#props.queryNode, {
                values: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$expression$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseExpression"])(expression)
            })
        });
    }
    /**
     * Creates an `insert into "person" default values` query.
     *
     * ### Examples
     *
     * ```ts
     * await db.insertInto('person')
     *   .defaultValues()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" default values
     * ```
     */ defaultValues() {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$insert$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InsertQueryNode"].cloneWith(this.#props.queryNode, {
                defaultValues: true
            })
        });
    }
    /**
     * This can be used to add any additional SQL to the end of the query.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.insertInto('person')
     *   .values({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'male',
     *   })
     *   .modifyEnd(sql`-- This is a comment`)
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * insert into `person` ("first_name", "last_name", "gender")
     * values (?, ?, ?) -- This is a comment
     * ```
     */ modifyEnd(modifier) {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithEndModifier(this.#props.queryNode, modifier.toOperationNode())
        });
    }
    /**
     * Changes an `insert into` query to an `insert ignore into` query.
     *
     * This is only supported by some dialects like MySQL.
     *
     * To avoid a footgun, when invoked with the SQLite dialect, this method will
     * be handled like {@link orIgnore}. See also, {@link orAbort}, {@link orFail},
     * {@link orReplace}, and {@link orRollback}.
     *
     * If you use the ignore modifier, ignorable errors that occur while executing the
     * insert statement are ignored. For example, without ignore, a row that duplicates
     * an existing unique index or primary key value in the table causes a duplicate-key
     * error and the statement is aborted. With ignore, the row is discarded and no error
     * occurs.
     *
     * ### Examples
     *
     * ```ts
     * await db.insertInto('person')
     *   .ignore()
     *   .values({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'female',
     *   })
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * insert ignore into `person` (`first_name`, `last_name`, `gender`) values (?, ?, ?)
     * ```
     *
     * The generated SQL (SQLite):
     *
     * ```sql
     * insert or ignore into "person" ("first_name", "last_name", "gender") values (?, ?, ?)
     * ```
     */ ignore() {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$insert$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InsertQueryNode"].cloneWith(this.#props.queryNode, {
                orAction: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$or$2d$action$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OrActionNode"].create('ignore')
            })
        });
    }
    /**
     * Changes an `insert into` query to an `insert or ignore into` query.
     *
     * This is only supported by some dialects like SQLite.
     *
     * To avoid a footgun, when invoked with the MySQL dialect, this method will
     * be handled like {@link ignore}.
     *
     * See also, {@link orAbort}, {@link orFail}, {@link orReplace}, and {@link orRollback}.
     *
     * ### Examples
     *
     * ```ts
     * await db.insertInto('person')
     *   .orIgnore()
     *   .values({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'female',
     *   })
     *   .execute()
     * ```
     *
     * The generated SQL (SQLite):
     *
     * ```sql
     * insert or ignore into "person" ("first_name", "last_name", "gender") values (?, ?, ?)
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * insert ignore into `person` (`first_name`, `last_name`, `gender`) values (?, ?, ?)
     * ```
     */ orIgnore() {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$insert$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InsertQueryNode"].cloneWith(this.#props.queryNode, {
                orAction: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$or$2d$action$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OrActionNode"].create('ignore')
            })
        });
    }
    /**
     * Changes an `insert into` query to an `insert or abort into` query.
     *
     * This is only supported by some dialects like SQLite.
     *
     * See also, {@link orIgnore}, {@link orFail}, {@link orReplace}, and {@link orRollback}.
     *
     * ### Examples
     *
     * ```ts
     * await db.insertInto('person')
     *   .orAbort()
     *   .values({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'female',
     *   })
     *   .execute()
     * ```
     *
     * The generated SQL (SQLite):
     *
     * ```sql
     * insert or abort into "person" ("first_name", "last_name", "gender") values (?, ?, ?)
     * ```
     */ orAbort() {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$insert$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InsertQueryNode"].cloneWith(this.#props.queryNode, {
                orAction: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$or$2d$action$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OrActionNode"].create('abort')
            })
        });
    }
    /**
     * Changes an `insert into` query to an `insert or fail into` query.
     *
     * This is only supported by some dialects like SQLite.
     *
     * See also, {@link orIgnore}, {@link orAbort}, {@link orReplace}, and {@link orRollback}.
     *
     * ### Examples
     *
     * ```ts
     * await db.insertInto('person')
     *   .orFail()
     *   .values({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'female',
     *   })
     *   .execute()
     * ```
     *
     * The generated SQL (SQLite):
     *
     * ```sql
     * insert or fail into "person" ("first_name", "last_name", "gender") values (?, ?, ?)
     * ```
     */ orFail() {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$insert$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InsertQueryNode"].cloneWith(this.#props.queryNode, {
                orAction: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$or$2d$action$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OrActionNode"].create('fail')
            })
        });
    }
    /**
     * Changes an `insert into` query to an `insert or replace into` query.
     *
     * This is only supported by some dialects like SQLite.
     *
     * You can also use {@link Kysely.replaceInto} to achieve the same result.
     *
     * See also, {@link orIgnore}, {@link orAbort}, {@link orFail}, and {@link orRollback}.
     *
     * ### Examples
     *
     * ```ts
     * await db.insertInto('person')
     *   .orReplace()
     *   .values({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'female',
     *   })
     *   .execute()
     * ```
     *
     * The generated SQL (SQLite):
     *
     * ```sql
     * insert or replace into "person" ("first_name", "last_name", "gender") values (?, ?, ?)
     * ```
     */ orReplace() {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$insert$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InsertQueryNode"].cloneWith(this.#props.queryNode, {
                orAction: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$or$2d$action$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OrActionNode"].create('replace')
            })
        });
    }
    /**
     * Changes an `insert into` query to an `insert or rollback into` query.
     *
     * This is only supported by some dialects like SQLite.
     *
     * See also, {@link orIgnore}, {@link orAbort}, {@link orFail}, and {@link orReplace}.
     *
     * ### Examples
     *
     * ```ts
     * await db.insertInto('person')
     *   .orRollback()
     *   .values({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'female',
     *   })
     *   .execute()
     * ```
     *
     * The generated SQL (SQLite):
     *
     * ```sql
     * insert or rollback into "person" ("first_name", "last_name", "gender") values (?, ?, ?)
     * ```
     */ orRollback() {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$insert$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InsertQueryNode"].cloneWith(this.#props.queryNode, {
                orAction: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$or$2d$action$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OrActionNode"].create('rollback')
            })
        });
    }
    /**
     * Changes an `insert into` query to an `insert top into` query.
     *
     * `top` clause is only supported by some dialects like MS SQL Server.
     *
     * ### Examples
     *
     * Insert the first 5 rows:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.insertInto('person')
     *   .top(5)
     *   .columns(['first_name', 'gender'])
     *   .expression(
     *     (eb) => eb.selectFrom('pet').select(['name', sql.lit('other').as('gender')])
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * insert top(5) into "person" ("first_name", "gender") select "name", 'other' as "gender" from "pet"
     * ```
     *
     * Insert the first 50 percent of rows:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.insertInto('person')
     *   .top(50, 'percent')
     *   .columns(['first_name', 'gender'])
     *   .expression(
     *     (eb) => eb.selectFrom('pet').select(['name', sql.lit('other').as('gender')])
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * insert top(50) percent into "person" ("first_name", "gender") select "name", 'other' as "gender" from "pet"
     * ```
     */ top(expression, modifiers) {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithTop(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$top$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseTop"])(expression, modifiers))
        });
    }
    /**
     * Adds an `on conflict` clause to the query.
     *
     * `on conflict` is only supported by some dialects like PostgreSQL and SQLite. On MySQL
     * you can use {@link ignore} and {@link onDuplicateKeyUpdate} to achieve similar results.
     *
     * ### Examples
     *
     * ```ts
     * await db
     *   .insertInto('pet')
     *   .values({
     *     name: 'Catto',
     *     species: 'cat',
     *     owner_id: 3,
     *   })
     *   .onConflict((oc) => oc
     *     .column('name')
     *     .doUpdateSet({ species: 'hamster' })
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "pet" ("name", "species", "owner_id")
     * values ($1, $2, $3)
     * on conflict ("name")
     * do update set "species" = $4
     * ```
     *
     * You can provide the name of the constraint instead of a column name:
     *
     * ```ts
     * await db
     *   .insertInto('pet')
     *   .values({
     *     name: 'Catto',
     *     species: 'cat',
     *     owner_id: 3,
     *   })
     *   .onConflict((oc) => oc
     *     .constraint('pet_name_key')
     *     .doUpdateSet({ species: 'hamster' })
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "pet" ("name", "species", "owner_id")
     * values ($1, $2, $3)
     * on conflict on constraint "pet_name_key"
     * do update set "species" = $4
     * ```
     *
     * You can also specify an expression as the conflict target in case
     * the unique index is an expression index:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db
     *   .insertInto('pet')
     *   .values({
     *     name: 'Catto',
     *     species: 'cat',
     *     owner_id: 3,
     *   })
     *   .onConflict((oc) => oc
     *     .expression(sql<string>`lower(name)`)
     *     .doUpdateSet({ species: 'hamster' })
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "pet" ("name", "species", "owner_id")
     * values ($1, $2, $3)
     * on conflict (lower(name))
     * do update set "species" = $4
     * ```
     *
     * You can add a filter for the update statement like this:
     *
     * ```ts
     * await db
     *   .insertInto('pet')
     *   .values({
     *     name: 'Catto',
     *     species: 'cat',
     *     owner_id: 3,
     *   })
     *   .onConflict((oc) => oc
     *     .column('name')
     *     .doUpdateSet({ species: 'hamster' })
     *     .where('excluded.name', '!=', 'Catto')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "pet" ("name", "species", "owner_id")
     * values ($1, $2, $3)
     * on conflict ("name")
     * do update set "species" = $4
     * where "excluded"."name" != $5
     * ```
     *
     * You can create an `on conflict do nothing` clauses like this:
     *
     * ```ts
     * await db
     *   .insertInto('pet')
     *   .values({
     *     name: 'Catto',
     *     species: 'cat',
     *     owner_id: 3,
     *   })
     *   .onConflict((oc) => oc
     *     .column('name')
     *     .doNothing()
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "pet" ("name", "species", "owner_id")
     * values ($1, $2, $3)
     * on conflict ("name") do nothing
     * ```
     *
     * You can refer to the columns of the virtual `excluded` table
     * in a type-safe way using a callback and the `ref` method of
     * `ExpressionBuilder`:
     *
     * ```ts
     * await db.insertInto('person')
     *   .values({
     *     id: 1,
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'male',
     *   })
     *   .onConflict(oc => oc
     *     .column('id')
     *     .doUpdateSet({
     *       first_name: (eb) => eb.ref('excluded.first_name'),
     *       last_name: (eb) => eb.ref('excluded.last_name')
     *     })
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("id", "first_name", "last_name", "gender")
     * values ($1, $2, $3, $4)
     * on conflict ("id")
     * do update set
     *  "first_name" = "excluded"."first_name",
     *  "last_name" = "excluded"."last_name"
     * ```
     */ onConflict(callback) {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$insert$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InsertQueryNode"].cloneWith(this.#props.queryNode, {
                onConflict: callback(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$on$2d$conflict$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OnConflictBuilder"]({
                    onConflictNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$on$2d$conflict$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OnConflictNode"].create()
                })).toOperationNode()
            })
        });
    }
    /**
     * Adds `on duplicate key update` to the query.
     *
     * If you specify `on duplicate key update`, and a row is inserted that would cause
     * a duplicate value in a unique index or primary key, an update of the old row occurs.
     *
     * This is only implemented by some dialects like MySQL. On most dialects you should
     * use {@link onConflict} instead.
     *
     * ### Examples
     *
     * ```ts
     * await db
     *   .insertInto('person')
     *   .values({
     *     id: 1,
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'male',
     *   })
     *   .onDuplicateKeyUpdate({ updated_at: new Date().toISOString() })
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * insert into `person` (`id`, `first_name`, `last_name`, `gender`)
     * values (?, ?, ?, ?)
     * on duplicate key update `updated_at` = ?
     * ```
     */ onDuplicateKeyUpdate(update) {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$insert$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InsertQueryNode"].cloneWith(this.#props.queryNode, {
                onDuplicateKey: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$on$2d$duplicate$2d$key$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OnDuplicateKeyNode"].create((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$update$2d$set$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseUpdateObjectExpression"])(update))
            })
        });
    }
    returning(selection) {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithReturning(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$select$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSelectArg"])(selection))
        });
    }
    returningAll() {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithReturning(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$select$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSelectAll"])())
        });
    }
    output(args) {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithOutput(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$select$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSelectArg"])(args))
        });
    }
    outputAll(table) {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithOutput(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$select$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSelectAll"])(table))
        });
    }
    /**
     * Clears all `returning` clauses from the query.
     *
     * ### Examples
     *
     * ```ts
     * await db.insertInto('person')
     *   .values({ first_name: 'James', last_name: 'Smith', gender: 'male' })
     *   .returning(['first_name'])
     *   .clearReturning()
     *   .execute()
     * ```
     *
     * The generated SQL(PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name", "gender") values ($1, $2, $3)
     * ```
     */ clearReturning() {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithoutReturning(this.#props.queryNode)
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     *
     * If you want to conditionally call a method on `this`, see
     * the {@link $if} method.
     *
     * ### Examples
     *
     * The next example uses a helper function `log` to log a query:
     *
     * ```ts
     * import type { Compilable } from 'kysely'
     *
     * function log<T extends Compilable>(qb: T): T {
     *   console.log(qb.compile())
     *   return qb
     * }
     *
     * await db.insertInto('person')
     *   .values({ first_name: 'John', last_name: 'Doe', gender: 'male' })
     *   .$call(log)
     *   .execute()
     * ```
     */ $call(func) {
        return func(this);
    }
    /**
     * Call `func(this)` if `condition` is true.
     *
     * This method is especially handy with optional selects. Any `returning` or `returningAll`
     * method calls add columns as optional fields to the output type when called inside
     * the `func` callback. This is because we can't know if those selections were actually
     * made before running the code.
     *
     * You can also call any other methods inside the callback.
     *
     * ### Examples
     *
     * ```ts
     * import type { NewPerson } from 'type-editor' // imaginary module
     *
     * async function insertPerson(values: NewPerson, returnLastName: boolean) {
     *   return await db
     *     .insertInto('person')
     *     .values(values)
     *     .returning(['id', 'first_name'])
     *     .$if(returnLastName, (qb) => qb.returning('last_name'))
     *     .executeTakeFirstOrThrow()
     * }
     * ```
     *
     * Any selections added inside the `if` callback will be added as optional fields to the
     * output type since we can't know if the selections were actually made before running
     * the code. In the example above the return type of the `insertPerson` function is:
     *
     * ```ts
     * Promise<{
     *   id: number
     *   first_name: string
     *   last_name?: string
     * }>
     * ```
     */ $if(condition, func) {
        if (condition) {
            return func(this);
        }
        return new InsertQueryBuilder({
            ...this.#props
        });
    }
    /**
     * Change the output type of the query.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `InsertQueryBuilder` with a new output type.
     */ $castTo() {
        return new InsertQueryBuilder(this.#props);
    }
    /**
     * Narrows (parts of) the output type of the query.
     *
     * Kysely tries to be as type-safe as possible, but in some cases we have to make
     * compromises for better maintainability and compilation performance. At present,
     * Kysely doesn't narrow the output type of the query based on {@link values} input
     * when using {@link returning} or {@link returningAll}.
     *
     * This utility method is very useful for these situations, as it removes unncessary
     * runtime assertion/guard code. Its input type is limited to the output type
     * of the query, so you can't add a column that doesn't exist, or change a column's
     * type to something that doesn't exist in its union type.
     *
     * ### Examples
     *
     * Turn this code:
     *
     * ```ts
     * import type { Person } from 'type-editor' // imaginary module
     *
     * const person = await db.insertInto('person')
     *   .values({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'male',
     *     nullable_column: 'hell yeah!'
     *   })
     *   .returningAll()
     *   .executeTakeFirstOrThrow()
     *
     * if (isWithNoNullValue(person)) {
     *   functionThatExpectsPersonWithNonNullValue(person)
     * }
     *
     * function isWithNoNullValue(person: Person): person is Person & { nullable_column: string } {
     *   return person.nullable_column != null
     * }
     * ```
     *
     * Into this:
     *
     * ```ts
     * import type { NotNull } from 'kysely'
     *
     * const person = await db.insertInto('person')
     *   .values({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'male',
     *     nullable_column: 'hell yeah!'
     *   })
     *   .returningAll()
     *   .$narrowType<{ nullable_column: NotNull }>()
     *   .executeTakeFirstOrThrow()
     *
     * functionThatExpectsPersonWithNonNullValue(person)
     * ```
     */ $narrowType() {
        return new InsertQueryBuilder(this.#props);
    }
    /**
     * Asserts that query's output row type equals the given type `T`.
     *
     * This method can be used to simplify excessively complex types to make TypeScript happy
     * and much faster.
     *
     * Kysely uses complex type magic to achieve its type safety. This complexity is sometimes too much
     * for TypeScript and you get errors like this:
     *
     * ```
     * error TS2589: Type instantiation is excessively deep and possibly infinite.
     * ```
     *
     * In these case you can often use this method to help TypeScript a little bit. When you use this
     * method to assert the output type of a query, Kysely can drop the complex output type that
     * consists of multiple nested helper types and replace it with the simple asserted type.
     *
     * Using this method doesn't reduce type safety at all. You have to pass in a type that is
     * structurally equal to the current type.
     *
     * ### Examples
     *
     * ```ts
     * import type { NewPerson, NewPet, Species } from 'type-editor' // imaginary module
     *
     * async function insertPersonAndPet(person: NewPerson, pet: Omit<NewPet, 'owner_id'>) {
     *   return await db
     *     .with('new_person', (qb) => qb
     *       .insertInto('person')
     *       .values(person)
     *       .returning('id')
     *       .$assertType<{ id: number }>()
     *     )
     *     .with('new_pet', (qb) => qb
     *       .insertInto('pet')
     *       .values((eb) => ({
     *         owner_id: eb.selectFrom('new_person').select('id'),
     *         ...pet
     *       }))
     *       .returning(['name as pet_name', 'species'])
     *       .$assertType<{ pet_name: string, species: Species }>()
     *     )
     *     .selectFrom(['new_person', 'new_pet'])
     *     .selectAll()
     *     .executeTakeFirstOrThrow()
     * }
     * ```
     */ $assertType() {
        return new InsertQueryBuilder(this.#props);
    }
    /**
     * Returns a copy of this InsertQueryBuilder instance with the given plugin installed.
     */ withPlugin(plugin) {
        return new InsertQueryBuilder({
            ...this.#props,
            executor: this.#props.executor.withPlugin(plugin)
        });
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.queryNode, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    /**
     * Executes the query and returns an array of rows.
     *
     * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
     */ async execute() {
        const compiledQuery = this.compile();
        const result = await this.#props.executor.executeQuery(compiledQuery);
        const { adapter } = this.#props.executor;
        const query = compiledQuery.query;
        if (query.returning && adapter.supportsReturning || query.output && adapter.supportsOutput) {
            return result.rows;
        }
        return [
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$insert$2d$result$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InsertResult"](result.insertId, result.numAffectedRows ?? BigInt(0))
        ];
    }
    /**
     * Executes the query and returns the first result or undefined if
     * the query returned no result.
     */ async executeTakeFirst() {
        const [result] = await this.execute();
        return result;
    }
    /**
     * Executes the query and returns the first result or throws if
     * the query returned no result.
     *
     * By default an instance of {@link NoResultError} is thrown, but you can
     * provide a custom error class, or callback as the only argument to throw a different
     * error.
     */ async executeTakeFirstOrThrow(errorConstructor = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$no$2d$result$2d$error$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NoResultError"]) {
        const result = await this.executeTakeFirst();
        if (result === undefined) {
            const error = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$no$2d$result$2d$error$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isNoResultErrorConstructor"])(errorConstructor) ? new errorConstructor(this.toOperationNode()) : errorConstructor(this.toOperationNode());
            throw error;
        }
        return result;
    }
    async *stream(chunkSize = 100) {
        const compiledQuery = this.compile();
        const stream = this.#props.executor.stream(compiledQuery, chunkSize);
        for await (const item of stream){
            yield* item.rows;
        }
    }
    async explain(format, options) {
        const builder = new InsertQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithExplain(this.#props.queryNode, format, options)
        });
        return await builder.execute();
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/delete-result.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./delete-result.d.ts" />
__turbopack_context__.s([
    "DeleteResult",
    ()=>DeleteResult
]);
class DeleteResult {
    numDeletedRows;
    constructor(numDeletedRows){
        this.numDeletedRows = numDeletedRows;
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/delete-query-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./delete-query-builder.d.ts" />
__turbopack_context__.s([
    "DeleteQueryBuilder",
    ()=>DeleteQueryBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$join$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/join-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/table-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$select$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/select-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/query-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$no$2d$result$2d$error$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/no-result-error.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$delete$2d$result$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/delete-result.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$delete$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/delete-query-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$limit$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/limit-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$order$2d$by$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/order-by-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/binary-operation-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$value$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/value-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$top$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/top-parser.js [app-route] (ecmascript)");
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
class DeleteQueryBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    where(...args) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithWhere(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseValueBinaryOperationOrExpression"])(args))
        });
    }
    whereRef(lhs, op, rhs) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithWhere(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseReferentialBinaryOperation"])(lhs, op, rhs))
        });
    }
    clearWhere() {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithoutWhere(this.#props.queryNode)
        });
    }
    /**
     * Changes a `delete from` query into a `delete top from` query.
     *
     * `top` clause is only supported by some dialects like MS SQL Server.
     *
     * ### Examples
     *
     * Delete the first 5 rows:
     *
     * ```ts
     * await db
     *   .deleteFrom('person')
     *   .top(5)
     *   .where('age', '>', 18)
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * delete top(5) from "person" where "age" > @1
     * ```
     *
     * Delete the first 50% of rows:
     *
     * ```ts
     * await db
     *   .deleteFrom('person')
     *   .top(50, 'percent')
     *   .where('age', '>', 18)
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * delete top(50) percent from "person" where "age" > @1
     * ```
     */ top(expression, modifiers) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithTop(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$top$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseTop"])(expression, modifiers))
        });
    }
    using(tables) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$delete$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DeleteQueryNode"].cloneWithUsing(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseTableExpressionOrList"])(tables))
        });
    }
    innerJoin(...args) {
        return this.#join('InnerJoin', args);
    }
    leftJoin(...args) {
        return this.#join('LeftJoin', args);
    }
    rightJoin(...args) {
        return this.#join('RightJoin', args);
    }
    fullJoin(...args) {
        return this.#join('FullJoin', args);
    }
    #join(joinType, args) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithJoin(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$join$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseJoin"])(joinType, args))
        });
    }
    returning(selection) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithReturning(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$select$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSelectArg"])(selection))
        });
    }
    returningAll(table) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithReturning(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$select$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSelectAll"])(table))
        });
    }
    output(args) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithOutput(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$select$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSelectArg"])(args))
        });
    }
    outputAll(table) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithOutput(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$select$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSelectAll"])(table))
        });
    }
    /**
     * Clears all `returning` clauses from the query.
     *
     * ### Examples
     *
     * ```ts
     * await db.deleteFrom('pet')
     *   .returningAll()
     *   .where('name', '=', 'Max')
     *   .clearReturning()
     *   .execute()
     * ```
     *
     * The generated SQL(PostgreSQL):
     *
     * ```sql
     * delete from "pet" where "name" = "Max"
     * ```
     */ clearReturning() {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithoutReturning(this.#props.queryNode)
        });
    }
    /**
     * Clears the `limit` clause from the query.
     *
     * ### Examples
     *
     * ```ts
     * await db.deleteFrom('pet')
     *   .returningAll()
     *   .where('name', '=', 'Max')
     *   .limit(5)
     *   .clearLimit()
     *   .execute()
     * ```
     *
     * The generated SQL(PostgreSQL):
     *
     * ```sql
     * delete from "pet" where "name" = "Max" returning *
     * ```
     */ clearLimit() {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$delete$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DeleteQueryNode"].cloneWithoutLimit(this.#props.queryNode)
        });
    }
    orderBy(...args) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithOrderByItems(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$order$2d$by$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseOrderBy"])(args))
        });
    }
    clearOrderBy() {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithoutOrderBy(this.#props.queryNode)
        });
    }
    /**
     * Adds a limit clause to the query.
     *
     * A limit clause in a delete query is only supported by some dialects
     * like MySQL.
     *
     * ### Examples
     *
     * Delete 5 oldest items in a table:
     *
     * ```ts
     * await db
     *   .deleteFrom('pet')
     *   .orderBy('created_at')
     *   .limit(5)
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * delete from `pet` order by `created_at` limit ?
     * ```
     */ limit(limit) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$delete$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DeleteQueryNode"].cloneWithLimit(this.#props.queryNode, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$limit$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LimitNode"].create((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$value$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseValueExpression"])(limit)))
        });
    }
    /**
     * This can be used to add any additional SQL to the end of the query.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.deleteFrom('person')
     *   .where('first_name', '=', 'John')
     *   .modifyEnd(sql`-- This is a comment`)
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * delete from `person`
     * where `first_name` = "John" -- This is a comment
     * ```
     */ modifyEnd(modifier) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithEndModifier(this.#props.queryNode, modifier.toOperationNode())
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     *
     * If you want to conditionally call a method on `this`, see
     * the {@link $if} method.
     *
     * ### Examples
     *
     * The next example uses a helper function `log` to log a query:
     *
     * ```ts
     * import type { Compilable } from 'kysely'
     *
     * function log<T extends Compilable>(qb: T): T {
     *   console.log(qb.compile())
     *   return qb
     * }
     *
     * await db.deleteFrom('person')
     *   .$call(log)
     *   .execute()
     * ```
     */ $call(func) {
        return func(this);
    }
    /**
     * Call `func(this)` if `condition` is true.
     *
     * This method is especially handy with optional selects. Any `returning` or `returningAll`
     * method calls add columns as optional fields to the output type when called inside
     * the `func` callback. This is because we can't know if those selections were actually
     * made before running the code.
     *
     * You can also call any other methods inside the callback.
     *
     * ### Examples
     *
     * ```ts
     * async function deletePerson(id: number, returnLastName: boolean) {
     *   return await db
     *     .deleteFrom('person')
     *     .where('id', '=', id)
     *     .returning(['id', 'first_name'])
     *     .$if(returnLastName, (qb) => qb.returning('last_name'))
     *     .executeTakeFirstOrThrow()
     * }
     * ```
     *
     * Any selections added inside the `if` callback will be added as optional fields to the
     * output type since we can't know if the selections were actually made before running
     * the code. In the example above the return type of the `deletePerson` function is:
     *
     * ```ts
     * Promise<{
     *   id: number
     *   first_name: string
     *   last_name?: string
     * }>
     * ```
     */ $if(condition, func) {
        if (condition) {
            return func(this);
        }
        return new DeleteQueryBuilder({
            ...this.#props
        });
    }
    /**
     * Change the output type of the query.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `DeleteQueryBuilder` with a new output type.
     */ $castTo() {
        return new DeleteQueryBuilder(this.#props);
    }
    /**
     * Narrows (parts of) the output type of the query.
     *
     * Kysely tries to be as type-safe as possible, but in some cases we have to make
     * compromises for better maintainability and compilation performance. At present,
     * Kysely doesn't narrow the output type of the query when using {@link where} and {@link returning} or {@link returningAll}.
     *
     * This utility method is very useful for these situations, as it removes unncessary
     * runtime assertion/guard code. Its input type is limited to the output type
     * of the query, so you can't add a column that doesn't exist, or change a column's
     * type to something that doesn't exist in its union type.
     *
     * ### Examples
     *
     * Turn this code:
     *
     * ```ts
     * import type { Person } from 'type-editor' // imaginary module
     *
     * const person = await db.deleteFrom('person')
     *   .where('id', '=', 3)
     *   .where('nullable_column', 'is not', null)
     *   .returningAll()
     *   .executeTakeFirstOrThrow()
     *
     * if (isWithNoNullValue(person)) {
     *   functionThatExpectsPersonWithNonNullValue(person)
     * }
     *
     * function isWithNoNullValue(person: Person): person is Person & { nullable_column: string } {
     *   return person.nullable_column != null
     * }
     * ```
     *
     * Into this:
     *
     * ```ts
     * import type { NotNull } from 'kysely'
     *
     * const person = await db.deleteFrom('person')
     *   .where('id', '=', 3)
     *   .where('nullable_column', 'is not', null)
     *   .returningAll()
     *   .$narrowType<{ nullable_column: NotNull }>()
     *   .executeTakeFirstOrThrow()
     *
     * functionThatExpectsPersonWithNonNullValue(person)
     * ```
     */ $narrowType() {
        return new DeleteQueryBuilder(this.#props);
    }
    /**
     * Asserts that query's output row type equals the given type `T`.
     *
     * This method can be used to simplify excessively complex types to make TypeScript happy
     * and much faster.
     *
     * Kysely uses complex type magic to achieve its type safety. This complexity is sometimes too much
     * for TypeScript and you get errors like this:
     *
     * ```
     * error TS2589: Type instantiation is excessively deep and possibly infinite.
     * ```
     *
     * In these case you can often use this method to help TypeScript a little bit. When you use this
     * method to assert the output type of a query, Kysely can drop the complex output type that
     * consists of multiple nested helper types and replace it with the simple asserted type.
     *
     * Using this method doesn't reduce type safety at all. You have to pass in a type that is
     * structurally equal to the current type.
     *
     * ### Examples
     *
     * ```ts
     * import type { Species } from 'type-editor' // imaginary module
     *
     * async function deletePersonAndPets(personId: number) {
     *   return await db
     *     .with('deleted_person', (qb) => qb
     *        .deleteFrom('person')
     *        .where('id', '=', personId)
     *        .returning('first_name')
     *        .$assertType<{ first_name: string }>()
     *     )
     *     .with('deleted_pets', (qb) => qb
     *       .deleteFrom('pet')
     *       .where('owner_id', '=', personId)
     *       .returning(['name as pet_name', 'species'])
     *       .$assertType<{ pet_name: string, species: Species }>()
     *     )
     *     .selectFrom(['deleted_person', 'deleted_pets'])
     *     .selectAll()
     *     .execute()
     * }
     * ```
     */ $assertType() {
        return new DeleteQueryBuilder(this.#props);
    }
    /**
     * Returns a copy of this DeleteQueryBuilder instance with the given plugin installed.
     */ withPlugin(plugin) {
        return new DeleteQueryBuilder({
            ...this.#props,
            executor: this.#props.executor.withPlugin(plugin)
        });
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.queryNode, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    /**
     * Executes the query and returns an array of rows.
     *
     * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
     */ async execute() {
        const compiledQuery = this.compile();
        const result = await this.#props.executor.executeQuery(compiledQuery);
        const { adapter } = this.#props.executor;
        const query = compiledQuery.query;
        if (query.returning && adapter.supportsReturning || query.output && adapter.supportsOutput) {
            return result.rows;
        }
        return [
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$delete$2d$result$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DeleteResult"](result.numAffectedRows ?? BigInt(0))
        ];
    }
    /**
     * Executes the query and returns the first result or undefined if
     * the query returned no result.
     */ async executeTakeFirst() {
        const [result] = await this.execute();
        return result;
    }
    /**
     * Executes the query and returns the first result or throws if
     * the query returned no result.
     *
     * By default an instance of {@link NoResultError} is thrown, but you can
     * provide a custom error class, or callback as the only argument to throw a different
     * error.
     */ async executeTakeFirstOrThrow(errorConstructor = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$no$2d$result$2d$error$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NoResultError"]) {
        const result = await this.executeTakeFirst();
        if (result === undefined) {
            const error = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$no$2d$result$2d$error$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isNoResultErrorConstructor"])(errorConstructor) ? new errorConstructor(this.toOperationNode()) : errorConstructor(this.toOperationNode());
            throw error;
        }
        return result;
    }
    async *stream(chunkSize = 100) {
        const compiledQuery = this.compile();
        const stream = this.#props.executor.stream(compiledQuery, chunkSize);
        for await (const item of stream){
            yield* item.rows;
        }
    }
    async explain(format, options) {
        const builder = new DeleteQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithExplain(this.#props.queryNode, format, options)
        });
        return await builder.execute();
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/update-result.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./update-result.d.ts" />
__turbopack_context__.s([
    "UpdateResult",
    ()=>UpdateResult
]);
class UpdateResult {
    /**
     * The number of rows the update query updated (even if not changed).
     */ numUpdatedRows;
    /**
     * The number of rows the update query changed.
     *
     * This is **optional** and only supported in dialects such as MySQL.
     * You would probably use {@link numUpdatedRows} in most cases.
     */ numChangedRows;
    constructor(numUpdatedRows, numChangedRows){
        this.numUpdatedRows = numUpdatedRows;
        this.numChangedRows = numChangedRows;
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/update-query-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./update-query-builder.d.ts" />
__turbopack_context__.s([
    "UpdateQueryBuilder",
    ()=>UpdateQueryBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$join$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/join-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/table-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$select$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/select-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/query-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$update$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/update-query-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$update$2d$set$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/update-set-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$update$2d$result$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/update-result.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$no$2d$result$2d$error$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/no-result-error.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/binary-operation-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$value$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/value-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$limit$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/limit-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$top$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/top-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$order$2d$by$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/order-by-parser.js [app-route] (ecmascript)");
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
class UpdateQueryBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    where(...args) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithWhere(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseValueBinaryOperationOrExpression"])(args))
        });
    }
    whereRef(lhs, op, rhs) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithWhere(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseReferentialBinaryOperation"])(lhs, op, rhs))
        });
    }
    clearWhere() {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithoutWhere(this.#props.queryNode)
        });
    }
    /**
     * Changes an `update` query into a `update top` query.
     *
     * `top` clause is only supported by some dialects like MS SQL Server.
     *
     * ### Examples
     *
     * Update the first row:
     *
     * ```ts
     * await db.updateTable('person')
     *   .top(1)
     *   .set({ first_name: 'Foo' })
     *   .where('age', '>', 18)
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * update top(1) "person" set "first_name" = @1 where "age" > @2
     * ```
     *
     * Update the 50% first rows:
     *
     * ```ts
     * await db.updateTable('person')
     *   .top(50, 'percent')
     *   .set({ first_name: 'Foo' })
     *   .where('age', '>', 18)
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * update top(50) percent "person" set "first_name" = @1 where "age" > @2
     * ```
     */ top(expression, modifiers) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithTop(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$top$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseTop"])(expression, modifiers))
        });
    }
    from(from) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$update$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UpdateQueryNode"].cloneWithFromItems(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseTableExpressionOrList"])(from))
        });
    }
    innerJoin(...args) {
        return this.#join('InnerJoin', args);
    }
    leftJoin(...args) {
        return this.#join('LeftJoin', args);
    }
    rightJoin(...args) {
        return this.#join('RightJoin', args);
    }
    fullJoin(...args) {
        return this.#join('FullJoin', args);
    }
    #join(joinType, args) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithJoin(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$join$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseJoin"])(joinType, args))
        });
    }
    orderBy(...args) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithOrderByItems(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$order$2d$by$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseOrderBy"])(args))
        });
    }
    clearOrderBy() {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithoutOrderBy(this.#props.queryNode)
        });
    }
    /**
     * Adds a limit clause to the update query for supported databases, such as MySQL.
     *
     * ### Examples
     *
     * Update the first 2 rows in the 'person' table:
     *
     * ```ts
     * await db
     *   .updateTable('person')
     *   .set({ first_name: 'Foo' })
     *   .limit(2)
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * update `person` set `first_name` = ? limit ?
     * ```
     */ limit(limit) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$update$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UpdateQueryNode"].cloneWithLimit(this.#props.queryNode, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$limit$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LimitNode"].create((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$value$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseValueExpression"])(limit)))
        });
    }
    set(...args) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$update$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UpdateQueryNode"].cloneWithUpdates(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$update$2d$set$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseUpdate"])(...args))
        });
    }
    returning(selection) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithReturning(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$select$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSelectArg"])(selection))
        });
    }
    returningAll(table) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithReturning(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$select$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSelectAll"])(table))
        });
    }
    output(args) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithOutput(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$select$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSelectArg"])(args))
        });
    }
    outputAll(table) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithOutput(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$select$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSelectAll"])(table))
        });
    }
    /**
     * This can be used to add any additional SQL to the end of the query.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.updateTable('person')
     *   .set({ age: 39 })
     *   .where('first_name', '=', 'John')
     *   .modifyEnd(sql.raw('-- This is a comment'))
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * update `person`
     * set `age` = 39
     * where `first_name` = "John" -- This is a comment
     * ```
     */ modifyEnd(modifier) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithEndModifier(this.#props.queryNode, modifier.toOperationNode())
        });
    }
    /**
     * Clears all `returning` clauses from the query.
     *
     * ### Examples
     *
     * ```ts
     * db.updateTable('person')
     *   .returningAll()
     *   .set({ age: 39 })
     *   .where('first_name', '=', 'John')
     *   .clearReturning()
     * ```
     *
     * The generated SQL(PostgreSQL):
     *
     * ```sql
     * update "person" set "age" = 39 where "first_name" = "John"
     * ```
     */ clearReturning() {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithoutReturning(this.#props.queryNode)
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     *
     * If you want to conditionally call a method on `this`, see
     * the {@link $if} method.
     *
     * ### Examples
     *
     * The next example uses a helper function `log` to log a query:
     *
     * ```ts
     * import type { Compilable } from 'kysely'
     * import type { PersonUpdate } from 'type-editor' // imaginary module
     *
     * function log<T extends Compilable>(qb: T): T {
     *   console.log(qb.compile())
     *   return qb
     * }
     *
     * const values = {
     *   first_name: 'John',
     * } satisfies PersonUpdate
     *
     * db.updateTable('person')
     *   .set(values)
     *   .$call(log)
     *   .execute()
     * ```
     */ $call(func) {
        return func(this);
    }
    /**
     * Call `func(this)` if `condition` is true.
     *
     * This method is especially handy with optional selects. Any `returning` or `returningAll`
     * method calls add columns as optional fields to the output type when called inside
     * the `func` callback. This is because we can't know if those selections were actually
     * made before running the code.
     *
     * You can also call any other methods inside the callback.
     *
     * ### Examples
     *
     * ```ts
     * import type { PersonUpdate } from 'type-editor' // imaginary module
     *
     * async function updatePerson(id: number, updates: PersonUpdate, returnLastName: boolean) {
     *   return await db
     *     .updateTable('person')
     *     .set(updates)
     *     .where('id', '=', id)
     *     .returning(['id', 'first_name'])
     *     .$if(returnLastName, (qb) => qb.returning('last_name'))
     *     .executeTakeFirstOrThrow()
     * }
     * ```
     *
     * Any selections added inside the `if` callback will be added as optional fields to the
     * output type since we can't know if the selections were actually made before running
     * the code. In the example above the return type of the `updatePerson` function is:
     *
     * ```ts
     * Promise<{
     *   id: number
     *   first_name: string
     *   last_name?: string
     * }>
     * ```
     */ $if(condition, func) {
        if (condition) {
            return func(this);
        }
        return new UpdateQueryBuilder({
            ...this.#props
        });
    }
    /**
     * Change the output type of the query.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `UpdateQueryBuilder` with a new output type.
     */ $castTo() {
        return new UpdateQueryBuilder(this.#props);
    }
    /**
     * Narrows (parts of) the output type of the query.
     *
     * Kysely tries to be as type-safe as possible, but in some cases we have to make
     * compromises for better maintainability and compilation performance. At present,
     * Kysely doesn't narrow the output type of the query based on {@link set} input
     * when using {@link where} and/or {@link returning} or {@link returningAll}.
     *
     * This utility method is very useful for these situations, as it removes unncessary
     * runtime assertion/guard code. Its input type is limited to the output type
     * of the query, so you can't add a column that doesn't exist, or change a column's
     * type to something that doesn't exist in its union type.
     *
     * ### Examples
     *
     * Turn this code:
     *
     * ```ts
     * import type { Person } from 'type-editor' // imaginary module
     *
     * const id = 1
     * const now = new Date().toISOString()
     *
     * const person = await db.updateTable('person')
     *   .set({ deleted_at: now })
     *   .where('id', '=', id)
     *   .where('nullable_column', 'is not', null)
     *   .returningAll()
     *   .executeTakeFirstOrThrow()
     *
     * if (isWithNoNullValue(person)) {
     *   functionThatExpectsPersonWithNonNullValue(person)
     * }
     *
     * function isWithNoNullValue(person: Person): person is Person & { nullable_column: string } {
     *   return person.nullable_column != null
     * }
     * ```
     *
     * Into this:
     *
     * ```ts
     * import type { NotNull } from 'kysely'
     *
     * const id = 1
     * const now = new Date().toISOString()
     *
     * const person = await db.updateTable('person')
     *   .set({ deleted_at: now })
     *   .where('id', '=', id)
     *   .where('nullable_column', 'is not', null)
     *   .returningAll()
     *   .$narrowType<{ deleted_at: Date; nullable_column: NotNull }>()
     *   .executeTakeFirstOrThrow()
     *
     * functionThatExpectsPersonWithNonNullValue(person)
     * ```
     */ $narrowType() {
        return new UpdateQueryBuilder(this.#props);
    }
    /**
     * Asserts that query's output row type equals the given type `T`.
     *
     * This method can be used to simplify excessively complex types to make TypeScript happy
     * and much faster.
     *
     * Kysely uses complex type magic to achieve its type safety. This complexity is sometimes too much
     * for TypeScript and you get errors like this:
     *
     * ```
     * error TS2589: Type instantiation is excessively deep and possibly infinite.
     * ```
     *
     * In these case you can often use this method to help TypeScript a little bit. When you use this
     * method to assert the output type of a query, Kysely can drop the complex output type that
     * consists of multiple nested helper types and replace it with the simple asserted type.
     *
     * Using this method doesn't reduce type safety at all. You have to pass in a type that is
     * structurally equal to the current type.
     *
     * ### Examples
     *
     * ```ts
     * import type { PersonUpdate, PetUpdate, Species } from 'type-editor' // imaginary module
     *
     * const person = {
     *   id: 1,
     *   gender: 'other',
     * } satisfies PersonUpdate
     *
     * const pet = {
     *   name: 'Fluffy',
     * } satisfies PetUpdate
     *
     * const result = await db
     *   .with('updated_person', (qb) => qb
     *     .updateTable('person')
     *     .set(person)
     *     .where('id', '=', person.id)
     *     .returning('first_name')
     *     .$assertType<{ first_name: string }>()
     *   )
     *   .with('updated_pet', (qb) => qb
     *     .updateTable('pet')
     *     .set(pet)
     *     .where('owner_id', '=', person.id)
     *     .returning(['name as pet_name', 'species'])
     *     .$assertType<{ pet_name: string, species: Species }>()
     *   )
     *   .selectFrom(['updated_person', 'updated_pet'])
     *   .selectAll()
     *   .executeTakeFirstOrThrow()
     * ```
     */ $assertType() {
        return new UpdateQueryBuilder(this.#props);
    }
    /**
     * Returns a copy of this UpdateQueryBuilder instance with the given plugin installed.
     */ withPlugin(plugin) {
        return new UpdateQueryBuilder({
            ...this.#props,
            executor: this.#props.executor.withPlugin(plugin)
        });
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.queryNode, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    /**
     * Executes the query and returns an array of rows.
     *
     * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
     */ async execute() {
        const compiledQuery = this.compile();
        const result = await this.#props.executor.executeQuery(compiledQuery);
        const { adapter } = this.#props.executor;
        const query = compiledQuery.query;
        if (query.returning && adapter.supportsReturning || query.output && adapter.supportsOutput) {
            return result.rows;
        }
        return [
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$update$2d$result$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UpdateResult"](result.numAffectedRows ?? BigInt(0), result.numChangedRows)
        ];
    }
    /**
     * Executes the query and returns the first result or undefined if
     * the query returned no result.
     */ async executeTakeFirst() {
        const [result] = await this.execute();
        return result;
    }
    /**
     * Executes the query and returns the first result or throws if
     * the query returned no result.
     *
     * By default an instance of {@link NoResultError} is thrown, but you can
     * provide a custom error class, or callback as the only argument to throw a different
     * error.
     */ async executeTakeFirstOrThrow(errorConstructor = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$no$2d$result$2d$error$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NoResultError"]) {
        const result = await this.executeTakeFirst();
        if (result === undefined) {
            const error = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$no$2d$result$2d$error$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isNoResultErrorConstructor"])(errorConstructor) ? new errorConstructor(this.toOperationNode()) : errorConstructor(this.toOperationNode());
            throw error;
        }
        return result;
    }
    async *stream(chunkSize = 100) {
        const compiledQuery = this.compile();
        const stream = this.#props.executor.stream(compiledQuery, chunkSize);
        for await (const item of stream){
            yield* item.rows;
        }
    }
    async explain(format, options) {
        const builder = new UpdateQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithExplain(this.#props.queryNode, format, options)
        });
        return await builder.execute();
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/cte-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./cte-builder.d.ts" />
__turbopack_context__.s([
    "CTEBuilder",
    ()=>CTEBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$common$2d$table$2d$expression$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/common-table-expression-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
;
;
class CTEBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    /**
     * Makes the common table expression materialized.
     */ materialized() {
        return new CTEBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$common$2d$table$2d$expression$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CommonTableExpressionNode"].cloneWith(this.#props.node, {
                materialized: true
            })
        });
    }
    /**
     * Makes the common table expression not materialized.
     */ notMaterialized() {
        return new CTEBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$common$2d$table$2d$expression$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CommonTableExpressionNode"].cloneWith(this.#props.node, {
                materialized: false
            })
        });
    }
    toOperationNode() {
        return this.#props.node;
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/merge-result.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./merge-result.d.ts" />
__turbopack_context__.s([
    "MergeResult",
    ()=>MergeResult
]);
class MergeResult {
    numChangedRows;
    constructor(numChangedRows){
        this.numChangedRows = numChangedRows;
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/merge-query-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./merge-query-builder.d.ts" />
__turbopack_context__.s([
    "MatchedThenableMergeQueryBuilder",
    ()=>MatchedThenableMergeQueryBuilder,
    "MergeQueryBuilder",
    ()=>MergeQueryBuilder,
    "NotMatchedThenableMergeQueryBuilder",
    ()=>NotMatchedThenableMergeQueryBuilder,
    "WheneableMergeQueryBuilder",
    ()=>WheneableMergeQueryBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$insert$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/insert-query-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$merge$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/merge-query-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/query-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$update$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/update-query-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$insert$2d$values$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/insert-values-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$join$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/join-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$merge$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/merge-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$select$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/select-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$top$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/top-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$executor$2f$noop$2d$query$2d$executor$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-executor/noop-query-executor.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$merge$2d$result$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/merge-result.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$no$2d$result$2d$error$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/no-result-error.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$update$2d$query$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/update-query-builder.js [app-route] (ecmascript)");
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
class MergeQueryBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    /**
     * This can be used to add any additional SQL to the end of the query.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db
     *   .mergeInto('person')
     *   .using('pet', 'pet.owner_id', 'person.id')
     *   .whenMatched()
     *   .thenDelete()
     *   .modifyEnd(sql.raw('-- this is a comment'))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person" using "pet" on "pet"."owner_id" = "person"."id" when matched then delete -- this is a comment
     * ```
     */ modifyEnd(modifier) {
        return new MergeQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithEndModifier(this.#props.queryNode, modifier.toOperationNode())
        });
    }
    /**
     * Changes a `merge into` query to an `merge top into` query.
     *
     * `top` clause is only supported by some dialects like MS SQL Server.
     *
     * ### Examples
     *
     * Affect 5 matched rows at most:
     *
     * ```ts
     * await db.mergeInto('person')
     *   .top(5)
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenMatched()
     *   .thenDelete()
     *   .execute()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * merge top(5) into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when matched then
     *   delete
     * ```
     *
     * Affect 50% of matched rows:
     *
     * ```ts
     * await db.mergeInto('person')
     *   .top(50, 'percent')
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenMatched()
     *   .thenDelete()
     *   .execute()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * merge top(50) percent into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when matched then
     *   delete
     * ```
     */ top(expression, modifiers) {
        return new MergeQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithTop(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$top$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseTop"])(expression, modifiers))
        });
    }
    using(...args) {
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$merge$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MergeQueryNode"].cloneWithUsing(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$join$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseJoin"])('Using', args))
        });
    }
    returning(args) {
        return new MergeQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithReturning(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$select$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSelectArg"])(args))
        });
    }
    returningAll(table) {
        return new MergeQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithReturning(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$select$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSelectAll"])(table))
        });
    }
    output(args) {
        return new MergeQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithOutput(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$select$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSelectArg"])(args))
        });
    }
    outputAll(table) {
        return new MergeQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithOutput(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$select$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSelectAll"])(table))
        });
    }
}
class WheneableMergeQueryBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    /**
     * This can be used to add any additional SQL to the end of the query.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db
     *   .mergeInto('person')
     *   .using('pet', 'pet.owner_id', 'person.id')
     *   .whenMatched()
     *   .thenDelete()
     *   .modifyEnd(sql.raw('-- this is a comment'))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person" using "pet" on "pet"."owner_id" = "person"."id" when matched then delete -- this is a comment
     * ```
     */ modifyEnd(modifier) {
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithEndModifier(this.#props.queryNode, modifier.toOperationNode())
        });
    }
    /**
     * See {@link MergeQueryBuilder.top}.
     */ top(expression, modifiers) {
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithTop(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$top$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseTop"])(expression, modifiers))
        });
    }
    /**
     * Adds a simple `when matched` clause to the query.
     *
     * For a `when matched` clause with an `and` condition, see {@link whenMatchedAnd}.
     *
     * For a simple `when not matched` clause, see {@link whenNotMatched}.
     *
     * For a `when not matched` clause with an `and` condition, see {@link whenNotMatchedAnd}.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.mergeInto('person')
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenMatched()
     *   .thenDelete()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when matched then
     *   delete
     * ```
     */ whenMatched() {
        return this.#whenMatched([]);
    }
    whenMatchedAnd(...args) {
        return this.#whenMatched(args);
    }
    /**
     * Adds the `when matched` clause to the query with an `and` condition. But unlike
     * {@link whenMatchedAnd}, this method accepts a column reference as the 3rd argument.
     *
     * This method is similar to {@link SelectQueryBuilder.whereRef}, so see the documentation
     * for that method for more examples.
     */ whenMatchedAndRef(lhs, op, rhs) {
        return this.#whenMatched([
            lhs,
            op,
            rhs
        ], true);
    }
    #whenMatched(args, refRight) {
        return new MatchedThenableMergeQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$merge$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MergeQueryNode"].cloneWithWhen(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$merge$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseMergeWhen"])({
                isMatched: true
            }, args, refRight))
        });
    }
    /**
     * Adds a simple `when not matched` clause to the query.
     *
     * For a `when not matched` clause with an `and` condition, see {@link whenNotMatchedAnd}.
     *
     * For a simple `when matched` clause, see {@link whenMatched}.
     *
     * For a `when matched` clause with an `and` condition, see {@link whenMatchedAnd}.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.mergeInto('person')
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenNotMatched()
     *   .thenInsertValues({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *   })
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when not matched then
     *   insert ("first_name", "last_name") values ($1, $2)
     * ```
     */ whenNotMatched() {
        return this.#whenNotMatched([]);
    }
    whenNotMatchedAnd(...args) {
        return this.#whenNotMatched(args);
    }
    /**
     * Adds the `when not matched` clause to the query with an `and` condition. But unlike
     * {@link whenNotMatchedAnd}, this method accepts a column reference as the 3rd argument.
     *
     * Unlike {@link whenMatchedAndRef}, you cannot reference columns from the target table.
     *
     * This method is similar to {@link SelectQueryBuilder.whereRef}, so see the documentation
     * for that method for more examples.
     */ whenNotMatchedAndRef(lhs, op, rhs) {
        return this.#whenNotMatched([
            lhs,
            op,
            rhs
        ], true);
    }
    /**
     * Adds a simple `when not matched by source` clause to the query.
     *
     * Supported in MS SQL Server.
     *
     * Similar to {@link whenNotMatched}, but returns a {@link MatchedThenableMergeQueryBuilder}.
     */ whenNotMatchedBySource() {
        return this.#whenNotMatched([], false, true);
    }
    whenNotMatchedBySourceAnd(...args) {
        return this.#whenNotMatched(args, false, true);
    }
    /**
     * Adds the `when not matched by source` clause to the query with an `and` condition.
     *
     * Similar to {@link whenNotMatchedAndRef}, but you can reference columns from
     * the target table, and not from source table and returns a {@link MatchedThenableMergeQueryBuilder}.
     */ whenNotMatchedBySourceAndRef(lhs, op, rhs) {
        return this.#whenNotMatched([
            lhs,
            op,
            rhs
        ], true, true);
    }
    returning(args) {
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithReturning(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$select$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSelectArg"])(args))
        });
    }
    returningAll(table) {
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithReturning(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$select$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSelectAll"])(table))
        });
    }
    output(args) {
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithOutput(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$select$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSelectArg"])(args))
        });
    }
    outputAll(table) {
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithOutput(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$select$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSelectAll"])(table))
        });
    }
    #whenNotMatched(args, refRight = false, bySource = false) {
        const props = {
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$merge$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MergeQueryNode"].cloneWithWhen(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$merge$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseMergeWhen"])({
                isMatched: false,
                bySource
            }, args, refRight))
        };
        const Builder = bySource ? MatchedThenableMergeQueryBuilder : NotMatchedThenableMergeQueryBuilder;
        return new Builder(props);
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     *
     * If you want to conditionally call a method on `this`, see
     * the {@link $if} method.
     *
     * ### Examples
     *
     * The next example uses a helper function `log` to log a query:
     *
     * ```ts
     * import type { Compilable } from 'kysely'
     *
     * function log<T extends Compilable>(qb: T): T {
     *   console.log(qb.compile())
     *   return qb
     * }
     *
     * await db.updateTable('person')
     *   .set({ first_name: 'John' })
     *   .$call(log)
     *   .execute()
     * ```
     */ $call(func) {
        return func(this);
    }
    /**
     * Call `func(this)` if `condition` is true.
     *
     * This method is especially handy with optional selects. Any `returning` or `returningAll`
     * method calls add columns as optional fields to the output type when called inside
     * the `func` callback. This is because we can't know if those selections were actually
     * made before running the code.
     *
     * You can also call any other methods inside the callback.
     *
     * ### Examples
     *
     * ```ts
     * import type { PersonUpdate } from 'type-editor' // imaginary module
     *
     * async function updatePerson(id: number, updates: PersonUpdate, returnLastName: boolean) {
     *   return await db
     *     .updateTable('person')
     *     .set(updates)
     *     .where('id', '=', id)
     *     .returning(['id', 'first_name'])
     *     .$if(returnLastName, (qb) => qb.returning('last_name'))
     *     .executeTakeFirstOrThrow()
     * }
     * ```
     *
     * Any selections added inside the `if` callback will be added as optional fields to the
     * output type since we can't know if the selections were actually made before running
     * the code. In the example above the return type of the `updatePerson` function is:
     *
     * ```ts
     * Promise<{
     *   id: number
     *   first_name: string
     *   last_name?: string
     * }>
     * ```
     */ $if(condition, func) {
        if (condition) {
            return func(this);
        }
        return new WheneableMergeQueryBuilder({
            ...this.#props
        });
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.queryNode, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    /**
     * Executes the query and returns an array of rows.
     *
     * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
     */ async execute() {
        const compiledQuery = this.compile();
        const result = await this.#props.executor.executeQuery(compiledQuery);
        const { adapter } = this.#props.executor;
        const query = compiledQuery.query;
        if (query.returning && adapter.supportsReturning || query.output && adapter.supportsOutput) {
            return result.rows;
        }
        return [
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$merge$2d$result$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MergeResult"](result.numAffectedRows)
        ];
    }
    /**
     * Executes the query and returns the first result or undefined if
     * the query returned no result.
     */ async executeTakeFirst() {
        const [result] = await this.execute();
        return result;
    }
    /**
     * Executes the query and returns the first result or throws if
     * the query returned no result.
     *
     * By default an instance of {@link NoResultError} is thrown, but you can
     * provide a custom error class, or callback as the only argument to throw a different
     * error.
     */ async executeTakeFirstOrThrow(errorConstructor = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$no$2d$result$2d$error$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NoResultError"]) {
        const result = await this.executeTakeFirst();
        if (result === undefined) {
            const error = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$no$2d$result$2d$error$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isNoResultErrorConstructor"])(errorConstructor) ? new errorConstructor(this.toOperationNode()) : errorConstructor(this.toOperationNode());
            throw error;
        }
        return result;
    }
}
class MatchedThenableMergeQueryBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    /**
     * Performs the `delete` action.
     *
     * To perform the `do nothing` action, see {@link thenDoNothing}.
     *
     * To perform the `update` action, see {@link thenUpdate} or {@link thenUpdateSet}.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.mergeInto('person')
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenMatched()
     *   .thenDelete()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when matched then
     *   delete
     * ```
     */ thenDelete() {
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$merge$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MergeQueryNode"].cloneWithThen(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$merge$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseMergeThen"])('delete'))
        });
    }
    /**
     * Performs the `do nothing` action.
     *
     * This is supported in PostgreSQL.
     *
     * To perform the `delete` action, see {@link thenDelete}.
     *
     * To perform the `update` action, see {@link thenUpdate} or {@link thenUpdateSet}.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.mergeInto('person')
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenMatched()
     *   .thenDoNothing()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when matched then
     *   do nothing
     * ```
     */ thenDoNothing() {
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$merge$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MergeQueryNode"].cloneWithThen(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$merge$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseMergeThen"])('do nothing'))
        });
    }
    /**
     * Perform an `update` operation with a full-fledged {@link UpdateQueryBuilder}.
     * This is handy when multiple `set` invocations are needed.
     *
     * For a shorthand version of this method, see {@link thenUpdateSet}.
     *
     * To perform the `delete` action, see {@link thenDelete}.
     *
     * To perform the `do nothing` action, see {@link thenDoNothing}.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const result = await db.mergeInto('person')
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenMatched()
     *   .thenUpdate((ub) => ub
     *     .set(sql`metadata['has_pets']`, 'Y')
     *     .set({
     *       updated_at: new Date().toISOString(),
     *     })
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when matched then
     *   update set metadata['has_pets'] = $1, "updated_at" = $2
     * ```
     */ thenUpdate(set) {
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$merge$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MergeQueryNode"].cloneWithThen(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$merge$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseMergeThen"])(set(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$update$2d$query$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UpdateQueryBuilder"]({
                queryId: this.#props.queryId,
                executor: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$executor$2f$noop$2d$query$2d$executor$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NOOP_QUERY_EXECUTOR"],
                queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$update$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UpdateQueryNode"].createWithoutTable()
            }))))
        });
    }
    thenUpdateSet(...args) {
        // @ts-ignore not sure how to type this so it won't complain about set(...args).
        return this.thenUpdate((ub)=>ub.set(...args));
    }
}
class NotMatchedThenableMergeQueryBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    /**
     * Performs the `do nothing` action.
     *
     * This is supported in PostgreSQL.
     *
     * To perform the `insert` action, see {@link thenInsertValues}.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.mergeInto('person')
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenNotMatched()
     *   .thenDoNothing()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when not matched then
     *   do nothing
     * ```
     */ thenDoNothing() {
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$merge$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MergeQueryNode"].cloneWithThen(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$merge$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseMergeThen"])('do nothing'))
        });
    }
    thenInsertValues(insert) {
        const [columns, values] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$insert$2d$values$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseInsertExpression"])(insert);
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$merge$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MergeQueryNode"].cloneWithThen(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$merge$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseMergeThen"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$insert$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InsertQueryNode"].cloneWith(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$insert$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InsertQueryNode"].createWithoutInto(), {
                columns,
                values
            })))
        });
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/select-query-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./select-query-builder.d.ts" />
__turbopack_context__.s([
    "createSelectQueryBuilder",
    ()=>createSelectQueryBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alias$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/alias-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$modifier$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/select-modifier-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$join$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/join-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/table-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$select$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/select-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$reference$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/reference-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/select-query-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/query-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$order$2d$by$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/order-by-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$limit$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/limit-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$offset$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/offset-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$group$2d$by$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/group-by-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$no$2d$result$2d$error$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/no-result-error.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$identifier$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/identifier-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$set$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/set-operation-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/binary-operation-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$expression$2f$expression$2d$wrapper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/expression/expression-wrapper.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$value$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/value-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$fetch$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/fetch-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$top$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/top-parser.js [app-route] (ecmascript)");
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
class SelectQueryBuilderImpl {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    get expressionType() {
        return undefined;
    }
    get isSelectQueryBuilder() {
        return true;
    }
    where(...args) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithWhere(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseValueBinaryOperationOrExpression"])(args))
        });
    }
    whereRef(lhs, op, rhs) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithWhere(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseReferentialBinaryOperation"])(lhs, op, rhs))
        });
    }
    having(...args) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectQueryNode"].cloneWithHaving(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseValueBinaryOperationOrExpression"])(args))
        });
    }
    havingRef(lhs, op, rhs) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectQueryNode"].cloneWithHaving(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseReferentialBinaryOperation"])(lhs, op, rhs))
        });
    }
    select(selection) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectQueryNode"].cloneWithSelections(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$select$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSelectArg"])(selection))
        });
    }
    distinctOn(selection) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectQueryNode"].cloneWithDistinctOn(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$reference$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseReferenceExpressionOrList"])(selection))
        });
    }
    modifyFront(modifier) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectQueryNode"].cloneWithFrontModifier(this.#props.queryNode, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$modifier$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectModifierNode"].createWithExpression(modifier.toOperationNode()))
        });
    }
    modifyEnd(modifier) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithEndModifier(this.#props.queryNode, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$modifier$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectModifierNode"].createWithExpression(modifier.toOperationNode()))
        });
    }
    distinct() {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectQueryNode"].cloneWithFrontModifier(this.#props.queryNode, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$modifier$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectModifierNode"].create('Distinct'))
        });
    }
    forUpdate(of) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithEndModifier(this.#props.queryNode, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$modifier$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectModifierNode"].create('ForUpdate', of ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["asArray"])(of).map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseTable"]) : undefined))
        });
    }
    forShare(of) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithEndModifier(this.#props.queryNode, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$modifier$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectModifierNode"].create('ForShare', of ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["asArray"])(of).map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseTable"]) : undefined))
        });
    }
    forKeyShare(of) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithEndModifier(this.#props.queryNode, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$modifier$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectModifierNode"].create('ForKeyShare', of ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["asArray"])(of).map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseTable"]) : undefined))
        });
    }
    forNoKeyUpdate(of) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithEndModifier(this.#props.queryNode, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$modifier$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectModifierNode"].create('ForNoKeyUpdate', of ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["asArray"])(of).map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseTable"]) : undefined))
        });
    }
    skipLocked() {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithEndModifier(this.#props.queryNode, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$modifier$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectModifierNode"].create('SkipLocked'))
        });
    }
    noWait() {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithEndModifier(this.#props.queryNode, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$modifier$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectModifierNode"].create('NoWait'))
        });
    }
    selectAll(table) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectQueryNode"].cloneWithSelections(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$select$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSelectAll"])(table))
        });
    }
    innerJoin(...args) {
        return this.#join('InnerJoin', args);
    }
    leftJoin(...args) {
        return this.#join('LeftJoin', args);
    }
    rightJoin(...args) {
        return this.#join('RightJoin', args);
    }
    fullJoin(...args) {
        return this.#join('FullJoin', args);
    }
    crossJoin(...args) {
        return this.#join('CrossJoin', args);
    }
    innerJoinLateral(...args) {
        return this.#join('LateralInnerJoin', args);
    }
    leftJoinLateral(...args) {
        return this.#join('LateralLeftJoin', args);
    }
    crossJoinLateral(...args) {
        return this.#join('LateralCrossJoin', args);
    }
    crossApply(...args) {
        return this.#join('CrossApply', args);
    }
    outerApply(...args) {
        return this.#join('OuterApply', args);
    }
    #join(joinType, args) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithJoin(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$join$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseJoin"])(joinType, args))
        });
    }
    orderBy(...args) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithOrderByItems(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$order$2d$by$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseOrderBy"])(args))
        });
    }
    groupBy(groupBy) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectQueryNode"].cloneWithGroupByItems(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$group$2d$by$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseGroupBy"])(groupBy))
        });
    }
    limit(limit) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectQueryNode"].cloneWithLimit(this.#props.queryNode, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$limit$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LimitNode"].create((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$value$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseValueExpression"])(limit)))
        });
    }
    offset(offset) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectQueryNode"].cloneWithOffset(this.#props.queryNode, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$offset$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OffsetNode"].create((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$value$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseValueExpression"])(offset)))
        });
    }
    fetch(rowCount, modifier = 'only') {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectQueryNode"].cloneWithFetch(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$fetch$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseFetch"])(rowCount, modifier))
        });
    }
    top(expression, modifiers) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithTop(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$top$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseTop"])(expression, modifiers))
        });
    }
    union(expression) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectQueryNode"].cloneWithSetOperations(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$set$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSetOperations"])('union', expression, false))
        });
    }
    unionAll(expression) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectQueryNode"].cloneWithSetOperations(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$set$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSetOperations"])('union', expression, true))
        });
    }
    intersect(expression) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectQueryNode"].cloneWithSetOperations(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$set$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSetOperations"])('intersect', expression, false))
        });
    }
    intersectAll(expression) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectQueryNode"].cloneWithSetOperations(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$set$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSetOperations"])('intersect', expression, true))
        });
    }
    except(expression) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectQueryNode"].cloneWithSetOperations(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$set$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSetOperations"])('except', expression, false))
        });
    }
    exceptAll(expression) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectQueryNode"].cloneWithSetOperations(this.#props.queryNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$set$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSetOperations"])('except', expression, true))
        });
    }
    as(alias) {
        return new AliasedSelectQueryBuilderImpl(this, alias);
    }
    clearSelect() {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectQueryNode"].cloneWithoutSelections(this.#props.queryNode)
        });
    }
    clearWhere() {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithoutWhere(this.#props.queryNode)
        });
    }
    clearLimit() {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectQueryNode"].cloneWithoutLimit(this.#props.queryNode)
        });
    }
    clearOffset() {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectQueryNode"].cloneWithoutOffset(this.#props.queryNode)
        });
    }
    clearOrderBy() {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithoutOrderBy(this.#props.queryNode)
        });
    }
    clearGroupBy() {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectQueryNode"].cloneWithoutGroupBy(this.#props.queryNode)
        });
    }
    $call(func) {
        return func(this);
    }
    $if(condition, func) {
        if (condition) {
            return func(this);
        }
        return new SelectQueryBuilderImpl({
            ...this.#props
        });
    }
    $castTo() {
        return new SelectQueryBuilderImpl(this.#props);
    }
    $narrowType() {
        return new SelectQueryBuilderImpl(this.#props);
    }
    $assertType() {
        return new SelectQueryBuilderImpl(this.#props);
    }
    $asTuple() {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$expression$2f$expression$2d$wrapper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExpressionWrapper"](this.toOperationNode());
    }
    $asScalar() {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$expression$2f$expression$2d$wrapper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExpressionWrapper"](this.toOperationNode());
    }
    withPlugin(plugin) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            executor: this.#props.executor.withPlugin(plugin)
        });
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.queryNode, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        const compiledQuery = this.compile();
        const result = await this.#props.executor.executeQuery(compiledQuery);
        return result.rows;
    }
    async executeTakeFirst() {
        const [result] = await this.execute();
        return result;
    }
    async executeTakeFirstOrThrow(errorConstructor = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$no$2d$result$2d$error$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NoResultError"]) {
        const result = await this.executeTakeFirst();
        if (result === undefined) {
            const error = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$no$2d$result$2d$error$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isNoResultErrorConstructor"])(errorConstructor) ? new errorConstructor(this.toOperationNode()) : errorConstructor(this.toOperationNode());
            throw error;
        }
        return result;
    }
    async *stream(chunkSize = 100) {
        const compiledQuery = this.compile();
        const stream = this.#props.executor.stream(compiledQuery, chunkSize);
        for await (const item of stream){
            yield* item.rows;
        }
    }
    async explain(format, options) {
        const builder = new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithExplain(this.#props.queryNode, format, options)
        });
        return await builder.execute();
    }
}
function createSelectQueryBuilder(props) {
    return new SelectQueryBuilderImpl(props);
}
/**
 * {@link SelectQueryBuilder} with an alias. The result of calling {@link SelectQueryBuilder.as}.
 */ class AliasedSelectQueryBuilderImpl {
    #queryBuilder;
    #alias;
    constructor(queryBuilder, alias){
        this.#queryBuilder = queryBuilder;
        this.#alias = alias;
    }
    get expression() {
        return this.#queryBuilder;
    }
    get alias() {
        return this.#alias;
    }
    get isAliasedSelectQueryBuilder() {
        return true;
    }
    toOperationNode() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alias$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AliasNode"].create(this.#queryBuilder.toOperationNode(), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$identifier$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IdentifierNode"].create(this.#alias));
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/aggregate-function-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./aggregate-function-builder.d.ts" />
__turbopack_context__.s([
    "AggregateFunctionBuilder",
    ()=>AggregateFunctionBuilder,
    "AliasedAggregateFunctionBuilder",
    ()=>AliasedAggregateFunctionBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$aggregate$2d$function$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/aggregate-function-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alias$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/alias-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$identifier$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/identifier-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/parse-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/binary-operation-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$order$2d$by$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/order-by-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/query-node.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
class AggregateFunctionBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    /** @private */ get expressionType() {
        return undefined;
    }
    /**
     * Returns an aliased version of the function.
     *
     * In addition to slapping `as "the_alias"` to the end of the SQL,
     * this method also provides strict typing:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select(
     *     (eb) => eb.fn.count<number>('id').as('person_count')
     *   )
     *   .executeTakeFirstOrThrow()
     *
     * // `person_count: number` field exists in the result type.
     * console.log(result.person_count)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select count("id") as "person_count"
     * from "person"
     * ```
     */ as(alias) {
        return new AliasedAggregateFunctionBuilder(this, alias);
    }
    /**
     * Adds a `distinct` clause inside the function.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select((eb) =>
     *     eb.fn.count<number>('first_name').distinct().as('first_name_count')
     *   )
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select count(distinct "first_name") as "first_name_count"
     * from "person"
     * ```
     */ distinct() {
        return new AggregateFunctionBuilder({
            ...this.#props,
            aggregateFunctionNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$aggregate$2d$function$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AggregateFunctionNode"].cloneWithDistinct(this.#props.aggregateFunctionNode)
        });
    }
    orderBy(...args) {
        return new AggregateFunctionBuilder({
            ...this.#props,
            aggregateFunctionNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithOrderByItems(this.#props.aggregateFunctionNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$order$2d$by$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseOrderBy"])(args))
        });
    }
    clearOrderBy() {
        return new AggregateFunctionBuilder({
            ...this.#props,
            aggregateFunctionNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithoutOrderBy(this.#props.aggregateFunctionNode)
        });
    }
    withinGroupOrderBy(...args) {
        return new AggregateFunctionBuilder({
            ...this.#props,
            aggregateFunctionNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$aggregate$2d$function$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AggregateFunctionNode"].cloneWithOrderBy(this.#props.aggregateFunctionNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$order$2d$by$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseOrderBy"])(args), true)
        });
    }
    filterWhere(...args) {
        return new AggregateFunctionBuilder({
            ...this.#props,
            aggregateFunctionNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$aggregate$2d$function$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AggregateFunctionNode"].cloneWithFilter(this.#props.aggregateFunctionNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseValueBinaryOperationOrExpression"])(args))
        });
    }
    /**
     * Adds a `filter` clause with a nested `where` clause after the function, where
     * both sides of the operator are references to columns.
     *
     * Similar to {@link WhereInterface}'s `whereRef` method.
     *
     * ### Examples
     *
     * Count people with same first and last names versus general public:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select((eb) => [
     *     eb.fn
     *       .count<number>('id')
     *       .filterWhereRef('first_name', '=', 'last_name')
     *       .as('repeat_name_count'),
     *     eb.fn.count<number>('id').as('total_count'),
     *   ])
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select
     *   count("id") filter(where "first_name" = "last_name") as "repeat_name_count",
     *   count("id") as "total_count"
     * from "person"
     * ```
     */ filterWhereRef(lhs, op, rhs) {
        return new AggregateFunctionBuilder({
            ...this.#props,
            aggregateFunctionNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$aggregate$2d$function$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AggregateFunctionNode"].cloneWithFilter(this.#props.aggregateFunctionNode, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseReferentialBinaryOperation"])(lhs, op, rhs))
        });
    }
    /**
     * Adds an `over` clause (window functions) after the function.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select(
     *     (eb) => eb.fn.avg<number>('age').over().as('average_age')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select avg("age") over() as "average_age"
     * from "person"
     * ```
     *
     * Also supports passing a callback that returns an over builder,
     * allowing to add partition by and sort by clauses inside over.
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select(
     *     (eb) => eb.fn.avg<number>('age').over(
     *       ob => ob.partitionBy('last_name').orderBy('first_name', 'asc')
     *     ).as('average_age')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select avg("age") over(partition by "last_name" order by "first_name" asc) as "average_age"
     * from "person"
     * ```
     */ over(over) {
        const builder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createOverBuilder"])();
        return new AggregateFunctionBuilder({
            ...this.#props,
            aggregateFunctionNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$aggregate$2d$function$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AggregateFunctionNode"].cloneWithOver(this.#props.aggregateFunctionNode, (over ? over(builder) : builder).toOperationNode())
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */ $call(func) {
        return func(this);
    }
    /**
     * Casts the expression to the given type.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `AggregateFunctionBuilder` with a new output type.
     */ $castTo() {
        return new AggregateFunctionBuilder(this.#props);
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
        return new AggregateFunctionBuilder(this.#props);
    }
    toOperationNode() {
        return this.#props.aggregateFunctionNode;
    }
}
class AliasedAggregateFunctionBuilder {
    #aggregateFunctionBuilder;
    #alias;
    constructor(aggregateFunctionBuilder, alias){
        this.#aggregateFunctionBuilder = aggregateFunctionBuilder;
        this.#alias = alias;
    }
    /** @private */ get expression() {
        return this.#aggregateFunctionBuilder;
    }
    /** @private */ get alias() {
        return this.#alias;
    }
    toOperationNode() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alias$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AliasNode"].create(this.#aggregateFunctionBuilder.toOperationNode(), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$identifier$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IdentifierNode"].create(this.#alias));
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/function-module.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./function-module.d.ts" />
__turbopack_context__.s([
    "createFunctionModule",
    ()=>createFunctionModule
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$expression$2f$expression$2d$wrapper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/expression/expression-wrapper.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$aggregate$2d$function$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/aggregate-function-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$function$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/function-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$reference$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/reference-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$select$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/select-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$aggregate$2d$function$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/aggregate-function-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/table-parser.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
function createFunctionModule() {
    const fn = (name, args)=>{
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$expression$2f$expression$2d$wrapper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExpressionWrapper"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$function$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FunctionNode"].create(name, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$reference$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseReferenceExpressionOrList"])(args ?? [])));
    };
    const agg = (name, args)=>{
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$aggregate$2d$function$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AggregateFunctionBuilder"]({
            aggregateFunctionNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$aggregate$2d$function$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AggregateFunctionNode"].create(name, args ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$reference$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseReferenceExpressionOrList"])(args) : undefined)
        });
    };
    return Object.assign(fn, {
        agg,
        avg (column) {
            return agg('avg', [
                column
            ]);
        },
        coalesce (...values) {
            return fn('coalesce', values);
        },
        count (column) {
            return agg('count', [
                column
            ]);
        },
        countAll (table) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$aggregate$2d$function$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AggregateFunctionBuilder"]({
                aggregateFunctionNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$aggregate$2d$function$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AggregateFunctionNode"].create('count', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$select$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSelectAll"])(table))
            });
        },
        max (column) {
            return agg('max', [
                column
            ]);
        },
        min (column) {
            return agg('min', [
                column
            ]);
        },
        sum (column) {
            return agg('sum', [
                column
            ]);
        },
        any (column) {
            return fn('any', [
                column
            ]);
        },
        jsonAgg (table) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$query$2d$builder$2f$aggregate$2d$function$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AggregateFunctionBuilder"]({
                aggregateFunctionNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$aggregate$2d$function$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AggregateFunctionNode"].create('json_agg', [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isString"])(table) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseTable"])(table) : table.toOperationNode()
                ])
            });
        },
        toJson (table) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$expression$2f$expression$2d$wrapper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExpressionWrapper"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$function$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FunctionNode"].create('to_json', [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isString"])(table) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseTable"])(table) : table.toOperationNode()
            ]));
        }
    });
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/case-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./case-builder.d.ts" />
__turbopack_context__.s([
    "CaseBuilder",
    ()=>CaseBuilder,
    "CaseEndBuilder",
    ()=>CaseEndBuilder,
    "CaseThenBuilder",
    ()=>CaseThenBuilder,
    "CaseWhenBuilder",
    ()=>CaseWhenBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$expression$2f$expression$2d$wrapper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/expression/expression-wrapper.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$case$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/case-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$when$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/when-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/binary-operation-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$value$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/value-parser.js [app-route] (ecmascript)");
;
;
;
;
;
;
class CaseBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    when(...args) {
        return new CaseThenBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$case$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CaseNode"].cloneWithWhen(this.#props.node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$when$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WhenNode"].create((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseValueBinaryOperationOrExpression"])(args)))
        });
    }
}
class CaseThenBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    then(valueExpression) {
        return new CaseWhenBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$case$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CaseNode"].cloneWithThen(this.#props.node, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$value$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSafeImmediateValue"])(valueExpression) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$value$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSafeImmediateValue"])(valueExpression) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$value$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseValueExpression"])(valueExpression))
        });
    }
}
class CaseWhenBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    when(...args) {
        return new CaseThenBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$case$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CaseNode"].cloneWithWhen(this.#props.node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$when$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WhenNode"].create((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseValueBinaryOperationOrExpression"])(args)))
        });
    }
    else(valueExpression) {
        return new CaseEndBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$case$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CaseNode"].cloneWith(this.#props.node, {
                else: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$value$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSafeImmediateValue"])(valueExpression) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$value$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSafeImmediateValue"])(valueExpression) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$value$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseValueExpression"])(valueExpression)
            })
        });
    }
    end() {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$expression$2f$expression$2d$wrapper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExpressionWrapper"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$case$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CaseNode"].cloneWith(this.#props.node, {
            isStatement: false
        }));
    }
    endCase() {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$expression$2f$expression$2d$wrapper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExpressionWrapper"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$case$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CaseNode"].cloneWith(this.#props.node, {
            isStatement: true
        }));
    }
}
class CaseEndBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    end() {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$expression$2f$expression$2d$wrapper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExpressionWrapper"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$case$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CaseNode"].cloneWith(this.#props.node, {
            isStatement: false
        }));
    }
    endCase() {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$expression$2f$expression$2d$wrapper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExpressionWrapper"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$case$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CaseNode"].cloneWith(this.#props.node, {
            isStatement: true
        }));
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/query-builder/json-path-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./json-path-builder.d.ts" />
__turbopack_context__.s([
    "AliasedJSONPathBuilder",
    ()=>AliasedJSONPathBuilder,
    "JSONPathBuilder",
    ()=>JSONPathBuilder,
    "TraversedJSONPathBuilder",
    ()=>TraversedJSONPathBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alias$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/alias-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$identifier$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/identifier-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$json$2d$operator$2d$chain$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/json-operator-chain-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$json$2d$path$2d$leg$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/json-path-leg-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$json$2d$path$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/json-path-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$json$2d$reference$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/json-reference-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$operation$2d$node$2d$source$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/operation-node-source.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$value$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/value-node.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
class JSONPathBuilder {
    #node;
    constructor(node){
        this.#node = node;
    }
    /**
     * Access an element of a JSON array in a specific location.
     *
     * Since there's no guarantee an element exists in the given array location, the
     * resulting type is always nullable. If you're sure the element exists, you
     * should use {@link SelectQueryBuilder.$assertType} to narrow the type safely.
     *
     * See also {@link key} to access properties of JSON objects.
     *
     * ### Examples
     *
     * ```ts
     * await db.selectFrom('person')
     *   .select(eb =>
     *     eb.ref('nicknames', '->').at(0).as('primary_nickname')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "nicknames"->0 as "primary_nickname" from "person"
     *```
     *
     * Combined with {@link key}:
     *
     * ```ts
     * db.selectFrom('person').select(eb =>
     *   eb.ref('experience', '->').at(0).key('role').as('first_role')
     * )
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "experience"->0->'role' as "first_role" from "person"
     * ```
     *
     * You can use `'last'` to access the last element of the array in MySQL:
     *
     * ```ts
     * db.selectFrom('person').select(eb =>
     *   eb.ref('nicknames', '->$').at('last').as('last_nickname')
     * )
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * select `nicknames`->'$[last]' as `last_nickname` from `person`
     * ```
     *
     * Or `'#-1'` in SQLite:
     *
     * ```ts
     * db.selectFrom('person').select(eb =>
     *   eb.ref('nicknames', '->>$').at('#-1').as('last_nickname')
     * )
     * ```
     *
     * The generated SQL (SQLite):
     *
     * ```sql
     * select "nicknames"->>'$[#-1]' as `last_nickname` from `person`
     * ```
     */ at(index) {
        return this.#createBuilderWithPathLeg('ArrayLocation', index);
    }
    /**
     * Access a property of a JSON object.
     *
     * If a field is optional, the resulting type will be nullable.
     *
     * See also {@link at} to access elements of JSON arrays.
     *
     * ### Examples
     *
     * ```ts
     * db.selectFrom('person').select(eb =>
     *   eb.ref('address', '->').key('city').as('city')
     * )
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "address"->'city' as "city" from "person"
     * ```
     *
     * Going deeper:
     *
     * ```ts
     * db.selectFrom('person').select(eb =>
     *   eb.ref('profile', '->$').key('website').key('url').as('website_url')
     * )
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * select `profile`->'$.website.url' as `website_url` from `person`
     * ```
     *
     * Combined with {@link at}:
     *
     * ```ts
     * db.selectFrom('person').select(eb =>
     *   eb.ref('profile', '->').key('addresses').at(0).key('city').as('city')
     * )
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "profile"->'addresses'->0->'city' as "city" from "person"
     * ```
     */ key(key) {
        return this.#createBuilderWithPathLeg('Member', key);
    }
    #createBuilderWithPathLeg(legType, value) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$json$2d$reference$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JSONReferenceNode"].is(this.#node)) {
            return new TraversedJSONPathBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$json$2d$reference$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JSONReferenceNode"].cloneWithTraversal(this.#node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$json$2d$path$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JSONPathNode"].is(this.#node.traversal) ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$json$2d$path$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JSONPathNode"].cloneWithLeg(this.#node.traversal, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$json$2d$path$2d$leg$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JSONPathLegNode"].create(legType, value)) : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$json$2d$operator$2d$chain$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JSONOperatorChainNode"].cloneWithValue(this.#node.traversal, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$value$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ValueNode"].createImmediate(value))));
        }
        return new TraversedJSONPathBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$json$2d$path$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JSONPathNode"].cloneWithLeg(this.#node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$json$2d$path$2d$leg$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JSONPathLegNode"].create(legType, value)));
    }
}
class TraversedJSONPathBuilder extends JSONPathBuilder {
    #node;
    constructor(node){
        super(node);
        this.#node = node;
    }
    /** @private */ get expressionType() {
        return undefined;
    }
    as(alias) {
        return new AliasedJSONPathBuilder(this, alias);
    }
    /**
     * Change the output type of the json path.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `JSONPathBuilder` with a new output type.
     */ $castTo() {
        return new TraversedJSONPathBuilder(this.#node);
    }
    $notNull() {
        return new TraversedJSONPathBuilder(this.#node);
    }
    toOperationNode() {
        return this.#node;
    }
}
class AliasedJSONPathBuilder {
    #jsonPath;
    #alias;
    constructor(jsonPath, alias){
        this.#jsonPath = jsonPath;
        this.#alias = alias;
    }
    /** @private */ get expression() {
        return this.#jsonPath;
    }
    /** @private */ get alias() {
        return this.#alias;
    }
    toOperationNode() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alias$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AliasNode"].create(this.#jsonPath.toOperationNode(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$operation$2d$node$2d$source$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isOperationNodeSource"])(this.#alias) ? this.#alias.toOperationNode() : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$identifier$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IdentifierNode"].create(this.#alias));
    }
}
}),
];

//# sourceMappingURL=9cfc5_kysely_dist_esm_query-builder_9dafea5a._.js.map