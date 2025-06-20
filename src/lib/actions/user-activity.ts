"use server";

import { auth } from "../auth";
import prisma from "../db/prisma";
import { generateAIPrompt } from "../ai/generateAIPrompt";
import { DayOfWeek, Priority } from "../db/generated/prisma";

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
        include: {
          days: true,
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

  const userSchedules = await generateAIPrompt({
    activities: results.map((activity) => ({
      id: activity.id,
      name: activity.name,
      description: activity.description ?? undefined,
      customDuration: activity.customDuration ?? undefined,
      preferredStart: activity.preferredStart ?? undefined,
      preferredEnd: activity.preferredEnd ?? undefined,
      priority: activity.priority,
      days: activity.days.map((d) => d.dayOfWeek),
    })),
  });

  const nextVersion = await getNextVersionNumber(userId);

  await prisma.$transaction(async (tx) => {
    for (const sched of userSchedules) {
      const schedule = await tx.userSchedule.create({
        data: {
          userId,
          userActivityId: sched.userActivityId,
          startTime: sched.startTime,
          endTime: sched.endTime,
          aiConfidence: sched.aiConfidence,
          version: nextVersion,
          isUserApproved: sched.isUserApproved,
        },
      });

      await tx.userScheduleDay.createMany({
        data: sched.days.map((day: { dayOfWeek: DayOfWeek }) => ({
          scheduleId: schedule.id,
          dayOfWeek: day.dayOfWeek,
        })),
      });
    }
  });

  return {
    success: true,
    count: results.length,
    savedScheduleCount: userSchedules.length,
  };
}

const getNextVersionNumber = async (userId: string) => {
  const latest = await prisma.userSchedule.findFirst({
    where: { userId },
    orderBy: { version: "desc" },
    select: { version: true },
  });
  const nextVersion = (latest?.version ?? 0) + 1;
  return nextVersion;
};
