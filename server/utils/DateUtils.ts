import { logger } from "..";

export function getWeekStartAndEnd(): { pastWeekStart: Date; pastWeekEnd: Date } {
  const today = new Date();
  
  // Calculate the start of the past 7 days
  const pastWeekStart = new Date(today);
  pastWeekStart.setDate(today.getDate() - 6); // Start from the same day last week

  // The end of the past 7 days is today
  const pastWeekEnd = new Date(today);
  logger.info(`pastWeekEnd is Setted: ${pastWeekEnd}`);
  
  return { pastWeekStart, pastWeekEnd };
  }

export const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]