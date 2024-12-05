import { reqGroqAI } from "@/lib/groq";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {

    if (req.method !== "POST") {
        // return res.status(405).json({ message: "Only POST requests are allowed" });
    }


    try {
        const data = await req.json();
        console.log(data.origin, data.weight)
        // const { data } = await req.body;
        const chatCompletion = await reqGroqAI(data.origin, data.weight);
        return Response.json({
            content: chatCompletion.choices[0]?.message?.content || "",
        });
    } catch (error) {
        console.error(error);
        return Response.json({ message: "Internal Server Error" });
    }
}