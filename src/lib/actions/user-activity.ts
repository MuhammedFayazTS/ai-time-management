"use server";

import { DayOfWeek, Priority } from "@prisma/client";
import { auth } from "../auth";
import prisma from "../db/prisma";

type ActivityPayload = {
  name: string;
  description?: string;
  days: DayOfWeek[];
  preferredStart?: string;
  preferredEnd?: string;
  customDuration?: number;
  priority: Priority;
};

export async function saveUserActivitiesWithDays(payloads: ActivityPayload[]) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  const userId = session.user.id;

  const results = await prisma.$transaction(async (tx) => {
    const saved = [];

    for (const payload of payloads) {
      const { days, ...activityData } = payload;

      const userActivity = await tx.userActivity.upsert({
        where: {
          userId_name: {
            userId,
            name: payload.name,
          },
        },
        update: activityData,
        create: {
          userId,
          ...activityData,
        },
      });

      await tx.userActivityDay.deleteMany({
        where: { activityId: userActivity.id },
      });

      await tx.userActivityDay.createMany({
        data: days.map((day) => ({
          activityId: userActivity.id,
          dayOfWeek: day,
        })),
        skipDuplicates: true,
      });

      saved.push(userActivity);
    }

    return saved;
  });

  return { success: true, count: results.length };
}
