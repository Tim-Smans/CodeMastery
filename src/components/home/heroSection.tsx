import { FC } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Profile } from "@/lib/models/user";


interface Props{
  profile: Profile
}

const HeroSection: FC<Props> = ({profile}) => {

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col justify-center items-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Ignite Your Coding Skills!
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Master JavaScript and TypeScript through engaging exercises
          </p>
          <Button asChild>
            {
              profile != null
                ?
                <Link href="/practice">
                  Start Practicing
                </Link>
                :
                <Link href="/login">
                  Login to get started
                </Link>
            }
          </Button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection