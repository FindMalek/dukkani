/*
  Warnings:

  - You are about to drop the `telegramlinktoken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "telegramlinktoken" DROP CONSTRAINT "telegramlinktoken_userid_fkey";

-- DropTable
DROP TABLE "telegramlinktoken";
