import * as React from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";

const FirstTime = () => {
    return (
        <div className='flex flex-col col-span-2 space-y-6 p-8 rounded-lg shadow-md'>
            <h1 className="text-3xl font-bold text-gray-800">Welcome!</h1>
            <p className="text-lg text-gray-700">
                New here? No worries! Let's get started by creating your first post.
            </p>
            <Link href="/add">
                    <Button>
                        Create New Post
                    </Button>
            </Link>
        </div>
    )
}

export default FirstTime;
