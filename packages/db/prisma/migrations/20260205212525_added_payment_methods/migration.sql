-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('COD', 'CARD');

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "payment_method" "PaymentMethod" NOT NULL DEFAULT 'COD';

-- AlterTable
ALTER TABLE "stores" ADD COLUMN     "supported_payment_methods" "PaymentMethod"[] DEFAULT ARRAY['COD']::"PaymentMethod"[];
