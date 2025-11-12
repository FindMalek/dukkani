module.exports = [
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/column-definition-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./column-definition-builder.d.ts" />
__turbopack_context__.s([
    "ColumnDefinitionBuilder",
    ()=>ColumnDefinitionBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$check$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/check-constraint-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$references$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/references-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$all$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/select-all-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$reference$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/reference-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$definition$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/column-definition-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$default$2d$value$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/default-value-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$generated$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/generated-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$default$2d$value$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/default-value-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$on$2d$modify$2d$action$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/on-modify-action-parser.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
class ColumnDefinitionBuilder {
    #node;
    constructor(node){
        this.#node = node;
    }
    /**
     * Adds `auto_increment` or `autoincrement` to the column definition
     * depending on the dialect.
     *
     * Some dialects like PostgreSQL don't support this. On PostgreSQL
     * you can use the `serial` or `bigserial` data type instead.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.autoIncrement().primaryKey())
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `id` integer primary key auto_increment
     * )
     * ```
     */ autoIncrement() {
        return new ColumnDefinitionBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$definition$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnDefinitionNode"].cloneWith(this.#node, {
            autoIncrement: true
        }));
    }
    /**
     * Makes the column an identity column.
     *
     * This only works on some dialects like MS SQL Server (MSSQL).
     *
     * For PostgreSQL's `generated always as identity` use {@link generatedAlwaysAsIdentity}.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.identity().primaryKey())
     *   .execute()
     * ```
     *
     * The generated SQL (MSSQL):
     *
     * ```sql
     * create table "person" (
     *   "id" integer identity primary key
     * )
     * ```
     */ identity() {
        return new ColumnDefinitionBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$definition$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnDefinitionNode"].cloneWith(this.#node, {
            identity: true
        }));
    }
    /**
     * Makes the column the primary key.
     *
     * If you want to specify a composite primary key use the
     * {@link CreateTableBuilder.addPrimaryKeyConstraint} method.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.primaryKey())
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `id` integer primary key
     * )
     */ primaryKey() {
        return new ColumnDefinitionBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$definition$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnDefinitionNode"].cloneWith(this.#node, {
            primaryKey: true
        }));
    }
    /**
     * Adds a foreign key constraint for the column.
     *
     * If your database engine doesn't support foreign key constraints in the
     * column definition (like MySQL 5) you need to call the table level
     * {@link CreateTableBuilder.addForeignKeyConstraint} method instead.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn('owner_id', 'integer', (col) => col.references('person.id'))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create table "pet" (
     *   "owner_id" integer references "person" ("id")
     * )
     * ```
     */ references(ref) {
        const references = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$reference$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseStringReference"])(ref);
        if (!references.table || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$select$2d$all$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectAllNode"].is(references.column)) {
            throw new Error(`invalid call references('${ref}'). The reference must have format table.column or schema.table.column`);
        }
        return new ColumnDefinitionBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$definition$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnDefinitionNode"].cloneWith(this.#node, {
            references: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$references$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ReferencesNode"].create(references.table, [
                references.column
            ])
        }));
    }
    /**
     * Adds an `on delete` constraint for the foreign key column.
     *
     * If your database engine doesn't support foreign key constraints in the
     * column definition (like MySQL 5) you need to call the table level
     * {@link CreateTableBuilder.addForeignKeyConstraint} method instead.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn(
     *     'owner_id',
     *     'integer',
     *     (col) => col.references('person.id').onDelete('cascade')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create table "pet" (
     *   "owner_id" integer references "person" ("id") on delete cascade
     * )
     * ```
     */ onDelete(onDelete) {
        if (!this.#node.references) {
            throw new Error('on delete constraint can only be added for foreign keys');
        }
        return new ColumnDefinitionBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$definition$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnDefinitionNode"].cloneWith(this.#node, {
            references: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$references$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ReferencesNode"].cloneWithOnDelete(this.#node.references, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$on$2d$modify$2d$action$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseOnModifyForeignAction"])(onDelete))
        }));
    }
    /**
     * Adds an `on update` constraint for the foreign key column.
     *
     * If your database engine doesn't support foreign key constraints in the
     * column definition (like MySQL 5) you need to call the table level
     * {@link CreateTableBuilder.addForeignKeyConstraint} method instead.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn(
     *     'owner_id',
     *     'integer',
     *     (col) => col.references('person.id').onUpdate('cascade')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create table "pet" (
     *   "owner_id" integer references "person" ("id") on update cascade
     * )
     * ```
     */ onUpdate(onUpdate) {
        if (!this.#node.references) {
            throw new Error('on update constraint can only be added for foreign keys');
        }
        return new ColumnDefinitionBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$definition$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnDefinitionNode"].cloneWith(this.#node, {
            references: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$references$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ReferencesNode"].cloneWithOnUpdate(this.#node.references, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$on$2d$modify$2d$action$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseOnModifyForeignAction"])(onUpdate))
        }));
    }
    /**
     * Adds a unique constraint for the column.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('email', 'varchar(255)', col => col.unique())
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `email` varchar(255) unique
     * )
     * ```
     */ unique() {
        return new ColumnDefinitionBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$definition$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnDefinitionNode"].cloneWith(this.#node, {
            unique: true
        }));
    }
    /**
     * Adds a `not null` constraint for the column.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('first_name', 'varchar(255)', col => col.notNull())
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `first_name` varchar(255) not null
     * )
     * ```
     */ notNull() {
        return new ColumnDefinitionBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$definition$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnDefinitionNode"].cloneWith(this.#node, {
            notNull: true
        }));
    }
    /**
     * Adds a `unsigned` modifier for the column.
     *
     * This only works on some dialects like MySQL.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('age', 'integer', col => col.unsigned())
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `age` integer unsigned
     * )
     * ```
     */ unsigned() {
        return new ColumnDefinitionBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$definition$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnDefinitionNode"].cloneWith(this.#node, {
            unsigned: true
        }));
    }
    /**
     * Adds a default value constraint for the column.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn('number_of_legs', 'integer', (col) => col.defaultTo(4))
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `pet` (
     *   `number_of_legs` integer default 4
     * )
     * ```
     *
     * Values passed to `defaultTo` are interpreted as value literals by default. You can define
     * an arbitrary SQL expression using the {@link sql} template tag:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('pet')
     *   .addColumn(
     *     'created_at',
     *     'timestamp',
     *     (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `pet` (
     *   `created_at` timestamp default CURRENT_TIMESTAMP
     * )
     * ```
     */ defaultTo(value) {
        return new ColumnDefinitionBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$definition$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnDefinitionNode"].cloneWith(this.#node, {
            defaultTo: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$default$2d$value$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DefaultValueNode"].create((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$default$2d$value$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDefaultValueExpression"])(value))
        }));
    }
    /**
     * Adds a check constraint for the column.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('pet')
     *   .addColumn('number_of_legs', 'integer', (col) =>
     *     col.check(sql`number_of_legs < 5`)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `pet` (
     *   `number_of_legs` integer check (number_of_legs < 5)
     * )
     * ```
     */ check(expression) {
        return new ColumnDefinitionBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$definition$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnDefinitionNode"].cloneWith(this.#node, {
            check: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$check$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CheckConstraintNode"].create(expression.toOperationNode())
        }));
    }
    /**
     * Makes the column a generated column using a `generated always as` statement.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('person')
     *   .addColumn('full_name', 'varchar(255)',
     *     (col) => col.generatedAlwaysAs(sql`concat(first_name, ' ', last_name)`)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `full_name` varchar(255) generated always as (concat(first_name, ' ', last_name))
     * )
     * ```
     */ generatedAlwaysAs(expression) {
        return new ColumnDefinitionBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$definition$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnDefinitionNode"].cloneWith(this.#node, {
            generated: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$generated$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GeneratedNode"].createWithExpression(expression.toOperationNode())
        }));
    }
    /**
     * Adds the `generated always as identity` specifier.
     *
     * This only works on some dialects like PostgreSQL.
     *
     * For MS SQL Server (MSSQL)'s identity column use {@link identity}.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.generatedAlwaysAsIdentity().primaryKey())
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create table "person" (
     *   "id" integer generated always as identity primary key
     * )
     * ```
     */ generatedAlwaysAsIdentity() {
        return new ColumnDefinitionBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$definition$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnDefinitionNode"].cloneWith(this.#node, {
            generated: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$generated$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GeneratedNode"].create({
                identity: true,
                always: true
            })
        }));
    }
    /**
     * Adds the `generated by default as identity` specifier on supported dialects.
     *
     * This only works on some dialects like PostgreSQL.
     *
     * For MS SQL Server (MSSQL)'s identity column use {@link identity}.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.generatedByDefaultAsIdentity().primaryKey())
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create table "person" (
     *   "id" integer generated by default as identity primary key
     * )
     * ```
     */ generatedByDefaultAsIdentity() {
        return new ColumnDefinitionBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$definition$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnDefinitionNode"].cloneWith(this.#node, {
            generated: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$generated$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GeneratedNode"].create({
                identity: true,
                byDefault: true
            })
        }));
    }
    /**
     * Makes a generated column stored instead of virtual. This method can only
     * be used with {@link generatedAlwaysAs}
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('person')
     *   .addColumn('full_name', 'varchar(255)', (col) => col
     *     .generatedAlwaysAs(sql`concat(first_name, ' ', last_name)`)
     *     .stored()
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `full_name` varchar(255) generated always as (concat(first_name, ' ', last_name)) stored
     * )
     * ```
     */ stored() {
        if (!this.#node.generated) {
            throw new Error('stored() can only be called after generatedAlwaysAs');
        }
        return new ColumnDefinitionBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$definition$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnDefinitionNode"].cloneWith(this.#node, {
            generated: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$generated$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GeneratedNode"].cloneWith(this.#node.generated, {
                stored: true
            })
        }));
    }
    /**
     * This can be used to add any additional SQL right after the column's data type.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.primaryKey())
     *   .addColumn(
     *     'first_name',
     *     'varchar(36)',
     *     (col) => col.modifyFront(sql`collate utf8mb4_general_ci`).notNull()
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `id` integer primary key,
     *   `first_name` varchar(36) collate utf8mb4_general_ci not null
     * )
     * ```
     */ modifyFront(modifier) {
        return new ColumnDefinitionBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$definition$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnDefinitionNode"].cloneWithFrontModifier(this.#node, modifier.toOperationNode()));
    }
    /**
     * Adds `nulls not distinct` specifier.
     * Should be used with `unique` constraint.
     *
     * This only works on some dialects like PostgreSQL.
     *
     * ### Examples
     *
     * ```ts
     * db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.primaryKey())
     *   .addColumn('first_name', 'varchar(30)', col => col.unique().nullsNotDistinct())
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create table "person" (
     *   "id" integer primary key,
     *   "first_name" varchar(30) unique nulls not distinct
     * )
     * ```
     */ nullsNotDistinct() {
        return new ColumnDefinitionBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$definition$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnDefinitionNode"].cloneWith(this.#node, {
            nullsNotDistinct: true
        }));
    }
    /**
     * Adds `if not exists` specifier. This only works for PostgreSQL.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .alterTable('person')
     *   .addColumn('email', 'varchar(255)', col => col.unique().ifNotExists())
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * alter table "person" add column if not exists "email" varchar(255) unique
     * ```
     */ ifNotExists() {
        return new ColumnDefinitionBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$definition$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnDefinitionNode"].cloneWith(this.#node, {
            ifNotExists: true
        }));
    }
    /**
     * This can be used to add any additional SQL to the end of the column definition.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.primaryKey())
     *   .addColumn(
     *     'age',
     *     'integer',
     *     col => col.unsigned()
     *       .notNull()
     *       .modifyEnd(sql`comment ${sql.lit('it is not polite to ask a woman her age')}`)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `id` integer primary key,
     *   `age` integer unsigned not null comment 'it is not polite to ask a woman her age'
     * )
     * ```
     */ modifyEnd(modifier) {
        return new ColumnDefinitionBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$definition$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnDefinitionNode"].cloneWithEndModifier(this.#node, modifier.toOperationNode()));
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */ $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#node;
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/foreign-key-constraint-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./foreign-key-constraint-builder.d.ts" />
__turbopack_context__.s([
    "ForeignKeyConstraintBuilder",
    ()=>ForeignKeyConstraintBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$foreign$2d$key$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/foreign-key-constraint-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$on$2d$modify$2d$action$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/on-modify-action-parser.js [app-route] (ecmascript)");
;
;
class ForeignKeyConstraintBuilder {
    #node;
    constructor(node){
        this.#node = node;
    }
    onDelete(onDelete) {
        return new ForeignKeyConstraintBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$foreign$2d$key$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ForeignKeyConstraintNode"].cloneWith(this.#node, {
            onDelete: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$on$2d$modify$2d$action$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseOnModifyForeignAction"])(onDelete)
        }));
    }
    onUpdate(onUpdate) {
        return new ForeignKeyConstraintBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$foreign$2d$key$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ForeignKeyConstraintNode"].cloneWith(this.#node, {
            onUpdate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$on$2d$modify$2d$action$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseOnModifyForeignAction"])(onUpdate)
        }));
    }
    deferrable() {
        return new ForeignKeyConstraintBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$foreign$2d$key$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ForeignKeyConstraintNode"].cloneWith(this.#node, {
            deferrable: true
        }));
    }
    notDeferrable() {
        return new ForeignKeyConstraintBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$foreign$2d$key$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ForeignKeyConstraintNode"].cloneWith(this.#node, {
            deferrable: false
        }));
    }
    initiallyDeferred() {
        return new ForeignKeyConstraintBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$foreign$2d$key$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ForeignKeyConstraintNode"].cloneWith(this.#node, {
            initiallyDeferred: true
        }));
    }
    initiallyImmediate() {
        return new ForeignKeyConstraintBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$foreign$2d$key$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ForeignKeyConstraintNode"].cloneWith(this.#node, {
            initiallyDeferred: false
        }));
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */ $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#node;
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/alter-column-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./alter-column-builder.d.ts" />
__turbopack_context__.s([
    "AlterColumnBuilder",
    ()=>AlterColumnBuilder,
    "AlteredColumnBuilder",
    ()=>AlteredColumnBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$column$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/alter-column-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$data$2d$type$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/data-type-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$default$2d$value$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/default-value-parser.js [app-route] (ecmascript)");
;
;
;
class AlterColumnBuilder {
    #column;
    constructor(column){
        this.#column = column;
    }
    setDataType(dataType) {
        return new AlteredColumnBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$column$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterColumnNode"].create(this.#column, 'dataType', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$data$2d$type$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDataTypeExpression"])(dataType)));
    }
    setDefault(value) {
        return new AlteredColumnBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$column$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterColumnNode"].create(this.#column, 'setDefault', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$default$2d$value$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDefaultValueExpression"])(value)));
    }
    dropDefault() {
        return new AlteredColumnBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$column$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterColumnNode"].create(this.#column, 'dropDefault', true));
    }
    setNotNull() {
        return new AlteredColumnBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$column$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterColumnNode"].create(this.#column, 'setNotNull', true));
    }
    dropNotNull() {
        return new AlteredColumnBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$column$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterColumnNode"].create(this.#column, 'dropNotNull', true));
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */ $call(func) {
        return func(this);
    }
}
class AlteredColumnBuilder {
    #alterColumnNode;
    constructor(alterColumnNode){
        this.#alterColumnNode = alterColumnNode;
    }
    toOperationNode() {
        return this.#alterColumnNode;
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/alter-table-executor.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./alter-table-executor.d.ts" />
__turbopack_context__.s([
    "AlterTableExecutor",
    ()=>AlterTableExecutor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
;
class AlterTableExecutor {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile());
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/alter-table-add-foreign-key-constraint-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./alter-table-add-foreign-key-constraint-builder.d.ts" />
__turbopack_context__.s([
    "AlterTableAddForeignKeyConstraintBuilder",
    ()=>AlterTableAddForeignKeyConstraintBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$add$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/add-constraint-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/alter-table-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
;
;
;
class AlterTableAddForeignKeyConstraintBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    onDelete(onDelete) {
        return new AlterTableAddForeignKeyConstraintBuilder({
            ...this.#props,
            constraintBuilder: this.#props.constraintBuilder.onDelete(onDelete)
        });
    }
    onUpdate(onUpdate) {
        return new AlterTableAddForeignKeyConstraintBuilder({
            ...this.#props,
            constraintBuilder: this.#props.constraintBuilder.onUpdate(onUpdate)
        });
    }
    deferrable() {
        return new AlterTableAddForeignKeyConstraintBuilder({
            ...this.#props,
            constraintBuilder: this.#props.constraintBuilder.deferrable()
        });
    }
    notDeferrable() {
        return new AlterTableAddForeignKeyConstraintBuilder({
            ...this.#props,
            constraintBuilder: this.#props.constraintBuilder.notDeferrable()
        });
    }
    initiallyDeferred() {
        return new AlterTableAddForeignKeyConstraintBuilder({
            ...this.#props,
            constraintBuilder: this.#props.constraintBuilder.initiallyDeferred()
        });
    }
    initiallyImmediate() {
        return new AlterTableAddForeignKeyConstraintBuilder({
            ...this.#props,
            constraintBuilder: this.#props.constraintBuilder.initiallyImmediate()
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */ $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableNode"].cloneWithTableProps(this.#props.node, {
            addConstraint: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$add$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AddConstraintNode"].create(this.#props.constraintBuilder.toOperationNode())
        }), this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile());
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/alter-table-drop-constraint-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./alter-table-drop-constraint-builder.d.ts" />
__turbopack_context__.s([
    "AlterTableDropConstraintBuilder",
    ()=>AlterTableDropConstraintBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/alter-table-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/drop-constraint-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
;
;
;
class AlterTableDropConstraintBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    ifExists() {
        return new AlterTableDropConstraintBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableNode"].cloneWithTableProps(this.#props.node, {
                dropConstraint: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DropConstraintNode"].cloneWith(this.#props.node.dropConstraint, {
                    ifExists: true
                })
            })
        });
    }
    cascade() {
        return new AlterTableDropConstraintBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableNode"].cloneWithTableProps(this.#props.node, {
                dropConstraint: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DropConstraintNode"].cloneWith(this.#props.node.dropConstraint, {
                    modifier: 'cascade'
                })
            })
        });
    }
    restrict() {
        return new AlterTableDropConstraintBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableNode"].cloneWithTableProps(this.#props.node, {
                dropConstraint: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DropConstraintNode"].cloneWith(this.#props.node.dropConstraint, {
                    modifier: 'restrict'
                })
            })
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */ $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile());
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/alter-table-add-index-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./alter-table-add-index-builder.d.ts" />
__turbopack_context__.s([
    "AlterTableAddIndexBuilder",
    ()=>AlterTableAddIndexBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$add$2d$index$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/add-index-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/alter-table-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$raw$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/raw-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$reference$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/reference-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
;
;
;
;
;
class AlterTableAddIndexBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    /**
     * Makes the index unique.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .alterTable('person')
     *   .addIndex('person_first_name_index')
     *   .unique()
     *   .column('email')
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * alter table `person` add unique index `person_first_name_index` (`email`)
     * ```
     */ unique() {
        return new AlterTableAddIndexBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableNode"].cloneWithTableProps(this.#props.node, {
                addIndex: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$add$2d$index$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AddIndexNode"].cloneWith(this.#props.node.addIndex, {
                    unique: true
                })
            })
        });
    }
    /**
     * Adds a column to the index.
     *
     * Also see {@link columns} for adding multiple columns at once or {@link expression}
     * for specifying an arbitrary expression.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .alterTable('person')
     *   .addIndex('person_first_name_and_age_index')
     *   .column('first_name')
     *   .column('age desc')
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * alter table `person` add index `person_first_name_and_age_index` (`first_name`, `age` desc)
     * ```
     */ column(column) {
        return new AlterTableAddIndexBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableNode"].cloneWithTableProps(this.#props.node, {
                addIndex: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$add$2d$index$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AddIndexNode"].cloneWithColumns(this.#props.node.addIndex, [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$reference$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseOrderedColumnName"])(column)
                ])
            })
        });
    }
    /**
     * Specifies a list of columns for the index.
     *
     * Also see {@link column} for adding a single column or {@link expression} for
     * specifying an arbitrary expression.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .alterTable('person')
     *   .addIndex('person_first_name_and_age_index')
     *   .columns(['first_name', 'age desc'])
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * alter table `person` add index `person_first_name_and_age_index` (`first_name`, `age` desc)
     * ```
     */ columns(columns) {
        return new AlterTableAddIndexBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableNode"].cloneWithTableProps(this.#props.node, {
                addIndex: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$add$2d$index$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AddIndexNode"].cloneWithColumns(this.#props.node.addIndex, columns.map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$reference$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseOrderedColumnName"]))
            })
        });
    }
    /**
     * Specifies an arbitrary expression for the index.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .alterTable('person')
     *   .addIndex('person_first_name_index')
     *   .expression(sql<boolean>`(first_name < 'Sami')`)
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * alter table `person` add index `person_first_name_index` ((first_name < 'Sami'))
     * ```
     */ expression(expression) {
        return new AlterTableAddIndexBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableNode"].cloneWithTableProps(this.#props.node, {
                addIndex: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$add$2d$index$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AddIndexNode"].cloneWithColumns(this.#props.node.addIndex, [
                    expression.toOperationNode()
                ])
            })
        });
    }
    using(indexType) {
        return new AlterTableAddIndexBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableNode"].cloneWithTableProps(this.#props.node, {
                addIndex: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$add$2d$index$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AddIndexNode"].cloneWith(this.#props.node.addIndex, {
                    using: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$raw$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RawNode"].createWithSql(indexType)
                })
            })
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */ $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile());
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/unique-constraint-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./unique-constraint-builder.d.ts" />
__turbopack_context__.s([
    "UniqueConstraintNodeBuilder",
    ()=>UniqueConstraintNodeBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$unique$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/unique-constraint-node.js [app-route] (ecmascript)");
;
class UniqueConstraintNodeBuilder {
    #node;
    constructor(node){
        this.#node = node;
    }
    /**
     * Adds `nulls not distinct` to the unique constraint definition
     *
     * Supported by PostgreSQL dialect only
     */ nullsNotDistinct() {
        return new UniqueConstraintNodeBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$unique$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UniqueConstraintNode"].cloneWith(this.#node, {
            nullsNotDistinct: true
        }));
    }
    deferrable() {
        return new UniqueConstraintNodeBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$unique$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UniqueConstraintNode"].cloneWith(this.#node, {
            deferrable: true
        }));
    }
    notDeferrable() {
        return new UniqueConstraintNodeBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$unique$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UniqueConstraintNode"].cloneWith(this.#node, {
            deferrable: false
        }));
    }
    initiallyDeferred() {
        return new UniqueConstraintNodeBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$unique$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UniqueConstraintNode"].cloneWith(this.#node, {
            initiallyDeferred: true
        }));
    }
    initiallyImmediate() {
        return new UniqueConstraintNodeBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$unique$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UniqueConstraintNode"].cloneWith(this.#node, {
            initiallyDeferred: false
        }));
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */ $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#node;
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/primary-key-constraint-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./primary-key-constraint-builder.d.ts" />
__turbopack_context__.s([
    "PrimaryKeyConstraintBuilder",
    ()=>PrimaryKeyConstraintBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$primary$2d$key$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/primary-key-constraint-node.js [app-route] (ecmascript)");
;
class PrimaryKeyConstraintBuilder {
    #node;
    constructor(node){
        this.#node = node;
    }
    deferrable() {
        return new PrimaryKeyConstraintBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$primary$2d$key$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrimaryKeyConstraintNode"].cloneWith(this.#node, {
            deferrable: true
        }));
    }
    notDeferrable() {
        return new PrimaryKeyConstraintBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$primary$2d$key$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrimaryKeyConstraintNode"].cloneWith(this.#node, {
            deferrable: false
        }));
    }
    initiallyDeferred() {
        return new PrimaryKeyConstraintBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$primary$2d$key$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrimaryKeyConstraintNode"].cloneWith(this.#node, {
            initiallyDeferred: true
        }));
    }
    initiallyImmediate() {
        return new PrimaryKeyConstraintBuilder(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$primary$2d$key$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrimaryKeyConstraintNode"].cloneWith(this.#node, {
            initiallyDeferred: false
        }));
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */ $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#node;
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/check-constraint-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./check-constraint-builder.d.ts" />
__turbopack_context__.s([
    "CheckConstraintBuilder",
    ()=>CheckConstraintBuilder
]);
class CheckConstraintBuilder {
    #node;
    constructor(node){
        this.#node = node;
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */ $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#node;
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/alter-table-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./alter-table-builder.d.ts" />
__turbopack_context__.s([
    "AlterTableBuilder",
    ()=>AlterTableBuilder,
    "AlterTableColumnAlteringBuilder",
    ()=>AlterTableColumnAlteringBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$add$2d$column$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/add-column-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/alter-table-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$definition$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/column-definition-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$column$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/drop-column-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$identifier$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/identifier-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$rename$2d$column$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/rename-column-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$column$2d$definition$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/column-definition-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$modify$2d$column$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/modify-column-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$data$2d$type$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/data-type-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$foreign$2d$key$2d$constraint$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/foreign-key-constraint-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$add$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/add-constraint-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$unique$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/unique-constraint-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$check$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/check-constraint-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$foreign$2d$key$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/foreign-key-constraint-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/column-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/table-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/drop-constraint-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$alter$2d$column$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/alter-column-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$alter$2d$table$2d$executor$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/alter-table-executor.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$alter$2d$table$2d$add$2d$foreign$2d$key$2d$constraint$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/alter-table-add-foreign-key-constraint-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$alter$2d$table$2d$drop$2d$constraint$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/alter-table-drop-constraint-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$primary$2d$key$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/primary-key-constraint-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$index$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/drop-index-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$add$2d$index$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/add-index-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$alter$2d$table$2d$add$2d$index$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/alter-table-add-index-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$unique$2d$constraint$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/unique-constraint-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$primary$2d$key$2d$constraint$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/primary-key-constraint-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$check$2d$constraint$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/check-constraint-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$rename$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/rename-constraint-node.js [app-route] (ecmascript)");
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
class AlterTableBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    renameTo(newTableName) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$alter$2d$table$2d$executor$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableExecutor"]({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableNode"].cloneWithTableProps(this.#props.node, {
                renameTo: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseTable"])(newTableName)
            })
        });
    }
    setSchema(newSchema) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$alter$2d$table$2d$executor$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableExecutor"]({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableNode"].cloneWithTableProps(this.#props.node, {
                setSchema: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$identifier$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IdentifierNode"].create(newSchema)
            })
        });
    }
    alterColumn(column, alteration) {
        const builder = alteration(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$alter$2d$column$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterColumnBuilder"](column));
        return new AlterTableColumnAlteringBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableNode"].cloneWithColumnAlteration(this.#props.node, builder.toOperationNode())
        });
    }
    dropColumn(column) {
        return new AlterTableColumnAlteringBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableNode"].cloneWithColumnAlteration(this.#props.node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$column$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DropColumnNode"].create(column))
        });
    }
    renameColumn(column, newColumn) {
        return new AlterTableColumnAlteringBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableNode"].cloneWithColumnAlteration(this.#props.node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$rename$2d$column$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RenameColumnNode"].create(column, newColumn))
        });
    }
    addColumn(columnName, dataType, build = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["noop"]) {
        const builder = build(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$column$2d$definition$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnDefinitionBuilder"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$definition$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnDefinitionNode"].create(columnName, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$data$2d$type$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDataTypeExpression"])(dataType))));
        return new AlterTableColumnAlteringBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableNode"].cloneWithColumnAlteration(this.#props.node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$add$2d$column$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AddColumnNode"].create(builder.toOperationNode()))
        });
    }
    modifyColumn(columnName, dataType, build = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["noop"]) {
        const builder = build(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$column$2d$definition$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnDefinitionBuilder"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$definition$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnDefinitionNode"].create(columnName, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$data$2d$type$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDataTypeExpression"])(dataType))));
        return new AlterTableColumnAlteringBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableNode"].cloneWithColumnAlteration(this.#props.node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$modify$2d$column$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ModifyColumnNode"].create(builder.toOperationNode()))
        });
    }
    /**
     * See {@link CreateTableBuilder.addUniqueConstraint}
     */ addUniqueConstraint(constraintName, columns, build = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["noop"]) {
        const uniqueConstraintBuilder = build(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$unique$2d$constraint$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UniqueConstraintNodeBuilder"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$unique$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UniqueConstraintNode"].create(columns, constraintName)));
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$alter$2d$table$2d$executor$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableExecutor"]({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableNode"].cloneWithTableProps(this.#props.node, {
                addConstraint: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$add$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AddConstraintNode"].create(uniqueConstraintBuilder.toOperationNode())
            })
        });
    }
    /**
     * See {@link CreateTableBuilder.addCheckConstraint}
     */ addCheckConstraint(constraintName, checkExpression, build = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["noop"]) {
        const constraintBuilder = build(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$check$2d$constraint$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CheckConstraintBuilder"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$check$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CheckConstraintNode"].create(checkExpression.toOperationNode(), constraintName)));
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$alter$2d$table$2d$executor$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableExecutor"]({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableNode"].cloneWithTableProps(this.#props.node, {
                addConstraint: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$add$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AddConstraintNode"].create(constraintBuilder.toOperationNode())
            })
        });
    }
    /**
     * See {@link CreateTableBuilder.addForeignKeyConstraint}
     *
     * Unlike {@link CreateTableBuilder.addForeignKeyConstraint} this method returns
     * the constraint builder and doesn't take a callback as the last argument. This
     * is because you can only add one column per `ALTER TABLE` query.
     */ addForeignKeyConstraint(constraintName, columns, targetTable, targetColumns, build = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["noop"]) {
        const constraintBuilder = build(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$foreign$2d$key$2d$constraint$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ForeignKeyConstraintBuilder"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$foreign$2d$key$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ForeignKeyConstraintNode"].create(columns.map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnNode"].create), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseTable"])(targetTable), targetColumns.map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnNode"].create), constraintName)));
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$alter$2d$table$2d$add$2d$foreign$2d$key$2d$constraint$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableAddForeignKeyConstraintBuilder"]({
            ...this.#props,
            constraintBuilder
        });
    }
    /**
     * See {@link CreateTableBuilder.addPrimaryKeyConstraint}
     */ addPrimaryKeyConstraint(constraintName, columns, build = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["noop"]) {
        const constraintBuilder = build(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$primary$2d$key$2d$constraint$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrimaryKeyConstraintBuilder"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$primary$2d$key$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrimaryKeyConstraintNode"].create(columns, constraintName)));
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$alter$2d$table$2d$executor$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableExecutor"]({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableNode"].cloneWithTableProps(this.#props.node, {
                addConstraint: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$add$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AddConstraintNode"].create(constraintBuilder.toOperationNode())
            })
        });
    }
    dropConstraint(constraintName) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$alter$2d$table$2d$drop$2d$constraint$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableDropConstraintBuilder"]({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableNode"].cloneWithTableProps(this.#props.node, {
                dropConstraint: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DropConstraintNode"].create(constraintName)
            })
        });
    }
    renameConstraint(oldName, newName) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$alter$2d$table$2d$drop$2d$constraint$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableDropConstraintBuilder"]({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableNode"].cloneWithTableProps(this.#props.node, {
                renameConstraint: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$rename$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RenameConstraintNode"].create(oldName, newName)
            })
        });
    }
    /**
     * This can be used to add index to table.
     *
     *  ### Examples
     *
     * ```ts
     * db.schema.alterTable('person')
     *   .addIndex('person_email_index')
     *   .column('email')
     *   .unique()
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * alter table `person` add unique index `person_email_index` (`email`)
     * ```
     */ addIndex(indexName) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$alter$2d$table$2d$add$2d$index$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableAddIndexBuilder"]({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableNode"].cloneWithTableProps(this.#props.node, {
                addIndex: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$add$2d$index$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AddIndexNode"].create(indexName)
            })
        });
    }
    /**
     * This can be used to drop index from table.
     *
     * ### Examples
     *
     * ```ts
     * db.schema.alterTable('person')
     *   .dropIndex('person_email_index')
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * alter table `person` drop index `test_first_name_index`
     * ```
     */ dropIndex(indexName) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$alter$2d$table$2d$executor$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableExecutor"]({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableNode"].cloneWithTableProps(this.#props.node, {
                dropIndex: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$index$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DropIndexNode"].create(indexName)
            })
        });
    }
    /**
     * Calls the given function passing `this` as the only argument.
     *
     * See {@link CreateTableBuilder.$call}
     */ $call(func) {
        return func(this);
    }
}
class AlterTableColumnAlteringBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    alterColumn(column, alteration) {
        const builder = alteration(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$alter$2d$column$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterColumnBuilder"](column));
        return new AlterTableColumnAlteringBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableNode"].cloneWithColumnAlteration(this.#props.node, builder.toOperationNode())
        });
    }
    dropColumn(column) {
        return new AlterTableColumnAlteringBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableNode"].cloneWithColumnAlteration(this.#props.node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$column$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DropColumnNode"].create(column))
        });
    }
    renameColumn(column, newColumn) {
        return new AlterTableColumnAlteringBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableNode"].cloneWithColumnAlteration(this.#props.node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$rename$2d$column$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RenameColumnNode"].create(column, newColumn))
        });
    }
    addColumn(columnName, dataType, build = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["noop"]) {
        const builder = build(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$column$2d$definition$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnDefinitionBuilder"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$definition$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnDefinitionNode"].create(columnName, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$data$2d$type$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDataTypeExpression"])(dataType))));
        return new AlterTableColumnAlteringBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableNode"].cloneWithColumnAlteration(this.#props.node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$add$2d$column$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AddColumnNode"].create(builder.toOperationNode()))
        });
    }
    modifyColumn(columnName, dataType, build = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["noop"]) {
        const builder = build(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$column$2d$definition$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnDefinitionBuilder"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$definition$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnDefinitionNode"].create(columnName, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$data$2d$type$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDataTypeExpression"])(dataType))));
        return new AlterTableColumnAlteringBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableNode"].cloneWithColumnAlteration(this.#props.node, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$modify$2d$column$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ModifyColumnNode"].create(builder.toOperationNode()))
        });
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile());
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/create-index-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./create-index-builder.d.ts" />
__turbopack_context__.s([
    "CreateIndexBuilder",
    ()=>CreateIndexBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$index$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/create-index-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$raw$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/raw-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$reference$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/reference-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/table-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/binary-operation-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/query-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$plugin$2f$immediate$2d$value$2f$immediate$2d$value$2d$transformer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/plugin/immediate-value/immediate-value-transformer.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
class CreateIndexBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    /**
     * Adds the "if not exists" modifier.
     *
     * If the index already exists, no error is thrown if this method has been called.
     */ ifNotExists() {
        return new CreateIndexBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$index$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateIndexNode"].cloneWith(this.#props.node, {
                ifNotExists: true
            })
        });
    }
    /**
     * Makes the index unique.
     */ unique() {
        return new CreateIndexBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$index$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateIndexNode"].cloneWith(this.#props.node, {
                unique: true
            })
        });
    }
    /**
     * Adds `nulls not distinct` specifier to index.
     * This only works on some dialects like PostgreSQL.
     *
     * ### Examples
     *
     * ```ts
     * db.schema.createIndex('person_first_name_index')
     *  .on('person')
     *  .column('first_name')
     *  .nullsNotDistinct()
     *  .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create index "person_first_name_index"
     * on "test" ("first_name")
     * nulls not distinct;
     * ```
     */ nullsNotDistinct() {
        return new CreateIndexBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$index$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateIndexNode"].cloneWith(this.#props.node, {
                nullsNotDistinct: true
            })
        });
    }
    /**
     * Specifies the table for the index.
     */ on(table) {
        return new CreateIndexBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$index$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateIndexNode"].cloneWith(this.#props.node, {
                table: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseTable"])(table)
            })
        });
    }
    /**
     * Adds a column to the index.
     *
     * Also see {@link columns} for adding multiple columns at once or {@link expression}
     * for specifying an arbitrary expression.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *         .createIndex('person_first_name_and_age_index')
     *         .on('person')
     *         .column('first_name')
     *         .column('age desc')
     *         .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create index "person_first_name_and_age_index" on "person" ("first_name", "age" desc)
     * ```
     */ column(column) {
        return new CreateIndexBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$index$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateIndexNode"].cloneWithColumns(this.#props.node, [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$reference$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseOrderedColumnName"])(column)
            ])
        });
    }
    /**
     * Specifies a list of columns for the index.
     *
     * Also see {@link column} for adding a single column or {@link expression} for
     * specifying an arbitrary expression.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *         .createIndex('person_first_name_and_age_index')
     *         .on('person')
     *         .columns(['first_name', 'age desc'])
     *         .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create index "person_first_name_and_age_index" on "person" ("first_name", "age" desc)
     * ```
     */ columns(columns) {
        return new CreateIndexBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$index$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateIndexNode"].cloneWithColumns(this.#props.node, columns.map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$reference$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseOrderedColumnName"]))
        });
    }
    /**
     * Specifies an arbitrary expression for the index.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createIndex('person_first_name_index')
     *   .on('person')
     *   .expression(sql`first_name COLLATE "fi_FI"`)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create index "person_first_name_index" on "person" (first_name COLLATE "fi_FI")
     * ```
     */ expression(expression) {
        return new CreateIndexBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$index$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateIndexNode"].cloneWithColumns(this.#props.node, [
                expression.toOperationNode()
            ])
        });
    }
    using(indexType) {
        return new CreateIndexBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$index$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateIndexNode"].cloneWith(this.#props.node, {
                using: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$raw$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RawNode"].createWithSql(indexType)
            })
        });
    }
    where(...args) {
        const transformer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$plugin$2f$immediate$2d$value$2f$immediate$2d$value$2d$transformer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ImmediateValueTransformer"]();
        return new CreateIndexBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$query$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QueryNode"].cloneWithWhere(this.#props.node, transformer.transformNode((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$binary$2d$operation$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseValueBinaryOperationOrExpression"])(args), this.#props.queryId))
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */ $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile());
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/create-schema-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./create-schema-builder.d.ts" />
__turbopack_context__.s([
    "CreateSchemaBuilder",
    ()=>CreateSchemaBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$schema$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/create-schema-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
;
;
class CreateSchemaBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    ifNotExists() {
        return new CreateSchemaBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$schema$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateSchemaNode"].cloneWith(this.#props.node, {
                ifNotExists: true
            })
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */ $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile());
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/create-table-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./create-table-builder.d.ts" />
__turbopack_context__.s([
    "CreateTableBuilder",
    ()=>CreateTableBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$definition$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/column-definition-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/create-table-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$column$2d$definition$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/column-definition-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$foreign$2d$key$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/foreign-key-constraint-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/column-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$foreign$2d$key$2d$constraint$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/foreign-key-constraint-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$data$2d$type$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/data-type-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$primary$2d$key$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/primary-key-constraint-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$unique$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/unique-constraint-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$check$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/check-constraint-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/table-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$on$2d$commit$2d$action$2d$parse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/on-commit-action-parse.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$unique$2d$constraint$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/unique-constraint-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$expression$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/expression-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$primary$2d$key$2d$constraint$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/primary-key-constraint-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$check$2d$constraint$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/check-constraint-builder.js [app-route] (ecmascript)");
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
class CreateTableBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    /**
     * Adds the "temporary" modifier.
     *
     * Use this to create a temporary table.
     */ temporary() {
        return new CreateTableBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateTableNode"].cloneWith(this.#props.node, {
                temporary: true
            })
        });
    }
    /**
     * Adds an "on commit" statement.
     *
     * This can be used in conjunction with temporary tables on supported databases
     * like PostgreSQL.
     */ onCommit(onCommit) {
        return new CreateTableBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateTableNode"].cloneWith(this.#props.node, {
                onCommit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$on$2d$commit$2d$action$2d$parse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseOnCommitAction"])(onCommit)
            })
        });
    }
    /**
     * Adds the "if not exists" modifier.
     *
     * If the table already exists, no error is thrown if this method has been called.
     */ ifNotExists() {
        return new CreateTableBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateTableNode"].cloneWith(this.#props.node, {
                ifNotExists: true
            })
        });
    }
    /**
     * Adds a column to the table.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())
     *   .addColumn('first_name', 'varchar(50)', (col) => col.notNull())
     *   .addColumn('last_name', 'varchar(255)')
     *   .addColumn('bank_balance', 'numeric(8, 2)')
     *   // You can specify any data type using the `sql` tag if the types
     *   // don't include it.
     *   .addColumn('data', sql`any_type_here`)
     *   .addColumn('parent_id', 'integer', (col) =>
     *     col.references('person.id').onDelete('cascade')
     *   )
     * ```
     *
     * With this method, it's once again good to remember that Kysely just builds the
     * query and doesn't provide the same API for all databases. For example, some
     * databases like older MySQL don't support the `references` statement in the
     * column definition. Instead foreign key constraints need to be defined in the
     * `create table` query. See the next example:
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', (col) => col.primaryKey())
     *   .addColumn('parent_id', 'integer')
     *   .addForeignKeyConstraint(
     *     'person_parent_id_fk',
     *     ['parent_id'],
     *     'person',
     *     ['id'],
     *     (cb) => cb.onDelete('cascade')
     *   )
     *   .execute()
     * ```
     *
     * Another good example is that PostgreSQL doesn't support the `auto_increment`
     * keyword and you need to define an autoincrementing column for example using
     * `serial`:
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'serial', (col) => col.primaryKey())
     *   .execute()
     * ```
     */ addColumn(columnName, dataType, build = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["noop"]) {
        const columnBuilder = build(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$column$2d$definition$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnDefinitionBuilder"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$definition$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnDefinitionNode"].create(columnName, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$data$2d$type$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDataTypeExpression"])(dataType))));
        return new CreateTableBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateTableNode"].cloneWithColumn(this.#props.node, columnBuilder.toOperationNode())
        });
    }
    /**
     * Adds a primary key constraint for one or more columns.
     *
     * The constraint name can be anything you want, but it must be unique
     * across the whole database.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('first_name', 'varchar(64)')
     *   .addColumn('last_name', 'varchar(64)')
     *   .addPrimaryKeyConstraint('primary_key', ['first_name', 'last_name'])
     *   .execute()
     * ```
     */ addPrimaryKeyConstraint(constraintName, columns, build = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["noop"]) {
        const constraintBuilder = build(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$primary$2d$key$2d$constraint$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrimaryKeyConstraintBuilder"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$primary$2d$key$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrimaryKeyConstraintNode"].create(columns, constraintName)));
        return new CreateTableBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateTableNode"].cloneWithConstraint(this.#props.node, constraintBuilder.toOperationNode())
        });
    }
    /**
     * Adds a unique constraint for one or more columns.
     *
     * The constraint name can be anything you want, but it must be unique
     * across the whole database.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('first_name', 'varchar(64)')
     *   .addColumn('last_name', 'varchar(64)')
     *   .addUniqueConstraint(
     *     'first_name_last_name_unique',
     *     ['first_name', 'last_name']
     *   )
     *   .execute()
     * ```
     *
     * In dialects such as PostgreSQL you can specify `nulls not distinct` as follows:
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('first_name', 'varchar(64)')
     *   .addColumn('last_name', 'varchar(64)')
     *   .addUniqueConstraint(
     *     'first_name_last_name_unique',
     *     ['first_name', 'last_name'],
     *     (cb) => cb.nullsNotDistinct()
     *   )
     *   .execute()
     * ```
     */ addUniqueConstraint(constraintName, columns, build = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["noop"]) {
        const uniqueConstraintBuilder = build(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$unique$2d$constraint$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UniqueConstraintNodeBuilder"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$unique$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UniqueConstraintNode"].create(columns, constraintName)));
        return new CreateTableBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateTableNode"].cloneWithConstraint(this.#props.node, uniqueConstraintBuilder.toOperationNode())
        });
    }
    /**
     * Adds a check constraint.
     *
     * The constraint name can be anything you want, but it must be unique
     * across the whole database.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('animal')
     *   .addColumn('number_of_legs', 'integer')
     *   .addCheckConstraint('check_legs', sql`number_of_legs < 5`)
     *   .execute()
     * ```
     */ addCheckConstraint(constraintName, checkExpression, build = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["noop"]) {
        const constraintBuilder = build(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$check$2d$constraint$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CheckConstraintBuilder"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$check$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CheckConstraintNode"].create(checkExpression.toOperationNode(), constraintName)));
        return new CreateTableBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateTableNode"].cloneWithConstraint(this.#props.node, constraintBuilder.toOperationNode())
        });
    }
    /**
     * Adds a foreign key constraint.
     *
     * The constraint name can be anything you want, but it must be unique
     * across the whole database.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn('owner_id', 'integer')
     *   .addForeignKeyConstraint(
     *     'owner_id_foreign',
     *     ['owner_id'],
     *     'person',
     *     ['id'],
     *   )
     *   .execute()
     * ```
     *
     * Add constraint for multiple columns:
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn('owner_id1', 'integer')
     *   .addColumn('owner_id2', 'integer')
     *   .addForeignKeyConstraint(
     *     'owner_id_foreign',
     *     ['owner_id1', 'owner_id2'],
     *     'person',
     *     ['id1', 'id2'],
     *     (cb) => cb.onDelete('cascade')
     *   )
     *   .execute()
     * ```
     */ addForeignKeyConstraint(constraintName, columns, targetTable, targetColumns, build = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["noop"]) {
        const builder = build(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$foreign$2d$key$2d$constraint$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ForeignKeyConstraintBuilder"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$foreign$2d$key$2d$constraint$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ForeignKeyConstraintNode"].create(columns.map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnNode"].create), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseTable"])(targetTable), targetColumns.map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$column$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ColumnNode"].create), constraintName)));
        return new CreateTableBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateTableNode"].cloneWithConstraint(this.#props.node, builder.toOperationNode())
        });
    }
    /**
     * This can be used to add any additional SQL to the front of the query __after__ the `create` keyword.
     *
     * Also see {@link temporary}.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('person')
     *   .modifyFront(sql`global temporary`)
     *   .addColumn('id', 'integer', col => col.primaryKey())
     *   .addColumn('first_name', 'varchar(64)', col => col.notNull())
     *   .addColumn('last_name', 'varchar(64)', col => col.notNull())
     *   .execute()
     * ```
     *
     * The generated SQL (Postgres):
     *
     * ```sql
     * create global temporary table "person" (
     *   "id" integer primary key,
     *   "first_name" varchar(64) not null,
     *   "last_name" varchar(64) not null
     * )
     * ```
     */ modifyFront(modifier) {
        return new CreateTableBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateTableNode"].cloneWithFrontModifier(this.#props.node, modifier.toOperationNode())
        });
    }
    /**
     * This can be used to add any additional SQL to the end of the query.
     *
     * Also see {@link onCommit}.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.primaryKey())
     *   .addColumn('first_name', 'varchar(64)', col => col.notNull())
     *   .addColumn('last_name', 'varchar(64)', col => col.notNull())
     *   .modifyEnd(sql`collate utf8_unicode_ci`)
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `id` integer primary key,
     *   `first_name` varchar(64) not null,
     *   `last_name` varchar(64) not null
     * ) collate utf8_unicode_ci
     * ```
     */ modifyEnd(modifier) {
        return new CreateTableBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateTableNode"].cloneWithEndModifier(this.#props.node, modifier.toOperationNode())
        });
    }
    /**
     * Allows to create table from `select` query.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('copy')
     *   .temporary()
     *   .as(db.selectFrom('person').select(['first_name', 'last_name']))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create temporary table "copy" as
     * select "first_name", "last_name" from "person"
     * ```
     */ as(expression) {
        return new CreateTableBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateTableNode"].cloneWith(this.#props.node, {
                selectQuery: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$expression$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseExpression"])(expression)
            })
        });
    }
    /**
     * Calls the given function passing `this` as the only argument.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('test')
     *   .$call((builder) => builder.addColumn('id', 'integer'))
     *   .execute()
     * ```
     *
     * This is useful for creating reusable functions that can be called with a builder.
     *
     * ```ts
     * import { type CreateTableBuilder, sql } from 'kysely'
     *
     * const addDefaultColumns = (ctb: CreateTableBuilder<any, any>) => {
     *   return ctb
     *     .addColumn('id', 'integer', (col) => col.notNull())
     *     .addColumn('created_at', 'date', (col) =>
     *       col.notNull().defaultTo(sql`now()`)
     *     )
     *     .addColumn('updated_at', 'date', (col) =>
     *       col.notNull().defaultTo(sql`now()`)
     *     )
     * }
     *
     * await db.schema
     *   .createTable('test')
     *   .$call(addDefaultColumns)
     *   .execute()
     * ```
     */ $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile());
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/drop-index-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./drop-index-builder.d.ts" />
__turbopack_context__.s([
    "DropIndexBuilder",
    ()=>DropIndexBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$index$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/drop-index-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/table-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
;
;
;
class DropIndexBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    /**
     * Specifies the table the index was created for. This is not needed
     * in all dialects.
     */ on(table) {
        return new DropIndexBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$index$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DropIndexNode"].cloneWith(this.#props.node, {
                table: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseTable"])(table)
            })
        });
    }
    ifExists() {
        return new DropIndexBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$index$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DropIndexNode"].cloneWith(this.#props.node, {
                ifExists: true
            })
        });
    }
    cascade() {
        return new DropIndexBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$index$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DropIndexNode"].cloneWith(this.#props.node, {
                cascade: true
            })
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */ $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile());
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/drop-schema-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./drop-schema-builder.d.ts" />
__turbopack_context__.s([
    "DropSchemaBuilder",
    ()=>DropSchemaBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$schema$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/drop-schema-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
;
;
class DropSchemaBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    ifExists() {
        return new DropSchemaBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$schema$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DropSchemaNode"].cloneWith(this.#props.node, {
                ifExists: true
            })
        });
    }
    cascade() {
        return new DropSchemaBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$schema$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DropSchemaNode"].cloneWith(this.#props.node, {
                cascade: true
            })
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */ $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile());
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/drop-table-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./drop-table-builder.d.ts" />
__turbopack_context__.s([
    "DropTableBuilder",
    ()=>DropTableBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/drop-table-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
;
;
class DropTableBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    ifExists() {
        return new DropTableBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DropTableNode"].cloneWith(this.#props.node, {
                ifExists: true
            })
        });
    }
    cascade() {
        return new DropTableBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DropTableNode"].cloneWith(this.#props.node, {
                cascade: true
            })
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */ $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile());
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/create-view-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./create-view-builder.d.ts" />
__turbopack_context__.s([
    "CreateViewBuilder",
    ()=>CreateViewBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$view$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/create-view-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$reference$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/reference-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$plugin$2f$immediate$2d$value$2f$immediate$2d$value$2d$plugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/plugin/immediate-value/immediate-value-plugin.js [app-route] (ecmascript)");
;
;
;
;
class CreateViewBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    /**
     * Adds the "temporary" modifier.
     *
     * Use this to create a temporary view.
     */ temporary() {
        return new CreateViewBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$view$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateViewNode"].cloneWith(this.#props.node, {
                temporary: true
            })
        });
    }
    materialized() {
        return new CreateViewBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$view$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateViewNode"].cloneWith(this.#props.node, {
                materialized: true
            })
        });
    }
    /**
     * Only implemented on some dialects like SQLite. On most dialects, use {@link orReplace}.
     */ ifNotExists() {
        return new CreateViewBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$view$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateViewNode"].cloneWith(this.#props.node, {
                ifNotExists: true
            })
        });
    }
    orReplace() {
        return new CreateViewBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$view$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateViewNode"].cloneWith(this.#props.node, {
                orReplace: true
            })
        });
    }
    columns(columns) {
        return new CreateViewBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$view$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateViewNode"].cloneWith(this.#props.node, {
                columns: columns.map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$reference$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseColumnName"])
            })
        });
    }
    /**
     * Sets the select query or a `values` statement that creates the view.
     *
     * WARNING!
     * Some dialects don't support parameterized queries in DDL statements and therefore
     * the query or raw {@link sql } expression passed here is interpolated into a single
     * string opening an SQL injection vulnerability. DO NOT pass unchecked user input
     * into the query or raw expression passed to this method!
     */ as(query) {
        const queryNode = query.withPlugin(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$plugin$2f$immediate$2d$value$2f$immediate$2d$value$2d$plugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ImmediateValuePlugin"]()).toOperationNode();
        return new CreateViewBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$view$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateViewNode"].cloneWith(this.#props.node, {
                as: queryNode
            })
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */ $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile());
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/drop-view-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./drop-view-builder.d.ts" />
__turbopack_context__.s([
    "DropViewBuilder",
    ()=>DropViewBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$view$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/drop-view-node.js [app-route] (ecmascript)");
;
;
class DropViewBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    materialized() {
        return new DropViewBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$view$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DropViewNode"].cloneWith(this.#props.node, {
                materialized: true
            })
        });
    }
    ifExists() {
        return new DropViewBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$view$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DropViewNode"].cloneWith(this.#props.node, {
                ifExists: true
            })
        });
    }
    cascade() {
        return new DropViewBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$view$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DropViewNode"].cloneWith(this.#props.node, {
                cascade: true
            })
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */ $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile());
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/create-type-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./create-type-builder.d.ts" />
__turbopack_context__.s([
    "CreateTypeBuilder",
    ()=>CreateTypeBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$type$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/create-type-node.js [app-route] (ecmascript)");
;
;
class CreateTypeBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    /**
     * Creates an anum type.
     *
     * ### Examples
     *
     * ```ts
     * db.schema.createType('species').asEnum(['cat', 'dog', 'frog'])
     * ```
     */ asEnum(values) {
        return new CreateTypeBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$type$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateTypeNode"].cloneWithEnum(this.#props.node, values)
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */ $call(func) {
        return func(this);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile());
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/drop-type-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./drop-type-builder.d.ts" />
__turbopack_context__.s([
    "DropTypeBuilder",
    ()=>DropTypeBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$type$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/drop-type-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
;
;
class DropTypeBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    ifExists() {
        return new DropTypeBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$type$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DropTypeNode"].cloneWith(this.#props.node, {
                ifExists: true
            })
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */ $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile());
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/refresh-materialized-view-builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./refresh-materialized-view-builder.d.ts" />
__turbopack_context__.s([
    "RefreshMaterializedViewBuilder",
    ()=>RefreshMaterializedViewBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/object-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$refresh$2d$materialized$2d$view$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/refresh-materialized-view-node.js [app-route] (ecmascript)");
;
;
class RefreshMaterializedViewBuilder {
    #props;
    constructor(props){
        this.#props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$object$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["freeze"])(props);
    }
    /**
     * Adds the "concurrently" modifier.
     *
     * Use this to refresh the view without locking out concurrent selects on the materialized view.
     *
     * WARNING!
     * This cannot be used with the "with no data" modifier.
     */ concurrently() {
        return new RefreshMaterializedViewBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$refresh$2d$materialized$2d$view$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RefreshMaterializedViewNode"].cloneWith(this.#props.node, {
                concurrently: true,
                withNoData: false
            })
        });
    }
    /**
     * Adds the "with data" modifier.
     *
     * If specified (or defaults) the backing query is executed to provide the new data, and the materialized view is left in a scannable state
     */ withData() {
        return new RefreshMaterializedViewBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$refresh$2d$materialized$2d$view$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RefreshMaterializedViewNode"].cloneWith(this.#props.node, {
                withNoData: false
            })
        });
    }
    /**
     * Adds the "with no data" modifier.
     *
     * If specified, no new data is generated and the materialized view is left in an unscannable state.
     *
     * WARNING!
     * This cannot be used with the "concurrently" modifier.
     */ withNoData() {
        return new RefreshMaterializedViewBuilder({
            ...this.#props,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$refresh$2d$materialized$2d$view$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RefreshMaterializedViewNode"].cloneWith(this.#props.node, {
                withNoData: true,
                concurrently: false
            })
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */ $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile());
    }
}
}),
"[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/schema.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference types="./schema.d.ts" />
__turbopack_context__.s([
    "SchemaModule",
    ()=>SchemaModule
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/alter-table-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$index$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/create-index-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$schema$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/create-schema-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/create-table-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$index$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/drop-index-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$schema$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/drop-schema-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/drop-table-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/table-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$alter$2d$table$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/alter-table-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$create$2d$index$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/create-index-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$create$2d$schema$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/create-schema-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$create$2d$table$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/create-table-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$drop$2d$index$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/drop-index-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$drop$2d$schema$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/drop-schema-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$drop$2d$table$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/drop-table-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/util/query-id.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$plugin$2f$with$2d$schema$2f$with$2d$schema$2d$plugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/plugin/with-schema/with-schema-plugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$create$2d$view$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/create-view-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$view$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/create-view-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$drop$2d$view$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/drop-view-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$view$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/drop-view-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$create$2d$type$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/create-type-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$drop$2d$type$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/drop-type-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$type$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/create-type-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$type$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/drop-type-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$identifier$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/parser/identifier-parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$refresh$2d$materialized$2d$view$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/schema/refresh-materialized-view-builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$refresh$2d$materialized$2d$view$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/kysely@0.28.8/node_modules/kysely/dist/esm/operation-node/refresh-materialized-view-node.js [app-route] (ecmascript)");
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
class SchemaModule {
    #executor;
    constructor(executor){
        this.#executor = executor;
    }
    /**
     * Create a new table.
     *
     * ### Examples
     *
     * This example creates a new table with columns `id`, `first_name`,
     * `last_name` and `gender`:
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
     *   .addColumn('first_name', 'varchar', col => col.notNull())
     *   .addColumn('last_name', 'varchar', col => col.notNull())
     *   .addColumn('gender', 'varchar')
     *   .execute()
     * ```
     *
     * This example creates a table with a foreign key. Not all database
     * engines support column-level foreign key constraint definitions.
     * For example if you are using MySQL 5.X see the next example after
     * this one.
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
     *   .addColumn('owner_id', 'integer', col => col
     *     .references('person.id')
     *     .onDelete('cascade')
     *   )
     *   .execute()
     * ```
     *
     * This example adds a foreign key constraint for a columns just
     * like the previous example, but using a table-level statement.
     * On MySQL 5.X you need to define foreign key constraints like
     * this:
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
     *   .addColumn('owner_id', 'integer')
     *   .addForeignKeyConstraint(
     *     'pet_owner_id_foreign', ['owner_id'], 'person', ['id'],
     *     (constraint) => constraint.onDelete('cascade')
     *   )
     *   .execute()
     * ```
     */ createTable(table) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$create$2d$table$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateTableBuilder"]({
            queryId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])(),
            executor: this.#executor,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateTableNode"].create((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseTable"])(table))
        });
    }
    /**
     * Drop a table.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .dropTable('person')
     *   .execute()
     * ```
     */ dropTable(table) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$drop$2d$table$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DropTableBuilder"]({
            queryId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])(),
            executor: this.#executor,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DropTableNode"].create((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseTable"])(table))
        });
    }
    /**
     * Create a new index.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createIndex('person_full_name_unique_index')
     *   .on('person')
     *   .columns(['first_name', 'last_name'])
     *   .execute()
     * ```
     */ createIndex(indexName) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$create$2d$index$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateIndexBuilder"]({
            queryId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])(),
            executor: this.#executor,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$index$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateIndexNode"].create(indexName)
        });
    }
    /**
     * Drop an index.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .dropIndex('person_full_name_unique_index')
     *   .execute()
     * ```
     */ dropIndex(indexName) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$drop$2d$index$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DropIndexBuilder"]({
            queryId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])(),
            executor: this.#executor,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$index$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DropIndexNode"].create(indexName)
        });
    }
    /**
     * Create a new schema.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createSchema('some_schema')
     *   .execute()
     * ```
     */ createSchema(schema) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$create$2d$schema$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateSchemaBuilder"]({
            queryId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])(),
            executor: this.#executor,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$schema$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateSchemaNode"].create(schema)
        });
    }
    /**
     * Drop a schema.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .dropSchema('some_schema')
     *   .execute()
     * ```
     */ dropSchema(schema) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$drop$2d$schema$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DropSchemaBuilder"]({
            queryId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])(),
            executor: this.#executor,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$schema$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DropSchemaNode"].create(schema)
        });
    }
    /**
     * Alter a table.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .alterTable('person')
     *   .alterColumn('first_name', (ac) => ac.setDataType('text'))
     *   .execute()
     * ```
     */ alterTable(table) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$alter$2d$table$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableBuilder"]({
            queryId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])(),
            executor: this.#executor,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$alter$2d$table$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlterTableNode"].create((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$table$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseTable"])(table))
        });
    }
    /**
     * Create a new view.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createView('dogs')
     *   .orReplace()
     *   .as(db.selectFrom('pet').selectAll().where('species', '=', 'dog'))
     *   .execute()
     * ```
     */ createView(viewName) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$create$2d$view$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateViewBuilder"]({
            queryId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])(),
            executor: this.#executor,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$view$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateViewNode"].create(viewName)
        });
    }
    /**
     * Refresh a materialized view.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .refreshMaterializedView('my_view')
     *   .concurrently()
     *   .execute()
     * ```
     */ refreshMaterializedView(viewName) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$refresh$2d$materialized$2d$view$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RefreshMaterializedViewBuilder"]({
            queryId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])(),
            executor: this.#executor,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$refresh$2d$materialized$2d$view$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RefreshMaterializedViewNode"].create(viewName)
        });
    }
    /**
     * Drop a view.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .dropView('dogs')
     *   .ifExists()
     *   .execute()
     * ```
     */ dropView(viewName) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$drop$2d$view$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DropViewBuilder"]({
            queryId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])(),
            executor: this.#executor,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$view$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DropViewNode"].create(viewName)
        });
    }
    /**
     * Create a new type.
     *
     * Only some dialects like PostgreSQL have user-defined types.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createType('species')
     *   .asEnum(['dog', 'cat', 'frog'])
     *   .execute()
     * ```
     */ createType(typeName) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$create$2d$type$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateTypeBuilder"]({
            queryId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])(),
            executor: this.#executor,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$create$2d$type$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateTypeNode"].create((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$identifier$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSchemableIdentifier"])(typeName))
        });
    }
    /**
     * Drop a type.
     *
     * Only some dialects like PostgreSQL have user-defined types.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .dropType('species')
     *   .ifExists()
     *   .execute()
     * ```
     */ dropType(typeName) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$schema$2f$drop$2d$type$2d$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DropTypeBuilder"]({
            queryId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$util$2f$query$2d$id$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQueryId"])(),
            executor: this.#executor,
            node: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$operation$2d$node$2f$drop$2d$type$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DropTypeNode"].create((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$parser$2f$identifier$2d$parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSchemableIdentifier"])(typeName))
        });
    }
    /**
     * Returns a copy of this schema module with the given plugin installed.
     */ withPlugin(plugin) {
        return new SchemaModule(this.#executor.withPlugin(plugin));
    }
    /**
     * Returns a copy of this schema module  without any plugins.
     */ withoutPlugins() {
        return new SchemaModule(this.#executor.withoutPlugins());
    }
    /**
     * See {@link QueryCreator.withSchema}
     */ withSchema(schema) {
        return new SchemaModule(this.#executor.withPluginAtFront(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$kysely$40$0$2e$28$2e$8$2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$plugin$2f$with$2d$schema$2f$with$2d$schema$2d$plugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WithSchemaPlugin"](schema)));
    }
}
}),
];

//# sourceMappingURL=9cfc5_kysely_dist_esm_schema_508b16ab._.js.map