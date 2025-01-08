import { FC } from "react"
import { Button } from "@/components/ui/button"
import { Home, Lightbulb, ChevronLeft } from 'lucide-react'
import Link from "next/link"

const ExerciseHeader: FC = () => {
    return (
        <header className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-full opacity-25 group-hover:opacity-50 transition-opacity"></div>
              <Home className="w-8 h-8 z-10 relative" />
            </div>
            <ChevronLeft className="w-6 h-6" />
            <span className="font-semibold">Back to Home</span>
          </Link>
  
        <div className="flex items-center space-x-2">
          <span className="text-3xl font-bold">&lt;</span>
          <span className="text-4xl font-extrabold">CodeMastery</span>
          <span className="text-3xl font-bold">/&gt;</span>
        </div>
  

          <Button variant="outline" className="bg-white text-red-600 hover:bg-red-100">
            <Lightbulb className="w-5 h-5 mr-2" />
            Get Hint
          </Button>
      </header>
    )
}

export default ExerciseHeader