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

type PreparePayloadDefaultValues = {
  withinId?: Array<string>;
  type?: Array<string>;
  rent?: [number, number];
};

export function preparaPayload(
  request: Request,
  defaultValues: PreparePayloadDefaultValues = {}
) {
  // Get the URL object from the request
  const { searchParams } = new URL(request.url);

  // Read specific parameters
  const category = searchParams.get("category");
  const searchType = searchParams.get("searchType");
  const location = searchParams.get("location");
  const min = searchParams.get("priceRange[min]");
  const max = searchParams.get("priceRange[max]");
  const rent = min && max ? [Number(min), Number(max)] : defaultValues.rent;

  return JSON.stringify({
    withinId: location ? [location] : defaultValues.withinId,
    type: category ? [category] : defaultValues.type,
    rentType: [searchType],
    rent,
  });
}
