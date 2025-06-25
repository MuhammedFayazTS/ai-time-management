import { DayOfWeek, Priority } from "../db/generated/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

type ActivityData = {
  id: string;
  name: string;
  description?: string;
  customDuration?: number;
  priority: Priority;
  preferredStart?: string;
  preferredEnd?: string;
  days: DayOfWeek[];
};

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const MODEL_CONFIG = {
  model: process.env.AI_MODEL ?? "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.7,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
    responseMimeType: "application/json",
  },
};

export async function generateAIPrompt({
  timezone = "Asia/Kolkata",
  sleepStart = "22:00",
  sleepEnd = "06:00",
  activities,
}: {
  timezone?: string;
  sleepStart?: string;
  sleepEnd?: string;
  activities: ActivityData[];
}) {
  const formattedActivities = activities
    .map(
      (act) =>
        `- Activity: '${act.name}'` +
        (act.description ? `, Description: '${act.description}'` : "") +
        (act.customDuration
          ? `, Duration: ${act.customDuration} minutes`
          : "") +
        (act.preferredStart && act.preferredEnd
          ? `, Preferred Time: ${act.preferredStart} - ${act.preferredEnd}`
          : "") +
        `, Priority: ${act.priority}` +
        `, Days: [${act.days.join(", ")}]
`
    )
    .join("\n");

  const prompt = `You are a helpful and efficient time management assistant.
Generate a detailed weekly schedule for a user in JSON format based on the following information.
The schedule should be realistic, optimize for continuous blocks, and adhere strictly to all constraints.

User Details:
- Timezone: ${timezone}
- Sleep Schedule: From ${sleepStart} to ${sleepEnd}

Activities to Schedule:
${formattedActivities}

Constraints:
- Do NOT schedule ANY activities during the sleep hours (${sleepStart} to ${sleepEnd}).
- All activities should have a clearly defined start and end time.
- If an activity has a 'customDuration', try to adhere to it. If 'preferredStart' and 'preferredEnd' are given, try to fit the activity within that window.
- Prioritize activities based on their 'Priority' (e.g., HIGH, MEDIUM, LOW).
- Respect the specified 'Days' field for each activity.

Output Format:
Provide the schedule as a JSON array of objects. Each object must have the following keys:
- "name": (string) The name of the activity.
- "start_time": (string) The start time of the activity in HH:MM (24-hour) format.
- "end_time": (string) The end time of the activity in HH:MM (24-hour) format.
- "estimated_duration_minutes": (number) The estimated duration of the activity in minutes.
- "category": (string) A suggested category for the activity (e.g., "Work", "Personal", "Health", "Study", "Leisure", "Household").
- "days": (DayOfWeek[]) An array of applicable days for this schedule.
`;

  const model = genAI.getGenerativeModel(MODEL_CONFIG);

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    let jsonString = text.trim();
    if (jsonString.startsWith("```json")) {
      jsonString = jsonString
        .substring(7, jsonString.lastIndexOf("```"))
        .trim();
    } else if (jsonString.startsWith("```")) {
      jsonString = jsonString
        .substring(3, jsonString.lastIndexOf("```"))
        .trim();
    }

    const parsedSchedule = JSON.parse(jsonString);

    if (!Array.isArray(parsedSchedule)) {
      throw new Error("AI response is not a valid JSON array.");
    }

    const mapped = parsedSchedule.map((activity) => {
      const matching = activities.find((a) => a.name === activity.name);
      if (!matching) {
        throw new Error(
          `Activity \"${activity.name}\" from AI not found in user activities.`
        );
      }

      return {
        userActivityId: matching.id,
        startTime: activity.start_time,
        endTime: activity.end_time,
        aiConfidence: calculateAIConfidence(activity, matching),
        isUserApproved: false,
        version: 1,
        days: activity.days.map((day: DayOfWeek) => ({ dayOfWeek: day })),
      };
    });

    return mapped;
  } catch (error) {
    console.error("Error generating schedule from AI:", error);
    throw new Error("Failed to generate schedule from AI. Please try again.");
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function calculateAIConfidence(activity: any, original: ActivityData): number {
  let confidence = 0.8;

  const scheduledDuration =
    (parseTime(activity.end_time) - parseTime(activity.start_time)) / 60;

  if (
    original.customDuration &&
    Math.abs(scheduledDuration - original.customDuration) <= 10
  ) {
    confidence += 0.05;
  }

  if (
    original.preferredStart &&
    original.preferredEnd &&
    activity.start_time >= original.preferredStart &&
    activity.end_time <= original.preferredEnd
  ) {
    confidence += 0.1;
  }

  return Math.min(confidence, 1);
}

function parseTime(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}
