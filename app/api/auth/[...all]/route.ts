import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest } from "next/server";

const { POST: originalPOST, GET } = toNextJsHandler(auth);

export async function POST(request: NextRequest) {
    // Use the original Better Auth handler for all requests
    return originalPOST(request);
}

export { GET };