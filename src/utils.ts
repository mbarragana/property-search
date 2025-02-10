export const fetcher = async <T>(
  ...args: Parameters<typeof fetch>
): Promise<T> => {
  const response = await fetch(...args);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<T>;
};

export enum SearchTypes {
  rent = "rent",
  buy = "buy",
}

export function preparaPayload(request: Request) {
  // Get the URL object from the request
  const { searchParams } = new URL(request.url);

  // Read specific parameters
  const category = searchParams.get("category");
  const searchType = searchParams.get("searchType");
  const location = searchParams.get("location");
  const min = searchParams.get("rent[min]");
  const max = searchParams.get("rent[max]");
  const rent = min && max ? [Number(min), Number(max)] : undefined;

  return JSON.stringify({
    withinId: location ? [location] : [],
    type: category ? [category] : [],
    rentType: [searchType],
    rent,
  });
}
