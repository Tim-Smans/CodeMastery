import Link from "next/link"
import { FC } from "react"



const AdminHeader: FC = () => {

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-36 items-center">
                <div className="mr-4 flex">
                    <div className="fixed inset-0 flex flex-col items-center justify-center space-y-1 pb-5">
                        <span className="text-2xl font-bold text-red-500">&lt;/&gt;</span>
                        <span className="text-xl font-bold">CodeMastery</span>
                        <span className="font-bold text-red-500">Admin mode</span>
                        <Link href="/admin">
                            <span className="font-bold text-red-500">&lt;-</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default AdminHeader