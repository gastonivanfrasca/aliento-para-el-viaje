import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const payload = body;
    if (!payload) {
        return new Response("No payload", {
            status: 400
        });
    }
    console.log(payload);
    return new NextResponse("OK", {
        status: 200
    });
}