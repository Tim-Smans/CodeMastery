-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "activeUntil" SET DEFAULT CURRENT_TIMESTAMP + interval '1 day';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" VARCHAR(500);
