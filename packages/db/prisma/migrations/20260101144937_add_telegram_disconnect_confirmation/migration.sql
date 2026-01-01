-- CreateTable
CREATE TABLE "telegramdisconnectconfirmation" (
    "id" TEXT NOT NULL,
    "telegramChatId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "telegramdisconnectconfirmation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "telegramdisconnectconfirmation_telegramChatId_key" ON "telegramdisconnectconfirmation"("telegramChatId");

-- CreateIndex
CREATE INDEX "telegramdisconnectconfirmation_telegramChatId_idx" ON "telegramdisconnectconfirmation"("telegramChatId");

-- CreateIndex
CREATE INDEX "telegramdisconnectconfirmation_expiresAt_idx" ON "telegramdisconnectconfirmation"("expiresAt");

-- AddForeignKey
ALTER TABLE "telegramdisconnectconfirmation" ADD CONSTRAINT "telegramdisconnectconfirmation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
