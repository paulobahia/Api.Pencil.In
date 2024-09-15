/*
  Warnings:

  - You are about to drop the column `studioId` on the `Service` table. All the data in the column will be lost.
  - Added the required column `studioId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_studioId_fkey";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "studioId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "studioId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "StudioService" (
    "id" TEXT NOT NULL,
    "studioId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "StudioService_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudioService" ADD CONSTRAINT "StudioService_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "Studio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudioService" ADD CONSTRAINT "StudioService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "Studio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
