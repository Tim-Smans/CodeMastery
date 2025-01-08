    "use client"

    import FormError from "@/components/auth/formError"
    import CodeEditor from "@/components/editor/codeEditor"
    import Form from "@/components/form"
    import SubmitButtonWithLoading from "@/components/submitWithLoadingButton"
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
    import { Input } from "@/components/ui/input"
    import { Label } from "@/components/ui/label"
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
    import { StartCode } from "@/lib/models/startCode"
    import { createStartCodeSchema, updateStartCodeSchema } from "@/lib/schemas/startCodeSchema"
    import { createNewStartCode, updateStartcode } from "@/lib/server/actions/startCodeActions"
    import { zodResolver } from "@hookform/resolvers/zod"
    import { CodeType } from "@prisma/client"
    import { FC, useActionState, useState } from "react"
    import { useForm } from "react-hook-form"

    interface Props {
        isUpdate?: boolean
        exerciseId: string
        exerciseStartcodes: StartCode[]
        existingStartcode?: StartCode
    }

    type StartCodeFormValues = {
        exerciseId: string;
        type: CodeType;
        code: string;
        id?: string;
    };

    const StartCodeForm: FC<Props> = ({ isUpdate, exerciseId, exerciseStartcodes, existingStartcode }) => {
        const [actionResult, executeAction] = useActionState(
            isUpdate ? updateStartcode : createNewStartCode,
            { success: false }
        );
        const [selectedType, setSelectedType] = useState<CodeType | null>(
            existingStartcode?.type || null
        );
        const [currentCode, setCurrentCode] = useState<string>(
            existingStartcode?.code || ""
        );

        const createHookForm = useForm<StartCodeFormValues>({
            resolver: zodResolver(createStartCodeSchema),
            defaultValues: { exerciseId, type: "JAVASCRIPT", code: "" },
        });

        const updateHookForm = useForm<StartCodeFormValues>({
            resolver: zodResolver(updateStartCodeSchema),
            defaultValues: existingStartcode,
        });

        const handleCodeChange = (code: string | undefined) => {
            if (code !== undefined) {
                setCurrentCode(code);
            }
        };

        return (
            <Form
                hookForm={isUpdate ? updateHookForm : createHookForm}
                action={executeAction}
                actionResult={actionResult}
                id={existingStartcode?.id}
            >
                <Card>
                    <CardHeader>
                        <CardTitle>{isUpdate ? "Edit StartCode" : "Create StartCode"}</CardTitle>
                        <CardDescription>
                            {isUpdate
                                ? "Update the start code details for this exercise."
                                : "Provide the code that an exercise will start out with."}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Programming language</Label>
                            <Select
                                value={selectedType == null ? 'Select a language' : selectedType}
                                onValueChange={(value) => {
                                    setSelectedType(value as CodeType);
                                }}
                                disabled={isUpdate} // Prevent language change on update
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a language" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(CodeType).map((type) => (
                                        !exerciseStartcodes.some((startCode) => startCode.type === type) || type === selectedType ? (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ) : null
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormError
                                path="type"
                                formErrors={isUpdate ? updateHookForm.formState.errors : createHookForm.formState.errors}
                                serverErrors={actionResult}
                            />
                            <Input
                                type="hidden"
                                {...(isUpdate
                                    ? updateHookForm.register("type")
                                    : createHookForm.register("type"))}
                                value={selectedType == null ? 'JAVASCRIPT' : selectedType}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="code">Code</Label>
                            <CodeEditor
                                defaultValue={currentCode}
                                language={selectedType == null ? "JAVASCRIPT" : selectedType}
                                className="border border-muted-foreground rounded"
                                onValueChange={handleCodeChange}
                            />
                            <Input
                                type="hidden"
                                {...(isUpdate
                                    ? updateHookForm.register("code")
                                    : createHookForm.register("code"))}
                                value={currentCode}
                            />
                            <FormError
                                path="code"
                                formErrors={isUpdate ? updateHookForm.formState.errors : createHookForm.formState.errors}
                                serverErrors={actionResult}
                            />
                        </div>
                        <div className="space-y-2">
                            <Input
                                {...(isUpdate
                                    ? updateHookForm.register("exerciseId")
                                    : createHookForm.register("exerciseId"))}
                                defaultValue={exerciseId}
                                readOnly
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <SubmitButtonWithLoading
                            text={`${isUpdate ? "Update" : "Create"} StartCode`}
                            loadingText={`${isUpdate ? "Updating" : "Creating"} StartCode...`}
                        />
                    </CardFooter>
                </Card>
            </Form>
        );
    };

    export default StartCodeForm;
