/*
  Warnings:

  - You are about to drop the `ExerciseCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExerciseCategory" DROP CONSTRAINT "ExerciseCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseCategory" DROP CONSTRAINT "ExerciseCategory_exerciseId_fkey";

-- DropTable
DROP TABLE "ExerciseCategory";

-- CreateTable
CREATE TABLE "_CategoryToExercise" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_CategoryToExercise_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CategoryToExercise_B_index" ON "_CategoryToExercise"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToExercise" ADD CONSTRAINT "_CategoryToExercise_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToExercise" ADD CONSTRAINT "_CategoryToExercise_B_fkey" FOREIGN KEY ("B") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
