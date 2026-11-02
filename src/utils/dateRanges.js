export function startOfDay(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
}

export function endOfDay(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
}

export function startOfWeek(date = new Date()) {
  const day = (date.getDay() + 6) % 7; 
  return startOfDay(new Date(date.getFullYear(), date.getMonth(), date.getDate() - day));
}

export function startOfMonth(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
}

export function getRange(kind, customFrom, customTo, now = new Date()) {
  switch (kind) {
    case 'today':
      return { since: startOfDay(now).getTime(), until: endOfDay(now).getTime() };
    case 'week':
      return { since: startOfWeek(now).getTime(), until: endOfDay(now).getTime() };
    case 'month':
      return { since: startOfMonth(now).getTime(), until: endOfDay(now).getTime() };
    case 'range': {
      const since = customFrom ? startOfDay(customFrom).getTime() : undefined;
      const until = customTo ? endOfDay(customTo).getTime() : undefined;
      return { since, until };
    }
    default:
      return { since: undefined, until: undefined };
  }
}
