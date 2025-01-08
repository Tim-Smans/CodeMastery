-- CreateEnum
CREATE TYPE "CodeType" AS ENUM ('HTML', 'JAVASCRIPT', 'TYPESCRIPT', 'CSS');

-- CreateTable
CREATE TABLE "StartCode" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" TEXT NOT NULL,
    "type" "CodeType" NOT NULL DEFAULT 'JAVASCRIPT',
    "exerciseId" UUID NOT NULL,

    CONSTRAINT "StartCode_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StartCode" ADD CONSTRAINT "StartCode_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
