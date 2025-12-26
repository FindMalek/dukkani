-- AlterTable
ALTER TABLE "user" ADD COLUMN     "telegramchatid" TEXT,
ADD COLUMN     "telegramlinkedat" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "telegramlinktoken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "expiresat" TIMESTAMP(3) NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userid" TEXT NOT NULL,

    CONSTRAINT "telegramlinktoken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "telegramlinktoken_token_key" ON "telegramlinktoken"("token");

-- CreateIndex
CREATE INDEX "telegramlinktoken_token_idx" ON "telegramlinktoken"("token");

-- CreateIndex
CREATE INDEX "telegramlinktoken_userid_idx" ON "telegramlinktoken"("userid");

-- AddForeignKey
ALTER TABLE "telegramlinktoken" ADD CONSTRAINT "telegramlinktoken_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
