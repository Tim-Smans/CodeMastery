-- CreateTable
CREATE TABLE "Hints" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "content" TEXT NOT NULL,
    "exerciseId" UUID NOT NULL,

    CONSTRAINT "Hints_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Hints" ADD CONSTRAINT "Hints_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
