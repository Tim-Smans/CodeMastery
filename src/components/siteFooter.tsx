"use client"

import Link from "next/link"
 import { FC } from "react"


const SiteFooter: FC = () => {
    return (
        <footer className="w-full border-t bg-background">
          <div className="container px-4 md:px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold text-red-500 mb-4">CodeMastery</h3>
                <p className="text-sm text-muted-foreground">Empowering developers since 2025</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                </div>
              </div>
            </div>
          </div>
        </footer>
      )
}

export default SiteFooter