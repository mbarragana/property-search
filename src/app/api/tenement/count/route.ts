import { fetcher } from "@/utils";
const MISSING_ENV_VAR = "Error missing env var: BASE_API_URL";

export async function GET(request: Request) {
  if (!process.env.BASE_API_URL) {
    console.error(MISSING_ENV_VAR);
    throw new Error(MISSING_ENV_VAR);
  }

  try {
    // Get the URL object from the request
    const { searchParams } = new URL(request.url);

    // Read specific parameters
    const category = searchParams.get("category");
    const searchType = searchParams.get("searchType");
    const location = searchParams.get("location");

    const body = JSON.stringify({
      withinId: location ? [location] : [],
      type: category ? [category] : [],
      rentType: [searchType],
      rent: [0, 100000],
    });

    console.log(">>>>", body);
    const response = await fetcher(
      `${process.env.BASE_API_URL}/tenement/search/count`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }
    );

    return Response.json(response);
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}
