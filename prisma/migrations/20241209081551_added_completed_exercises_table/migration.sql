-- CreateTable
CREATE TABLE "CompletedExercise" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "exerciseId" UUID NOT NULL,
    "completedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompletedExercise_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompletedExercise_userId_exerciseId_key" ON "CompletedExercise"("userId", "exerciseId");

-- AddForeignKey
ALTER TABLE "CompletedExercise" ADD CONSTRAINT "CompletedExercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedExercise" ADD CONSTRAINT "CompletedExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
