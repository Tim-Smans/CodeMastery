import { Prisma } from "@prisma/client"

export type Category = Prisma.CategoryGetPayload<
  Prisma.CategoryDefaultArgs & {
    include: {
      exercises: true;
    };
  }
>;
