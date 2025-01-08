"use client"

import { CodeType } from "@prisma/client"
import { FC } from "react"
import Editor from '@monaco-editor/react'


interface Props {
    readOnly?: boolean
    language: CodeType
    defaultValue: string
    className?: string
    onValueChange?: (value: string | undefined) => void
    height?: string
    width?: string
}

const CodeEditor: FC<Props> = ({ readOnly, language, defaultValue, className, onValueChange, height, width }) => {
    return (
        <Editor
            className={className}
            language={language.toLocaleLowerCase()}
            options={{
                readOnly: readOnly
            }}
            height={height != null ? height : "400px"}
            width={width != null ? width : "400px"}
            defaultValue={defaultValue}
            onChange={onValueChange}
        />
    )
}

export default CodeEditor