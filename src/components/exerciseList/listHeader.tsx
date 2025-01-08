import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { FC } from "react"
import Link from "next/link"


const ListHeader: FC = () => {

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-red-500">&lt;/&gt;</span>
            <span className="text-xl font-bold">CodeMastery</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4 ">
          <div className="relative w-full max-w-sm ">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search exercises..."
              className="pl-8 rounded-3xl"
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default ListHeader