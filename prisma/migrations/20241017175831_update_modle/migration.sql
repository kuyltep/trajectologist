/*
  Warnings:

  - You are about to drop the column `userId` on the `UserCompetency` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `UserCompetency` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserCompetency" DROP CONSTRAINT "UserCompetency_userId_fkey";

-- AlterTable
ALTER TABLE "UserCompetency" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UserCompetency" ADD CONSTRAINT "UserCompetency_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
