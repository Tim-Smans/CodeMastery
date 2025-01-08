"use client"

import { FC, useActionState } from "react"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Profile } from "@/lib/models/user"
import { Role } from "@prisma/client"
import Form from "@/components/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createRoleSchema } from "@/lib/schemas/roleSchema"
import Actions from '@actions'
import FormError from "@/components/auth/formError"
import SubmitButtonWithLoading from "@/components/submitWithLoadingButton"
import { Input } from "@/components/ui/input"

interface Props {
    users: Profile[]
    roles: Role[]
}

type RoleFormValues = {
    name: string;
    id?: string;
};


const RolesList: FC<Props> = ({ users, roles }) => {

    const [actionResult, executeAction] = useActionState(Actions.createNewRole, { success: false })

    const createRoleForm = useForm<RoleFormValues>({
        resolver: zodResolver(createRoleSchema),
    });


    return (
        <div className="space-y-8">
            <Form hookForm={createRoleForm} action={executeAction} actionResult={actionResult}>
                <Card>
                    <CardHeader>
                        <CardTitle>Create New Role</CardTitle>
                        <CardDescription>Add a new role to the system</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-2">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Role Name</Label>
                                <Input
                                    {...createRoleForm.register('name')}
                                    placeholder="Name"
                                    defaultValue={actionResult?.submittedData?.name ?? ''}
                                />
                                <FormError path="name" formErrors={createRoleForm.formState.errors} serverErrors={actionResult} />
                            </div>
                            <SubmitButtonWithLoading text="Create new role" loadingText="Creating role..." />
                            </div>
                    </CardContent>
                </Card>
            </Form>

            <Card>
                <CardHeader>
                    <CardTitle>Existing Roles</CardTitle>
                    <CardDescription>List of all roles in the system</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Role Name</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {roles.map((role) => (
                                <TableRow key={role.id}>
                                    <TableCell>{role.id}</TableCell>
                                    <TableCell>{role.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Assign Roles to Users</CardTitle>
                    <CardDescription>Manage user roles</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table >
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Current Role</TableHead>
                                <TableHead>New Role</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id} >
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role.name}</TableCell>
                                    <TableCell>
                                    <Select
                                            onValueChange={async (roleId) => {
                                                await Actions.assignRoleToUser(user.id, roleId);

                                            }}
                                        >             
                                                <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {roles.map((role) => (
                                                    <SelectItem key={role.id} value={role.id}>
                                                        {role.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default RolesList