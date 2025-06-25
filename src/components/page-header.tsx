import { auth } from '@/lib/auth';
import { Bell } from 'lucide-react';
import Image from 'next/image'
import React from 'react'

const PageHeader = async () => {
    const session = await auth();
    const user = session?.user
    return (
        <header className="w-full flex justify-between items-center mb-2">
            <div className="flex gap-x-2">
                {user?.image && (
                    <div className="flex justify-center">
                        <Image
                            src={user.image}
                            alt={user.name ?? "User Image"}
                            width={50}
                            height={50}
                            className="rounded-full"
                        />
                    </div>
                )}

                <div className="h-full flex flex-col items-start">
                    <h3 className="text-xl font-bold ">{user?.name ?? "User"}</h3>
                    <span className="text-xs font-bold">{user?.email}</span>
                </div>
            </div>

            <Bell />
        </header>
    )
}

export default PageHeader