import connectMongo from "@/helpers/connectMongo";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectMongo()

        return NextResponse.json(await User.find())
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}