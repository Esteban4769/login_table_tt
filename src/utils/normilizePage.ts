export const getNormalizedPage = (
  searchParams: URLSearchParams,
  pageCount: number,
) => {
  let currentPage = Number(searchParams.get('page'));

  if (currentPage <= 0
    || currentPage > pageCount
    || Number.isNaN(currentPage)) {
    currentPage = 1;
  }

  return currentPage;
};
