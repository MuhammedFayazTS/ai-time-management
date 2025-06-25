"use client";

import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Image from "next/image";

// Static placeholders — pass as props or from session in real app
const totalActivities = 5;
const completedActivities = 3;
const progress = (completedActivities / totalActivities) * 100;

export function UserProfileWithProgress({ user }: { user: any }) {
    return (
        <div className="w-full flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 mt-4">
            {/* Profile with Circular Progress */}
            {user?.image && (
                <div className="w-[150px] h-[150px]">
                    <CircularProgressbarWithChildren
                        value={progress}
                        styles={buildStyles({
                            pathColor: "#10b981", // green-500
                            trailColor: "#e5e7eb", // gray-200
                            strokeLinecap: "round",
                        })}
                    >
                        <Image
                            src={user.image}
                            alt="User"
                            width={120}
                            height={120}
                            className="rounded-full object-cover"
                        />
                    </CircularProgressbarWithChildren>
                </div>
            )}

            {/* Right Side: Stats / Details */}
            <div className="flex-1 flex flex-col justify-center gap-2 text-left">
                <div>
                    <h2 className="text-xl font-bold text-foreground">Welcome back  
                        <span className="text-indigo-400 ml-1">{user?.name}</span>
                        👋</h2>
                    <p className="text-sm text-muted-foreground">
                        Here’s a quick look at your day’s progress.
                    </p>
                </div>

                <div className="flex gap-6 mt-2">
                    <div>
                        <p className="text-sm font-semibold text-foreground">{completedActivities}</p>
                        <span className="text-xs text-muted-foreground">Completed</span>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-foreground">{totalActivities}</p>
                        <span className="text-xs text-muted-foreground">Scheduled</span>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-green-600">
                            {Math.round(progress)}%
                        </p>
                        <span className="text-xs text-muted-foreground">Progress</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
