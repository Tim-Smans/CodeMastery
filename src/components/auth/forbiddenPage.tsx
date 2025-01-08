import { FC } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";

const ForbiddenPage: FC = () => {
    return(
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center px-4">
      <ShieldAlert className="w-24 h-24 text-red-500 mb-8" />
      <h1 className="text-4xl font-bold mb-4">401 - Access Forbidden</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Oops! It seems you don't have permission to access this page.
      </p>
      <div className="space-y-4">
        <Button asChild className="mr-4 bg-red-500 hover:bg-red-600 rounded">
          <Link href="/">Go to Homepage</Link>
        </Button>
      </div>
    </div>
    )
}

export default ForbiddenPage