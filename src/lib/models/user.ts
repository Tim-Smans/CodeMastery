/* eslint-disable @typescript-eslint/no-unused-vars */

import { Prisma } from '@prisma/client';

const profileSelect = {
  id: true,
  email: true,
  username: true,
  score: true,
  streak: true,
  accuracy: true,
  badge: true,
  avatar: true,
  password: true,
  createdAt: true,
  roleId: true,
  updatedAt: true,
  role: {
    select: {
      id: true,
      name: true,
    },
  },
};

export type Profile = Prisma.UserGetPayload<{
  select: typeof profileSelect;
}>;

export type SessionProfile = Prisma.SessionGetPayload<{
  select: {
    id: true;
    activeUntil: true;
    user: {
      select: typeof profileSelect;
    };
  };
}>;
