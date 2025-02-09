const MISSING_ENV_VAR = "Error missing env var: BASE_API_URL";

export async function GET() {
  if (!process.env.BASE_API_URL) {
    console.error(MISSING_ENV_VAR);
    throw new Error(MISSING_ENV_VAR);
  }

  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}/geo/boundary/popular`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as City[];
    return Response.json(data);
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}
