import currency from "currency.js";
import numeral from "numeral";

// ----------------------------------------------------------------------

export function fNumber(amount: number) {
  return numeral(amount).format();
}

export function formatCurrency(amount: number): string {
  const result = currency(amount, { fromCents: true });
  return result.format();
}

export function fPercent(amount: number) {
  const format = amount ? numeral(Number(amount) / 100).format("0.0%") : "";

  return result(format, ".0");
}

export function fShortenNumber(amount: number) {
  const format = amount ? numeral(amount).format("0.00a") : "";

  return result(format, ".00");
}

export function fData(amount: number) {
  const format = amount ? numeral(amount).format("0.0 b") : "";

  return result(format, ".0");
}

function result(format: string, key = ".00") {
  const isInteger = format.includes(key);

  return isInteger ? format.replace(key, "") : format;
}
