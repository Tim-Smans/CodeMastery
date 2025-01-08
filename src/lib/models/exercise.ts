import { Prisma } from "@prisma/client"

export type FullExercise = Prisma.ExerciseGetPayload<
  Prisma.ExerciseDefaultArgs & {
    include: {
      categories: true;
      completedBy: true;
      creator: {
        select: { username: true };
      };
      results: true;
      testCases: true;
      startCode: true;
      hints: true;
    };
  }
>;