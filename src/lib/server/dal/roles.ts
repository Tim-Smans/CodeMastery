import { Prisma, Role } from "@prisma/client";
import { prismaClient } from "./utils/prismaClient";


export const getRoles = async (): Promise<Role[]> => {
    return await prismaClient.role.findMany();
}

export const getRoleById = async (id: string): Promise<Role | null> => {
    return await prismaClient.role.findUnique({where: {id}});
}

export const createRole = async (role: Prisma.RoleCreateInput): Promise<Role> => {
    role.id = crypto.randomUUID();
    return await prismaClient.role.create({data: role});
}

export const updateRole = async (role: Prisma.RoleUpdateInput & { id: string }) => {
    await prismaClient.role.update({where: {id: role.id}, data: role});
}

export const deleteRole = async (id: string) => {
    await prismaClient.role.delete({where: {id}});
}