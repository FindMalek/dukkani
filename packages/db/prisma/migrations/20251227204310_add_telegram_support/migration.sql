/*
  Warnings:

  - A unique constraint covering the columns `[telegramchatid]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "telegramchatid" TEXT,
ADD COLUMN     "telegramlinkedat" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "telegramotp" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "telegramotp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "telegramotp_code_key" ON "telegramotp"("code");

-- CreateIndex
CREATE INDEX "telegramotp_userId_idx" ON "telegramotp"("userId");

-- CreateIndex
CREATE INDEX "telegramotp_expiresAt_idx" ON "telegramotp"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "user_telegramchatid_key" ON "user"("telegramchatid");

-- AddForeignKey
ALTER TABLE "telegramotp" ADD CONSTRAINT "telegramotp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
