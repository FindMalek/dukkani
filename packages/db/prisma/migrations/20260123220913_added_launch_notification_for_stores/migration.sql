-- CreateTable
CREATE TABLE "launch_notifications" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "notified" BOOLEAN NOT NULL DEFAULT false,
    "notified_at" TIMESTAMP(3),
    "store_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "launch_notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "launch_notifications_store_id_idx" ON "launch_notifications"("store_id");

-- CreateIndex
CREATE INDEX "launch_notifications_store_id_notified_idx" ON "launch_notifications"("store_id", "notified");

-- CreateIndex
CREATE UNIQUE INDEX "launch_notifications_store_id_email_key" ON "launch_notifications"("store_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "launch_notifications_store_id_phone_key" ON "launch_notifications"("store_id", "phone");

-- AddForeignKey
ALTER TABLE "launch_notifications" ADD CONSTRAINT "launch_notifications_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;
