import { format, formatDistanceToNow, getTime } from "date-fns";

// ----------------------------------------------------------------------

export function formatToLocalTimeEs(date: Date) {
  const newDate = new Date(date);

  return newDate.toLocaleDateString("es-VE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function fDate(date: Date, newFormat: string) {
  const fm = newFormat || "dd MMM yyyy";

  return date ? format(new Date(date), fm) : "";
}

export function fDateTime(date: Date, newFormat: string) {
  const fm = newFormat || "dd MMM yyyy p";

  return date ? format(new Date(date), fm) : "";
}

export function fTimestamp(date: Date) {
  return date ? getTime(new Date(date)) : "";
}

export function fToNow(date: Date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : "";
}
