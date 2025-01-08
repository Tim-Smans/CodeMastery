import { Prisma } from "@prisma/client";

export type StartCode = Prisma.StartCodeGetPayload<
  Prisma.StartCodeDefaultArgs & {
    include: {
      exercise: true;
    };
  }
>;