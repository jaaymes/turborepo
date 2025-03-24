import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const getLocation = async (ip: string) => {
  const response = await fetch(`https://ipapi.co/${ip}/json/`);
  const data = await response.json();
  return data;
};

export async function middleware(request: NextRequest) {
  // Clone the request headers
  const requestHeaders = new Headers(request.headers);

  // Add a custom header
  requestHeaders.set("x-middleware-timestamp", new Date().toISOString());

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "8.8.8.8"; // IP de fallback
  const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
  const geoData = await geoResponse.json();
  console.log("🚀 ~ middleware ~ geoData:", geoData);
  // Log the path being accessed (only in development)
  if (process.env.NODE_ENV === "development") {
    console.log(`Middleware processed path: ${request.nextUrl.pathname}`);
  }

  // Return the request with modified headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Configure which paths this middleware is run on (in this case, all paths)
export const config = {
  matcher: "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
};
