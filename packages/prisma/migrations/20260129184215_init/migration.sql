-- CreateEnum
CREATE TYPE "SaleStatus" AS ENUM ('Open', 'Lost', 'Sold', 'Stalled');

-- CreateTable
CREATE TABLE "Activity" (
    "activityId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("activityId")
);

-- CreateTable
CREATE TABLE "Sale" (
    "saleId" TEXT NOT NULL,
    "status" "SaleStatus" NOT NULL DEFAULT 'Open',
    "saleDate" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "stage" TEXT NOT NULL,
    "nextActivity" TEXT NOT NULL,
    "saleName" TEXT NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("saleId")
);
