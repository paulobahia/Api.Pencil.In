/*
  Warnings:

  - You are about to drop the column `serviceId` on the `Scheduling` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Scheduling" DROP CONSTRAINT "Scheduling_serviceId_fkey";

-- AlterTable
ALTER TABLE "Scheduling" DROP COLUMN "serviceId";

-- CreateTable
CREATE TABLE "SchedulingService" (
    "id" TEXT NOT NULL,
    "schedulingId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "SchedulingService_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SchedulingService" ADD CONSTRAINT "SchedulingService_schedulingId_fkey" FOREIGN KEY ("schedulingId") REFERENCES "Scheduling"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchedulingService" ADD CONSTRAINT "SchedulingService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
