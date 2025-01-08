"use client"

import { FC } from "react"

interface Props {
  code: string
}

const StartCodeDisplay: FC<Props> = ({code}) => {
    return (
    <div className="space-y-4">
      <div className="rounded bg-slate-950 p-4">
        <pre className="text-sm text-slate-50">
          <code>{`${code}`}</code>
        </pre>
      </div>
    </div>
  )
}

export default StartCodeDisplay