/*
  Warnings:

  - You are about to drop the column `dayOfWeek` on the `UserActivity` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,name]` on the table `UserActivity` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserActivity_userId_name_dayOfWeek_key";

-- AlterTable
ALTER TABLE "UserActivity" DROP COLUMN "dayOfWeek";

-- CreateTable
CREATE TABLE "UserActivityDay" (
    "id" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "dayOfWeek" "DayOfWeek" NOT NULL,

    CONSTRAINT "UserActivityDay_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserActivityDay_activityId_dayOfWeek_key" ON "UserActivityDay"("activityId", "dayOfWeek");

-- CreateIndex
CREATE UNIQUE INDEX "UserActivity_userId_name_key" ON "UserActivity"("userId", "name");

-- AddForeignKey
ALTER TABLE "UserActivityDay" ADD CONSTRAINT "UserActivityDay_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "UserActivity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
