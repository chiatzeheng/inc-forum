import * as React from "react"
import { Button } from "@/app/components/ui/button"
import Link from "next/link"

const FirstTime = () => {
    return (
        <div>
            <h1> First Time Here?</h1>

            <a> No Worries Just create a new post under a new page!</a>
            <Link href="/add">
                Create New Post
            </Link>

        </div>
    )
}

export default FirstTime

