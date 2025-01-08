import { Prisma } from "@prisma/client";

export type TestCase = Prisma.TestCaseGetPayload<
  Prisma.TestCaseDefaultArgs & {
    include: {
      exercise: true;
    };
  }
>;
