export function formatDate(inputDate: string) {
  const parts = inputDate.split('-');

  const day = parts[0];
  const month = parts[1];
  const yearShort = parts[2];

  const yearFull = `20${yearShort}`;

  const outputDate = `${yearFull}-${month}-${day}`;

  return outputDate;
}
