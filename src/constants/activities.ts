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
    color:
      "bg-gradient-to-br from-green-50 to-green-100 text-green-700 border border-green-200",
    selectedColor:
      "bg-gradient-to-br from-green-400 to-green-500 text-white border border-green-600 shadow",
  },
  {
    label: "Medium",
    value: "medium",
    color:
      "bg-gradient-to-br from-yellow-50 to-yellow-100 text-yellow-800 border border-yellow-200",
    selectedColor:
      "bg-gradient-to-br from-yellow-400 to-yellow-500 text-white border border-yellow-600 shadow",
  },
  {
    label: "High",
    value: "high",
    color:
      "bg-gradient-to-br from-red-50 to-red-100 text-red-700 border border-red-200",
    selectedColor:
      "bg-gradient-to-br from-red-500 to-red-600 text-white border border-red-700 shadow",
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
