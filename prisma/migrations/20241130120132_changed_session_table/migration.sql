/*
  Warnings:

  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `Session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Session` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Session_token_key";

-- AlterTable
ALTER TABLE "Session" DROP CONSTRAINT "Session_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "expiresAt",
DROP COLUMN "token",
ADD COLUMN     "activeFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "activeUntil" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP + interval '1 day',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE VARCHAR,
ADD CONSTRAINT "Session_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Session_id_key" ON "Session"("id");
