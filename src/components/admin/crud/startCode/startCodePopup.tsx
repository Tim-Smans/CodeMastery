import CodeEditor from "@/components/editor/codeEditor"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { StartCode } from "@/lib/models/startCode"
import { FC } from "react"

interface Props {
    startCode: StartCode
}

const StartCodePopup: FC<Props> = ({startCode}) => {

    return (
        <Dialog>
        <DialogTrigger asChild>
          <Button className="m-1">View Code</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{startCode.exercise.title} - Start Code</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="language" className="text-right">
                Language:
              </Label>
              <div id="language" className="col-span-3">
                {startCode.type}
              </div>
            </div>
            <div className="grid  items-center gap-4">
              <CodeEditor readOnly language={startCode.type} defaultValue={startCode.code} className="w-full"/>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
}

export default StartCodePopup