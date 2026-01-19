export const percent = (num: number, den: number) =>
  den ? ((num / den) * 100).toFixed(1) : "0";
