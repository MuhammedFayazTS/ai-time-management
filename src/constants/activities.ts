import {
  Dumbbell,
  Briefcase,
  Book,
  Code2,
  Brain,
  Footprints,
  Activity,
  Bed,
  ShoppingCart,
  Coffee,
  Soup,
  UtensilsCrossed,
  ShowerHead,
  PartyPopper,
  Phone,
  Tv,
  Music,
  Car,
  Plane,
  NotebookPen,
} from "lucide-react";
import { Priority } from "../../types/activity.types";

export const activityOptions = [
  { label: "Gym", icon: Dumbbell },
  { label: "Work", icon: Briefcase },
  { label: "Reading", icon: Book },
  { label: "Coding", icon: Code2 },
  { label: "Meditation", icon: Brain },
  { label: "Walk", icon: Footprints },
  { label: "Yoga", icon: Activity },
  { label: "Sleep", icon: Bed },
  { label: "Groceries", icon: ShoppingCart },
  { label: "Coffee", icon: Coffee },
  { label: "Breakfast", icon: Soup },
  { label: "Lunch", icon: UtensilsCrossed },
  { label: "Dinner", icon: UtensilsCrossed },
  { label: "Shower", icon: ShowerHead },
  { label: "Party", icon: PartyPopper },
  { label: "Call", icon: Phone },
  { label: "TV", icon: Tv },
  { label: "Music", icon: Music },
  { label: "Drive", icon: Car },
  { label: "Travel", icon: Plane },
  { label: "Journaling", icon: NotebookPen },
];

export const priorities: {
  label: string;
  value: Priority;
  color: string;
  selectedColor: string;
}[] = [
  {
    label: "Low",
    value: "low",
    color: "bg-green-100 text-green-700 border-green-400",
    selectedColor: "ring-green-500",
  },
  {
    label: "Medium",
    value: "medium",
    color: "bg-yellow-100 text-yellow-800 border-yellow-400",
    selectedColor: "ring-yellow-500",
  },
  {
    label: "High",
    value: "high",
    color: "bg-red-100 text-red-700 border-red-500",
    selectedColor: "ring-red-500",
  },
];

export const daysOfWeek = [
  { label: "Mo", value: "monday" },
  { label: "Tu", value: "tuesday" },
  { label: "We", value: "wednesday" },
  { label: "Th", value: "thursday" },
  { label: "Fr", value: "friday" },
  { label: "Sa", value: "saturday" },
  { label: "Su", value: "sunday" },
];
