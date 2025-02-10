import { fetcher, preparaPayload } from "@/utils";
const MISSING_ENV_VAR = "Error missing env var: BASE_API_URL";

export async function GET(request: Request) {
  if (!process.env.BASE_API_URL) {
    console.error(MISSING_ENV_VAR);
    throw new Error(MISSING_ENV_VAR);
  }

  try {
    const body = preparaPayload(request);

    console.log(">>>>> histogram", body);
    const response = await fetcher(
      `${process.env.BASE_API_URL}/tenement/search/histogram`,
      {
        method: "POST",
        body,
      }
    );

    return Response.json(response);
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}
