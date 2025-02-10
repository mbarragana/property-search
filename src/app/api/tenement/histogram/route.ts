import { fetcher, preparaPayload } from "@/utils";
const MISSING_ENV_VAR = "Error missing env var: BASE_API_URL";

export async function GET(request: Request) {
  if (!process.env.BASE_API_URL) {
    console.error(MISSING_ENV_VAR);
    throw new Error(MISSING_ENV_VAR);
  }

  try {
    const body = preparaPayload(request);

    const response = await fetcher(
      `${process.env.BASE_API_URL}/tenement/search/histogram`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }
    );

    const { range, histogram: rawHistogram } = response as HistogramData;

    const max = range[1];
    const min = range[0];
    const stepPrice = (max - min) / rawHistogram.length;
    const histogram = rawHistogram.map((count, index) => ({
      count,
      price: min + index * stepPrice,
    }));

    return Response.json({ range, histogram });
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}
